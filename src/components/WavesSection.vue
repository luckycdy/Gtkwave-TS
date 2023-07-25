<template>
  <div>
    <span>Waves</span>
    <div
      id="myDiv"
      class="h-full overflow-auto rounded-lg border bg-slate-100 p-1"
    >
      <svg
        id="mySvg"
        ref="mySvg"
        :width="(store.maxTime + waveScale) * waveParams.widthPerBit"
        height="1000"
        xmlns="http://www.w3.org/2000/svg"
        class="overflow-auto"
        style="will-change: transform"
        @mousemove="getCursor"
        @click="handleClick"
      >
        <defs>
          <g v-for="[key] in store.showWaves" :id="`path${key}`" :key="key">
            <path
              v-for="(dRefItem, dRefIndex) in store.dRef.get(key)"
              :key="dRefIndex"
              stroke-width="1"
              fill="none"
              :d="dRefItem"
            ></path>
          </g>
        </defs>
        <!-- 这里将会动态添加和删除元素 -->
        <use
          v-for="(item, index) in store.showSignals"
          :key="`${item}_${index}`"
          :xlink:href="`#path${item.split(' ')[2]}`"
          :y="index * 26 + initY"
          :stroke="store.color[index] || 'rgb(34 197 94)'"
        ></use>
        <g v-for="(item, key) in lineRef" :key="key">
          <rect
            :x="(item - 0.5) * waveParams.widthPerBit * waveScale + initX"
            :y="initY"
            :width="waveParams.widthPerBit * waveScale"
            height="990"
            fill="transparent"
          ></rect>
          <line
            :x1="item * waveParams.widthPerBit * waveScale + initX"
            :x2="item * waveParams.widthPerBit * waveScale + initX"
            y1="10"
            y2="1000"
            stroke="rgb(14 165 233)"
          ></line>
          <text
            :x="item * waveParams.widthPerBit * waveScale + 10 + initX"
            :y="initY"
            fill="red"
            text-anchor="middle"
            style="font-size: small"
          >
            {{ item * waveScale }} s
          </text>
        </g>
        <line
          v-if="markerCursorX"
          :x1="markerCursorX"
          :x2="markerCursorX"
          y1="10"
          y2="1000"
          stroke="orange"
        ></line>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/stores/store'
import { computed, onMounted, ref, watch } from 'vue'
import { updateView } from '@/hooks/useDrawWaves'
import waveConfig from './WaveConfig'
import { storeToRefs } from 'pinia'
import { zoomIn, zoomOut } from './ToolFun'
const store = useStore()
const { waveParams, waveScale, markerCursor } = storeToRefs(store)
const { initX, initY } = waveConfig
const lineRef = ref<number[]>([])
const mouseX = ref<number>()
const handleClick = () => {
  markerCursor.value =
    markerCursor.value === waveParams.value.cursorTime
      ? null
      : waveParams.value.cursorTime
}
const markerCursorX = computed(
  () =>
    markerCursor.value &&
    markerCursor.value * waveParams.value.widthPerBit + initX
)
const mySvg = ref<HTMLElement | null>()
const getCursor = (e: MouseEvent, isRefresh = true) => {
  mouseX.value = e.offsetX
  if (mySvg.value && isRefresh) {
    waveParams.value.cursorTime = Math.round(
      (e.offsetX - initX) / waveParams.value.widthPerBit
    )
  }
}
const myDivRef = ref<HTMLElement | null>(null)

watch(storeToRefs(store).waveScale, async () => {
  console.log('scale watch')

  updateView(false, lineRef)
  if (myDivRef.value) {
    const tmp =
      store.waveParams.cursorTime * store.waveParams.widthPerBit -
      ((mouseX.value as number) - myDivRef.value.scrollLeft) +
      initX
    myDivRef.value.scrollLeft = tmp
  }
})
onMounted(() => {
  // 监听滚动事件
  const myDiv = document.getElementById('myDiv') as HTMLElement
  myDivRef.value = myDiv
  myDiv.addEventListener('scroll', () => {
    updateView(false, lineRef)
  })
  myDiv.addEventListener('wheel', (event) => {
    event.preventDefault()
    if (event.ctrlKey) {
      getCursor(event)

      if (event.deltaY < 0) {
        zoomIn()
      } else if (event.deltaY > 0) {
        zoomOut()
      }
    } else {
      const data = event.deltaY || event.deltaX
      myDiv.scrollLeft += data
      getCursor(event)
    }
  })

  // 初始化视图
  updateView(false, lineRef)
})
</script>
