<template>
  <div>
    <h3>ARCHIVOS</h3>

    <div class="w-search" v-show="!loading">
      <!-- <router-link to="/admin/drive/subir-archivo"><a-button >SUBIR ARCHIVO</a-button></router-link> -->

      <a-input-search v-model:value="searchFile" placeholder="Buscar por nombre del archivo" style="width: 250px"
        :loading="loadingSearch" @search="handleSearchFilesName" />

      <a-select 
      v-model:value="inputSearch" 
      show-search 
      placeholder="Buscar" 
      style="width: 220px"
      :options="options" 
      :filter-option="filterOption" 
      @change="handleChange" />

    </div>

    <a-table bordered class="ant-table-striped" sticky :scroll="{ y: valueY }" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record }">

        <template v-if="column.dataIndex == 'date'">
          <div>{{ formatDate(record.created_at) }}</div>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-button size="small" @click="handleDownloadFile(record.path)" type="primary" ghost
            :loading="loadingDrive[record.path]">
            <template #icon>
              <DownloadOutlined />
            </template>
            Descargar
          </a-button>
        </template>


      </template>
    </a-table>
  </div>

  
  <div class="paginator-drive">
    <span><a-tag color="blue"><b>{{ dataSource.length }}</b></a-tag> Archivos Subidos</span>
    <a-pagination size="small" :pageSize="50" :total="total" @change="handlePaginator" :showSizeChanger="false" />
  </div>
</template>

<script setup>
import axios from 'axios';

import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Cookies from 'js-cookie';
import { DownloadOutlined } from '@ant-design/icons-vue';
import moment from 'moment';

const storageData = JSON.parse(localStorage.getItem('user'))

const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == '127.0.0.1' ? dev : prod;
const token = Cookies.get('token');

const loadingDrive = ref({});
const dataSource = ref([]);
const loading = ref(false);
const total = ref(0);
const inputSearch = ref(0);
const options = ref([]);
const searchFile = ref('');
const loadingSearch = ref(false);

const handleChange = async (value) => {
  try {

    if (value === 0) return fetchData();

    loading.value = true;
    const url = `/drive/author/${value}`

    const data = await makeRequest({ url, method: 'GET', params: params.value });

    dataSource.value = data

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
};
const handleSearchFilesName = async (searchValue) => {
  try {
    loadingSearch.value = true;

    if (!searchValue) {
      inputSearch.value = 0
      return fetchData();
    }

    const url = `/drive/search-file/${searchValue}/${storageData.id}`
    const { data } = await makeRequest({ url, method: 'GET' });
    dataSource.value = data.data
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loadingSearch.value = false;
  }
};

const handleDownloadFile = async (path) => {

  loadingDrive.value = { ...loadingDrive.value, [path]: true };

  try {
    const response = await axios.get(`${apiUrl}/drive/download/${path}`, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', path);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Error al descargar el archivo', error);
  } finally {
    loadingDrive.value = { ...loadingDrive.value, [path]: false };
  }
};

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY HH:mm A');
}
const valueY = ref(window.innerHeight - 100);
const actualizarAltura = () => {
  valueY.value = window.innerHeight - 300;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});

const params = ref({
  page: 1
})

const columns = [
  { title: 'Autor', dataIndex: 'user', fixed: 'left', width: 180 },
  { title: 'Nombre archivo', dataIndex: 'filename', width: 140 },
  { title: 'Fecha de carga', dataIndex: 'date', width: 120, align: 'center' },
  { title: '', dataIndex: 'actions', width: 120, align: 'center' }
];

const handlePaginator = (current) => {
  params.value.page = current;
  fetchData()
}


const fetchData = async () => {
  let url = null


  if (storageData.role == '100' || storageData.role == '10') {
    url = '/drive/files/admin'

  } else {
    url = `/drive/files/${storageData.id}`
  }

  try {
    loading.value = true;
    const { data } = await makeRequest({ url, method: 'GET', params: params.value });
    dataSource.value = data

    const uniqueUsersMap = new Map(data.map(user => [user.idUser, user.user]));
    const users = Array.from(uniqueUsersMap.entries()).map(([value, label]) => ({
      value,
      label,
    }));

    const all = { value: 0, label: 'Todos' };
    const optionx = { value: [all, ...users] };
    options.value = optionx.value

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
.table-footer {
  background-color: #fafafa;
}

.paginator-drive {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.w-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 .8rem 0;
}
</style>
