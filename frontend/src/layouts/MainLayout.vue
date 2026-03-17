<!-- frontend/src/layouts/MainLayout.vue -->
<template>
  <div class="app-layout">
    <Sidebar class="sidebar" />
    <div class="main">
      <Navbar />
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fb;
}
.sidebar {
  width: 220px;
  border-right: 1px solid #e6ecf2;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.page-content {
  padding: 20px;
  flex: 1;
}
</style>