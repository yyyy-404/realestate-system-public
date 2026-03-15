<!-- src/views/auth/Login.vue -->
<template>
  <div style="max-width:400px;margin:50px auto">
    <h2>登录</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <div style="margin-top:10px">
      <button @click="doLogin">登录</button>
    </div>
    <p style="color:red">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../../api/auth";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const username = ref("");
const password = ref("");
const message = ref("");
const router = useRouter();
const auth = useAuthStore();

async function doLogin() {
  try {
    const res = await login({ username: username.value, password: password.value });
    // 假设后端返回 { access_token: "..." } 或 { access_token: "..." }
    const token = res.data.access_token || res.data.token || res.data.accessToken;
    if (!token) {
      message.value = "登录返回格式异常";
      return;
    }
    auth.setToken(token);
    router.push("/");
  } catch (err) {
    message.value = "登录失败，请检查用户名/密码";
  }
}
</script>