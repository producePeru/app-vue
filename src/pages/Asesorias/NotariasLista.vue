<template>
  <div class="all-notary">
    <h3 class="title-produce">NOTARÍAS</h3>
    <div class="filters-notary">
      
      <div class="filters-center-produce">
        <a-button style="margin-right: 1rem;" type="primary" @click="showDrawer">AGREGAR</a-button>
        <router-link to="/notarias" target="_blank">
          <LinkOutlined />
        </router-link>
      </div>

      <div class="filters-produce" >
        <div>
          <label>Buscar por Nombre de Notaría</label>
          <a-input v-model:value="filterName" />
        </div>

        <div>
          <label>Buscar Notarías por REGIÓN</label>
          <a-select placeholder="Buscar por Provincia" v-model:value="filterCity" show-search :options="store.cities" :filter-option="filterOption" />
        </div>
        <a-button @click="fetchData">BUSCAR</a-button>
      </div>

    </div>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" class="ant-table-striped" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ index + 1 }}
        </template>
        <template v-if="column.dataIndex == 'lastName'">
          {{ record.last_name }} {{ record.middle_name }}
        </template>
        <template v-if="column.dataIndex == 'departamento'">
          {{ record.city?.name }}
        </template>
        <template v-if="column.dataIndex == 'province'">
          {{ record.province?.name }}
        </template>
        <template v-if="column.dataIndex == 'distrite'">
          {{ record.district?.name }}
        </template>
        <template v-if="column.dataIndex == 'namenotary'">
          {{ record.name }}
        </template>
        <template v-if="column.dataIndex == 'pricex'">
          <div ref="divRef" class="gastos">
            <div v-html="record.price" class="style-price"></div>
          </div>
        </template>
        <template v-if="column.dataIndex == 'pricedescriptionx'">
          <div>
            <div v-html="record.conditions" class="style-conditions"></div>
          </div>
        </template>
        <template v-if="column.dataIndex == 'socio'">
          <div v-html="record.sociointerveniente" class="style-contact"></div>
        </template>
        <template v-if="column.dataIndex == 'bio'">
          <div v-html="record.biometrico" class="style-contact"></div>
        </template>
        <template v-if="column.dataIndex == 'contact'">
          <div v-html="record.infocontacto" class="style-contact"></div>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditNotary(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDeleteNotary(record)">
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

    <a-drawer v-model:open="open" class="draw-notary" root-class-name="root-class-name" title="Datos de la notaría" width="600"
      placement="right" @after-open-change="afterOpenChange">
      <formAddNotary @closeDraw="handleCloseDrawopen" :updateNotary="updateNotary" />
    </a-drawer>
  </div>
</template>


<script setup>
import { ref, onMounted, h, onBeforeUnmount } from 'vue';
import formAddNotary from './components/DrawerNotaria.componente.vue';
import { LinkOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { requestNoToken } from '@/utils/noToken.js';
import { MoreOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';

const storageRole = JSON.parse(localStorage.getItem('role'))
const store = useCounterStore();
store.$patch({ cities: store.cities });
store.fetchCities();

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'NOTARIA', fixed: 'left', dataIndex: 'namenotary', align: 'center', width: 120 },
  { title: 'REGIÓN', fixed: 'left', dataIndex: 'departamento', align: 'center', width: 100 },
  { title: 'PROVINCIA', fixed: 'left', dataIndex: 'province', align: 'center', width: 100 },
  { title: 'DISTRITO', fixed: 'left', dataIndex: 'distrite', width: 130, align: 'center' },
  { title: 'DIRECCION', dataIndex: 'address', align: 'center', width: 160 },
  { title: 'GASTOS NOTARIALES', dataIndex: 'pricex', align: 'center', width: 300 },
  { title: 'CONDICIONES', dataIndex: 'pricedescriptionx', align: 'center', width: 260 },
  { title: 'SOCIO O INTERVINIENTE', dataIndex: 'socio', align: 'center', width: 200 },
  { title: 'BIOMETRICO', dataIndex: 'bio', align: 'center', width: 150 },
  { title: 'DATOS DE CONTACTO', dataIndex: 'contact', align: 'center', width: 260 },
  ...(storageRole[0].id === 3 || storageRole[0].id === 1 ? [{ title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }] : [])

];

const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const open = ref(false);
const updateNotary = ref(null);
const city = ref(null);
const filterName = ref(null);
const filterCity = ref(null);

const handleSearchFilters = async () => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `public/notaries/${city.value}`, method: 'GET' });
    dataSource.value = data.data
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const actualizarAltura = () => {
  valueY.value = window.innerHeight - 270;
};
const afterOpenChange = bool => {
  console.log('open', bool);
};
const showDrawer = () => {
  updateNotary.value = null;
  open.value = true;
};
const handleCloseDrawopen = () => {
  fetchData();
  open.value = false;
  city.value = null;
}
const handleDeleteNotary = async (val) => {
  try {
    const data = await makeRequest({ url: `notary/delete/${val.id}`, method: 'DELETE' });
    if (data) {
      fetchData();
      message.success(data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const handleEditNotary = (data) => {
  updateNotary.value = data
  open.value = true;
}

const fetchData = async () => {
  try {
    loading.value = true;

    const values = {
      ...filterName.value && {name: filterName.value},
      ...filterCity.value && {city_id: filterCity.value}
    }

    const data = await requestNoToken({ 
      url: 'public/notaries-filters', 
      method: 'GET',
      params: values
    });
    
    dataSource.value = data.data

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});
onMounted(() => {
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
  fetchData();
});
</script>

<style lang="scss">
.ant-popover-inner {
  width: 200px;
}

.filters-notary {
  margin: .6rem 0 1rem 0;
  display: flex;
  justify-content: space-between;

  .ant-select {
    width: 100%;
  }
}

.ant-drawer-content-wrapper {
  // min-width: 550px !important;
  // width: 100%;
}

.quill-editor {
  .ql-editor {
    height: 100px;
  }
}

.custom-content {
  height: 100%;
  overflow: auto;
  outline: 1px solid red;
}


</style>

<style lang="scss">
.all-notary {

  table th,
  table td {
    border: 1px solid #444444;
  }

  .ant-table-thead {
    .ant-table-cell:nth-child(1),
    .ant-table-cell:nth-child(2),
    .ant-table-cell:nth-child(3),
    .ant-table-cell:nth-child(4),
    .ant-table-cell:nth-child(5),
    .ant-table-cell:nth-child(6),
    .ant-table-cell:nth-child(7),
    .ant-table-cell:nth-child(8),
    .ant-table-cell:nth-child(9),
    .ant-table-cell:nth-child(10),
    .ant-table-cell:nth-child(11) {
      background-color: #cfcfcf !important;
      font-size: 13px;
      color: #000;
      border-bottom: 0px solid #333 !important;
      border-inline-end: 0 solid transparent !important;
    }
  }

  .ant-table-row {
    .ant-table-cell:nth-child(2) {
      font-size: 13px;
      font-weight: 700;
    }
    .ant-table-cell:nth-child(3),
    .ant-table-cell:nth-child(4),
    .ant-table-cell:nth-child(5) {
      background-color: #efefef !important;
      font-size: 13px;
      font-weight: 700;
    }
  }
  .ant-table-row {
    .ant-table-cell:nth-child(6) {
      background-color: #fffbd6 !important;
    }
    .ant-table-cell:nth-child(6), .ant-table-cell:nth-child(7) {
      position: relative;
      
    }
  }
  .ant-table-row {
    .ant-table-cell:nth-child(1), .ant-table-cell:nth-child(2) {
      background-color: #cfe2f3 !important;
    }
   

    
  }

  .ant-table-row {

    .ant-table-cell:nth-child(10), .ant-table-cell:nth-child(11) {
      font-size: 13px;
      line-height: 1.2;
    }
  }
}

.style-price {

  h1 strong,
  h2 strong {
    font-size: 16px;
    font-weight: 700;
  }

  strong {
    font-weight: 500;
    font-size: 12px;
  }
}

.style-conditions {

  h1 strong,
  h2 strong {
    font-size: 13px;
  }
}

.style-price,
.style-conditions {

  h1 strong,
  h2 strong {
    // outline: 1px solid red;
    width: 100%;
    display: block;
    height: 20px;
  }

  strong {
    // outline: 1px solid green;
    width: 100%;
    display: block;
    // height: 20px;
  }
}

.style-contact {
  p {
    margin: 4px;
  }

  p strong {
    font-weight: 500;
    font-size: 13px;
    display: block;
  }
}
</style>