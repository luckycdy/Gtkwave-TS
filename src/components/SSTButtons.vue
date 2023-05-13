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
      <BasicButton class="flex-1">Append</BasicButton>
      <BasicButton class="ml-2 flex-1">Insert</BasicButton>
      <BasicButton class="ml-2 flex-1">Replace</BasicButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/stores/store'
import BasicButton from './BasicButton.vue'
import { ref } from 'vue'

const filter = ref<string>('')
const store = useStore()
const changeFilter = () => {
  store.filter = filter.value
  store.curSignals.clear()
}
</script>

<style scoped></style>
