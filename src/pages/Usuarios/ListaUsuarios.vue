<template>
  <div id="components-table-demo-size">
  
    <h3>Lista de usuarios</h3>

    <div class="wrapper-search">
      <a-button>
        <template #icon>
          <DownloadOutlined />
        </template>
        Exportar en excel
      </a-button>
      <span />
      <a-input-search
      v-model:value="dataToSearch"
      placeholder="Buscar"
      enter-button
      @search="handleSearch"/>
    </div>

    <a-table 
    bordered
    class="ant-table-striped"
    :scroll="{ x: valueX, y: valueY }"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record, index}">
        <template v-if="column.dataIndex == 'idx'">
          <span>{{  `                   ${params.page}${index + 1}`   }}</span>
        </template>

        <template v-if="column.dataIndex == 'name'">
          <span>
            {{ record.name.first }}
          </span>
        </template>

        <template v-if="column.dataIndex == 'phone'">
          <a-tag color="green">Activo</a-tag>
        </template>

        <template v-if="column.dataIndex == 'nat'">
          <a-tag :bordered="false" color="processing">processing</a-tag>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a-button @click.prevent shape="circle" size="small" :icon="h(MoreOutlined)" />
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">Editar</a-menu-item>
                <a-menu-item key="2">Dar de baja / Activar</a-menu-item>
                <a-menu-item key="3" @click="handleOpenModal"> Actualizar clave</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="50" @change="handlePaginator" />
  </div>

  <a-modal v-model:open="open" title="Actualizar contraseña" @ok="handleChangePassword">
    <a-form 
      layout="vertical"
      :model="formState" 
      name="basic" 
      autocomplete="off">
      <a-form-item label="Contraseña" name="password">
        <a-input v-model:value="formState.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, reactive, h } from 'vue';
import { MoreOutlined,DownloadOutlined } from '@ant-design/icons-vue';

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const valueY = ref('50vh')
const dataToSearch = ref('')
const open = ref(false);

const formState = reactive({
  password: ''
});

const columns = [
  { title: '#',               dataIndex: 'idx', fixed: 'left', width: 100 },
  { title: 'Nombres',         dataIndex: 'name', fixed: 'left', width: 100 },
  { title: 'Apellidos',       dataIndex: 'name' },
  { title: 'N° documento',    dataIndex: 'name'},
  { title: 'Usuario',         dataIndex: 'name' },
  { title: 'Correo',          dataIndex: 'name' },
  { title: 'Celular',         dataIndex: 'name'},
  { title: 'Tipo de usuario', dataIndex: 'nat' },
  { title: 'Estado',          dataIndex: 'phone' },
  { title: '',                dataIndex: 'actions', width: '55px'}
];
const params = ref({
  noinfo: null,
  results: 15,
  page: 1,
  sortField: 'name',
  sortOrder: 'ascend'
})

const handleSearch = (searchValue) => {
  console.log(searchValue);
}
const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ method: 'GET', params: params.value });
    dataSource.value = data.results
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const handleOpenModal = () => {
  open.value = true;
};

const handleChangePassword = (e) => {
  console.log("hahahaah",e);
  open.value = false;
};

onMounted(
  fetchData
);
</script>

<style>
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

</style>
