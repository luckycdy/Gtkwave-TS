<template>
  <div>
    <NavBar :nav-items="navItemsData"></NavBar>
  </div>
</template>

<script setup lang="ts">
import navItemsData from "./NavItemData";
import NavBar from "./NavBar.vue";
</script>

<style scoped></style>
