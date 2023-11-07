<template>
  <section>
    <h3>Indicadores de Ruta Digital</h3>

      <!-- https://echarts.apache.org/examples/en/index.html -->
    
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

        <section class="grid-box">
          <h3>Avance Anual</h3>
          <BarChart  hola="hoaoaooaoa" />
        </section>


        <!-- <section class="grid-box">
          <h3>Avance mensual del año 2023</h3>
          <BarChart />
        </section>
         -->
        
        
        
        
        
  

      </div>
      



  



  </section>
</template>

<script setup>
import { ref } from 'vue';
import GaugeChart from '../../components/charts/GaugeChart.vue';
import BarChart from '../../components/charts/BarChart.vue';



const dataByMounts = ref(
  [
    { name: 'Barrera 1', value: 20 },
    { name: 'Barrera 2', value: 35 },
    { name: 'Barrera 3', value: 15 },
  ]
);









</script>

















<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  .grid-box {
    border: 1px solid #0505050f;
    border-radius: 4px;
    padding: 1rem;
  }
  .mapa {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    
  }
}
</style>