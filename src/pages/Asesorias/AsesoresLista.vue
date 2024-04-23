<template>
  <div>
    <h3>ASESORES</h3>
    <div class="filters-notary">
      <div>
        <!-- <a-button style="margin-right: 1rem;" class="btn-produce" type="primary" @click="showDrawer">AGREGAR</a-button> -->
      </div>
<!-- 
      <div>
        <a-select 
        placeholder="Buscar por Provincia"
        style="width: 200px;"
        v-model:value="city" 
        show-search 
        :options="store.cities" 
        :filter-option="filterOption" @change="handleDepartaments" />
      </div> -->

    </div>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" class="ant-table-striped" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>

        <template v-if="column.dataIndex == 'name'">
          {{ record.asesores.profile.name }} 
        </template>
        <template v-if="column.dataIndex == 'apellidos'">
          {{ record.asesores.profile.lastname }} {{ record.asesores.profile.middlename }}
        </template>
        <template v-if="column.dataIndex == 'documentnumber'">
          {{ record.asesores.profile.documentnumber }}
        </template>
        <template v-if="column.dataIndex == 'phone'">
          {{ record.asesores.profile.phone }}
        </template>
        <template v-if="column.dataIndex == 'birthday'">
          {{ record.asesores.profile.birthday }}
        </template>
       

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <!-- <a-menu-item>
                  <a @click="handleEditSolicitante(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDeleteNotary(record)">
                    <template #icon><question-circle-outlined style="color: red" /></template>
                    <a>Eliminar</a>
                  </a-popconfirm>
                </a-menu-item> -->
              </a-menu>
            </template>
          </a-dropdown>
        </template>

      </template>
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="total" :pageSize="pageSize"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <a-drawer
    v-model:open="open"
    class="draw-notary"
    root-class-name="root-class-name"
    title="Datos del solicitante"
    placement="right"
    @after-open-change="afterOpenChange">
    <SolicitanteEditar @closeDraw="handleCloseDrawopen" :updateValues="updateValues" />
  </a-drawer>

</template>


<script setup>
import { ref, onMounted, h, onBeforeUnmount, computed } from 'vue';
import SolicitanteEditar from './components/DrawerSolicitante.componente.vue';
import { LinkOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { requestNoToken } from '@/utils/noToken.js';
import { MoreOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';

const storageData = JSON.parse(localStorage.getItem('profile'))
const store = useCounterStore();
store.$patch({ cities: store.cities });
store.fetchCities();

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', fixed: 'left', dataIndex: 'idx', align: 'center', width: 70 },
  { title: 'EMAIL', dataIndex: 'email', fixed: 'left', width: 200 },
  { title: 'NOMBRES', dataIndex: 'name', width: 140 },
  { title: 'APELLIDOS', dataIndex: 'apellidos', width: 140 },
  { title: 'NUM. DOC', dataIndex: 'documentnumber', align: 'center', width: 120 },
  { title: 'CELULAR', dataIndex: 'phone', align: 'center', width: 150 },
  { title: 'F.NACIMIENTO', dataIndex: 'birthday', align: 'center', width: 150 },

  // { title: 'PROVINCIA', dataIndex: 'province', align: 'center', width: 150 },
  // { title: 'DISTRITO', dataIndex: 'district', align: 'center', width: 150 },
  // { title: 'GÉNERO', dataIndex: 'gender', align: 'center', width: 120 },
  // { title: 'DISCAPACIDAD', dataIndex: 'sickx', align: 'center', width: 120 },
  // { title: 'REGISTRADO POR', dataIndex: 'contact', align: 'center', width: 260 },
  // { title: '', dataIndex: 'actions', align: 'center', width: 50, fixed: 'right'}
];

const total = ref(0);
const pageSize = 20;
const params = ref({ page: 0 });
const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const open = ref(false);
const updateValues = ref(null);
const city = ref(null);

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
const afterOpenChange = bool => {
  console.log('open', bool);
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
    const data = await makeRequest({ url: `notary/delete/${val.id}`, method: 'DELETE' });
    if(data) {
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

const fetchData = async () => {
  try {
    loading.value = true;
    let parx = params.value.page == 0 ? '' : params.value;

    const data = await makeRequest({ url: `user/list-asesories`, method: 'GET', params:parx });
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
.paginator {
  display: flex;
  justify-content: flex-end;
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