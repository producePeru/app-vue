<template>
  <a-modal v-model:open="open" title="Participar con mi empresa" style="top: 20px" footer="" @cancel="handleCloseModal" width="700px">
    <span class="modal-notice">Completa el formulario para participar</span>
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'type_person'" v-model:value="formState[el.name]" :options="typePerson" />
            <a-select v-if="el.name == 'department'" v-model:value="formState[el.name]" :options="departments" />
            <a-select v-if="el.name == 'province'" v-model:value="formState[el.name]" :options="provinces" />
            <a-select v-if="el.name == 'district'" v-model:value="formState[el.name]" :options="districts" />
            <a-select v-if="el.name == 'sex'" v-model:value="formState[el.name]" :options="geners" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker class="w-100" show-time placeholder="" @change="onChange" @ok="onOk" :locale="esES"
              format="DD-MM-YYYY HH:mm A" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSearch'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, min:2 }]">
            <a-select
            v-model:value="formState[el.name]"
            show-search
            placeholder=""
            :options="options"
            :filter-option="filterOption" />
          </a-form-item>

          <a-form-item class="final-column" v-if="el.type === 'iCheck'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-checkbox @change="handleCheckStatus" v-model:checked="formState[el.name]">
            <p class="agree-message">Autorizo el uso de mis datos personales para recibir invitaciones a los talleres de Ruta Digital organizados por el <b>Programa Nacional Tu Empresa </b> y/o <b>el Ministerio de la Producción</b></p>
            </a-checkbox>
          </a-form-item>

          


        </template>
      </div>

      <div class="wrapper-form_btn">
        <a-button type="primary" html-type="submit" :loading="loading">Participar</a-button>
      </div>
    </a-form>

    <!-- <pre>{{ formState }}</pre> -->

  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevaMYPE.js'
import { esES } from 'ant-design-vue/lib/locale-provider';

const emit = defineEmits(['handleCloseModal'])

const open = ref(true);
const loading = ref(false);

const formState = reactive({
  ruc: null,
  business_name: null,
  category: null,
  type_person: null,
  department: null,
  province: null,
  district: null,
  document_number: null,
  name_full: null,
  sex: null,
  phone: null,
  email: null,
  agree: null,
  id_user: null,
});

const typePerson = [
  { label: 'Jurídica', value: 1 },
  { label: 'Natural', value: 2 },
];
const geners = [
  { label: 'Masculino', value: 1 },
  { label: 'Femenino', value: 2 },
  { label: '...', value: 3 }
];
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);



const options = ref([
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'tom',
    label: 'Tom',
  },
]);




const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const handleCloseModal = () => {
  emit('handleCloseModal', true)
  open.value = false;
}
const handleCheckStatus = (e) => {
  if(!e.target.checked) {
    formState.agree = null
  }
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
.modal-notice {
  color: var(--primary);
  display: block;
  margin-bottom: .3rem;
}
.wrapper-form_btn {
  margin-top: 1rem;
  text-align: center;
}
.grid-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 1.5rem;
}
.final-column {
  grid-column: 1/3;
  .agree-message {
    line-height: 1.3;
    margin: 1rem 0 0 0;
  }
}
</style>