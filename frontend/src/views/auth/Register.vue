<!-- frontend/src/views/auth/Register.vue -->
<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>用户注册</h1>
      <p class="subtitle">创建一个帐号以管理房源</p>

      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <input v-model="confirm" type="password" placeholder="确认密码" />

      <div class="role-row">
        <label><input type="radio" value="buyer" v-model="role" /> 买家</label>
        <label><input type="radio" value="seller" v-model="role" /> 卖家</label>
        <label><input type="radio" value="admin" v-model="role" /> 管理员</label>
      </div>

      <button :disabled="loading" @click="handleRegister">
        {{ loading ? "注册中..." : "注册" }}
      </button>

      <p class="switch">
        已有帐号？
        <span @click="goLogin">去登录</span>
      </p>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import request from "@/api/request"; // or import { register } from "@/api/auth" if you have that module

const router = useRouter();
const username = ref("");
const password = ref("");
const confirm = ref("");
const role = ref("buyer");
const loading = ref(false);
const error = ref("");
const success = ref("");

const handleRegister = async () => {
  error.value = "";
  success.value = "";
  if (!username.value || !password.value) {
    error.value = "用户名和密码不能为空";
    return;
  }
  if (password.value !== confirm.value) {
    error.value = "两次密码不一致";
    return;
  }

  loading.value = true;
  try {
    // 如果你有 src/api/auth.js 的 register 方法，改成： await register({ ... })
    await request.post("/auth/register", {
      username: username.value,
      password: password.value,
      role: role.value,
    });

    success.value = "注册成功，正在跳转到登录...";
    setTimeout(() => router.push("/login"), 700);
  } catch (err) {
    error.value =
      err?.response?.data?.message || err?.message || "注册失败，请重试";
  } finally {
    loading.value = false;
  }
};

const goLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.auth-page { height: 100vh; display:flex; align-items:center; justify-content:center; background:#f3f6fa; }
.auth-card { width:420px; background:#fff; padding:36px; border-radius:10px; box-shadow:0 8px 30px rgba(0,0,0,0.08); text-align:center; }
.auth-card input { width:100%; padding:10px; margin:10px 0; border-radius:6px; border:1px solid #ddd; }
.role-row { display:flex; justify-content:space-around; margin:8px 0 14px 0; font-size:14px; }
.auth-card button { width:100%; padding:10px; margin-top:10px; border-radius:6px; background:#409eff; color:white; border:none; cursor:pointer; }
.switch { margin-top:12px; }
.switch span { color:#409eff; cursor:pointer; }
.error { color:#d9534f; margin-top:8px; }
.success { color:#28a745; margin-top:8px; }
.subtitle { color:#6b7280; margin-bottom:14px; }
</style>