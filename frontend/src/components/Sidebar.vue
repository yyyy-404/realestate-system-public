<!-- frontend/src/components/Sidebar.vue -->
<template>
  <aside class="sidebar-box">
    <div class="brand">房产管理系统</div>
    <ul class="menu">
      <li>
        <router-link to="/">仪表盘</router-link>
      </li>
      <li>
        <router-link to="/properties">房源管理</router-link>
      </li>
      <li>
        <router-link to="/create-property">发布房源</router-link>
      </li>
      <li>
        <router-link to="/favorites">我的收藏</router-link>
      </li>
      <li>
        <router-link to="/contracts">合同管理</router-link>
      </li>
      <li v-if="userRole === 'admin'">
        <router-link to="/admin">管理员面板</router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
user.loadFromToken();
const userRole = computed(() => user.role);
</script>

<style scoped>
.sidebar-box {
  padding: 20px;
  background: white;
  height: 100vh;
  box-sizing: border-box;
}
.brand {
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 16px;
}
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu li {
  margin: 10px 0;
}
.menu a {
  color: #333;
  text-decoration: none;
}
.menu a.router-link-active {
  color: #409eff;
  font-weight: 600;
}
</style>