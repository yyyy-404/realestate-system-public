<!-- frontend/src/components/Navbar.vue -->
<template>
  <header class="navbar">
    <div class="left">
      <button class="menu-btn" @click="goHome">主页</button>
    </div>

    <div class="right">
      <span class="user">您好，{{ username || "用户" }}</span>
      <button class="logout" @click="logout">登出</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const router = useRouter();
const user = useUserStore();

// 页面加载时从 token 恢复用户信息
user.loadFromToken();

// 响应式用户名
const username = computed(() => user.username);

function goHome() {
  router.push("/");
}

function logout() {
  user.logout(); // 清除 token + store
  router.push("/login");
}
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
  font-size: 14px;
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
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>