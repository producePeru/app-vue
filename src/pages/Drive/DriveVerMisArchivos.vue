<template>
  <div>
    <h3>MIS ARCHIVOS</h3>

    <div class="w-search" v-show="!loading">
      <!-- <router-link to="/admin/drive/subir-archivo"><a-button >SUBIR ARCHIVO</a-button></router-link> -->

      <!-- <a-input-search v-model:value="searchFile" placeholder="Buscar por nombre del archivo" style="width: 250px"
        :loading="loadingSearch" @search="handleSearchFilesName" />

      <a-select 
      v-model:value="inputSearch" 
      show-search 
      placeholder="Buscar" 
      style="width: 220px"
      :options="options" 
      :filter-option="filterOption" 
      @change="handleChange" /> -->

    </div>

    <a-table bordered class="ant-table-striped" sticky :scroll="{ y: valueY }" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex == 'date'">
          <div>{{ formatDate(record.created_at) }}</div>
        </template>

        <template v-if="column.dataIndex == 'user'">
          <div class="uppercase">{{ record.profile.name }} {{ record.profile.lastname }} {{ record.profile.middlename }}</div>
        </template>

        <template v-if="column.dataIndex == 'download'">
          <a-button size="small" @click="handleDownloadFile(record.path)" type="primary" ghost
            :loading="loadingDrive[record.path]">
            <template #icon>
              <DownloadOutlined />
            </template>
            Descargar
          </a-button>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleOpenDraw(record)">Visible para</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDelete(record)">
                    <template #icon><question-circle-outlined style="color: red" /></template>
                    <a>Eliminar</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>


      </template>
    </a-table>
  </div>

  
  <div class="paginator-drive">
    <span><a-tag color="blue"><b>{{ total }}</b></a-tag> Archivos Subidos</span>
    <a-pagination size="small" :pageSize="20" :total="total" @change="handlePaginator" :showSizeChanger="false" />
  </div>

  
    <DriveUsers v-if="open" :plainOptions="plainOptions" :idFile="idFile" :selectedUsers="selectedUsers" @handleCloseDrawer="handleCloseDrawer" />
  
</template>

<script setup>
import axios from 'axios';

import { makeRequest } from '@/utils/api.js'
import { h, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import Cookies from 'js-cookie';
import { DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import moment from 'moment';
import { MoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import DriveUsers from './DrawDriveUsers.component.vue';

const storageRole = JSON.parse(localStorage.getItem('role'));
const storageProfile = JSON.parse(localStorage.getItem('profile'));

const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1' ? dev : prod;
const token = Cookies.get('token');
const idFile = ref(null);
const open = ref(false);
const loadingDrive = ref({});
const dataSource = ref([]);
const loading = ref(false);
const total = ref(0);
const inputSearch = ref(0);
const selectedUsers = ref(null);
const searchFile = ref('');
const loadingSearch = ref(false);
const pageSize = 20;
const plainOptions = ref([]);

const columns = [
  { title: '#',                   dataIndex: 'idx', fixed: 'left', align: 'center', width: 40},
  { title: 'AUTOR',               dataIndex: 'user', fixed: 'left', width: 180 },
  { title: 'NOMBRE DEL ARCHIVO',  dataIndex: 'name', width: 140 },
  { title: 'FECHA',               dataIndex: 'date', width: 120, align: 'center'},
  { title: 'DESCARGAR',           dataIndex: 'download', width: 120, align: 'center'},
  ...(storageRole[0].id === 3 || storageRole[0].id === 1 ? [{ title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }] : [])    //🚩
];

const computeIndex = computed(() => (index) => {
  return  (params.value.page - 1) * pageSize + index + 1;
});



const handleOpenDraw = async(record) => {
  idFile.value = record.id
  try {
      const selected = await makeRequest({ url: `drive/users-selected/${record.id}`, method: 'GET' });
      if (selected.data[0]) selectedUsers.value = selected.data[0]?.user_ids
    } catch (error) {
      console.error('Error de red:', error);
    }

  open.value = true
}



const handleCloseDrawer = () => {
  open.value = false;
}
const handleDelete= async(val) => {
  try {
    const data = await makeRequest({ url: `drive/delete-file/${val.id}`, method: 'DELETE' });
    if(data.status == 500) {
      Modal.warning({
        title: 'Aviso',
        content: data.message,
      });
    } else {
      fetchData();
      message.success(data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const handleEditSolicitante = (id) => {
  console.log(id);
}
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
const handleSearchFilesName = async () => {
  // try {
  //   loadingSearch.value = true;

  //   if (!searchValue) {
  //     inputSearch.value = 0
  //     return fetchData();
  //   }

  //   const url = `/drive/search-file/${storageData.user_id}/${storageData.documentnumber}`
  //   const { data } = await makeRequest({ url, method: 'GET' });
  //   dataSource.value = data.data
  // } catch (error) {
  //   console.error('Error de red:', error);
  // } finally {
  //   loadingSearch.value = false;
  // }
};

const handleDownloadFile = async (path) => {

  loadingDrive.value = { ...loadingDrive.value, [path]: true };

  try {
    const response = await axios.get(`${apiUrl}drive/download/${path}`, {
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



const handlePaginator = (current) => {
  params.value.page = current;
  fetchData()
}

const fetchUsersDrive = async () => {
  try {
    const data = await makeRequest({ url: 'drive/users', method: 'GET' });
    plainOptions.value = data.filter(item => item.value !== storageProfile.user_id);
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const fetchData = async () => {
  try {
    loading.value = true;
    let parms = params.value.page == 1 ? '' : params.value
    const {data} = await makeRequest({ url: `drive/list-files`, method: 'GET', params:parms });
    dataSource.value = data.data
    total.value = data.total
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
  // fetchUsersDrive();
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
  margin: .6rem 0;
}
</style>