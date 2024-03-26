<template>
  <div>
    <div class="header-rep">
      <h3 :class="{'hdactive' : active == 'asesorias'}" @click="fetchData('asesorias')">ASESORÍAS</h3>
      <h3 :class="{'hdactive' : active == 'ruc10'}" @click="fetchData('ruc10')">FORMALIZACIONES RUC 10</h3>
      <h3 :class="{'hdactive' : active == 'ruc20'}" @click="fetchData('ruc20')">FORMALIZACIONES RUC 20</h3>
    </div>
<!-- <pre>:::{{ params.page }}</pre> -->
    <div class="filters-dig">
      <a-button @click="handleDownloadAsesorias" :loading="loadingexc">
        <img width="20" style="margin-right: 6px;" src="@/assets/img/icoexcel.png" /> DESCARGAR
      </a-button>

      <a-input-search
      v-model:value="searchUser"
      placeholder=""
      enter-button="Buscar"
      @search="handleSearch" />

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
      <template v-slot:bodyCell="{column, record, index}">
        
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex == 'solName'">
          {{ record.person.last_name }} {{ record.person.middle_name }}, {{ record.person.name }}
        </template>

        <template v-if="column.dataIndex === 'sol_discapacidad'">
          <a-tag :color="record.sol_discapacidad == 'NO' ? 'blue' : 'pink'">{{ record.sol_discapacidad }}</a-tag>
        </template>
        <template v-if="column.dataIndex === 'sol_genero'">
          <a-tag class="uppercase" :color="record.sol_genero == 'H' ? 'default' : 'error'">{{ record.sol_genero }}</a-tag>
        </template>
        
        <template v-if="column.dataIndex === 'modality'">
          <a-tag :color="record.modalidad == 'VIRTUAL' ? 'orange' : 'green'">{{ record.modalidad }}</a-tag>
        </template>

      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="total" :pageSize="pageSize"  @change="handlePaginator" :showSizeChanger="false" :defaultCurrent="2" />
  </div>

</template>

<script setup>
import axios from 'axios';
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
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
const params = ref({ page: 0 });
const active = ref('asesorias');
const pageSize = 20;
const searchUser = ref('');
const url = ref('/asesorias')
const valueX = ref(1200)
const valueY = ref(window.innerHeight - 100);
const actualizarAltura = () => {
  valueY.value = window.innerHeight - 315;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});

  const columns = ref([]);
  
  const columnsAsesoria = ref([
    { title: '#',                         dataIndex: 'idx', fixed: 'left', align: 'center', width: 50},
    { title: 'Fecha',                     dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 100},
    { title: 'Asesor',                    dataIndex: 'reg_nombres', width: 200 },
    { title: 'Solicitante Apellidos',     dataIndex: 'sol_apellidos', width: 180 },
    { title: 'Solicitante Nombres',       dataIndex: 'sol_nombres', width: 180 },
    { title: 'Solicitante género',        dataIndex: 'sol_genero', width: 140, align: 'center' },
    { title: 'Solicitante discapacidad',  dataIndex: 'sol_discapacidad', width: 176, align: 'center' },
    { title: 'Solicitante telf.',         dataIndex: 'sol_telefono', width: 120, align: 'center' },
    { title: 'Solicitante correo',        dataIndex: 'sol_correo', width: 180},
    { title: 'Supervisor',                dataIndex: 'misupervisor', width: 200},
    { title: 'Región',                    dataIndex: 'mype_region', width: 140},
    { title: 'Provincia',                 dataIndex: 'mype_provincia', width: 160},
    { title: 'Distrito',                  dataIndex: 'mype_distrito', width: 160},
    { title: 'Componente',                dataIndex: 'componente', width: 200},
    { title: 'Tema',                      dataIndex: 'tema_componente', width: 180},
    { title: 'Modalidad',                 dataIndex: 'modality', width: 120, align: 'center'},
  ]);

  const columnsRuc10 = ref([
    { title: '#',                         dataIndex: 'idx', fixed: 'left', align: 'center', width: 50},
    { title: 'Fecha',                     dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 100},
    { title: 'Asesor',                    dataIndex: 'reg_nombres', width: 200 },
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
    { title: 'Detalle del trámite',       dataIndex: 'detalle_tramite', width: 180},
    { title: 'Sector económico',          dataIndex: 'sector_economico', width: 180},
    { title: 'Actividad comercial',       dataIndex: 'atividad_comercial', width: 180},
    { title: 'Modalidad',                 dataIndex: 'modality', width: 120, align: 'center'},
  ]);

  const columnsRuc20 = ref([
    { title: '#',                         dataIndex: 'idx', fixed: 'left', align: 'center', width: 50},
    { title: 'Fecha',                     dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 100},
    { title: 'Asesor',                    dataIndex: 'reg_nombres', width: 180 },
    { title: 'Solicitante Apellidos',     dataIndex: 'sol_apellidos', width: 180 },
    { title: 'Solicitante Nombres',       dataIndex: 'sol_nombres', width: 180 },
    { title: 'Solicitante género',        dataIndex: 'sol_genero', width: 140, align: 'center' },
    { title: 'Solicitante discapacidad',  dataIndex: 'sol_discapacidad', width: 176, align: 'center' },
    { title: 'Solicitante telf.',         dataIndex: 'sol_telefono', width: 120, align: 'center' },
    { title: 'Solicitante correo',        dataIndex: 'sol_correo', width: 180},
    { title: 'Supervisor',                dataIndex: 'misupervisor', width: 180},
    { title: 'Tipo de formalización',     dataIndex: 'tipo_formalizacion', width: 130},
    { title: 'Sector económico',          dataIndex: 'sector_economico', width: 130},
    { title: 'Actividad comercial',       dataIndex: 'atividad_comercial', width: 160},
    { title: 'Región',                    dataIndex: 'mype_region', width: 130},
    { title: 'Provincia',                 dataIndex: 'mype_provincia', width: 180},
    { title: 'Distrito',                  dataIndex: 'mype_distrito', width: 180},
    { title: 'Dirección',                 dataIndex: 'mype_direccion', width: 230},
    { title: 'Nombre empresa',            dataIndex: 'mype_nombre', width: 180},
    { title: 'Régimen',                   dataIndex: 'tipo_regimen', width: 80,  align: 'center'},
    { title: 'Número de notaría',         dataIndex: 'numero_envio_notaria', width: 140},
    { title: 'Notaría',                   dataIndex: 'notaria', width: 150},
    { title: 'Modalidad',                 dataIndex: 'modality', width: 120, align: 'center'},
    { title: 'RUC',                       dataIndex: 'ruc', width: 100,  align: 'center'},
  ]);

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}


