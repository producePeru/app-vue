<template>
  <section>
    <h3>CONVENIOS SUSCRIPTOS <pre>::::{{ total }}</pre></h3>

    <br>
    <a-button @click="handleFileUploadExcel" :loading="spinning">
      <img width="20" style="margin-right: 6px;" src="../../assets/img/icoexcel.png" /> EXPORTAR
    </a-button>

    <br><br>

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

        <template v-if="column.dataIndex == 'options'">
          <div class="text-center">
            <MoreOutlined />
          </div>
        </template>
        <template v-if="column.dataIndex == 'pdf'">
          <div class="text-center">
            <img width="32" src="../../assets/img/pdf.png" />
          </div>
        </template>
        <template v-if="column.dataIndex == 'details'">
          <div class="text-center">
            <a-button size="small" @click="handleFileUploadExcel" :loading="spinning">
              <router-link :to="`/admin/convenios/convenio/${valueX}`">Ver detalles</router-link>
            </a-button>
            
          </div>
        </template>
        
      </template>
      
    </a-table>

    <div class="paginator">
      <a-pagination size="small" :pageSize="50" :total="total"  @change="handlePaginator" :showSizeChanger="false" />
    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { makeRequest } from '@/utils/api.js'
import { MoreOutlined } from '@ant-design/icons-vue'

const spinning = ref(false);
const loading = ref(false);
const total = ref(0)
const pageSize = ref(0)
const valueX = ref(1200)
const valueY = ref(window.innerHeight - 100);
const dataSource = ref([])
const params = ref({ page: 1 })

const columns = [
  { title: '',                          dataIndex: 'options', fixed: 'left', width: 40},
  { title: 'PDF',                       dataIndex: 'pdf', fixed: 'left', width: 80, align: 'center'},
  { title: 'Nombre de la Institución',  dataIndex: 'socialReason', fixed: 'left', width: 250},
  { title: 'Unidad',                    dataIndex: 'category', width: 200},
  { title: 'Componente Responsable',    dataIndex: 'type', align: 'center', width: 140, filters: [{text: 'NATURAL', value: 'NATURAL'},{text: 'JURIDICA', value: 'JURIDICA'}] },
  { title: 'Adenda',                    dataIndex: 'department', width: 140 },
  { title: 'Estado convenio',           dataIndex: 'district', width: 130},
  { title: 'Fecha de emisión',          dataIndex: 'nameComplete', width: 300},
  { title: 'Inicio de vigencia',        dataIndex: 'dniNumber', align: 'center', width: 120},
  { title: 'Punto Focal',               dataIndex: 'sex', align: 'center', width: 130},
  { title: 'Detalles',                  dataIndex: 'details', align: 'center', width: 130}
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
    total.value = data.total;
    pageSize.value = data.per_page
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
.text-center {
  text-align: center;
}
</style>