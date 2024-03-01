<template>
  <a-breadcrumb>
    <a-breadcrumb-item><a @click="comeBack">Atrás</a></a-breadcrumb-item>
  </a-breadcrumb>
  <br>
  <h3 class="uppercase">REGISTRO DE {{ route.query.rol }}</h3>

  <br>

  <a-spin v-if="isloading" />

  <div v-else class="agreement-wrapper">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'document_type'" v-model:value="formState[el.name]" :options="typeDocuments" :disabled="el.disabled" @change="handleChangeTypeDocument" />
            <a-select v-if="el.name == 'department'" v-model:value="formState[el.name]" :options="departments" @change="handleDepartaments" :disabled="el.disabled" />
            <a-select v-if="el.name == 'province'" v-model:value="formState[el.name]" :options="provinces" @change="handleProvinces" :disabled="el.disabled" />
            <a-select v-if="el.name == 'district'" v-model:value="formState[el.name]" :options="districts" :disabled="el.disabled" />
            <a-select v-if="el.name == 'gender'" v-model:value="formState[el.name]" :options="geners" :disabled="el.disabled" />
            <a-select v-if="el.name == 'lession'" v-model:value="formState[el.name]" :options="disabilities" :disabled="el.disabled" />
            <a-select v-if="el.name == 'supervisor'" v-model:value="formState[el.name]" :options="supervisores" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSearch'" class="item-max" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
            <a-input-search :maxlength="15" :loading="searchLoading" v-model:value="formState[el.name]"
            @search="handleSearchApi" @input="validateNumber" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker :locale="locale" v-model:value="birthdateDate" style="width: 100%;" :format="dateFormat" :disabled="el.disabled" />
          </a-form-item>

        </template>
      </div>
  <!-- <pre>{{ formState }}</pre> -->
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import { reactive, ref, onMounted } from 'vue';
import fieldsJs from '@/forms/nuevaPersona.js'
import { requestNoToken } from '@/utils/noToken.js'
import { makeRequest } from '@/utils/api.js'
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { geners, disabilities } from '@/utils/selects.js'

const storageData = JSON.parse(localStorage.getItem('user'))

const fields = ref(fieldsJs)
const route = useRoute();
const router = useRouter();

const supervisores = ref([]);
const isloading = ref(true);
const searchLoading = ref(false)
const loading = ref(false);
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);
const dateFormat = 'YYYY-MM-DD';
const birthdateDate = ref(null);
const typeDocuments = [
  { label: 'DNI', value: 'dni' },
  { label: 'CE', value: 'ce' },
  { label: 'PAS', value: 'pas' },
  { label: 'PTP', value: 'ptp' } 
];

const formState = reactive({
  document_type: 'dni',
  number_document: null,
  last_name: null,
  middle_name: null,
  name: null,
  department: null,
  province: null,
  district: null,
  phone: null,
  email: null,
  birthdate: null,
  gender: null,
  lession: null,

  created_by: storageData.id,
  update_by: storageData.id,
  post: route.query.access
});

const clearFields = () => {
  formState.document_type = null
  formState.number_document = null
  formState.last_name = null
  formState.middle_name = null
  formState.name = null
  formState.department = null
  formState.province = null
  formState.district = null
  formState.phone = null
  formState.email = null
}
const enabled = () => {
  fields.value.last_name.disabled = false
  fields.value.middle_name.disabled = false
  fields.value.name.disabled = false
  fields.value.department.disabled = false
  fields.value.province.disabled = false
  fields.value.district.disabled = false
  fields.value.phone.disabled = false
  fields.value.email.disabled = false
  fields.value.birthdate.disabled = false
  fields.value.gender.disabled = false
  fields.value.lession.disabled = false
}
const disabled = () => {
  fields.value.last_name.disabled = true
  fields.value.middle_name.disabled = true
  fields.value.name.disabled = true
  fields.value.department.disabled = true
  fields.value.province.disabled = true
  fields.value.district.disabled = true
  fields.value.phone.disabled = true
  fields.value.email.disabled = true
  fields.value.birthdate.disabled = true
  fields.value.gender.disabled = true
  fields.value.lession.disabled = true
}
const isAsesor = () => {
  const role = route.query.rol
  if(role === 'asesor') {
    const supervisor = {
      type: 'iSelect',
      label: 'Supervisor',
      name: 'supervisor',
      required: true,
      message: 'Seleccionar el supervisor'
    }
    fields.value = {...fields.value, supervisor}
  }
}

const validateNumber = () => {
  formState.number_document = formState.number_document.replace(/\D/g, '');
};

