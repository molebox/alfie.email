import { FolderProvider } from "@/lib/context";
import { Toaster } from "@/components/ui/toaster"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";

export default async function DashboardLayout({ children }: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  console.log('currentUser: ', { user });

  if (!user) {
    console.log('no user');
    return (
      <SignUp
        afterSignUpUrl="/standard"
        appearance={{ variables: { colorPrimary: "#000" } }}
      />
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress
    }
  });

  console.log({ existingUser });

  if (!existingUser) {

    const newUser = await prisma.user.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + ' ' + user.lastName,
        clerkId: user.id,
      },
    });
    console.log('user email: ', user.emailAddresses[0]);

    console.log({ newUser });
  }

  return (
    <FolderProvider>
      <div className="bg-slate-300">
        {children}
        <Toaster />
      </div>
    </FolderProvider>
  )
}