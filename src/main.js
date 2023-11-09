import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';

import './utils/api.js'
import './utils/auth'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

// app.config.globalProperties.$antd = { locale: esES };

app.use(createPinia())
app.use(router)

app.use(VueApexCharts);

app.use(Antd).mount('#app')



// import VueApexCharts from "vue3-apexcharts";

// const app = createApp(App);
// app.use(VueApexCharts);