<template>

  <div>
    <h3>Formalizaciones</h3>
    <br>
    <a-row>
      <a-col :xs="12" :sm="12" :md="6" :lg="8" :xl="10">
        <div id="chart" class="pie-pie">
          <apexchart type="pie" height="290px" width="100%" :options="chartOptions" :series="series"></apexchart>
        </div>
      </a-col>
    </a-row>
  </div>










</template>

<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js'

const loading = ref(false);
const series = ref([]);
const chartOptions = {
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
  labels: ['Asesorías', 'Formalizaciones RUC 10', 'Formalizaciones RUC 20'],

};

const fetchData = async () => {
  loading.value = true;

  try {
    const data = await makeRequest({ url: `formalization/chart-pie`, method: 'GET' });
    series.value = data
    
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>






<!-- <template>
  <div>

    <iframe
      src="https://app.powerbi.com/view?r=eyJrIjoiNTBkNDY1OGUtMTdlZi00MjExLTg5YmEtODRiYThjOTAzZjc3IiwidCI6Ijc1MDRlMzE4LThlMWUtNGQ1NS1iZmZkLTg3NWI0ZGVlODI2MCIsImMiOjR9"
      frameborder="0" allowFullScreen="true">
    </iframe>

  </div>
</template>

<style>
iframe {
  display: block;
  border: none;
  height: 83vh;
  width: 100%;
}
</style> -->