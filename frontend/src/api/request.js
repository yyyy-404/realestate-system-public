import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

service.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status;

    if (status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default service;