import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import './assets/main.css'
import router from "./router";

createApp(App).use(router).use(store).mount("#app");

//Render tất cả vào app gửi xuống App.vue