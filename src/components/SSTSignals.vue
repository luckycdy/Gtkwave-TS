<template>
  <div class="">
    <div class="border-b-2 pl-3">
      <span>Type</span>
      <span class="ml-2 border-l-2 pl-2">Signals</span>
    </div>
    <div class="overflow-auto p-1" style="height: 30rem">
      <div
        v-for="(value, key) in filterSignalsList"
        :key="key"
        class="mb-0.5 cursor-pointer pl-3"
        :class="{
          'rounded-md bg-green-500 outline outline-1 outline-green-700':
            curSSTSignals?.has(value),
        }"
        @click="selectSignals(value)"
      >
        <span>{{ value.split(' ')[0] }}</span>
        <span class="ml-5">{{
          value.split(' ')[value.split(' ').length - 1]
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/stores/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const store = useStore()
const { signalsOfModule, curSSTModule, curSSTSignals, filter } =
  storeToRefs(store)
const filterSignalsList = computed(() => {
  if (filter.value) {
    return signalsOfModule.value[curSSTModule.value].filter((v) =>
      v.includes(filter.value)
    )
  }
  return signalsOfModule.value[curSSTModule.value]
})
const selectSignals = (value: string) => {
  if (curSSTSignals.value.has(value)) {
    curSSTSignals.value.delete(value)
  } else {
    curSSTSignals.value?.add(value)
  }
}
</script>

<style scoped></style>
