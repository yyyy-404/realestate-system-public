import { defineStore } from "pinia";

const TOKEN_KEY = "access_token";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    username: "",
    role: "",
  }),

  actions: {
    // 登录后调用
    setUser(token) {
      this.token = token;
      localStorage.setItem(TOKEN_KEY, token);

      // ⚠️ 简单解析 JWT（不验签，仅取 payload）
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.username = payload.username || "";
        this.role = payload.role || "";
      } catch (e) {
        console.warn("token解析失败");
      }
    },

    // 启动时恢复
    loadFromToken() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        this.setUser(token);
      }
    },

    logout() {
      this.token = "";
      this.username = "";
      this.role = "";
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});