import useStore from '@/stores/store'
const store = useStore()
export function zoomIn() {
  if (store.waveScale <= 1) {
    return
  }
  store.waveScale /= [2, 2.5, 2][store.waveParams.multiplier]
  store.waveParams.widthPerBit *= [2, 2.5, 2][store.waveParams.multiplier]
  store.waveParams.multiplier = (store.waveParams.multiplier + 2) % 3
}
export function zoomOut() {
  if (store.waveScale >= store.maxTime / 8) {
    return
  }
  store.waveParams.multiplier = (store.waveParams.multiplier + 1) % 3
  store.waveScale *= [2, 2.5, 2][store.waveParams.multiplier]
  store.waveParams.widthPerBit /= [2, 2.5, 2][store.waveParams.multiplier]
}
