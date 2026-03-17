// frontend/src/api/request.js
import axios from "axios";

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

// 响应拦截：统一处理 401（未授权）
service.interceptors.response.use(
  (response) => response,
  (error) => {
    const resp = error?.response;
    if (resp) {
      if (resp.status === 401) {
        localStorage.removeItem("access_token");
        // 强制跳转登录（避免循环依赖 router）
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default service;