<template>
  <section>

    <h3>Convenios {{ includesRole([6]) ? 'UGO' : 'UGSE' }}</h3>

    <div class="chart-conv">
      <div>
        <span class="conv-title">Total de Convenios</span>
        <b><DiffOutlined /> {{ total }}</b>
      </div>
      
      <div class="conv-warning">
        <span class="conv-title">Convenios a revisar</span>
        <b><RetweetOutlined /> {{ menThree }}</b>
      </div>
      
      <div class="conv-end">
        <span class="conv-title">Convenios a vencer / vencidos</span>
        <span>
          <b>
            <ArrowDownOutlined /> {{ menOne }}
          </b>
        </span>
      </div>

    </div>

    <div style="width: 100%;">
      <canvas ref="myChart" :style="{ height: canvasHeight }"></canvas>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { makeRequest } from '@/utils/api.js';
import { DiffOutlined, ArrowDownOutlined, RetweetOutlined } from '@ant-design/icons-vue';
const storageRole = JSON.parse(localStorage.getItem('role')) || [];

const canvasHeight = ref('250px');
const myChart = ref(null);
const total = ref(null);
const menThree = ref(null);
const menOne = ref(null);

// Variables reactivas para los datos del gráfico
const totalData = ref([]);
const labels = ref([]);
const pointBackgroundColor = ref([]);
const pointBorderColor = ref([]);

function adjustCanvasHeight() {
  if (total.value > 10) {
    canvasHeight.value = '350px'; // UGO
  } else {
    canvasHeight.value = '250px'; // UGSE
  }
}

onMounted(() => {
  fetchData();
});

function renderChart() {
  const ctx = myChart.value.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.value,
      datasets: [{
        label: ' Días ',
        data: totalData.value,
        pointBackgroundColor: pointBackgroundColor.value, // Colores obtenidos de la API
        pointBorderColor: pointBorderColor.value, // Colores de borde
        pointBorderWidth: 2,
        pointRadius: 4, // Tamaño de los puntos
        pointHoverRadius: 8, // Tamaño al pasar el mouse
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
      scales: {
        x: {
          ticks: total.value > 10 ? { // Aplica rotación solo si total > 10
            maxRotation: 90, // Rotación máxima de las etiquetas
            minRotation: 90  // Rotación mínima para forzar el ángulo vertical
          } : {} // Sin rotación si total <= 10
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

const includesRole = (roleIds) => {
  return storageRole.some(role => roleIds.includes(role.id));
};

const fetchData = async () => {
  try {
    
    let entity = null;
    
    if(includesRole([6])) entity = 'ugo';
    if(includesRole([8,9])) entity = 'ugse';
    
    const data = await makeRequest({ url: `agreement/chart/${entity}`, method: 'GET' });

    total.value = data.total;
    menThree.value = data.menores_a_3_meses;
    menOne.value = data.menores_a_1_mes

    totalData.value = data.totalData;
    labels.value = data.labels;
    pointBackgroundColor.value = data.pointBackgroundColor;
    pointBorderColor.value = data.pointBackgroundColor;
    
    adjustCanvasHeight();
    renderChart();

  } catch (error) {
    console.error('Error de red:', error);
  }
}

</script>

<style lang="scss" scoped>
.chart-conv {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1rem 0 2rem 0;
  gap: 2rem;

  div {
    border: 1px solid #0505050f;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .conv-title {
      margin-bottom: 0;
      font-size: 14px;
    }

    b {
      font-weight: 400;
      font-size: 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    }
  }

  .conv-warning {
    background-color: #ffd557;
    color: #fff;
  }
  .conv-end {
    background-color: #ff5462;
    color: #fff;
  }

}
</style>