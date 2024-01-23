<template>
  <a-modal 
  v-model:open="open" 
  title="Asesores" 
  style="top: 40px"
  footer="" 
  @cancel="handleCloseModal"
  width="700px">

    <a-form
    layout="vertical"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onSubmit">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item 
          class="item-max"
          v-if="el.type === 'iSelect'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'document_type'" v-model:value="formState[el.name]" :options="typeDocuments" />
            <a-select v-if="el.name == 'department'" v-model:value="formState[el.name]" :options="departments" @change="handleDepartaments" />
            <a-select v-if="el.name == 'province'" v-model:value="formState[el.name]" :options="provinces" @change="handleProvinces" />
            <a-select v-if="el.name == 'district'" v-model:value="formState[el.name]" :options="districts" />
            <a-select v-if="el.name == 'supervisor'" v-model:value="formState[el.name]" :options="districts" />
            <a-select v-if="el.name == 'id_sede'" v-model:value="formState[el.name]" :options="sedes" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-model:value="formState[el.name]" show-search :options="supervisors" :filter-option="filterOption" />
          </a-form-item>

          <a-form-item
          v-if="el.type === 'iText'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>
        </template>
      </div>

      <div class="wrapper-form_btn">
        <a-button type="primary" html-type="submit" :loading="loading">{{!isIdUpdate ? 'Registrar' : 'Actualizar'}}</a-button>
      </div>
    </a-form>
    <!-- <pre>:::-- {{ formState }}</pre> -->
  </a-modal>
</template>

<script setup>
import { reactive, ref, onUpdated, onMounted } from 'vue'; 
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevoAsesor.js'
import { makeRequest } from '@/utils/api.js';
import { requestNoToken } from '@/utils/noToken.js'
import { userId } from '@/utils/cookies.js'

const props = defineProps(['isIdUpdate'])
const emit = defineEmits(['handleCloseModal', 'refreshTable'])

onUpdated(() => {
  if (props.isIdUpdate) {
    formState.document_type = props.isIdUpdate.document_type
    formState.number_document = props.isIdUpdate.number_document
    formState.id_sede = props.isIdUpdate.id_sede
    formState.id_supervisor = props.isIdUpdate.id_supervisor
    formState.name = props.isIdUpdate.name
    formState.last_name = props.isIdUpdate.last_name
    formState.middle_name = props.isIdUpdate.middle_name
    formState.department = props.isIdUpdate.department
    getProvinces(props.isIdUpdate.department)
    formState.province = props.isIdUpdate.province
    getDistricts(props.isIdUpdate.province)
    formState.district = props.isIdUpdate.district
    formState.email = props.isIdUpdate.email
    formState.phone = props.isIdUpdate.phone
  } else {
    clearFields()
  }
});

// start_place
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);
const sedes = ref([]);
const supervisors = ref([]);

const getDepartaments = async() => {
  try {
    const {data} = await requestNoToken({ url: '/departaments', method: 'GET' });

    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    departments.value = [...departments.value, ...arr];

  } catch (error) {
    console.log(error);
  }
};
const handleDepartaments = (id, evt) => {
  formState.province = null
  formState.district = null
  provinces.value = []
  districts.value = []
  getProvinces(evt.value)
}
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
const handleProvinces = (id, evt) => {
  formState.district = null
  districts.value = []
  getDistricts(evt.value)
}
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
// end_place

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const open = ref(true);
const loading = ref(false);

const formState = reactive({
  document_type: null,
  number_document: null,
  id_supervisor: null,
  id_sede: null,
  last_name: null,
  middle_name: null,
  name: null,
  department: null,
  province: null,
  district: null,
  email: null,
  phone: null,
  created_by: userId
});

const typeDocuments = [
  { label: 'DNI', value: 'dni' },
  { label: 'CE', value: 'ce' },
  { label: 'PAS', value: 'pas' },
  { label: 'PTP', value: 'ptp' } 
];

const handleCloseModal = () => {
  emit('handleCloseModal', true)
  open.value = false;
}

const clearFields = () => {
  formState.document_type = null
  formState.number_document = null
  formState.last_name = null
  formState.middle_name = null
  formState.name = null
  formState.department = null
  formState.province = null
  formState.district = null
  formState.email = null
  formState.phone = null
}

const onSubmit = async() => {

  const payload = formState
  loading.value = true
  let url, method

  if(props.isIdUpdate) {
    url = `/advisor/${props.isIdUpdate.id}`
    method = "PUT"
  } else {
    url = "/advisor"
    method = "POST"
  }
  try {
    const data = await makeRequest({ url, method, data: payload });
    clearFields()
    emit('refreshTable', true)
    message.success(data.message);
    handleCloseModal()
  } catch (error) {
    message.error('No se pudo registrar al exponente');
  } finally {
    loading.value = false;
  }
};

const fetchDataSedes = async () => {
  try {
    const { data } = await makeRequest({ url: '/sedes', method: 'GET' });
    sedes.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const fetchSupervisors = async () => {
  try {
    const { data } = await makeRequest({ url: '/supervisors-list', method: 'GET' });
    supervisors.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(() => {
  getDepartaments(),
  fetchDataSedes(),
  fetchSupervisors()
});
</script>

<style lang="scss" scoped>
.wrapper-form_btn {
  margin-top: 1rem;
  text-align: right;
}
.grid-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 1.5rem;
}
.white {
  display: none;
}
</style>