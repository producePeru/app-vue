<template>
  <div>
    <div class="header-rep">
      <h3 :class="{'hdactive' : active == 'asesorias'}" @click="fetchData('asesorias')">ASESORÍAS</h3>
      <h3 :class="{'hdactive' : active == 'ruc10'}"     @click="fetchData('ruc10')">FORMALIZACIONES RUC 10</h3>
      <h3 :class="{'hdactive' : active == 'ruc20'}"     @click="fetchData('ruc20')">FORMALIZACIONES RUC 20</h3>
    </div>

    <div class="filters-dig">
      <div>
        <div>
          <a-button @click="handleDownloadAsesorias" :loading="loadingexc">
            <img width="20" style="margin: -2px 4px 0 0;" src="@/assets/img/icoexcel.png" /> DESCARGAR
          </a-button>
        </div>
      </div>
      
      <div class="filters" >
        <div class="rango">
          <label>Por rango de fechas</label>
          <a-range-picker v-model:value="byDateRange" :presets="rangePresets" />
        </div>

        <div class="asesor" v-if="storageRole[0].id == 1">
          <label>Por asesores</label>
          <a-select v-model:value="byAsesores" mode="multiple" placeholder="Selecciona asesores" max-tag-count="responsive" :options="store.asesores" />
        </div>

        <a-button type="primary" class="btn-produce" @click="handleSearchFilter">BUSCAR</a-button>
      </div>
    </div>

    <a-table 
    bordered
    :scroll="{ x: valueX, y: valueY }" 
    class="table-historial"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record, index}">
      
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>
        <template v-if="column.dataIndex == 'ase_fecha'">
          {{ formatDate(record.created_at) }}
        </template>
        
        <template v-if="column.dataIndex == 'sol_apellidos'">
          {{ record.people.lastname }} {{ record.people.middlename }}
        </template>
        <template v-if="column.dataIndex == 'sol_nombres'">
          {{ record.people.name }}
        </template>

        <template v-if="column.dataIndex == 'sol_tipo_doc'">
          {{ record.people.typedocument.name }}
        </template>
        <template v-if="column.dataIndex == 'sol_num_doc'">
          {{ record.people.documentnumber }}
        </template>

        <template v-if="column.dataIndex == 'sol_email'">
          {{ record.people.email }}
        </template>
        <template v-if="column.dataIndex == 'sol_phone'">
          {{ record.people.phone }}
        </template>
        
        <template v-if="column.dataIndex == 'asesor'">
          <!-- {{ record.supervisado?.supervisado_user.profile.name }} {{ record.supervisado?.supervisado_user.profile.lastname }} {{ record.supervisado?.supervisado_user.profile.middlename }} -->
          {{ record.user?.profile.name }} {{ record.user?.profile.lastname }}  {{ record.user?.profile.middlename }} 
          <!-- <pre>{{ record }}</pre> -->
        </template>

        <template v-if="column.dataIndex == 'misupervisor'">
          {{ record.supervisor?.supervisor_user.profile.name }} {{ record.supervisor?.supervisor_user.profile.lastname }} {{ record.supervisor?.supervisor_user.profile.middlename }}
        </template>

        <template v-if="column.dataIndex == 'mype_region'">
          {{ record.city?.name }}
        </template>
        <template v-if="column.dataIndex == 'mype_provincia'">
          {{ record.province?.name }}
        </template>
        <template v-if="column.dataIndex == 'mype_distrito'">
          {{ record.district?.name }}
        </template>

        <template v-if="column.dataIndex == 'componente'">
          {{ record.component?.name }}
        </template>
        <template v-if="column.dataIndex == 'tema_componente'">
          {{ record.theme?.name }}
        </template>

        <template v-if="column.dataIndex == 'detalle_tramite'">
          {{ record.detailprocedure?.name }}
        </template>
        <template v-if="column.dataIndex == 'sector_economico'">
          {{ record.economicsector?.name }}
        </template>
        <template v-if="column.dataIndex == 'atividad_comercial'">
          {{ record.comercialactivity?.name }}
        </template>

        <template v-if="column.dataIndex == 'mype_direccion'">
          {{ record?.address }}
        </template>

        <template v-if="column.dataIndex == 'mype_nombre'">
          {{ record.mype?.name }}
        </template>
        <template v-if="column.dataIndex == 'tipo_regimen'">
          {{ record.regime?.name }}
        </template>
        <template v-if="column.dataIndex == 'numero_envio_notaria'">
          {{ record.numbernotary }}
        </template>
        <template v-if="column.dataIndex == 'notaria'">
          {{ record.notary?.name }}
        </template>
        <template v-if="column.dataIndex == 'codesunarp'">
          {{ record.codesunarp }}
        </template>
        
        <template v-if="column.dataIndex === 'modality'">
          <a-tag :color="record.modality?.name == 'Presencial' ? 'green' : 'orange'">{{ record.modality?.name }}</a-tag>
        </template>
        
        <template v-if="column.dataIndex == 'ruc'">
          {{ record.mype?.ruc ? `20${record.mype?.ruc}` : '' }}
        </template>

      </template>
      
    </a-table>
  </div>
  <!-- <pre>byAsesores {{ byAsesores }}</pre>
  <pre>byDateRange {{ byDateRange }}</pre> -->
  
  <div class="paginator-asesories">
    <span><a-tag color="blue"><b>{{ total }} </b></a-tag>{{ handleNamePaginator(active) }}</span>
    <a-pagination size="small" :total="total" :pageSize="pageSize"  @change="handlePaginator" :showSizeChanger="false" :defaultCurrent="2" />
  </div>

