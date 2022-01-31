import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify Party</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="h-screen overflow-hidden bg-black">
        <Sidebar />
        {/* Center */}
      </main>
      <div>{/* Player */}</div>
    </div>
  )
}
