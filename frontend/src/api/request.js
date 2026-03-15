// src/api/request.js
import axios from "axios";

const baseURL = "http://127.0.0.1:5000/api"; // 本地模式下的后端地址（Docker 模式改为后端容器地址）

const request = axios.create({
  baseURL,
  timeout: 8000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use(
  (res) => res,
  (err) => {
    // 简单错误处理（必要时改进）
    return Promise.reject(err);
  }
);

export default request;