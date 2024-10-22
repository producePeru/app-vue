<template>
  <div>
    <h3 class="title-produce">FERIAS EMPRESARIALES</h3>

    <a-row style="margin: 1rem 0;">
      <a-col :xs="24" :md="12" :lg="18">
        <a-button type="primary" @click="handleNuevaFeria" style="margin-right: .5rem;">NUEVO</a-button>
        <!-- <a-button class="btn-excel" @click="handleDownload" :loading="loadingFile" type="primary">
          <img width="20" style="margin: -2px 0 0 0;" src="@/assets/img/icoexcel.png" /> 
        </a-button> -->
      </a-col>

      <a-col :xs="24" :md="12" :lg="6">
        <a-input-group compact>
          <a-input v-model:value="formState.search" style="width: calc(100% - 80px)" @input="handleResetSearch" />
          <a-button type="primary" :disabled="formState.search === ''" @click="handleSearchData">BUSCAR</a-button>
        </a-input-group>
      </a-col>
    </a-row>

    <a-table 
    bordered
    :scroll="{ x: valueX, y: valueY }" 
    class="table-agreements-ugse" 
    :columns="columns"
    :data-source="dataSource" 
    :pagination="false" 
    :loading="loading" 
    size="small">
  
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex == 'slug'">
          <router-link :to="`/feria/${record.slug}`" target="_blank"><CloudOutlined class="fair-link" /></router-link>
        </template>

        <template v-if="column.dataIndex == 'modality'">
          <a-tag color="blue" v-if="record.modality == 'p'">PRESENCIAL</a-tag>
          <a-tag color="orange" v-if="record.modality == 'v'">VIRTUAL</a-tag>
        </template>
        <template v-if="column.dataIndex == 'startDate'">
          {{ formatDate(record?.startDate) }}
        </template>
        <template v-if="column.dataIndex == 'endDate'">
          {{ formatDate(record?.endDate) }}
        </template>
        <template v-if="column.dataIndex == 'dateDiff'">
          {{ handleCountDays(record.startDate, record.endDate) }}
        </template>
        
        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleUpFile(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleUpFile(record)">Inscritos</a>
                </a-menu-item>
               
                
                <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDelete(record)">
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
  </div>

  <div class="paginator">
    <span><a-tag color="blue"><b>{{ total }} </b></a-tag>Ferias Empresariales</span>
    <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <!-- <pre>{{ dataSource }}</pre> -->

  <a-drawer v-model:open="drawFeria" title="Nueva Feria" placement="right" width="650" >
    <NuevaFeria />
  </a-drawer>


  <!-- <a-drawer v-model:open="open" root-class-name="root-class-name" title="Convenios" placement="right" width="650" >
    <NuevoConvenio :idConvenio="idConvenio" @closeDraw="handleCloseDrawopen(1)" />
  </a-drawer>

  <a-drawer v-model:open="openAcciones" title="Acciones" placement="right" width="550">
    <DrawAcciones :idConvenio="idConvenio" @closeDraw="handleCloseDrawopen(2)" @refreshTable="fetchData()" />
  </a-drawer>

  <a-drawer v-model:open="openDrives" title="Cargar Archivos" placement="right" width="550">
    <DrawFiles :idConvenio="idConvenio" @closeDraw="handleCloseDrawopen(3)" />
  </a-drawer>

  <a-drawer v-model:open="openObservations" title="Observaciones" placement="right" width="550">
    <DrawObservations :idConvenio="idConvenio" @closeDraw="handleCloseDrawopen(4)" @refreshTable="fetchData()" />
  </a-drawer> -->


</template>


<script setup>
import axios from 'axios';
import { ref, onMounted, h, onBeforeUnmount, computed, reactive } from 'vue';
import NuevaFeria from './components/NuevaFeria.vue';

import { CaretUpOutlined, CaretDownOutlined, QuestionCircleOutlined, CloudOutlined } from '@ant-design/icons-vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';

import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Link } from 'ant-design-vue/es/anchor';
dayjs.locale('es');

const storageData = JSON.parse(localStorage.getItem('profile'))
const store = useCounterStore();
const token = Cookies.get('token');
const props = defineProps(['idConvenio']);
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION;
const dev = import.meta.env.VITE_APP_API_URL_LOCAL;
const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? dev : prod;


const drawFeria = ref(false);


const denominationascdesc = ref(null);
const loadingFile = ref(false);
const idConvenio = ref(null);
const total = ref(0);
const pageSize = ref(50);
const params = ref({ page: 0 });
const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const open = ref(false);
const openAcciones = ref(false);
const openObservations = ref(false);
const openDrives = ref(false);
const openCompromisos = ref(false);
const updateValues = ref(null);
const city = ref(null);
const valueY = ref(window.innerHeight - 100);

