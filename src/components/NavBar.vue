<template>
  <a-layout-header class="navbar">

    <span></span>

    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        <span class="name-user">{{ user.name }}</span>
        <a-avatar size="default" style="background-color: #cf1322">
          {{ user.name.charAt(0) }}
        </a-avatar>
      </a>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <UserOutlined />
            Ver Perfil
          </a-menu-item>
          <a-menu-item key="2">
            <PoweroffOutlined />
            Cerrar Sesión
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons-vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import {ref} from 'vue'

const router = useRouter();
const emit = defineEmits(['toggleSidebar'])
const user = JSON.parse(localStorage.getItem('user'));

const handleMenuClick = (e) => {
  if(e.key == 1) {
    router.push('/admin/mi-perfil');
  }
  if(e.key == 2) {
    logout()
  }
};


const handleMenuToggle = () => {
 
}

const logout = async() => {
  try {
      const data = await makeRequest({ url: '/logout', method: 'POST'});
      if(data) {
        Cookies.remove('token');
        localStorage.clear();
        router.push('/');
      }
    
    } catch (error) {
      console.error('Error de red:', error);
    }
}

</script>

<style lang="scss" scoped>
.navbar {
  background: #fff;
  padding: 0 2rem;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .name-user {
    color: var(--text-color);
    margin-right: .5rem;
  }
  .ico-menu {
    cursor: pointer;
    font-size: 16px;
  }
}
</style>