import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Ensure Node.js runtime for compatibility with Resend SDK
export const runtime = 'nodejs';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 requests per window

  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (record.count >= maxRequests) {
    return true;
  }
  
  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body (trim inputs to avoid false failures)
    const body = await request.json();
    const sanitized = {
      name: (body?.name ?? '').toString().trim(),
      email: (body?.email ?? '').toString().trim(),
      subject: (body?.subject ?? '').toString().trim(),
      message: (body?.message ?? '').toString().trim(),
    };
    const validatedData = contactSchema.parse(sanitized);

    // Attempt to send email via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Unable to send email.');
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const toAddress = (process.env.CONTACT_TO_EMAIL || 'jngbrandalise@live.com').trim();
    const rawFrom = (process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>').trim();
    // Strip wrapping quotes if the value was entered as "Display <email>"
    const fromAddress = rawFrom.replace(/^"(.*)"$/, '$1');

    const subject = `New contact: ${validatedData.subject}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${validatedData.message}</pre>
        <hr />
        <p style="color:#666"><small>IP: ${ip}</small></p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject,
      html,
      replyTo: validatedData.email,
    });

    if (error) {
      console.error('Resend email error:', error);
      return NextResponse.json(
        {
          error: 'Failed to send email. Please try again later.',
          details: typeof error === 'object' && error !== null ? {
            name: (error as any).name,
            message: (error as any).message,
            statusCode: (error as any).statusCode,
          } : undefined
        },
        { status: 502 }
      );
    }

    console.log('Contact form submission sent via Resend:', { id: data?.id, ip });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! I've sent it to my inbox.",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
