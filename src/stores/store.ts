import http from '@/lib/http'
import { defineStore } from 'pinia'
import type { RecursiveRecord } from '@/components/SSTModuleTree.vue'

interface StoreProps {
  modules: RecursiveRecord<Record<string, never>>
  signalsOfModule: Record<string, string[]>
  curModule: string
  curSignals: Set<string>
  filter: string
}

interface Modules {
  modules: RecursiveRecord<Record<string, never>>
  signalsOfModule: Record<string, string[]>
}

const useStore = defineStore('store', {
  state: (): StoreProps => {
    return {
      modules: {},
      signalsOfModule: {},
      curModule: '',
      curSignals: new Set(),
      filter: '',
    }
  },
  getters: {},
  actions: {
    async getModules(fileName: string) {
      const data = (await http.get(`/waves/${fileName}/modules`)) as Modules
      this.$state.modules = data['modules']
      this.$state.signalsOfModule = data['signalsOfModule']
    },
    async getSignal(fileName: string, payload: Record<string, string>) {
      await http.get(`/waves/${fileName}/scales`, { params: payload })
    },
  },
})

export default useStore
