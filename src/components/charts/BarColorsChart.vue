<template>
  <div id="chart">
    <apexchart type="bar" height="280" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  props:  {
    colors: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      series: [{
            data: [21, 22, 10]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar',
              
            },
            colors: this.colors,
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: [
                ['John', 'Doe'],
                ['Joe', 'Smith'],
                ['Jake', 'Williams'],
               
              ],
              labels: {
                style: {
                  // colors: this.colors,
                  fontSize: '12px'
                }
              }
            }
          },
    }
  }
}
</script>