</template>

<script setup>
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import axios from 'axios';
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { message } from 'ant-design-vue';
import Cookies from 'js-cookie';
import { requestNoToken } from '@/utils/noToken.js';
import { useCounterStore } from '@/stores/selectes.js';

const storageRole = JSON.parse(localStorage.getItem('role'));
const token = Cookies.get('token');
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1' ? dev : prod;
const store = useCounterStore();
const dataSource = ref([])
const loading = ref(false);
const loadingexc = ref(false);
const total = ref(0)
const params = ref({ page: 0 });
const active = ref('asesorias');
const pageSize = 20;
const valueX = ref(1200)
const valueY = ref(window.innerHeight - 100);
const url = ref('historial/advisories/filters');

const byAsesores = ref([]);
const byDateRange = ref(null);

store.$patch({ asesores: store.asesores });
store.fetchAsesores();

// filter
const rangePresets = ref([
  {
    label: 'Últimos 7 días',
    value: [dayjs().add(-7, 'd'), dayjs()],
  },
  {
    label: 'Últimos 14 días',
    value: [dayjs().add(-14, 'd'), dayjs()],
  },
  {
    label: 'Último mes',
    value: [dayjs().add(-30, 'd'), dayjs()],
  },
  {
    label: 'Último 3 meses',
    value: [dayjs().add(-90, 'd'), dayjs()],
  },
]);
// filter_end

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 320;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});

const columns = ref([]);

const columnsAsesoria = ref([
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'Fecha', dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 130 },
  { title: 'Solicitante Apellidos', dataIndex: 'sol_apellidos', width: 180 },
  { title: 'Solicitante Nombres', dataIndex: 'sol_nombres', width: 180 },
  { title: 'S. Tipo Documento', dataIndex: 'sol_tipo_doc', width: 160 },
  { title: 'S. Núm. Documento', dataIndex: 'sol_num_doc', width: 150 },
  { title: 'S. Email', dataIndex: 'sol_email', width: 200 },
  { title: 'S. Celular', dataIndex: 'sol_phone', width: 110, align: 'center' },
  { title: 'Asesorado por', dataIndex: 'asesor', width: 200 },
  { title: 'Supervisor', dataIndex: 'misupervisor', width: 200 },
  { title: 'Región', dataIndex: 'mype_region', width: 140 },
  { title: 'Provincia', dataIndex: 'mype_provincia', width: 160 },
  { title: 'Distrito', dataIndex: 'mype_distrito', width: 160 },
  { title: 'Componente', dataIndex: 'componente', width: 180 },
  { title: 'Tema', dataIndex: 'tema_componente', width: 180 },
  { title: 'Modalidad', dataIndex: 'modality', width: 120, align: 'center' },
]);

