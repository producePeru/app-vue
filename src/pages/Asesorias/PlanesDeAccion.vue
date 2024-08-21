<template>
  <div>
    <h3 class="title-produce">PLANES DE ACCIÓN</h3>

    <a-row style="margin: 1rem 0;">
      <a-col :xs="24" :md="12" :lg="18">
        <a-button @click="openDrawer = true" type="primary">NUEVO</a-button>
        <a-button class="btn-excel" :loading="loadingDownload" type="primary" style="margin-left: .6rem;"
          @click="handleDownloadExcel">
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

    <a-table 
    bordered 
    :scroll="{ x: valueX, y: valueY }" 
    class="table-actions" 
    :columns="columns"
    :data-source="dataSource" 
    :pagination="false" 
    :loading="loading" 
    size="small">
      
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex === 'ruc'">
          <span v-if="record.ruc">{{ record.ruc }}</span>
          <span v-else style="color: #1677ff;">En trámite</span>
        </template>


        <!-- <template v-if="column.dataIndex === 'component1'">
          <a-select style="width: 170px;" v-model:value="record.component_1" :options="store.components"
            :filter-option="filterOption" @change="(value) => handleSelectComponent(value, record, 'component_1')" />
        </template>

        <template v-if="column.dataIndex === 'component2'">
          <a-select style="width: 170px;" v-model:value="record.component_2" :options="store.components"
            :filter-option="filterOption" @change="(value) => handleSelectComponent(value, record, 'component_2')" />
        </template>

        <template v-if="column.dataIndex === 'component3'">
          <a-select style="width: 170px;" v-model:value="record.component_3" :options="store.components"
            :filter-option="filterOption" @change="(value) => handleSelectComponent(value, record, 'component_3')" />
        </template> -->

        <template v-if="column.dataIndex === 'acta'">
          <a-select v-model:value="record.actaCompromiso" style="width: 70%" :options="options"
            @change="(value) => handleSelectOption(value, record, 'actaCompromiso')" />
        </template>

        <template v-if="column.dataIndex === 'envioCorreo'">
          <a-select v-model:value="record.envioCorreo" style="width: 70%" :options="options"
            @change="(value) => handleSelectOption(value, record, 'envioCorreo')" />
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditIten(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDeleteItem(record)">
                    <template #icon><question-circle-outlined style="color: red" /></template>
                    <a>Eliminar</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>

      </template>
    </a-table>

    <div class="paginator">
      <span><a-tag color="blue"><b>{{ total }} </b></a-tag>Registros</span>
      <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator"
        :showSizeChanger="false" />
    </div>

    <a-drawer v-model:open="openDrawer" title="Agregar un nuevo Plan de Acción" placement="right" width="650">
      <NuevoPlanAccion @closeDraw="handleCloseDrawer" :info="updateItem" />
    </a-drawer>

  </div>

</template>



<script setup>
import { makeRequest } from '@/utils/api.js'
import NuevoPlanAccion from './components/NuevoPlanAccion.vue'
import { h, ref, onMounted, computed, reactive } from 'vue';
import { useCounterStore } from '@/stores/selectes.js';
import { message } from 'ant-design-vue';
import { downloadExcel } from '@/utils/downloadExcel';
import { MoreOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';

// import { MoreOutlined } from '@ant-design/icons-vue';
// import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
// import dayjs from 'dayjs';
// import 'dayjs/locale/es';
// dayjs.locale('es');

const storageRole = JSON.parse(localStorage.getItem('role'));
const store = useCounterStore();

store.$patch({ components: store.components });

store.fetchComponents();

const updateItem = ref(null);
const acta_compromiso = ref(null);
const loadingDownload = ref(false);
const mountData = ref();
const pageSize = ref(50);
const dataSource = ref([]);
const loading = ref(false);
const total = ref(0);
const params = ref({ page: 1 });
const url = ref('plans-action/list');
const valueX = ref(1200);
const valueY = ref(window.innerHeight - 100);
const openDrawer = ref(false);
const dataItem = ref(null);

const options = ref([
  { value: 'si', label: 'SI' },
  { value: 'no', label: 'NO' },
]);

const columns = [
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },

  ...(storageRole[0].id != 2 ? [{ title: 'CENTRO TU EMPRESA', dataIndex: 'centro_empresa', fixed: 'left', width: 150 }] : []),
  ...(storageRole[0].id != 2 ? [{ title: 'ASESOR', dataIndex: 'asesor', fixed: 'left', width: 180 }] : []),

  { title: 'RUC', dataIndex: 'ruc', width: 100, fixed: 'left', align: 'center' },
  { title: 'NOMBRE DEL EMPRENDEDOR O MYPE', fixed: 'left', dataIndex: 'emprendedor_nombres', width: 170 },
  { title: 'REGIÓN DEL EMPRENDEDOR O MYPE', dataIndex: 'emprendedor_region', width: 170 },
  { title: 'PROVINCIA DEL EMPRENDEDOR O MYPE', dataIndex: 'emprendedor_provincia', width: 170 },
  { title: 'DISTRITO DEL EMPRENDEDOR O MYPE', dataIndex: 'emprendedor_distrito', width: 170 },
  { title: 'Genero', dataIndex: 'genero', width: 60, align: 'center' },
  { title: 'Tiene alguna Discapacidad ? (SI / NO)', dataIndex: 'discapacidad', width: 110, align: 'center' },
  { title: 'COMPONENTE 1', dataIndex: 'component_1', width: 190, align: 'center' },
  { title: 'COMPONENTE 2', dataIndex: 'component_2', width: 190, align: 'center' },
  { title: 'COMPONENTE 3', dataIndex: 'component_3', width: 190, align: 'center' },
  { title: 'NÚMERO DE SESIONES', dataIndex: 'numberSessions', width: 100, align: 'center' },
  { title: 'DÍA INICIO', dataIndex: 'startDate', width: 100, align: 'center' },
  { title: 'DÍA FIN', dataIndex: 'endDate', width: 100, align: 'center' },
  { title: 'TOTAL DE DÍAS', dataIndex: 'totalDate', width: 100, align: 'center' },
  { title: 'ACTA DE COMPROMISO', dataIndex: 'acta', width: 160, align: 'center' },
  { title: 'CULMINÓ EL PLAN Y ENVIÓ CORREO', dataIndex: 'envioCorreo', width: 160, align: 'center' },
  { title: 'FECHA ACTUALIZACIÓN', dataIndex: 'updated_at', width: 140, align: 'center' },

  ...(storageRole[0].id != 2 ? [{ title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }] : []),
];

const handleDeleteItem = async(record) => {
  try {
    const data = await makeRequest({ url: `plans-action/delete/${record.id}`, method: 'DELETE' });
    if(data.status == 200) {
      message.success(data.message)
      fetchData()
    }
  } catch (error) {
    console.log("Failed to delete");
  }
}
const handleEditIten = (data) => {
  updateItem.value = data
  openDrawer.value = true;
}
const setLoading = (state) => {
  loadingDownload.value = state;
};
const handleDownloadExcel = async () => {
  const url = 'download/actions-plans';
  downloadExcel(url, setLoading);
}
const handleSelectComponent = async (value, record, component) => {
  const payload = {
    idPlan: record.id,
    nameComponent: component,
    valueComponent: value
  }
  const data = await makeRequest({ url: `plans-action/edit-component`, method: 'PUT', data: payload });
  if (data.status == 200) fetchData()
  if (data.status == 400) {
    message.warning(data.message)
    fetchData()
  }
}
const handleSelectOption = async (value, record, name) => {
  const payload = {
    idPlan: record.id,
    type: name,
    value: value
  }
  const data = await makeRequest({ url: `plans-action/edit-yes-no`, method: 'PUT', data: payload });
  if (data.status == 200) fetchData()
  if (data.status == 400) {
    message.warning(data.message)
    fetchData()
  }
}
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 315;
};
const handleEditItem = (item) => {
  openDrawer.value = true;
  dataItem.value = item;
}
const handleCloseDrawer = () => {
  updateItem.value = null;
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
    total.value = data.pagination.total;
    pageSize.value = data.pagination.per_page;
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

.table-actions {
  tr {
    font-size: 13px;
  }

  .ant-select-selection-item {
    font-size: 13px;
  }
}
</style>

<style lang="scss">
.table-actions {
  .ant-table-row {
    .ant-table-cell:nth-child(11),
    .ant-table-cell:nth-child(12),
    .ant-table-cell:nth-child(13) {
      // background-color: #f7f7f7 !important;
    }
  }
}

.ant-popconfirm-message {
  width: 180px;
}
</style>