// frontend/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import MainLayout from "@/layouts/MainLayout.vue";

import Dashboard from "@/views/dashboard/Dashboard.vue";
import PropertyList from "@/views/property/PropertyList.vue";
import PropertyDetail from "@/views/property/PropertyDetail.vue";
import PropertyCreate from "@/views/property/PropertyCreate.vue";
import FavoriteList from "@/views/favorite/FavoriteList.vue";
import ContractList from "@/views/contract/ContractList.vue";
import AdminPanel from "@/views/admin/AdminPanel.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: Dashboard },
      { path: "properties", component: PropertyList },
      { path: "properties/:id", component: PropertyDetail },
      { path: "create-property", component: PropertyCreate },
      { path: "favorites", component: FavoriteList },
      { path: "contracts", component: ContractList },
      {
        path: "admin",
        component: AdminPanel,
        meta: { roles: ["admin"] },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: { public: true },
  },
  {
    path: "/register",
    component: Register,
    meta: { public: true },
  },
];

// ⭐ 必须有这一段
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ⭐ 守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");

  const openPaths = ["/login", "/register"];

  if (!token && !openPaths.includes(to.path)) {
    next("/login");
    return;
  }

  if (token && openPaths.includes(to.path)) {
    next("/");
    return;
  }

  next();
});

export default router;