<template>
  <div class="agreement-wrapper">
    <h3>Formulario de registro</h3>
    <br>
    
    <a-spin :spinning="searchLoading">
      <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
        @finishFailed="onSubmitFail">
        <div class="grid-item">
          <template v-for="(el, idx) in fields" :key="idx">

            <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-select v-if="el.name == 'typedocument_id'" v-model:value="formState[el.name]"
                :options="store.typeDocuments" :disabled="el.disabled" @change="handleSelectTypeDocument" />

              <a-select v-if="el.name == 'country_id'" v-model:value="formState[el.name]" :options="store.countries"
                show-search :filter-option="filterOption" />

              <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" :options="store.cities"
                show-search :filter-option="filterOption" @change="handleDepartaments" :disabled="el.disabled" />
              <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" :options="provinces"
                show-search :filter-option="filterOption" @change="handleProvinces" :disabled="!formState.city_id" />
              <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" :options="districts"
                show-search :filter-option="filterOption" :disabled="!formState.province_id" />
              <a-select v-if="el.name == 'gender_id'" v-model:value="formState[el.name]" :options="store.genders"
                :disabled="el.disabled" />
              <a-select v-if="el.name == 'sick'" v-model:value="formState[el.name]" :options="sicks"
                :disabled="el.disabled" />
              <a-select v-if="el.name == 'hasSoon'" v-model:value="formState[el.name]" :options="hasSoon"
                :disabled="el.disabled" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iSearch'" class="item-max" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-input-search :loading="searchLoading" v-model:value="formState[el.name]" @search="handleSearchApi"
                @input="validateNumber" :maxlength="formState.typedocument_id == 1 ? 8 : 20" disabled />
            </a-form-item>

            <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max, min: el.min }]">
              <a-input v-if="el.name == 'phone'" v-model:value="formState[el.name]" :disabled="el.disabled"
                :maxlength="el.max" @input="validateNumberPhone" />
              <a-input v-else v-model:value="formState[el.name]" :disabled="el.disabled" :maxlength="el.max"
                @blur="validateTrim(el.name)" />
            </a-form-item>


            <!-- <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-date-picker :locale="locale" v-model:value="birthdateDate" style="width: 100%;" :format="dateFormat"
                placeholder="día/mes/año" @change="formState.birthday = birthdateDate" :disabled="el.disabled" />
            </a-form-item> -->

            <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label" :rules="[
              { required: el.required, message: el.message },
              { validator: validateAge, message: 'La edad debe estar entre 18 y 99 años' }
            ]">
              <a-date-picker :locale="locale" v-model:value="formState[el.name]" style="width: 100%;"
                :format="dateFormat" placeholder="día/mes/año" :disabled="el.disabled" />
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
  <!-- <pre>{{ formState }}</pre> -->
</template>

<script setup>
import { requestNoToken } from '@/utils/noToken.js';
import { reactive, ref, onMounted } from 'vue';
import fieldsJs from '@/forms/nuevaPersona.js';
import { message, notification } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js';
import { useRouter, useRoute } from 'vue-router';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const route = useRoute();
const store = useCounterStore();

store.$patch({ typeDocuments: store.typeDocuments });
store.$patch({ cities: store.countries });
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.$patch({ genders: store.genders });

store.fetchTypeDocuments();
store.fetchCountries();
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
const sicks = [
  { value: 'si', label: 'SI' },
  { value: 'no', label: 'NO' }
]
const hasSoon = [
  { value: 'SI', label: 'SI' },
  { value: 'NO', label: 'NO' }
]

const formState = reactive({
  typedocument_id: null,
  documentnumber: null,
  lastname: null,
  middlename: null,
  name: null,
  country_id: route.query.type == 1 ? 155 : null,
  city_id: null,
  address: null,
  province_id: null,
  district_id: null,
  phone: null,
  email: null,
  birthday: null,
  gender_id: null,
  sick: null,
  people_id: storageData.user_id,
  from_id: 1
});

const validateTrim = (field) => {
  const trimmedValue = formState[field] ? formState[field].trim() : '';
  formState[field] = trimmedValue;
};

const validateAge = (rule, value) => {
  if (!value) {
    return Promise.reject('La fecha es requerida');
  }

  const currentDate = new Date();
  const birthDate = new Date(value);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  // Ajuste para meses y días
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18 || age > 99) {
    return Promise.reject('La edad debe estar entre 18 y 99 años');
  }

  return Promise.resolve();
};

const fetchProvinces = async (id) => {
  try {
    const { data } = await requestNoToken({ url: `select/provinces/${id}`, method: 'GET' });
    provinces.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const fetchDistricts = async (id) => {
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
  if (store.typeDocuments) spinning.value = false;
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
  fields.value.sick.disabled = false;
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

  try {
    if (formState.typedocument_id == 1) {
      const response = await makeRequest({ url: `user/only-dni/${formState.documentnumber}`, method: 'GET' });

      if (response.status === 404) {
        notification.open({
          message: 'Notificación',
          description: 'Se superó el número de consultas, comentale a tu supervisor',
        });
      }

      if (response.status == 200) {
        // formState.country = 'PERÚ'
        formState.lastname = response.data.apellidoPaterno;
        formState.middlename = response.data.apellidoMaterno;
        formState.name = response.data.nombres;
      }
    }


  } catch (error) {
    console.log("err", error);
  } finally {
    handleDisabled()
    return searchLoading.value = false
  }
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
  formState.sick = null;
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
  fields.value.sick.disabled = true;
}

const onSubmit = async () => {
  loading.value = true

  const payload = {
    documentnumber: formState.documentnumber,
    lastname: formState.lastname,
    middlename: formState.middlename,
    name: formState.name,
    country_id: formState.country_id,
    phone: formState.phone,
    email: formState.email,
    birthday: dayjs(formState.birthday).format('YYYY-MM-DD'),
    sick: formState.sick,
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    address: formState.address,
    typedocument_id: formState.typedocument_id,
    gender_id: formState.gender_id,
    hasSoon: formState.hasSoon,
    people_id: storageData.user_id,
    from_id: 1
  }

  try {
    const data = await makeRequest({ url: 'person/create', method: 'POST', data: payload });

    if (data.status == 400) {
      return message.error("El correo electrónico ya está registrado. Por favor, ingresa uno válido.");
    }
    if (data.status == 401) {
      return message.error("El número de DNI ya está registrado. Por favor, ingresa uno válido.");
    }
    if (data.status == 200) {
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
  if (route.query) {
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
