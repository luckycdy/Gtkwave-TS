<template>
  <div class="">
    <ul
      v-if="isShowMenu"
      ref="menuItemsRef"
      class="absolute z-10 flex flex-col rounded-md border bg-white pt-1"
      :style="`top: ${menuPos.top}px; left: ${menuPos.left}px`"
    >
      <DropdownItem
        v-for="(item, index) in menuItemsData"
        :key="index"
        :left-text="item.leftText"
        :right-text="item.rightText"
        :class="item.class"
        :children="item.children"
        :is-select="item.isSelect?.value"
        :disabled="item.isDisabled"
        @click="item.callback && item.callback()"
      ></DropdownItem>
    </ul>
    <span>Signals</span>
    <div
      class="borde flex h-full w-96 flex-col overflow-auto rounded-lg bg-white p-1 pt-5"
    >
      <div class="relative">
        <div
          v-for="(value, key) in showSignals"
          :key="`${value}_${key}`"
          class="mb-0.5 cursor-pointer pl-3"
          :class="{
            'rounded-md bg-green-400 outline outline-1 outline-green-700 ':
              draggingItemIndex === key || menuItemIndex === key,
            'border-t-2 border-dashed border-green-700':
              droppingItemIndex === key,
          }"
          draggable="true"
          @dragover.prevent
          @dragstart="handleDragStart(key)"
          @dragenter="getDropItemIndex(key)"
          @drop="handleDrop(key)"
          @dragend="clearDrag"
          @contextmenu.prevent="showMenu($event, key)"
        >
          {{ value }}
        </div>
      </div>
      <div
        class="flex-1"
        :class="{
          'border-t-2 border-dashed border-green-700':
            droppingItemIndex === store.showSignals.length,
        }"
        @dragover.prevent
        @drop="handleDrop(store.showSignals.length)"
        @dragenter="getDropItemIndex(store.showSignals.length)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/stores/store'
import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import DropdownItem from './DropdownItem.vue'
import useClickOutside from '@/hooks/useClickOutside'
import { menuItemsData } from '@/components/NavItemData'
const store = useStore()
const isShowMenu = ref(false)
const menuItemsRef = ref<HTMLElement | null>(null)
const isClickOutside = useClickOutside(menuItemsRef, isShowMenu)
const { showSignals } = storeToRefs(store)
watchEffect(() => {
  if (isClickOutside.value) {
    isShowMenu.value = false
    menuItemIndex.value = null
  }
})
const menuItemIndex = ref<number | null>(null)
const menuPos = ref<{ top: number; left: number }>({ top: 0, left: 0 })
const showMenu = (event: MouseEvent, index: number) => {
  store.showSignalIndex = index
  isShowMenu.value = true
  isClickOutside.value = false
  menuPos.value.top = event.clientY + 12
  menuPos.value.left = event.clientX
  menuItemIndex.value = index
}

const draggingItemIndex = ref<number | null>(null),
  droppingItemIndex = ref<number | null>(null)
// drag event
const handleDragStart = (index: number) => {
  draggingItemIndex.value = index
}
const clearDrag = () => {
  // 清除 draggingItemIndex
  draggingItemIndex.value = null
  droppingItemIndex.value = null
}
const getDropItemIndex = (index: number) => {
  droppingItemIndex.value = index
}
const handleDrop = (index: number) => {
  store.showSignals = swapIndex(
    [...showSignals.value],
    draggingItemIndex.value as number,
    index
  )
  store.color = swapIndex(
    [...store.color],
    draggingItemIndex.value as number,
    index
  )
}

function swapIndex<T>(
  list: Array<T>,
  index1: number,
  index2: number
): Array<T> {
  // 通过复制 list 创建一个新数组
  const newList = [...list]

  // 使用 splice 从数组中移除元素
  const draggingItem = newList.splice(index1, 1)[0]

  // 在目标位置插入元素
  newList.splice(index2 > index1 ? (index2 || 1) - 1 : index2, 0, draggingItem)
  return newList
}
</script>

<style scoped></style>
