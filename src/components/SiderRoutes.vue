<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible class="my-sider">
    <div class="logo center-center">
      <h1 v-show="!collapsed">Admin Pro</h1>
    </div>


    <a-menu theme="dark" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline">
      
      <a-menu-item key="rr">
        <pie-chart-outlined />
        <span> <router-link to="/admin/rr">Inicio</router-link></span>
      </a-menu-item>
      
      <a-menu-item key="users">
        <desktop-outlined />
        <span> <router-link to="/admin/users">Inicio</router-link> </span>
      </a-menu-item>


      <a-sub-menu key="ruta-digital">
        <template #title>
          <span>
            <user-outlined />
            <span>Ruta Digital</span>
          </span>
        </template>
        <a-menu-item key="3">Tom</a-menu-item>
        <a-menu-item key="mailing"> <router-link to="/admin/ruta-digital/mailing">Mailing</router-link> </a-menu-item>
        <a-menu-item key="reportes"> <router-link to="/admin/ruta-digital/reportes">Reportes</router-link> </a-menu-item>
      </a-sub-menu>


      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <team-outlined />
            <span>Team</span>
          </span>
        </template>
        <a-menu-item key="6">Team 1</a-menu-item>
        <a-menu-item key="8">Team 2</a-menu-item>
      </a-sub-menu>


      <a-menu-item key="9">
        <file-outlined />
        <span>File</span>
      </a-menu-item>

      
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
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