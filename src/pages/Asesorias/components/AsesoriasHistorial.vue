<template>
  <a-tabs v-model:activeKey="activeKey" type="card" class="box-hist">

    <a-tab-pane key="1" tab="ASESORÍAS">
      <a-card>
        <a-empty v-if="props.info?.idadvisory.length == 0" />
        <template v-if="props.info?.idadvisory.length >= 1">
          <a-table :columns="asesorias" :data-source="props.info?.idadvisory" bordered :pagination="false" size="small">
            <template #bodyCell="{ index, column, record }">
              <template v-if="column.dataIndex === 'idx'">
                <span>{{ index + 1 }}</span>
              </template>

              <template v-if="column.dataIndex === 'date_start'">
                {{ formatDate(record.created_at) }}
              </template>
              <template v-if="column.dataIndex === 'component'">
                {{ record.component?.name }}
              </template>
              <template v-if="column.dataIndex === 'tema_compoment'">
                {{ record.theme?.name }}
              </template>
              <template v-if="column.dataIndex === 'modality'">
                {{ record.modality?.name }}
              </template>
              <!-- <template v-if="column.dataIndex === 'asesor_create'">
                {{ record.user.profile?.name }} {{ record.user.profile?.lastname }} {{ record.user.profile?.middlename }} 
              </template> -->
             
            </template>
          </a-table>
        </template>
      </a-card>
    </a-tab-pane>

    <a-tab-pane key="2" tab="RUC 20">
      <a-card>
        <a-empty v-if="props.info.idformalization20.length == 0" />
        <template v-if="props.info.idformalization20.length >= 1">
          <a-table :columns="columns" :data-source="props.info.idformalization20" bordered :pagination="false" size="small">
            <template #bodyCell="{ index, column, record }">
              <template v-if="column.dataIndex === 'idx'">
                <span>{{ index + 1 }}</span>
              </template>
              
              <template v-if="column.dataIndex === 'date_start'">
                {{ formatDate(record.created_at) }}
              </template>
              <template v-if="column.dataIndex === 'date_last'">
                {{ record.updated_at }}
              </template>
              <template v-if="column.dataIndex === 'sector'">
                {{ record.economicsector?.name }}
              </template>
              <template v-if="column.dataIndex === 'progress'">
                <div class="steps">
                  <span style="text-align: right;">{{ record.task == 1 ? 'Reserva de nombre' : record.task == 2 ? 'Proceso de notaría' : 'Formalizado' }}</span>
                  <a-space direction="vertical" style="width: 100%">
                    <a-progress :percent="record.task * 33.33 " :steps="3" />
                  </a-space>
                </div>
              </template>
              <!-- <template v-if="column.dataIndex === 'asesor_create'">
                {{ record.user?.profile.name }} {{ record.user?.profile.lastname }} {{ record.user?.profile.middlename }} 
              </template> -->
              <template v-if="column.dataIndex === 'asesor_update'">
                {{ record.user.profile?.name }} {{ record.userupdater?.profile.lastname }} {{ record.user?.profile.middlename }} 
              </template>
            </template>
          </a-table>
        </template>
      </a-card>
    </a-tab-pane>

    <a-tab-pane key="3" tab="RUC 10">
      <a-card>
        <a-empty v-if="props.info.idformalization10.length == 0" />
        <template v-if="props.info.idformalization10.length >= 1">
          <a-table :columns="columns2" :data-source="props.info.idformalization10" bordered :pagination="false" size="small">
            <template #bodyCell="{ index, column, record }">
              <template v-if="column.dataIndex === 'idx'">
                <span>{{ index + 1 }}</span>
              </template>
              <template v-if="column.dataIndex === 'date_start'">
                {{ formatDate(record.created_at) }}
              </template>
              <template v-if="column.dataIndex === 'component'">
                {{ record.detailprocedure?.name }}
              </template>
              <template v-if="column.dataIndex === 'sector'">
                {{ record.economicsector?.name }}
              </template>
              <template v-if="column.dataIndex === 'modality'">
                {{ record.modality?.name }}
              </template>
              <!-- <template v-if="column.dataIndex === 'asesor_create'">
                {{ record.user?.profile.name }} {{ record.user?.profile.lastname }} {{ record.user?.profile.middlename }} 
              </template> -->
            </template>
          </a-table>
        </template>
      </a-card>
    </a-tab-pane>

  </a-tabs>

</template>

<script setup>
import { ref } from 'vue';
import moment from 'moment';

const props = defineProps(['info']);

const activeKey = ref('1');
// ruc20
const columns = [
  { title: '#', dataIndex: 'idx' },
  { title: 'Fecha registro', dataIndex: 'date_start', width: 160 },
  { title: 'Fecha última actualización', dataIndex: 'date_last', width: 160 },
  { title: 'Proceso', dataIndex: 'progress' },
  { title: 'Sector económico', dataIndex: 'sector' },
  // { title: 'Registrado por', dataIndex: 'asesor_create' },
  // { title: 'Último asesor atendido', dataIndex: 'asesor_update' },
];

// ruc10
const columns2 = [
  { title: '#', dataIndex: 'idx' },
  { title: 'Fecha registro', dataIndex: 'date_start' },
  { title: 'Detalle del trámite', dataIndex: 'component' },
  { title: 'Sector económico', dataIndex: 'sector' },
  { title: 'Modalidad', dataIndex: 'modality', align: 'center' },
  // { title: 'Registrado por', dataIndex: 'asesor_create' }
];

const asesorias = [
  { title: '#', dataIndex: 'idx' },
  { title: 'Fecha registro', dataIndex: 'date_start' },
  { title: 'Componente', dataIndex: 'component' },
  { title: 'Tema', dataIndex: 'tema_compoment' },
  { title: 'Modalidad', dataIndex: 'modality', align: 'center' },
  // { title: 'Registrado por', dataIndex: 'asesor_create' }
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