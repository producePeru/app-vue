<template>
  <div class="report-box">
    <div class="title">
      <h4>Avance mensual del año 2023</h4>
    </div>
    <apexchart type="bar" height="240" :options="chartOptions" :series="series" />
  </div>
  <!-- <pre>{{ total['2023'] }}</pre> -->
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['total'])

const year = ref('2023')

const chartOptions = {
  chart: {
    id: 'basic-bar',
    toolbar: {
      show: false, 
    },
  },
  xaxis: {
    categories: props.total[year.value].categories,
  },
};

const series = [
  {
    name: 'Cantidad',
    data: props.total[year.value].data,
  },
];
</script>

<style lang="scss">
.report-box {
  .title {
    padding: 1rem 1rem .5rem 1rem;
  }
}
</style>
