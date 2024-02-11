<template>
  <h3>ACTUALIZAR USUARIO</h3>

  <a-divider />

  <a-spin v-if="isloading" />

  <div v-else class="user">

    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'document_type'" v-model:value="formState[el.name]" :options="typeDocuments" :disabled="el.disabled" />
            <a-select v-if="el.name == 'gender'" v-model:value="formState[el.name]" :options="geners" />
            <a-select v-if="el.name == 'isDisabled'" v-model:value="formState[el.name]" :options="disabilities" />
            <a-select v-if="el.name == 'office_code'" v-model:value="formState[el.name]" :options="offices" />
            <a-select v-if="el.name == 'sede_code'" v-model:value="formState[el.name]" :options="sedes" />
            <a-select v-if="el.name == 'role'" v-model:value="formState[el.name]" :options="typeUsers" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item v-show="!route.query.dni" v-if="el.type === 'iPassword'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-model:value="formState[el.name]" show-search :options="countries" :filter-option="filterOption" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker :locale="locale" v-model:value="formState.birthdate" style="width: 100%;" :format="dateFormat" />
          </a-form-item>
        </template>
      </div>

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

import { makeRequest } from '@/utils/api.js'
import { requestNoToken } from '@/utils/noToken.js'
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/actualizarUsuario.js'
import { typeDocuments, geners, disabilities, typeUsers, offices } from '@/utils/selects.js'
import { useRoute } from 'vue-router';

const storageData = JSON.parse(localStorage.getItem('user'))

const route = useRoute();
const isloading = ref(true);
const loading = ref(!true);
const countries = ref([]);
const sedes = ref([]);
const dateFormat = 'YYYY-MM-DD';
const idUserUpdate = ref(null)

const formState = reactive({
  birthdate: null,
  gender: null,
  lession: 0,
  phone_number: null,
  document_type: 1,
  document_number: null,
  last_name: null,
  middle_name: null,
  name: null,
  country_code: 173,
  email: null,
 
  office_code: null,
  sede_code: 1,

 
  updated_by: storageData.id,
});


const onSubmit = async () => {
  const payload = formState
  loading.value = true
  try {
    const data = await makeRequest({ url: `user/${idUserUpdate.value}`, method: 'PUT', data: payload });
    message.success(data.message)
  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};


const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const fetchDataCountries = async () => {
  try {
    const { data } = await requestNoToken({ url: '/countries', method: 'GET' });
    countries.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const fetchDataSedes = async () => {
  try {
    const { data } = await makeRequest({ url: '/sedes', method: 'GET' });
    sedes.value = data;
    isloading.value = false
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const fetchData = async () => {
  try {
    const { data } = await makeRequest({ url: `/user/${route.params.dni}`, method: 'GET' });
    
    idUserUpdate.value = data.id
    formState.document_number = data.document_number
    formState.last_name = data.last_name
    formState.middle_name = data.middle_name
    formState.name = data.name
    formState.country_code = data.country_code
    formState.email = data.email
    formState.office_code = data.office_code
    formState.sede_code = data.sede_code
    formState.gender = data.gender

  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(() => {
  fetchData(),
  fetchDataCountries(),
  fetchDataSedes()
});

</script>

<style lang="scss" scoped>
.user {
  display: grid;
  grid-template-columns: 52% 42%;
  grid-gap: 5%;
}

.grid-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 1rem;
}

.item-max {
  width: 100%;
  min-width: 100px;
}

.roles {
  .title {
    margin-bottom: .3rem;
    display: block;
  }
}
</style>