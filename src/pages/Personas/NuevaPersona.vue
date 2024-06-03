<template>
  <div class="agreement-wrapper">
    <h3>Formulario de registro</h3>
    <br>

    <a-spin :spinning="searchLoading">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'typedocument_id'" v-model:value="formState[el.name]"
              :options="store.typeDocuments" :disabled="el.disabled" @change="handleSelectTypeDocument" />
            <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" :options="store.cities" show-search :filter-option="filterOption"
              @change="handleDepartaments" :disabled="el.disabled" />
            <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" :options="provinces" show-search :filter-option="filterOption"
              @change="handleProvinces" :disabled="!formState.city_id" />
            <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" :options="districts" show-search :filter-option="filterOption"
              :disabled="!formState.province_id" />
            <a-select v-if="el.name == 'gender_id'" v-model:value="formState[el.name]" :options="store.genders"
              :disabled="el.disabled" />
            <a-select v-if="el.name == 'lession'" v-model:value="formState[el.name]" :options="disabilities"
              :disabled="el.disabled" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSearch'" class="item-max" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-input-search :loading="searchLoading" v-model:value="formState[el.name]" @search="handleSearchApi"
              @input="validateNumber" :maxlength="formState.typedocument_id == 1 ? 8 : 20" disabled />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-if="el.name == 'phone'" v-model:value="formState[el.name]" :disabled="el.disabled" :maxlength="el.max" @input="validateNumberPhone" />
            <a-input v-else v-model:value="formState[el.name]" :disabled="el.disabled" :maxlength="el.max" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker :locale="locale" v-model:value="birthdateDate" style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" @change="formState.birthday = birthdateDate"
              :disabled="el.disabled" />
          </a-form-item>
        </template>
      </div>
      <div>{{ update() }}</div>
      <!-- <pre>{{ provinces }}</pre> -->
      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">REGISTRAR</a-button>
      </a-form-item>
    </a-form>
    </a-spin>
  </div>
</template>

<script setup>
import { requestNoToken } from '@/utils/noToken.js';
import { reactive, ref, onMounted } from 'vue';
import fieldsJs from '@/forms/nuevaPersona.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';
import { disabilities } from '@/utils/selects.js'
import { makeRequest } from '@/utils/api.js';
import { useRouter, useRoute } from 'vue-router';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const route = useRoute();
const store = useCounterStore();

store.$patch({ typeDocuments: store.typeDocuments });
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.$patch({ genders: store.genders });

store.fetchTypeDocuments();
store.fetchCities();
store.fetchGenders();

const provinces = ref(null);
const districts = ref(null);
const router = useRouter();
const storageData = JSON.parse(localStorage.getItem('profile'))
const fields = ref(fieldsJs)
const searchLoading = ref(true);
const birthdateDate = ref(null);
const dateFormat = 'DD/MM/YYYY';
const loading = ref(false);
const spinning = ref(true);

const formState = reactive({
  typedocument_id: null,
  documentnumber: null,
  lastname: null,
  middlename: null,
  name: null,
  city_id: null,
  address: null,
  province_id: null,
  district_id: null,
  phone: null,
  email: null,
  birthday: null,
  gender_id: null,
  lession: null,
  people_id: storageData.user_id,
  from_id: 1
});

