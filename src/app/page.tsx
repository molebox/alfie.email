import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-800">
      <div className="flex flex-col items-center justify-center text-zinc-200 min-h-screen">
        <h1 className='text-7xl'>alfie.email</h1>
        <p className="text-center text-4xl my-6 relative">
          Composable email, coming soon..<span className="text-cursor "></span>
        </p>
      </div>
    </main>
  )
}
