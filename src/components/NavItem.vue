<template>
  <div class="relative">
    <span class="">{{title}}</span>
    <ul
      class=" absolute left-0 top-8 mt-2 border"
      :class="{'invisible': !isShow}"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string,
    isShow?: boolean
}>()
</script>

<style scoped></style>
