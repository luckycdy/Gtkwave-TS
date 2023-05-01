<template>
  <ul
    class="container flex h-10 items-center border-b-2 border-solid border-gray-300"
    ref="navItemRef"
  >
    <NavItem
      v-for="(value, name, key) in navItems"
      :title="name"
      :key="key"
      class="mx-1 cursor-pointer px-3 leading-10"
      :is-show="key===clickNavItem && !isClickOutside"
      :class="{'border-b-4 border-green-400': clickNavItem===key}"
      @click="clickNavItem=key"
    >
      <DropDownItem
        v-for="item in value"
        :left-text="item.leftText"
        :right-text="item.rightText"
        :class="item.class"
        :is-select="item.isSelect"
        class="w-96"
      ></DropDownItem>
    </NavItem>

    <li class="mx-4">Time</li>
    <li class="mx-4">Markers</li>
    <li class="mx-4">View</li>
    <li class="mx-4">Help</li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DropDownItem from './DropDownItem.vue'
import NavItem from './NavItem.vue';
import useClickOutside from '@/hooks/useClickOutside'
const clickNavItem = ref<number>()
const navItemRef = ref<null | HTMLElement>(null)
const isClickOutside = useClickOutside(navItemRef)
interface itemProp {
  leftText: string
  rightText?: string
  class?: string
  isSelect?: boolean
}
const navItems: Record<string, itemProp[]> = {
  File: [
    { leftText: 'Open New Window', rightText: 'Ctrl+N', isSelect: true },
    { leftText: 'Open New Tab', rightText: 'Ctrl+T' },
    { leftText: 'Reload Waveform', rightText: 'Shift+Ctrl+R' },
    { leftText: 'Export', rightText: '▶', class: 'border-b' },
    { leftText: 'Print To File', rightText: 'Ctrl+P' },
    { leftText: 'Grab To File', class: 'border-b' },
    { leftText: 'Read Save File', rightText: 'Ctrl+O' },
    { leftText: 'Write Save File', rightText: 'Ctrl+S' },
    { leftText: 'Write Save File As', rightText: 'Shift+Ctrl+S', class: 'border-b' },
    { leftText: 'Read Sim Logfile', rightText: 'L', class: 'border-b' },
    { leftText: 'Read Verilog Stemsfile', class: 'border-b' },
    { leftText: 'Read Tcl Script File', class: 'border-b' },
    { leftText: 'Quit', rightText: 'Ctrl+Q' },
  ],
  Edit: [
    { leftText: "Set Trace Max Hier " },
    { leftText: "Toggle Trace Hier", rightText: "H", class: 'border-b' },
    { leftText: "Insert Blank", rightText: "Ctrl+B" },
    { leftText: "Insert Comment", },
    { leftText: "Insert Analog Height Extension" },
    { leftText: "Cut", rightText: "Ctrl+X" },
    { leftText: "Copy", rightText: "Ctrl+C" },
    { leftText: "Paste", rightText: "Ctrl+V" },
    { leftText: "Delete", rightText: "Ctrl+Delete", class: 'border-b' },
    { leftText: "Alias Highlighted Trace", rightText: "Alt+A" },
    { leftText: "Remove Highlighted Aliases", rightText: "Shift+Alt+A" },
    { leftText: "Expand", rightText: "F3" },
    { leftText: "Combine Down", rightText: "F4" },
    { leftText: "Combine Up", rightText: "F5", class: 'border-b' },
    { leftText: "Data Format", rightText: "▶" },
    { leftText: "Color Format", rightText: "▶" },
    { leftText: "Show-Change All Highlighted" },
    { leftText: "Show-Change First Highlighted", rightText: "Ctrl+F" },
    { leftText: "Time Warp", rightText: "▶" },
    { leftText: "Exclude", rightText: "Shift+Alt+E" },
    { leftText: "Show", rightText: "Shift+Alt+S" },
    { leftText: "Toggle Group Open|Close", rightText: "T" },
    { leftText: "Create Group", rightText: "G" },
    { leftText: "Highlight Regexp", rightText: "Alt+R" },
    { leftText: "UnHighlight Regexp", rightText: "Shift+Alt+R" },
    { leftText: "Highlight All", rightText: "Ctrl+A" },
    { leftText: "UnHighlight All", rightText: "Shift+Ctrl+A" },
    { leftText: "Sort", rightText: "▶" }
  ],
  Search: [
  { leftText: 'Pattern Search 1' },
  { leftText: 'Pattern Search 2', class: 'border-b' },
  { leftText: 'Signal Search Regexp', rightText: 'Alt+S' },
  { leftText: 'Signal Search Hierarchy', rightText: 'Alt+T' },
  { leftText: 'Signal Search Tree', rightText: 'Shift+Alt+T', class: 'border-b' },
  { leftText: 'Open Source Definition' },
  { leftText: 'Open Source Instantiation' },
  { leftText: 'Open Scope', class: 'border-b' },
  { leftText: 'Autocoalesce' },
  { leftText: 'Autocoalesce Reversal' },
  { leftText: 'Autoname Bundles' },
  { leftText: 'Search Hierarchy Grouping', class: 'border-b' },
  { leftText: 'Set Pattern Search Repeat Count' },
]
}
</script>

<style scoped></style>
