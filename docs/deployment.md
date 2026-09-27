# Project SyncK - Vercel Deployment Guide

This document outlines the steps for a robust, production-ready deployment of Project SyncK to Vercel.

## 1. Requirements
* A GitHub repository containing the Project SyncK source code.
* A Vercel account linked to your GitHub.

## 2. Importing the Project
1. Go to your Vercel Dashboard and click **Add New... > Project**.
2. Select your Project SyncK repository.
3. Vercel will automatically detect the **Next.js** framework.
   - Build Command: `next build` (or `npm run build`)
   - Install Command: `npm install`
   - Output Directory: `.next`

## 3. Environment Variables
Vercel allows you to configure environment variables separately for **Production**, **Preview**, and **Development**.

Add the following variables to the Vercel dashboard. Do NOT prefix them with `NEXT_PUBLIC_` to keep them secure on the server side:

### Required for Distributed Rate Limiting (Upstash Redis)
* `UPSTASH_REDIS_REST_URL`
* `UPSTASH_REDIS_REST_TOKEN`

### Required for Email Delivery (Resend)
* `RESEND_API_KEY`
* `CONTACT_FROM_EMAIL` (e.g., `noreply@yourdomain.com`)
* `CONTACT_TO_EMAIL` (e.g., `contact@yourdomain.com`)

*Important: Whenever you add or change environment variables, you must redeploy your application for the changes to take effect.*

## 4. Custom Domain Setup
1. In your Vercel project, go to **Settings > Domains**.
2. Add your custom domain (e.g., `project-synck.com`).
3. Follow the DNS instructions provided by Vercel to verify domain ownership (usually adding an A record or CNAME).
4. Once verified, Vercel will automatically provision an SSL certificate.

## 5. Post-Deployment Verification
After deploying the production build, navigate to your live domain and verify:
1. **Initial Load & Assets:** Ensure all fonts, SVGs, videos, and images load correctly via Vercel's Edge Network.
2. **Routing:** Check that locale switching (`/en`, `/ru`, `/hy`) works.
3. **Contact Form E2E Test:**
   * Submit a valid form to confirm you receive an email via Resend.
   * Attempt multiple submissions to verify the Upstash Rate Limiting returns an error ("Too many requests").
   * Verify there are no console errors or leaked credentials in the browser network tab.

## 6. Privacy & Analytics
Currently, Project SyncK does not embed automated trackers. All contact form logic happens securely on the server without logging full Personal Identifiable Information (PII) to stdout. If you need to integrate Google Analytics or similar tools later, ensure they comply with your target privacy regulations (e.g., GDPR).
