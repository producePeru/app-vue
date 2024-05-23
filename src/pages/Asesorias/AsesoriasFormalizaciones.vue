<template>
  <div class="asesorias">
    <h3 class="title-produce">REGISTRO DE FORMALIZACIONES Y ASESORÍAS</h3>
    <br>
    <a-card class="card-as card-gray">
      <RedoOutlined v-if="route.query.dni" class="ico-reload" @click="handleResetPage" />
      <div class="wrapper-s">
        <div>
          <label class="label">Seleccione el tipo de documento</label>
          
          
          <a-radio-group v-model:value="type_document" @change="handleResetDocument" class="radio-produce">
            <a-radio value="1">DNI</a-radio>
            <a-radio value="2">CE</a-radio>
            <a-radio value="3">PAS</a-radio>
            <a-radio value="4">PTP</a-radio>
          </a-radio-group>
        
        
        
        </div>
        <div>
          <label class="label">Digite el número de documento</label>
          <a-input-search 
          enter-button="BUSCAR" 
          v-model:value="dniNumber" 
          placeholder="" 
          :loading="searchLoading"
          @search="handleSearchApi" 
          @input="validateNumber" 
          class="search-produce"
          :maxlength="type_document == 1 ? 8 : 20" />
        </div>
      </div>
    </a-card>

    <div class="column-2">
      <a-card class="card-as" v-if="infoUser.length != 0">
        <div class="info-update">
          <h4 class="title-produce">RESULTADO DE LA BÚSQUEDA</h4>
          <EditOutlined class="ico-edit" @click="handleEditUserData" />
        </div>
        <div class="info-personal">
          <span>Apellidos y nombres: </span>
          <span>{{ infoUser.lastname }} {{ infoUser.middlename }}, {{ infoUser.name }}</span>
          <span>Número de celular:</span>
          <span><span>{{ infoUser.phone ? infoUser.phone : '-' }}</span></span>
          <span>Correo electrónico:</span>
          <span>{{ infoUser.email ? infoUser.email : '-' }}</span>
          
          <span>Asesorías:</span>
          <b>{{ infoUser?.idadvisory.length }}</b>
          <span>Formalizaciones RUC 20:</span>
          
          <div class="alert-incomplete">
            <b>{{ infoUser?.idformalization20.length }}</b>
            <!-- <span class="alert" v-if="historial[0]?.ruc20.filter(item => item.step === 1 || item.step === 2).length >= 1">
              <ExclamationCircleOutlined />
              <span class="small">Tienes {{ historial[0]?.ruc20.filter(item => item.step === 1 || item.step === 2).length }} procesos pendientes</span>
            </span> -->
          </div>

          <span>Formalizaciones RUC 10:</span>
          <b>{{ infoUser?.idformalization10.length }}</b> 

        </div>
      </a-card>
      
      <a-card class="card-as" v-if="infoUser.length != 0">
        <h4 class="title-produce">¿DESEA REGISTRAR UN NUEVO SERVICIO?</h4>
        <div class="card-as-btn">
          <a-select style="min-width: 200px;" v-model:value="value1" :options="options1" />
          <a-button class="btn-produce" type="primary" @click="handleSelectAction">REGISTRAR</a-button>
        </div>
      </a-card>
    </div>

    <!-- <template v-if="infoUser.length != 0">
        <div class="buttons">
          <a-button @click="handleProccessRUC20" :loading="loading1" :class="open1 && 'actived'">Crear empresa</a-button>
          <a-button @click="open2 = true" :class="open2 && 'actived'" class="mx-1">RUC persona natural</a-button>
          <a-button @click="open3 = true" :class="open3 && 'actived'">Asesoría</a-button>
        </div>
      </template> -->

    <div class="card-as" v-if="historialData" style="padding: 1rem;">
      <h4 class="title-produce">HISTORIAL</h4>
      <HISTORIAL :totaladvisories="totaladvisories" :totalformalization10="totalformalization10" :totalformalization20="totalformalization20" />
    </div>
  </div>


  <section>


    <a-drawer width="510" title="Formalización con RUC 20" v-model:open="open1" placement="right">
      <a-steps v-model:current="current" size="small" class="steps">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      
      <div class="steps-content">
        <ReservaNombre 
        v-if="current == 0" 
        :info="setValues" 
        @closeDraw="open1 = false, handleUpdateValues()" />
        
        <ActoConstitutivo 
        v-if="current == 1" 
        :info="setValues" 
        :itemSelectedF20="itemSelectedF20"
        @closeDraw="open1 = false, handleUpdateValues()" />
        
        <MypeFinal 
        v-if="current == 2" 
        :itemSelectedF20="itemSelectedF20"
        @closeDraw="open1 = false, handleUpdateValues()" />
      </div>
    </a-drawer>

    <a-drawer 
      title="Formalización con RUC 10" 
      v-model:open="open2" 
      placement="right">
      <Formalizacion10 
        :info="infoUser" 
        @closeDraw="open2 = false, handleUpdateValues()" />
    </a-drawer>

    <a-drawer 
      title="Nueva asesoría" 
      v-model:open="open3" 
      placement="right">
      <AsesoriaNuevo 
        :info="infoUser" 
        @closeDraw="open3 = false, handleUpdateValues()" />
    </a-drawer>

    <!-- MODAL MAS DE UNA SOLICITUD -->
    <a-modal v-model:open="openModal" title="Pendientes" :closable="true" cancelText="Cerrar" :footer="null" :maskClosable="false" width="380px">
      <a-spin :spinning="spinning">
        <div v-for="(item, key) in dataPndingRequest" :key="key" @click="handleSelectRequest(item)">
          <div  class="pendient">
            <div class="info-tag" v-if="item.task == 0"><b>Paso</b> <a-tag color="error">Reserva de nombre</a-tag></div>
              <div class="info-tag" v-if="item.task == 1"><b>Siguiente paso</b> <a-tag color="warning">Acto
                  constitutivo</a-tag></div>
              <div class="info-tag" v-if="item.task == 2"><b>Siguiente paso</b> <a-tag color="success">Formalizar</a-tag>
            </div>
            <div class="info">
              <b>Código SID SUNARP</b>
              <span><b class="code-number">{{ item.codesunarp }}</b></span>
              <b>Última consulta</b>
              <span>{{ formatDate(item.updated_at) }}</span>
            </div>
          </div>
        </div>
        <div class="pendient pendient-btn btn-produce" @click="handleStartProcessRUC20">
          <div style="text-align: center;">NUEVO TRÁMITE</div>
        </div>
      </a-spin>
    </a-modal>
    <!-- MODAL MAS DE UNA SOLICITUD -->
    <!-- <pre>{{ type_document }}</pre> -->

    <a-drawer
    v-model:open="open"
    class="draw-notary"
    root-class-name="root-class-name"
    title="Datos del solicitante"
    placement="right">
      <SolicitanteEditar @closeDraw="handleCloseDrawopen" :updateValues="updateValues" />
    </a-drawer>
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
import { ExclamationCircleOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons-vue';
import moment from 'moment';
import HISTORIAL from './components/AsesoriasHistorial.vue';
import SolicitanteEditar from './components/DrawerSolicitante.componente.vue';


const router = useRouter();
const route = useRoute();

const type_document = ref(0);

const value1 = ref(null);
const options1 = ref([
  {value: 'asesoria',label: 'ASESORÍA'},
  {value: 'ruc20',label: 'RUC 20'},
  {value: 'ruc10',label: 'RUC 10'}
])

const updateValues = ref(null);
const open = ref(false);
const setValues = ref(null);
const spinning = ref(false);
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
const itemSelectedF20 = ref(null);
const totaladvisories = ref([]);
const totalformalization10 = ref([]);
const totalformalization20 = ref([]);
const historialData = ref(false);

const handleCloseDrawopen = () => {
  handleSearchApi(dniNumber.value);
  open.value = false;
}
const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY HH:mm A');
}
const handleResetPage = () => {
  handleResetDocument()
}
const validateNumber = () => {
  dniNumber.value = dniNumber.value.replace(/\D/g, '');
};
const handleResetDocument = () => {
  dniNumber.value = '';
  infoUser.value = [];
  historial.value = [];
  router.push({ name: 'asesorias-formalizaciones' });
}
const handleSelectAction = () => {
  setValues.value = null;
  setValues.value = infoUser.value;

  if(!value1.value) return message.warning('Seleccionar un tipo de servicio')
  if(value1.value == 'asesoria') open3.value = true
  if(value1.value == 'ruc10') open2.value = true;
  if(value1.value == 'ruc20') handleProccessRUC20();
};

