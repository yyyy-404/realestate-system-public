<template>
  <div class="layout">
    <Sidebar />
    <div class="content">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue"
import Navbar from "../components/Navbar.vue"
</script>

<style>
.layout {
  display: flex;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>