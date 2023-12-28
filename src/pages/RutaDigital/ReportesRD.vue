<template>
  <h3>TALLERES DE RUTA DIGITAL</h3>
  <br>
  <div class="reports">
    
    
    <div class="wrapper">
      <div v-if="!totalMYPE" class="skeleton-charging">
        <a-skeleton active :paragraph="{ rows: 6 }" />
      </div>
      <ChartMeta v-else :total="totalMYPE" />
    </div>

    <div class="wrapper">
      <div v-if="!totalYears" class="skeleton-charging">
        <a-skeleton active :paragraph="{ rows: 6 }" />
      </div>
      <ChartPorAnio v-else :total="totalYears" />
    </div>

    <div class="wrapper">
      <div v-if="!totalMonths" class="skeleton-charging">
        <a-skeleton active :paragraph="{ rows: 6 }" />
      </div>
      <CharAvanceMensual v-else :total="totalMonths" />
    </div>

    <!-- <div class="wrapper">
      <BarChart />
    </div> -->

<!-- 
    <div class="wrapper">
      <BarChart />
    </div> -->


   



    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { makeRequest } from '@/utils/api.js'

import ChartMeta from "./components/ChartMeta.vue"
import ChartPorAnio from "./components/ChartPorAnios.vue"
import CharAvanceMensual from "./components/ChartAvanceMensual.vue"

import BarChart from "./components/ChartOne.vue"

const totalMYPE = ref(null)
const totalYears = ref(null)
const totalMonths = ref(null)



const fetchData = async() => {
  try {
    
    const totalMypes = await makeRequest({ url: '/mype-registered', method: 'GET' });
    totalMYPE.value = totalMypes.data

    const dataByYears = await makeRequest({ url: '/mype-anual-progress', method: 'GET' });
    totalYears.value = dataByYears

    const dataByMonth = await makeRequest({ url: '/mype-month-progress', method: 'GET' });
    totalMonths.value = dataByMonth

    
  } catch (error) {
    console.error('Error de red:', error);
  } 
}

onMounted(
  fetchData
);
</script>

<style lang="scss" scoped>
.skeleton-charging {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1rem;
}
.reports {
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-gap: 2% 1%;
  width: 99%;
  .wrapper {
    border: 1px solid #ccc;
    border-radius: 4px;
    // height: auto;
    // overflow: auto;
    &-div {
      // padding-top: 1rem;
    }
  }
}
</style>