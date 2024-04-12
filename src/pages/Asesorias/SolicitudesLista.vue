<template>
  <div>
    <h3>SOLICITUDES DE FORMALIZACIÓN DIGITAL</h3>

    <div class="filters-dig">
      <a-select
      v-model:value="cedeSelected"
      placeholder="Filtrar por CDES"
      :options="store.cdes"
      @change="handleFilter" />

      <!-- <a-input-search
      v-model:value="searchUser"
      placeholder=""
      enter-button="Buscar"
      @search="handleSearch" /> -->
    </div>
    
    <a-table 
    bordered
    :scroll="{ x: valueX, y: valueY }" 
    class="ant-table-striped"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record, index}">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>
        <template v-if="column.dataIndex == 'lastName'">
          {{ record.people.lastname }} {{ record.people.middle }}
        </template>
        <template v-if="column.dataIndex == 'name'">
          {{ record.people.name }}
        </template>
        <template v-if="column.dataIndex == 'number_document'">
          {{ record.people.documentnumber }}
        </template>
        <template v-if="column.dataIndex == 'department'">
          {{ record.people.city.name }}
        </template>
        <template v-if="column.dataIndex == 'province'">
          {{ record.people.province.name }}
        </template>
        <template v-if="column.dataIndex == 'district'">
          {{ record.people.district.name }}
        </template>
        <template v-if="column.dataIndex == 'phone'">
          {{ record.people.phone }}
        </template>
        <template v-if="column.dataIndex == 'email'">
          {{ record.people.email }}
        </template>
        <template v-if="column.dataIndex == 'statu'">
          <a-checkbox :checked="record.attended == 0 ? false : true" disabled />
        </template>
        <template v-if="column.dataIndex == 'reserva'">
          <div @click="handleDataSelected(record)">
            <a-select
            :disabled="record.attended == 0 ? true : false"
            v-model:value="record.status"
            placeholder="Escoger el proceso"
            style="width: 90%"
            :options="bookings"
            @change="handleReservationName" />
          </div>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleFormalization20(record)">Formalizar</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleEditSolicitante(record)">Editar datos</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Eliminar?" @confirm="handleDeleteUser(record)">
                    <template #icon><question-circle-outlined style="color: red" /></template>
                    <a>Quitar de la lista</a>
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
    <a-pagination size="small" :total="total" :pageSize="pageSize"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <!-- <a-drawer width="510" title="Formalización con RUC 20" v-model:open="open1" placement="right">
    <a-steps :current="current" size="small" class="steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <ReservaNombre v-if="current == 0" :info="information" @closeDraw="handleFinalReserva" />
    </div>
  </a-drawer>

  <a-modal v-model:open="openModal" title="Pendientes" :closable="true" cancelText="Cerrar" :footer="null" :maskClosable="false" width="380px">
      <a-spin :spinning="spinning">
       
        <div class="un-tramite">
          <span>Tiene trámites pendientes</span>
          <span class="go" @click="handleGoRoute">Ir a trámites</span>
        </div>

        <div class="pendient pendient-btn" @click="open1 = true, openModal = false, current = 0">
          <div style="text-align: center;">NUEVO TRÁMITE</div>
        </div>
    </a-spin>
  </a-modal> -->
<!-- <pre>{{ updateValues }}</pre> -->
  <a-drawer
    v-model:open="open"
    class="draw-notary"
    root-class-name="root-class-name"
    title="Datos del solicitante"
    placement="right">
    <SolicitanteEditar @closeDraw="handleCloseDrawopen" :updateValues="updateValues" />
  </a-drawer>

</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, h, onBeforeUnmount, computed } from 'vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import ReservaNombre from './components/ReservaNombre.vue';
import SolicitanteEditar from './components/DrawerSolicitante.componente.vue';
import { useCounterStore } from '@/stores/selectes.js';

const store = useCounterStore();
store.$patch({ cdes: store.cdes });
store.fetchCdes()

const open = ref(false);
const updateValues = ref(null);
const spinning = ref(false);
const openModal = ref(false);
const open1 = ref(false);
const current = ref(0);
const information = ref(false);
const dataRecordSelected = ref(false);
const dataPndingRequest = ref(false);
const rol = ref('solicitante');
const access = ref(5);
const pageSize = 20;
const dataSource = ref([])
const loading = ref(false)
const total = ref(0)
const router = useRouter();
const params = ref({ page: 1 });
const searchUser = ref('')
const url = ref('formalization/digital-list')
const cedes = ref([]);
const cedeSelected = ref(null)
const valueX = ref(1200)
const valueY = ref(window.innerHeight - 100);

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 300;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});