const steps = [
  { title: 'Reserva de nombre' },
  { title: 'Acto constitutivo', },
  { title: 'Final' }
];

const handleEditUserData = () => {
  // const query = {
  //   rol: 'solicitante',
  //   access: 3,
  //   dni: dniNumber.value,
  //   type: 'asesoria',
  //   typedoc: type_document.value == 1 ? 'dni' : 'ce'
  // }
  // router.push({ name: 'actualizar-persona', query });
  updateValues.value = infoUser.value
  open.value = true;
}

// CREAR EMPRESA RUC 20
const handleStartProcessRUC20 =  () => {
  current.value = 0
  open1.value = true;
  openModal.value = false
}

const handleProccessRUC20 = async() => {
  try {
    loading1.value = true;

    const data = await makeRequest({ url: `formalization/list-ruc-20/${infoUser.value.id}`, method: 'GET' });

    if(data.length < 1) {
      return handleStartProcessRUC20()
    } 
      
    dataPndingRequest.value = data
    openModal.value = true
    
  } catch (error) {
    console.log(error);
  } finally {
    loading1.value = false;
  }
}

// SI TIENE MÁS DE UN TRÁMITE DEBE DE ELEGIR CON CUAL CONTINUAR
const handleSelectRequest = async (item) => {
  spinning.value = true
  current.value = item.task
  itemSelectedF20.value = item
  setTimeout(() => {
  spinning.value = false
  open1.value = true
  openModal.value = false
  }, 400);
  
}

