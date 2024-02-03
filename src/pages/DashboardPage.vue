<template>
  <a-layout has-sider class="layout">
  
    <SideBar @menuToogle="handleMenuToggle" />

    <a-layout :class=" toggleMenu ? 'layout-content-80' : 'layout-content-200' "        >
      <a-layout-content >
        
        <NavBar  ref="hermanoB" />

        <div class="main">
          <RouterView />
        </div>
      </a-layout-content>

      <!-- <a-layout-footer>
        Admin Dashboard ©2023 Created by I
      </a-layout-footer> -->

    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import SideBar from '@/components/SiderBar.vue';
import NavBar from '@/components/NavBar.vue';

const toggleMenu = ref(false);

const handleMenuToggle = (val) => {
  toggleMenu.value = val
}

</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  &-content {
    margin-left: 0;
  }
}
.main {
  padding: 24px;
  background: #fff; 
  min-height: calc(100vh - 80px);
  margin: 16px;
  border-radius: 4px;
}
.footer {
  text-align: center;
}

@media screen and (min-width: 768px) {
  .layout {
    &-content-200 {
      margin-left: 200px;
    }
    &-content-80 {
      margin-left: 80px;
    }
  }
}
</style>

