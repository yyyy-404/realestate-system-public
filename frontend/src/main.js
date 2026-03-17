// frontend/src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css"; // 可选：如果你使用 Element Plus

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");