const handleHistorial = async (datax) => {
  historial.value = []
  try {
    const data = await makeRequest({ url: `/historial-formalization/${datax.number_document}/${datax.id}`, method: 'GET' });
    historial.value = [...historial.value, data]
  } catch (error) {
    console.log(error);
  }
}

const handleUpdateValues = async () => {
  searchLoading.value = true;
  const data = await makeRequest({ url: `person/found/${type_document.value}/${dniNumber.value}`, method: 'GET' });
  if(data.status == 200) {
    infoUser.value = data.data;
    handleShowHistorial(infoUser.value.id)
    return searchLoading.value = false;
  }
}

const handleSearchApi = async (val) => {

  searchLoading.value = true;
  if (!val) {
    message.warning("Ingresa un número de documento")
    return searchLoading.value = false
  }

  if (type_document.value == 0) {
    message.warning("Seleccionar el tipo de documento")
    return searchLoading.value = false
  }

  if (type_document.value == 1) {
    if (dniNumber.value.length < 8) {
      message.warning("El número de DNI está incompleto")
      searchLoading.value = false
      return 
    }
  }

  const data = await makeRequest({ url: `person/found/${type_document.value}/${dniNumber.value}`, method: 'GET' });
  if(data.status == 200) {
    infoUser.value = data.data
    handleShowHistorial(data.data.id)
    return searchLoading.value = false;
  }
  
  if (data.status === 404) {
    const query = {
      type: type_document.value,
      access: 'asesorias',
      number: dniNumber.value
    }
    router.push({ name: 'registrar-persona', query });
  }
}

const handleShowHistorial = async (id) => {
  try {
    const {data} = await makeRequest({ url: `historial/registers/${id}`, method: 'GET' });
    
    totaladvisories.value = data.advisories;
    totalformalization10.value = data.formalization10;
    totalformalization20.value = data.formalization20;
    historialData.value = true;
    
  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(() => {
  if (route.query.type) {
    console.log("ooaoooaoaa", route.query.type);
    type_document.value = route.query.type
    dniNumber.value = route.query.number
  }
});
</script>

<style lang="scss" scoped>
.code-number {
  font-weight: 500 !important;
}
.ico-reload {
  color: #1677ff;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 15px;
  cursor: pointer;
}

.alert-incomplete {
  .alert {
    color: #ff4d4f;
    margin-left: 6px;
    .small {
      margin-left: 6px;
    }
  }
}
.card-as {
  margin-bottom: 1rem;
  .info-update {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ico-edit {
      color: var(--secondary);
      cursor: pointer;
    }
  }
  .wrapper-s {
    flex-direction: column;
    display: flex;
    padding: 0;
    gap: .8rem;
    max-width: 300px;

    .label {
      margin-bottom: .5rem;
      display: inline-block;
    }
  }
  &-btn {
    margin-top: 1rem;
    display: flex;
    gap: .6rem;
  }
}

.asesorias {
  width: 100%;

  .column-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    @media screen and (max-width:1200px) {
      grid-template-columns: 1fr;
    }
  }

  // .buttons {
  //   margin: 1rem 0 2rem 0;
  //   display: flex;
  //   gap: 1rem;
  // }

  .info-personal {
    display: grid;
    grid-template-columns: 1.3fr 1.5fr;
    max-width: 550px;
    // margin-bottom: 3rem;
    line-height: 1.8;
  }
}

.pendient {
  border: 1px solid #ccc;
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
  &:hover {
    border: 1px solid var(--primary);
    .code-number {
      color: var(--primary);
    }
  }
}

.pendient-btn {
  // background-color: #1677ff;
  color: #fff;
  // border-color: transparent !important;
}
</style>

<style lang="scss">
.asesorias {
  .card-gray {
    background-color: #f7f7f7;
    border-radius: 8px;
  }
}
</style>