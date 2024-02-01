<template>
 
  <div class="agreement-wrapper">

    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'document_type'" v-model:value="formState[el.name]" :options="typeDocuments" :disabled="el.disabled" @change="handleChangeTypeDocument" />
            <a-select v-if="el.name == 'department'" v-model:value="formState[el.name]" :options="departments" @change="handleDepartaments" :disabled="el.disabled" />
            <a-select v-if="el.name == 'province'" v-model:value="formState[el.name]" :options="provinces" @change="handleProvinces" :disabled="el.disabled" />
            <a-select v-if="el.name == 'district'" v-model:value="formState[el.name]" :options="districts" :disabled="el.disabled" />
            <a-select v-if="el.name == 'person_type'" v-model:value="formState[el.name]" :options="typePerson" :disabled="el.disabled" />
            <a-select v-if="el.name == 'category'" v-model:value="formState[el.name]" :options="categories" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSearch'" class="item-max" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
            <a-input-search :maxlength="15" :loading="searchLoading" v-model:value="formState[el.name]" :disabled="el.disabled"
            @search="handleSearchApi(el.name)" @input="validateNumber(el.name)" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled" />
          </a-form-item>
        </template>

        <div>
          <h4>¿Cómo te enteraste del taller?</h4>
          <a-radio-group class="group-radios" v-model:value="addSocial">
            <a-radio class="item-radio" value="rrss">Redes sociales</a-radio>
            <a-radio class="item-radio" value="sms">SMS</a-radio>
            <a-radio class="item-radio" value="correo">Correo</a-radio>
          </a-radio-group>
        </div>

        <a-form-item class="btn-send">
          <a-button type="primary" html-type="submit" :loading="loading">PARTICIPAR</a-button>
        </a-form-item>

      </div>
    </a-form>
  </div>
</template>
s
<script setup>
import { reactive, ref, onMounted } from 'vue';
import fieldsJs from '@/forms/nuevaPersonaCompany.js'
import { requestNoToken } from '@/utils/noToken.js'
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { userId } from '@/utils/cookies.js'
import { typePerson, categories } from '@/utils/selects.js'

const props = defineProps(['idWorkshop'])

const fields = ref(fieldsJs)
const route = useRoute();
const router = useRouter();

const addSocial = ref(null)
const searchLoading = ref(false)
const loading = ref(false);
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);
const typeDocuments = [
  { label: 'DNI', value: 'dni' },
  { label: 'CE', value: 'ce' },
  { label: 'PAS', value: 'pas' },
  { label: 'PTP', value: 'ptp' } 
];

const formState = reactive({
  id_workshop: props.idWorkshop,

  ruc: null,
  social_reason: null,
  category: null,
  person_type: null,

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
  created_by: userId,
  update_by: userId,
  post: 4
});

const clearFields = () => {
  formState.ruc = null
  formState.social_reason = null
  formState.category = null
  formState.person_type = null

  formState.document_type = null
  formState.number_document = null
  formState.last_name = null
  formState.middle_name = null
  formState.name = null
  formState.department = null
  formState.province = null
  formState.district = null
  formState.phone = null
  formState.email = null
}
const enabled = () => {
  fields.value.category.disabled = false
  fields.value.person_type.disabled = false
  fields.value.document_type.disabled = false
  fields.value.number_document.disabled = false
}
const dniEnabled = () => {
  fields.value.last_name.disabled = false
  fields.value.middle_name.disabled = false
  fields.value.name.disabled = false
  fields.value.department.disabled = false
  fields.value.province.disabled = false
  fields.value.district.disabled = false
  fields.value.phone.disabled = false
  fields.value.email.disabled = false
}

const disabled = () => {
  fields.value.social_reason.disabled = true
  fields.value.category.disabled = true
  fields.value.person_type.disabled = true

  fields.value.document_type.disabled = true
  fields.value.number_document.disabled = true
  fields.value.last_name.disabled = true
  fields.value.middle_name.disabled = true
  fields.value.name.disabled = true
  fields.value.department.disabled = true
  fields.value.province.disabled = true
  fields.value.district.disabled = true
  fields.value.phone.disabled = true
  fields.value.email.disabled = true
}

