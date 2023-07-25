import useStore from '@/stores/store'
import { ref, type Ref } from 'vue'

export interface ItemProp {
  leftText: string
  rightText?: string
  class?: string
  isSelect?: Ref<boolean>
  isDisabled?: boolean
  children?: Array<ItemProp>
  callback?: () => void
}
const store = useStore()

const menuItemsData: ItemProp[] = [
  {
    leftText: 'Data Fromat',
    rightText: '▶',
    children: [
      { leftText: 'Hex', rightText: 'Alt+X' },
      { leftText: 'Decimal', rightText: 'Alt+D' },
      { leftText: 'Signed Decimal' },
      { leftText: 'Binary', rightText: 'Alt+B' },
      { leftText: 'Octal', rightText: 'Alt+O' },
      { leftText: 'ASCII' },
      { leftText: 'Time' },
      { leftText: 'Enum' },
      { leftText: 'BitsToReal' },
      {
        leftText: 'RealToBits',
        rightText: '▶',
        children: [{ leftText: 'On' }, { leftText: 'Off' }],
      },
      {
        leftText: 'Right Justify',
        rightText: '▶',
        children: [
          { leftText: 'On', rightText: 'Alt+J' },
          { leftText: 'Off', rightText: 'Shift+Alt+J' },
        ],
      },
      {
        leftText: 'Invert',
        rightText: '▶',
        children: [
          { leftText: 'On', rightText: 'Alt+I' },
          { leftText: 'Off', rightText: 'Shift+Alt+I' },
        ],
      },
      {
        leftText: 'Reverse Bits',
        rightText: '▶',
        children: [
          { leftText: 'On', rightText: 'Alt+V' },
          { leftText: 'Off', rightText: 'Shift+Alt+V' },
        ],
      },
      {
        leftText: 'Translate Filter File',
        rightText: '▶',
        children: [{ leftText: 'Disable' }, { leftText: 'Enable and Select' }],
      },
      {
        leftText: 'Translate Filter Process',
        rightText: '▶',
        children: [{ leftText: 'Disable' }, { leftText: 'Enable and Select' }],
      },
      {
        leftText: 'Transaction Filter Process',
        rightText: '▶',
        children: [{ leftText: 'Disable' }, { leftText: 'Enable and Select' }],
      },
      {
        leftText: 'Analog',
        rightText: '▶',
        children: [
          { leftText: 'Off' },
          { leftText: 'Step' },
          { leftText: 'Interpolated' },
          { leftText: 'Interpolated Annotated' },
          {
            leftText: 'Resizing',
            rightText: '▶',
            children: [{ leftText: 'Screen Data' }, { leftText: 'All Data' }],
          },
        ],
      },
      {
        leftText: 'Range Fill',
        rightText: '▶',
        children: [
          { leftText: 'With 0s' },
          { leftText: 'With 1s' },
          { leftText: 'Off' },
        ],
      },
      {
        leftText: 'Gray Filters',
        rightText: '▶',
        children: [
          { leftText: 'To Gray' },
          { leftText: 'From Gray' },
          { leftText: 'None' },
        ],
      },
      {
        leftText: 'Popcnt',
        rightText: '▶',
        children: [{ leftText: 'On' }, { leftText: 'Off' }],
      },
      {
        leftText: 'Fixed Point Shift',
        rightText: '▶',
        children: [
          { leftText: 'On' },
          { leftText: 'Off' },
          { leftText: 'Specify' },
        ],
      },
    ],
    class: '',
  },
  {
    leftText: 'Color Fromat',
    rightText: '▶',
    children: [
      {
        leftText: 'Normal',
        callback() {
          store.color[store.showSignalIndex] = 'rgb(34 197 94)'
        },
      },
      {
        leftText: 'Red',
        callback() {
          store.color[store.showSignalIndex] = 'red'
        },
      },
      {
        leftText: 'Orange',
        callback() {
          store.color[store.showSignalIndex] = 'orange'
        },
      },
      {
        leftText: 'Yellow',
        callback() {
          store.color[store.showSignalIndex] = 'yellow'
        },
      },
      {
        leftText: 'Green',
        callback() {
          store.color[store.showSignalIndex] = 'green'
        },
      },
      {
        leftText: 'Blue',
        callback() {
          store.color[store.showSignalIndex] = 'blue'
        },
      },
      {
        leftText: 'Indigo',
        callback() {
          store.color[store.showSignalIndex] = 'indigo'
        },
      },
      {
        leftText: 'Violet',
        callback() {
          store.color[store.showSignalIndex] = 'violet'
        },
      },
      { leftText: 'Cycle', isDisabled: true },
    ],
    class: 'border-b',
  },
  { leftText: 'Insert Analog Height Extension', class: 'border-b' },
  { leftText: 'Insert Blank' },
  { leftText: 'Insert Comment' },
  { leftText: 'Alias Highlighted Trace' },
  { leftText: 'Remove Highlighted Aliases', class: 'border-b' },
  { leftText: 'Cut' },
  { leftText: 'Copy' },
  { leftText: 'Paste' },
  {
    leftText: 'Delete',
    class: 'border-b',
    callback() {
      console.log('delete', store.showSignalIndex)
      store.showSignals.splice(store.showSignalIndex, 1)
      store.color.splice(store.showSignalIndex, 1)
    },
  },
  {
    leftText: 'Open Scope',
  },
]
const navItemsData: Record<string, ItemProp[]> = {
  File: [
    { leftText: 'Open New Window', rightText: 'Ctrl+N' },
    { leftText: 'Open New Tab', rightText: 'Ctrl+T' },
    { leftText: 'Reload Waveform', rightText: 'Shift+Ctrl+R' },
    {
      leftText: 'Export',
      rightText: '▶',
      class: 'border-b',
      children: [
        { leftText: 'Write VCD File As' },
        { leftText: 'Write LXT File As' },
        { leftText: 'Write TIM File As' },
      ],
    },
    { leftText: 'Print To File', rightText: 'Ctrl+P' },
    { leftText: 'Grab To File', class: 'border-b' },
    { leftText: 'Read Save File', rightText: 'Ctrl+O' },
    { leftText: 'Write Save File', rightText: 'Ctrl+S' },
    {
      leftText: 'Write Save File As',
      rightText: 'Shift+Ctrl+S',
      class: 'border-b',
    },
    { leftText: 'Read Sim Logfile', rightText: 'L', class: 'border-b' },
    { leftText: 'Read Verilog Stemsfile', class: 'border-b' },
    { leftText: 'Read Tcl Script File', class: 'border-b' },
    { leftText: 'Quit', rightText: 'Ctrl+Q' },
  ],
  Edit: [
    { leftText: 'Set Trace Max Hier ' },
    { leftText: 'Toggle Trace Hier', rightText: 'H', class: 'border-b' },
    { leftText: 'Insert Blank', rightText: 'Ctrl+B' },
    { leftText: 'Insert Comment' },
    { leftText: 'Insert Analog Height Extension' },
    { leftText: 'Cut', rightText: 'Ctrl+X' },
    { leftText: 'Copy', rightText: 'Ctrl+C' },
    { leftText: 'Paste', rightText: 'Ctrl+V' },
    { leftText: 'Delete', rightText: 'Ctrl+Delete', class: 'border-b' },
    { leftText: 'Alias Highlighted Trace', rightText: 'Alt+A' },
    {
      leftText: 'Remove Highlighted Aliases',
      rightText: 'Shift+Alt+A',
      class: 'border-b',
    },
    { leftText: 'Expand', rightText: 'F3' },
    { leftText: 'Combine Down', rightText: 'F4' },
    { leftText: 'Combine Up', rightText: 'F5', class: 'border-b' },
    {
      leftText: 'Data Format',
      rightText: '▶',
      children: [
        { leftText: 'Hex', rightText: 'Alt+X' },
        { leftText: 'Decimal', rightText: 'Alt+D' },
        { leftText: 'Signed Decimal' },
        { leftText: 'Binary', rightText: 'Alt+B' },
        { leftText: 'Octal', rightText: 'Alt+O' },
        { leftText: 'ASCII' },
        { leftText: 'Time' },
        { leftText: 'Enum' },
        { leftText: 'BitsToReal' },
        {
          leftText: 'RealToBits',
          rightText: '▶',
          children: [{ leftText: 'On' }, { leftText: 'Off' }],
        },
        {
          leftText: 'Right Justify',
          rightText: '▶',
          children: [
            { leftText: 'On', rightText: 'Alt+J' },
            { leftText: 'Off', rightText: 'Shift+Alt+J' },
          ],
        },
        {
          leftText: 'Invert',
          rightText: '▶',
          children: [
            { leftText: 'On', rightText: 'Alt+I' },
            { leftText: 'Off', rightText: 'Shift+Alt+I' },
          ],
        },
        {
          leftText: 'Reverse Bits',
          rightText: '▶',
          children: [
            { leftText: 'On', rightText: 'Alt+V' },
            { leftText: 'Off', rightText: 'Shift+Alt+V' },
          ],
        },
        {
          leftText: 'Translate Filter File',
          rightText: '▶',
          children: [
            { leftText: 'Disable' },
            { leftText: 'Enable and Select' },
          ],
        },
        {
          leftText: 'Translate Filter Process',
          rightText: '▶',
          children: [
            { leftText: 'Disable' },
            { leftText: 'Enable and Select' },
          ],
        },
        {
          leftText: 'Transaction Filter Process',
          rightText: '▶',
          children: [
            { leftText: 'Disable' },
            { leftText: 'Enable and Select' },
          ],
        },
        {
          leftText: 'Analog',
          rightText: '▶',
          children: [
            { leftText: 'Off' },
            { leftText: 'Step' },
            { leftText: 'Interpolated' },
            { leftText: 'Interpolated Annotated' },
            {
              leftText: 'Resizing',
              rightText: '▶',
              children: [{ leftText: 'Screen Data' }, { leftText: 'All Data' }],
            },
          ],
        },
        {
          leftText: 'Range Fill',
          rightText: '▶',
          children: [
            { leftText: 'With 0s' },
            { leftText: 'With 1s' },
            { leftText: 'Off' },
          ],
        },
        {
          leftText: 'Gray Filters',
          rightText: '▶',
          children: [
            { leftText: 'To Gray' },
            { leftText: 'From Gray' },
            { leftText: 'None' },
          ],
        },
        {
          leftText: 'Popcnt',
          rightText: '▶',
          children: [{ leftText: 'On' }, { leftText: 'Off' }],
        },
        {
          leftText: 'Fixed Point Shift',
          rightText: '▶',
          children: [
            { leftText: 'On' },
            { leftText: 'Off' },
            { leftText: 'Specify' },
          ],
        },
      ],
    },
    {
      leftText: 'Color Format',
      rightText: '▶',
      children: [
        { leftText: 'Normal' },
        { leftText: 'Red' },
        { leftText: 'Orange' },
        { leftText: 'Yellow' },
        { leftText: 'Green' },
        { leftText: 'Blue' },
        { leftText: 'Indigo' },
        { leftText: 'Violet' },
        { leftText: 'Cycle', class: 'border-b' },
        { leftText: 'Keep xz Colors' },
      ],
    },
    { leftText: 'Show-Change All Highlighted' },
    {
      leftText: 'Show-Change First Highlighted',
      rightText: 'Ctrl+F',
      class: 'border-b',
    },
    {
      leftText: 'Time Warp',
      rightText: '▶',
      class: 'border-b',
      children: [
        { leftText: 'Wrap Marked' },
        { leftText: 'Unwrap Marked' },
        { leftText: 'Unwrap All' },
      ],
    },
    { leftText: 'Exclude', rightText: 'Shift+Alt+E' },
    { leftText: 'Show', rightText: 'Shift+Alt+S', class: 'border-b' },
    { leftText: 'Toggle Group Open|Close', rightText: 'T' },
    { leftText: 'Create Group', rightText: 'G', class: 'border-b' },
    { leftText: 'Highlight Regexp', rightText: 'Alt+R' },
    { leftText: 'UnHighlight Regexp', rightText: 'Shift+Alt+R' },
    { leftText: 'Highlight All', rightText: 'Ctrl+A' },
    {
      leftText: 'UnHighlight All',
      rightText: 'Shift+Ctrl+A',
      class: 'border-b',
    },
    {
      leftText: 'Sort',
      rightText: '▶',
      children: [
        { leftText: 'Alphabetize All' },
        { leftText: 'Alphabetize All(CaseIns)' },
        { leftText: 'Sigsort All' },
        { leftText: 'Reverse All' },
      ],
    },
  ],
  Search: [
    { leftText: 'Pattern Search 1' },
    { leftText: 'Pattern Search 2', class: 'border-b' },
    { leftText: 'Signal Search Regexp', rightText: 'Alt+S' },
    { leftText: 'Signal Search Hierarchy', rightText: 'Alt+T' },
    {
      leftText: 'Signal Search Tree',
      rightText: 'Shift+Alt+T',
      class: 'border-b',
    },
    { leftText: 'Open Source Definition' },
    { leftText: 'Open Source Instantiation' },
    { leftText: 'Open Scope', class: 'border-b' },
    { leftText: 'Autocoalesce', isSelect: ref(false) },
    { leftText: 'Autocoalesce Reversal', isSelect: ref(false) },
    { leftText: 'Autoname Bundles', isSelect: ref(false) },
    {
      leftText: 'Search Hierarchy Grouping',
      class: 'border-b',
      isSelect: ref(false),
    },
    { leftText: 'Set Pattern Search Repeat Count' },
  ],
  Time: [
    { leftText: 'Move To Time', rightText: 'F1' },
    {
      leftText: 'Zoom',
      rightText: '▶',
      children: [
        { leftText: 'Zoom Amount', rightText: 'F2' },
        { leftText: 'Zoom Base', rightText: 'Shift+F2' },
        { leftText: 'Zoom In', rightText: 'Ctrl++' },
        { leftText: 'Zoom Out', rightText: 'Ctrl+-' },
        { leftText: 'Zoom Full', rightText: 'Ctrl+0' },
        { leftText: 'Zoom Best Fit', rightText: 'Shift+Alt+F' },
        { leftText: 'Zoom To Start', rightText: 'Home' },
        { leftText: 'Zoom To End', rightText: 'End' },
        { leftText: 'Undo Zoom', rightText: 'Alt+U' },
      ],
    },
    {
      leftText: 'Fetch',
      rightText: '▶',
      children: [
        { leftText: 'Fetch Size', rightText: 'F7' },
        { leftText: 'Fetch->', rightText: 'Alt+2' },
        { leftText: 'Fetch<-', rightText: 'Alt+1' },
      ],
    },
    {
      leftText: 'Discard',
      rightText: '▶',
      children: [
        { leftText: 'Discard->', rightText: 'Alt+4' },
        { leftText: 'Discard<-', rightText: 'Alt+3' },
      ],
    },
    {
      leftText: 'Shift',
      rightText: '▶',
      children: [
        { leftText: 'Shift->', rightText: 'Alt+6' },
        { leftText: 'Shift<-', rightText: 'Alt+5' },
      ],
    },
    {
      leftText: 'Page',
      rightText: '▶',
      children: [
        { leftText: 'Page->', rightText: 'Alt+8' },
        { leftText: 'Page<-', rightText: 'Alt+7' },
      ],
    },
  ],
  Markers: [
    { leftText: 'Show-Change Marker Data', rightText: 'Alt+M' },
    { leftText: 'Drop Named Marker', rightText: 'Alt+N' },
    { leftText: 'Collect Named Marker', rightText: 'Shift+Alt+N' },
    { leftText: 'Collect All Named Markers', rightText: 'Shift+Ctrl+Alt+N' },
    { leftText: 'Copy Primary->B Marker', rightText: 'B' },
    {
      leftText: 'Delete Primary Marker',
      rightText: 'Shift+Al+M',
      class: 'border-b',
    },
    { leftText: 'Find Previous Edge' },
    { leftText: 'Find Next Edge', class: 'border-b' },
    { leftText: 'Alternate Wheel Mode', isSelect: ref(true) },
    { leftText: 'Wave Scrolling', rightText: 'F9', isSelect: ref(true) },
    {
      leftText: 'Locking',
      rightText: '▶',
      children: [
        { leftText: 'Lock to Lesser Named Marker', rightText: 'Q' },
        { leftText: 'Lock to Greater Named Marker', rightText: 'W' },
        { leftText: 'Unlock from Named Marker', rightText: 'O' },
      ],
    },
  ],
  View: [
    {
      leftText: 'Show Grid',
      rightText: 'Alt+G',
      class: 'border-b',
      isSelect: ref(true),
    },
    { leftText: 'Show Wave Highlight' },
    { leftText: 'Show Filled High Values', class: 'border-b' },
    { leftText: 'Show Mouseover' },
    { leftText: 'Mouseover Copies To Clipboard', class: 'border-b' },
    {
      leftText: 'Show Base Symbols',
      rightText: 'Alt+F1',
      class: 'border-b',
      isSelect: ref(false),
    },
    { leftText: 'Standard Trace Select', class: 'border-b' },
    {
      leftText: 'Dynamic Resize',
      rightText: 'Alt+9',
      class: 'border-b',
      isSelect: ref(true),
    },
    {
      leftText: 'Center Zooms',
      rightText: 'F8',
      class: 'border-b',
      isSelect: ref(true),
    },
    { leftText: 'Toggle Delta-Frequency' },
    { leftText: 'Toggle Max-Marker', rightText: 'F10', class: 'border-b' },
    {
      leftText: 'Constant Marker Update',
      rightText: 'F11',
      class: 'border-b',
      isSelect: ref(true),
    },
    {
      leftText: 'Draw Roundcapped Vectors',
      rightText: 'Alt+F2',
      class: 'border-b',
      isSelect: ref(true),
    },
    { leftText: 'Left Justified Signals', rightText: 'Shift+Home' },
    {
      leftText: 'Right Justified Signals',
      rightText: 'Shift+End',
      class: 'border-b',
    },
    {
      leftText: 'Zoom Pow10 Snap',
      rightText: 'Shift+Pause',
      isSelect: ref(true),
    },
    { leftText: 'Full Precision', rightText: 'Alt+Pause', class: 'border-b' },
    { leftText: 'Define Time Ruler Marks' },
    { leftText: 'Remove Pattern Marks', class: 'border-b' },
    { leftText: 'Use Color' },
    { leftText: 'Use Black and White', class: 'border-b' },
    {
      leftText: 'Scale To Time Dimension',
      rightText: '▶',
      children: [
        { leftText: 'None', isSelect: ref(true) },
        { leftText: 'sec', isSelect: ref(false) },
        { leftText: 'ms', isSelect: ref(false) },
        { leftText: 'us', isSelect: ref(false) },
        { leftText: 'ns', isSelect: ref(false) },
        { leftText: 'ps', isSelect: ref(false) },
        { leftText: 'fs', isSelect: ref(false) },
      ],
    },
  ],
  Help: [
    { leftText: 'WAVE HELP', rightText: 'Ctrl+H' },
    { leftText: 'Wave Version' },
  ],
}

export { navItemsData, menuItemsData }
