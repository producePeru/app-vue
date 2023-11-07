<template>
  <div>
    <h3>Lista de MYPES</h3>
    <div class="w-search">
      <div>
        <a-button @click="handleFileUploadExcel" v-if="!selectedExcel">
          <template #icon>
            <UploadOutlined />
          </template>
          Seleccionar archivo excel
        </a-button>

        <a-button @click="handleUploadExcel" type="primary" v-else>Cargar datos</a-button>

        <a-popconfirm v-if="dataSource.length >= 1" title="¿Deseas borrar todos los registros?" @confirm="handleDropData">
          <a-button type="primary" danger class="btn-drop">Drop base de datos</a-button>
        </a-popconfirm>
    
      </div>
  
      <!-- <a-input-search
      v-model:value="dataToSearch"
      placeholder="Buscar"
      enter-button
      @search="handleSearch"/> -->

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
      <template v-slot:bodyCell="{column, record}">
        <template v-if="column.dataIndex == 'tipo_usuario'">
          <template v-if="record.tipo_usuario === 1">
            <a-tag :bordered="false" color="processing">Administrador</a-tag>
          </template>
          <template v-if="record.tipo_usuario === 2">
            <a-tag :bordered="false" color="magenta">Común</a-tag>
          </template>
          <template v-if="record.tipo_usuario === 3">
            <a-tag :bordered="false" color="purple">3</a-tag>
          </template>
          <template v-if="record.tipo_usuario === 4">
            <a-tag :bordered="false" color="warning">4</a-tag>
          </template>
          <template v-if="record.tipo_usuario === 5">
            <a-tag :bordered="false" color="cyan">5</a-tag>
          </template>
        </template>
        
        <template v-if="column.dataIndex == 'estado'">
          <template v-if="record.estado === 1">
            <a-tag color="success">Activo</a-tag>
          </template>
          <template v-else>
            <a-tag color="error">Inactivo</a-tag>
          </template>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a-button @click.prevent shape="circle" size="small" :icon="h(MoreOutlined)" />
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">Editar</a-menu-item>
                <a-menu-item key="2">Dar de baja / Activar</a-menu-item>
               
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small"  :total="total" :pageSize="50"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <div class="full-spin" v-if="spinning">
    <a-spin :indicator="indicator" :spinning="spinning" />
  </div>

</template>

<script setup>
import axios from 'axios';
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, reactive, h } from 'vue';
import { MoreOutlined,UploadOutlined,LoadingOutlined } from '@ant-design/icons-vue';
import { message,notification } from 'ant-design-vue';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const spinning = ref(!true);
const selectedExcel = ref(null);

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const valueY = ref('60vh')
const dataToSearch = ref('')
const total = ref(0)

const indicator = h(LoadingOutlined, {
  style: {  fontSize: '40px' },
  spin: true,
});
const params = ref({
  page: 1
})

const columns = [
  { title: 'RUC',                 dataIndex: 'ruc', fixed: 'left', width: 130},
  { title: 'Razón social',        dataIndex: 'razon_social', fixed: 'left', width: 180},
  { title: 'Rubro',               dataIndex: 'rubro', align: 'center'},
  { title: 'Tipo',                dataIndex: 'tipo', align: 'center' },
  { title: 'Departamento',        dataIndex: 'departamento', width: 140 },
  { title: 'Distrito',            dataIndex: 'distrito', align: 'center'},
  { title: 'Nombres y Apellidos', dataIndex: 'nombres_apellidos', align: 'center', width: 220},
  { title: 'DNI',                 dataIndex: 'dni', align: 'center', width: 100},
  { title: 'Sexo',                dataIndex: 'sexo', align: 'center', width: 130},
  { title: 'Teléfono',            dataIndex: 'telefono', align: 'center' },
  { title: 'Email',               dataIndex: 'email', align: 'center' },

  // { title: '',                dataIndex: 'actions', width: '55px'}
];


const handleSearch = (searchValue) => {
  console.log(searchValue);
}
const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const handleFileUploadExcel = () => {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xls, .xlsx';
  input.onchange = event => {
    selectedExcel.value = event.target.files[0];
    notification.open({
      message: '¡Alerta!',
      description:
        'Debes ahora de cargar los datos del excel.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  input.click();
};

const handleUploadExcel = () => {
  if (!selectedExcel.value) {
    alert("Por favor selecciona un archivo Excel.");
    return;
  }
  spinning.value = true;
  const formData = new FormData();
  formData.append('file', selectedExcel.value);

  axios.post(`${apiUrl}/digital-route/load-excel`, formData, {
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  })
  .then(response => {
    message.success(response.data.message);
    fetchData()
  }).catch(error => {
    console.error('Error al subir el archivo', error);
  }).finally(() => {
    spinning.value = false;
    selectedExcel.value = null;
  })
}
const handleDropData = async() => {
  try {
    const data = await makeRequest({ url: '/digital-route/delete-excel-records', method: 'DELETE' });
    new Promise(resolve => {
      setTimeout(() => resolve(true), 3000);
    });
    if(data) {
      message.success(data.message);
      fetchData()
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/digital-route/data-excel', method: 'GET', params:params.value });
    dataSource.value = data.data
    total.value = data.total;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

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
.w-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 .8rem 0;
}
.full-spin {
  background-color: #00000070;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-drop {
  margin-left: 1rem;
}
</style>