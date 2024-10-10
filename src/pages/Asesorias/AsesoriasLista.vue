<template>
  <div>

    <h3 class="title-produce">REPORTE GENERAL</h3>

    <a-flex align="center" justify="space-between">
      <div class="header-rep">
        <h3 :class="{ 'hdactive': active == 'asesorias' }" @click="fetchData('asesorias')">ASESORÍAS</h3>
        <h3 :class="{ 'hdactive': active == 'ruc10' }" @click="fetchData('ruc10')">FORMALIZACIONES RUC 10</h3>
        <h3 :class="{ 'hdactive': active == 'ruc20' }" @click="fetchData('ruc20')">FORMALIZACIONES RUC 20</h3>
      </div>

      <a-button class="btn-excel" @click="handleDownloadAsesorias" :loading="loadingexc" type="primary">
        <img width="20" style="margin: -2px 4px 0 0;" src="@/assets/img/icoexcel.png" /> DESCARGAR
      </a-button>
    </a-flex>


    <div class="filters-dig">
      <div>

      </div>

      <div class="filters">
        <!-- <div class="rango" style="width: 200px;">
          <label>Buscar Solicitantes</label>
          <a-input v-model:value="solicitante" placeholder="Buscar datos solicitante"  />
        </div> -->

        <div class="rango">
          <label>Buscar por rango de Fechas</label>
          <a-range-picker v-model:value="byDateRange" :presets="rangePresets" :format="dateFormat" />
        </div>

        <div class="asesor" v-if="storageRole[0].id == 1" style="width: 300px;">
          <label>Buscar por Asesores</label>
          <a-select v-model:value="byAsesores" mode="multiple" placeholder="Selecciona asesores"
            max-tag-count="responsive" :options="store.asesores" :filter-option="filterOption" />
        </div>

        <a-button @click="handleSearchFilter">BUSCAR</a-button>
      </div>
    </div>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" class="table-historial" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record, index }">

        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>
        <template v-if="column.dataIndex == 'ase_fecha'">
          {{ formatDate(record.created_at) }}
        </template>

        <template v-if="column.dataIndex == 'sol_apellidos'">
          {{ record.people?.lastname }} {{ record.people?.middlename }}
        </template>
        <template v-if="column.dataIndex == 'sol_nombres'">
          {{ record.people?.name }}
        </template>

        <template v-if="column.dataIndex == 'sol_tipo_doc'">
          {{ record.people?.typedocument?.avr }}
        </template>
        <template v-if="column.dataIndex == 'sol_num_doc'">
          {{ record.people?.documentnumber }}
        </template>

        <template v-if="column.dataIndex == 'sol_email'">
          <span style="text-transform: lowercase;">
            {{ record.people?.email ? record.people.email : '-' }}
          </span>
        </template>

        <template v-if="column.dataIndex == 'sol_phone'">
          {{ record.people?.phone }}
        </template>

        <template v-if="column.dataIndex == 'birthday'">
          {{ formatDate2(record.people.birthday) }}
        </template>

        <template v-if="column.dataIndex == 'age'">
          {{ calculateAge(record.people.birthday) }} años
        </template>


        <template v-if="column.dataIndex == 'asesor'">
          <!-- {{ record.supervisado?.supervisado_user.profile.name }} {{ record.supervisado?.supervisado_user.profile.lastname }} {{ record.supervisado?.supervisado_user.profile.middlename }} -->
          {{ record.user?.profile.name }} {{ record.user?.profile.lastname }} {{ record.user?.profile.middlename }}
          <!-- <pre>{{ record }}</pre> -->
        </template>

        <template v-if="column.dataIndex == 'misupervisor'">
          {{ record.supervisor?.supervisor_user.profile.name }} {{ record.supervisor?.supervisor_user.profile.lastname
          }} {{ record.supervisor?.supervisor_user.profile.middlename }}
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
          {{ record.nameMype }}
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
          <a-tag :color="record.modality?.name == 'PRESENCIAL' ? 'green' : 'orange'">{{ record.modality?.name }}</a-tag>
        </template>

        <template v-if="column.dataIndex == 'ruc'">
          {{ record.ruc ? record.ruc : 'EN TRÁMITE' }}
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditItem(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDeleteItem(record)" class="prod-alert">
                    <template #icon><question-circle-outlined style="color: red" /></template>
                    <a>Eliminar</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </template>

      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input ref="searchInput" :placeholder="`${column.title}`" :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />

          <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
            <template #icon>
              <SearchOutlined />
            </template>
            Buscar
          </a-button>

          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">Cancelar</a-button>
        </div>
      </template>

      <template #customFilterIcon="{ filtered }">
        <search-outlined style="color: var(--secondary);" />
      </template>

    </a-table>
  </div>

  <div class="paginator-asesories">
    <span><a-tag color="blue"><b>{{ total }} </b></a-tag>{{ handleNamePaginator(active) }}</span>
    <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator" :showSizeChanger="false"
      :defaultCurrent="2" />
  </div>

  <a-drawer width="600" title="Editar asesoría" v-model:open="open1" placement="right">
    <EditarAsesoria :info="infoUser" @closeDraw="open1 = false, fetchData()" />
  </a-drawer>

  <a-drawer width="650" title="Editar Formalización RUC 10" v-model:open="open2" placement="right">
    <EditarFormalizacion10 :info="infoUser" @closeDraw="open2 = false, fetchData()" />
  </a-drawer>

  <a-drawer width="820" title="Editar Formalización RUC 20" v-model:open="open3" placement="right">
    <!-- <EditarFormalizacion10 :info="infoUser" @closeDraw="open2 = false, fetchData()" /> -->
    <EditarFormalizacion20 :info="infoUser" @closeDraw="open3 = false, fetchData()" />
  </a-drawer>

</template>

<script setup>
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import axios from 'axios';
import { makeRequest } from '@/utils/api.js'
import { h, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { message } from 'ant-design-vue';
import Cookies from 'js-cookie';
import { requestNoToken } from '@/utils/noToken.js';
import { useCounterStore } from '@/stores/selectes.js';
import { MoreOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons-vue';
import EditarAsesoria from '@/pages/Asesorias/components/EditarAsesoria.vue';
import EditarFormalizacion10 from '@/pages/Asesorias/components/EditarFormalizacionRUC10.vue';
import EditarFormalizacion20 from '@/pages/Asesorias/components/EditarFormalizacionRUC20.vue';

const dateFormat = 'DD/MM/YYYY';
const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
const infoUser = ref(null);
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
const pageSize = 50;
const valueX = ref(1200)
const valueY = ref(window.innerHeight - 100);
const url = ref('historial/advisories/filters');

const byAsesores = ref([]);
const byDateRange = ref(null);
const solicitante = ref(null);

store.$patch({ asesores: store.asesores });

if (storageRole.some(item => item.id === 1 || item.id === 5)) store.fetchAsesores();

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
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const actualizarAltura = () => {
  valueY.value = window.innerHeight - 360;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});

const columns = ref([]);

const columnsAsesoria = ref([
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'FECHA', dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 130 },
  { title: 'ASESOR', dataIndex: 'asesor', width: 150 },
  // { title: 'SUPERVISOR', dataIndex: 'misupervisor', wdth: 140 },
  //...(storageRole[0].id === 1 ? [{ title: 'SUPERVISOR', dataIndex: 'misupervisor', width: 140 }] : []),
  { title: 'Tipo doc.', dataIndex: 'sol_tipo_doc', width: 60, align: 'center' },
  { title: 'Número de Documento', dataIndex: 'sol_num_doc', width: 100 },
  { title: 'Solicitante Apellidos', dataIndex: 'sol_apellidos', width: 140 },
  { title: 'Solicitante Nombres', dataIndex: 'sol_nombres', width: 140 },
  { title: 'Correo electrónico', dataIndex: 'sol_email', width: 220 },
  { title: 'Celular', dataIndex: 'sol_phone', width: 90, align: 'center' },
  { title: 'Fec. Nac.', dataIndex: 'birthday', width: 90, align: 'center' },
  { title: 'Edad', dataIndex: 'age', width: 70, align: 'center' },
  { title: 'Región', dataIndex: 'mype_region', width: 120 },
  { title: 'Provincia', dataIndex: 'mype_provincia', width: 160 },
  { title: 'Distrito', dataIndex: 'mype_distrito', width: 160 },

  { title: 'Componente', dataIndex: 'componente', width: 180 },
  { title: 'Tema', dataIndex: 'tema_componente', width: 160 },
  { title: 'Modalidad', dataIndex: 'modality', width: 120, align: 'center' },
  { title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }
]);

const columnsRuc10 = ref([
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'FECHA', dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 130 },
  { title: 'ASESOR', dataIndex: 'asesor', width: 150 },
  // ...(storageRole[0].id === 1 ? [{ title: 'SUPERVISOR', dataIndex: 'misupervisor', width: 140 }] : []),
  { title: 'Tipo doc.', dataIndex: 'sol_tipo_doc', width: 60, align: 'center' },
  { title: 'Número de Documento', dataIndex: 'sol_num_doc', width: 100 },
  { title: 'Solicitante Apellidos', dataIndex: 'sol_apellidos', width: 140 },
  { title: 'Solicitante Nombres', dataIndex: 'sol_nombres', width: 140 },
  { title: 'Correo electrónico', dataIndex: 'sol_email', width: 220 },
  { title: 'Celular', dataIndex: 'sol_phone', width: 90, align: 'center' },
  { title: 'Fec. Nac.', dataIndex: 'birthday', width: 90, align: 'center' },
  { title: 'Edad', dataIndex: 'age', width: 70, align: 'center' },
  { title: 'Región', dataIndex: 'mype_region', width: 120 },
  { title: 'Provincia', dataIndex: 'mype_provincia', width: 160 },
  { title: 'Distrito', dataIndex: 'mype_distrito', width: 160 },

  { title: 'Detalle del trámite', dataIndex: 'detalle_tramite', width: 180 },
  { title: 'Sector económico', dataIndex: 'sector_economico', width: 180 },
  { title: 'Actividad comercial', dataIndex: 'atividad_comercial', width: 180 },
  { title: 'Modalidad', dataIndex: 'modality', width: 120, align: 'center' },
  { title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }
]);

