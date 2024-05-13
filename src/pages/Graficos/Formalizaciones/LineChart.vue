<template>
  <div style="border-bottom: 1px solid #0505052d; width: 100%;">
    <canvas ref="myChart" style="height: 80px;"></canvas>
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
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Registrados',
        data: totalData,
        borderWidth: 1,
        fill: true,
        // backgroundColor: '#3aa0ff', 
        // borderColor: '#3aa0ff', 
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
      scales: {
        x: {
          ticks: {
            display: false 
          },
          grid: {
            display: false 
          },
        },
        y: {
          beginAtZero: true,
          display: false, 
          ticks: {
            display: false 
          },
          grid: {
            display: false 
          },
        }
      }
    }
  });
}
</script>