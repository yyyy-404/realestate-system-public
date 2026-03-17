// frontend/src/stores/user.js
import { defineStore } from "pinia";

/**
 * 因后端没有 /auth/me，我们从 JWT payload 解出用户信息（若后端以后提供 /me，可替换为请求）
 */

function decodeJwtPayload(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    // base64url -> base64
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("access_token") || null,
    username: null,
    role: null,
  }),
  actions: {
    loadFromToken() {
      const token = localStorage.getItem("access_token");
      this.token = token;
      if (token) {
        const payload = decodeJwtPayload(token);
        if (payload) {
          // 依据后端 JWT 载荷字段命名自行调整，如 payload.username / payload.sub / payload.role
          this.username = payload.username || payload.sub || null;
          this.role = payload.role || null;
        }
      } else {
        this.username = null;
        this.role = null;
      }
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem("access_token", token);
      this.loadFromToken();
    },
    logout() {
      this.token = null;
      this.username = null;
      this.role = null;
      localStorage.removeItem("access_token");
    },
  },
});