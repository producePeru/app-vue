<template>
  <template v-if="props.info[0]?.ruc20.length >= 1">
    <a-table :columns="columns" :data-source="props.info[0]?.ruc20" bordered :pagination="false" size="small">
      <template #bodyCell="{ index, column, record }">
        <template v-if="column.dataIndex === 'idx'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.dataIndex === 'progress'">
          <div class="steps">
            <span style="text-align: right;">{{ record.step == 1 ? 'Reserva de nombre' : record.step == 2 ? 'Proceso de notaría' : 'Formalizado' }}</span>
            <a-space direction="vertical" style="width: 100%">
              <a-progress :percent="record.step * 33.33 " :steps="3" title="hi" />
            </a-space>
          </div>
        </template>
        <template v-if="column.dataIndex === 'sector'">
          <div>{{ sectors(record.sector) }}</div>
          <div>{{ record.category }}</div>
        </template>
      </template>
      <template #title><span class="as-title">Formalizacion RUC 20</span></template>
    </a-table>
  </template>

  <template v-if="props.info[0]?.ruc10.length >= 1">
    <a-table class="space" :columns="columns2" :data-source="props.info[0]?.ruc10" bordered :pagination="false" size="small">
      <template #bodyCell="{ index, column, record }">
        <template v-if="column.dataIndex === 'idx'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.dataIndex === 'detalle'">
          <span>{{ detalletramite(record.detail_procedure) }}</span>
        </template>
        <template v-if="column.dataIndex === 'sector'">
          <div>{{ sectors(record.economy_sector) }}</div>
          <div>{{ record.category }}</div>
        </template>
        <template v-if="column.dataIndex === 'modality'">
          <span>{{ record.modality == 1 ? 'Virtual' : 'Presencial' }}</span>
        </template>
      </template>
      <template #title><span class="as-title">Formalizacion RUC 10</span></template>
    </a-table>
  </template>
  
  <template v-if="props.info[0]?.adv.length >= 1">
    <a-table :columns="asesorias" :data-source="props.info[0]?.adv" bordered :pagination="false" size="small">
      <template #bodyCell="{ index, column, record }">
        <template v-if="column.dataIndex === 'idx'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.dataIndex === 'component'">
          <span>{{ findcomponents(record.component) }}</span>
        </template>
        <template v-if="column.dataIndex === 'modality'">
          <span>{{ record.modality == 1 ? 'Virtual' : 'Presencial' }}</span>
        </template>
      </template>
      <template #title><span class="as-title">Asesorías</span></template>
    </a-table>
  </template>

</template>

<script setup>
import { economicSectors, prodecure_detail, components } from '@/utils/selects.js';
const props = defineProps(['info']);

const columns = [
  {title: '#',dataIndex: 'idx'},
  {title: 'Fecha registro',dataIndex: 'date_start'},
  {title: 'Fecha última actualización',dataIndex: 'date_last'},
  {title: 'Proceso',dataIndex: 'progress'},
  {title: 'Sector económico',dataIndex: 'sector'},
  {title: 'Registrado por',dataIndex: 'asesor_create'},
  {title: 'Último asesor atendido',dataIndex: 'asesor_update'},
];

const columns2 = [
  {title: '#',dataIndex: 'idx'},
  {title: 'Fecha registro',dataIndex: 'date_start'},
  {title: 'Detalle del trámite',dataIndex: 'detalle'},
  {title: 'Sector económico',dataIndex: 'sector'},
  {title: 'Modalidad',dataIndex: 'modality', align: 'center'},
  {title: 'Registrado por',dataIndex: 'asesor_create'}
];

const asesorias = [
  {title: '#',dataIndex: 'idx'},
  {title: 'Fecha registro',dataIndex: 'date_start'},
  {title: 'Componente',dataIndex: 'component'},
  {title: 'Tema',dataIndex: 'tema_compoment'},
  {title: 'Modalidad',dataIndex: 'modality', align: 'center'},
  {title: 'Registrado por',dataIndex: 'asesor_create'}
];

const sectors = (id) => {
  return economicSectors.find(sector => sector.value === id).label;
};
const detalletramite = (id) => {
  return prodecure_detail.find(sector => sector.value === id).label;
};
const findcomponents = (id) => {
  return components.find(sector => sector.value === id).label;
};
</script>

<style lang="scss" scoped>
.space {
  margin: 2rem 0;
}
</style>

<style>
.steps .ant-progress-text {
  display: none !important;
}
.as-title {
  color: #1677ff;
  font-weight: 500;
}
</style>