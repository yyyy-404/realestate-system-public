<template>
  <div>
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/properties">房源</router-link> |
      <router-link to="/favorites">收藏</router-link> |
      <router-link to="/contracts">合同</router-link> |
      <router-link to="/dashboard">统计</router-link> |
      <router-link to="/login">登录</router-link>
    </nav>

    <router-view />
  </div>
</template>