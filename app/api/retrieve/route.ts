import { NextResponse } from 'next/server';
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

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json('Email received', {
    status: 200
  });
  // try {
  //   return NextResponse.json('Email received', {
  //     status: 200
  //   });
  // } catch (error) {
  //   return NextResponse.json({ error });
  // }
}