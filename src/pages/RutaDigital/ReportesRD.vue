<template>
  <section>
    <h3>Indicadores de Ruta Digital</h3>


    
      <div class="grid">
        <section class="grid-box">
          <h3>Avance de MYPE registrados</h3>
          <GaugeChart />
          <div class="mapa">
            <div>
              <span>Meta al 2024</span>
              <h4>5000</h4>
            </div>
            <div>
              <span>Meta al 2024</span>
              <h4>5000</h4>
            </div>
            <div>
              <span>Meta al 2024</span>
              <h4>5000</h4>
            </div>
          </div>
        </section>
        
        
        
        
        
        
        
        
        
        
        
        
        
        <!-- <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart />
        <GaugeChart /> -->

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
  .grid-box {
    border: 1px solid red;
  }
  .mapa {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>