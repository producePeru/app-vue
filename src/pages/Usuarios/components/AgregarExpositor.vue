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
    @finish="onSubmit"
    @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item 
          class="item-max"
          v-if="el.type === 'iSelect'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'type_document'" v-model:value="formState[el.name]" :options="typeDocuments" />
            <a-select v-if="el.name == 'sex'" v-model:value="formState[el.name]" :options="geners" />
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
        <a-button type="primary" html-type="submit" :loading="loading">Registrar expositor</a-button>
      </div>
    </a-form>

    <pre>{{ formState }}</pre>

  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue'; 
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevoExpositor.js'

const emit = defineEmits(['handleCloseModal'])

const open = ref(true);
const loading = ref(false);

const formState = reactive({
  type_document: null,
  number_document: null,
  name: null,
  last_name_p: null,
  last_name_m: null,
  sex: null,
  email: null,
  ruc: null,
  phone: null,
  specialty: null,
  profession: null,
  url_cv: null
});

const geners = [
  { label: 'Masculino', value: 1 },
  { label: 'Femenino', value: 2 },
  { label: '...', value: 3 }
];
const typeDocuments = [
  { label: 'DNI', value: 1 },
  { label: 'CE', value: 2 },
  { label: 'PAS', value: 3 },
  { label: 'PTP', value: 4 } 
];

const handleCloseModal = () => {
  emit('handleCloseModal', true)
  open.value = false;
}

const onSubmitFail = () => {
  // message.error('Debes de completar todos los espacios requeridos')
};
const onSubmit = values => {
  console.log("Valores", values)
  // const id_registrador = idUserStorage;
  // const payload = {...values, id_registrador}
  
  // loading.value = true
  // try {
  //   const data = await makeRequest({ url: '/register', method: 'POST', data: payload });
  //   clearFields()
  //   message.success(data.message);
  // } catch (error) {
  //   message.error('No se pudo registrar este usuario');
  // } finally {
  //   loading.value = false;
  // }
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
</style>