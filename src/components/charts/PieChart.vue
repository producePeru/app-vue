<template>
  <div id="chart" class="pie-pie">
    <apexchart type="pie" width="450" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 450,
          type: 'pie',
          toolbar: {
            show: true, 
            tools: {
              download: true
            },
          }
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  }
}
</script>

<style >
.pie-pie .apexcharts-canvas {
  width: 100% !important;
  margin-top: 2rem !important;
}
</style>