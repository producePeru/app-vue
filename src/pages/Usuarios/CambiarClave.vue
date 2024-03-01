<template>
  <h3>CAMBIAR CONTRASEÑA</h3>

  <a-divider />

  <div class="password">

    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onSubmitFail">

      <a-form-item label="Contraseña actual" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="value" placeholder="" />
      </a-form-item>

      <a-form-item label="Nueva contraseña" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="value" placeholder="" />
      </a-form-item>

      <a-form-item label="Repetir la nueva contraseña" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="value" placeholder="" />
      </a-form-item>
        
 

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>


import { makeRequest } from '@/utils/api.js'
import { requestNoToken } from '@/utils/noToken.js'
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';

const storageData = JSON.parse(localStorage.getItem('user'))

const value = ref('');


const route = useRoute();

const loading = ref(!true);
const countries = ref([]);
const sedes = ref([]);
const dateFormat = 'YYYY-MM-DD';
const idUserUpdate = ref(null)


const formState = reactive({
  document_type: 1,
  document_number: null,
  last_name: null,
  middle_name: null,
  name: null,
  country_code: 173,
  email: null,
  office_code: null,
  sede_code: 1,
  birthdate: null,
  gender: null,
  lession: 0,
  phone_number: null,
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
// const fetchDataCountries = async () => {
//   try {
//     const { data } = await requestNoToken({ url: '/countries', method: 'GET' });
//     countries.value = data;
//   } catch (error) {
//     console.error('Error de red:', error);
//   }
// }
// const fetchDataSedes = async () => {
//   try {
//     const { data } = await makeRequest({ url: '/sedes', method: 'GET' });
//     sedes.value = data;
//     isloading.value = false
//   } catch (error) {
//     console.error('Error de red:', error);
//   }
// }



onMounted(() => {


});

</script>

<style lang="scss" scoped>
.password {
  max-width: 300px;
}
</style>