<template>
  <a-layout class="min-height-100">
    
    <SideBar />

    <a-layout>

      <NavBar />

      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div class="layout-content">
          <RouterView />
        </div>
      </a-layout-content>

    </a-layout>
  </a-layout>
</template>

<script setup>
import SideBar from '@/components/SiderBar.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<style>
.min-height-100 {
  min-height: 100vh;
}
.layout-content {
  padding: 24px; 
  background: #fff; 
  min-height: calc(100vh - 90px);
  border-radius: 4px;
}
.ant-layout-sider-zero-width-trigger {
  top: 3px !important;
}
</style>
