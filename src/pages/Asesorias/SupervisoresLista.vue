<template>
  <div>
    <h3>SUPERVISORES</h3>

    <div class="filters">
      <a-button type="primary" @click="handleOpenModal">AGREGAR</a-button>
    </div>
    
    <a-table 
    bordered
    :scroll="{ x: valueX }"
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

        <template v-if="column.dataIndex == 'sex'">
          <template v-if="record.gender == 'h'">
            <a-tag color="blue">Hombre</a-tag>
          </template>
          <template v-else>
            <a-tag color="pink">Mujer</a-tag>
          </template>
        </template>

        <template v-if="column.dataIndex == 'enabled'">
          <a-switch v-model:checked="record.enabled" @change="handleExpositorEnabled(record.id)" :checkedValue="1" :unCheckedValue="0" >
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditExponent(record)">Editar</a>
                </a-menu-item>
                <!-- <a-menu-item>
                  <a>Eliminar</a>
                </a-menu-item> -->
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="total" :pageSize="20"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <ModalSupervisor 
    :open="open" 
    @refreshTable="refreshTable" 
    @handleCloseModal="open = false" 
    :isIdUpdate="isIdUpdate" />

</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, h } from 'vue';
import ModalSupervisor from './components/ModalSupervisor.vue'
import { MoreOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
// const valueY = ref(80000)
const open = ref(false);
const total = ref(0)
const isIdUpdate = ref(null);

const params = ref({
  page: 1
})

const columns = [
  { title: 'Nombres',             dataIndex: 'firstName', fixed: 'left', width: 70 },
  { title: 'Apellidos',           dataIndex: 'lastNames', fixed: 'left', width: 70},
  { title: 'Tipo documento',      dataIndex: 'documentType', align: 'center', width: 70},
  { title: 'N° documento',        dataIndex: 'documentNumber', align: 'center', width: 70},
  { title: 'Departamento',        dataIndex: 'rucNumber', align: 'center', width: 86},
  { title: 'Provincia',           dataIndex: 'email', align: 'center', width: 70},
  { title: 'Distrito',            dataIndex: 'phoneNumber', align: 'center', width: 80},
  { title: 'Correo',              dataIndex: 'specialty', align: 'center', width: 120},
  { title: 'Celular',             dataIndex: 'profession', align: 'center', width: 70},
  { title: 'Habilitado',          dataIndex: 'enabled', align: 'center', width: 70},
  { title: '',                    dataIndex: 'actions', align: 'center', width: 30}
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
const handleExpositorEnabled= async(id) => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `/enabled-disabled/${id}`, method: 'PUT' });
    message.success(data.message);
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/exponents', method: 'GET', params:params.value });
    dataSource.value = data.data
    total.value = data.meta.total;
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

