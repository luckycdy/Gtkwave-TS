<template>
  <button
    class="rounded border bg-white p-1.5 disabled:pointer-events-none disabled:opacity-50"
    :class="{
      'border-green-600 bg-green-400': type === 'success',
      'border-red-700 bg-red-500': type === 'warning',
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
