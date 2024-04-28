import Image from 'next/image'
import Navigation from './components/Navigation'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col container mx-auto items-center justify-center px-12 py-4 bg-black">
      <h1 className='font-bold text-white text-4xl lg:text-6xl py-4'>Appministration</h1>
      <h4 className='text-{#ADB7BE} font-thin text-lg lg:text-xl py-2'  >Managing and configurating daily tasks</h4>
      <Navigation/>
    </main>
  )
}
