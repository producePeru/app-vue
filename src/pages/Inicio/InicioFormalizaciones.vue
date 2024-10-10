<template>
  <section class="formalization-home ">

    <a-flex justify="space-between" align="center">
      <h1 class="title-produce">REPORTE DE FORMALIZACIONES Y ASESORÍAS</h1>
      <a-button type="primary" @click="fetchData">
        VER REPORTE
      </a-button>
    </a-flex>

    <br>

    <a-spin :spinning="spinning">
      <a-row :gutter="[16, 16]" v-if="asesories.length >= 1">
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="box-chart">
            <a-statistic title="Asesorías" :value="chart.totalasesories" style="margin-right: 50px" />
            <LineChart v-if="asesories.length > 1" :total="chart.asesories" color="#fff5df" />
          </div>
        </a-col>

        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="box-chart">
            <a-statistic title="Formalizaciones RUC 10" :value="chart.totalFormalization10"
              style="margin-right: 50px" />
            <LineChart v-if="formalization10.length > 1" :total="chart.formalization10" color="#ffe1e7" />
          </div>
        </a-col>

        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="box-chart">
            <a-statistic title="Formalizaciones RUC 20" :value="chart.totalFormalization20"
              style="margin-right: 50px" />
            <LineChart v-if="formalization20.length > 1" :total="chart.formalization20" color="#def3f2" />
          </div>
        </a-col>


        <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <div class="box-chart">
            <div class="chart-filter-date">
              <a-range-picker :locale="locale" v-model:value="dateSeleccionated" />
              <a-button type="primary" @click="handleFilterByDate">Buscar</a-button>
            </div>
            <BarChart v-if="bar.length > 1" :total="bar" />
          </div>
        </a-col>
        <!-- <pre>{{ chart }}</pre> -->
      </a-row>
    </a-spin>
  </section>
</template>

<script setup>
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import { ref, onMounted } from 'vue';
import LineChart from '../Graficos/Formalizaciones/LineChart.vue';
import BarChart from '../Graficos/Formalizaciones/BarChart.vue';
import { makeRequest } from '@/utils/api.js';

const spinning = ref(false);
const dateSeleccionated = ref();
const chart = ref([]);
const asesories = ref([]);
const formalization10 = ref([]);
const formalization20 = ref([]);
const bar = ref([]);

const handleFilterByDate = async () => {
  asesories.value = [];
  formalization10.value = [];
  formalization20.value = [];
  bar.value = [];
  spinning.value = true;
  try {
    const values = {
      ...(dateSeleccionated.value && { dateStart: dayjs(dateSeleccionated.value[0]).format('YYYY-MM-DD') }),
      ...(dateSeleccionated.value && { dateEnd: dayjs(dateSeleccionated.value[1]).format('YYYY-MM-DD') }),
    };

    const data = await makeRequest({
      url: `formalization/chart`,
      method: 'GET',
      params: values,
    });

    if (data) {
      chart.value = data;
      asesories.value = [...data.asesories];
      formalization10.value = [...data.formalization10];
      formalization20.value = [...data.formalization20];
      bar.value = [...data.bar];
    }

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false;
  }
};

const fetchData = async () => {
  spinning.value = true;
  try {
    const data = await makeRequest({ url: `formalization/chart`, method: 'GET' });

    if (data) {
      chart.value = data;
      asesories.value = [...data.asesories];
      formalization10.value = [...data.formalization10];
      formalization20.value = [...data.formalization20];
      bar.value = [...data.bar];
    }

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false;
  }
}

onMounted(() => {
  // fetchData();
});
</script>

<style lang="scss">
.formalization-home {
  h1 {
    // margin-bottom: 1rem;
  }
}

.box-chart {
  border: 1px solid #0505050f;
  padding: 1rem;
  border-radius: 8px;
}

.chart-filter-date {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>