<template>
  <div class="">
    <div class="border-b-2 pl-3">
      <span>Type</span>
      <span class="pl-2 ml-2 border-l-2">Signals</span>
    </div>
    <div class="h-96 overflow-auto p-1">
      <div
        v-for="(value, key) in filterSignalsList"
        :key="key"
        class="pl-3 cursor-pointer"
        :class="{
          'outline-green-700 rounded-md outline-1 bg-green-500 outline':
            curSignals?.has(value),
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
const { signalsOfModule, curModule, curSignals, filter } = storeToRefs(store)
const filterSignalsList = computed(() => {
  if (filter.value) {
    return signalsOfModule.value[curModule.value].filter((v) =>
      v.includes(filter.value)
    )
  }
  return signalsOfModule.value[curModule.value]
})
const selectSignals = (value: string) => {
  if (curSignals.value.has(value)) {
    curSignals.value.delete(value)
  } else {
    curSignals.value?.add(value)
  }
}
</script>

<style scoped></style>
