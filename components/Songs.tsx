import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistState, playlistIdState } from '../atoms/playlistAtom'

export default function Songs() {
  const [playlist, setPlaylist]: any = useRecoilState(playlistState)

  return playlist?.tracks?.items.map(({ track }: any) => (
    <p key={track.id}>{track.name}</p>
  ))
}
