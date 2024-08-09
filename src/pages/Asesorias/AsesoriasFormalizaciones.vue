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
            <a-tooltip color="cyan">
              <template #title>Documento Nacional de Identidad</template>
              <a-radio value="1">DNI</a-radio>
            </a-tooltip>
            <a-tooltip color="cyan">
              <template #title>Carnet de Extranjería</template>
              <a-radio value="2">CE</a-radio>
            </a-tooltip>
            <a-tooltip color="cyan">
              <template #title>Pasaporte</template>
              <a-radio value="3">PAS</a-radio>
            </a-tooltip>
            <a-tooltip color="cyan">
              <template #title>Permiso Temporal de Permanencia</template>
              <a-radio value="4">PTP</a-radio>
            </a-tooltip>
          </a-radio-group>
        </div>
        <div>
          <label class="label">Digite el número de documento</label>
          <a-input-search enter-button="BUSCAR" v-model:value="dniNumber" placeholder="" :loading="searchLoading"
            @search="handleSearchApi" @input="validateNumber" class="search-produce"
            :maxlength="type_document == 1 ? 8 : 20" />
        </div>
      </div>
    </a-card>

    <a-row :gutter="[16, 16]">

      <a-col :xs="24" :sm="24" :lg="12">
        <a-card v-if="infoUser.length != 0">
          <h4 class="title-produce">RESULTADO DE LA BÚSQUEDA</h4>
          <EditOutlined class="box-icoedit" @click="handleEditUserData" />

          <a-row :gutter="[0, 2]" class="box-info">
            <a-col :xs="12" :sm="8">
              <b class="box-title">Apellidos y nombres:</b>
            </a-col>
            <a-col :xs="12" :sm="12">
              <span>{{ infoUser.lastname }} {{ infoUser.middlename }}, {{ infoUser.name }}</span>
            </a-col>
            <a-col :xs="12" :sm="8">
              <b class="box-title">Número de celular:</b>
            </a-col>
            <a-col :xs="12" :sm="12">
              <span>{{ infoUser.phone ? infoUser.phone : '-' }}</span>
            </a-col>
            <a-col :xs="12" :sm="8">
              <b class="box-title">Correo electrónico:</b>
            </a-col>
            <a-col :xs="12" :sm="12">
              <span>{{ infoUser.email ? infoUser.email : '-' }}</span>
            </a-col>
            <a-col :xs="12" :sm="8">
              <b class="box-title">Asesorías:</b>
            </a-col>
            <a-col :xs="12" :sm="12">
              <span>{{ infoUser?.idadvisory.length }}</span>
            </a-col>
            <a-col :xs="12" :sm="8">
              <b class="box-title">Formalizaciones RUC 20:</b>
            </a-col>
            <a-col :xs="12" :sm="12">
              <span>{{ infoUser?.idformalization20.length }}</span>
            </a-col>
            <a-col :xs="12" :sm="8">
              <b class="box-title">Formalizaciones RUC 10:</b>
            </a-col>
            <a-col :xs="12" :sm="12">
              <span>{{ infoUser?.idformalization10.length }}</span>
            </a-col>
          </a-row>

        </a-card>
      </a-col>

      <a-col :xs="24" :sm="24" :lg="12">
        <a-card v-if="infoUser.length != 0" style="height: 100%;">
  
          <a-row :gutter="[16, 24]">
            <a-col :xs="24" :sm="18" :md="8" :lg="8" v-if="!isNotary()">
              <h4 class="title-produce">SELECCIONAR CDE</h4>
              <a-select class="w-100" v-model:value="value2.cde_id" :options="store.cdes" show-search
                :filter-option="filterOption" @change="handleChangeCde" />
            </a-col>

            <a-col :xs="24" :sm="18" :md="12" :lg="17">
              <h4 class="title-produce">¿DESEA REGISTRAR UN NUEVO SERVICIO?</h4>
              <a-row :gutter="[10, 0]">
                <a-col :xs="17" :sm="18">
                  <a-select class="w-100" v-model:value="value1" :options="options1" />
                </a-col>
                <a-col :xs="6">
                  <a-button type="primary" @click="handleSelectAction">REGISTRAR</a-button>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>

    </a-row>

    <!-- <template v-if="infoUser.length != 0">
        <div class="buttons">
          <a-button @click="handleProccessRUC20" :loading="loading1" :class="open1 && 'actived'">Crear empresa</a-button>
          <a-button @click="open2 = true" :class="open2 && 'actived'" class="mx-1">RUC persona natural</a-button>
          <a-button @click="open3 = true" :class="open3 && 'actived'">Asesoría</a-button>
        </div>
      </template> -->

    <div class="card-as" v-if="historialData" style="padding: 1rem;">
      <h4 class="title-produce">HISTORIAL</h4>
      <HISTORIAL :totaladvisories="totaladvisories" :totalformalization10="totalformalization10"
        :totalformalization20="totalformalization20" />
    </div>
  </div>

  <section>
    <a-drawer title="Regitsrar una Formalización con RUC 20" v-model:open="open1" placement="right" width="880px">
      <!-- <a-steps v-model:current="current" size="small" class="steps">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps> -->

      <AllFormalizacion20 :info="setValues" :idCde="value2.cde_id" @closeDraw="open1 = false,
        handleUpdateValues()" />


      <!-- <ReservaNombre 
        v-if="current == 0" 
        :info="setValues" 
        @closeDraw="open1 = false, handleUpdateValues()" /> -->

      <!-- <ActoConstitutivo 
        v-if="current == 1" 
        :info="setValues" 
        :itemSelectedF20="itemSelectedF20"
        @closeDraw="open1 = false, handleUpdateValues()" /> -->

      <!-- <MypeFinal 
        v-if="current == 2" 
        :itemSelectedF20="itemSelectedF20"
        @closeDraw="open1 = false, handleUpdateValues()" /> -->
      <div class="steps-content">
      </div>



    </a-drawer>

    <a-drawer width="600px" title="Regitsrar Formalización con RUC 10" v-model:open="open2" placement="right">
      <Formalizacion10 :info="infoUser" :idCde="value2.cde_id" @closeDraw="open2 = false, handleUpdateValues()" />
    </a-drawer>

    <a-drawer width="600px" title="Registrar una asesoría" v-model:open="open3" placement="right">
      <AsesoriaNuevo :info="infoUser" :idCde="value2.cde_id" @closeDraw="open3 = false, handleUpdateValues()" />
    </a-drawer>

    <!-- MODAL MAS DE UNA SOLICITUD -->
    <a-modal v-model:open="openModal" title="Pendientes" :closable="true" cancelText="Cerrar" :footer="null"
      :maskClosable="false" width="380px">
      <a-spin :spinning="spinning">
        <div v-for="(item, key) in dataPndingRequest" :key="key">
          <div class="pendient">
            <!-- @click="handleSelectRequest(item)" -->
            <!-- <div class="info-tag" v-if="item.task == 0"><b>Paso</b> <a-tag color="error">Reserva de nombre</a-tag></div>
              <div class="info-tag" v-if="item.task == 1"><b>Siguiente paso</b> <a-tag color="warning">Acto
                  constitutivo</a-tag></div>
              <div class="info-tag" v-if="item.task == 2"><b>Siguiente paso</b> <a-tag color="success">Formalizar</a-tag>
            </div> -->

            <div class="info">
              <b>Código SID SUNARP</b>
              <span><b class="code-number"><a-tag color="error" style="margin: 0;">{{ item.codesunarp
                    }}</a-tag></b></span>
              <b>Atendido por: </b>
              <span>{{ item.user.profile.name }} {{ item.user.profile.lastname }}</span>
              <b>Fecha de registro: </b>
              <span>{{ formatDate(item.updated_at) }}</span>
            </div>
            <!-- <pre>{{ item }}</pre> -->
          </div>
        </div>
        <div class="pendient pendient-btn btn-produce" @click="handleStartProcessRUC20">
          <div style="text-align: center;">NUEVO REGISTRO</div>
        </div>
      </a-spin>
    </a-modal>
    <!-- MODAL MAS DE UNA SOLICITUD -->
    <!-- <pre>{{ type_document }}</pre> -->

    <a-drawer width="600" v-model:open="open" class="draw-notary" root-class-name="root-class-name"
      title="Datos del solicitante" placement="right">
      <SolicitanteEditar @closeDraw="handleCloseDrawopen" :updateValues="updateValues" />
    </a-drawer>
  </section>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import AllFormalizacion20 from './components/AllFormalizacion20.vue';
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
import { dProfile } from '@/utils/storage.js';
import { useCounterStore } from '@/stores/selectes.js';
import CryptoJS from 'crypto-js';
// import { isNotario } from '@/utils/validations.js';

