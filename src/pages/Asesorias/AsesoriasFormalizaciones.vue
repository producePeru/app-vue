<template>
  <div>
    <div class="ugo">
      
      <h3 v-if="open1">FORMALIZACIÓN CON RUC 20</h3>
      <h3 v-else-if ="open2">FORMALIZACIÓN CON RUC 10</h3>
      <h3 v-else-if ="open3">ASESORÍA</h3>
      <h3 v-else>REGISTRO</h3>
      
      <div class="ugo-search">
        <label class="label">Ingresar número de documento</label>
        <a-input-search
        v-model:value="dniNumber"
        placeholder=""
        :loading="searchLoading"
        @search="handleSearchApi"
        @input="validateNumber"
        :maxlength="8" />
      </div>

      <div v-if="infoUser" class="ugo-info">
        <div>
          <b>Apellidos y nombres:</b>
          <p class="name-edit">
            <span>{{ infoUser.last_name }} {{ infoUser.middle_name }}, {{ infoUser.name }}</span>
            <span class="ico" @click="handleEditUserData"><FormOutlined /></span>
          </p>
        </div>
        <!-- <div>
          <b>Número de DNI:</b>
          <span>{{ infoUser.number_document }}</span>
        </div> -->
        <div>
          <b>Número de celular:</b>
          <span>{{ infoUser.phone ? infoUser.phone : '-' }}</span>
        </div>
        <div>
          <b>Correo electrónico:</b>
          <span>{{ infoUser.email ? infoUser.email : '-' }}</span>
        </div>
      </div>
    </div>

    <div v-if="infoUser" class="group-buttons">
      <a-button @click="handleStartRuc20" :loading="loading1" :class="open1 && 'actived'">Crear empresa</a-button>
      <a-button @click="open2 = true" :class="open2 && 'actived'" class="mx-1">RUC persona natural</a-button>
      <a-button @click="open3 = true" :class="open3 && 'actived'">Asesoría</a-button>
    </div>
<!-- <pre>{{ information2 }}</pre> -->
<pre>{{ current }}</pre>
    <a-drawer
      width="510"
      title="Formalización con RUC 20"
      v-model:open="open1"
      placement="right">

      <a-steps :current="current" size="small" class="steps">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>

      <div class="steps-content">
        <ReservaNombre    v-if="current == 0" :info="information" @closeDraw="open1 = false, dataPndingRequest = false" />
        <ActoConstitutivo v-if="current == 1" :info="information2" @closeDraw="open1 = false, dataPndingRequest = false" />
        <MypeFinal        v-if="current == 2" :info="information2" @closeDraw="open1 = false, dataPndingRequest = false" />

        <span v-if="current == 3">
          Hola
        </span>

      </div>
    </a-drawer>

    <a-drawer
      width="500"
      title="Formalización con RUC 10"
      v-model:open="open2"
      placement="right">
      <Formalizacion10 />
    </a-drawer>

    <a-drawer
      width="500"
      title="Nueva asesoría"
      v-model:open="open3"
      placement="right">
      <AsesoriaNuevo />
    </a-drawer>

    <a-modal v-model:open="openModal" title="Pendientes" :closable="true" cancelText="Cerrar" :footer="null" :maskClosable="false" width="380px">
      <div v-for="(item, key) in dataPndingRequest" :key="key" class="request-pendient" @click="handleSelectRequest(item.id)">
        <div v-if="item.step == 0"><b>Paso</b> <a-tag color="error">Reserva de nombre</a-tag></div>
        <div v-if="item.step == 1"><b>Siguiente paso</b> <a-tag color="warning">Acto constitutivo</a-tag></div>
        <div v-if="item.step == 2"><b>Siguiente paso</b> <a-tag color="success">Formalizar</a-tag></div>
        <div><b>Código SID SUNARP</b> <strong>{{ item.code_sid_sunarp }}</strong></div>
        <div><b>Última consulta</b><span>{{ formatDate(item.updated_at) }}</span></div>
      </div>

      <div class="request-pendient request-border" @click="open1 = true, openModal = false, current = 0">
        <div style="text-align: center;">NUEVO TRÁMITE</div>
      </div>
    </a-modal>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ReservaNombre from './components/ReservaNombre.vue';
import ActoConstitutivo from './components/ActoConstitutivo.vue';
import MypeFinal from './components/MypeFinal.vue'
import Formalizacion10 from './components/FormalizacionRUC10.vue';
import AsesoriaNuevo from './components/AsesoriaNuevo.vue';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';
import { useRouter, useRoute } from 'vue-router';
import { FormOutlined } from '@ant-design/icons-vue';
import moment from 'moment';

const router = useRouter();
const route = useRoute();

