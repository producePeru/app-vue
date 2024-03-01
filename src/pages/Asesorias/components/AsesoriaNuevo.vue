<template>
  <div class="wrapper-booking">
    <!-- <h3>DATOS DE LA FORMALIZACIÓN</h3> -->
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in asesoria" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">


            
            <a-select v-if="el.name == 'component'" v-model:value="formState[el.name]" :options="modality"
              :disabled="el.disabled" />
            <a-select v-if="el.name == 'tema_compoment'" v-model:value="formState[el.name]" :options="economicSectors"
              :disabled="el.disabled" />



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

          <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-textarea v-model:value="formState[el.name]" :rows="4" />

          </a-form-item>

        </template>
      </div>
      <!-- <pre>{{ asesoria }}</pre> -->
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { asesoria } from '@/forms/asesorias.js'
import { reactive, ref, onMounted } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { economicSectors } from '@/utils/selects.js'
import { modality } from '@/utils/selects.js'

const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);
const loading = ref(false);
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

  // created_by: userId,
  // update_by: userId,
  // post: route.query.access
});

const onSubmit = async () => {
  // formState.birthdate = dayjs(birthdateDate.value).format('YYYY-MM-DD')
  // const payload = formState
  // loading.value = true

  // try {
  //   const data = await makeRequest({ url: '/new-person', method: 'POST', data: payload });
  //   if(data) {
  //     clearasesoria()
  //     disabled()
  //     formState.document_type = 'dni'
  //     comeBack()
  //     message.success('Registro exitoso');
  //   }
  // } catch (error) {

  //   if(error.response.status == 550) {
  //     return message.error('El usuario ya se encuentra registrado');
  //   }

  //   message.error('Error al registrar');

  // } finally {
  //   loading.value = false
  // }
};
const onSubmitFail = () => {
  // message.error('Debes de completar todos los espacios requeridos')
};

const getDepartaments = async () => {
  try {
    const { data } = await requestNoToken({ url: '/departaments', method: 'GET' });
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    departments.value = [...departments.value, ...arr];
  } catch (error) {
    console.log(error);
  }
};
const getProvinces = async (id) => {
  formState.province = null
  formState.district = null
  provinces.value = []
  districts.value = []
  try {
    const { data } = await requestNoToken({ url: `/province/${id}`, method: 'GET' });
    let provincesArray = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    provinces.value = [...provinces.value, ...provincesArray];
  } catch (error) {
    console.log(error);
  }
};
const getDistricts = async (id) => {
  formState.district = null
  districts.value = []
  try {
    const { data } = await requestNoToken({ url: `/district/${id}`, method: 'GET' });
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    districts.value = [...districts.value, ...arr];
  } catch (error) {
    console.log(error);
  }
};

onMounted(
  getDepartaments
);
</script>

<style scoped lang="scss">

.grid-booking {
  max-width: 300px;
}
</style>