const steps = [
  { title: 'Reserva de nombre' },
  { title: 'Acto constitutivo', },
  { title: 'Final' }
];
const columns = [
  { title: '#',                   dataIndex: 'idx', fixed: 'left', align: 'center', width: 50},
  { title: 'Apellidos',           dataIndex: 'lastName', fixed: 'left', width: 150 },
  { title: 'Nombres',             dataIndex: 'name', fixed: 'left', width: 150 },
  { title: 'DNI',                 dataIndex: 'number_document', align: 'center', width: 90},
  { title: 'Departamento',        dataIndex: 'department', width: 140},
  { title: 'Provincia',           dataIndex: 'province', width: 140},
  { title: 'Distrito',            dataIndex: 'district', width: 140},
  { title: 'CDE Atención',        dataIndex: 'gps_name', width: 140},
  { title: 'Celular',             dataIndex: 'phone', width: 100},
  { title: 'Correo',              dataIndex: 'email', width: 200},
  { title: 'Atendido',            dataIndex: 'statu', align: 'center', width: 100},
  { title: 'Reserva de nombre',   dataIndex: 'reserva', align: 'center', width: 160},
  { title: '',                    dataIndex: 'actions', align: 'center', width: 50, fixed: 'right'}
];

const handleEditSolicitante = (data) => {
  updateValues.value = data.people
  open.value = true;
}
const handleCloseDrawopen = () => {
  fetchData();
  open.value = false;
}
const bookings = ref([
  { value: 1, label: 'Aprobado'},
  { value: 2, label: 'Desaprobado'},
  { value: 3, label: 'Pendiente'}
]);

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const handleEditUser = (data) => {
  const query = {
    rol: rol.value,
    dni: data.number_document,
    access: access.value
  }

  router.push({ name: 'actualizar-persona', query });
}
const handleFormalization20 = async(val) => {
  const query = {
    type: val.people.typedocument_id,
    number: val.people.documentnumber,
    formalizaciondigital: val.id
  }
  router.push({ name: 'asesorias-formalizaciones', query });
}
const handleGoRoute = () => {
  const query = {
    dni: information.value.dni,
    typedoc: 'dni'
  }
  router.push({ name: 'asesorias-formalizaciones', query });
}
const handleFilter = (val) => {
  if(val != 1000) {
    url.value = `/formalization-digital?department=${val}`
    fetchData()
    return
  }
  url.value = '/formalization-digital'
  fetchData()
}
const handleSearch = () => {
  if(searchUser.value) {
    url.value = `/formalization-digital?search=${searchUser.value}`
    fetchData()
    return
  }
  url.value = '/formalization-digital'
  fetchData()
}
const handleReservationName = async(val) => {
  const payload = { booking: val }
  await makeRequest({ url: `/formalization-digital-status/${dataRecordSelected.value.number_document}`, method: 'PATCH', data: payload });
}
const handleDataSelected = (record) => {
  dataRecordSelected.value = record
}
const handleFinalReserva = async() => {
  
  const payload = { status: 1 }
  const data = await makeRequest({ url: `/formalization-digital-status/${information.value.dni}`, method: 'PATCH', data: payload });
  if(data.status == 200) {
    open1.value = false
    fetchData()
  }
  
};
const handleDeleteUser= async(val) => {
  try {
    
    const data = await makeRequest({ url: `formalization/delete/${val.id}`, method: 'DELETE' });
    if(data.status == 200) {
      fetchData();
      message.success(data.message);
    }  
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const fetchData = async() => {
  try {
    loading.value = true;
    let parms = params.value.page == 1 ? '' : params.value
    
    const {data} = await makeRequest({ url: url.value, method: 'GET', params:parms });
    dataSource.value = data.data;
    total.value = data.total;

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}


const computeIndex = computed(() => (index) => {
  // let numb = params.value.page == 0 ? 1 : params.value.page
  return  (params.value.page - 1) * pageSize + index + 1;
});

onMounted(() => {
  fetchData();
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
});
</script>

<style lang="scss" scoped>
.filters-dig {
  margin: 1rem 0;
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  @media screen and (min-width: 900px) {
    grid-template-columns: 200px 260px;
    justify-content: space-between;
  }
}
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
.ant-popover-inner {
  width: 200px;
}
.pendient-btn {
  background-color: #BA0F0F;
  color: #fff;
} 
.pendient {
  border: 1px solid #BA0F0F;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: .6rem;
  margin: 10px 0;
  line-height: 1.7;
  cursor: pointer;

  b {
    font-weight: 400;
  }

  .info-tag {
    display: grid;
    grid-template-columns: 4fr 1fr;

    span {
      margin: 0;
    }
  }

  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;

    span {
      text-align: right;
    }
  }
}
.un-tramite {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  .go {
    color: #1677ff;
    cursor: pointer;
  }
}
</style>
