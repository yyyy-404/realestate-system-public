// src/stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    clear() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
    setUser(user) {
      this.user = user;
    },
  },
});