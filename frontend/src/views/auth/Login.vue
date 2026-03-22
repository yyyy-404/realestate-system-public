<!-- frontend/src/views/auth/Login.vue -->
<template>
  <div class="page">

    <div class="panel">
      <h2>二手房交易系统</h2>
      <h2>LOGIN</h2>

      <form @submit.prevent="handleLogin" class="form">

        <input
          v-model="form.username"
          type="text"
          placeholder="Username"
        />

        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
        />

        <button class="btn" :disabled="loading">
          {{ loading ? "登录中..." : "登录" }}
        </button>

      </form>

      <div class="hint">
        <router-link to="/register">注册账号</router-link>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  username: "",
  password: "",
});

import { useRouter } from "vue-router";
import { login } from "@/api/auth";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const loading = ref(false);
const error = ref("");

const user = useUserStore();

const handleLogin = async () => {
  error.value = "";
  if (!form.username || !form.password) {
  error.value = "用户名和密码不能为空";
  return;
    }
  loading.value = true;
  try {
    const res = await login({
    username: form.username,
    password: form.password,
      });

    // 按你后端规范：token 在根节点 access_token
    const token = res?.data?.access_token;
    if (!token) throw new Error("登录失败：未收到 access_token");

    user.setUser(token);

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
:root {
  --gold: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728);
}

.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6), transparent),
    radial-gradient(circle at 80% 70%, rgba(255,255,255,0.4), transparent),
    linear-gradient(135deg, #f4f1e6, #e8e2d2);
}

.panel {
  padding: 50px;
  border-radius: 24px;

  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.5);

  box-shadow:
    0 20px 50px rgba(0,0,0,0.08),
    inset 0 0 20px rgba(255,255,255,0.4);

  width: 320px;
  text-align: center;
}

h2 {
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 30px;
  color: #4a3728;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

input {
  padding: 12px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: rgba(255,255,255,0.6);
}

button {
  padding: 12px;
  border-radius: 12px;
  border: none;
  cursor: pointer;

  background: var(--gold);
  color: #333;
  font-weight: 600;
}

button:hover {
  transform: translateY(-2px);
}

/* ===== 极简玻璃按钮 ===== */
.btn {
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;

  font-weight: 500;
  letter-spacing: 1px;

  /* 关键：透明 + 边框 */
  background: rgba(255,255,255,0.4);
  border: 1px solid rgba(191,149,63,0.4);

  color: #4a3728;

  backdrop-filter: blur(10px);

  transition: all 0.25s ease;
}

/* hover（轻微强化，不夸张） */
.btn:hover {
  background: rgba(255,255,255,0.6);
  border-color: rgba(191,149,63,0.7);

  transform: translateY(-1px);
}

/*细高光边*/
.btn {
  box-shadow:
    inset 0 1px 1px rgba(255,255,255,0.6),
    0 4px 10px rgba(0,0,0,0.05);
}

/* 点击 */
.btn:active {
  transform: scale(0.97);
}

/* 禁用 */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hint {
  margin-top: 20px;
  font-size: 0.85rem;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>