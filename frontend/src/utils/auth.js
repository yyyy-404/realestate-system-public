// src/utils/auth.js

const TOKEN_KEY = "access_token";

/** 获取 token */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/** 保存 token */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/** 删除 token（登出） */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/** 是否已登录 */
export function isLoggedIn() {
  return !!getToken();
}