const information = ref(false);
const information2 = ref(false);
const openModal = ref(false);
const dataPndingRequest = ref(false);
const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
const dniNumber = ref('');
const infoUser = ref(false);
const searchLoading = ref(false)
const current = ref(0);
const loading1 = ref(false);

const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY HH:mm A');
}
const validateNumber = () => {
  dniNumber.value = dniNumber.value.replace(/\D/g, '');
};

const steps = [
  { title: 'Reserva de nombre' },
  { title: 'Acto constitutivo', },
  { title: 'Final' }
];

const handleEditUserData = () => {
  const query = {
    rol: 'solicitante',
    access: 3,
    dni: dniNumber.value,
    type: 'asesoria'
  }
  router.push({ name: 'actualizar-persona', query });
}

// CREAR EMPRESA
const handleStartRuc20 = async() => {
  try {
    information.value = {
      id: infoUser.value.id,
      dni: infoUser.value.number_document
    }
    loading1.value = true;
    if(dataPndingRequest.value) return openModal.value = true
    const {data} = await makeRequest({ url: `/my-formalizations20/${infoUser.value.number_document}`, method: 'GET' });
    if(data.length >= 1) {
      dataPndingRequest.value = data
      openModal.value = true
      return;
    } 
  
    open1.value = true

  } catch (error) {
    console.log(error);
  } finally {
    loading1.value = false;
  }
}
// SI TIENE MÁS DE UN TRÁMITE DEBE DE ELEGIR CON CUAL CONTINUAR
const handleSelectRequest = async(id) => {
  try {
    const {data} = await makeRequest({ url: `find-formalization20/${id}`, method: 'GET' });
    current.value = data.step
    openModal.value = false
    open1.value = true
    information2.value = data
  } catch (error) {
    console.log(error);
  } 
}

const handleSearchApi = async () => {
  dataPndingRequest.value = false;
  current.value = 0;

  if(dniNumber.value.length < 8) return message.warning('El número a buscar es incorrecto')
  
  searchLoading.value = true

  try {
    const data = await makeRequest({ url: `/applicant-new/${dniNumber.value}`, method: 'GET' });

    if(data.status == 205) {
      const query = {
        rol: 'solicitante',
        access: 3,
        dni: dniNumber.value
      }
      router.push({ name: 'registrar-persona', query });
    } else {
      infoUser.value = data
    }

  } catch (error) {
    console.log("You have an error", error);
  } finally {
    searchLoading.value = false
  }
}
const handleSetDataUser = async() => {
  const data = await makeRequest({ url: `/applicant-new/${route.query.dni}`, method: 'GET' });
  dniNumber.value = data.number_document
  infoUser.value = data
}


onMounted(() => {
  if(route.query.dni) handleSetDataUser();
});
</script>

<style scoped lang="scss">
.request-border {
  margin-top: 1.2rem !important;
  border-color: #1677ff !important;
  color: #1677ff !important;
  &:hover {
    color: #fff !important;
  }
}
.request-pendient {
  border: 1px solid #f0f0f0;
  padding: .5rem;
  margin: .5rem 0;
  border-radius: 6px;
  cursor: pointer;
  b {
    font-weight: 400;
    // color: #1677ff;
    margin-right: 6px;
  }
  &:hover {
    background-color: #1677ff;
    color: #fff;
    b {
      color: #fff;
    }
  }
}
.name-edit {
  display: flex;
  margin: 0; 
  .ico {
    margin-left: 1.5rem;
    color: #1677ff;
    font-size: 15px;
    position: relative;
    top: -3px;
    cursor: pointer;
  }
}
.ugo {
  margin-bottom: 1.5rem;
  &-search {
    max-width: 300px;
  }
  h3 {
    margin-bottom: 1rem;
  }
  .label {
    margin-bottom: 8px;
    display: block;
  }
  &-info {
    line-height: 1.45;
    margin-top: 1rem;
    div {
      display: flex;
      flex-direction: column;
      margin-bottom: .6rem;
    }
  }
}

.steps {
  max-width: 800px;
}
.group-buttons {
  margin-bottom: 2rem;
  // display: none;
}
.mx-1 {
  margin: 0 1rem;
}
.actived {
  background: #FFC107;
  border: 1px solid #FFC107;
  color: #fff;
  &:active, &:hover {
    border: 1px solid #FFC107;
    color: #fff;
  }
}

.ant-steps-item-active {
  font-weight: 500;
}
.ant-steps-item-wait, .ant-steps-item-finish  {
  opacity: .4;
}
</style>

<style>
.ant-drawer-close {
  position: absolute !important;
  right: 1rem !important;
  opacity: 1;
}
@media screen and (min-width: 550px) {
  .ant-drawer-close {
    position: absolute !important;
    right: 1rem !important;
    opacity: 0 !important;
  }
}
</style>



