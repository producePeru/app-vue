<template>
  <div>
    <h3>NOTARÍAS</h3>

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
        
        <template v-if="column.dataIndex == 'departamento'">
          {{ record.departament?.descripcion }}
        </template>
        <template v-if="column.dataIndex == 'provincia'">
          {{ record.province?.descripcion }}
        </template>
        <template v-if="column.dataIndex == 'distrito'">
          {{ record.district?.descripcion }}
        </template>
        <template v-if="column.dataIndex == 'ahorro'">
          {{ record.normal_rate - record.social_rate }}
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
                <a-menu-item>
                  <a-popconfirm title="¿Deseas eliminar?" @confirm="handleDelete(record)">
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
import ModalSupervisor from './components/ModalNotarias.vue'
import { MoreOutlined,QuestionCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const open = ref(false);
const total = ref(0)
const isIdUpdate = ref(null);
const params = ref({ page: 1 })

const columns = [
  { title: 'Nombre',             dataIndex: 'name', fixed: 'left', width: 220 },
  { title: 'Departamento',       dataIndex: 'departamento', width: 140},
  { title: 'Provincia',          dataIndex: 'provincia', width: 140},
  { title: 'Distrito',           dataIndex: 'distrito', width: 140},
  { title: 'Dirección',          dataIndex: 'address', width: 200},
  { title: 'Tarífa Normal',      dataIndex: 'normal_rate', align: 'center', width: 120},
  { title: 'Tarífa Social',      dataIndex: 'social_rate', align: 'center', width: 120},
  { title: 'Ahorro',             dataIndex: 'ahorro', align: 'center', width: 120},
  { title: '',                   dataIndex: 'actions', align: 'center', width: 50}
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
    const data = await makeRequest({ url: `/notary/${val.id}`, method: 'GET' });
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
const handleDelete= async(val) => {
  try {
    const data = await makeRequest({ url: `/notary-delete/${val.id}`, method: 'PUT' });
    fetchData()
    message.success(data.message);
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/notaries', method: 'GET', params:params.value });
    dataSource.value = data.data
    total.value = data.total;
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
.ant-popover-inner {
  width: 200px;
}
</style>