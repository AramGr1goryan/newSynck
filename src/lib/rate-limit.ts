/**
 * Rate limit abstraction layer.
 * 
 * DEVELOPMENT RATE LIMIT vs PRODUCTION RATE LIMIT
 * 
 * DEVELOPMENT:
 * This implementation currently uses an in-memory `RateLimitStore`.
 * It is suitable ONLY for local development or single-instance Node.js servers.
 * 
 * PRODUCTION (Serverless / Distributed Environments like Vercel):
 * In-memory state is NOT shared across serverless functions or edge nodes.
 * You MUST implement a distributed adapter (e.g., Redis via @upstash/ratelimit).
 * 
 * TODO [PRODUCTION]: Replace `memoryStore` with a distributed storage adapter.
 */

interface RateLimitStore {
  [ip: string]: { count: number; expiresAt: number };
}

// Development fallback store
const memoryStore: RateLimitStore = {};

export async function rateLimit(ip: string, limit: number, windowMs: number): Promise<boolean> {
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
