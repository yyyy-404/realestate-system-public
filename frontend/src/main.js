// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "element-plus/dist/index.css"; // 如果使用 element-plus，可选

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");