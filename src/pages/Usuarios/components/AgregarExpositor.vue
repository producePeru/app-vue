<template>
  <a-modal 
  v-model:open="open" 
  title="Agregar expositor" 
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
            <a-select v-if="el.name == 'documentType'" v-model:value="formState[el.name]" :options="typeDocuments" />
            <a-select v-if="el.name == 'gender'" v-model:value="formState[el.name]" :options="geners" />
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
        <a-button type="primary" html-type="submit" :loading="loading">{{!isIdUpdate ? 'Registrar' : 'Actualizar'}} expositor</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref, onUpdated } from 'vue'; 
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevoExpositor.js'
import { makeRequest } from '@/utils/api.js'

const props = defineProps(['isIdUpdate'])
const emit = defineEmits(['handleCloseModal', 'refreshTable'])

onUpdated(() => {
  if (props.isIdUpdate) {
    formState.documentType = props.isIdUpdate.document_type
    formState.documentNumber = props.isIdUpdate.document_number
    formState.firstName = props.isIdUpdate.first_name
    formState.lastName = props.isIdUpdate.last_name
    formState.middleName = props.isIdUpdate.middle_name
    formState.gender = props.isIdUpdate.gender == 'h' ? 1 : 2
    formState.email = props.isIdUpdate.email
    formState.rucNumber = props.isIdUpdate.ruc_number
    formState.phoneNumber = props.isIdUpdate.phone_number
    formState.specialty = props.isIdUpdate.specialty
    formState.profession = props.isIdUpdate.profession
    formState.cvLink = props.isIdUpdate.cv_link
  } else {
    clearFields()
  }
});

const open = ref(true);
const loading = ref(false);
const formState = reactive({
  documentType: null,
  documentNumber: null,
  firstName: null,
  lastName: null,
  middleName: null,
  gender: null,
  email: null,
  rucNumber: null,
  phoneNumber: null,
  specialty: null,
  profession: null,
  cvLink: null,
  user_id: 1,
  enabled: 1
});

const geners = [
  { label: 'Masculino', value: 1 },
  { label: 'Femenino', value: 2 },
  { label: '...', value: 3 }
];
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
  formState.documentType = null
  formState.documentNumber = null
  formState.firstName = null
  formState.lastName = null
  formState.middleName = null
  formState.gender = null
  formState.email = null
  formState.rucNumber = null
  formState.phoneNumber = null
  formState.specialty = null
  formState.profession = null
  formState.cvLink = null
}

const onSubmit = async() => {

  const payload = formState
  loading.value = true
  let url, method

  if(props.isIdUpdate) {
    url = `/exponents/${props.isIdUpdate.id}`
    method = "PUT"
  } else {
    url = "/exponents"
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