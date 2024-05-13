<template>
  <div style="width: 100%;">
    <canvas ref="myChart" style="height: 250px;"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['total']);
const myChart = ref(null);

onMounted(() => {
  if (props.total) {
    renderChart(props.total);
  }
});

watch(() => props.total, (newValue) => {
  if (newValue) {
    renderChart(newValue);
  }
});


function renderChart(totalData) {
  const ctx = myChart.value.getContext('2d');

  new Chart(ctx, {
    type: 'bar', 
    data: {
      labels: ['Asesorías', 'Formalización RUC 10', 'Formalización RUC 20'],
      datasets: [{
        label: 'Registrados',
        data: totalData,
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false 
        }
      },
      maintainAspectRatio: false, 
      responsive: true,
    }
  });
};
</script>
