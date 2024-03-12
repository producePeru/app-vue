<template>
  <div class="asesorias">
    <div style="max-width: 450px;">
      <div>
        <h3 v-if="open1">FORMALIZACIÓN CON RUC 20</h3>
        <h3 v-else-if ="open2">FORMALIZACIÓN CON RUC 10</h3>
        <h3 v-else-if ="open3">ASESORÍA</h3>
        <h3 v-else>REGISTRO</h3>
      </div>

      <div class="search" style="max-width: 300px;">
        <label>Ingresar número de documento</label>
        <a-input-search
        v-model:value="dniNumber"
        placeholder=""
        :loading="searchLoading"
        @search="handleSearchApi"
        @input="validateNumber"
        :maxlength="8" />
      </div>

      <template v-if="infoUser.length != 0">
  
        <div class="buttons">
          <a-button @click="handleStartRuc20" :loading="loading1" :class="open1 && 'actived'">Crear empresa</a-button>
          <a-button @click="open2 = true" :class="open2 && 'actived'" class="mx-1">RUC persona natural</a-button>
          <a-button @click="open3 = true" :class="open3 && 'actived'">Asesoría</a-button>
        </div>

        <div class="info-personal">
          <span>Apellidos y nombres: </span>
          <span>{{ infoUser.last_name }} {{ infoUser.middle_name }}, {{ infoUser.name }}</span> 
          <span>Número de celular:</span>
          <span><span>{{ infoUser.phone ? infoUser.phone : '-' }}</span></span>
          <span>Correo electrónico:</span>
          <span>{{ infoUser.email ? infoUser.email : '-' }}</span>
          <!-- <pre>{{ historial }}</pre> -->
          <template v-if="historial.length >= 1">
            <span>Asesorías:</span>
            <b>{{ historial[0]?.adv.length }}</b>
            <span>Formalizaciones RUC 20:</span>
            <b>{{ historial[0]?.ruc20.length }}</b>
            <span>Formalizaciones RUC 10:</span>
            <b>{{ historial[0]?.ruc10.length }}</b>
          </template>
        </div>

      </template>
    </div>
   
    <HISTORIAL :info="historial" v-if="infoUser.length != 0"  />

  </div>

  <section>
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
      </div>
    </a-drawer>

    <a-drawer
      title="Formalización con RUC 10"
      v-model:open="open2"
      placement="right">
      <Formalizacion10 :info="infoUser" @closeDraw="open2 = false, handleSearchApi()" />
    </a-drawer>

    <a-drawer
      title="Nueva asesoría"
      v-model:open="open3"
      placement="right">
      <AsesoriaNuevo :info="infoUser" @closeDraw="open3 = false, handleSearchApi()" />
    </a-drawer>

    <a-modal v-model:open="openModal" title="Pendientes" :closable="true" cancelText="Cerrar" :footer="null" :maskClosable="false" width="380px">
      
      <a-spin :spinning="spinning">
        <div v-for="(item, key) in dataPndingRequest" :key="key" class="pendient" @click="handleSelectRequest(item.id)">
          <div class="info-tag" v-if="item.step == 0"><b>Paso</b> <a-tag color="error">Reserva de nombre</a-tag></div>
          <div class="info-tag" v-if="item.step == 1"><b>Siguiente paso</b> <a-tag color="warning">Acto constitutivo</a-tag></div>
          <div class="info-tag" v-if="item.step == 2"><b>Siguiente paso</b> <a-tag color="success">Formalizar</a-tag></div>
          <div class="info">
            <b>Código SID SUNARP</b> 
            <span>{{ item.code_sid_sunarp }}</span>
            <b>Última consulta</b>
            <span>{{ formatDate(item.updated_at) }}</span>
          </div>
        </div>
        <div class="pendient pendient-btn" @click="open1 = true, openModal = false, current = 0">
          <div style="text-align: center;">NUEVO TRÁMITE</div>
        </div>
      </a-spin>



    </a-modal>
  </section>

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
import HISTORIAL from './components/AsesoriasHistorial.vue'

const router = useRouter();
const route = useRoute();

const spinning = ref(false);
const information = ref(false);
const information2 = ref(false);
const openModal = ref(false);
const dataPndingRequest = ref(false);
const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
const dniNumber = ref('');
const infoUser = ref([]);
const searchLoading = ref(false)
const current = ref(0);
const loading1 = ref(false);
const historial = ref([]);

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
  spinning.value = true
  try {
    const {data} = await makeRequest({ url: `find-formalization20/${id}`, method: 'GET' });
    current.value = data.step
    openModal.value = false
    open1.value = true
    information2.value = data
  } catch (error) {
    console.log(error);
  } finally {
    spinning.value = false
  }
}
const handleHistorial = async(datax) => {
  historial.value = []
  try {
    const data = await makeRequest({ url: `/historial-formalization/${datax.number_document}/${datax.id}`, method: 'GET' });
    historial.value = [...historial.value, data]
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
      handleHistorial(data);
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
  await handleHistorial(data);
}


onMounted(() => {
  if(route.query.dni) handleSetDataUser();
});
</script>

<style lang="scss" scoped>
.asesorias {
  .search {
    max-width: 450px;
    label {
      margin-bottom: 5px;
      display: inline-block;
    }
  }
  .buttons {
    margin: 1rem 0 2rem 0;
    display: flex;
    gap: 1rem;
  }

  .info-personal {
    display: grid;
    grid-template-columns: 1.3fr 1.5fr;
    max-width: 550px;
    margin-bottom: 3rem;
    line-height: 1.8;
  }
}

.pendient {
  border: 1px solid #1677ff;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: .6rem;
  margin: 10px 0;
  line-height: 1.7;
  cursor: pointer;
  b {
    font-weight: 400;
  }
  .info-tag {
    display: grid;
    grid-template-columns: 4fr 1fr;
    span {
      margin: 0;
    }
  }
  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    span {
      text-align: right;
    }
  }
}
.pendient-btn {
  background-color: #1677ff;
  color: #fff;
}
</style>

<style>
.ant-drawer-content-wrapper {
  width: 100%;
  min-width: 600px;
}
</style>

