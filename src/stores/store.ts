import http from '@/lib/http'
import { defineStore } from 'pinia'
import type { RecursiveRecord } from '@/components/SSTModuleTree.vue'

interface StoreProps {
  modules: Header['modules']
  signalsOfModule: Header['signalsOfModule']
  maxTime: Header['maxTime']
  curSSTModule: string
  curSSTSignals: Set<string>
  filter: string
  showSignals: string[]
  showWaves: Map<string, [number[], number[]]>
  dRef: Map<string, string[]>
  color: string[]
  showSignalIndex: number
  markerCursor: number | null
  waveScale: number
  waveParams: {
    widthPerBit: number
    heightPerBit: number
    multiplier: number
    leftTime: number | null
    cursorTime: number
  }
}

interface Header {
  modules: RecursiveRecord<Record<string, never>>
  signalsOfModule: Record<string, string[]>
  timeScale?: string
  maxTime: number
}

const useStore = defineStore('store', {
  state: (): StoreProps => {
    return {
      modules: {},
      signalsOfModule: {},
      maxTime: 0,
      curSSTModule: '',
      curSSTSignals: new Set(),
      filter: '',
      showSignals: [],
      showWaves: new Map(),
      dRef: new Map(),
      color: [],
      showSignalIndex: -1,
      markerCursor: null,
      waveScale: 1,
      waveParams: {
        widthPerBit: 200,
        heightPerBit: 15,
        multiplier: 0,
        leftTime: null,
        cursorTime: 0,
      },
    }
  },
  getters: {},
  actions: {
    async getHeader(fileName: string) {
      const data = (await http.get(`/waves/${fileName}/header`)) as Header
      this.$state.modules = data['modules']
      this.$state.signalsOfModule = data['signalsOfModule']
      this.$state.maxTime = data['maxTime']
    },
    async getSignal(fileName: string, payload: Record<string, any>) {
      try {
        const data = (await http.post(
          `/waves/${fileName}/signal`,
          payload
        )) as Record<string, Record<string | number, number>>
        // 后端只能传输 obj，传稀疏数组时会被替换 null，
        // 转为一一对应的两组数组，否则 updateView 时频繁 object.keys() 损失性能 30+ms
        for (const signal of Object.keys(data)) {
          const wavesIndex: number[] = [],
            wavesValue: number[] = []
          for (const key of Object.keys(data[signal])) {
            wavesIndex.push(Number(key))
            wavesValue.push(data[signal][key])
          }
          this.$state.showWaves.set(signal, [wavesIndex, wavesValue])
        }
        console.log(this.showWaves)
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export default useStore