const role = JSON.parse(localStorage.getItem('role'));

const isNotary = () => {
  return role.some(r => r.id === 7);
};

const store = useCounterStore();
const router = useRouter();
const route = useRoute();

const type_document = ref(0);

const value1 = ref(null);
const value2 = ref(null);
const options1 = ref([
  { value: 'asesoria', label: 'ASESORÍA' },
  { value: 'ruc20', label: 'RUC 20' },
  { value: 'ruc10', label: 'RUC 10' }
]);

store.$patch({ cdes: store.cdes });
store.fetchCdes()

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

const handleChangeCde = (id) => {
  value2.value.cde_id = id
  localStorage.setItem('profile', JSON.stringify(value2.value));
}
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
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
  historialData.value = false;
  dniNumber.value = '';
  infoUser.value = [];
  historial.value = [];
  router.push({ name: 'asesorias-formalizaciones' });
}
const handleSelectAction = () => {
  setValues.value = null;
  setValues.value = infoUser.value;

  if (!value1.value) return message.warning('Seleccionar un tipo de servicio')
  if (value1.value == 'asesoria') open3.value = true
  if (value1.value == 'ruc10') open2.value = true;
  if (value1.value == 'ruc20') handleProccessRUC20();
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
const handleStartProcessRUC20 = () => {
  current.value = 0
  open1.value = true;
  openModal.value = false
}

const handleProccessRUC20 = async () => {
  try {
    loading1.value = true;

    const data = await makeRequest({ url: `formalization/list-ruc-20/${infoUser.value.id}`, method: 'GET' });

    if (data.length < 1) {
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
  if (data.status == 200) {
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
  if (data.status == 200) {
    infoUser.value = data.data
    handleShowHistorial(data.data.id)

    value2.value = JSON.parse(localStorage.getItem('profile'));


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
    const { data } = await makeRequest({ url: `historial/registers/${id}`, method: 'GET' });

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
    type_document.value = route.query.type
    dniNumber.value = route.query.number;
  }
});
</script>

<style lang="scss" scoped>
.box-info {

  b,
  span {
    font-size: 13px;
  }

  b {
    color: var(--primary);
    font-weight: 500;
  }
}

.box-icoedit {
  color: var(--secondary);
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.code-number {
  font-weight: 500 !important;
}

.ico-reload {
  color: #1677ff;
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

  // .column-2 {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   grid-gap: 1rem;
  //   @media screen and (max-width:1200px) {
  //     grid-template-columns: 1fr;
  //   }
  // }

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
  // cursor: pointer;

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
    // border: 1px solid var(--primary);
    // .code-number {
    //   color: var(--primary);
    // }
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