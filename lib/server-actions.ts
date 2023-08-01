'use server'
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache'

export async function getEmails(pathname: string) {
  const emails = await prisma.email.findMany({
    include: {
      attachments: true, // this includes attachments in the fetch
    },
  });
  console.log({ emails });
  console.log('Pathname: ', pathname);
  revalidatePath(pathname);
  return emails;
}