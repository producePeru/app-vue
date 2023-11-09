<template>
  <div class="reports">
    


    <a-row>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"><div class="wrapper-chart">
        <Radial /></div></a-col>
      
        <!-- meses -->
        <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"><div class="wrapper-chart">
          <Bar :categories="categoriesMounth" :values="dataMonth" />
        </div></a-col>
      
      
        <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"><div class="wrapper-chart">
          <!-- <Bar /> -->
        </div></a-col>
    </a-row>

    
    <pre>{{ dataMonth }}</pre>


    

  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js'
import Bar from '@/components/charts/BarChart.vue'
import Radial from '@/components/charts/GaugeChart.vue'
import { object } from 'vue-types';


const categoriesMounth = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] 
const dataMonth = ref(null);



const fetchData = async() => {
  try {
    const data = await makeRequest({ url: '/digital-route/reports', method: 'GET' });
    
    const year = data.reports_years['2021']
    const monthsOrder = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    
    const series= monthsOrder.map(month => {
      const value = year[month];
      return value !== null ? value : 0;
    });


    dataMonth.value = [
      {
        name: "series-1",
        data: series
      }
    ]







// console.log(sortedValues);




  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(
  fetchData
);
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