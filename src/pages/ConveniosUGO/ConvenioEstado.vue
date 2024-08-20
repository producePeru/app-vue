<template>
  <div>
    <h3 class="title-produce">ESTADO DE CONVENIOS</h3>

    <!-- <div class="filters"> -->
      
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
    <!-- </div> -->

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
        <template v-if="column.dataIndex == 'city'">
          <div class="table-head">
            <span>REGIÓN</span>
            <div class="t-icons">
              <CaretUpOutlined :class="{'arrActive' : rowascdesc == 'asc'}" class="ii" @click="handleSelectOrder('asc')" />
              <CaretDownOutlined :class="{'arrActive' : rowascdesc == 'desc'}" class="ii" @click="handleSelectOrder('desc')" />
            </div>
          </div>
        </template>

        <template v-if="column.dataIndex == 'denomination'">
          <div class="table-head">
            <span>DENOMINACIÓN</span>
            <div class="t-icons">
              <CaretUpOutlined :class="{'arrActive' : denominationascdesc == 'asc'}" class="ii" @click="handleSelectDenomination('asc')" />
              <CaretDownOutlined :class="{'arrActive' : denominationascdesc == 'desc'}" class="ii" @click="handleSelectDenomination('desc')" />
            </div>
          </div>
        </template>
      </template>

      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex =='denomination'">
          {{ record.denomination }}
          <a-progress 
          style="margin: 0;"
          :percent="dateTrafficLight(record.endDate, record.startDate)" 
          :size="4" 
          :showInfo="false" 
          :strokeColor="colorPeriodo(dateTrafficLight(record.endDate, record.startDate))" />
        </template>

        <template v-if="column.dataIndex == 'entities'">
          <div v-for="(initial, index) in record.entities" :key="index">
            <a-tag :color="handleColor(index)" style="margin: .2rem 0;">{{ initial }} </a-tag>
          </div>
        </template>

        <template v-if="column.dataIndex == 'numbyears'">
          <p style="line-height: 1.2; margin: 0; font-size: 12px;">
            {{ restDate(record.endDate, record.startDate) }}
          </p>
        </template>

        <template v-if="column.dataIndex == 'startDate'">
          {{ formatDate(record?.startDate) }}
        </template>

        <template v-if="column.dataIndex == 'startOperations'">
          {{ formatDate(record?.startOperations) }}
        </template>

        <template v-if="column.dataIndex == 'endDate'">
          {{ formatDate(record?.endDate) }}
        </template>

        <template v-if="column.dataIndex == 'numbrestantes'">
          <p v-if="dateTrafficLight(record.endDate, record.startDate) >= 1" class="list-days">{{ dateTrafficLight(record.endDate, record.startDate) }} días faltantes</p>
          <p v-else class="list-days">{{ dateTrafficLight(record.endDate, record.startDate) }} días vencidos</p>
        </template>

        <template v-if="column.dataIndex == 'acciones'"> 
          <div class="accion-total">
            <MessageOutlined class="ico-acciones" @click="handleAcciones(record)" />
            <span class="accion-numb">{{ record.acciones.length }} MENSAJES</span>
          </div>
        </template>

        <!--  -->
        <!-- <template v-if="column.dataIndex == 'operatividad'">
          {{ record?.estado_operatividad.name }}
        </template> -->
        <!-- <template v-if="column.dataIndex == 'convenio'">
          {{ record?.estado_convenio.name }}
        </template> -->

        <!--  -->
<!-- 
        
        
         -->

        <!--  -->

        <!--  -->

        <!--  -->

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <!-- <a-menu-item>
                  <a @click="handleEditSolicitante(record)">Editar</a>
                </a-menu-item> -->
                <a-menu-item>
                  <a @click="handleUpFile(record)">Archivos</a>
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

  <a-drawer v-model:open="open" class="draw-notary" root-class-name="root-class-name" title="Convenios" placement="right" width="650" >
    <NuevoConvenio @closeDraw="handleCloseDrawopen(1)" />
  </a-drawer>

  <a-drawer v-model:open="openAcciones" title="Acciones" placement="right" width="550">
    <DrawAcciones :idConvenio="idConvenio" @closeDraw="handleCloseDrawopen(2)" @refreshTable="fetchData()" />
  </a-drawer>

  <a-drawer v-model:open="openDrives" title="Cargar Archivos" placement="right" width="550">
    <DrawFiles :idConvenio="idConvenio" @closeDraw="handleCloseDrawopen(3)" />
  </a-drawer>