const handleSearch = async() => {
  loading.value = true;
  let url = null
  
  if(active.value == 'ruc20') {
    params.value.page = 0
    active.value = 'ruc20'
    columns.value = columnsRuc20.value
    url = `/formalizations-20?search=${searchUser.value}`
    if(searchUser.value == '') url = '/formalizations-20';
  }

  if(active.value == 'ruc10') {
    params.value.page = 0
    active.value = 'ruc10'
    columns.value = columnsRuc10.value
    url = `/formalizations-10?search=${searchUser.value}`
    if(searchUser.value == '') url = '/formalizations-10';
  }

  if(active.value == 'asesorias') {
    params.value.page = 0
    active.value = 'asesorias'
    columns.value = columnsAsesoria.value
    url = `/asesorias?search=${searchUser.value}`
    if(searchUser.value == '') url = '/asesorias';
  }

  let parx = params.value.page == 0 ? '' : params.value
  const data = await makeRequest({ url: url, method: 'GET', params:parx });
  dataSource.value = data.data
  total.value = data.total;
  loading.value = false;
}



const handleDownloadAsesorias = async() => {
  loadingexc.value = true

  const payload = {};

  let urlx = '', nameExcel = '';

  if(active.value == 'asesorias') {
    urlx = 'download-asesorias';
    nameExcel = 'asesorias.xlsx'
  }

  if(active.value == 'ruc10') {
    urlx = 'download-formalizations-10';
    nameExcel = 'formalizacionesRUC10.xlsx'
  }

  if(active.value == 'ruc20') {
    urlx = 'download-formalizations-20';
    nameExcel = 'formalizacionesRUC20.xlsx'
  }

  try {
    const { data } = await axios.post(`${apiUrl}/${urlx}`, payload, {
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
    link.download = nameExcel; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    message.error("Error");
  } finally {
    loadingexc.value = false
  }
};

const fetchData = async(val) => {
  try {
    loading.value = true;
    let url = '/asesorias';
    columns.value = columnsAsesoria.value

    if(val == 'asesorias') {
      params.value.page = 0
      active.value = val
      columns.value = columnsAsesoria.value
      url = '/asesorias'
    }   

    if(val == 'ruc10') {
      params.value.page = 0
      active.value = val
      columns.value = columnsRuc10.value
      url = '/formalizations-10'
    }  

    if(val == 'ruc20') {
      params.value.page = 0
      active.value = val
      columns.value = columnsRuc20.value
      url = '/formalizations-20'
    }  

    let parx = params.value.page == 0 ? '' : params.value

    const data = await makeRequest({ url: url, method: 'GET', params:parx });
    dataSource.value = data.data
    total.value = data.total;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const computeIndex = computed(() => (index) => {
  let numb = params.value.page == 0 ? 1 : params.value.page
  return  (numb - 1) * pageSize + index + 1;
});


onMounted(() => {
  fetchData();
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
});
</script>

<style lang="scss" scoped>
.filters-dig {
  margin: 1rem 0;
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  @media screen and (min-width: 900px) {
    grid-template-columns: 150px 260px;
    justify-content: space-between;
  }
}
.header-rep {
  display: flex; 
  // gap: 0 1rem;
  h3 {
    cursor: pointer;
    border: 1px solid #f0f0f0;
    padding: .5rem 1rem;
    font-size: 13px;
    &:nth-child(1) {
      border-radius: 14px 0 0 14px;
    }
    &:nth-child(3) {
      border-radius: 0 14px 14px 0;
    }
  }
}
.filters {
  margin: .7rem 0;
}
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
.ant-popover-inner {
  width: 200px;
}
.hdactive {
  background-color: #cf1322;
  color: #fff;
  border-color: #cf1322 !important;
}
</style>

