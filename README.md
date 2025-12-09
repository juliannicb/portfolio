This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact Form Email Delivery

The contact form posts to `/api/contact` and sends an email via Resend to `jngbrandalise@live.com`.

### Setup

1. Create a Resend account and obtain an API key.
2. Add the following to your environment (e.g., `.env.local`) and in your Vercel project Settings → Environment Variables (for Preview and Production):

```
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXX
CONTACT_TO_EMAIL=jngbrandalise@live.com
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
```

3. Restart the dev server.

With the API key set, submissions will be delivered from `onboarding@resend.dev` (or your verified domain) to your inbox. In production, you may prefer setting `CONTACT_FROM_EMAIL` to a sender on a verified domain in Resend.

### Notes

- Validation is enforced (name, email, subject, message).
- Basic rate limiting is applied (5 requests / 15 minutes per IP).
- On failure (missing API key or send error), the API returns an error status.
- The contact API route explicitly runs on the Node.js runtime for compatibility with the Resend SDK.
- Check Vercel → Deployments → Functions logs for `POST /api/contact` to debug production errors.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
