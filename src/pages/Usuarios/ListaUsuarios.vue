<template>
  <div>
    <h3 class="title-produce">USUARIOS DEL PROGRAMA PNTE</h3>
    
    <a-row style="margin: 1rem 0;">
      <a-col :xs="24" :md="12" :lg="18">
        <!-- <a-button type="primary" style="margin-right: .5rem;">NUEVO</a-button> -->
        <!-- <a-button class="btn-excel" @click="handleDownload" :loading="loadingFile" type="primary">
          <img width="20" style="margin: -2px 0 0 0;" src="@/assets/img/icoexcel.png" /> 
        </a-button> -->
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
    class="table-users" 
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
    <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'idx'">
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
          {{ record.profile?.phone ? record.profile?.phone : '🔒' }} 
        </template>
        <template v-if="column.dataIndex == 'birthday'">
          {{ record.profile?.birthday ? record.profile?.birthday : '🔒' }}
        </template>
        
        <template v-if="column.dataIndex == 'office'">
          <a-tag color="blue" v-if="record.profile.office?.name == 'UGSE'">{{ record.profile?.office.name }} </a-tag>
          <a-tag color="orange" v-if="record.profile.office?.name == 'UGO'">{{ record.profile?.office.name }} </a-tag>
          <a-tag color="green" v-if="record.profile.office?.name == 'DE'">{{ record.profile?.office.name }} </a-tag>
          <a-tag color="gray" v-if="record.profile.office?.name == 'UGEER'">{{ record.profile?.office.name }} </a-tag>
          
          <a-tag color="blue" v-if="record.profile.office?.id == 5">Asesor Notaría </a-tag>
          
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
  width="550"
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
import { ref, onMounted, h, computed, reactive } from 'vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import EditarProfileUsuario from './components/EditarPerfil.componente.vue';
import VistasUsuarios from './components/DrawAdministrarVistasUsuario.vue';

const updateUser = ref(null);
const open = ref(false);
const open2 = ref(false);
const pageSize = ref(50);
const dataSource = ref([])
const loading = ref(false)
const total = ref(0);
const params = ref({ page: 1 });
const url = ref('user/list');
const valueX = ref(1200);
const valueY = ref(window.innerHeight - 100);

const columns = [
  { title: '#',                   dataIndex: 'idx', fixed: 'left', align: 'center', width: 50},
  { title: 'DNI',                 dataIndex: 'documentnumber', fixed: 'left', width: 80 },
  { title: 'Nombres',             dataIndex: 'name', width: 120 },
  { title: 'Apellidos',           dataIndex: 'lastname', width: 120 },
  { title: 'Correo',              dataIndex: 'email', width: 200},
  { title: 'Celular',             dataIndex: 'phone', width: 100, align: 'center'},
  { title: 'Fecha Nac.',          dataIndex: 'birthday', width: 100, align: 'center'},
  { title: 'Oficina',             dataIndex: 'office', width: 120, align: 'center'},
  { title: 'CDE',                 dataIndex: 'cde', width: 140},
  { title: 'ROL',                 dataIndex: 'role', width: 160},
  { title: '',                    dataIndex: 'actions', align: 'center', width: 50, fixed: 'right'}
];

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 300;
};
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

const handleCloseDrawopen = () => {
  fetchData();
  open.value = false;
  open2.value = false;
}

const handlePaginator = (current) => {
  params.value.page = current;
  fetchData();
};

const handleEditUser = (data) => {
  updateUser.value = data
  open.value = true;
}
const handleViewsUser = (data) => {
  updateUser.value = data
  open2.value = true;
}

const fetchData = async(val) => {
  try {
    loading.value = true;
    const parx = params.value.page === 1 ? '' : params.value;
    const finalParams = val ? { ...parx, ...val } : parx;
    
    const {data} = await makeRequest({ url: url.value, method: 'GET', params:finalParams });
    dataSource.value = data.data
    total.value = data.total;
    pageSize.value = data.per_page;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const computeIndex = computed(() => (index) => {
  return (params.value.page - 1) * pageSize.value + index + 1;
});

onMounted(() => {
  fetchData();
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
});

const afterOpenChange = () => {
  console.log('Drawer state changed');
};
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