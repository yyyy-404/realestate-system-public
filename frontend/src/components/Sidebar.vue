<!-- src/components/Sidebar.vue -->
<template>
  <div class="sidebar">
    <h3 style="color:white">房产系统</h3>
    <nav>
      <router-link to="/">仪表盘</router-link>
      <router-link to="/properties">房源</router-link>
      <router-link to="/create-property">发布房源</router-link>
      <router-link to="/favorites">收藏</router-link>
      <router-link to="/contracts">合同</router-link>
      <router-link to="/admin">管理员</router-link>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  box-sizing: border-box;
}
.sidebar a {
  display:block;
  color:#ecf0f1;
  margin:8px 0;
  text-decoration:none;
}
.sidebar a.router-link-active { font-weight:600; }
</style>