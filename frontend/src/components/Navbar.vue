<!-- src/components/Navbar.vue -->
<template>
  <div class="navbar">
    <div>二手房交易管理系统</div>
    <div>
      <button @click="logout">退出</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.clear();
  router.push("/login");
}
</script>

<style scoped>
.navbar {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:12px 20px;
  border-bottom:1px solid #eee;
  background:#fff;
}
</style>