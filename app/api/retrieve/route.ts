import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { put } from '@vercel/blob';

// export async function POST(request: Request) {
//   const formData = await request.formData()

//   const from = formData.get('from')
//   const to = formData.get('to')
//   const subject = formData.get('subject')
//   const html = formData.get('html')
//   const cc = formData.get('cc') || []
//   const bcc = formData.get('bcc') || []

//   console.log('DATA: ', { from, to, subject, html, cc, bcc })

//   const fromStr = typeof from === 'string' ? from : ''
//   const toStr = typeof to === 'string' ? to : ''
//   const subjectStr = typeof subject === 'string' ? subject : ''
//   const htmlStr = typeof html === 'string' ? html : ''
//   const ccArr = Array.isArray(cc) ? cc : []
//   const bccArr = Array.isArray(bcc) ? bcc : []

//   const user = await prisma.user.findUnique({ where: { email: toStr } });

//   if (!user) {
//     console.error(`No user found for email ${to}`);
//     return NextResponse.next(); // Or handle this case as you prefer
//   }


//   const newEmail = await prisma.email.create({
//     data: {
//       from: fromStr,
//       to: toStr,
//       subject: subjectStr,
//       body: htmlStr,
//       type: 'RECEIVED',
//       user: { connect: { id: user.id } },
//       read: false,
//       CC: { create: ccArr.map(address => ({ address })) },
//       BCC: { create: bccArr.map(address => ({ address })) },
//     },
//   });


//   console.log('Saved email: ', newEmail)

//   return NextResponse.json(newEmail, { status: 200 });
//}


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

interface AttachmentPayload {
  filename: string;
  content: string; // base64 encoded string of the file content
}

interface EmailPayload {
  From: string;
  To: string;
  CcFull: { Email: string }[];
  BccFull: { Email: string }[];
  Subject: string;
  HtmlBody: string;
  Attachments: AttachmentPayload[];
}

export async function POST(request: NextRequest) {
  try {
    const data: EmailPayload = await request.json();
    console.log('DATA: ', data)

    const user = await prisma.user.findUnique({
      where: { email: data.From },
    });

    // If the user isn't found, throw an error.
    if (!user) {
      throw new Error("User not found");
    }

    // Map CC addresses
    const ccAddresses = data.CcFull.map((cc) => {
      return { address: cc.Email };
    });

    // Map BCC addresses
    const bccAddresses = data.BccFull.map((bcc) => {
      return { address: bcc.Email };
    });

    // Map attachments and upload to blob store
    let attachments: { filename: string; path: string }[] = [];
    if (data.Attachments) {
      // Map attachments and upload to blob store
      const attachmentsPromises = data.Attachments.map(async (attachment) => {
        const filename = attachment.filename;
        const content = Buffer.from(attachment.content, 'base64');

        const blob = await put(filename, content, { access: 'public' });

        return {
          filename: filename,
          path: blob.url, // Store the URL of the blob
        };
      });

      attachments = await Promise.all(attachmentsPromises);
    }

    const newEmail = await prisma.email.create({
      data: {
        subject: data.Subject,
        body: data.HtmlBody,
        from: data.From,
        to: data.To,
        type: 'RECEIVED',
        user: { connect: { id: user.id } },
        read: false,
        folder: 'standard',
        CC: { create: ccAddresses },
        BCC: { create: bccAddresses },
        attachments: { create: attachments }
      },
    });

    console.log('Saved email: ', newEmail);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

