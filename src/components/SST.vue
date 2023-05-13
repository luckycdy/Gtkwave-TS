<template>
  <div class="mx-2 my-4">
    <button @click="showSST = !showSST">
      <span v-if="showSST">▽</span>
      <span v-else>▷</span>
      <span class="align-middle ml-2">SST</span>
    </button>
    <div v-show="showSST" class="w-96">
      <div class="h-96 rounded-lg border bg-white p-2 overflow-auto">
        <SSTModuleTree :tree-data="store.modules" />
      </div>
      <div class="rounded-lg border bg-white p-1 mt-5">
        <SSTSignals />
      </div>
      <SSTButtons />
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
store.getModules('dump2')
const showSST = ref(true)
</script>

<style scoped></style>
