<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>

<script setup>
import esES from 'ant-design-vue/es/locale/es_ES';
const locale = esES;
</script>