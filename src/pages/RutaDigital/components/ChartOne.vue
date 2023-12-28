<template>
  <div class="report-box">
    <div class="title">
      <h4>Avance Anual</h4>
    </div>
    <apexchart type="bar" height="240" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
// import VueApexCharts from 'vue-apexcharts';

const chartOptions = {
  chart: {
    id: 'basic-bar',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1998, 1998, 1998, 1998],
  },
};

const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91, 23, 11, 33, 13],
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


