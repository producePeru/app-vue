<template>
  <div>
  
    <h3>Expositores</h3>

    <div class="filters">
      <a-button type="primary" @click="handleOpenModal">Agregar expositor</a-button>
    </div>
    



    <a-table 
    bordered
    class="ant-table-striped"
    :scroll="{ y: handleScrollY }"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record}">
        <template v-if="column.dataIndex == 'tipo_usuario'">
          <template v-if="record.tipo_usuario == 'Admin'">
            <a-tag :bordered="false" color="processing">Administrador</a-tag>
          </template>
          <template v-if="record.tipo_usuario == 'Invitado'">
            <a-tag :bordered="false" color="magenta">Invitado</a-tag>
          </template>
          <template v-if="record.tipo_usuario === 3">
            <a-tag :bordered="false" color="purple">3</a-tag>
          </template>
          <template v-if="record.tipo_usuario === 4">
            <a-tag :bordered="false" color="warning">4</a-tag>
          </template>
          <template v-if="record.tipo_usuario === 5">
            <a-tag :bordered="false" color="cyan">5</a-tag>
          </template>
        </template>
        
        <template v-if="column.dataIndex == 'estado'">
          <template v-if="record.activo == 1">
            <a-tag color="success">Activo</a-tag>
          </template>
          <template v-else>
            <a-tag color="error">Hombre</a-tag>
          </template>
        </template>

        <!-- <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a-button @click.prevent shape="circle" size="small" :icon="h(MoreOutlined)" />
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">Editar</a-menu-item>
                <a-menu-item key="2">Dar de baja / Activar</a-menu-item>
                <a-menu-item key="3" @click="handleOpenModal(record.id)"> Actualizar clave</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template> -->
      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small"  :total="total" :pageSize="20"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <AgregarExpositor :open="open" @handleCloseModal="open = false"/>
  
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, reactive, h, computed  } from 'vue';
import { MoreOutlined,DownloadOutlined } from '@ant-design/icons-vue';
import AgregarExpositor from './components/AgregarExpositor.vue'
import dataFake from '@/utils/fake.js'

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const valueY = ref(null)
// const dataToSearch = ref('')
const open = ref(false);
const total = ref(0)
const idUserSelected = ref(null)


const params = ref({
  page: 1
})

const columns = [
  { title: 'Nombres',             dataIndex: 'nombres', fixed: 'left', width: 160 },
  { title: 'Apellidos',           dataIndex: 'apellidos', fixed: 'left', width: 160},
  { title: 'RUC',                 dataIndex: 'usuario', align: 'center', width: 120},
  { title: 'Tipo documento',      dataIndex: 'apellidos', width: 160},
  { title: 'N° documento',        dataIndex: 'nro_documento', align: 'center', width: 150},
  { title: 'Correo electrónico',  dataIndex: 'correo', width: 180},
  { title: 'Celular',             dataIndex: 'celular', align: 'center', width: 120},
  { title: 'Especialidad',        dataIndex: 'tipo_usuario', align: 'center', width: 150},
  { title: 'Sexo',                dataIndex: 'estado', align: 'center', width: 130},
  // { title: '',                dataIndex: 'actions', width: 55}
];

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

// const fetchData = async() => {
//   try {
//     loading.value = true;
//     const data = await makeRequest({ url: '/users', method: 'GET', params:params.value });
//     dataSource.value = data
//     total.value = data.total;
//   } catch (error) {
//     console.error('Error de red:', error);
//   } finally {
//     loading.value = false;
//   }
// }

const fetchData = () => {
  dataSource.value = dataFake
}




const handleOpenModal = () => {
  open.value = true;
};
const handleCloseModal = () => {

  console.log("8a8a8a8a8a");
  // open.value = false;
};

const handleScrollY = computed(() => {
  return console.log("IISISISII")
})

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

