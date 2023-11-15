<template>
  <a-layout-header class="navbar">

    <MenuOutlined class="ico-menu" />

    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        <span class="name-user">Kinder</span>
        <a-avatar size="default" style="background-color: #f56a00">K</a-avatar>
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
import { UserOutlined, PoweroffOutlined, MenuOutlined } from '@ant-design/icons-vue';
// import Cookies from 'js-cookie';

const handleMenuClick = (e) => {
  if(e.key == 2){
    // console.log("kskks", Cookies.get('token'))
    logout()
  }
};

const logout = async() => {
  try {
      // const token = Cookies.get('token')
      const data = await makeRequest({ url: '/logout', method: 'POST'});
      console.log(data)
    
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