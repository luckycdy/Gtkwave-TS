import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export default function useClickOutside(
  elementRef: Ref<null | HTMLElement>,
  condition = ref(true)
) {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value && condition.value) {
      isClickOutside.value = true
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
