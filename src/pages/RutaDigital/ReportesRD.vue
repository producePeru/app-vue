<template>
  <div class="reports">
    


    <a-row>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"><div class="wrapper-chart">
        <Radial /></div></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"><div class="wrapper-chart">
        <Bar /></div></a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"><div class="wrapper-chart">
        <Bar /></div></a-col>
    </a-row>




    

  </div>
</template>


<script setup>
import Bar from '@/components/charts/BarChart.vue'
import Radial from '@/components/charts/GaugeChart.vue'

</script>

<style lang="scss">
  .wrapper-chart {
    padding: 1.5rem 1.5rem 0 1.5rem;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    margin: .5rem;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
</style>