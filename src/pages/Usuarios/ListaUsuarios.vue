<template>
  <div id="components-table-demo-size">
  
    <h3>Lista de usuarios</h3>

    <!-- <div class="wrapper-search">
      <a-button>
        <template #icon>
          <DownloadOutlined />
        </template>
        Exportar en excel
      </a-button>
      <span />
      <a-input-search
      v-model:value="dataToSearch"
      placeholder="Buscar"
      enter-button
      @search="handleSearch"/>
    </div> -->

    <a-table 
    bordered
    class="ant-table-striped"
    :scroll="{ x: valueX, y: valueY }"
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
            <a-tag color="error">Inactivo</a-tag>
          </template>
        </template>

        <template v-if="column.dataIndex == 'actions'">
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
        </template>
      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small"  :total="total" :pageSize="20"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <a-modal ok-text="Cambiar contraseña" v-model:open="open" title="Actualizar contraseña" @ok="handleChangePassword">
    <a-form 
      layout="vertical"
      :model="formState" 
      name="basic" 
      autocomplete="off">
      <a-form-item label="Contraseña" name="password">
        <a-input v-model:value="formState.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, reactive, h } from 'vue';
import { MoreOutlined,DownloadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const valueY = ref('60vh')
// const dataToSearch = ref('')
const open = ref(false);
const total = ref(0)
const idUserSelected = ref(null)

const formState = reactive({
  password: ''
});

const params = ref({
  page: 1
})

const columns = [
  { title: 'Nombres',         dataIndex: 'nombres', fixed: 'left', width: 160 },
  { title: 'Apellidos',       dataIndex: 'apellidos', fixed: 'left', width: 160},
  { title: 'N° documento',    dataIndex: 'nro_documento', align: 'center', width: 150},
  { title: 'Usuario',         dataIndex: 'usuario', align: 'center', width: 120},
  { title: 'Correo',          dataIndex: 'correo', width: 180},
  { title: 'Celular',         dataIndex: 'celular', align: 'center', width: 120},
  { title: 'Tipo de usuario', dataIndex: 'tipo_usuario', align: 'center', width: 150},
  { title: 'Estado',          dataIndex: 'estado', align: 'center', width: 130},
  { title: '',                dataIndex: 'actions', width: 55}
];


// const handleSearch = (searchValue) => {
//   console.log(searchValue);
// }
const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/users', method: 'GET', params:params.value });
    dataSource.value = data
    total.value = data.total;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const handleOpenModal = (id) => {
  open.value = true;
  idUserSelected.value = id;
};

const handleChangePassword = async() => {
  if(!formState.password) {
    return message.error('El campo contraseña esta vacío');
  }

  const id = idUserSelected.value

  const data = {
    new_password: formState.password
  }
  
  const response = await makeRequest({ url: `/user/change-password/${id}`, method: 'PUT', data: data });

  if(response.message) {
    formState.password = ''
    message.success(response.message);
  }

  open.value = false;
};

onMounted(
  fetchData
);
</script>

<style>
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

</style>
