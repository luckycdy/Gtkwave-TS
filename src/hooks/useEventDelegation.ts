// useEventDelegation.ts
import { onUnmounted, type Ref } from 'vue'

// 定义 UseEventDelegationOptions 参数类型
interface UseEventDelegationOptions {
  target: Ref<HTMLElement | null> // 用于添加事件代理的目标元素（祖先元素）
  eventType: Exclude<
    keyof HTMLElementEventMap,
    'focus' | 'blur' | 'mousemove' | 'mouseout'
  > // 要侦听的事件类型，如 'click', 'mouseover' 等
  selectorsToCallbacks: Array<{
    selector: string // 用于匹配目标元素的选择器
    callback: (
      event: Event,
      indexArr?: number[],
      currentElement?: HTMLElement | null
    ) => void // 事件触发时要调用的回调函数
  }>
}

// 定义 useEventDelegation 函数
export default function useEventDelegation(options: UseEventDelegationOptions) {
  const { target, eventType, selectorsToCallbacks } = options
  // 定义事件处理函数
  function eventHandler(event: Event) {
    // 触发事件的元素，需要向上遍历寻找代理节点
    const targetElement = event.target as HTMLElement
    const indexArr: number[] = []

    // 遍历目标元素的祖先元素，检查是否匹配给定的选择器
    for (const { selector, callback } of selectorsToCallbacks) {
      let currentElement: HTMLElement | null = targetElement
      while (currentElement && currentElement !== target.value) {
        if (currentElement.matches(selector)) {
          // 获取所有兄弟元素
          const siblings = Array.from(
            currentElement.parentElement?.children || []
          )
          // 计算索引
          const index = siblings.indexOf(currentElement)
          // 调用回调函数，将索引作为参数传递
          indexArr.push(index)
        }
        currentElement = currentElement.parentElement
      }
      callback(event, indexArr)
    }
  }

  // 在目标元素上添加事件监听器
  if (target.value) {
    target.value.addEventListener(eventType, eventHandler)
  }

  // 在组件卸载时移除事件监听器
  onUnmounted(() => {
    if (target.value) {
      target.value.removeEventListener(eventType, eventHandler)
    }
  })
}
