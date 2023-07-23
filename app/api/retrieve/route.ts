import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(request: Request) {
  const { id } = await request.json();
  try {
    const data = await resend.emails.get(id);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}