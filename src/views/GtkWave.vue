<template>
  <div>
    <Header></Header>
    <div class="my-4 flex">
      <SST class="mx-2"></SST>
      <SignalsSection class="mx-2"></SignalsSection>
      <WavesSection class="mx-2 max-w-7xl" style="width: 80rem"></WavesSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/GlobalHeader.vue'
import SST from '@/components/SST.vue'
import SignalsSection from '@/components/SignalsSection.vue'
import WavesSection from '@/components/WavesSection.vue'
</script>

<style scoped></style>
