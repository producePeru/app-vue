<template>
  <div>
    <h3 class="title-produce">LISTA DE MYPES</h3>
    
    <a-row style="margin: 1rem 0;">
      <a-col :xs="24" :md="12" :lg="18">
        <span class="fs-13">Actualizar lista con: </span>

        <a-button class="fs-13" @click="handleUpdateList('set-ruc-advisories')" type="text">Asesorías</a-button>
        <a-button class="fs-13" @click="handleUpdateList('set-ruc-ruc-10')" type="text">RUC 10</a-button>
        <a-button class="fs-13" @click="handleUpdateList('set-ruc-ruc-20')" type="text">RUC 20</a-button>

        <!-- <a-button class="btn-excel" @click="handleDownload" :loading="loadingFile" type="primary">
          <img width="20" style="margin: -2px 0 0 0;" src="@/assets/img/icoexcel.png" /> 
        </a-button> -->
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
      
        <template v-if="column.dataIndex == 'update'">
          <a-button type="text" class="fs-13 color-primary" @click="handleUpdateMype(record)" :loading="loadingUpdate == record.ruc">
            <span v-show="loadingUpdate != record.ruc">Actualizar</span>
          </a-button>
        </template>

      </template>
    </a-table>
  </div>

  <div class="paginator">
    <span><a-tag color="blue"><b>{{ total }} </b></a-tag><span class="fs-13">mypes registradas</span></span>
    <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <a-drawer
  width="550"
  v-model:open="openDrawer"
  class="draw"
  title="Editar datos de MYPE"
  placement="right">
  <UpdateMype @closeDraw="handleCloseDrawopen" :info="dataItem" />
  </a-drawer>

</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, h, computed, reactive } from 'vue';
import { MoreOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import UpdateMype from './components/DrawerMypeInfo.vue'
// import EditarProfileUsuario from './components/EditarPerfil.componente.vue';
// import VistasUsuarios from './components/DrawAdministrarVistasUsuario.vue';  

const loadingUpdate = ref(null);
const openDrawer = ref(false);
const dataItem = ref(null);
const pageSize = ref(100);
const dataSource = ref([])
const loading = ref(false)
const total = ref(0);
const params = ref({ page: 1 });
const url = ref('mype/list');
const valueX = ref(1200);
const valueY = ref(window.innerHeight - 100);

const columns = [
  { title: '#',                   dataIndex: 'idx', fixed: 'left', align: 'center', width: 50},
  { title: 'RUC',                 dataIndex: 'ruc', fixed: 'left', width: 80 },
  { title: 'Razón Social',        dataIndex: 'razonSocial', fixed: 'left', width: 150 },
  { title: 'Actividad Economica', dataIndex: 'actividadEconomica', width: 180 },
  { title: 'Departamento',        dataIndex: 'departamento', width: 100,  align: 'center' },
  { title: 'Provincia',           dataIndex: 'provincia', width: 100, align: 'center'},
  { title: 'Distrito',            dataIndex: 'distrito', width: 100, align: 'center'},
  { title: 'Dirección',           dataIndex: 'direccion', width: 100, align: 'center'},
  { title: 'Actualizar',          dataIndex: 'update', width: 100, align: 'center'},
  // { title: 'Oficina',             dataIndex: 'office', width: 120, align: 'center'},
  // { title: 'CDE',                 dataIndex: 'cde', width: 140},
  // { title: 'ROL',                 dataIndex: 'role', width: 160},
  // { title: '',                    dataIndex: 'actions', align: 'center', width: 50, fixed: 'right'}
];

const handleUpdateList = async(val) => {
  loading.value = true;
  const response = await makeRequest({ url: `formalization/${val}`, method: 'PUT' });
  if(response.status == 200) fetchData()
}

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 302;
};
const formState = reactive({
  search: '',
});

const handleSearch = () => {
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
  openDrawer.value = false;
}

const handlePaginator = (current) => {
  params.value.page = current;
  fetchData();
};

const handleUpdateMype = async (mype) => {
  loadingUpdate.value = mype.ruc;
  try {
    const response = await makeRequest({ url: `mype/update/${mype.ruc}`, method: 'PUT' });
    if(response.status == 200) {
      fetchData();
      message.success('¡Actualización exitosa!');
    } else {
      const response = await makeRequest({ url: `mype/get-by-ruc/${mype.ruc}`, method: 'GET' });
      dataItem.value = response.data;
      openDrawer.value = true;
    }
  } catch (error) {
    console.log("Failed to update");
  } finally {
    loadingUpdate.value = null;
  }
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