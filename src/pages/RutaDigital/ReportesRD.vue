<template>
  <div class="reports">

    <h3>Indicadores de Ruta Digital</h3>

    <br/>

    <a-row :gutter="16">
      <a-col class="years-report" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
        <div class="wrapper-chart">
          <div class="head-chars">
            <text class="title">Avance de MYPE registrados</text>
          </div>
          <Radial :meta="meta" :avance="avance" :porcentage="categoriesAvance" />
        </div>
      </a-col>
      
      <a-col class="years-report" :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
        <div class="wrapper-chart">
          <div class="head-chars">
            <text class="title">Avance Anual</text>
          </div>
          <Bar :categories="categoriesYear" :values="yearsData" :height="294" />
        </div>
      </a-col>
       
      <a-col class="years-report" :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
        <div class="wrapper-chart">
          <div class="head-chars">
            <text class="title">Avance mensual del año {{ yearMonth }}</text>
            <a-select ref="select" v-model:value="yearMonth" style="width: 80px" @change="handleChangeYear">
              <a-select-option value="2023">2023</a-select-option>
              <a-select-option value="2022">2022</a-select-option>
              <a-select-option value="2021">2021</a-select-option>
            </a-select>
          </div>
          <Bar :categories="categoriesMounth" :values="dataMonth" :height="280" />
        </div>
      </a-col>
    
      <a-col class="years-report" :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
        <div class="wrapper-chart">
          <div class="head-chars">
            <text class="title">Nivel digitalización del año {{ yearMonth }}</text>
            <a-select ref="select" v-model:value="yearMonth" style="width: 80px" @change="handleChangeYear">
              <a-select-option value="2023">2023</a-select-option>
              <a-select-option value="2022">2022</a-select-option>
              <a-select-option value="2021">2021</a-select-option>
            </a-select>
          </div>
          <BarColors :colors="colors" />
        </div>
      </a-col>

      <a-col class="years-report" :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
        <div class="wrapper-chart">
          <div class="head-chars">
            <text class="title">Nivel digitalización del año {{ yearMonth }}</text>
            <a-select ref="select" v-model:value="yearMonth" style="width: 80px" @change="handleChangeYear">
              <a-select-option value="2023">2023</a-select-option>
              <a-select-option value="2022">2022</a-select-option>
              <a-select-option value="2021">2021</a-select-option>
            </a-select>
          </div>
          <Pie />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js'
import Bar from '@/components/charts/BarChart.vue'
import Radial from '@/components/charts/GaugeChart.vue'
import Pie from '@/components/charts/PieChart.vue'
import BarColors from '@/components/charts/BarColorsChart.vue'

//radial_chart
const meta = 50000
const avance = ref(null)
const categoriesAvance = ref([])

const categoriesYear = ref([])	
const yearsData = ref([{
  name: "Avance anual",
  data: []
}]);

const yearMonth = ref('2023')
const categoriesMounth = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] 
const dataMonth = ref([{
  name: "Avance mensual",
  data: []
}]);

const colors = ['#ffe58f', '#1677ff', '#E46651']

const fetchDataMonth = async() => {
  try {
    const data = await makeRequest({ url: '/digital-route/report-months', method: 'GET' });
    
    const year = data.reports_years[yearMonth.value]
    const monthsOrder = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const series= monthsOrder.map(month => {
      const value = year[month];
      return value !== null ? value : 0;
    });
    dataMonth.value[0].data = series
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const handleChangeYear = () => {
  fetchDataMonth()
}

const fetchDataReports = async() => {
  try {
    const data = await makeRequest({ url: '/digital-route/reports', method: 'GET' });
    
    avance.value = data.total_mypes
    const mypes = data.total_mypes
    const meta = 50000
    const calculate = (mypes / meta) * 100
    categoriesAvance.value.push(Math.round(calculate * 100) / 100)

    // =================================================================

    const yearsTotal = data.count_years
    yearsTotal.map(item => {
      categoriesYear.value.push(item.anio)
    });
    yearsData.value[0].data = yearsTotal.map(item => item.total || 0);

    // =================================================================

  






  
  
  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(
  fetchDataMonth(),
  fetchDataReports()
);
</script>

<style lang="scss">
.years-report {
  padding: .5rem 1rem;
}
  .wrapper-chart {
    border: 1px solid #efefef;
    // height: 97%;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 6px 5px 12px #f0f0f0;
  }
  .head-chars {
    margin-bottom: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // position: absolute;
    .title {
      font-size: 15px;
      font-weight: 500;
      // padding-left: 1rem;
      // font-family: Helvetica, Arial, sans-serif;
      // text-anchor: middle;
      // dominant-baseline: auto;
      // font-size: 16px;
      // font-weight: 900;
      // fill: rgb(51, 51, 51);
    }
  }

  @media screen and (max-width: 1200px) {
    .years-report {
      // margin: 0 0;
    }
  }

</style>



