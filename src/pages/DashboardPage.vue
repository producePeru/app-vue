<template>
  <a-layout has-sider class="layout">
  
    <Aside />

    <a-layout  :style="{ marginLeft: '200px' }">
      <a-layout-content >
        <NavBar />
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
import Aside from '@/components/SiderBar.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh
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
</style>

