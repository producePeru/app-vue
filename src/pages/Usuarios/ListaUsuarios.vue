<template>
  <div>
    <h3>USUARIOS</h3>

    <div class="filters" >
      <router-link to="nuevo-usuario">
        <a-button type="primary">
          NUEVO 
        </a-button>
      </router-link>
    </div>

    <!-- <br v-else> -->

    <a-table 
    bordered
    class="ant-table-striped"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record}">
        <template v-if="column.dataIndex == 'apellidos'">
          {{ record.last_name }} {{ record.middle_name }}
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

        <template v-if="column.dataIndex == 'rol'">
          <a-tag color="default" v-if="record.role == 'super'">{{ record.role }}</a-tag>
          <a-tag color="processing" v-if="record.role == 'admin'">{{ record.role }}</a-tag>
          <a-tag color="success" v-if="record.role == 'usuario'">{{ record.role }}</a-tag>
          <a-tag color="warning" v-if="record.role == 'invitado'">{{ record.role }}</a-tag>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <div v-if="record.role != 'super'">
              <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click.prevent>
                <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="handleEditUser(record)">Editar</a>
                  </a-menu-item>
                  <!-- <a-menu-item>
                    <a @click="handleVistas(record)">Vistas</a>
                  </a-menu-item> -->
                  <a-menu-item>
                    <a-popconfirm title="¿Eliminar?" @confirm="handleDeleteUser(record)">
                      <template #icon><question-circle-outlined style="color: red" /></template>
                      <a>Eliminar</a>
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
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
import { useRouter } from 'vue-router';
import { MoreOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const storageData = JSON.parse(localStorage.getItem('user'))

const router = useRouter();
const dataSource = ref([])
const loading = ref(false)
const total = ref(0)
const params = ref({ page: 1 })

const userRole = ref(null);

const columns = ref([
  { title: 'Nombres',             dataIndex: 'name', fixed: 'left', width: 60 },
  { title: 'Apellidos',           dataIndex: 'apellidos', fixed: 'left', width: 50},
  { title: 'N° documento',        dataIndex: 'document_number', align: 'center', width: 40},
  { title: 'ROL',                 dataIndex: 'rol', align: 'center', width: 35},
  { title: 'Correo electrónico',  dataIndex: 'email', width: 60},
  { title: 'Celular',             dataIndex: 'phone_number', align: 'center', width: 20},
  { title: 'Género',              dataIndex: 'gender', align: 'center', width: 20},
  { title: '',                    dataIndex: 'actions', align: 'center', width: 30 }
]);


const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}
const handleEditUser = async(val) => {
  router.push(`/admin/usuarios/actualizar-usuario/${val.document_number}`);
}
const handleVistas = async(val) => {
  const query = {
    dni: val.document_number
  }
  router.push({ name: 'usuario-vistas', query });
}
const handleDeleteUser = async(val) => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `delete-user/${val.id}`, method: 'POST', data: {id: storageData.id} });
    message.success(data.message)
    fetchData()
  } catch (error) {
    // console.error('Error de red:', error.response.data.message);
    message.error(error.response.data.message)
  } finally {
    loading.value = false;
  }
};


const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/users', method: 'GET', params:params.value });
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