const handleSearchApi = async () => {
  if(!formState.document_type) return message.warning('Debes escoger un tipo de documento')

    searchLoading.value = true

    try {
      const response = await makeRequest({ url: `/person/${formState.document_type}/${formState.number_document}`, method: 'GET' });

      if(response.status === 404) return enabled()

      const data = response.data;

      formState.name = data.nombres
      formState.last_name = data.apellidoPaterno
      formState.middle_name = data.apellidoMaterno

      if(data.department) {
        formState.department = data.department; 
        getProvinces(data.department);
      }
      if(data.province) {
        formState.province = data.province; 
        getDistricts(data.province);
      }
      if(data.document_type) formState.document_type = data.document_type;
      if(data.district) formState.district = data.district
      if(data.email) formState.email = data.email
      if(data.phone) formState.phone = data.phone

      if(data.birthdate) birthdateDate.value = dayjs(data.birthdate, dateFormat);
      if(data.gender) formState.gender = data.gender;
      
      formState.lession = data.lession;

      enabled()

    } catch (error) {
      console.log("Hhhhh", error);
    } finally {
      searchLoading.value = false
    }
}

const handleChangeTypeDocument = (e) => {
  clearFields()
  disabled()
  formState.document_type = e
}
const handleDepartaments = (id, evt) => {
  formState.province = null
  formState.district = null
  provinces.value = []
  districts.value = []
  getProvinces(evt.value)
}
const handleProvinces = (id, evt) => {
  formState.district = null
  districts.value = []
  getDistricts(evt.value)
}
const comeBack = () => {
  if(route.query.dni) {
    const query = { dni: route.query.dni }
    router.push({ name: 'asesorias-formalizaciones', query });
  } else {
    const url = route.query.access
    if(url == 1) router.push(`/admin/asesorias/supervisores`);
    if(url == 2) router.push(`/admin/asesorias/asesores`);
    if(url == 3) router.push(`/admin/asesorias/solicitantes`);
  }
}

const getDepartaments = async() => {

  fields.value.document_type.disabled = false

  try {
    const {data} = await requestNoToken({ url: '/departaments', method: 'GET' });

    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    departments.value = [...departments.value, ...arr];

    isloading.value = false

    disabled()
    isAsesor()

  } catch (error) {
    console.log(error);
  }
};
const getProvinces = async(id) => {
  try {
    const {data} = await requestNoToken({ url: `/province/${id}`, method: 'GET' });
    
    let provincesArray = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    provinces.value = [...provinces.value, ...provincesArray];

  } catch (error) {
    console.log(error);
  }
};
const getDistricts = async(id) => {
  try {
    const {data} = await requestNoToken({ url: `/district/${id}`, method: 'GET' });
 
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    districts.value = [...districts.value, ...arr];

  } catch (error) {
    console.log(error);
  }
};


const onSubmit = async () => {

  formState.birthdate = birthdateDate.value ? dayjs(birthdateDate.value).format('YYYY-MM-DD') : null;
  const payload = formState

  loading.value = true

  try {
    const data = await makeRequest({ url: '/new-person', method: 'POST', data: payload });
    if(data) {
      clearFields()
      disabled()
      formState.document_type = 'dni'
      message.success(data.message);
      comeBack()
    }
  } catch (error) {

    if(error.response.status == 550) {
      return message.error('El usuario ya se encuentra registrado');
    }

    message.error('Error al registrar');

  } finally {
    loading.value = false
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};

const getAllSupervisores = async() => {                   //lista los supervisores
  try {
    const data = await makeRequest({ url: '/supervisores', method: 'GET' });
    supervisores.value = data
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const isApplicantNew = async() => {
  if(route.query.dni) {
    const data = await makeRequest({ url: `/person/dni/${route.query.dni}`, method: 'GET' });

    if(data.status == 404) {
      formState.number_document = route.query.dni
    } else {
      formState.number_document = route.query.dni
      formState.last_name = data.data.apellidoPaterno
      formState.middle_name = data.data.apellidoMaterno
      formState.name = data.data.nombres
    }
    enabled()
    isloading.value = false
  }
}

onMounted(() => {
  getDepartaments();
  isApplicantNew();

  if(route.query.rol === 'asesor') getAllSupervisores();

});
</script>

<style lang="scss" scoped>
.uppercase {
  text-transform: uppercase;
}
.agreement-wrapper {
  max-width: 700px;
}

.grid-item {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 47% 47%;
    grid-gap: 0 2.5rem;
  }
}
</style>