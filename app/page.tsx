import { Header } from '@/components/header'
import { currentUser, useUser } from "@clerk/nextjs";
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between bg-slate-800">
        <div className="flex flex-col items-center justify-center text-slate-200 min-h-screen relative">
          <h1 className='text-7xl relative'>alfie.email <span className="text-cursor "></span></h1>
          {user ? <Link className="text-2xl text-slate-200" href="/standard">Go to your inbox</Link> : null}
        </div>
      </main>
    </>
  )
}
