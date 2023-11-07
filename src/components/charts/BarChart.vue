<template>
  <div ref="chart" class="chart"></div>

  <!-- <pre>{{ props.message }}</pre> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);

const initChart = () => {
const echartsInstance = echarts.init(chart.value);

const barrierData = [
  { name: 'Barrera 1', value: 200 },
  { name: 'Barrera 2', value: 35 },
  { name: 'Barrera 3', value: 15 },
];

const props = defineProps(['hola'])

console.log(props.hola)


// const props = defineProps({
//   barrierData: {
//     type: Array,
//     required: true // Esta propiedad es requerida
//   }
// });

// const props = defineProps({

//   barrierData: {
//     type: Array
//   },

// })

  const option = {
    // title: {
    //   text: 'Modelo de Barreras'
    // },
    xAxis: {
      type: 'category',
      data: barrierData.map(item => item.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: barrierData.map(item => item.value),
      type: 'bar'
    }]
  };

  echartsInstance.setOption(option);
  return echartsInstance;
};

onMounted(() => {
  initChart();
});
</script>

<style scoped>
.chart {
  height: 300px;
  /* border: 1px solid red; */
}
</style>