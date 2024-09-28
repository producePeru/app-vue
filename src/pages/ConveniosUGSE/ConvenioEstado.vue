<template>
  <div>
    <h3 class="title-produce">CONVENIOS UGSE</h3>

    <a-row style="margin: 1rem 0;">
      <a-col :xs="24" :md="12" :lg="18">
        <a-button type="primary" @click="showDrawer" style="margin-right: .5rem;">NUEVO</a-button>
        <a-button class="btn-excel" @click="handleDownload" :loading="loadingFile" type="primary">
          <img width="20" style="margin: -2px 0 0 0;" src="@/assets/img/icoexcel.png" /> 
        </a-button>
      </a-col>

      <a-col :xs="24" :md="12" :lg="6">
        <a-input-group compact>
          <a-input v-model:value="formState.search" style="width: calc(100% - 80px)" @input="handleResetSearch" />
          <a-button type="primary" :disabled="formState.search === ''" @click="handleFinish">BUSCAR</a-button>
        </a-input-group>
      </a-col>
    </a-row>

    <a-table 
    bordered
    :scroll="{ x: valueX, y: valueY }" 
    class="table-agreements" 
    :columns="columns"
    :data-source="dataSource" 
    :pagination="false" 
    :loading="loading" 
    size="small">
      <template #headerCell="{ column }">
        <!-- <template v-if="column.dataIndex == 'city'">
          <div class="table-head">
            <span>REGIÓN</span>
            <div class="t-icons">
              <CaretUpOutlined :class="{'arrActive' : rowascdesc == 'asc'}" class="ii" @click="handleSelectOrder('asc')" />
              <CaretDownOutlined :class="{'arrActive' : rowascdesc == 'desc'}" class="ii" @click="handleSelectOrder('desc')" />
            </div>
          </div>
        </template> -->

        <!-- <template v-if="column.dataIndex == 'denomination'">
          <div class="table-head">
            <span>DENOMINACIÓN</span>
            <div class="t-icons">
              <CaretUpOutlined :class="{'arrActive' : denominationascdesc == 'asc'}" class="ii" @click="handleSelectDenomination('asc')" />
              <CaretDownOutlined :class="{'arrActive' : denominationascdesc == 'desc'}" class="ii" @click="handleSelectDenomination('desc')" />
            </div>
          </div>
        </template> -->
      </template>

      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex == 'externo'">
          <!-- {{ record.external }} -->
          <a-tag v-if="record.external == 1" color="cyan">Externo</a-tag>
        </template>

        <template v-if="column.dataIndex == 'startOperations'">
          {{ formatDate(record.startOperations) }}
        </template>

        <template v-if="column.dataIndex == 'startDate'">
          {{ formatDate(record?.startDate) }}
        </template>
        
        <template v-if="column.dataIndex == 'endDate'">
          {{ formatDate(record?.endDate) }}
        </template>

        <template v-if="column.dataIndex == 'numbrestantes'">
          <p v-if="dateTrafficLight(record.endDate, record.startDate) >= 1" class="list-days">{{ dateTrafficLight(record.endDate, record.startDate) }} días faltantes</p>
          <p v-else class="list-days">{{ dateTrafficLight(record.endDate, record.startDate) }} días vencidos</p>
        </template>

        <template v-if="column.dataIndex == 'status'">
          <a-progress 
          style="margin: 0;"
          :percent="dateTrafficLight(record.endDate, record.startDate)" 
          :size="4" 
          :showInfo="false" 
          :strokeColor="colorPeriodo(dateTrafficLight(record.endDate, record.startDate))" />
        </template>

        <!-- <template v-if="column.dataIndex == 'acciones'"> 
          <div class="accion-total">
            <MessageOutlined class="ico-acciones" @click="handleAcciones(record)" />
            <span class="accion-numb">{{ record.acciones.length }} MENSAJES</span>
          </div>
        </template> -->
           <!-- <template v-if="column.dataIndex =='denomination'">
          {{ record.denomination }}
          <a-progress 
          style="margin: 0;"
          :percent="dateTrafficLight(record.endDate, record.startDate)" 
          :size="4" 
          :showInfo="false" 
          :strokeColor="colorPeriodo(dateTrafficLight(record.endDate, record.startDate))" />
        </template> -->

        <template v-if="column.dataIndex == 'observations'"> 
          <MessageOutlined v-if="record?.observations" class="observation-icon" @click="handleOpenObservations(record)" />
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleUpFile(record)">Archivos</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleCompromisos(record)">Compromisos</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleEditSolicitante(record)">Editar</a>
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
    <span><a-tag color="blue"><b>{{ total }} </b></a-tag>Convenios</span>
    <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <!-- <pre>{{ idConvenio }}</pre> -->

  <a-drawer v-model:open="open" root-class-name="root-class-name" title="Convenios" placement="right" width="650" >
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
  </a-drawer>

  <a-drawer v-model:open="openCompromisos" title="Compromisos" placement="right" width="90%">
    <!-- <DrawCompromisos :convenio="idConvenio" /> -->
  </a-drawer>

