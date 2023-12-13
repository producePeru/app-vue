<template>
  <div>
    <h3>Lista de MYPE</h3>
    <div class="w-search">
      <div>
        
        <!-- <img src="" /> -->
        
        <a-button @click="handleFileUploadExcel" v-if="!selectedExcel">
          <template #icon>
            <UploadOutlined />
          </template>
          Seleccionar archivo excel
        </a-button>

        <a-button @click="handleUploadExcel" type="primary" v-else>Cargar datos</a-button>

        <!-- <a-popconfirm v-if="dataSource.length >= 1" title="¿Deseas borrar todos los registros?" @confirm="handleDropData">
          <a-button type="primary" danger class="btn-drop">Drop base de datos</a-button>
        </a-popconfirm> -->
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
        <template v-if="column.dataIndex == 'type'">
          <template v-if="record.type == 'NATURAL'">
            <a-tag color="success">Natural</a-tag>
          </template>
          <template v-if="record.type == 'JURIDICA'">
            <a-tag color="error">Jurídica</a-tag>
          </template>
        </template>
        
        <template v-if="column.dataIndex == 'sex'">
          <template v-if="record.sex == 'MASCULINO'">
            <a-tag color="blue">Masculino</a-tag>
          </template>
          <template v-if="record.sex == 'FEMENINO'">
            <a-tag color="pink">Femenino</a-tag>
          </template>
        </template>
      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :pageSize="50" :total="total"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <!-- <pre>{{ total }}</pre> -->

  <div class="full-spin" v-if="spinning">
    <a-spin :indicator="indicator" :spinning="spinning" />
  </div>

</template>

<script setup>
import axios from 'axios';
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, reactive, h, watch } from 'vue';
import { MoreOutlined,UploadOutlined,LoadingOutlined } from '@ant-design/icons-vue';
import { message,notification } from 'ant-design-vue';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const spinning = ref(!true);
const selectedExcel = ref(null);

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1200)
// const valueY = s
const dataToSearch = ref('')
const total = ref(0)


const valueY = ref(null)

const hanleSizeHeigth = () => {
  return valueY.value = 150
}

// watch(hanleSizeHeigth, (new) => {
//    console.log(new);
// });

const indicator = h(LoadingOutlined, {
  style: {  fontSize: '40px' },
  spin: true,
});
const params = ref({
  page: 1
})

const columns = [
  { title: 'RUC',                 dataIndex: 'ruc', fixed: 'left', width: 120},
  { title: 'Razón social',        dataIndex: 'socialReason', width: 250},
  { title: 'Rubro',               dataIndex: 'category', width: 200},
  { title: 'Tipo',                dataIndex: 'type', align: 'center', width: 140 },
  { title: 'Departamento',        dataIndex: 'department', width: 140 },
  { title: 'Distrito',            dataIndex: 'district', width: 130},
  { title: 'Nombres y Apellidos', dataIndex: 'nameComplete', width: 300},
  { title: 'DNI',                 dataIndex: 'dniNumber', align: 'center', width: 120},
  { title: 'Sexo',                dataIndex: 'sex', align: 'center', width: 130},
  { title: 'Teléfono',            dataIndex: 'phone', align: 'center', width: 130},
  { title: 'Email',               dataIndex: 'email', width: 300 },
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
  // let input = document.createElement('input');
  // input.type = 'file';
  // input.accept = '.xls, .xlsx';
  // input.onchange = event => {
  //   selectedExcel.value = event.target.files[0];
  //   notification.open({
  //     message: '¡Alerta!',
  //     description:
  //       'Debes ahora de cargar los datos del excel.',
  //     onClick: () => {
  //       console.log('Notification Clicked!');
  //     },
  //   });

  // };
  // input.click();
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
// const handleDropData = async() => {
//   try {
//     const data = await makeRequest({ url: '/digital-route/delete-excel-records', method: 'DELETE' });
//     new Promise(resolve => {
//       setTimeout(() => resolve(true), 3000);
//     });
//     if(data) {
//       message.success(data.message);
//       fetchData()
//     }
//   } catch (error) {
//     console.error('Error de red:', error);
//   }
// }

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/mype', method: 'GET', params:params.value });
    dataSource.value = data.data
    total.value = data.meta.total;
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

<style lang="scss">
.table-footer {
  background-color: #fafafa;
}
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
