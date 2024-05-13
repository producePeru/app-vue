<template>
  <section>
    <Formalizaciones v-if="storageRole[0].id == 1 || storageRole[0].id == 2" />
  </section>
</template>

<script setup>
import Formalizaciones from './InicioFormalizaciones.vue';

const storageRole = JSON.parse(localStorage.getItem('role'));
</script>
<!-- import eventBus from '@/utils/bus.js'; -->
<!-- eventBus.config.globalProperties.eventBus.$emit('parentClick', '¡Hola desde el padre!');
 -->
<!-- eventBus.config.globalProperties.eventBus.$on('parentClick', () => {
  resetChart();
}); -->