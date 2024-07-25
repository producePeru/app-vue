<template>
  <div>
    <h3 class="title-produce">ASESORES DEL PROGRAMA</h3>
    
    <a-row style="margin: 1rem 0;">
      <a-col :xs="24" :md="12" :lg="18"></a-col>
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
        <template v-if="column.dataIndex === 'lastname'">
          {{ record.profile_lastname }} {{ record.profile_middlename }}
        </template>
        <template v-if="column.dataIndex === 'role'">
          Asesor
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditItem(record)">Editar</a>
                </a-menu-item>
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
  v-model:open="openDrawer"
  class="draw"
  title="Editar datos del asesor"
  placement="right">
  <EditarDatosAsesor @closeDraw="handleCloseDrawer" :record="dataItem" />
  </a-drawer>
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { h, ref, onMounted, computed, reactive } from 'vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import EditarDatosAsesor from './components/DrawerEditarDatosAsesor.vue';

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

const columns = [
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'Nombres', dataIndex: 'profile_name', width: 120 },
  { title: 'Apellidos', dataIndex: 'lastname', width: 160 },
  { title: 'Num. DNI', dataIndex: 'profile_documentnumber', width: 100, align: 'center'},
  { title: 'Celular', dataIndex: 'profile_phone', width: 100, align: 'center' },
  { title: 'CDE', dataIndex: 'cde_name', width: 160 },
  { title: 'Fecha Nac.', dataIndex: 'profile_birthday', width: 100, align: 'center' },
  { title: 'Género', dataIndex: 'gender', width: 120, align: 'center' },
  { title: 'Oficina', dataIndex: 'office_name', width: 100, align: 'center' },
  { title: 'ROL', dataIndex: 'role', width: 100, align: 'center' },
  { title: 'CUENTA', dataIndex: 'email', width: 180},
  { title: '', dataIndex: 'actions', align: 'center', width: 50, fixed: 'right' }
];

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 300;
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