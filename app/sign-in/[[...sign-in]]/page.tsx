import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-200">
      <SignIn afterSignInUrl='/dashboard' appearance={{ variables: { colorPrimary: "#000000" } }} />
    </div>
  )
}