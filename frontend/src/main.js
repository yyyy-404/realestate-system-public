// frontend/src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";

import { useUserStore } from "@/stores/user";

const app = createApp(App);

// ⭐ 只创建一次
const pinia = createPinia();
app.use(pinia);
app.use(router);

// ⭐ 必须在 pinia 之后
const user = useUserStore();
user.loadFromToken();

app.mount("#app");