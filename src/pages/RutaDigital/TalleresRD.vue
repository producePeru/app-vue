<template>
  <div>
  
    <h3>Talleres de Ruta Digital</h3>

    <div class="filters">
      <a-button type="primary" @click="handleOpenModal">Nuevo taller</a-button>
    </div>
    

    <a-table 
    bordered
    class="ant-table-striped"
    :scroll="{ x: valueX }"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record}">
        <template v-if="column.dataIndex == 'test_in'">
          <template v-if="!record.id_in_test">
            <a-button size="small" @click="handleCreateInTest(record)">Crear</a-button>
          </template>
          <template v-if="record.id_in_test">
            <a-button type="link">
              <router-link to="/test-entrada">Link</router-link>
            </a-button >
            <EditOutlined @click="handleEditInTest" />
          </template>
        </template>
        <template v-if="column.dataIndex == 'test_out'">
          <template v-if="!record.id_output_test">
            <a-button size="small" @click="handleCreateOutTest(record)">Crear</a-button>
          </template>
          <template v-if="record.id_output_test">
            <a-button type="link">
              <router-link to="/test-salida">Link</router-link>
            </a-button>
            <EditOutlined @click="handleEditEndTest" />
          </template>
        </template>


        <template v-if="column.dataIndex == 'invitation'">
          <template v-if="!record.id_invitation">
            <a-button size="small" @click="handleInvitationForm('create',)">Crear</a-button>
          </template>
          <template v-if="record.id_invitation">
            <a-button type="link">
              <router-link to="/invitacion">Link</router-link>
            </a-button>
            <EditOutlined  @click="handleInvitationForm('edit', 3)" />
          </template>
        </template>


        
        <template v-if="column.dataIndex == 'status'">
          <template v-if="record.status == 'En proceso'">
            <a-tag :bordered="false" color="success">En proceso</a-tag>
          </template>
          <template v-if="record.status == 'Finalizado'">
            <a-tag :bordered="false" color="error">Finalizado</a-tag>
          </template>
          <template v-if="record.status == 'Cancelado'">
            <a-tag :bordered="false" color="warning">Cancelado</a-tag>
          </template>
        </template>
        <template v-if="column.dataIndex == 'link_sala'">
          <VideoCameraOutlined v-if="record.link" class="pointer" :style="{fontSize: '16px', color: '#08c'}" />
        </template>
        <template v-if="column.dataIndex == 'details'">
          <a-button size="small" @click="handleShowDetails">Ver detalles</a-button>
        </template>

        <template v-if="column.dataIndex == 'options'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu @click="handleOptionsSelect">
                <a-menu-item key="0">
                  <a>Editar</a>
                </a-menu-item>
                <a-menu-item key="1">
                  <a>Cancelar</a>
                </a-menu-item>
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

  <NuevoTaller :open="open" @handleCloseModal="open = false"/>


  <a-modal v-model:open="modalInvitation" :title="`${titleInvitation} invitación`" @ok="handleOkCancelWorkshop" width="400px">
    <a-form :model="formStateInvitation" layout="vertical">
      <a-form-item label="Texto 1">
        <a-textarea v-model:value="formState.text1" />
      </a-form-item>
      <a-form-item label="Texto 2">
        <a-textarea v-model:value="formState.text2" />
      </a-form-item>
    </a-form>
  </a-modal>



  <a-modal v-model:open="modalCancel" title="Cancelar taller" @ok="handleOkCancelWorkshop" width="400px">
    <a-form :model="formState" layout="vertical">
      <a-form-item label="Especificar motivo de la cancelación del taller">
        <a-textarea v-model:value="formState.reason" />
      </a-form-item>
    </a-form>
  </a-modal>
  
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, reactive, h } from 'vue';
import { EditOutlined,VideoCameraOutlined,MoreOutlined,DownloadOutlined } from '@ant-design/icons-vue';
import NuevoTaller from './components/NuevoTaller.vue'
import dataFake from '@/utils/fake.js'
import { useRouter } from 'vue-router';


const router = useRouter();
const dataSource = ref([])
const loading = ref(false)
const valueX = ref(1000)
const valueY = ref('60vh')
// const dataToSearch = ref('')
const open = ref(false);
const total = ref(0)
const idUserSelected = ref(null)
const modalCancel = ref(false);
const modalInvitation = ref(false);
const titleInvitation = ref('Crear');



const params = ref({
  page: 1
})

const columns = [
  { title: 'Nombre taller',       dataIndex: 'title', fixed: 'left', width: 190 },
  { title: 'Expositor',           dataIndex: 'expositor', width: 170},
  { title: 'Fecha taller',        dataIndex: 'date_workshop', align: 'center', width: 160},
  { title: 'Intervención',        dataIndex: 'nro_documento', align: 'center', width: 100},
  { title: 'T. Entrada',          dataIndex: 'test_in', align: 'center', width: 80},
  { title: 'T. Salida',           dataIndex: 'test_out', align: 'center', width: 80},
  { title: 'Invitación',          dataIndex: 'invitation', align: 'center', width: 80},
  { title: 'Estado',              dataIndex: 'status', align: 'center', width: 100},
  { title: 'Inscriptos',          dataIndex: 'number_registered', align: 'center', width: 100},
  { title: 'Link',                dataIndex: 'link_sala', align: 'center', width: 80},
  { title: 'RRSS',                dataIndex: 'rrss', align: 'center', width: 70},
  { title: 'SMS',                 dataIndex: 'sms', align: 'center', width: 70},
  { title: 'Correo',              dataIndex: 'mail', align: 'center', width: 70},
  { title: 'Detalles',            dataIndex: 'details', align: 'center', width: 120},
  { title: '',                    dataIndex: 'options', align: 'center', width: 50}
];

const formState = reactive({
  reason: ''
});

const formStateInvitation = reactive({
  text1: '',
  text2: ''
});

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
const handleInvitationForm = (val, id) => {
  if(val === 'create') {
    titleInvitation.value = 'Crear'
    console.log("crear");
  }

  if(val === 'edit') {
    titleInvitation.value = 'Editar'
    console.log('edit', id);
  }
  modalInvitation.value = true
}
const handleOpenModal = () => {
  open.value = true;
};
const handleCreateInTest = (val) => {
  const id = 1
  router.push(`talleres/test-entrada/${id}`);
}
const handleEditInTest = (val) => {
  const id = 1
  router.push(`talleres/editar-test-entrada/${id}`);
}
const handleEditEndTest = (val) => {
  const id = 1
  router.push(`talleres/editar-test-salida/${id}`); 
}
const handleCreateOutTest = (val) => {
  const id = 1
  router.push(`talleres/test-salida/${id}`);
}
const handleShowDetails = (val) => {
  const id = 1
  router.push(`taller-detalle/${id}`);
}
const handleOptionsSelect = (e) => {
  if(e.key == 1) {
    handleOkCancelWorkshop()
  }
}
const handleOkCancelWorkshop = () => {
  modalCancel.value = true;
};

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