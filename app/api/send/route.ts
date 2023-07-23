import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(response: Response) {
  const { to, from, subject, firstName, product } = await response.json();
  try {
    const data = await resend.emails.send({
      from: `${firstName} <${from}>`,
      to,
      subject,
      react: EmailTemplate({ firstName, product }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}