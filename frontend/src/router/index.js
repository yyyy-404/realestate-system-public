import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/auth/Login.vue"
import Dashboard from "../views/dashboard/Dashboard.vue"
import PropertyList from "../views/property/PropertyList.vue"
import PropertyCreate from "../views/property/PropertyCreate.vue"
import FavoriteList from "../views/favorite/FavoriteList.vue"
import ContractList from "../views/contract/ContractList.vue"
import AdminPanel from "../views/admin/AdminPanel.vue"

const routes = [
  { path: "/login", component: Login },

  { path: "/", component: Dashboard },
  { path: "/properties", component: PropertyList },
  { path: "/create-property", component: PropertyCreate },
  { path: "/favorites", component: FavoriteList },
  { path: "/contracts", component: ContractList },
  { path: "/admin", component: AdminPanel }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem("token")

  if (to.path !== "/login" && !token) {
    next("/login")
  } else {
    next()
  }
})

export default router