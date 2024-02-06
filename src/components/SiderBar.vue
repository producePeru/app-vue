<template>
  <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
    
    <div class="logo center-center">
      <h1>PNTE</h1>
    </div>

  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" v-model:openKeys="openKeys">
    

    <a-menu-item key="inicio">
      <HomeOutlined />
      <span><router-link to="/admin/inicio">inicio</router-link></span>
    </a-menu-item>

    <!-- <a-menu-item key="patrimonios">
      <pie-chart-outlined />
      <span><router-link to="/admin/patrimonios">Patrimonios</router-link></span>
    </a-menu-item> -->

    <!-- Drive  --> 
    <a-sub-menu key="drive" @click="handleCollapse('drive')" v-if="views.includes('drive')">
      <template #title>
        <span>
          <CloudOutlined />
          <span>Drive</span>
        </span>
      </template>
      <a-menu-item key="mis-archivos" v-if="views.includes('mis-archivos')"> <router-link to="/admin/drive/mis-archivos">Mis Archivos</router-link> </a-menu-item> 
      <a-menu-item key="subir-archivo" v-if="views.includes('subir-archivo')"> <router-link to="/admin/drive/subir-archivo">Subir Archivo</router-link> </a-menu-item> 
    </a-sub-menu>

    <!-- Asesorias  --> 
    <a-sub-menu key="asesorias" v-if="views.includes('asesorias')" @click="handleCollapse('asesorias')">
      <template #title>
        <span>
          <BulbOutlined />
          <span>Asesorias</span>
        </span>
      </template>
      <a-menu-item key="solicitantes"> <router-link to="/admin/asesorias/solicitantes">Solicitantes</router-link> </a-menu-item> 
      <a-menu-item key="notarias"> <router-link to="/admin/asesorias/notarias">Notarias</router-link> </a-menu-item> 
      <a-menu-item key="asesores"> <router-link to="/admin/asesorias/asesores">Asesores</router-link> </a-menu-item> 
      <a-menu-item key="supervisores"> <router-link to="/admin/asesorias/supervisores">Supervisores</router-link> </a-menu-item>
    </a-sub-menu>

    <!-- Convenios  --> 
      <!-- <a-sub-menu key="convenios" @click="handleCollapse('convenios')">
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
    <a-sub-menu key="rutadigital" v-if="views.includes('rutadigital')" @click="handleCollapse('rutadigital')">
      <template #title>
        <span>
          <SolutionOutlined />
          <span>Ruta Digital</span>
        </span>
      </template>
      <a-menu-item key="reportes" v-if="views.includes('reportes')"> <router-link to="/admin/ruta-digital/reportes">Reportes</router-link> </a-menu-item> 
      <a-menu-item key="calendario" v-if="views.includes('calendario')"> <router-link to="/admin/ruta-digital/calendario">Calendario</router-link> </a-menu-item>
      <a-menu-item key="talleres" v-if="views.includes('talleres')"> <router-link to="/admin/ruta-digital/talleres">Talleres</router-link> </a-menu-item>
      <a-menu-item key="mype" v-if="views.includes('mype')"> <router-link to="/admin/ruta-digital/mype">MYPEs</router-link> </a-menu-item>
      <a-menu-item key="expositores" v-if="views.includes('expositores')"> <router-link to="/admin/ruta-digital/expositores">Expositores</router-link> </a-menu-item>
    </a-sub-menu>

    <!-- Usuarios  -->
    <a-sub-menu key="usuarios" v-if="views.includes('usuarios')" @click="handleCollapse('usuarios')">
      <template #title>
        <span>
          <team-outlined />
          <span>Personal</span>
        </span>
      </template>
      <a-menu-item key="nuevo-usuario" v-if="views.includes('nuevo-usuario')"> <router-link to="/admin/usuarios/nuevo-usuario">Nuevo usuario</router-link> </a-menu-item>
      <a-menu-item key="lista" v-if="views.includes('lista')"> <router-link to="/admin/usuarios/lista">Lista usuarios</router-link> </a-menu-item>
    </a-sub-menu>

  </a-menu>

</a-layout-sider>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import CryptoJS from 'crypto-js';
import {
  HomeOutlined,
  SolutionOutlined,
  TeamOutlined,
  BulbOutlined,
  CloudOutlined
} from '@ant-design/icons-vue';

const route = useRoute();
const selectedKeys = ref([route.name]);
const openKeys = ref([route.matched[1].name]);
const encryptedLocalStore = localStorage.getItem('views');
const views = CryptoJS.AES.decrypt(encryptedLocalStore, 'appvistas').toString(CryptoJS.enc.Utf8);


const handleCollapse = (name) => {
  if(openKeys.value[1] == undefined) return console.log(name);
  if(openKeys.value[1]) {
    openKeys.value = ["inicio", name]
  } else {
    openKeys.value = ["inicio"]
  }
}
const onCollapse = (collapsed, type) => {
  console.log("collapsed, type");
};
const onBreakpoint = broken => {
  console.log("broken");
};

</script>

<style lang="scss" scoped>
.logo {
  height: 64px;
  color: #fff;
  padding: 16px;
  h1 {
    margin: 0;
    font-size: 18px;
  }
}
</style>