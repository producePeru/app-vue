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
    @finish="onSubmit">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item 
          class="item-max"
          v-if="el.type === 'iSelect'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'typeIntervention'" v-model:value="formState[el.name]" :options="typeIntervention" />
            <a-select v-if="el.name == 'exponentId'" v-model:value="formState[el.name]" :options="exponents" />
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
            <a-date-picker class="w-100" show-time :placeholder="formState.workshopDate" @change="onChange" :disabled-date="disabledDate" :locale="esES" format="DD-MM-YYYY HH:mm A" />
          </a-form-item>

        </template>
      </div>

      <div class="wrapper-form_btn">
        <a-button type="primary" html-type="submit" :loading="loading">{{ props.isIdUpdate ? 'Actualizar' : 'Registrar' }} taller</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref, onMounted, onUpdated } from 'vue'; 
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevoTaller.js'
import { esES } from 'ant-design-vue/lib/locale-provider';
import { makeRequest } from '@/utils/api.js'

const props = defineProps(['isIdUpdate'])
const emit = defineEmits(['handleCloseModal', 'refreshTable'])

onUpdated(() => {
  if (props.isIdUpdate) {
    formState.title = props.isIdUpdate.title
    formState.exponentId = props.isIdUpdate.exponent_k
    formState.workshopDate = props.isIdUpdate.workshop_date
    formState.typeIntervention = props.isIdUpdate.type_intervention
    formState.slug = props.isIdUpdate.slug
    formState.link = props.isIdUpdate.link
  } else {
    formState.title = null
    formState.exponentId = null
    formState.workshopDate = null
    formState.typeIntervention = null
    formState.slug = null
    formState.link = null
  }
});

const open = ref(true);
const loading = ref(false);

const formState = reactive({
  title: null,
  exponentId: null,
  workshopDate: null,
  typeIntervention: null,

  slug: null,
  link: null,

  userId: 1,
  testinId: null,
  testoutId: null,
  invitationId: null,
  status: 1,
  registered: null,
  rrss: null,
  sms: null,
  correo: null,
});

const exponents = ref([])
const typeIntervention = [
  { label: 'Marketing Digital', value: 1 },
  { label: 'Comercio Electrónico', value: 2 },
  { label: 'Gestión Empresarial', value: 3 },
  { label: 'Analisis de datos', value: 4 },
  { label: 'Medios de pago', value: 5 },
  { label: 'Finanzas', value: 6 },
];

const handleCloseModal = () => {
  emit('handleCloseModal', true)
  open.value = false;
}
const clearFields = () => {
  formState.title = null
  formState.exponentId = null
  formState.workshopDate = null
  formState.typeIntervention = null
  formState.slug = null
  formState.link = null
  formState.userId = 1
  formState.testinId = null
  formState.testoutId = null
  formState.invitationId = null
  formState.status = null
  formState.registered = null
  formState.rrss = null
  formState.sms = null
  formState.correo = null
}
const disabledDate = (current) => {
  // Obtén la fecha actual
  const today = new Date();
  // Configura la hora actual a medianoche para comparaciones precisas
  today.setHours(0, 0, 0, 0);

  // Deshabilita las fechas anteriores a la fecha actual
  return current && current < today;
};
const onChange = (value, dateString) => {
  formState.workshopDate = dateString
};

const onSubmit = async() => {
  const payload = formState
  loading.value = true
  
  let url, method
  
  if(props.isIdUpdate) {
    url = `/workshops/${props.isIdUpdate.id}`
    method = "PUT"
  } else {
    url = "/workshops"
    method = "POST"
  }
  try {
    const data = await makeRequest({ url, method, data: payload });
    clearFields()
    emit('refreshTable', true)
    message.success(data.message);
    handleCloseModal()
  } catch (error) {
    message.error('No se pudo registrar este taller');
  } finally {
    loading.value = false;
  }
};

const fetchData = async() => {
  try {
    const data = await makeRequest({ url: '/exponents', method: 'GET' });
    data.data.forEach(element => {
      const obj = {
        label: element.firstName + ' ' + element.lastName,
        value: element.id
      }
      exponents.value.push(obj)
    });
  } catch (error) {
    console.error('Error de red:', error);
  } 
}
onMounted(
  fetchData
);

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