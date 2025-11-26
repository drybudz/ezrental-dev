import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const body = await request.json();

    const name = body?.name?.trim();
    const company = body?.company?.trim();
    const email = body?.email?.trim();
    const message = body?.message?.trim();
    const contactType = body?.contactType?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { ok: false, error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    // onboarding@resend.dev will change to contact@ezrentalandservices.com once I have set up the domain & email in resend.
    await resend.emails.send({
      from: 'EZ Rental Contact <onboarding@resend.dev>',
      to: ['keno10cr@gmail.com', 'charlieacarlson@gmail.com', 'sarah@ezrentalandservices.com'],
      subject: `New contact submission${contactType ? ` - ${contactType}` : ''}`,
      replyTo: email,
      text: `Name: ${name}
Company: ${company || 'N/A'}
Email: ${email}
Contact Type: ${contactType || 'N/A'}

Message:
${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error sending contact email', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
