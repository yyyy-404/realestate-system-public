<template>
  <div class="page">
    <div class="panel">
      <h2>REGISTER</h2>

      <form @submit.prevent="handleRegister" class="form">
        <input
          v-model="form.username"
          placeholder="Username"
          :disabled="loading"
          required
        />

        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          :disabled="loading"
          required
        />

        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm Password"
          :disabled="loading"
          required
        />

        <div class="role-select">
          <div
            class="role-item"
            :class="{ active: form.role === 'buyer' }"
            @click="form.role = 'buyer'"
          >
            <span class="role-label">买家</span>
          </div>

          <div
            class="role-item"
            :class="{ active: form.role === 'seller' }"
            @click="form.role = 'seller'"
          >
            <span class="role-label">卖家</span>
          </div>

          <div
            class="role-item"
            :class="{ active: form.role === 'admin' }"
            @click="form.role = 'admin'"
          >
            <span class="role-label">管理员</span>
          </div>
        </div>

        <button class="btn" type="submit" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>

        <!-- 错误提示 -->
        <div v-if="errorMsg" class="error">
          {{ errorMsg }}
        </div>
      </form>

      <div class="hint">
        已有账号？
        <router-link to="/login">去登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const errorMsg = ref('')

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: 'buyer'
})

const handleRegister = async () => {
  errorMsg.value = ''

  // 1. 基础验证
  if (form.password !== form.confirmPassword) {
    errorMsg.value = '两次输入的密码不一致'
    return
  }

  if (form.password.length < 6) {
    errorMsg.value = '密码长度至少为 6 位'
    return
  }

  // 2. 开始提交
  loading.value = true

  try {
    // 模拟 API 请求 (请替换为实际的 axios/fetch 请求)
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('注册数据:', form)

    // 3. 注册成功
    alert('注册成功！即将跳转登录...')
    router.push('/login')

    // 可选：清空表单
    // form.username = ''
    // form.password = ''
    // form.confirmPassword = ''

  } catch (error) {
    errorMsg.value = '注册失败，请稍后重试'
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

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

.hint {
  margin-top: 20px;
  font-size: 0.85rem;
}

.error {
  color: red;
  margin-top: 10px;
}

/* ===== 容器 ===== */
.role-select {
  display: flex;
  gap: 8px;
}

/* ===== 基础按钮 ===== */
.role-item {
  flex: 1;
  padding: 10px 0;
  border-radius: 12px;
  letter-spacing: 1px;

  text-align: center;
  cursor: pointer;

  font-size: 0.9rem;
  color: #6b5a45;

  background: rgba(255,255,255,0.35);
  backdrop-filter: blur(10px);

  transition: all 0.25s ease;
}

/* hover */
.role-item:hover {
  background: rgba(255,255,255,0.5);
}

/* ===== 双金边（核心） ===== */
.role-item.active {
  background: rgba(255,255,255,0.55);

  color: #3a2a1a;
  font-weight: 500;

  /* 双边框关键技巧 */
  box-shadow:
    0 0 0 1px rgba(191,149,63,0.7),   /* 外金边 */
    inset 0 0 0 1px rgba(255,240,180,0.8), /* 内金边 */
    inset 0 1px 1px rgba(255,255,255,0.7);

  transform: scale(1.03);
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

/* 点击 */
.btn:active {
  transform: scale(0.97);
}

/* 禁用 */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 细高光边 */
.btn {
  box-shadow:
    inset 0 1px 1px rgba(255,255,255,0.6),
    0 4px 10px rgba(0,0,0,0.05);
}

/*主按钮*/
.btn-primary {
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(191,149,63,0.6);
}

/*次按钮*/
.btn-secondary {
  background: rgba(255,255,255,0.3);
  border: 1px solid rgba(0,0,0,0.1);
}

</style>