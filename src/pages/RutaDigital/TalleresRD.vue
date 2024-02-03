<template>
  <div>
  
    <h3>TALLERES DE RUTA DIGITAL</h3>

    <div class="filters">
      <a-button type="primary" @click="handleOpenModal">NUEVO</a-button>
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

        <template v-if="column.dataIndex == 'expositor'">
          {{ record.exponent.first_name }} {{ record.exponent.last_name }} {{ record.exponent.middle_name }}
        </template>

        <template v-if="column.dataIndex == 'type_intervention'">
          <a-tag color="red" v-if="record.type_intervention == 1">Marketing Digital</a-tag>
          <a-tag color="green" v-if="record.type_intervention == 2">Comercio Electrónico</a-tag>
          <a-tag color="blue" v-if="record.type_intervention == 3">Gestión Empresarial</a-tag>
          <a-tag color="purple" v-if="record.type_intervention == 4">Analisis de datos</a-tag>
          <a-tag color="pink" v-if="record.type_intervention == 5">Medios de pago</a-tag>
          <a-tag color="cyan" v-if="record.type_intervention == 6">Finanzas</a-tag>
        </template>

        <template v-if="column.dataIndex == 'test_in'">
          <template v-if="!record.testin_id">
            <a-button size="small" @click="handleCreateInTest(record)">Crear</a-button>
          </template>
          <template v-if="record.testin_id">
            <a-button type="link">
              <router-link :to="`/test-entrada/${record.slug}`">Link</router-link>
            </a-button >
            <EditOutlined @click="handleEditInTest(record)" />
          </template>
        </template>

        <template v-if="column.dataIndex == 'test_out'">
          <template v-if="!record.testout_id">
            <a-button size="small" @click="handleCreateOutTest(record)">Crear</a-button>
          </template>
          <template v-if="record.testout_id">
            <a-button type="link">
              <router-link :to="`/test-salida/${record.slug}`">Link</router-link>
            </a-button>
            <EditOutlined @click="handleEditEndTest(record)" />
          </template>
        </template>

        <template v-if="column.dataIndex == 'invitation_id'">
          <template v-if="!record.invitation_id">
            <a-button size="small" @click="handleInvitationModal('create', record)">Crear</a-button>
          </template>
          <template v-if="record.invitation_id">
            <a-button type="link">
              <router-link :to="`/invitacion/${record.slug}`">Link</router-link>
            </a-button>
            <EditOutlined @click="handleInvitationModal('edit', record)" />
          </template>
        </template>

        <template v-if="column.dataIndex == 'status'">
          <template v-if="record.status == 1">
            <a-tag :bordered="false" color="success">En proceso</a-tag>
          </template>
          <template v-if="record.status == 0">
            <a-tag :bordered="false" color="error">Finalizado</a-tag>
          </template>
          <template v-if="record.status == 2">
            <a-tag :bordered="false" color="warning">Cancelado</a-tag>
          </template>
        </template>
        <template v-if="column.dataIndex == 'link_sala'">
          <a :href="record.link" target="_blank">
            <VideoCameraOutlined v-if="record.link" class="pointer" :style="{fontSize: '16px', color: '#08c'}" />
          </a>
        </template>

        <template v-if="column.dataIndex == 'status'">
          <a-tag v-if="record.status == 'en curso'" :bordered="false" color="success">{{ record.status }}</a-tag>
          <a-tag v-if="record.status == 'finalizado'" :bordered="false" color="volcano">{{ record.status }}</a-tag>
        </template>

        <template v-if="column.dataIndex == 'details'">
          <a-button size="small" @click="handleShowDetails(record)">Ver detalles</a-button>
        </template>

        <template v-if="column.dataIndex == 'options'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0">
                  <a @click="handleOpenModalEdit(record)">Editar</a>
                </a-menu-item>
                <a-menu-item key="1">
                  <!-- <a>Cancelar</a> -->
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>

      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="total" :pageSize="20" @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <NuevoTaller :open="open" @handleCloseModal="open = false" :isIdUpdate="isIdUpdate" @refreshTable="refreshTable"/>

  <a-modal footer="" v-model:open="modalInvitation" :title="`${titleInvitation} invitación`" width="460px">
    <a-form :model="formStateInvitation" layout="vertical" @finish="handleInvitation">
      <!-- <a-form-item label="Texto 1">
        <a-textarea v-model:value="formStateInvitation.text1" />
      </a-form-item>
      <a-form-item label="Texto 2">
        <a-textarea v-model:value="formStateInvitation.text2" />
      </a-form-item> -->

      <QuillEditor class="quill-editor" v-model:content="contenido" :options="editorOptions" contentType="html" />

      <div class="wrapper-form_btn">
        <a-button type="primary" html-type="submit" :loading="loadingInvitation">Guardar</a-button>
      </div>
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
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { requestNoToken } from '@/utils/noToken.js'
import { QuillEditor } from '@vueup/vue-quill';
import 'quill/dist/quill.snow.css';

const contenido = ref('');
const isIdUpdate = ref(null);
const router = useRouter();
const dataSource = ref([])
const loading = ref(false)
const loadingInvitation = ref(false)
const valueX = ref(1000)
const valueY = ref('60vh')
// const dataToSearch = ref('')
const open = ref(false);
const total = ref(0)
const idUserSelected = ref(null)
const modalCancel = ref(false);
const modalInvitation = ref(false);
const titleInvitation = ref('Crear');
const recordData = ref(null);

