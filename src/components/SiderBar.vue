<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#00a6db',
      colorBorderSecondary: '#ddd',
      // colorFillQuaternary: '#e9e9e9',
    },
  }">

    <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">

      <div class="logo center-center">
        <h1>PNTE</h1>
      </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" v-model:openKeys="openKeys">


        <a-menu-item key="inicio">
          <HomeOutlined />
          <span><router-link to="/admin/inicio" class="fs-13">inicio</router-link></span>
        </a-menu-item>

        <a-menu-item key="mypes" v-if="views.includes('mypes')">
          <ShopOutlined />
          <span><router-link to="/admin/mypes">MYPEs</router-link></span>
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
              <span class="fs-13">Drive</span>
            </span>
          </template>
          <a-menu-item key="drive-mis-carpetas" v-if="views.includes('drive-mis-carpetas')"> <router-link
              to="/admin/drive/mis-carpetas" class="fs-13">Mis Carpetas</router-link> </a-menu-item>
          <a-menu-item key="drive-mis-archivos" v-if="views.includes('drive-mis-archivos')"> <router-link
              to="/admin/drive/mis-archivos" class="fs-13">Mis Archivos</router-link> </a-menu-item>
          <a-menu-item key="drive-subir-archivo" v-if="views.includes('drive-subir-archivo')"> <router-link
              to="/admin/drive/subir-archivo" class="fs-13">Subir Archivo</router-link> </a-menu-item>
        </a-sub-menu>

        <!-- Asesorias  -->
        <a-sub-menu key="asesorias" v-if="views.includes('asesorias')" @click="handleCollapse('asesorias')">
          <template #title>
            <span>
              <AuditOutlined />
              <span class="fs-13">Formalizaciones</span>
            </span>
          </template>
          
          <a-menu-item key="asesorias-formalizaciones" v-if="views.includes('asesorias-formalizaciones')"> <router-link
              to="/admin/asesorias/asesorias-formalizaciones" class="fs-13">Registro</router-link> </a-menu-item>
              
          <a-menu-item key="asesorias" v-if="views.includes('asesorias')"> <router-link
              to="/admin/asesorias/asesorias" class="fs-13">Reportes</router-link> </a-menu-item>
          
          
          <a-menu-item key="planes-accion"  v-if="views.includes('planes-accion')"> <router-link
              to="/admin/asesorias/planes-accion" class="fs-13">Planes de Acción</router-link> </a-menu-item> 


          <a-menu-item key="solicitantes" v-if="views.includes('solicitantes')"> <router-link
              to="/admin/asesorias/solicitantes" class="fs-13">Solicitantes</router-link> </a-menu-item>
          <!-- <a-menu-item key="solicitudes" v-if="views.includes('asesorias')"> <router-link to="/admin/asesorias/solicitudes">Solicitudes F.D.</router-link> </a-menu-item>  -->
          <a-menu-item key="notarias" v-if="views.includes('notarias')"> <router-link
              to="/admin/asesorias/notarias" class="fs-13">Notarias</router-link> </a-menu-item>
          <a-menu-item key="asesores" v-if="views.includes('asesores')"> <router-link
              to="/admin/asesorias/asesores" class="fs-13">Asesores</router-link> </a-menu-item>
          <!-- <a-menu-item key="supervisores" v-if="views.includes('supervisores')"> <router-link to="/admin/asesorias/supervisores">Supervisores</router-link> </a-menu-item> -->
        </a-sub-menu>

        <a-sub-menu key="convenios" @click="handleCollapse('convenios')" v-if="views.includes('convenios')">
          <template #title>
            <span>
              
              <CopyOutlined />
              <span class="fs-13">Convenios</span>
            </span>
          </template>
          <a-menu-item key="estado-convenio-ugo" v-if="views.includes('estado-convenio-ugo')"> <router-link to="/admin/convenios/ugo" class="fs-13">Convenios UGO</router-link> </a-menu-item>
          <a-menu-item key="estado-convenio-ugse" v-if="views.includes('estado-convenio-ugse')"> <router-link to="/admin/convenios/ugse" class="fs-13">Convenios UGSE</router-link> </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="eventos" @click="handleCollapse('eventos')" v-if="views.includes('eventos')">
          <template #title>
            <span>
              <CalendarOutlined />
              <span class="fs-13">Eventos</span>
            </span>
          </template>
          <a-menu-item key="eventos-calendario-google"> <router-link to="/admin/eventos/calendario" v-if="views.includes('eventos-calendario-google')" class="fs-13">Calendario</router-link> </a-menu-item>
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
                <!-- <a-sub-menu key="rutadigital" v-if="views.includes('rutadigital')" @click="handleCollapse('rutadigital')">
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
        </a-sub-menu> -->

        <!-- Usuarios  -->
        <a-sub-menu key="usuarios" v-if="views.includes('usuarios')" @click="handleCollapse('usuarios')">
          <template #title>
            <span>
              <team-outlined />
              <span class="fs-13">Personal</span>
            </span>
          </template>
          <a-menu-item key="usuarios-nuevo" v-if="views.includes('usuarios-nuevo')"> <router-link
              to="/admin/usuarios/nuevo-usuario" class="fs-13">Nuevo usuario</router-link> </a-menu-item>

          <a-menu-item key="asesor-externo-notario" v-if="views.includes('asesor-externo-notario')"> <router-link
              to="/admin/usuarios/asesor-externo-notario" class="fs-13">Asesor externo</router-link> </a-menu-item>

          <a-menu-item key="usuarios-lista" v-if="views.includes('usuarios-lista')"> <router-link
              to="/admin/usuarios/lista" class="fs-13">Lista usuarios</router-link> </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="configuraciones" v-if="views.includes('configuraciones')" @click="handleCollapse('configuraciones')">
          <template #title>
            <span>
              <SettingOutlined />
              <span class="fs-13">Configuraciones</span>
            </span>
          </template>
          <a-menu-item key="tokens"> <router-link
              to="/admin/configuraciones/tokens" class="fs-13">Token</router-link> </a-menu-item>
        </a-sub-menu>

      </a-menu>

    </a-layout-sider>

  </a-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import CryptoJS from 'crypto-js';
import {
  HomeOutlined,
  ShopOutlined,
  SolutionOutlined,
  TeamOutlined,
  AuditOutlined,
  CloudOutlined,
  CopyOutlined,
  SettingOutlined,
  CalendarOutlined
} from '@ant-design/icons-vue';

const route = useRoute();
const selectedKeys = ref([route.name]);
const openKeys = ref([route.matched[1].name]);
const encryptedLocalStore = localStorage.getItem('views');
const views = CryptoJS.AES.decrypt(encryptedLocalStore, 'appvistas').toString(CryptoJS.enc.Utf8);


const handleCollapse = (name) => {
  if (openKeys.value[1] == undefined) return true;
  if (openKeys.value[1]) {
    openKeys.value = ["inicio", name]
  } else {
    openKeys.value = ["inicio"]
  }
}
const onCollapse = (collapsed, type) => {
  console.log("collapsed, type");
};
const onBreakpoint = broken => {
  // console.log("broken");
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