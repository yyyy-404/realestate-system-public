<template>
  <div>
    <h2>登录</h2>

    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />

    <button @click="login">登录</button>

    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      username: "",
      password: "",
      message: ""
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/api/auth/login",
          {
            username: this.username,
            password: this.password
          }
        )

        localStorage.setItem("token", res.data.access_token)

        this.message = "登录成功"
        this.$router.push("/")
      } catch {
        this.message = "登录失败"
      }
    }
  }
}
</script>