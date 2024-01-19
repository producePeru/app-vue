<template>
  <div>
    <a-button @click="handleFileUploadExcel" :loading="spinning">
      <img width="20" style="margin-right: 6px;" src="../../../assets/img/icoexcel.png" /> CARGAR EXCEL
    </a-button>

    <br>

    <a-table 
    @change="handleTableChange"
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

    <div class="paginator">
      <a-pagination size="small" :pageSize="50" :total="total"  @change="handlePaginator" :showSizeChanger="false" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { makeRequest } from '@/utils/api.js'

const spinning = ref(false);
const loading = ref(false);
const total = ref(0)
const valueX = ref(1200)
const valueY = ref(window.innerHeight - 100);
const dataSource = ref([])
const params = ref({ page: 1 })

const columns = [
  { title: 'RUC',                 dataIndex: 'ruc', fixed: 'left', width: 120},
  { title: 'Razón social',        dataIndex: 'socialReason', fixed: 'left', width: 250},
  { title: 'Rubro',               dataIndex: 'category', width: 200},
  { title: 'Tipo',                dataIndex: 'type', align: 'center', width: 140, filters: [{text: 'NATURAL', value: 'NATURAL'},{text: 'JURIDICA', value: 'JURIDICA'}] },
  { title: 'Departamento',        dataIndex: 'department', width: 140 },
  { title: 'Distrito',            dataIndex: 'district', width: 130},
  { title: 'Nombres y Apellidos', dataIndex: 'nameComplete', width: 300},
  { title: 'DNI',                 dataIndex: 'dniNumber', align: 'center', width: 120},
  { title: 'Sexo',                dataIndex: 'sex', align: 'center', width: 130},
  { title: 'Teléfono',            dataIndex: 'phone', align: 'center', width: 130},
  { title: 'Email',               dataIndex: 'email', width: 300 },
];


const actualizarAltura = () => {
  valueY.value = window.innerHeight - 300;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});
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

  //   handleUploadExcel()

  // };
  // input.click();
};

const handleTableChange = (pag, filters, sorter) => {
  console.log("88a8a8a8a", filters.type);
};

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

onMounted(() => {
  fetchData();
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
});
</script>

<style lang="scss">
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>