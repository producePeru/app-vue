
import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from  'moment'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';
import './utils/api.js'
import './utils/noToken.js'
import './utils/auth'
import VueApexCharts from "vue3-apexcharts";

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


import { useSideBar } from './stores/index.js'; 

moment.locale('es')

const app = createApp(App)

app.use(pinia); 
app.use(router)
app.use(moment)
app.use(VueApexCharts);
app.use(Antd);

const myStore = useSideBar(); 

app.config.globalProperties.$myStore = myStore; 
app.mount('#app');



// import { esES } from 'ant-design-vue/lib/locale-provider';
// app.use(createPinia())
// app.config.globalProperties.$antd = { locale: esES };
// import VueApexCharts from "vue3-apexcharts";
// const app = createApp(App);
// app.use(VueApexCharts);