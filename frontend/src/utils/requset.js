import axios from "axios"

// Axios 封装
const request = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 5000
})

request.interceptors.request.use(config => {

  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = "Bearer " + token
  }

  return config
})

export default request