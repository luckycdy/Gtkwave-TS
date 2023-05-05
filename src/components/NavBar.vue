<template>
  <div
    class="flex h-10 w-full items-center border-b-2 border-solid border-gray-300"
    ref="navBarRef"
  >
    <NavItem
      v-for="(value, name, key) in navItems"
      :title="name"
      :key="key"
      ref="navItemsRef"
    >
      <DropdownItem
        v-for="(item, key) in value"
        :left-text="item.leftText"
        :right-text="item.rightText"
        :class="item.class"
        :is-select="item.isSelect?.value"
        :disabled="item.isDisabled?.value"
        :key="key"
        :children="item.children"
      >
      </DropdownItem>
    </NavItem>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import DropdownItem from "./DropdownItem.vue";
import NavItem from "./NavItem.vue";
import useEventDegation from "@/hooks/useEventDelegation";
import type { ItemProp } from "@/components/NavItemData";
const props = defineProps<{
  navItems?: Record<string, ItemProp[]>;
}>();
const navBarRef = ref<null | HTMLElement>(null);
const navItemsRef = ref<Array<InstanceType<typeof NavItem>>>([]);
onMounted(() => {
  if (navItemsRef.value && props.navItems) {
    navItemsRef.value.forEach((v) => {
      useEventDegation({
        eventType: "click",
        target: ref(v.$el),
        selectorsToCallbacks: [
          {
            selector: '[name="dropdown-item"]',
            callback(event, indexArr) {
              if (props.navItems && indexArr && indexArr.length !== 0) {
                type ItemPropOrArray = ItemProp[] | ItemProp;
                let obj: ItemProp[] = props.navItems[v.$props.title];
                const curObj = indexArr.reduceRight(
                  (pre: ItemPropOrArray, cur: number) => {
                    if (Array.isArray(pre)) {
                      return pre[cur]?.children || pre[cur];
                    } else {
                      return pre.children?.[cur] || pre;
                    }
                  },
                  obj as ItemPropOrArray
                ) as ItemProp;

                if (curObj?.callback) {
                  (curObj.callback as Function)();
                }
                if (curObj.isSelect) {
                  curObj.isSelect.value = !curObj.isSelect.value;
                }
              }
            },
          },
        ],
      });
    });
  }
});
</script>

<style scoped></style>
