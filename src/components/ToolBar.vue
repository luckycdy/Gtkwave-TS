<template>
  <div class="mt-2 flex min-w-max">
    <ToolBarItem disabled @click="handleTool">
      <button class="text-2xl font-bold">✄</button>
      <template #prompt>
        <p>Cut Traces</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">©</button>
      <template #prompt>
        <p>Copy Traces</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">℗</button>
      <template #prompt>
        <p>Paste Traces</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">√</button>
      <template #prompt>
        <p>Zoom Fit</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="zoomIn">
      <button class="font-bold">➕</button>
      <template #prompt>
        <p>Zoom In</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="zoomOut">
      <button class="font-bold">➖</button>
      <template #prompt>
        <p>Zoom Out</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">⎌</button>
      <template #prompt>
        <p>Zoom Undo</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">⏪</button>
      <template #prompt>
        <p>Zoom to Start</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">⏩</button>
      <template #prompt>
        <p>Zoom to End</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">◀</button>
      <template #prompt>
        <p>Find Previous Edge</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">▶</button>
      <template #prompt>
        <p>Find Next Edge</p>
      </template>
    </ToolBarItem>
    <ToolBarItem class="min-w-max" @click="handleTool">
      <label class="ml-2 pr-2">
        <span class=" ">From:</span>
        <input
          class="ml-1 w-20 rounded-sm pl-2"
          type="text"
          placeholder="0 sec"
        />
      </label>
      <template #prompt>
        <p>Scroll Lower Bound(use MX for named marker X)</p>
      </template>
    </ToolBarItem>
    <ToolBarItem class="min-w-max" disabled @click="handleTool">
      <label class="ml-2 pr-2">
        <span class="">To:</span>
        <input
          class="ml-1 w-20 rounded-sm pl-2"
          type="text"
          placeholder="0 sec"
        />
      </label>
      <template #prompt>
        <p>Scroll Upper Bound(use MX for named marker X)</p>
      </template>
    </ToolBarItem>
    <ToolBarItem @click="handleTool">
      <button class="text-2xl font-bold">🔃</button>
      <template #prompt>
        <p>Reload</p>
      </template>
    </ToolBarItem>
    <ToolBarItem class="min-w-max px-3" @click="handleTool">
      <span
        >Marker: {{ store.markerCursor ? `${store.markerCursor}sec` : '-' }} |
        Cursor: {{ store.waveParams.cursorTime }} sec</span
      >
    </ToolBarItem>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/stores/store'
import ToolBarItem from './ToolBarItem.vue'
import { zoomIn, zoomOut } from './ToolFun'
const store = useStore()
const handleTool = () => {
  console.log(111)
}
</script>

<style scoped></style>
