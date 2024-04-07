<template>
  <div>
    <h3>NOTARÍAS</h3>
    <div class="filters">
      <a-button class="btn-produce" type="primary" @click="showDrawer">AGREGAR</a-button>
      <router-link to="/notarias" target="_blank">
        <LinkOutlined />
      </router-link>
    </div>

    
    
    
    
    
    
    
    
    
    
    
    
    <a-drawer
      v-model:open="open"
      class="draw-notary"
      root-class-name="root-class-name"
      title="Basic Drawer"
      placement="right"
      @after-open-change="afterOpenChange">
      <formAddNotary />
    </a-drawer>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import formAddNotary from './components/formAddNotary.vue';
import { LinkOutlined } from '@ant-design/icons-vue';

const open = ref(false);
const afterOpenChange = bool => {
  console.log('open', bool);
};
const showDrawer = () => {
  open.value = true;
};
</script>

<style>
.ant-drawer-content-wrapper {
  min-width: 550px !important;
  width: 100%;
}
.quill-editor {
  .ql-editor {
    height: 100px;
  }
}
</style>