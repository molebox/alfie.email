import { SignUp } from "@clerk/nextjs";

export default async function Page() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-200">
      <SignUp
        afterSignUpUrl="/standard"
        appearance={{ variables: { colorPrimary: "#00000" } }}
      />
    </div>
  )
}