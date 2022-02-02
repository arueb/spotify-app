import { atom } from 'recoil'

export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: null, // initialized value
})

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
})
