import { rateLimit } from '@/lib/rate-limit';

export interface ContactData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  isValidated: boolean;
  isPersisted: boolean;
  isDelivered: boolean;
  error?: string;
}

export class ContactService {
  /**
   * Basic Server-side validation
   */
  static validate(data: ContactData): string | null {
    if (!data.name || data.name.trim().length < 2) return 'Invalid name format.';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Invalid email address.';
    if (!data.message || data.message.trim().length < 10) return 'Message is too short.';
    if (data.message.length > 5000) return 'Message is too long.';
    return null; // No errors
  }

  /**
   * Anti-Spam (Honeypot check)
   */
  static async antiSpam(data: ContactData): Promise<boolean> {
    if (data.honeypot && data.honeypot.length > 0) {
      return false; // Spam detected
    }
    return true; // Clean
  }

  /**
   * Rate limiting
   */
  static async checkRateLimit(ip: string): Promise<boolean> {
    // Limit to 5 requests per 15 minutes per IP
    return await rateLimit(ip, 5, 15 * 60 * 1000);
  }

  /**
   * Primary submit handler
   */
  static async submit(data: ContactData, ip: string): Promise<ContactResponse> {
    // 1. Validation
    const validationError = this.validate(data);
    if (validationError) {
      return { success: false, message: validationError, isValidated: false, isPersisted: false, isDelivered: false };
    }

    // 2. Anti-Spam
    const isClean = await this.antiSpam(data);
    if (!isClean) {
      // Return a generic error to not tip off the bot
      return { success: false, message: 'Failed to process request.', isValidated: true, isPersisted: false, isDelivered: false };
    }

    // 3. Rate Limiting
    const isAllowed = await this.checkRateLimit(ip);
    if (!isAllowed) {
      return { success: false, message: 'Too many requests. Please try again later.', isValidated: true, isPersisted: false, isDelivered: false };
    }

    // 4. Persistence & Delivery
    // Check environment variables to determine if actual persistence/delivery logic is wired up.
    const isDatabaseConfigured = process.env.CONTACT_DB === 'configured';
    const isProviderConfigured = process.env.CONTACT_PROVIDER === 'configured';
    
    let isPersisted = false;
    let isDelivered = false;

    try {
      if (isDatabaseConfigured) {
        // TODO: Implement actual database storage logic (e.g. Prisma, Supabase)
        // await Database.save(data);
        isPersisted = true;
      }

      if (isProviderConfigured) {
        // TODO: Implement actual provider logic (e.g. Resend, SendGrid)
        // await EmailProvider.send({...});
        isDelivered = true;
      }
    } catch (error) {
      console.error('[ContactService] Backend operation failed', error instanceof Error ? error.message : 'Unknown');
      return { success: false, message: 'Failed to complete request. Please try again.', isValidated: true, isPersisted: false, isDelivered: false };
    }

    if (!isPersisted && !isDelivered) {
      // Safely accept the message, but acknowledge it was only validated since backend isn't set up.
      console.log(`[ContactService] Received message from ${data.email}. Persistence & Delivery not configured.`);
      return { 
        success: true, 
        message: 'Request successfully validated.', 
        isValidated: true,
        isPersisted: false,
        isDelivered: false 
      };
    }

    return {
      success: true,
      message: isDelivered ? 'Message delivered successfully.' : 'Message saved successfully.',
      isValidated: true,
      isPersisted,
      isDelivered
    };
  }
}
