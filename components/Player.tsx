import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'

export default function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(0)
  const songInfo: any = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        console.log('Now playing: ', data.body?.item)
        setCurrentTrackId(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
          console.log('Is playing: ', data.body?.is_playing)
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch current song info
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900  text-white">
      {/* left  */}
      <div>
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album?.images?.[0]?.url}
          alt={songInfo?.album?.name}
        />
      </div>
      <div>
        <h3>{songInfo?.name}</h3>
        <p>{songInfo?.artists?.[0]?.name}</p>
      </div>
    </div>
  )
}
