import axios from "axios"

const service = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 5000
})

service.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default service