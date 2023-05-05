<template>
  <div
    class="nav-item relative leading-10 hover:border-b-4 hover:border-green-400"
  >
    <p class="title cursor-pointer px-3">{{ title }}</p>
    <ul
      class="dropdown-container invisible absolute left-0 flex flex-col border pt-1"
      :style="{ width: props.width || 'auto' }"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  isShow?: boolean;
  width?: string;
}>();
</script>

<style scoped>
.nav-item:hover .dropdown-container {
  visibility: visible;
}
</style>
