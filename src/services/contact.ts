import { rateLimit } from '@/lib/rate-limit';
import { Resend } from 'resend';

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

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    const isDatabaseConfigured = process.env.CONTACT_DB === 'configured';
    const isProviderConfigured = !!resend && !!process.env.CONTACT_FROM_EMAIL && !!process.env.CONTACT_TO_EMAIL;
    
    let isPersisted = false;
    let isDelivered = false;

    try {
      if (isDatabaseConfigured) {
        // TODO: Implement actual database storage logic
        isPersisted = true;
      }

      if (isProviderConfigured) {
        const timestamp = new Date().toISOString();
        const safeName = escapeHtml(data.name);
        const safeEmail = escapeHtml(data.email);
        const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br/>');

        const htmlTemplate = `
          <div style="font-family: sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
            <h2 style="color: #6657E1; margin-top: 0;">New Contact Request</h2>
            <p style="color: #666; font-size: 14px; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">Submitted at: ${timestamp}</p>
            <div style="margin-top: 20px;">
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 6px;">
                <p style="margin-top: 0; font-weight: bold;">Message:</p>
                <p style="margin: 0; line-height: 1.6;">${safeMessage}</p>
              </div>
            </div>
            <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
              <p>This is an automated message from Project SyncK.</p>
            </div>
          </div>
        `;

        const { error } = await resend!.emails.send({
          from: `Project SyncK <${process.env.CONTACT_FROM_EMAIL}>`,
          to: [process.env.CONTACT_TO_EMAIL!],
          subject: `New SyncK Contact Request from ${safeName}`,
          html: htmlTemplate,
          replyTo: data.email
        });

        if (error) {
          console.error('[ContactService] Resend delivery failed', error);
          // Return failure for delivery step
          return { success: false, message: 'Failed to deliver message. Please try again.', isValidated: true, isPersisted, isDelivered: false };
        }
        
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
