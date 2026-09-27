"use server";

import { headers } from 'next/headers';
import { ContactService, ContactData, ContactResponse } from '@/services/contact';

export async function submitContactForm(formData: FormData): Promise<ContactResponse> {
  // 1. Extract and sanitize
  const data: ContactData = {
    name: formData.get('name')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    message: formData.get('message')?.toString() || '',
    honeypot: formData.get('website')?.toString() || '', // Using 'website' as honeypot name
  };

  // 2. Identify IP for rate limiting
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown-ip';

  // 3. Process via Service
  try {
    return await ContactService.submit(data, ip);
  } catch (error) {
    // Log safe error internally, return generic error externally
    console.error('[Action:submitContactForm] Unexpected error:', error instanceof Error ? error.message : 'Unknown');
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
      isValidated: true,
      isPersisted: false,
      isDelivered: false
    };
  }
}
