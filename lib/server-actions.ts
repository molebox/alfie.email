'use server'
import prisma from '@/lib/prisma';

export async function getEmails() {
  const emails = await prisma.email.findMany();
  console.log({ emails });
  return emails;
}