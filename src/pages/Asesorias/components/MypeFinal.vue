<template>
  <div class="wrapper-booking">
    <!-- <h4>final CONSTITUTIVO</h4> -->
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in final" :key="idx">

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max, min: el.min }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled">
              <template #prefix>
                <span v-show="isTwenty" class="emp-20">20</span>
              </template>
            </a-input>
          </a-form-item>

        </template>
      </div>
      <!-- <pre>{{ props.info }}</pre> -->
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { final } from '@/forms/asesorias.js'
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';

const storageData = JSON.parse(localStorage.getItem('user'))
const props = defineProps(['info']);
const emit = defineEmits(['closeDraw']);

const loading = ref(false);
const isTwenty = ref(true);
const formState = reactive({
  id_person: null,
  dni: null,
  step: 3, 
  code_sid_sunarp: null,

  ruc: null,
  updated_by: storageData.id
});

const onSubmit = async () => {
  formState.id_person = props.info.id_person;
  formState.dni = props.info.dni;
  formState.code_sid_sunarp = props.info.code_sid_sunarp;
  formState.ruc = `20${formState.ruc}`;

  loading.value = true;
  isTwenty.value = false;

  const payload_1 = {
    ruc: formState.ruc,
    social_reason: props.info.social_reason,
    category: props.info.category,
    person_type: 2,
    economic_sector: props.info.economy_sector,
    department: props.info.department, 
    province: props.info.province,
    district: props.info.district,
    address: props.info.address,
    email: null,
    phone: null,
    created_by: 1,
    update_by: 1,
    status: 1
  }

  const payload_2 = {
    number: props.info.dni,
    id_post: 4
  }
  
  try {
    const data =  await makeRequest({ url: '/formalization20',        method: 'POST', data: formState });
                  await makeRequest({ url: '/formalization-company',  method: 'POST', data: payload_1 });
                  await makeRequest({ url: '/person-post',            method: 'POST', data: payload_2 });

      message.success(data.message);
      formState.ruc = null;
      emit('closeDraw', true)
    
  } catch (error) {
    message.error('Error al registrar');
  } finally {
    loading.value = false
  }
};
const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};
</script>

<style scoped lang="scss">
.wrapper-booking {
  max-width: 250px;
  margin-top: 2rem;
  h3 {
    margin-bottom: 2rem;
  }
  .emp-20 {
    color: #1677ff;
    font-weight: 600;
  }
}
</style>