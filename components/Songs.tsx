import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState, playlistIdState } from '../atoms/playlistAtom'
import Song from './Song'

export default function Songs() {
  const playlist: any = useRecoilValue(playlistState)

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks?.items.map(({ track }: any, i: number) => (
        <Song key={track.id} track={track} order={i} />
      ))}
    </div>
  )
}
