import useStore from '@/stores/store'
import { binarySearch } from '../lib/search'
import type { Ref } from 'vue'
import waveConfig from '@/components/WaveConfig'
export function updateView(isInit: boolean, lineRef?: Ref<number[]>) {
  const store = useStore(),
    { initX, initY } = waveConfig,
    { widthPerBit, heightPerBit } = store.waveParams,
    waveScale = store.waveScale,
    interval = widthPerBit * waveScale,
    div = document.getElementById('myDiv') as HTMLElement,
    // 左右各扩展 10 个 interval, leftx * scale = 最左侧时间值
    leftX = Math.max(Math.floor(div.scrollLeft / interval) - 10, 0),
    rightX = Math.floor((div.scrollLeft + div.clientWidth) / interval) + 10
  // update line

  if (!isInit && lineRef) {
    for (let i = 0, x = leftX; x < rightX; x++, i++) {
      lineRef.value[i] = x
    }
  }
  // update waves
  // console.time('update wave')
  for (let signal of new Set(store.showSignals)) {
    const splitList = signal.split(' ')
    signal = splitList[2]

    // 信号位数，信号波形数据
    const signalBit = Number(splitList[1]),
      [signalKeys, signalValues] = store.showWaves.get(signal) as [
        number[],
        number[]
      ]
    const keysLen = signalValues.length
    if (keysLen === 0) {
      store.dRef.set(signal, [
        `M ${initX} ${initY + heightPerBit / 2}  l 2 -${heightPerBit / 2} H ${
          store.maxTime * widthPerBit + initX
        }`,
        `M ${initX} ${initY + heightPerBit / 2}  l 2 ${heightPerBit / 2} H ${
          store.maxTime * widthPerBit + initX
        }`,
      ])
      continue
    }
    let left = binarySearch(signalKeys, leftX * waveScale)
    const right = binarySearch(signalKeys, waveScale * rightX)

    // 0 <= left < keysLen
    left =
      store.waveParams.leftTime ?? Math.max(Math.min(left, keysLen - 1) - 1, 0)
    const mX = widthPerBit * signalKeys[left] + initX
    let d = ''
    // console.time('get dRef')

    if (signalBit === 1) {
      d = `M ${mX} ${signalValues[left] * -heightPerBit + initY + heightPerBit}`
      for (let j = left + 1; j <= right && j < keysLen; j++) {
        const i = signalKeys[j]

        d += ` H ${i * widthPerBit + initX} V ${
          signalValues[j] * -heightPerBit + initY + heightPerBit
        } `
      }
      // 是否需要最大位置处加路径
      if (right >= keysLen - 1 && signalValues[keysLen - 1] !== store.maxTime) {
        d += ` H ${store.maxTime * widthPerBit + initX}`
      }
      store.dRef.set(signal, [d])
    } else {
      d = `M ${mX} ${initY + heightPerBit / 2}`
      let d2 = `M ${mX} ${initY + heightPerBit / 2}`
      for (let j = left + 1; j <= right && j < keysLen; j++) {
        const i = signalKeys[j]
        d += ` l 2 -${heightPerBit / 2} H ${i * widthPerBit + initX - 2} l 2 ${
          heightPerBit / 2
        }`
        d2 += ` l 2 ${heightPerBit / 2} H ${i * widthPerBit + initX - 2} l 2 -${
          heightPerBit / 2
        }`
      }
      if (right >= keysLen - 1 && signalValues[keysLen - 1] !== store.maxTime) {
        d += ` l 2 -${heightPerBit / 2} H ${
          store.maxTime * widthPerBit + initX
        }`
        d2 += ` l 2 ${heightPerBit / 2} H ${
          store.maxTime * widthPerBit + initX
        }`
      }
      store.dRef.set(signal, [d, d2])
    }
    // console.timeEnd('get dRef')
  }
  // console.timeEnd('update wave')
}
