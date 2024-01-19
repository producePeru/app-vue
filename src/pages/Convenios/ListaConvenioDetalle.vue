<template>
  <section>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="SEGUIMIENTO DEL CONVENIO">
        <Tab1 />
      </a-tab-pane>
      
      <a-tab-pane key="2" tab="COMPROMISOS" force-render>
        <Tab2 />
      </a-tab-pane>
      
      <a-tab-pane key="3" tab="INFORMES">
        <Tab3 />
      </a-tab-pane>
    </a-tabs>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Tab1 from './components/ConvenioTab1.vue';
import Tab2 from './components/ConvenioTab2.vue';
import Tab3 from './components/ConvenioTab3.vue';

const activeKey = ref('1'); 
</script>