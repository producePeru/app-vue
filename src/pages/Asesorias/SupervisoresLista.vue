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
        
        <template v-if="column.dataIndex == 'lastName'">
          {{ record.last_name }} {{ record.middle_name }}
        </template>
        <template v-if="column.dataIndex == 'departamento'">
          {{ record.department?.descripcion }}
        </template>
        <template v-if="column.dataIndex == 'province'">
          {{ record.province?.descripcion }}
        </template>
        <template v-if="column.dataIndex == 'distrite'">
          {{ record.district?.descripcion }}
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditUser(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Eliminar?" @confirm="handleDeleteUser(record)">
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

</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, h } from 'vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const total = ref(0)
const router = useRouter();
const params = ref({ page: 1 })

const columns = [
  { title: 'Apellidos',           dataIndex: 'lastName', fixed: 'left', width: 200 },
  { title: 'Nombres',             dataIndex: 'name', fixed: 'left', width: 120 },
  { title: 'Tipo documento',      dataIndex: 'document_type', align: 'center', width: 100},
  { title: 'Num. documento',      dataIndex: 'number_document', align: 'center', width: 120},
  { title: 'Departamento',        dataIndex: 'departamento', align: 'center', width: 140},
  { title: 'Provincia',           dataIndex: 'province', align: 'center', width: 140},
  { title: 'Distrito',            dataIndex: 'distrite', align: 'center', width: 140},
  { title: 'Correo',              dataIndex: 'email', width: 180},
  { title: 'Celular',             dataIndex: 'phone', width: 100},
  { title: '',                    dataIndex: 'actions', align: 'center', width: 50}
];

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const handleEditUser = (data) => {
  const query = {
    rol: 'supervisor',
    dni: data.number_document,
    access: 1
  }

  router.push({ name: 'actualizar-persona', query });
}

const handleOpenModal = () => {
  const query = {
    rol: 'supervisor',
    access: 1
  }

  router.push({ name: 'registrar-persona', query });

};
const handleDeleteUser= async(val) => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `person-dni/${val.number_document}/1`, method: 'PUT' });
    fetchData();
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
    const data = await makeRequest({ url: '/person/1', method: 'GET', params:params.value });
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