const columnsRuc20 = ref([
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'FECHA', dataIndex: 'ase_fecha', fixed: 'left', align: 'center', width: 130 },
  { title: 'ASESOR', dataIndex: 'asesor', width: 150 },
  // ...(storageRole[0].id === 1 ? [{ title: 'SUPERVISOR', dataIndex: 'misupervisor', width: 140 }] : []),
  { title: 'Tipo doc.', dataIndex: 'sol_tipo_doc', width: 60, align: 'center' },
  { title: 'Número de Documento', dataIndex: 'sol_num_doc', width: 100 },
  { title: 'Solicitante Apellidos', dataIndex: 'sol_apellidos', width: 140 },
  { title: 'Solicitante Nombres', dataIndex: 'sol_nombres', width: 140 },
  { title: 'Correo electrónico', dataIndex: 'sol_email', width: 220 },
  { title: 'Celular', dataIndex: 'sol_phone', width: 90, align: 'center' },
  { title: 'Fec. Nac.', dataIndex: 'birthday', width: 90, align: 'center' },
  { title: 'Edad', dataIndex: 'age', width: 70, align: 'center' },
  { title: 'Región del negocio', dataIndex: 'mype_region', width: 140 },
  { title: 'Provincia del Negocio', dataIndex: 'mype_provincia', width: 160 },
  { title: 'Distrito del Negocio', dataIndex: 'mype_distrito', width: 160 },

  { title: 'Direccion del Negocio', dataIndex: 'mype_direccion', width: 230 },
  { title: 'N_RUC', dataIndex: 'ruc', width: 100, align: 'center' },
  { title: 'Nombre de Empresa Constituida', dataIndex: 'mype_nombre', width: 240 },
  { title: 'Régimen', dataIndex: 'tipo_regimen', width: 74, align: 'center' },
  { title: 'Notaría', dataIndex: 'notaria', width: 150 },
  { title: 'Modalidad', dataIndex: 'modality', width: 120, align: 'center' },
  { title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }
]);

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  // console.log("handleSearch", selectedKeys);
  console.log("handleSearch", dataIndex);
}

