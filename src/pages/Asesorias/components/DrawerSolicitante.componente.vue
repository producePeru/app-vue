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
          
        </a-form-item>

        <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, type: el.email }]">
          <a-input v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-date-picker :locale="locale" v-model:value="birthdateDate" style="width: 100%;" :format="dateFormat" />
        </a-form-item>
      </template>
    </div>
    <div>{{ update(props.updateValues) }}</div>
    <!-- <pre>{{ props.updateUser }}</pre> -->
    <a-form-item>
      <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
    </a-form-item>
  </a-form>
</a-spin>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
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
store.$patch({ cities: store.cities });
store.$patch({ genders: store.genders });

store.fetchTypeDocuments();
store.fetchCities()
store.fetchGenders()

const spinning = ref(true);
const loading = ref(false);
const fieldx = ref(fields)
const birthdateDate = ref(null);
const dateFormat = 'YYYY-MM-DD';
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
  // user_id : storageData.id,     //creador
});

const lessions = [
  {label: "Si", value: "yes"},
  {label: "No", value: "no"}
]
const update = (val) => {
  if(store.genders?.length) spinning.value = false;

  if (val) {
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
    formState.birthday = val.birthday;
    formState.sick = val.sick;
    if(val.birthday) birthdateDate.value = dayjs(val.birthday, dateFormat);
  }
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
  formState.birthday = birthdateDate.value ? dayjs(birthdateDate.value).format('YYYY-MM-DD') : null;
  let payload = formState
  delete payload.documentnumber
  delete payload.typedocument_id
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