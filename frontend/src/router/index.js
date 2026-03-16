// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue"; // 新增
import Dashboard from "../views/dashboard/Dashboard.vue";
import PropertyList from "../views/property/PropertyList.vue";
import PropertyDetail from "../views/property/PropertyDetail.vue";
import PropertyCreate from "../views/property/PropertyCreate.vue";
import FavoriteList from "../views/favorite/FavoriteList.vue";
import ContractList from "../views/contract/ContractList.vue";
import AdminPanel from "../views/admin/AdminPanel.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/properties", component: PropertyList },
  { path: "/properties/:id", component: PropertyDetail },
  { path: "/create-property", component: PropertyCreate },
  { path: "/favorites", component: FavoriteList },
  { path: "/contracts", component: ContractList },
  { path: "/admin", component: AdminPanel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局守卫：未登录禁止访问受保护页；已登录禁止访问登录/注册页
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");

  const openPaths = ["/login", "/register"];

  // 受保护页面（除 login/register 之外）需要 token
  if (!openPaths.includes(to.path) && !token) {
    next("/login");
    return;
  }

  // 已登录用户访问登录/注册页 => 重定向到首页
  if (token && openPaths.includes(to.path)) {
    next("/");
    return;
  }

  next();
});

export default router;