import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData()

  const from = formData.get('from')
  const to = formData.get('to')
  const subject = formData.get('subject')
  const text = formData.get('text')
  const html = formData.get('html')

  // do something with the email data...
  
  return NextResponse.json({ from, to, subject, text, html })
}


  // import { Resend } from 'resend';

// const resend = new Resend(process.env.EMAIL_API_KEY);

// export async function POST(request: Request) {
//   const { id } = await request.json();
//   try {
//     const data = await resend.emails.get(id);

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }