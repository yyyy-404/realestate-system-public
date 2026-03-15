<template>
  <div class="sidebar">
    <h2>房产系统</h2>

    <router-link to="/">仪表盘</router-link>
    <router-link to="/properties">房源管理</router-link>
    <router-link to="/create-property">发布房源</router-link>
    <router-link to="/favorites">我的收藏</router-link>
    <router-link to="/contracts">合同管理</router-link>
    <router-link to="/admin">管理员</router-link>
  </div>
</template>

<style>
.sidebar {
  width: 200px;
  background: #2c3e50;
  color: white;
  height: 100vh;
  padding: 20px;
}
.sidebar a {
  display: block;
  color: white;
  margin: 10px 0;
}
</style>