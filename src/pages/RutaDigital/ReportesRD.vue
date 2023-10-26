<template>
  <div id="components-table-demo-size">
  
    <h4>Reporte de MYPE inscritas en Ruta Digital</h4>

    <a-row class="mb-1">
      <a-col :xs="12" :lg="6" :xl="18">
        <span>nt</span>
      </a-col>
      <a-col :xs="12" :lg="6" :xl="6">
        <a-input-search
        v-model:value="dataToSearch"
        placeholder="Buscar"
        enter-button
        @search="handleSearch"/>
      </a-col>
      
    </a-row>

    <a-table 
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
      </template>
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="50" @change="handlePaginator" />
  </div>
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted } from 'vue';

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const valueY = ref()
const dataToSearch = ref('')

const columns = [
  { title: '#',         dataIndex: 'idx', fixed: 'left', width: 100 },
  { title: 'Name',      dataIndex: 'nat', fixed: 'left', width: 100 },
  { title: 'Age',       dataIndex: 'phone' },
  { title: 'Address',   dataIndex: 'name'},
  { title: 'Name',      dataIndex: 'nat' },
  { title: 'Age',       dataIndex: 'phone' },
  { title: 'Address',   dataIndex: 'name'},
  { title: 'Name',      dataIndex: 'nat' },
  { title: 'Age',       dataIndex: 'phone' },
  { title: 'Address',   dataIndex: 'name'},
  { title: 'Address',   dataIndex: 'name'},
  { title: 'Name',      dataIndex: 'nat' },
  { title: 'Age',       dataIndex: 'phone' },
  { title: 'Address',   dataIndex: 'name'},
];
const params = ref({
  noinfo: null,
  results: 10,
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
