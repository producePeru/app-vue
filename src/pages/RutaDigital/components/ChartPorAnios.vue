<template>
  <div class="report-box">
    <div class="title">
      <h4>Avance Anual</h4>
    </div>
    <apexchart type="bar" height="240" :options="chartOptions" :series="series" />
  </div>

</template>

<script setup>
const props = defineProps(['total'])
const chartOptions = {
  chart: {
    id: 'basic-bar',
    toolbar: {
      show: false, 
    },
  },
  xaxis: {
    categories: props.total.categories,
  },
};

const series = [
  {
    name: 'Cantidad',
    data: props.total.data,
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