<template>
  <div>
    <div v-for="(value, name, key) in treeData" :key="key" ref="treeRefs">
      <div
        class="relative cursor-pointer"
        :class="{
          'rounded-md bg-green-500 outline outline-1 outline-green-700':
            name === store.curSSTModule,
        }"
        @click="toggleShow(name as string)"
      >
        <span
          class="absolute top-1.5 text-cyan-200 opacity-70"
          style="font-size: 0.5em"
          >{{ showAhead(value, name as string) }}</span
        >
        <span class="pl-3">{{ name }}</span>
      </div>
      <SSTModuleTree
        v-show="Object.keys(value).length !== 0 && showTreesSet.has(name as string)"
        :tree-data="value"
        class="ml-4"
      ></SSTModuleTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import SSTModuleTree from '@/components/SSTModuleTree.vue'
import { ref } from 'vue'
import useStore from '@/stores/store'
const store = useStore()
const treeRefs = ref<HTMLElement | null>(null)

const showAhead = (
  value: RecursiveRecord<Record<string, never>>,
  name: string
) => {
  if (Object.keys(value).length !== 0) {
    if (!showTreesSet.value.has(name as string)) {
      return '➕'
    }
    return '➖'
  }
  return ''
}
export interface RecursiveRecord<T> {
  [key: string]: T | RecursiveRecord<T>
}
const showTreesSet = ref<Set<string>>(new Set())
const toggleShow = (name: string) => {
  if (showTreesSet.value.has(name)) {
    showTreesSet.value.delete(name)
  } else {
    showTreesSet.value.add(name)
  }
  if (store.curSSTModule !== name) {
    store.curSSTSignals.clear()
    store.curSSTModule = name
  }
}
defineProps<{
  treeData: RecursiveRecord<Record<string, never>>
}>()
</script>

<style scoped></style>
