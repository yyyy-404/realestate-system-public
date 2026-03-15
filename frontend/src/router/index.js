import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/auth/Login.vue"
import Home from "../views/Home.vue"

import PropertyList from "../views/property/PropertyList.vue"
import PropertyDetail from "../views/property/PropertyDetail.vue"
import PropertyCreate from "../views/property/PropertyCreate.vue"

import FavoriteList from "../views/favorite/FavoriteList.vue"
import ContractList from "../views/contract/ContractList.vue"
import Dashboard from "../views/stats/Dashboard.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },

  { path: "/properties", component: PropertyList },
  { path: "/properties/:id", component: PropertyDetail },
  { path: "/create-property", component: PropertyCreate },

  { path: "/favorites", component: FavoriteList },
  { path: "/contracts", component: ContractList },

  { path: "/dashboard", component: Dashboard },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})