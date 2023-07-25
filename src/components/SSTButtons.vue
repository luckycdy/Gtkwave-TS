<template>
  <div class="mt-2">
    <label>
      <span class="pr-2">Filter:</span>
      <input
        v-model="filter"
        type="text"
        class="ml-1 rounded-sm pl-2 outline-1 outline-green-200"
        @input="changeFilter()"
      />
    </label>
    <div class="mt-2 flex">
      <BasicButton class="flex-1" @click="appendShowSignals"
        >Append</BasicButton
      >
      <BasicButton class="ml-2 flex-1">Insert</BasicButton>
      <BasicButton class="ml-2 flex-1">Replace</BasicButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/stores/store'
import BasicButton from './BasicButton.vue'
import { ref } from 'vue'
import { updateView } from '../hooks/useDrawWaves'
const filter = ref<string>('')
const store = useStore()
const changeFilter = () => {
  store.filter = filter.value
  store.curSSTSignals.clear()
}

const appendShowSignals = async () => {
  // 将当前选中的信号加入展示信号中
  store.showSignals = [...store.showSignals, ...store.curSSTSignals]
  store.color = [...store.color, ...new Array(store.curSSTSignals.size)]
  // 筛选未曾添加过的信号
  const signals = [...store.curSSTSignals]
    .map((v) => v.split(' ')[2])
    .filter((v) => !store.showWaves.has(v))

  // 先 clear，否则选中信号的颜色会在 await 后才消失，有延迟感
  store.curSSTSignals.clear()
  if (signals.length !== 0) {
    await store.getSignal('dump2', {
      signals,
    })
    updateView(true)
  }
}
</script>

<style scoped></style>
