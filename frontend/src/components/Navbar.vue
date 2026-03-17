<!-- frontend/src/components/Navbar.vue -->
<template>
  <header class="navbar">
    <div class="left">
      <button class="menu-btn" @click="goHome">主页</button>
      <button @click="logout">退出</button>
    </div>
    <div class="right">
      <span class="user">您好，{{ username || "访客" }}</span>
      <button class="logout" @click="handleLogout">登出</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const user = useUserStore();
user.loadFromToken();
const username = user.username;

function goHome() {
  router.push("/");
}

function handleLogout() {
  user.logout();
  router.push("/login");
}


</script>

<script setup>

</script>

<style scoped>
.navbar {
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-bottom: 1px solid #eef2f6;
}
.menu-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}
.right {
  display: flex;
  align-items: center;
}
.user {
  margin-right: 12px;
  color: #333;
}
.logout {
  background: #ff6b6b;
  color: white;
  border: 0;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>