const columnsRuc10 = ref([
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'Fecha', dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 130 },
  { title: 'Solicitante Apellidos', dataIndex: 'sol_apellidos', width: 180 },
  { title: 'Solicitante Nombres', dataIndex: 'sol_nombres', width: 180 },
  { title: 'S. Tipo Documento', dataIndex: 'sol_tipo_doc', width: 160 },
  { title: 'S. Núm. Documento', dataIndex: 'sol_num_doc', width: 150 },
  { title: 'S. Email', dataIndex: 'sol_email', width: 200 },
  { title: 'S. Celular', dataIndex: 'sol_phone', width: 110, align: 'center' },
  { title: 'Asesorado por', dataIndex: 'asesor', width: 200 },
  { title: 'Supervisor', dataIndex: 'misupervisor', width: 200 },
  { title: 'Región', dataIndex: 'mype_region', width: 140 },
  { title: 'Provincia', dataIndex: 'mype_provincia', width: 160 },
  { title: 'Distrito', dataIndex: 'mype_distrito', width: 160 },

  { title: 'Detalle del trámite', dataIndex: 'detalle_tramite', width: 180 },
  { title: 'Sector económico', dataIndex: 'sector_economico', width: 180 },
  { title: 'Actividad comercial', dataIndex: 'atividad_comercial', width: 180 },

  { title: 'Modalidad', dataIndex: 'modality', width: 120, align: 'center' },
]);

const columnsRuc20 = ref([
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'Fecha', dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 130 },
  { title: 'Solicitante Apellidos', dataIndex: 'sol_apellidos', width: 180 },
  { title: 'Solicitante Nombres', dataIndex: 'sol_nombres', width: 180 },
  { title: 'S. Tipo Documento', dataIndex: 'sol_tipo_doc', width: 160 },
  { title: 'S. Núm. Documento', dataIndex: 'sol_num_doc', width: 150 },
  { title: 'S. Email', dataIndex: 'sol_email', width: 200 },
  { title: 'S. Celular', dataIndex: 'sol_phone', width: 110, align: 'center' },
  { title: 'Asesorado por', dataIndex: 'asesor', width: 200 },
  { title: 'Supervisor', dataIndex: 'misupervisor', width: 200 },
  { title: 'Región', dataIndex: 'mype_region', width: 140 },
  { title: 'Provincia', dataIndex: 'mype_provincia', width: 160 },
  { title: 'Distrito', dataIndex: 'mype_distrito', width: 160 },
  { title: 'Dirección', dataIndex: 'mype_direccion', width: 230 },
  { title: 'Nombre empresa', dataIndex: 'mype_nombre', width: 180 },
  { title: 'Régimen', dataIndex: 'tipo_regimen', width: 80, align: 'center' },
  { title: 'Número de notaría', dataIndex: 'numero_envio_notaria', width: 140 },
  { title: 'Notaría', dataIndex: 'notaria', width: 150 },
  { title: 'Modalidad', dataIndex: 'modality', width: 120, align: 'center' },
  { title: 'RUC', dataIndex: 'ruc', width: 120, align: 'center' },
]);

const handleSearchFilter = async() => {
  // const values = {
  //   ...byAsesores.value.length >= 1 && {user_id: byAsesores.value.toString()},
  //   ...byDateRange.value && {dateStart: dayjs(byDateRange.value[0]).format('YYYY-MM-DD')},
  //   ...byDateRange.value && {dateEnd: dayjs(byDateRange.value[1]).format('YYYY-MM-DD')},
  //   ...params.value.page != 0 && {page: params.value.page}
  // }

  // if(active.value == 'asesorias') url.value = 'historial/advisories/filters';
  // if(active.value == 'ruc10') url.value = 'historial/formalizations-10/filters';
  // if(active.value == 'ruc20') url.value = 'historial/formalizations-20/filters';

  fetchData(active.value)

}

