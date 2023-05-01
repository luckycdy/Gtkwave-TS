<template>
  <div>
    <slot>
      <li class="flex items-center justify-between px-3 hover:bg-slate-300">
        <span
          class="mr-2 inline-block font-bold"
          :class="{'invisible': !isSelect}"
          >&#x221A;</span
        >
        <p class="flex-1 text-left">{{ leftText }}</p>
        <p class=" text-right">{{ rightText }}</p>
      </li>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  leftText?: string
  rightText?: string
  isSelect?: boolean
}>(), {
  isSelect: false
})
</script>

<style scoped></style>
