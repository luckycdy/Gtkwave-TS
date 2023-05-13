<template>
  <button
    name="dropdown-item"
    class="bg-white hover:bg-slate-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
  >
    <slot>
      <li class="flex flex-1 items-center justify-between px-3">
        <span
          class="mr-2 inline-block font-bold"
          :class="{ invisible: !isSelect }"
          >&#x221A;</span
        >
        <p class="mr-12 flex-1 whitespace-nowrap text-left">{{ leftText }}</p>
        <p class="text-right">{{ rightText }}</p>
      </li>
    </slot>
    <slot v-if="children" name="children">
      <div class="dropdown-wrapper invisible relative -top-10 translate-x-full">
        <ul class="absolute flex flex-col border">
          <DropdownItem
            v-for="(child, key) in children"
            :key="key"
            :left-text="child.leftText"
            :right-text="child.rightText"
            :class="child.class"
            :is-select="child.isSelect?.value"
            :disabled="child.isDisabled?.value"
            :children="child.children"
          >
          </DropdownItem>
        </ul>
      </div>
    </slot>
  </button>
</template>

<script setup lang="tsx">
import DropdownItem from '@/components/DropdownItem.vue'
import type { ItemProp } from './NavItemData'
defineProps<{
  leftText?: string
  rightText?: string
  isSelect?: boolean
  children?: ItemProp[]
}>()
</script>

<style scoped>
[name="dropdown-item"]:hover > .dropdown-wrapper {
  visibility: visible;
}
</style>
