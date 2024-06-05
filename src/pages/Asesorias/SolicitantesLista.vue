<template>
  <div>
    <h3 class="title-produce">SOLICITANTES</h3>
 
    <a-form layout="inline" :model="formState" @finish="handleFinish" class="form-filter">
      <a-form-item>
        <a-input v-model:value="formState.names" placeholder="BUSCAR por Nombres o Apellidos" style="width: 240px;" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="formState.names === ''">
          BUSCAR
        </a-button>
      </a-form-item>
    </a-form>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" class="ant-table-striped" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex == 'tdocument'">
          

          <a-tag :color="handleColorDocument(record.typedocument.avr)">{{ record.typedocument.avr }} </a-tag>

          <!-- <a-tag :color="record.typedocument.name == 'DNI' ? 'green' : 'blue'">{{ record.typedocument.name == 'DNI' ? 'DNI' : 'CE' }}</a-tag> -->
        </template>


        <template v-if="column.dataIndex == 'apellidos'">
          {{ record.lastname }} {{ record.middlename }}
        </template>
        <template v-if="column.dataIndex == 'city'">
          {{ record.city?.name }}
        </template>
        <template v-if="column.dataIndex == 'province'">
          {{ record.province?.name }}
        </template>
        <template v-if="column.dataIndex == 'district'">
          {{ record.district?.name }}
        </template>
        <template v-if="column.dataIndex == 'gender'">
          {{ record.gender?.name }}
        </template>
        <template v-if="column.dataIndex == 'sickx'">
          <a-tag :color="record.sick == 'no' ? 'blue' : 'pink'">{{ record.sick == 'no' ? 'NO' : 'SI' }}</a-tag>
        </template>

        <template v-if="column.dataIndex == 'registerby'">
          <span class="uppercase">{{ record.user[0]?.profile.name }} {{ record.user[0]?.profile.lastname }} {{ record.user[0]?.profile.middlename }} </span>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditSolicitante(record)">Editar</a>
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
  </div>

  <div class="paginator-asesories">
    <span><a-tag color="blue"><b>{{ total }} </b></a-tag>Solicitantes</span>
    <a-pagination size="small" :total="total" :pageSize="pageSize"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <a-drawer
    width="600"
    v-model:open="open"
    class="draw-notary"
    root-class-name="root-class-name"
    title="Datos del solicitante"
    placement="right">
    <SolicitanteEditar @closeDraw="handleCloseDrawopen" :updateValues="updateValues" />
  </a-drawer>
</template>

<script setup>
import { ref, onMounted, h, onBeforeUnmount, computed, reactive } from 'vue';
import SolicitanteEditar from './components/DrawerSolicitante.componente.vue';
import { LinkOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { requestNoToken } from '@/utils/noToken.js';
import { MoreOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';
import { Modal } from 'ant-design-vue';

const storageData = JSON.parse(localStorage.getItem('profile'))
const store = useCounterStore();
// store.$patch({ cities: store.cities });
// store.fetchCities();

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', fixed: 'left', dataIndex: 'idx', align: 'center', width: 70 },
  { title: 'TIPO DOCUMENTO', fixed: 'left', dataIndex: 'tdocument', align: 'center', width: 140 },
  { title: 'NUM. DOC', dataIndex: 'documentnumber', fixed: 'left', width: 120 },
  { title: 'NOMBRES', dataIndex: 'name', width: 170 },
  { title: 'APELLIDOS', dataIndex: 'apellidos', width: 170 },
  { title: 'REGIÓN', dataIndex: 'city', align: 'center', width: 150 },
  { title: 'PROVINCIA', dataIndex: 'province', align: 'center', width: 150 },
  { title: 'DISTRITO', dataIndex: 'district', align: 'center', width: 150 },
  { title: 'CELULAR', dataIndex: 'phone', align: 'center', width: 150 },
  { title: 'EMAIL', dataIndex: 'email', width: 200 },
  { title: 'GÉNERO', dataIndex: 'gender', align: 'center', width: 90 },
  { title: 'DISCAPACIDAD', dataIndex: 'sickx', align: 'center', width: 120 },
  { title: 'REGISTRADO POR', dataIndex: 'registerby', width: 200 },
  { title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right'}
];
const formState = reactive({
  names: '',
});

const total = ref(0);
const pageSize = 100;
const params = ref({ page: 0 });
const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const open = ref(false);
const updateValues = ref(null);
const city = ref(null);

const handleColorDocument = (type) => {
  const colors = {
    'DNI': 'blue',
    'CE': 'yellow',
    'PAS': 'red',
    'PTP': 'purple'
  }
  return colors[type]
}

const handleFinish = () => {
  fetchData(formState.names);
};
const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}
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
  valueY.value = window.innerHeight - 280;
};
const showDrawer = () => {
  updateValues.value = null;
  open.value = true;
};
const handleCloseDrawopen = () => {
  fetchData();
  open.value = false;
}
const handleDeleteNotary= async(val) => {
  try {
    const data = await makeRequest({ url: `person/delete/${val.id}`, method: 'DELETE' });
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
const handleEditSolicitante = (data) => {
  updateValues.value = data
  open.value = true;
}
const computeIndex = computed(() => (index) => {
  let numb = params.value.page == 0 ? 1 : params.value.page
  return  (numb - 1) * pageSize + index + 1;
});

const fetchData = async (search) => {
  try {
    loading.value = true;

    let parx;             // 🚩

    if(search){
      parx = { ...formState.names && {search: search}, page: 1 }
    } else {
      parx = {...params.value.page != 0 && {page: params.value.page}}
    }

    const data = await makeRequest({ url: `person/list`, method: 'GET', params:parx });
    dataSource.value = data.data
    total.value = data.total
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
.form-filter {
  display: flex;
  justify-content: flex-end;
  margin: .5rem 0 1rem 0;
}
.paginator-asesories {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
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

<style scoped>
[data-doc-theme='light'] .ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
[data-doc-theme='dark'] .ant-table-striped :deep(.table-striped) td {
  background-color: rgb(29, 29, 29);
}
</style>