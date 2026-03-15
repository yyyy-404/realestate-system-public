// src/api/auth.js
import request from "./request";

export const login = (data) => request.post("/auth/login", data);
export const me = () => request.get("/auth/me"); // 可选：如果后端有这个接口