import { Header } from '@/components/header'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between bg-slate-800">
        <div className="flex flex-col items-center justify-center text-slate-200 min-h-screen">
          <h1 className='text-7xl'>alfie.email <span className="text-cursor "></span></h1>
        </div>
      </main>
    </>
  )
}