const handlePaginator = (current) => {
  params.value.page = current;
  fetchData()
}
const formatDate = (dateString) => {
  return dayjs(dateString).format('DD-MM-YYYY HH:mm');
}
const handleNamePaginator = (val) => {
  const types = {
    'asesorias': "Asesorías",
    'ruc10': "Formalizaciones RUC 10",
    'ruc20': "Formalizaciones RUC 20"
  };
  return types[val];
}


const handleDownloadAsesorias = async () => {

  loadingexc.value = true

  let urlx = '', nameExcel = '';

  if (active.value == 'asesorias') {
    urlx = 'download/asesories';
    nameExcel = 'asesorias.xlsx'
  }

  if (active.value == 'ruc10') {
    urlx = 'download/formalizations-ruc10';
    nameExcel = 'formalizacionesRUC10.xlsx'
  }

  if (active.value == 'ruc20') {
    urlx = 'download/formalizations-ruc20';
    nameExcel = 'formalizacionesRUC20.xlsx'
  }

  try {
    const values = {};
    if (byDateRange.value) {
      values.dateStart = dayjs(byDateRange.value[0]).format('YYYY-MM-DD');
      values.dateEnd = dayjs(byDateRange.value[1]).format('YYYY-MM-DD');
    }

    const { data } = await axios.get(`${apiUrl}${urlx}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      params: values,
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

const fetchData = async (val) => {
  try {
    loading.value = true;

    const values = {
      ...byAsesores.value.length >= 1 && {user_id: byAsesores.value.toString()},
      ...byDateRange.value && {dateStart: dayjs(byDateRange.value[0]).format('YYYY-MM-DD')},
      ...byDateRange.value && {dateEnd: dayjs(byDateRange.value[1]).format('YYYY-MM-DD')},
      ...params.value.page != 0 && {page: params.value.page}
    }

    if(active.value == 'asesorias') columns.value = columnsAsesoria.value

    if (val == 'asesorias') {
      params.value.page = 0
      active.value = val
      columns.value = columnsAsesoria.value
      url.value = 'historial/advisories/filters';
    }

    if (val == 'ruc10') {
      params.value.page = 0
      active.value = val
      columns.value = columnsRuc10.value
      url.value = 'historial/formalizations-10/filters' 
    }

    if (val == 'ruc20') {
      params.value.page = 0
      active.value = val
      columns.value = columnsRuc20.value
      url.value = 'historial/formalizations-20/filters'
    }

    const data = await makeRequest({ 
      url: url.value, 
      method: 'GET', 
      params: values
    });

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
  return (numb - 1) * pageSize + index + 1;
});

onMounted(() => {
  fetchData();
  // fetchAsesores();
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
});
</script>

<style lang="scss" scoped>
.paginator-asesories {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
.filters-dig {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .6rem;
  .filters {
    display: flex;
    align-items: end;
    .rango {
      display: flex;
      flex-direction: column;
      width: 240px;
      margin-right: 7px;
      label {
        font-size: 13px;
        margin-bottom: 4px;
      }
    }
    .asesor {
      display: flex;
      flex-direction: column;
      width: 200px;
      margin-right: 7px;
      label {
        font-size: 13px;
        margin-bottom: 4px;
      }
    }
  }
  @media screen and (max-width: 820px) {
    flex-direction: column;
    margin: 1rem 0;
    .filters {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      .rango, .asesor {
        width: 100%;
      }
    }
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
    margin: 0;

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
  background-color: #00a6db;
  color: #fff;
  border-color: #00a6db !important;
}
</style>

<style lang="scss">
.table-historial {
  .ant-table-row {
    .ant-table-cell:nth-child(3), .ant-table-cell:nth-child(4) {
      text-transform: uppercase;
    }
    .ant-table-cell:nth-child(9) {
      background-color: #feffe3 !important;
    }

    .ant-table-cell:nth-child(10) {
      background-color: #e6fff4 !important;
    }
  }
}

.asesorias-search {
  button {
    background-color: #cf1322;
  }
}
</style>