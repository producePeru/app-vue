<template>
  <div class="wrapper-booking">
    <!-- <h4>ACTO CONSTITUTIVO</h4> -->
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in acto" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">

            <a-select v-if="el.name == 'id_notary'" v-model:value="formState[el.name]" :options="notaries"
              :disabled="el.disabled" />
            <!-- <a-select v-if="el.name == 'modality'" v-model:value="formState[el.name]" :options="modality"
              :disabled="el.disabled" /> -->

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
            <a-date-picker :locale="locale" v-model:value="birthdateDate" style="width: 100%;" :format="dateFormat"
              :disabled="el.disabled" />
          </a-form-item>

        </template>
      </div>
      <!-- <pre>:::{{ props.info }}</pre>
      <pre>{{ formState }}</pre> -->
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { acto } from '@/forms/asesorias.js'
import { reactive, ref, onMounted } from 'vue';
import { modality } from '@/utils/selects.js'
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';

const storageData = JSON.parse(localStorage.getItem('user'));
const personData = JSON.parse(localStorage.getItem('info'));
const props = defineProps(['info']);
const emit = defineEmits(['closeDraw']);

const notaries = ref([]);
const loading = ref(false);
const formState = reactive({
  id_person: null,
  dni: null,
  step: 2, 
  code_sid_sunarp: null,

  social_reason: null,
  
  num_notary: null,
  id_notary: null,
  // modality: null,
  updated_by: personData.id,

  created_by: personData.id,
  created_dni: personData.dni
});

const onSubmit = async () => {
  formState.id_person = props.info.id_person;
  formState.dni = props.info.dni;
  formState.code_sid_sunarp = props.info.code_sid_sunarp;
  loading.value = true;
  try {
    const data = await makeRequest({ url: '/formalization20', method: 'POST', data: formState });
    if(data) {
      message.success(data.message);
      formState.social_reason = null;
      
      formState.id_notary = null;
      formState.num_notary = null;
      // formState.modality = null;
      emit('closeDraw', true)
    }
  } catch (error) {
    message.error('Error al registrar');
  } finally {
    loading.value = false
  }
};
const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};


const getNotaries = async () => {
  try {
    const { data } = await makeRequest({ url: '/notaries-select', method: 'GET' });
    notaries.value = data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(async() => {
  await getNotaries()
});
</script>

<style scoped lang="scss">
.wrapper-booking {
  max-width: 250px;
  margin-top: 2rem;
  h3 {
    margin-bottom: 2rem;
  }
}
</style>