<template>
  <div
    class="group relative z-10 border-b-2 border-transparent leading-10 hover:border-green-400"
  >
    <p class="title cursor-pointer px-3">{{ title }}</p>
    <ul
      class="invisible absolute left-0 mt-0.5 flex flex-col rounded-md border bg-white pt-1 group-hover:visible"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped></style>