const editorOptions = {
  theme: 'snow',
  modules: {
    
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      // ['link', 'image', 'video'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      // ['blockquote', 'code-block'],
      [{ script: 'sub' }, { script: 'super' }],
      // [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  },
  contentType: 'html', 
};

const params = ref({
  page: 1
})

const columns = [
  { title: 'Nombre taller',       dataIndex: 'title', fixed: 'left', width: 190 },
  { title: 'Expositor',           dataIndex: 'expositor', width: 170},
  { title: 'Fecha taller',        dataIndex: 'workshop_date', align: 'center', width: 160},
  { title: 'Intervención',        dataIndex: 'type_intervention', align: 'center', width: 160},
  { title: 'Invitación',          dataIndex: 'invitation_id', align: 'center', width: 80},
  { title: 'T. Entrada',          dataIndex: 'test_in', align: 'center', width: 80},
  { title: 'T. Salida',           dataIndex: 'test_out', align: 'center', width: 80},
  { title: 'Estado',              dataIndex: 'status', align: 'center', width: 100},
  { title: 'Inscriptos',          dataIndex: 'registered_count', align: 'center', width: 100},
  { title: 'Link',                dataIndex: 'link_sala', align: 'center', width: 80},
  { title: 'RRSS',                dataIndex: 'rrss', align: 'center', width: 70},
  { title: 'SMS',                 dataIndex: 'sms', align: 'center', width: 70},
  { title: 'Correo',              dataIndex: 'correo', align: 'center', width: 70},
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
const refreshTable = (val) => {
  if(val) fetchData()
}


//start_test
const handleCreateInTest = (workshop) => {
  const query = {
    id: workshop.id,
    date: workshop.workshop_date,
    taller: workshop.title,
    exponent: `${workshop.exponent.first_name} ${workshop.exponent.last_name} ${workshop.exponent.middle_name}`
  }
  router.push({ name: 'test-entrada', query });
}
const handleEditInTest = (workshop) => {
  const query = {
    id: workshop.id,
    date: workshop.workshop_date,
    taller: workshop.title,
    exponent: `${workshop.exponent.first_name} ${workshop.exponent.last_name} ${workshop.exponent.middle_name}`,
    test: workshop.testin_id
  }
  router.push({ name: 'editar-test-entrada', query });
}
const handleCreateOutTest = (workshop) => {
  const query = {
    id: workshop.id,
    date: workshop.workshop_date,
    taller: workshop.title,
    exponent: `${workshop.exponent.first_name} ${workshop.exponent.last_name} ${workshop.exponent.middle_name}`
  }
  router.push({ name: 'test-salida', query });
}
const handleEditEndTest = (workshop) => {
  const query = {
    id: workshop.id,
    date: workshop.workshop_date,
    taller: workshop.title,
    exponent: `${workshop.exponent.first_name} ${workshop.exponent.last_name} ${workshop.exponent.middle_name}`,
    test: workshop.testout_id
  }
  router.push({ name: 'editar-test-salida', query });
}
//end_test
// ver_detalles
const handleShowDetails = (workshop) => {
  const query = {
    id: workshop.id,
    date: workshop.workshop_date,
    taller: workshop.title,
    exponent: `${workshop.exponent.first_name} ${workshop.exponent.last_name} ${workshop.exponent.middle_name}`
  }
  router.push({ name: 'taller-descripcion', query });
}

//start_invitation
const handleInvitationModal = async (val, record) => {
  recordData.value = record
  
  if(val === 'create') titleInvitation.value = 'Crear'
  if(val === 'edit') {
    titleInvitation.value = 'Editar'
    try {
      const {data} = await makeRequest({ url: `/invitations/${recordData.value.invitation_id}`, method: 'GET' });
      contenido.value = data.content
      formStateInvitation.workshop_id = data.workshop_id
    } catch (error) {
      console.error('Error de red:', error);
    } 
  }
  modalInvitation.value = true
  
}
const handleOpenModal = () => {
  isIdUpdate.value = null
  open.value = true;
};
const handleOpenModalEdit = async(val) => {
  try {
    const data = await requestNoToken({ url: `/get-workshop-slug/${val.slug}`, method: 'GET' });
    isIdUpdate.value = data.workshop
    open.value = true;
  } catch (error) {
    console.error('Error de red:', error);
    message.warning("Error de red");
  } 
};
const handleInvitation = async() => {

  let url, method

  if(titleInvitation.value == 'Editar') {
    url = `/invitations/${recordData.value.invitation_id}`
    method = 'PUT'
  } else {
    url = `/create-invitation/${recordData.value.id}`
    method = 'POST'
  }

  loadingInvitation.value = true;
  try {
    const payload = {
      content: contenido.value,
      workshop_id: recordData.value.id != null ? recordData.value.id : formStateInvitation.workshop_id
    }
    const data = await makeRequest({ url, method, data: payload });
    message.success(data.message);
    fetchData()
  } catch (error) {
    console.error('Error de red:', error);
    message.error('La invitación fue creada');
  } finally {
    loadingInvitation.value = false;
    modalInvitation.value = false
    recordData.value = null
  }
}

const handleOptionsSelect = (e) => {
  if(e.key == 0) {
    console.log("ediittttt", e);
  }

  if(e.key == 1) {
    handleOkCancelWorkshop()
  }
}
const handleOkCancelWorkshop = () => {
  modalCancel.value = true;
};

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/workshops', method: 'GET', params:params.value });
    dataSource.value = data.workshop.data
    total.value = data.workshop.total;
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

<style lang="scss">
.filters {
  margin: 1rem 0;
}
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
.wrapper-form_btn {
  margin-top: 1rem;
  text-align: right;
}
.quill-editor {
  .ql-editor {
    height: 200px;
  }
}
</style>