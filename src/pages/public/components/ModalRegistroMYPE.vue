<template>
  <a-modal v-model:open="open" title="Participar con mi empresa" style="top: 20px" footer="" @cancel="handleCloseModal" width="700px">
    <span class="modal-notice">Completa el formulario para participar</span>
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'type'" v-model:value="formState[el.name]" :options="typePerson" />
            <a-select v-if="el.name == 'department'" v-model:value="formState[el.name]" :options="departments" @change="handleDepartaments" />
            <a-select v-if="el.name == 'province'" v-model:value="formState[el.name]" :options="provinces" @change="handleProvinces" />
            <a-select v-if="el.name == 'district'" v-model:value="formState[el.name]" :options="districts" />
            <a-select v-if="el.name == 'sex'" v-model:value="formState[el.name]" :options="geners" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled" />
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
<pre>{{ formState }}</pre>
  </a-modal>
</template>

<script setup>
import { reactive, ref, onUpdated, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevaMYPE.js'
import { esES } from 'ant-design-vue/lib/locale-provider';
import { makeRequest } from '@/utils/api.js'
import options from '@/utils/categories.js'

const props = defineProps(['rucProp'])
const emit = defineEmits(['handleCloseModal','handleSetData'])

onUpdated(() => {
  formState.ruc = props.rucProp?.numeroDocumento ?? props.rucProp.numeroDocumento;
  formState.socialReason = props.rucProp?.razonSocial ?? props.rucProp.razonSocial;
});


const open = ref(true);
const loading = ref(false);

const formState = reactive({
  ruc: null,
  socialReason: null,
  category: null,
  type: null,
  department: null,
  province: null,
  district: null,
  dniNumber: null,
  name_full: null,
  sex: null,
  phone: null,
  email: null,
  // agree: null,
  // id_user: null,
});

const typePerson = [
  { label: 'JURÍDICA', value: 'JURIDICA' },
  { label: 'NATURAL', value: 'NATURAL' },
];
const geners = [
  { label: 'MASCULINO', value: 'MASCULINO' },
  { label: 'FEMENINO', value: 'FEMENINO' },
  { label: '...', value: 3 }
];

// start_place
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);

const getDepartaments = async() => {
  try {
    const {data} = await makeRequest({ url: '/departaments', method: 'GET' });
    departments.value = data
  } catch (error) {
    console.log(error);
  }
};
const handleDepartaments = (id, evt) => {
  console.log(evt);
  formState.province = null
  formState.district = null
  getProvinces(evt.id)
}
const getProvinces = async(id) => {
  try {
    const {data} = await makeRequest({ url: `/province/${id}`, method: 'GET' });
    provinces.value = data
  } catch (error) {
    console.log(error);
  }
};
const handleProvinces = (id, evt) => {
  formState.district = null
  getDistricts(evt.id)
}
const getDistricts = async(id) => {
  try {
    const {data} = await makeRequest({ url: `/district/${id}`, method: 'GET' });
    districts.value = data
  } catch (error) {
    console.log(error);
  }
};
// end_place

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

const onSubmit = async() => {
  const payload = {
    ruc: formState.ruc,
    socialReason: formState.socialReason,
    category: formState.category,
    type: formState.type,
    department: formState.department,
    district: formState.district,
    nameComplete: formState.name_full,
    dniNumber: formState.dniNumber,
    sex: formState.sex,
    phone: formState.phone,
    email: formState.email
  }

  loading.value = true
  try {
    const data = await makeRequest({ url: '/mype', method: 'POST', data: payload });
    message.success(data.message);
    emit('handleSetData', data.data)
    handleCloseModal()
  } catch (error) {
    message.error('Error al crear la Mype.');
  } finally {
    loading.value = false;
  }
};

onMounted(
  getDepartaments
);

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