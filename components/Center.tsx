import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState, playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

export default function Center() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState) // read-only alternative to useRecoilState
  const [playlist, setPlaylist]: any = useRecoilState(playlistState)
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    // Get a playlist
    spotifyApi
      .getPlaylist(playlistId)
      .then((data: any) => {
        setPlaylist(data.body)
      })
      .catch((err: any) => {
        console.error('Something went wrong!', err)
      })
  }, [spotifyApi, playlistId])

  console.log(playlist)
  const curPlaylist: any = playlist
  return (
    <div className="h-screen flex-grow overflow-y-scroll text-white scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user?.image || ''}
            alt="User Image"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b  ${color} to-black p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt={playlist?.name}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="xl-text-5xl text-2xl font-bold md:text-3xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}
