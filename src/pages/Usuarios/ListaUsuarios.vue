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
          {{ record.last_name }} {{ record.middle_name }}
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
          <a-tag color="red" v-if="record.profile?.office.name == 'UGEER'">{{ record.profile?.office.name }} </a-tag>
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
    <a-pagination size="small" :total="total" :pageSize="pageSize"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <a-drawer
      v-model:open="open"
      class="draw-notary"
      title="Editar Perfil"
      placement="right"
      @after-open-change="afterOpenChange">
      <EditarProfileUsuario :updateUser="updateUser" @closeDraw="handleCloseDrawopen" />
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
import EditarProfileUsuario from './components/EditarPerfil.componente.vue'

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
  { title: 'DNI',                 dataIndex: 'documentnumber', fixed: 'left', width: 100 },
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
}

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const handleEditUser = (data) => {
  updateUser.value = data
  open.value = true;
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