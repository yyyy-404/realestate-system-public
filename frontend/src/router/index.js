import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/Login.vue"
import PropertyList from "../views/PropertyList.vue"
import PropertyDetail from "../views/PropertyDetail.vue"
import PublishProperty from "../views/PublishProperty.vue"
import FavoriteList from "../views/FavoriteList.vue"
import ContractList from "../views/ContractList.vue"
import Dashboard from "../views/Dashboard.vue"

// Router

const routes = [

  { path: "/login", component: Login },

  { path: "/", component: PropertyList },

  { path: "/property/:id", component: PropertyDetail },

  { path: "/publish", component: PublishProperty },

  { path: "/favorites", component: FavoriteList },

  { path: "/contracts", component: ContractList },

  { path: "/dashboard", component: Dashboard }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router