<template>
  <a-layout-sider v-model:collapsed="collapsed"  class="my-sider">
    <div class="logo center-center">
      <h1 v-show="!collapsed">Admin Pro</h1>
    </div>

    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline">
      
      <a-menu-item key="inicio">
        <pie-chart-outlined />
        <span> <router-link to="/admin/inicio">inicio</router-link></span>
      </a-menu-item>


      <a-sub-menu key="ruta-digital">
        <template #title>
          <span>
            <SolutionOutlined />
            <span>Ruta Digital</span>
          </span>
        </template>
        <!-- <a-menu-item key="indicadores"> <router-link to="/admin/ruta-digital/indicadores">Indicadores</router-link> </a-menu-item>
        <a-menu-item key="mailing"> <router-link to="/admin/ruta-digital/mailing">Mailing</router-link> </a-menu-item> -->
        <a-menu-item key="reportes"> <router-link to="/admin/ruta-digital/reportes">Reportes</router-link> </a-menu-item> 
        <a-menu-item key="mype"> <router-link to="/admin/ruta-digital/mype">Las MYPE</router-link> </a-menu-item>
        <!-- <a-menu-item key="cuestionarios"> <router-link to="/admin/ruta-digital/cuestionarios">Cuestionarios</router-link> </a-menu-item> -->
        <a-menu-item key="talleres"> <router-link to="/admin/ruta-digital/talleres">Talleres</router-link> </a-menu-item>
        <a-menu-item key="calendario"> <router-link to="/admin/ruta-digital/calendario">Calendario</router-link> </a-menu-item>



      </a-sub-menu>


      <a-sub-menu key="usuarios">
        <template #title>
          <span>
            <team-outlined />
            <span>Personal</span>
          </span>
        </template>
        <a-menu-item key="nuevo-usuario"> <router-link to="/admin/usuarios/nuevo-usuario">Nuevo usuario</router-link> </a-menu-item>
        <a-menu-item key="lista"> <router-link to="/admin/usuarios/lista">Lista usuarios</router-link> </a-menu-item>
        <a-menu-item key="expositores"> <router-link to="/admin/usuarios/expositores">Expositores</router-link> </a-menu-item>

        <!-- <a-menu-item key="usuario-reportes"> <router-link to="/admin/usuarios/reportes">Reportes</router-link> </a-menu-item> -->
      </a-sub-menu>


      <!-- <a-menu-item key="9">
        <file-outlined />
        <span>File</span>
      </a-menu-item> -->

      
    </a-menu>
  </a-layout-sider>

</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  PieChartOutlined,
  DesktopOutlined,
  SolutionOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();

console.log(route.matched[1].name);

const selectedKeys = ref([route.name]);
const openKeys = ref([route.matched[1].name]);
const collapsed = ref(false);
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