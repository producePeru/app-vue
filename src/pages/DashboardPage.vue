<template>
  <a-layout class="layout">
  
    <Aside />

    <a-layout>
      <a-layout-content >
        <NavBar />
        <div class="main">
          <RouterView />
        </div>
      </a-layout-content>

      <a-layout-footer>
        Admin Dashboard ©2023 Created by I
      </a-layout-footer>

    </a-layout>
  </a-layout>
</template>

<script setup>
import Aside from '@/components/SiderRoutes.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh
}
.main {
  padding: 24px;
  background: #fff; 
  min-height: 400px;
  margin: 16px;
  border-radius: 4px;
}
.footer {
  text-align: center;
}
</style>

