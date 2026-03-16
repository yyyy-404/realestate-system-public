// src/api/request.js
import axios from "axios";

// 后端基础地址（按你确认的）
const baseURL = "http://127.0.0.1:5000/api";

const service = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截：自动加 Authorization（若有 token）
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截：统一处理 401（未授权）和常见错误提示
service.interceptors.response.use(
  (response) => {
    // 直接返回 axios response（上层按 res.data 使用）
    return response;
  },
  (error) => {
    const resp = error?.response;
    if (resp) {
      if (resp.status === 401) {
        // token 过期或未授权：清除 token 并跳到登录页
        localStorage.removeItem("access_token");
        // 强制刷新到登录页（避免循环依赖 router）
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default service;