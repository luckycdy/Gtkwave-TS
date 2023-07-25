<template>
  <div>
    <button @click="showSST = !showSST">
      <span v-if="showSST">▽</span>
      <span v-else>▷</span>
      <span class="ml-2 align-middle">SST</span>
    </button>
    <div
      :class="{ invisible: !showSST }"
      class="flex h-full w-96 flex-col justify-between"
    >
      <div>
        <div class="h-96 overflow-auto rounded-lg border bg-white p-2">
          <SSTModuleTree :tree-data="store.modules" />
        </div>
        <div class="mt-5 rounded-lg border bg-white p-1">
          <SSTSignals />
        </div>
      </div>
      <SSTButtons class="mb-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SSTModuleTree from './SSTModuleTree.vue'
import SSTSignals from './SSTSignals.vue'
import SSTButtons from './SSTButtons.vue'
import useStore from '@/stores/store'
const store = useStore()
store.getHeader('dump2')
const showSST = ref(true)
</script>

<style scoped></style>
