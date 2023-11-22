<template>
  <a-modal 
  v-model:open="open" 
  title="Nuevo Taller" 
  style="top: 20px"
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
            <a-select v-if="el.name == 'id_exponent'" v-model:value="formState[el.name]" :options="typeDocuments" />
            <a-select v-if="el.name == 'intervention'" v-model:value="formState[el.name]" :options="geners" />
          </a-form-item>

          <a-form-item
          v-if="el.type === 'iText'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

          <a-form-item
          v-if="el.type === 'iDate'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-date-picker class="w-100" show-time placeholder="" @change="onChange" @ok="onOk" :locale="esES" format="DD-MM-YYYY HH:mm A" />
          </a-form-item>

        </template>
      </div>

      <div class="wrapper-form_btn">
        <a-button type="primary" html-type="submit" :loading="loading">Registrar taller</a-button>
      </div>
    </a-form>

    <pre>{{ formState }}</pre>

  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue'; 
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevoTaller.js'
import { esES } from 'ant-design-vue/lib/locale-provider';

const emit = defineEmits(['handleCloseModal'])

const open = ref(true);
const loading = ref(false);

const formState = reactive({
  id_user: null,
  title: null,
  id_exponent: null,
  date_workshop: null,
  intervention: null,
  id_in_test: null,
  id_output_test: null,
  number_registered: 0
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




const onChange = (value, dateString) => {
  formState.date_workshop = dateString
};
const onOk = value => {
  // console.log('onOk: ', value);
};




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