const columns = [
  { title: '#',                   dataIndex: 'idx', fixed: 'left', align: 'center', width: 70 },
  { title: 'FERIA',               dataIndex: 'title', width: 200 },
  { title: 'LINK',                dataIndex: 'slug', width: 100, align: 'center' },
  // { title: 'DESCRIPCIÓN',          dataIndex: 'description', align: 'center', width: 180 },
  { title: 'META MYPES',          dataIndex: 'metaMypes', width: 120, align: 'center'},
  { title: 'META VENTAS',         dataIndex: 'metaSales', align: 'center', width: 180 },
  { title: 'FECHA DE INICIO',     dataIndex: 'startDate', align: 'center', width: 150 },
  { title: 'FECHA DE FIN',        dataIndex: 'endDate', align: 'center', width: 140 },
  { title: 'DÍAS RESTANTES',      dataIndex: 'dateDiff', align: 'center', width: 150 },
  { title: 'MODALIDAD',           dataIndex: 'modality', align: 'center', width: 140 },
  { title: 'REGIÓN',              dataIndex: 'city', width: 120 },
  { title: 'PROVINCIA',           dataIndex: 'province', width: 150 },
  { title: 'DISTRITO',            dataIndex: 'district', width: 150 },
  { title: 'CREADO POR',          dataIndex: 'profile', width: 170 },
  { title: '',                    dataIndex: 'actions', width: 60, align: 'center', fixed: 'right' }

];
const formState = reactive({
  search: '',
});

const handleNuevaFeria = () => {
  drawFeria.value = true;
}
const handleCountDays = (start, end) => {
  const diffDays = dayjs(end).diff(dayjs(start), 'days');
  return diffDays;
}


const handleSearchData = () => {
  let params = { search: formState.search }
  fetchData(params)
};
const handleResetSearch = () => {
  if(!formState.search) {
    fetchData();
  }
}
const handleEditSolicitante = (record) => {
  idConvenio.value = record;
  open.value = true;
}


const handleOpenObservations = (record) => {
  idConvenio.value = record;
  openObservations.value = true;
}
const handleAcciones = (record) => {
  idConvenio.value = record.id;
  openAcciones.value = true;
}
const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
}


const handleUpFile = (record) => {
  idConvenio.value = record.id;
  openDrives.value = true;
}

const handleCompromisos = (record) => {
  // idConvenio.value = record;
  // openCompromisos.value = true;
}

const dateTrafficLight = (end, start) => {
  const endDate = new Date(end);
  const currentDate = new Date();
  const differenceInTime =  endDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;
  return differenceInDays;
};

const colorPeriodo = (number) => {
  if (number <= 0) {
    return 'red'; // plomo
  } else if (number < 20) {
    return 'red';
  } else if (number < 40) {
    return '#f9e717';
  } else {
    return '#11d811';
  }
};

const handlePaginator = (current) => {
  params.value.page = current;
  fetchData()
}

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 320;
};

const showDrawer = () => {
  idConvenio.value = null;
  open.value = true;
};
const handleCloseDrawopen = (draw) => {
  fetchData();
  // draw == 1 && (open.value = false);

  if(draw == 1) {
    open.value = false;
    idConvenio.value = null;
  }

  draw == 2 && (openAcciones.value = false);
  draw == 4 && (openObservations.value = false);

  idConvenio.value = null;
}
const handleDelete = async (val) => {
  try {
    const data = await makeRequest({ url: `agreement/delete/${val.id}`, method: 'DELETE' });
    if (data.status == 200) {
      fetchData();
      message.success(data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const computeIndex = computed(() => (index) => {
  return  (params.value.page) * pageSize.value + index + 1;
});

const fetchData = async (val) => {
  try {
    loading.value = true;
    
    let parx;
    parx = params.value.page == 0 ? '' : params.value;
    parx = val? {...parx,...val } : parx;
   
    const {data} = await makeRequest({ url: `fair/list`, method: 'GET', params: parx });
    dataSource.value = data?.data
    total.value = data.total
    pageSize.value = data.per_page;
    // console.log("dataSourcexxxxx", data.data);
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const handleDownload = async () => {
  loadingFile.value = true;
  try {
    const response = await axios({
      url: `${apiUrl}agreement/download`,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    const name = 'convenios.xlsx';
    link.href = url;
    link.setAttribute('download', name); 
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  } finally {
    loadingFile.value = false;
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});
onMounted(() => {
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
  fetchData();
});
</script>

<style lang="scss">

.fair-link {
  font-size: 22px;
  cursor: pointer;
  // color: var(--primary);
  &:hover {
    color: var(--secondary);
  }
}

.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.filters {
  margin: .6rem 0 1rem 0;
}
.ico-acciones {
  font-size: 20px;
  color: var(--secondary);
  cursor: pointer;
}
.accion-total {
  display: flex;
  flex-direction: column;
  align-items: center;
  .accion-numb {
    margin-top: 4px;
    font-size: 10px;
  }
}
.table-agreements-ugse {
  tr {
    font-size: 13px;
  }
  
}

//**** 
.paginator {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
.ant-popover-inner {
  width: 200px;
}
.observation-icon {
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: var(--secondary);
  }
}

.table-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .t-icons {
    display: flex;
    flex-direction: column;
    opacity: .7;
    font-size: 11px;
    .ii {
      &:hover {
        color: var(--primary);
        cursor: pointer;
      }
    }
  }
}
</style>
