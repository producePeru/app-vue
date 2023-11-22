<template>
  <div>
    
    <a-breadcrumb>
      <a-breadcrumb-item><router-link to="/admin/ruta-digital/talleres">Volver a Talleres de Ruta Digital</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Detalles del taller</a-breadcrumb-item>
    </a-breadcrumb>
    <br>
    <div>
      <span>Resultados de las evaluaciones</span>
      <h3>Taller de clientes 2023</h3>
      <span>fecha del taller</span>
      <h3>xx/xx/2023</h3>
    </div>
    <div>
      <span>Participantes: <span>100</span></span>
      <span>Completados: <span>80</span></span>
    </div>

   
    <br>


    <a-table 
    bordered
    class="ant-table-striped"
    :scroll="{ x: valueX }"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record}">
        
        
        <template v-if="column.dataIndex == 'test_in'">
          <template v-if="!record.id_in_test">
            <a-button size="small">Crear</a-button>
          </template>
          <template v-if="record.id_in_test">
            <a-button type="link">Link</a-button>
          </template>
        </template>
        <template v-if="column.dataIndex == 'test_out'">
          <template v-if="!record.id_output_test">
            <a-button size="small">Crear</a-button>
          </template>
          <template v-if="record.id_output_test">
            <a-button type="link">Link</a-button>
          </template>
        </template>

        <template v-if="column.dataIndex == 'details'">
          <a-button size="small">Ver detalles</a-button>
        </template>

      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small"  :total="total" :pageSize="20"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

 
  
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, reactive, h } from 'vue';
import { MoreOutlined,DownloadOutlined } from '@ant-design/icons-vue';

import dataFake from '@/utils/fake.js'

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const valueY = ref('60vh')
// const dataToSearch = ref('')
const open = ref(false);
const total = ref(0)
const idUserSelected = ref(null)


const params = ref({
  page: 1
})

const columns = [
  { title: 'RUC',             dataIndex: 'title', fixed: 'left', width: 190 },
  { title: 'TE1',             dataIndex: 'te1', align: 'center', width: 70},
  { title: 'TE2',             dataIndex: 'te2', align: 'center', width: 70},
  { title: 'TE3',             dataIndex: 'te3', align: 'center', width: 70},
  { title: 'TE4',             dataIndex: 'te4', align: 'center', width: 70},
  { title: 'TE5',             dataIndex: 'te5', align: 'center', width: 70},
  { title: 'Nota',            dataIndex: 'nota', align: 'center', width: 100},
  { title: 'TS1',             dataIndex: 'te1', align: 'center', width: 70},
  { title: 'TS2',             dataIndex: 'te2', align: 'center', width: 70},
  { title: 'TS3',             dataIndex: 'te3', align: 'center', width: 70},
  { title: 'TS4',             dataIndex: 'te4', align: 'center', width: 70},
  { title: 'TS5',             dataIndex: 'te5', align: 'center', width: 70},
  { title: 'Nota',            dataIndex: 'nota', align: 'center', width: 100},
  { title: 'Promedio Final',  dataIndex: 'number_registered', align: 'center', width: 120},
  { title: 'C1',              dataIndex: 'te2', align: 'center', width: 70},
  { title: 'C2',              dataIndex: 'te2', align: 'center', width: 70},
  { title: 'C3',              dataIndex: 'te2', align: 'center', width: 70},
  { title: 'Promedio Satisfacción',        dataIndex: 'pro', align: 'center', width: 120},
  { title: 'Sugerencias',        dataIndex: 'test_in', align: 'center', width: 100},





];

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

// const fetchData = async() => {
//   try {
//     loading.value = true;
//     const data = await makeRequest({ url: '/users', method: 'GET', params:params.value });
//     dataSource.value = data
//     total.value = data.total;
//   } catch (error) {
//     console.error('Error de red:', error);
//   } finally {
//     loading.value = false;
//   }
// }

const fetchData = () => {
  dataSource.value = dataFake
}
const handleOpenModal = () => {
  open.value = true;
};

onMounted(
  fetchData
);
</script>

<style>
.filters {
  margin: 1rem 0;
}
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

</style>

