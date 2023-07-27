import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const formData = await request.formData()

  const from = formData.get('from')
  const to = formData.get('to')
  const subject = formData.get('subject')
  const html = formData.get('html')
  const cc = formData.get('cc') || []
  const bcc = formData.get('bcc') || []

  console.log('DATA: ', { from, to, subject, html, cc, bcc })

  const fromStr = typeof from === 'string' ? from : ''
  const toStr = typeof to === 'string' ? to : ''
  const subjectStr = typeof subject === 'string' ? subject : ''
  const htmlStr = typeof html === 'string' ? html : ''
  const ccArr = Array.isArray(cc) ? cc : []
  const bccArr = Array.isArray(bcc) ? bcc : []

  const user = await prisma.user.findUnique({ where: { email: toStr } });

  if (!user) {
    console.error(`No user found for email ${to}`);
    return NextResponse.next(); // Or handle this case as you prefer
  }


  const newEmail = await prisma.email.create({
    data: {
      from: fromStr,
      to: toStr,
      subject: subjectStr,
      body: htmlStr,
      type: 'RECEIVED',
      user: { connect: { id: user.id } },
      read: false,
      CC: { create: ccArr.map(address => ({ address })) },
      BCC: { create: bccArr.map(address => ({ address })) },
    },
  });


  console.log('Saved email: ', newEmail)

  return NextResponse.json(newEmail, { status: 200 });
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