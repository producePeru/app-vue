<template>
  <div>
    <h3>NOTARÍAS</h3>
    <div class="filters-notary">
      <div>
        <a-button style="margin-right: 1rem;" class="btn-produce" type="primary" @click="showDrawer">AGREGAR</a-button>
        <router-link to="/notarias" target="_blank">
          <LinkOutlined />
        </router-link>
      </div>

      <div>
        <a-select 
        placeholder="Buscar por Provincia"
        style="width: 200px;"
        v-model:value="city" 
        show-search 
        :options="store.cities" 
        :filter-option="filterOption" @change="handleDepartaments" />
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
          <h4 style="font-size: 18px; font-weight: 700;">{{ record.name }}</h4>
        </template>
        <template v-if="column.dataIndex == 'pricex'">
          <div ref="divRef" class="gastos">
            <div v-html="record.price" class="style-price"></div>
          </div>
        </template>
        <template v-if="column.dataIndex == 'pricedescriptionx'">
          <div >
            <div v-html="record.conditions" class="style-conditions"></div>
          </div>
        </template>
        <template v-if="column.dataIndex == 'socio'">
          <div v-html="record.sociointerveniente" class="style-contact" ></div>
        </template>
        <template v-if="column.dataIndex == 'bio'">
          <div v-html="record.biometrico" class="style-contact" ></div>
        </template>
        <template v-if="column.dataIndex == 'contact'">
          <div v-html="record.infocontacto" class="style-contact" ></div>
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
    <a-drawer
      v-model:open="open"
      class="draw-notary"
      root-class-name="root-class-name"
      title="Datos de la notaría"
      placement="right"
      @after-open-change="afterOpenChange">
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

const store = useCounterStore();
store.$patch({ cities: store.cities });
store.fetchCities();

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', fixed: 'left', dataIndex: 'idx', align: 'center', width: 70 },
  { title: 'REGIÓN', dataIndex: 'departamento', fixed: 'left', align: 'center', width: 120 },
  { title: 'PROVINCIA', fixed: 'left', dataIndex: 'province', align: 'center', width: 140 },
  { title: 'DISTRITO', fixed: 'left', dataIndex: 'distrite', width: 140 },
  { title: 'DIRECCION', fixed: 'left', dataIndex: 'address', align: 'center', width: 140 },
  { title: 'NOTARIA', fixed: 'left', dataIndex: 'namenotary', align: 'center', width: 180 },
  { title: 'GASTOS NOTARIALES', dataIndex: 'pricex', align: 'center', width: 280 },
  { title: 'CONDICIONES', dataIndex: 'pricedescriptionx', align: 'center', width: 240 },
  { title: 'SOCIO O INTERVINIENTE ADICIONAL', dataIndex: 'socio', align: 'center', width: 200 },
  { title: 'BIOMETRICO', dataIndex: 'bio', align: 'center', width: 180 },
  { title: 'DATOS DE CONTACTO', dataIndex: 'contact', align: 'center', width: 260 },
  { title: '', dataIndex: 'actions', align: 'center', width: 50, fixed: 'right'}
];

const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const open = ref(false);
const updateNotary = ref(null);
const city = ref(null);

const handleDepartaments = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `notary/list/${city.value}`, method: 'GET' });
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
  valueY.value = window.innerHeight - 260;
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
const handleDeleteNotary= async(val) => {
  try {
    const data = await makeRequest({ url: `notary/delete/${val.id}`, method: 'DELETE' });
    if(data) {
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
    const data = await requestNoToken({ url: 'notary/list', method: 'GET' });
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
  min-width: 550px !important;
  width: 100%;
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
.all-notaries {
  padding: 2rem;
  h1,
  h2 {
    font-weight: 600;
    margin: 0 auto 1rem 0;
    text-align: center;
  }
  h1 {
    color: #0070c0;
  }
  h2 {
    color: #ff0000;
    font-size: 22px;
    margin-bottom: 2rem;
  }
}
</style>