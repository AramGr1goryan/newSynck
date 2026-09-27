import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limit abstraction layer.
 * 
 * PRODUCTION (Serverless / Distributed Environments like Vercel):
 * Uses Upstash Redis if environment variables are present.
 * 
 * DEVELOPMENT:
 * Falls back to an in-memory `RateLimitStore` if Upstash is not configured.
 */

interface RateLimitStore {
  [ip: string]: { count: number; expiresAt: number };
}

// Development fallback store
const memoryStore: RateLimitStore = {};

// Optional Upstash configuration
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Initialize Upstash Ratelimit only if credentials exist
const upstashRatelimit = (redisUrl && redisToken)
  ? new Ratelimit({
      redis: new Redis({ url: redisUrl, token: redisToken }),
      limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 requests per 15 minutes
      analytics: true,
      prefix: "@upstash/ratelimit",
    })
  : null;

export async function rateLimit(ip: string, limit: number, windowMs: number): Promise<boolean> {
  // Use Upstash if configured
  if (upstashRatelimit) {
    try {
      const { success } = await upstashRatelimit.limit(ip);
      return success;
    } catch (error) {
      console.error("[RateLimit] Upstash error, falling back to memory:", error);
      // Fallback intentionally proceeds to memoryStore below
    }
  }

  // Fallback to in-memory store
  const now = Date.now();
  const record = memoryStore[ip];

  if (!record) {
    memoryStore[ip] = { count: 1, expiresAt: now + windowMs };
    return true; // Allowed
  }

  if (now > record.expiresAt) {
    // Window expired, reset
    memoryStore[ip] = { count: 1, expiresAt: now + windowMs };
    return true; // Allowed
  }

  if (record.count >= limit) {
    return false; // Rate limited
  }

  record.count += 1;
  return true; // Allowed
}
