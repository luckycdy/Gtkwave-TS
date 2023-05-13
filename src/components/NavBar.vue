<template>
  <!-- 创建一个导航栏，包含多个 NavItem 组件 -->
  <div
    ref="navBarRef"
    class="flex h-10 w-full items-center border-b-2 border-solid border-gray-300"
  >
    <!-- 遍历 navItems，并为每个条目创建一个 NavItem 组件 -->
    <NavItem
      v-for="(value, name, key) in navItems"
      :key="key"
      ref="navItemsRef"
      :title="name"
    >
      <!-- 遍历 value，为每个条目创建一个 DropdownItem 组件 -->
      <DropdownItem
        v-for="(item, valueKey) in value"
        :key="valueKey"
        :left-text="item.leftText"
        :right-text="item.rightText"
        :class="item.class"
        :is-select="item.isSelect?.value"
        :disabled="item.isDisabled?.value"
        :children="item.children"
      >
      </DropdownItem>
    </NavItem>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DropdownItem from './DropdownItem.vue'
import NavItem from './NavItem.vue'
import useEventDegation from '@/hooks/useEventDelegation'
import type { ItemProp } from '@/components/NavItemData'
const props = defineProps<{
  navItems?: Record<string, ItemProp[]>
}>()
const navBarRef = ref<null | HTMLElement>(null)
const navItemsRef = ref<Array<InstanceType<typeof NavItem>>>([])
onMounted(() => {
  if (navItemsRef.value && props.navItems) {
    navItemsRef.value.forEach((v) => {
      useEventDegation({
        eventType: 'click',
        target: ref(v.$el),
        selectorsToCallbacks: [
          {
            selector: '[name="dropdown-item"]',
            callback(event, indexList) {
              if (props.navItems && indexList && indexList.length !== 0) {
                type ItemPropOrArray = ItemProp[] | ItemProp
                const obj: ItemProp[] = props.navItems[v.$props.title]
                // 根据 indexArr 确定当前点击的子菜单项
                const curObj = indexList.reduceRight(
                  (pre: ItemPropOrArray, cur: number) => {
                    if (Array.isArray(pre)) {
                      return pre[cur]?.children || pre[cur]
                    } else {
                      return pre.children?.[cur] || pre
                    }
                  },
                  obj as ItemPropOrArray
                ) as ItemProp

                if (curObj?.callback) {
                  ;(curObj.callback as () => void)()
                }
                if (curObj.isSelect) {
                  curObj.isSelect.value = !curObj.isSelect.value
                }
              }
            },
          },
        ],
      })
    })
  }
})
</script>

<style scoped></style>
