<template>
  <div>
    <h3>ASESORÍAS</h3>

    <div class="filters">
      <a-button @click="handleDownloadAsesorias" :loading="loadingexc">
        <img width="20" style="margin-right: 6px;" src="@/assets/img/icoexcel.png" /> DESCARGAR
      </a-button>
    </div>
    
    <a-table 
    bordered
    :scroll="{ x: valueX, y: valueY }" 
    class="ant-table-striped"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record}">
        
        <template v-if="column.dataIndex == 'solName'">
          {{ record.person.last_name }} {{ record.person.middle_name }}, {{ record.person.name }}
        </template>

        <template v-if="column.dataIndex === 'sol_discapacidad'">
          <a-tag :color="record.sol_discapacidad == 'NO' ? 'blue' : 'pink'">{{ record.sol_discapacidad }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'sol_genero'">
          <a-tag class="uppercase" :color="record.sol_genero == 'h' ? 'default' : 'error'">{{ record.sol_genero }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'modality'">
          <a-tag :color="record.modalidad == 'VIRTUAL' ? 'orange' : 'green'">{{ record.modalidad }}</a-tag>
        </template>

      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="total" :pageSize="20"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

</template>

<script setup>
import axios from 'axios';
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { message } from 'ant-design-vue';
import Cookies from 'js-cookie';

const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == '127.0.0.1' ? dev : prod;
const token = Cookies.get('token');
const dataSource = ref([])
const loading = ref(false);
const loadingexc = ref(false);
const total = ref(0)
const params = ref({ page: 1 });

const valueX = ref(1200)
const valueY = ref(window.innerHeight - 100);
const actualizarAltura = () => {
  valueY.value = window.innerHeight - 300;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});

const columns = [
  { title: 'Fecha',                     dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 100},
  { title: 'Asesor',                    dataIndex: 'reg_nombres', width: 180 },
  { title: 'Solicitante Apellidos',     dataIndex: 'sol_apellidos', width: 180 },
  { title: 'Solicitante Nombres',       dataIndex: 'sol_nombres', width: 180 },
  { title: 'Solicitante género',        dataIndex: 'sol_genero', width: 140, align: 'center' },
  { title: 'Solicitante discapacidad',  dataIndex: 'sol_discapacidad', width: 176, align: 'center' },
  { title: 'Solicitante telf.',         dataIndex: 'sol_telefono', width: 120, align: 'center' },
  { title: 'Solicitante correo',        dataIndex: 'sol_correo', width: 180},
  { title: 'Supervisor',                dataIndex: 'misupervisor', width: 180},
  { title: 'Región',                    dataIndex: 'mype_region', width: 130},
  { title: 'Provincia',                 dataIndex: 'mype_provincia', width: 180},
  { title: 'Distrito',                  dataIndex: 'mype_distrito', width: 180},
  { title: 'Componente',                dataIndex: 'componente', width: 180},
  { title: 'Tema',                      dataIndex: 'tema_componente', width: 180},
  { title: 'Modalidad',                 dataIndex: 'modality', width: 120, align: 'center'},
];

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}


const handleDownloadAsesorias = async() => {
  loadingexc.value = true

  const payload = {};

  try {
    const { data } = await axios.post(`${apiUrl}/download-asesorias`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      responseType: 'blob' 
    });

    const blob = new Blob([data]); 
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'asesorias.xlsx'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    message.error("Error");
  } finally {
    loadingexc.value = false
  }

};

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `/asesorias`, method: 'GET', params:params.value });
    dataSource.value = data.data
    total.value = data.total;

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

<style>
.filters {
  margin: 1rem 0 1.5rem 0;
}
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
.ant-popover-inner {
  width: 200px;
}
</style>