const validateNumber = (name) => {
  formState[name] = formState[name].replace(/\D/g, '');
};

const handleSearchRuc = async () => {
  searchLoading.value = true
  try {
    const ruc = formState.ruc
    const {data} = await requestNoToken({ url: `/public/company/${ruc}`, method: 'GET' });
    
    if(data) {
      formState.social_reason = data.razonSocial
      enabled()
    }

    if(data.social_reason) {
      formState.social_reason = data.social_reason
      formState.category = data.category
      formState.person_type = data.person_type
    }
    
  } catch (error) {
    console.log(error);
    message.error("El número ingresado no es válido")
    formState.ruc = null
  } finally {
    searchLoading.value = false
  }
}
const handleSearchNumberDocument = async () => {
  if(!formState.document_type) return message.warning('Debes escoger un tipo de documento')

  searchLoading.value = true

  try {
    const response = await requestNoToken({ url: `/public/person/${formState.document_type}/${formState.number_document}`, method: 'GET' });

    if(response.status === 404) return dniEnabled()

    const data = response.data;

    formState.name = data.nombres
    formState.last_name = data.apellidoPaterno
    formState.middle_name = data.apellidoMaterno

    if(data.department) {
      formState.department = data.department; 
      getProvinces(data.department);
    }
    if(data.province) {
      formState.province = data.province; 
      getDistricts(data.province);
    }
    if(data.document_type) formState.document_type = data.document_type;
    if(data.district) formState.district = data.district
    if(data.email) formState.email = data.email
    if(data.phone) formState.phone = data.phone

    dniEnabled()

  } catch (error) {
    console.log("You have an error", error);
  } finally {
    searchLoading.value = false
  }
}

const handleSearchApi = async (type) => {
  if(type == 'ruc') {
    return handleSearchRuc()
  }

  if(type == 'number_document') {
    return handleSearchNumberDocument();
  }
}

const handleChangeTypeDocument = (e) => {
  clearFields()
  disabled()
  formState.document_type = e
}
const handleDepartaments = (id, evt) => {
  formState.province = null
  formState.district = null
  provinces.value = []
  districts.value = []
  getProvinces(evt.value)
}
const handleProvinces = (id, evt) => {
  formState.district = null
  districts.value = []
  getDistricts(evt.value)
}

const getDepartaments = async() => {
  try {
    const {data} = await requestNoToken({ url: '/departaments', method: 'GET' });

    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    departments.value = [...departments.value, ...arr];

    disabled()

  } catch (error) {
    console.log(error);
  }
};
const getProvinces = async(id) => {
  try {
    const {data} = await requestNoToken({ url: `/province/${id}`, method: 'GET' });
    
    let provincesArray = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    provinces.value = [...provinces.value, ...provincesArray];

  } catch (error) {
    console.log(error);
  }
};
const getDistricts = async(id) => {
  try {
    const {data} = await requestNoToken({ url: `/district/${id}`, method: 'GET' });
 
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    districts.value = [...districts.value, ...arr];

  } catch (error) {
    console.log(error);
  }
};


const onSubmit = async () => {
  const payload = formState
  loading.value = true
  try {
    const data = await requestNoToken({ url: '/public/accepted-invitation', method: 'POST', data: payload });
    if(data) {
      const query = {
        workshop: props.idWorkshop,
        ruc: payload.ruc,
        dni: payload.number_document
      }

      await requestNoToken({ url: `/public/add-point/${props.idWorkshop}/${addSocial.value}`, method: 'PUT' });

      router.push({ name: 'enviado', query });
      disabled()
      clearFields()
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

onMounted(
  getDepartaments
);
</script>

<style lang="scss" scoped>
.grid-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 1.5rem;
  padding: 1rem;
}
.ruc-search {
  padding: 1rem;
  width: 50%;
}
.btn-send {
  margin-top: 2.5rem;
  margin-bottom: 0;
  grid-column: 1/3;
  text-align: center;
}
</style>