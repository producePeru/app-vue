<template>
  <a-layout-header class="navbar">

    <span></span>

    <!-- <pre>:::   {{nameProfile.name}}</pre> -->

    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        <span class="name-user">{{ user?.name }}</span>
        
        <!-- <pre>{{photoProfile}}</pre> -->
        <!-- <a-avatar v-if="photoProfile" :src="photoProfile"></a-avatar> -->
        <a-avatar >{{ user.name.charAt(0) }}</a-avatar>

      </a>
      <template #overlay>
        <a-menu @click="handleMenuClick" style="width: 140px">
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
import { computed } from 'vue';
import { makeRequest } from '@/utils/api.js'
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons-vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/someEvents.js'
const store = useCounterStore()
const photoProfile = computed(() => store.getPhotoUser);
const nameProfile = computed(() => store.getNameUser)

const user = JSON.parse(localStorage.getItem('profile'));

const router = useRouter();
const emit = defineEmits(['toggleSidebar'])
const photo = JSON.parse(localStorage.getItem('photoUser'));


const handleMenuClick = (e) => {
  if(e.key == 1) {
    router.push('/admin/mi-perfil');
  }
  if(e.key == 2) {
    logout()
  }
};

const logout = async() => {
  try {
    const data = await makeRequest({ url: 'user/logout', method: 'POST'});
    if(data) {
      Cookies.remove('token');
      localStorage.clear();
      router.push('/');
    }
  } catch (error) {
    console.error('Error de red:', error);
    Cookies.remove('token');
    localStorage.clear();
    router.push('/');
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
    color: #4e4e4ee0;
    margin-right: .5rem;
  }
  .ico-menu {
    cursor: pointer;
    font-size: 16px;
  }
}
</style>