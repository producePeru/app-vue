<template>
  <section>
    <h3>Indicadores de Ruta Digital</h3>


    
      <div class="grid">
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />

      </div>
      



  



  </section>
</template>

<script setup>
import GaugeChart from '../../components/charts/GaugeChart.vue';
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>