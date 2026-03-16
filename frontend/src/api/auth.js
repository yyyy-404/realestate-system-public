// src/api/auth.js
import request from "@/api/request";

/**
 * 登录
 * POST /auth/login
 * body: { username, password }
 * 返回: { access_token }
 */
export function login(payload) {
  return request.post("/auth/login", payload);
}

/**
 * 注册
 * POST /auth/register
 * body: { username, password, role }
 */
export function register(payload) {
  return request.post("/auth/register", payload);
}