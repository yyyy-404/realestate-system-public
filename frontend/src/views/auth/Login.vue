<template>
  <div>
    <h2>系统登录</h2>

    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />

    <button @click="login">登录</button>

    <p>{{ msg }}</p>
  </div>
</template>

<script>
import request from "../../api/request"

export default {
  data() {
    return {
      username: "",
      password: "",
      msg: ""
    }
  },
  methods: {
    async login() {
      try {
        const res = await request.post("/auth/login", {
          username: this.username,
          password: this.password
        })

        localStorage.setItem("token", res.data.access_token)
        this.$router.push("/")
      } catch {
        this.msg = "登录失败"
      }
    }
  }
}
</script>