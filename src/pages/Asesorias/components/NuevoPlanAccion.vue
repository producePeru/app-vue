<template>
  <div>
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

      <div class="grid-planes">
        <template v-for="(el, idx) in fields" :key="idx">
          
          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select 
            v-if="el.name == 'typeDocument'" 
            v-model:value="formState[el.name]" 
            :options="optionsTypeDocuments" />

            <a-select 
            v-if="el.name == 'gender_id'" 
            v-model:value="formState[el.name]" 
            :options="store.genders" />

            <a-select 
            v-if="el.name == 'sick'" 
            v-model:value="formState[el.name]" 
            :options="lessions" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSearch'" class="item-max" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-input-search 
            :loading="searchLoading" 
            v-model:value="formState[el.name]" @search="handleSearchApiInfo"
            @input="validateNumber" 
            :maxlength="formState.typeDocument == 1 ? 8 : 11" />
          </a-form-item>

          <a-divider dashed v-if="el.type === 'iDivider'" style="grid-column: 1/3; margin: .5rem 0 1rem 0;"/>

          <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select 
            v-if="el.name == 'city_id'" 
            v-model:value="formState[el.name]" 
            show-search 
            :options="store.cities" 
            :filter-option="filterOption" 
            @change="handleDepartaments" />
            
            <a-select 
            v-if="el.name == 'province_id'" 
            v-model:value="formState[el.name]" 
            show-search 
            :options="store.provinces"
            :filter-option="filterOption" 
            @change="handleProvinces" 
            :disabled="!formState.city_id" />
            
            <a-select 
            v-if="el.name == 'district_id'" 
            v-model:value="formState[el.name]" 
            show-search 
            :options="store.districts"
            :filter-option="filterOption" 
            :disabled="!formState.province_id" />

            <a-select 
            v-if="el.name == 'component'" 
            v-model:value="formState[el.name]" 
            show-search 
            :options="store.cities" 
            :filter-option="filterOption" 
            @change="handleDepartaments" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker 
            :disabled-date="disabledDate"
            :locale="locale" 
            v-model:value="formState[el.name]" 
            style="width: 100%;" 
            :format="dateFormat" 
            placeholder="día/mes/año" />
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import fieldx from '@/forms/planesAccion.js';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';
import { useCounterStore } from '@/stores/selectes.js';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const emit = defineEmits(['closeDraw']);
const store = useCounterStore();

store.$patch({ cities: store.cities });
store.$patch({ genders: store.genders });

store.fetchCities();
store.fetchGenders();

const fields = ref(fieldx)
const loading = ref(false);
const searchLoading = ref(false);

const optionsTypeDocuments = [
  { value: 1, label: 'DNI' },
  { value: 2, label: 'RUC' },
];
const lessions = [
  {label: "Si", value: "yes"},
  {label: "No", value: "no"}
];
const formState = reactive({});

const disabledDate = (current) => {
  return current && current > dayjs().endOf('day');
};
const validateNumber = () => {
  formState.numberDocument = formState.numberDocument.replace(/\D/g, '');
};
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const handleSearchApiInfo = async() => {

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
const onSubmit = async() => {
  loading.value = true;
  
  const payload = {
    ruc: formState.ruc,
    razonSocial: formState.razonSocial,
    actividadEconomica: formState.actividadEconomica,
    departamento: formState.departamento,
    provincia: formState.provincia,
    distrito: formState.distrito,
    direccion: formState.direccion,
  }

  try {
    const data = await makeRequest({ url: `mype/update-by-ruc/${props.info.id}`, method: 'PUT', data: payload });
    if(data.status == 200) {
      message.success(data.message);
      emit('closeDraw');
    } 
  } catch (error) {
    console.log("Failed to update record");
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.grid-planes {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;
  .ant-form-item:nth-child(13) {
    grid-column: 1/2;
  }
}
</style>