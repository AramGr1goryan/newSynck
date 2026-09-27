# Project SyncK - Contact Form Production Setup

This document outlines the steps required to configure the production backend infrastructure for the Contact Form, specifically the distributed rate limiter and the email delivery provider.

## 1. Upstash Redis (Distributed Rate Limiting)

Since the application is designed to be deployed on Vercel (or other serverless platforms), the in-memory rate limiter will not work across different Edge nodes or serverless function instances. We use **Upstash Redis** to provide a global, low-latency rate limiter.

### Setup Steps
1. Create a free account at [Upstash](https://upstash.com/).
2. Create a new Redis database (select the region closest to your Vercel deployment, e.g., us-east-1 or eu-central-1).
3. Once created, scroll down to the **REST API** section in the Upstash Console.
4. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
5. Add these exact keys to your Vercel Environment Variables.

## 2. Resend (Email Delivery)

We use **Resend** as the transactional email provider to reliably deliver contact form submissions.

### Setup Steps
1. Create a free account at [Resend](https://resend.com/).
2. Navigate to **API Keys** and generate a new key. Give it sending permissions.
3. Copy the generated API key.
4. Navigate to **Domains** and verify your sending domain (e.g., `mg.yourdomain.com` or `yourdomain.com`). This is required to send emails reliably without ending up in spam.
5. In your Vercel Environment Variables, add the following:
   - `RESEND_API_KEY`: The API key you just generated.
   - `CONTACT_FROM_EMAIL`: The verified email address you are sending *from* (e.g., `noreply@yourdomain.com`).
   - `CONTACT_TO_EMAIL`: The email address where you want to *receive* the contact requests (e.g., `founder@yourdomain.com`).

## 3. Environment Variables Overview

You must configure the following private environment variables in Vercel for the Production environment:

```env
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL=noreply@yourdomain.com
CONTACT_TO_EMAIL=hello@yourdomain.com
```

*Note: Do NOT prefix any of these with `NEXT_PUBLIC_` as they are highly sensitive and should remain server-side only.*

## 4. Vercel Deployment

1. Go to your Project settings in Vercel.
2. Navigate to **Environment Variables**.
3. Add all the variables listed above. Ensure they are enabled for the **Production** environment (and **Preview** if you want to test them in PR deployments).
4. **IMPORTANT:** After adding or changing environment variables, you MUST redeploy your application for the changes to take effect. Go to the "Deployments" tab and click "Redeploy" on your latest build.

## 5. Production Verification

Once deployed, visit your live URL and test the following:
1. **Successful Delivery**: Submit a valid form. You should see the localized success UI and receive an email at `CONTACT_TO_EMAIL`.
2. **Rate Limiting**: Submit the form 6 times in a row. The 6th attempt should be rejected with a "Too many requests" message.
3. **Honeypot**: (Requires manual HTML manipulation to test) If the hidden `website` field is filled, the form should silently reject it without sending an email.