const fetchProvinces = async(id) =>  {
  try {
    const { data } = await requestNoToken({ url: `select/provinces/${id}`, method: 'GET' });
    provinces.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const fetchDistricts = async(id) =>  {
  try {
    const { data } = await requestNoToken({ url: `select/districts/${id}`, method: 'GET' });
    districts.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const update = () => {
  if(store.typeDocuments) spinning.value = false;
}
const handleDisabled = () => {
  fields.value.lastname.disabled = false;
  fields.value.middlename.disabled = false;
  fields.value.name.disabled = false;
  fields.value.city_id.disabled = false;
  fields.value.province_id.disabled = false;
  fields.value.district_id.disabled = false;
  fields.value.address.disabled = false;
  fields.value.phone.disabled = false;
  fields.value.email.disabled = false;
  fields.value.birthday.disabled = false;
  fields.value.gender_id.disabled = false;
  fields.value.lession.disabled = false;
}
const handleSelectTypeDocument = (val) => {
  if (val) {
    fields.value.documentnumber.disabled = false;
    formState.documentnumber = null;
  }
}

const handleSearchApi = async (numberDocument) => {
  searchLoading.value = true

  if (!numberDocument) {
    message.warning("Ingresa un número de documento")
    return searchLoading.value = false
  }

  if (formState.typedocument_id == 1) {
    
    const {data} = await makeRequest({ url: `user/api/dni/${formState.documentnumber}`, method: 'GET' });

    if(data.body) {
      formState.lastname = data.body?.apePaterno;
      formState.middlename = data.body?.apeMaterno
      formState.name = data.body?.preNombres
      formState.address = data.body?.desDireccion;
      if(data.body?.feNacimiento) formState.birthday = dayjs(data.body?.feNacimiento, 'DD/MM/YYYY');
      if(data.body?.feNacimiento) birthdateDate.value = dayjs(data.body?.feNacimiento, 'DD/MM/YYYY');
      
      if(data.body?.ubigeo) {
        let region = store.cities.find(city => city.label === data.body.ubigeo?.departamento);
        let provincias = await requestNoToken({ url: `select/provinces/${region.value}`, method: 'GET' });
        provinces.value = provincias.data
        let provincia = provincias.data.find(province => province.label === data.body.ubigeo?.provincia);
        
        let distritos = await requestNoToken({ url: `select/districts/${provincia.value}`, method: 'GET' });
        districts.value = distritos.data
        let distrito = distritos.data.find(item => item.label === data.body.ubigeo?.distrito);
        
        formState.city_id = region.value;
        formState.province_id = provincia.value;
        formState.district_id = distrito.value;
      }
    }
    
  }

  if (formState.typedocument_id == 2) {
    const {data} = await makeRequest({ url: `user/api/ce/${formState.documentnumber}`, method: 'GET' });
    if(data.body) {
      formState.lastname = data.body?.apellido_paterno;
      formState.middlename = data.body?.apellido_materno
      formState.name = data.body?.nombres
      formState.gender_id = data.body?.sexo == 'F' ? 2 : 1;
      if(data.body?.fecha_nacimiento) formState.birthday = dayjs(data.body?.fecha_nacimiento, 'DD/MM/YYYY');
      if(data.body?.fecha_nacimiento) birthdateDate.value = dayjs(data.body?.fecha_nacimiento, 'DD/MM/YYYY');
      // formState.country = data.body.nacionalidad
    }
  }
  
  if (formState.typedocument_id == 3) {
    const {data} = await makeRequest({ url: `user/api/pas/${formState.documentnumber}`, method: 'GET' });
    const valuex = data.body?.data[0]
    formState.lastname = valuex.apellido_paterno;
    formState.middlename = valuex.apellido_materno
    formState.name = valuex.nombres
    formState.gender_id = valuex.sexo == 'F' ? 2 : 1;
    if(valuex.fecha_nacimiento) formState.birthday = dayjs(valuex.fecha_nacimiento, 'DD/MM/YYYY');
    if(valuex.fecha_nacimiento) birthdateDate.value = dayjs(valuex.fecha_nacimiento, 'DD/MM/YYYY');
    // formState.country = valuex.nacionalidad
  }

  handleDisabled()
  return searchLoading.value = false
  
}

// const handleSearchApi = async (val) => {
//   searchLoading.value = true

//   if (!val) {
//     message.warning("Ingresa un número de documento")
//     return searchLoading.value = false
//   }

//   if (formState.typedocument_id == 1) {
//     if (formState.documentnumber.length < 8) {
//       return message.warning("El número de DNI está incompleto")
//     } else {
//       const response = await makeRequest({ url: `user/dni-data/${formState.documentnumber}`, method: 'GET' });

//       if (response.status === 404) {
//         message.warning("No se encontró información con este número de DNI");
//         handleDisabled()
//         return searchLoading.value = false;
//       }

//       formState.lastname = response.data.apellidoPaterno;
//       formState.middlename = response.data.apellidoMaterno;
//       formState.name = response.data.nombres;
//       searchLoading.value = false
//     }
//   }

//   handleDisabled()
//   searchLoading.value = false;
// }

const validateNumber = () => {
  formState.documentnumber = formState.documentnumber.replace(/\D/g, '');
};
const validateNumberPhone = () => {
  formState.phone = formState.phone.replace(/\D/g, '');
};
const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  fetchProvinces(id)
}
const handleProvinces = (id) => {
  formState.district_id = null
  fetchDistricts(id)
}
const clearFields = () => {
  formState.lastname = null;
  formState.middlename = null;
  formState.name = null;
  formState.city_id = null;
  formState.province_id = null;
  formState.district_id = null;
  formState.address = null;
  formState.phone = null;
  formState.email = null;
  formState.birthday = null;
  formState.gender_id = null;
  formState.lession = null;
  formState.typedocument_id = null;
  formState.documentnumber = null;
  formState.from_id = 1;
  formState.people_id = storageData.id;
  birthdateDate.value = null;

  disablesInputs()
}

const disablesInputs = () => {
  fields.value.documentnumber.disabled = true;
  fields.value.lastname.disabled = true;
  fields.value.middlename.disabled = true;
  fields.value.name.disabled = true;
  fields.value.city_id.disabled = true;
  fields.value.city_id.disabled = true;
  fields.value.province_id.disabled = true;
  fields.value.address.disabled = true;
  fields.value.phone.disabled = true;
  fields.value.email.disabled = true;
  fields.value.birthday.disabled = true;
  fields.value.gender_id.disabled = true;
  fields.value.lession.disabled = true;
}

const onSubmit = async () => {
  loading.value = true

  formState.birthday = birthdateDate.value ? dayjs(birthdateDate.value).format('YYYY-MM-DD') : null;

  try {
    const data = await makeRequest({ url: 'person/create', method: 'POST', data: formState });
    
    if(data.status == 400) {
      return message.error("El correo electrónico ya está registrado. Por favor, ingresa uno válido.");
    }
    if(data.status == 401) {
      return message.error("El número de DNI ya está registrado. Por favor, ingresa uno válido.");
    }
    if(data.status == 200) {
      const query = {
        type: formState.typedocument_id,
        number: formState.documentnumber
      }
      router.push({ name: 'asesorias-formalizaciones', query });

      message.success(data.message);
      return clearFields();
    }
  
  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};

const fetchData = async () => {
  disablesInputs()
  if(route.query) {
    formState.typedocument_id = +route.query.type
    handleSelectTypeDocument(route.query.type);
    formState.documentnumber = route.query.number;
    await store.fetchCities();
    await handleSearchApi(route.query.number);
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.uppercase {
  text-transform: uppercase;
}

.agreement-wrapper {
  max-width: 700px;
}

.grid-item {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 47% 47%;
    grid-gap: 0 2.5rem;
  }
}
</style>