const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const handleReset = clearFilters => { }
const handleSearchFilter = async () => {
  fetchData(active.value)
}

const handlePaginator = (current) => {
  params.value.page = current;
  fetchData()
}
const formatDate = (dateString) => {
  return dayjs(dateString).format('DD-MM-YYYY HH:mm');
}
const formatDate2 = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
}
const handleNamePaginator = (val) => {
  const types = {
    'asesorias': "Asesorías",
    'ruc10': "Formalizaciones RUC 10",
    'ruc20': "Formalizaciones RUC 20"
  };
  return types[val];
}

const handleDeleteItem = async (val) => {
  try {
    let url = null;

    if (active.value == 'asesorias') url = `advisory/delete/${val.id}`
    if (active.value == 'ruc10') url = `formalization/delete-ruc-10/${val.id}`
    if (active.value == 'ruc20') url = `formalization/delete-ruc-20/${val.id}`

    const data = await makeRequest({ url, method: 'DELETE' });
    fetchData();
    message.success(data.message);
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const handleEditItem = async (val) => {
  try {
    let url = null;

    if (active.value == 'asesorias') url = `advisory/find/${val.id}`
    if (active.value == 'ruc10') url = `formalization/find-ruc-10/${val.id}`
    if (active.value == 'ruc20') url = `formalization/find-ruc-20/${val.id}`

    const data = await makeRequest({ url, method: 'GET' });
    if (data.status == 200) {
      infoUser.value = data.data;
      if (active.value == 'asesorias') open1.value = true;
      if (active.value == 'ruc10') open2.value = true;
      if (active.value == 'ruc20') open3.value = true;
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
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
    if (byAsesores.value) {
      values.idAsesor = byAsesores.value[0]
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
      ...byAsesores.value.length >= 1 && { user_id: byAsesores.value.toString() },
      ...byDateRange.value && { dateStart: dayjs(byDateRange.value[0]).format('YYYY-MM-DD') },
      ...byDateRange.value && { dateEnd: dayjs(byDateRange.value[1]).format('YYYY-MM-DD') },
      ...params.value.page != 0 && { page: params.value.page }
    }

    if (active.value == 'asesorias') columns.value = columnsAsesoria.value

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

      .rango,
      .asesor {
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
    border: 1px solid #ddd;
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

.hdactive {
  background-color: #00a6db;
  color: #fff;
  border-color: #00a6db !important;
}
</style>

<style lang="scss">
.ant-popconfirm-message-title {
  width: 150px;
}

.ant-popconfirm-buttons {
  text-align: center;
}

.table-historial {
  tr {
    font-size: 13px;
  }
}

.table-historial {
  .ant-table-row {

    .ant-table-cell:nth-child(3),
    .ant-table-cell:nth-child(4) {
      text-transform: uppercase;
    }

    .ant-table-cell:nth-child(3) {
      background-color: #feffe3 !important;
    }

    .ant-table-cell:nth-child(4) {
      // background-color: #e6fff4 !important;
    }
  }
}

.asesorias-search {
  button {
    background-color: #cf1322;
  }
}

.btn-excel {
  background-color: #209e62;
  border-color: #249157 !important;

  &:hover {
    background-color: #0f7840 !important;
  }
}
</style>