<template>
  <a-spin :spinning="spinning">
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
    @finishFailed="onSubmitFail">
    <div class="grid-profile">
      <template v-for="(el, idx) in fieldx" :key="idx">

        <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
          <a-select v-if="el.name == 'typedocument_id'" v-model:value="formState[el.name]" :options="store.typeDocuments" :disabled="el.disabled" />
          <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" show-search :options="store.cities"  :filter-option="filterOption" @change="handleDepartaments" />
          <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" show-search :options="store.provinces" :filter-option="filterOption" @change="handleProvinces" />
          <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" show-search :options="store.districts" :filter-option="filterOption" />
          <a-select v-if="el.name == 'gender_id'" v-model:value="formState[el.name]" :options="store.genders" />
          <a-select v-if="el.name == 'sick'" v-model:value="formState[el.name]" :options="lessions" />
          <a-select v-if="el.name == 'hasSoon'" v-model:value="formState[el.name]" :options="hasSoon" />
          <a-select v-if="el.name == 'country_id'" v-model:value="formState[el.name]" :options="store.countries" show-search :filter-option="filterOption" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, type: el.email }]">
          <a-input v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-date-picker :locale="locale" v-model:value="formState[el.name]" style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" />
        </a-form-item>
      </template>
    </div>


    <!-- <div>{{ update(props.updateValues) }}</div> -->

    <!-- <pre>{{ updateValues }}</pre> -->

    
    <!-- <pre>{{ props.updateUser }}</pre> -->
    <a-form-item>
      <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
    </a-form-item>
  </a-form>
  <!-- <pre>{{ formState }}</pre> -->
</a-spin>
</template>

<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/actualizarPersona.js';
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js'

import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const store = useCounterStore();
const storageData = JSON.parse(localStorage.getItem('profile'));
const emit = defineEmits(['closeDraw']);
const props = defineProps(['updateValues']);


store.$patch({ typeDocuments: store.typeDocuments });
store.$patch({ cities: store.countries });
store.$patch({ cities: store.cities });
store.$patch({ genders: store.genders });

store.fetchTypeDocuments();
store.fetchCountries();
store.fetchCities()
store.fetchGenders()

const spinning = ref(true);
const loading = ref(false);
const fieldx = ref(fields)
const birthdateDate = ref(null);
const dateFormat = 'DD/MM/YYYY';

const formState = reactive({
  typedocument_id: null,
  documentnumber: null,
  lastname: null,
  middlename: null,
  name: null,
  city_id: null,
  province_id: null,
  district_id: null,
  phone: null,
  email: null,
  gender_id: null,
  birthday: null,
  sick: null,
  country_id: null,
  // user_id : storageData.id,     //creador
});

onMounted(() => {
  if (props.updateValues) {
    fetchData(props.updateValues);
  }
});

watch(() => props.updateValues, (newValue) => {
  if (newValue) {
    fetchData(newValue);
  }
});

const fetchData = (val) => {
  formState.typedocument_id = val.typedocument_id;
  formState.documentnumber = val.documentnumber;
  formState.lastname = val.lastname;
  formState.middlename = val.middlename;
  formState.name = val.name;
  formState.city_id = val.city_id;
  handleDepartaments(val.city_id);
  handleProvinces(val.province_id);
  formState.province_id = val.province_id;
  formState.district_id = val.district_id;
  formState.phone = val.phone;
  formState.email = val.email;
  formState.gender_id = val.gender_id;
  formState.sick = val.sick;
  formState.country_id = val.country_id ? val.country_id :  155
  formState.address = val.address;
  formState.hasSoon = val.hasSoon;
  if(val.birthday) formState.birthday = dayjs(val.birthday, 'YYYY-MM-DD');
  setTimeout(() => {
    spinning.value = false;
  }, 2000);
}

const hasSoon = [
  {value: 'SI', label: 'Si'},
  {value: 'NO', label: 'No'}
]
const lessions = [
  {label: "Si", value: "yes"},
  {label: "No", value: "no"}
]
const update = (val) => {
  // if (val) {

 
   
  // }

  // 
}

const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id);
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const onSubmit = async () => {

  let payload = {
    lastname: formState.lastname,
    middlename: formState.middlename,
    name: formState.name,
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    phone: formState.phone,
    email: formState.email,
    gender_id: formState.gender_id,
    birthday: formState.birthday ? dayjs(formState.birthday).format('YYYY-MM-DD') : null,
    sick: formState.sick,
    hasSoon: formState.hasSoon,
    country_id: formState.country_id
    // user_id : storageData.id,     //creador
  }
  // delete payload.documentnumber 🚩

  loading.value = true
  try {
    const data = await makeRequest({ url: `person/update/${props.updateValues.id}`, method: 'PUT', data: payload });
    message.success(data.message);
    emit('closeDraw', true)
  } catch (error) {
    if(error.response.status == 550) return message.error('El usuario ya se encuentra registrado');
    message.error('Error al registrar');
  } finally {
    loading.value = false
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};


</script>

<style lang="scss" scoped>
.grid-profile {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;
}
</style>