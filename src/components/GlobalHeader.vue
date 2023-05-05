<template>
  <div>
    <NavBar :nav-items="navItemsData"></NavBar>
    <ToolBar></ToolBar>
  </div>
</template>

<script setup lang="ts">
import navItemsData from "./NavItemData";
import NavBar from "./NavBar.vue";
import ToolBar from "./ToolBar.vue";
</script>

<style scoped></style>
