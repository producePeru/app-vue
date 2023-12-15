<template>
  <div>
    <h3>USUARIOS</h3>

    <div class="filters">
      <router-link to="nuevo-usuario">
        <a-button type="primary" @click="handleOpenModal">
          NUEVO USUARIO
        </a-button>
      </router-link>
    </div>

  
    <a-table 
    bordered
    class="ant-table-striped"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record}">
        <template v-if="column.dataIndex == 'lastNames'">
          {{ record.lastName }} {{ record.middleName }}
        </template>

        <template v-if="column.dataIndex == 'gender'">
          <template v-if="record.gender == 'h'">
            <a-tag color="blue">Hombre</a-tag>
          </template>
          <template v-else>
            <a-tag color="pink">Mujer</a-tag>
          </template>
        </template>

        <template v-if="column.dataIndex == 'is_disabled'">
          <template v-if="record.activo != 1">
            <a-tag color="success">Activo</a-tag>
          </template>
          <template v-else>
            <a-tag color="error">Inactivo</a-tag>
          </template>
        </template>

        <!-- <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditExponent(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a>Eliminar</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template> -->
      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="total" :pageSize="20"  @change="handlePaginator" :showSizeChanger="false" />
  </div>



</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, computed, h } from 'vue';
import AgregarExpositor from './components/AgregarExpositor.vue'
import { MoreOutlined,DownloadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const valueY = ref(80000)
const open = ref(false);
const total = ref(0)
const isIdUpdate = ref(null);

const params = ref({
  page: 1
})

const columns = [
  { title: 'Nombres',             dataIndex: 'name', fixed: 'left', width: 40 },
  { title: 'Apellidos',           dataIndex: 'last_name', fixed: 'left', width: 50},
  // { title: 'RUC',                 dataIndex: 'rucNumber', align: 'center', width: 40},
  // { title: 'Tipo documento',      dataIndex: 'documentType', align: 'center', width: 30},
  { title: 'N° documento',        dataIndex: 'document_number', align: 'center', width: 40},
  { title: 'Correo electrónico',  dataIndex: 'email', width: 60},
  { title: 'Celular',             dataIndex: 'phone_number', align: 'center', width: 20},
  // { title: 'Especialidad',        dataIndex: 'specialty', align: 'center', width: 40},
  { title: 'Género',              dataIndex: 'gender', align: 'center', width: 30},
  // { title: 'Estado',           dataIndex: 'is_disabled', align: 'center', width: 50},
  // { title: '',                    dataIndex: 'actions', align: 'center', width: 15}
];

const refreshTable = (val) => {
  if(val) fetchData()
}

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const handleEditExponent = async(val) => {
  try {
    const data = await makeRequest({ url: `/exponents/${val.id}`, method: 'GET' });
    isIdUpdate.value = data.data
    open.value = true;
  } catch (error) {
    console.error('Error de red:', error);
    message.warning("Error de red");
  } 
}

const handleOpenModal = () => {
  isIdUpdate.value = null
  open.value = true;
};


const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/users', method: 'GET', params:params.value });
    dataSource.value = data.users.data
    total.value = data.users.total;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(
  fetchData
);
</script>

<style>
.filters {
  margin: 1rem 0;
}
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

</style>

