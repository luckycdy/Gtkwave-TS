import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export default function useClickOutside(elementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      isClickOutside.value = !elementRef.value.contains(e.target as HTMLElement)
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
