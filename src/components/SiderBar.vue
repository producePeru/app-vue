<template>
  <a-layout-sider v-model:collapsed="collapsed" class="my-sider" @collapse="handleCollapse">
    <div class="logo center-center">
      <h1 v-show="!collapsed">Admin</h1>
      
    </div>

    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline">
      
      <a-menu-item key="inicio">
        <pie-chart-outlined />
        <span><router-link to="/admin/inicio">inicio</router-link></span>
      </a-menu-item>

      <!-- <a-menu-item key="patrimonios">
        <pie-chart-outlined />
        <span><router-link to="/admin/patrimonios">Patrimonios</router-link></span>
      </a-menu-item> -->

      <!-- Convenios  --> 
      <!-- <a-sub-menu key="convenios">
        <template #title>
          <span>
            <BookOutlined />
            <span>Convenios</span>
          </span>
        </template>
        <a-menu-item key="lista-convenios"> <router-link to="/admin/convenios/lista-convenios">Lista de convenio</router-link> </a-menu-item>
        <a-menu-item key="nuevo-convenio"> <router-link to="/admin/convenios/nuevo-convenio">Nuevo convenio</router-link> </a-menu-item> 
      </a-sub-menu> -->

      <!-- Ruta Digital  -->
      <a-sub-menu key="ruta-digital" v-if="views.includes('ruta-digital')">
        <template #title>
          <span>
            <SolutionOutlined />
            <span>Ruta Digital</span>
          </span>
        </template>
        <a-menu-item key="reportes" v-if="views.includes('reportes')"> <router-link to="/admin/ruta-digital/reportes">Reportes</router-link> </a-menu-item> 
        <a-menu-item key="calendario" v-if="views.includes('calendario')"> <router-link to="/admin/ruta-digital/calendario">Calendario</router-link> </a-menu-item>
        <a-menu-item key="talleres" v-if="views.includes('talleres')"> <router-link to="/admin/ruta-digital/talleres">Talleres</router-link> </a-menu-item>
        <a-menu-item key="mype" v-if="views.includes('mype')"> <router-link to="/admin/ruta-digital/mype">Las MYPE</router-link> </a-menu-item>
        <a-menu-item key="expositores" v-if="views.includes('expositores')"> <router-link to="/admin/ruta-digital/expositores">Expositores</router-link> </a-menu-item>
      </a-sub-menu>

      <!-- Usuarios  -->
      <a-sub-menu key="usuarios" v-if="views.includes('usuarios')">
        <template #title>
          <span>
            <team-outlined />
            <span>Personal</span>
          </span>
        </template>
        <a-menu-item key="nuevo-usuario" v-if="views.includes('nuevo-usuario')"> <router-link to="/admin/usuarios/nuevo-usuario">Nuevo usuario</router-link> </a-menu-item>
        <a-menu-item key="lista" v-if="views.includes('lista')"> <router-link to="/admin/usuarios/lista">Lista usuarios</router-link> </a-menu-item>
      </a-sub-menu>


      <!-- <a-menu-item key="9">
        <file-outlined />
        <span>File</span>
      </a-menu-item> -->

      
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// import { useSideBar } from '../stores/index';
import { makeRequest } from '@/utils/api.js'
import { userId } from '@/utils/cookies.js' 
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';


import {
  PieChartOutlined,
  BookOutlined,
  SolutionOutlined,
  TeamOutlined,
  // FileOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();
const selectedKeys = ref([route.name]);
const openKeys = ref([route.matched[1].name]);
const collapsed = ref(false);

// let views = JSON.parse(localStorage.getItem('views'));
// views = Array.isArray(views) ? views : [];


const ecryptedText = localStorage.getItem('views')
const secretKey = 'vistas_secret_key';
const views = CryptoJS.AES.decrypt(ecryptedText, secretKey).toString(CryptoJS.enc.Utf8);

const handleCollapse = () => {
  console.log("isiisisi");
}

// const fetchData = async() => {
//   try {
//     const {data} =  await makeRequest({ url: `/permission/${userId}`, method: 'GET'});
//     // views.value = data.views;
//     // Cookies.set('exclusions', data.exclusions);
//     localStorage.setItem('views', JSON.stringify(data.views));
//     // localStorage.setItem('exclusions',JSON.stringify(data.exclusions));
//   } catch (error) {
//     console.error('Error de red:', error);
//   }
// }
// onMounted(() => {
//   fetchData()
// });
</script>

<style lang="scss" scoped>
.my-sider {
  overflow: auto;
  height: 100vh; 
  position: fixed; 
  left: 0; 
  top: 0;
  bottom: 0;
  .logo {
    height: 64px;
    color: #fff;
    padding: 16px;
    h1 {
      margin: 0;
      font-size: 18px;
    }
  }
  @media screen and (max-width: 768px) {
    position: absolute;
    height: -webkit-fill-available;
    left: -200px;
  }
}
</style>