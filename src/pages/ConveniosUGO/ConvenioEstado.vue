<template>
  <div>
    <h3 class="title-produce">ESTADO DE CONVENIOS</h3>

    <div class="filters">
      <a-button type="primary" @click="showDrawer">NUEVO</a-button>
    </div>

    <a-table 
    bordered
    :scroll="{ x: valueX, y: valueY }" 
    class="table-agreements" 
    :columns="columns"
    :data-source="dataSource" 
    :pagination="false" 
    :loading="loading" 
    size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex == 'region'">
          {{ record.region.name }}
        </template>
        <template v-if="column.dataIndex == 'provincia'">
          {{ record.provincia.name }}
        </template>
        <template v-if="column.dataIndex == 'district'">
          {{ record.distrito?.name }}
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

        <template v-if="column.dataIndex == 'inicioperaciones'">
          {{ formatDate(record?.homeOperations) }}
        </template>
        <template v-if="column.dataIndex == 'operatividad'">
          {{ record?.estado_operatividad.name }}
        </template>
        <template v-if="column.dataIndex == 'convenio'">
          {{ record?.estado_convenio.name }}
        </template>

        <template v-if="column.dataIndex == 'entidades'">
          <div v-for="(initial, index) in record.initials" :key="index">
            <a-tag :color="handleColor(index)" style="margin: .2rem 0;">{{ initial }} </a-tag>
          </div>
        </template>

        <template v-if="column.dataIndex == 'startDate'">
          {{ formatDate(record?.startDate) }}
        </template>
        <template v-if="column.dataIndex == 'numbyears'">
          <p style="line-height: 1.2; margin: 0;">{{ restDate(record.endDate, record.startDate) }}</p>
          
        </template>

        <template v-if="column.dataIndex == 'endDate'">
          {{ formatDate(record?.endDate) }}
        </template>

        <template v-if="column.dataIndex == 'acciones'"> 
          <div class="accion-total">
            <span class="accion-numb">5</span>
            <FileAddOutlined class="ico-acciones" @click="handleAcciones(record)" />
          </div>
        </template>

        <!-- <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditSolicitante(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDeleteNotary(record)">
                    <template #icon><question-circle-outlined style="color: red" /></template>
                    <a>Eliminar</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template> -->

      </template>
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator" :showSizeChanger="false" />
  </div>
  <!-- <pre>{{ dataSource }}</pre> -->
  <a-drawer v-model:open="open" class="draw-notary" root-class-name="root-class-name" title="Convenios" placement="right">
    <!-- <SolicitanteEditar @closeDraw="handleCloseDrawopen" :updateValues="updateValues" /> -->
    <NuevoConvenio />
  </a-drawer>

  <a-drawer v-model:open="openAcciones" title="Acciones" placement="right">
    <DrawAcciones :idConvenio="idConvenio" />
  </a-drawer>

</template>


<script setup>
import { ref, onMounted, h, onBeforeUnmount, computed, reactive } from 'vue';
import NuevoConvenio from './components/DrawConvenio.vue';
import DrawAcciones from './components/DrawAcciones.vue';
import { LinkOutlined, QuestionCircleOutlined, FileAddOutlined } from '@ant-design/icons-vue';
import { requestNoToken } from '@/utils/noToken.js';
import { MoreOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';
import { Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const storageData = JSON.parse(localStorage.getItem('profile'))
const store = useCounterStore();
// store.$patch({ cities: store.cities });
// store.fetchCities();
const idConvenio = ref(null);
const total = ref(0);
const pageSize = 20;
const params = ref({ page: 0 });
const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const open = ref(false);
const openAcciones = ref(false);
const updateValues = ref(null);
const city = ref(null);
const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', fixed: 'left', dataIndex: 'idx', align: 'center', width: 70 },

  { title: 'REGIÓN', fixed: 'left', dataIndex: 'region', width: 120 },
  { title: 'PROVINCIA', fixed: 'left', dataIndex: 'provincia', width: 140 },
  { title: 'DISTRITO', fixed: 'left', dataIndex: 'district', width: 140 },
  { title: 'DENOMINACIÓN', dataIndex: 'denomination', fixed: 'left', width: 150 },
  { title: 'ENTIDAD ALIADA', dataIndex: 'alliedEntity', width: 170 },
  { title: 'INICIO DE OPERACIONES', dataIndex: 'inicioperaciones', align: 'center', width: 120 },
  { title: 'DIRECCIÓN', dataIndex: 'address', width: 180 },
  { title: 'REFERENCIA', dataIndex: 'reference', width: 220 },
  { title: 'ASESORES EMPRESARIALES ASIGNADOS', dataIndex: 'districtxx', align: 'center', width: 125 },
  { title: 'RESOLUCIÓN DE AUTORIZACIÓN PARA CONDICIÓN DE CDE', dataIndex: 'resolution', align: 'center', width: 150 },
  { title: 'ESTADO DE OPERATIVIDAD', dataIndex: 'operatividad', align: 'center', width: 120 },
  { title: 'ESTADO DEL CONVENIO', dataIndex: 'convenio', align: 'center', width: 120 },
  { title: 'ENTIDADES', dataIndex: 'entidades', align: 'center', width: 170 },
  { title: 'INICIO CONVENIO VIGENTE', dataIndex: 'startDate', align: 'center', width: 120 },
  { title: 'NUM. AÑOS DEL CONVENIO', dataIndex: 'numbyears', align: 'center', width: 110 },
  { title: 'FIN DEL CONVENIO', dataIndex: 'endDate', align: 'center', width: 120 },
  { title: 'ACCIONES', dataIndex: 'acciones', align: 'center', width: 100 },
  { title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }
];

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

const dateTrafficLight = (end, start) => {
  const startDate = new Date(start);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - startDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
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
  valueY.value = window.innerHeight - 350;
};

const showDrawer = () => {
  updateValues.value = null;
  open.value = true;
};
const handleCloseDrawopen = () => {
  fetchData();
  open.value = false;
}
const handleDeleteNotary = async (val) => {
  try {
    const data = await makeRequest({ url: `person/delete/${val.id}`, method: 'DELETE' });
    if (data.status == 500) {
      Modal.warning({
        title: 'Aviso',
        content: data.message,
      });
    } else {
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
  let numb = params.value.page == 0 ? 1 : params.value.page
  return (numb - 1) * pageSize + index + 1;
});

const fetchData = async () => {
  try {
    loading.value = true;
    let parx = params.value.page == 0 ? '' : params.value;

    const {data} = await makeRequest({ url: `agreement/list`, method: 'GET', params: parx });

    dataSource.value = data.data
    total.value = data.total

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  .accion-numb {
    font-size: 12px;
  }
}
.table-agreements {
  .ant-table-row {
    .ant-table-cell:nth-child(16) {
      background-color: #feffe2 !important;
    }
  }
}
</style>
