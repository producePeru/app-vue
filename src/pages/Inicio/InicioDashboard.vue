<template>
  <section>
    <Formalizaciones v-if="includesRole([1, 2, 7])" />
  </section>
</template>

<script setup>
import Formalizaciones from './InicioFormalizaciones.vue';

const storageRole = JSON.parse(localStorage.getItem('role')) || [];

// Función para verificar si uno de los roles específicos está en el array de roles
const includesRole = (roleIds) => {
  return storageRole.some(role => roleIds.includes(role.id));
};
</script>

<!-- import eventBus from '@/utils/bus.js'; -->
<!-- eventBus.config.globalProperties.eventBus.$emit('parentClick', '¡Hola desde el padre!');
 -->
<!-- eventBus.config.globalProperties.eventBus.$on('parentClick', () => {
  resetChart();
}); -->