'use server'
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache'
import { usePathname } from 'next/navigation'

export async function getEmails(pathname: string) {
  const emails = await prisma.email.findMany();
  console.log({ emails });
  revalidatePath(pathname);
  return emails;
}