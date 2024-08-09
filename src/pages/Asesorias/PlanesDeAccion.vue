<template>
  <div>
    <h3 class="title-produce">PLANES DE ACCIÓN</h3>

    <a-row style="margin: 1rem 0;">
      <a-col :xs="24" :md="12" :lg="18">
        <span @click="openDrawer = true">Agregar</span>
        <a-date-picker :locale="locale" v-model:value="mountData" picker="month" placeholder="Seleccionar mes" />
        <a-button v-if="mountData" class="btn-excel" :loading="loadingDownload" type="primary" style="margin-left: .6rem;">
            <img width="20" style="margin: -2px 4px 0 0;" src="@/assets/img/icoexcel.png" /> DESCARGAR
          </a-button>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-group compact>
          <a-input v-model:value="formState.search" style="width: calc(100% - 80px)" @input="handleResetSearch" />
          <a-button type="primary" :disabled="formState.search === ''" @click="handleSearch">BUSCAR</a-button>
        </a-input-group>
      </a-col>
    </a-row>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" class="table-users" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex === 'tuempresa'">
          cde Miraflores
        </template>

        <template v-if="column.dataIndex === 'acta_compromiso'">
          <a-select
          :size="small"
          v-model:value="acta_compromiso"
          placeholder="Seleccionar"
          style="width: 70%"
          :options="options"
          @change="handleChange" />
        </template>

        <template v-if="column.dataIndex === 'envio_correo'">
          <a-select
          :size="small"
          v-model:value="acta_compromiso"
          placeholder="Seleccionar"
          style="width: 70%"
          :options="options"
          @change="handleChange" />
        </template>



      </template>
    </a-table>

    <div class="paginator">
      <span><a-tag color="blue"><b>{{ total }} </b></a-tag>Registros</span>
      <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator"
        :showSizeChanger="false" />
    </div>

    <a-drawer v-model:open="openDrawer" title="Agregar un nuevo Plan de Acción" placement="right" width="650" >
      <NuevoPlanAccion @closeDraw="handleCloseDrawopen(1)" />
    </a-drawer>

  </div>

</template>



<script setup>
import { makeRequest } from '@/utils/api.js'
import { h, ref, onMounted, computed, reactive } from 'vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import NuevoPlanAccion from './components/NuevoPlanAccion.vue'

const acta_compromiso = ref(null);
const loadingDownload = ref(false);
const mountData = ref();
const pageSize = ref(50);
const dataSource = ref([]);
const loading = ref(false);
const total = ref(0);
const params = ref({ page: 1 });
const url = ref('user/list-asesories');
const valueX = ref(1200);
const valueY = ref(window.innerHeight - 100);
const openDrawer = ref(false);
const dataItem = ref(null);

const options = ref([
  {value: 'si', label: 'Si'},
  {value: 'no', label: 'No'},
]);

const columns = [
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'CENTRO TU EMPRESA', dataIndex: 'tuempresa', width: 120 },
  { title: 'ASESOR', dataIndex: 'lastname', width: 180 },
  { title: 'REGION DEL EMPRENDEDOR O MYPE', dataIndex: 'lastname', width: 170},
  { title: 'PROVINCIA DEL EMPRENDEDOR O MYPE', dataIndex: 'lastname', width: 170 },
  { title: 'DISTRITO DEL EMPRENDEDOR O MYPE', dataIndex: 'lastname', width: 170 },
  { title: 'NOMBRE DEL EMPRENDEDOR O MYPE', dataIndex: 'lastname', width: 170 },
  { title: 'RUC', dataIndex: 'lastname', width: 100, align: 'center' },
  { title: 'Genero', dataIndex: 'lastname', width: 80, align: 'center' },
  { title: 'Tiene alguna Discapacidad ? (SI / NO)', dataIndex: 'lastname', width: 120, align: 'center' },
  { title: 'COMPONENTE 1', dataIndex: 'lastname', width: 180},
  { title: 'COMPONENTE 2', dataIndex: 'lastname', width: 180},
  { title: 'COMPONENTE 3', dataIndex: 'lastname', width: 180},
  { title: 'NÚMERO DE SESIONES REALIZADAS', dataIndex: 'lastname', width: 180},
  { title: 'DÍA INICIO', dataIndex: 'lastname', width: 120, align: 'center'},
  { title: 'DÍA FIN', dataIndex: 'lastname', width: 120, align: 'center'},
  { title: 'TOTAL DE DÍAS', dataIndex: 'lastname', width: 120},
  { title: 'ACTA DE COMPROMISO', dataIndex: 'acta_compromiso', width: 180, align: 'center'},
  { title: 'CULMINÓ EL PLAN DE ACCIÓN Y ENVIÓ CORREO', dataIndex: 'envio_correo', width: 180, align: 'center'},

  // { title: '', dataIndex: 'actions', align: 'center', width: 50, fixed: 'right' }
];

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 315;
};
const handleEditItem = (item) => {
  openDrawer.value = true;
  dataItem.value = item;
}
const handleCloseDrawer = () => {
  openDrawer.value = false;
  fetchData();
}
const formState = reactive({
  search: '',
});

const handleSearch = () => {
  fetchData({ search: formState.search });
};

const handleResetSearch = () => {
  if (!formState.search) {
    fetchData();
  }
};

const handlePaginator = (current) => {
  params.value.page = current;
  fetchData();
};

const fetchData = async (val) => {
  try {
    loading.value = true;
    const parx = params.value.page === 1 ? '' : params.value;
    const finalParams = val ? { ...parx, ...val } : parx;
    const data = await makeRequest({ url: url.value, method: 'GET', params: finalParams });
    dataSource.value = data.data;
    total.value = data.total;
    pageSize.value = data.per_page;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
};

const computeIndex = computed(() => (index) => {
  return (params.value.page - 1) * pageSize.value + index + 1;
});

onMounted(() => {
  fetchData();
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
});
</script>

<style lang="scss">
.paginator {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
.table-users {
  tr {
    font-size: 13px;
  }
}
</style>