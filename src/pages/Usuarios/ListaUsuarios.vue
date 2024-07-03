<template>
  <div>
    <h3 class="title-produce">USUARIOS</h3>
    <br>

    <!-- <div class="filters-dig">
      <a-select
      v-model:value="cedeSelected"
      placeholder="Filtrar por CDES"
      :options="store.cdes"
      @change="handleFilter" />

      <a-input-search
      v-model:value="searchUser"
      placeholder=""
      enter-button="Buscar"
      @search="handleSearch" />
    </div> -->
    
    <a-table 
    bordered
    :scroll="{ x: valueX, y: valueY }" 
    class="table-users" 
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record, index}">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>
        <template v-if="column.dataIndex == 'documentnumber'">
          {{ record.profile?.documentnumber }}
        </template>
        <template v-if="column.dataIndex == 'name'">
          {{ record.profile?.name }}
        </template>
        <template v-if="column.dataIndex == 'lastname'">
          {{ record.profile?.lastname }} {{ record.profile?.middlename }}
        </template>
        <template v-if="column.dataIndex == 'phone'">
          {{ record.profile?.phone }} 
        </template>
        
        <template v-if="column.dataIndex == 'office'">
          <a-tag color="blue" v-if="record.profile?.office.name == 'UGSE'">{{ record.profile?.office.name }} </a-tag>
          <a-tag color="orange" v-if="record.profile?.office.name == 'UGO'">{{ record.profile?.office.name }} </a-tag>
          <a-tag color="green" v-if="record.profile?.office.name == 'DE'">{{ record.profile?.office.name }} </a-tag>
          <a-tag color="gray" v-if="record.profile?.office.name == 'UGEER'">{{ record.profile?.office.name }} </a-tag>
          <!-- <pre>{{ record.profile?.office.name }}</pre> -->
        </template>

        <template v-if="column.dataIndex == 'cde'">
          {{ record.profile?.cde.name }} 
        </template>
        <template v-if="column.dataIndex == 'role'">
          {{ record.roles[0].name }}
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditUser(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleViewsUser(record)">Vistas</a>
                </a-menu-item>
                <!-- <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDeleteUser(record)">
                    <template #icon><question-circle-outlined style="color: red" /></template>
                    <a>Eliminar</a>
                  </a-popconfirm>
                </a-menu-item> -->
              </a-menu>
            </template>
          </a-dropdown>
        </template>

      </template>
    </a-table>
  </div>

  <div class="paginator">
    <span><a-tag color="blue"><b>{{ total }} </b></a-tag>Usuarios</span>
    <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <a-drawer
  v-model:open="open"
  class="draw-notary"
  title="Editar Perfil"
  placement="right"
  @after-open-change="afterOpenChange">
  <EditarProfileUsuario :updateUser="updateUser" @closeDraw="handleCloseDrawopen" />
  </a-drawer>

  <a-drawer
  width="450"
  v-model:open="open2"
  class="draw-notary"
  title="Administrar Vistas"
  placement="right">
  <VistasUsuarios :idUser="updateUser" @closeDraw="handleCloseDrawopen" />
  </a-drawer>

</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, h, onBeforeUnmount, computed } from 'vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useCounterStore } from '@/stores/selectes.js';
import EditarProfileUsuario from './components/EditarPerfil.componente.vue';
import VistasUsuarios from './components/DrawAdministrarVistasUsuario.vue';

const store = useCounterStore();
store.$patch({ cdes: store.cdes });

const open = ref(false);
const afterOpenChange = bool => {
  console.log('open', bool);
};
const showDrawer = () => {
  open.value = true;
};

const updateUser = ref(null);
const spinning = ref(false);
const openModal = ref(false);
const open1 = ref(false);
const open2 = ref(false);
const current = ref(0);
const information = ref(false);
const dataRecordSelected = ref(false);
const dataPndingRequest = ref(false);
const rol = ref('solicitante');
const access = ref(5);
const pageSize = 50;
const dataSource = ref([])
const loading = ref(false)
const total = ref(0)
const router = useRouter();
const params = ref({ page: 1 });
const searchUser = ref('')
const url = ref('user/list')
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
  { title: 'DNI',                 dataIndex: 'documentnumber', fixed: 'left', width: 80 },
  { title: 'Nombres',             dataIndex: 'name', width: 120 },
  { title: 'Apellidos',           dataIndex: 'lastname', width: 120 },
  { title: 'Correo',              dataIndex: 'email', width: 200},
  { title: 'Celular',             dataIndex: 'phone', width: 100, align: 'center'},
  { title: 'Oficina',             dataIndex: 'office', width: 120, align: 'center'},
  { title: 'CDE',                 dataIndex: 'cde', width: 140},
  { title: 'ROL',                 dataIndex: 'role', width: 160},
  { title: '',                    dataIndex: 'actions', align: 'center', width: 50, fixed: 'right'}
];


const handleCloseDrawopen = () => {
  fetchData();
  open.value = false;
  open2.value = false;
}

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const handleEditUser = (data) => {
  updateUser.value = data
  open.value = true;
}
const handleViewsUser = (data) => {
  updateUser.value = data
  open2.value = true;
}

const handleFormalization20 = async(val) => {
  try {
    
    information.value = null
    openModal.value = false
    open1.value = false

    const { data } = await makeRequest({ url: `/my-formalizations20/${val.number_document}`, method: 'GET' });

    information.value = {
      id: val.id_person,
      dni: val.number_document
    }

    if(data.length >= 1) {
      openModal.value = true
    } else {
      open1.value = true
    }
    
  } catch (error) {
    console.log(error);
  } 
}

const handleFilter = (val) => {
  // if(val != 1000) {
  //   url.value = `/formalization-digital?department=${val}`
  //   fetchData()
  //   return
  // }
  // url.value = '/formalization-digital'
  // fetchData()
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

const handleDeleteUser= async(val) => {
  try {
    const data = await makeRequest({ url: `user/delete/${val.id}`, method: 'DELETE' });
    if(data) {
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
    
    const data = await makeRequest({ url: url.value, method: 'GET', params:parms });
    dataSource.value = data.data
    total.value = data.total;

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const computeIndex = computed(() => (index) => {
  return  (params.value.page - 1) * pageSize + index + 1;
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