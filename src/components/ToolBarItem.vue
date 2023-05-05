<template>
  <button
    class=" group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-sm hover:bg-slate-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30"
  >
    <slot name="default"></slot>
    <div
      class="invisible absolute left-12 top-12 whitespace-nowrap rounded-sm bg-cyan-500  px-2 leading-10 opacity-0 transition duration-500 group-hover:visible group-hover:opacity-70"
    >
      <slot name="prompt"> </slot>
    </div>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
