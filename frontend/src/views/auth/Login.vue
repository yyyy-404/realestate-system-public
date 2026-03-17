<!-- frontend/src/views/auth/Login.vue -->
<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>房产管理系统</h1>
      <p class="subtitle">管理后台 — 登录</p>

      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />

      <button :disabled="loading" @click="handleLogin">
        {{ loading ? "登录中..." : "登录" }}
      </button>

      <p class="switch">
        没有帐号？
        <span @click="goRegister">立即注册</span>
      </p>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/auth";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const user = useUserStore();

const handleLogin = async () => {
  error.value = "";
  if (!username.value || !password.value) {
    error.value = "用户名和密码不能为空";
    return;
  }
  loading.value = true;
  try {
    const res = await login({
      username: username.value,
      password: password.value,
    });

    // 按你后端规范：token 在根节点 access_token
    const token = res?.data?.access_token;
    if (!token) throw new Error("登录失败：未收到 access_token");

    user.setToken(token);

    router.push("/");
  } catch (err) {
    error.value =
      err?.response?.data?.message || err?.message || "登录失败，请检查账号密码";
  } finally {
    loading.value = false;
  }
};

const goRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
.auth-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f6fa;
}
.auth-card {
  width: 380px;
  background: #fff;
  padding: 36px;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.auth-card input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ddd;
}
.auth-card button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 6px;
  background: #409eff;
  color: white;
  border: none;
  cursor: pointer;
}
.switch {
  margin-top: 12px;
}
.switch span {
  color: #409eff;
  cursor: pointer;
}
.error {
  color: #d9534f;
  margin-top: 8px;
}
.subtitle {
  color: #6b7280;
  margin-bottom: 14px;
}
</style>