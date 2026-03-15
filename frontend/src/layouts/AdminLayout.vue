<!-- src/layouts/AdminLayout.vue -->
<template>
  <div style="display:flex;height:100vh">
    <Sidebar />
    <div style="flex:1;display:flex;flex-direction:column">
      <Navbar />
      <div style="padding:20px;flex:1;overflow:auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
</script>