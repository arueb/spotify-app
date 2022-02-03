import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { debounce } from 'lodash'
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  ReplyIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'

export default function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(0)
  const songInfo: any = useSongInfo()

  const handlePlayPause = async () => {
    const { body: response } = await spotifyApi.getMyCurrentPlaybackState()
    response.is_playing ? spotifyApi.pause() : spotifyApi.play()
    setIsPlaying(!isPlaying)
  }
  //   const handlePlayPause = () => {
  //     spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
  //       if (data.body.is_playing) {
  //         spotifyApi.pause()
  //         setIsPlaying(false)
  //       } else {
  //         spotifyApi.play()
  //         setIsPlaying(true)
  //       }
  //     })
  //   }

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

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume: any = useCallback(
    debounce((volume: number) => {
      spotifyApi.setVolume(volume).catch((err: any) => {})
    }, 500),
    []
  )

  return (
    <div className="ms:text-base grid h-24 grid-cols-3  bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8">
      {/* left  */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album?.images?.[0]?.url}
          alt={songInfo?.album?.name}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {!isPlaying ? (
          <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
        ) : (
          <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      {/* right */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  )
}
