<template>

  <a-tabs v-model:activeKey="activeKey" type="card" class="box-hist">

    <a-tab-pane key="1" tab="ASESORÍAS">
      <a-card>
        <a-table :columns="asesorias" :data-source="props.totaladvisories" bordered :pagination="false" size="small"
          :scroll="{ x: 1600 }" :expand-column-width="100">
          <template #bodyCell="{ index, column, record }">
            <template v-if="column.dataIndex === 'idx'">
              <span>{{ index + 1 }}</span>
            </template>
            <template v-if="column.dataIndex === 'date_start'">
              {{ formatDate(record.createDate) }}
            </template>
          </template>
        </a-table>
      </a-card>
    </a-tab-pane>

    <a-tab-pane key="2" tab="RUC 10">
      <a-card>
        <a-table :columns="formalization10" :data-source="props.totalformalization10" bordered :pagination="false" size="small"
          :scroll="{ x: 1800 }" :expand-column-width="100">
          <template #bodyCell="{ index, column, record }">
            <template v-if="column.dataIndex === 'idx'">
              <span>{{ index + 1 }}</span>
            </template>
            <template v-if="column.dataIndex === 'date_start'">
              {{ formatDate(record.createDate) }}
            </template>
          </template>
        </a-table>
      </a-card>
    </a-tab-pane>

    <a-tab-pane key="3" tab="RUC 20">
      <a-card>
        <a-table :columns="formalization20" :data-source="props.totalformalization20" bordered :pagination="false" size="small"
          :scroll="{ x: 2200 }" :expand-column-width="100">
          <template #bodyCell="{ index, column, record }">
            <template v-if="column.dataIndex === 'idx'">
              <span>{{ index + 1 }}</span>
            </template>
            <template v-if="column.dataIndex === 'date_start'">
              {{ formatDate(record.createDate) }}
            </template>
          </template>
        </a-table>
      </a-card>
    </a-tab-pane>
  </a-tabs>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import moment from 'moment';

const props = defineProps(['totaladvisories', 'totalformalization10', 'totalformalization20']);

const activeKey = ref('1');

const asesorias = [
  { title: '#', dataIndex: 'idx', width: 50, align: 'center' },
  { title: 'Fecha registro', dataIndex: 'date_start', width: 40 },
  { title: 'Asesor', dataIndex: 'asesor', width: 100 },
  { title: 'Componente', dataIndex: 'component', width: 100 },
  { title: 'Tema', dataIndex: 'theme', width: 100 },
  { title: 'Modalidad', dataIndex: 'modality', align: 'center', width: 100 },
  { title: 'Ciudad', dataIndex: 'city', width: 40 },
  { title: 'Provincia', dataIndex: 'province', width: 40 },
  { title: 'Distrito', dataIndex: 'district', width: 40 },
];


const formalization10 = [
  { title: '#', dataIndex: 'idx', width: 50, align: 'center' },
  { title: 'Fecha registro', dataIndex: 'date_start', width: 40 },
  { title: 'Asesor', dataIndex: 'asesor', width: 100 },
  { title: 'Detalle del trámite', dataIndex: 'detailprocedure', width: 100 },
  { title: 'Sector económico', dataIndex: 'economicsector', width: 100 },
  { title: 'Actividad comercial', dataIndex: 'comercialactivity', width: 100 },
  { title: 'Modalidad', dataIndex: 'modality', align: 'center', width: 100 },
  { title: 'Ciudad', dataIndex: 'city', width: 40 },
  { title: 'Provincia', dataIndex: 'province', width: 40 },
  { title: 'Distrito', dataIndex: 'district', width: 40 }
];

// ruc10
const formalization20 = [
{ title: '#', dataIndex: 'idx', width: 50, align: 'center' },
  { title: 'Fecha registro', dataIndex: 'date_start', width: 140 },
  { title: 'Asesor', dataIndex: 'asesor', width: 180 },
  // { title: 'Paso', dataIndex: 'task', width: 50 },
  { title: 'Código SUNARP', dataIndex: 'codesunarp', width: 100 },
  { title: 'Sector económico', dataIndex: 'economicsector', width: 100 },
  { title: 'Actividad comercial', dataIndex: 'comercialactivity', width: 100 },
  { title: 'Notaría', dataIndex: 'numbernotary', width: 100 },
  { title: 'Régimen', dataIndex: 'regime', width: 80, align: 'center' },
  { title: 'MYPE', dataIndex: 'mypename', width: 240 },
  { title: 'MYPE RUC', dataIndex: 'myperuc', width: 80 },
  { title: 'Modalidad', dataIndex: 'modality', align: 'center', width: 70 },
  { title: 'Ciudad', dataIndex: 'city', width: 30 },
  { title: 'Provincia', dataIndex: 'province', width: 30 },
  { title: 'Distrito', dataIndex: 'district', width: 30 },
  { title: 'Dirección', dataIndex: 'address', width: 240 },
];



const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY HH:mm A');
}
</script>

<style lang="scss" scoped>
.space {
  margin: 2rem 0;
}

.box-tabs {
  position: relative;
  top: -17px;
  border-radius: 0 0 8px 8px;
}
</style>

<style>
.box-hist {
  .ant-card {
    position: relative;
    top: -17px;
    border-radius: 0 0 8px 8px;
  }

  .ant-tabs-nav-wrap {
    z-index: 99;
  }
}

.steps .ant-progress-text {
  display: none !important;
}
</style>