</template>


<script setup>
import axios from 'axios';
import { ref, onMounted, h, onBeforeUnmount, computed, reactive } from 'vue';
import NuevoConvenio from './components/DrawConvenioUGSE.vue';
import DrawAcciones from './components/DrawAcciones.vue';
import DrawObservations from './components/DrawObservations.vue';
import DrawFiles from './components/DrawFiles.vue';
// import DrawCompromisos from './components/DrawCompromisosUGSE.vue';
import { CaretUpOutlined, CaretDownOutlined, QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';

import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const storageData = JSON.parse(localStorage.getItem('profile'))
const store = useCounterStore();
const token = Cookies.get('token');
const props = defineProps(['idConvenio']);
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION;
const dev = import.meta.env.VITE_APP_API_URL_LOCAL;
const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? dev : prod;

// store.$patch({ cities: store.cities });
// store.fetchCities();
const rowascdesc = ref(null);
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
  { title: '#',                                   dataIndex: 'idx', fixed: 'left', align: 'center', width: 70 },
  { title: 'REGIÓN',                              dataIndex: 'city', fixed: 'left', width: 120 },
  { title: 'PROVINCIA',                           dataIndex: 'province', fixed: 'left', width: 120 },
  { title: 'DISTRITO',                            dataIndex: 'district', fixed: 'left', width: 140 },
  { title: 'ENTIDAD ALIADA',                      dataIndex: 'entity', width: 220 },
  // { title: 'CDE AGENTE EXTERNO',                  dataIndex: 'externo', width: 100, align: 'center'},
  // { title: 'FECHA DE SUSCRIPCIÓN DE CONVENIO',    dataIndex: 'startOperations', align: 'center', width: 180 },
  { title: 'INICIO DE CONVENIO VIGENTE',          dataIndex: 'startDate', align: 'center', width: 180 },
  { title: 'N° DE AÑOS VIGENTE',                  dataIndex: 'years', width: 120, align: 'center'},
  { title: 'FIN DEL CONVENIO',                    dataIndex: 'endDate', align: 'center', width: 180 },
  { title: 'ESTADO',                              dataIndex: 'status', align: 'center', width: 150 },
  { title: 'FECHA RESTANTE',                      dataIndex: 'numbrestantes', align: 'center', width: 140 },
  { title: 'OBSERVACIONES',                       dataIndex: 'observations', align: 'center', width: 140 },
  { title: '',                                    dataIndex: 'actions', width: 60, align: 'center', fixed: 'right' }
  // { title: 'ACCIONES', dataIndex: 'acciones', align: 'center', width: 100 },
];
const formState = reactive({
  search: '',
});
const handleFinish = () => {
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

const handleSelectOrder = (type) => {
  rowascdesc.value = type
  let params = { order: type }
  fetchData(params)
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
const restDate = (end, start) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    days += lastDayOfMonth;
    months--;
  }

  const resultYears = years > 0 ? `${years} año${years > 1 ? 's' : ''}` : '';
  const resultMonths = months > 0 ? `${months} mes${months > 1 ? 'es' : ''}` : '';
  const resultDays = days > 0 ? `${days} día${days > 1 ? 's' : ''}` : '';
  const resultArray = [resultYears, resultMonths, resultDays].filter(Boolean);
  return resultArray.join(' con ');
}

const handleUpFile = (record) => {
  idConvenio.value = record.id;
  openDrives.value = true;
}

const handleCompromisos = (record) => {
  idConvenio.value = record;
  openCompromisos.value = true;
}

const dateTrafficLight = (end, start) => {
  // return console.log("date", end);
  // const startDate = new Date(start);
  // const currentDate = new Date(end);
  // const differenceInTime = currentDate.getTime() - startDate.getTime();
  // const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  // return differenceInDays;
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
   
    const {data} = await makeRequest({ url: `agreement/list/ugse`, method: 'GET', params: parx });
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

<style scoped lang="scss">
.arrActive {
  color: var(--primary);
}
.list-days {
  line-height: 1.2; 
  margin: 0; 
  font-size: 12px;
}
</style>

<style lang="scss">
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
.table-agreements {
  tr {
    font-size: 13px;
  }
  .ant-table-row {
    .ant-table-cell:nth-child(16) {
      background-color: #feffe2 !important;
    }
    .ant-table-cell:nth-child(18) {
      background-color: #f5f5ff !important;
    }
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