</template>


<script setup>
import axios from 'axios';
import { ref, onMounted, h, onBeforeUnmount, computed, reactive } from 'vue';
import NuevoConvenio from './components/DrawConvenio.vue';
import DrawAcciones from './components/DrawAcciones.vue';
import DrawFiles from './components/DrawFiles.vue';
import { CaretUpOutlined, CaretDownOutlined, QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';
// import { Modal } from 'ant-design-vue';
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
const openDrives = ref(false);
const updateValues = ref(null);
const city = ref(null);
const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#',                     dataIndex: 'idx', fixed: 'left', align: 'center', width: 70 },
  { title: 'REGIÓN',                dataIndex: 'city', fixed: 'left', width: 120 },
  { title: 'PROVINCIA',             dataIndex: 'province', fixed: 'left', width: 120 },
  { title: 'DISTRITO',              dataIndex: 'district', fixed: 'left', width: 140 },
  { title: 'DENOMINACIÓN',          dataIndex: 'denomination', fixed: 'left', width: 150 },
  { title: 'ENTIDAD ALIADA',        dataIndex: 'entity', width: 170 },
  { title: 'INICIO DE OPERACIONES', dataIndex: 'startOperations', align: 'center', width: 120 },
  { title: 'DIRECCIÓN',             dataIndex: 'address', width: 180 },
  { title: 'REFERENCIA',            dataIndex: 'references', width: 220 },
  // { title: 'ASESORES EMPRESARIALES ASIGNADOS', dataIndex: 'districtxx', align: 'center', width: 125 },
  { title: 'RESOLUCIÓN DE AUTORIZACIÓN PARA CONDICIÓN DE CDE', dataIndex: 'resolution', align: 'center', width: 150 },
  { title: 'ESTADO DE OPERATIVIDAD',  dataIndex: 'statusOperations', align: 'center', width: 120 },
  { title: 'ESTADO DEL CONVENIO',     dataIndex: 'statusConveny', align: 'center', width: 120 },
  { title: 'ENTIDADES',               dataIndex: 'entities', align: 'center', width: 170 },
  { title: 'INICIO CONVENIO VIGENTE', dataIndex: 'startDate', align: 'center', width: 120 },
  { title: 'NUM. AÑOS DEL CONVENIO',  dataIndex: 'numbyears', align: 'center', width: 110 },
  { title: 'FIN DEL CONVENIO',        dataIndex: 'endDate', align: 'center', width: 120 },
  { title: 'DÍAS', dataIndex: 'numbrestantes', align: 'center', width: 70 },
  { title: 'ACCIONES', dataIndex: 'acciones', align: 'center', width: 100 },
  { title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }
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

const handleColor = (idx) => {
  const colors = {
    0: 'red',
    1: 'orange',
    2: 'green',
    3: 'purple',
    4: 'blue',
    5: 'pink'
  }
  return colors[idx];
}

const handleSelectOrder = (type) => {
  rowascdesc.value = type
  let params = { order: type }
  fetchData(params)
}
const handleSelectDenomination = (type) => {
  denominationascdesc.value = type
  let params = { date_diff_order : type }
  fetchData(params)
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
  updateValues.value = null;
  open.value = true;
};
const handleCloseDrawopen = (draw) => {
  fetchData();
  draw == 1 && (open.value = false);
  draw == 2 && (openAcciones.value = false);
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
const handleEditSolicitante = (data) => {
  updateValues.value = data
  open.value = true;
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
   
    const {data} = await makeRequest({ url: `agreement/list`, method: 'GET', params: parx });
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
      method: 'POST',
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
