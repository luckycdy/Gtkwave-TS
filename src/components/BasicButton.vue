<template>
  <button
    class="border rounded p-1.5 bg-white disabled:opacity-50 disabled:pointer-events-none"
    :class="{
      'bg-green-400 border-green-600': type === 'success',
      'bg-red-500 border-red-700': type === 'warning',
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'success' | 'warning' | 'default'
}>()
</script>

<style scoped></style>
