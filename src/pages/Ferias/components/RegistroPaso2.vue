<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
    
    <!-- <h2 style="margin-bottom: 2rem;">REPRESENTANTE DE LA EMPRESA</h2> -->

    <div class="fair-form">
      <template v-for="(el, idx) in person" :key="idx">

        <a-form-item v-if="el.type === 'iSearch'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, max: el.max }]">
          <a-input-search v-model:value="formState[el.name]" placeholder="" enter-button="BUSCAR" :maxlength="el.max"
            @search="handleSearchRUC" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, max: el.max }]">
          <a-input v-model:value="formState[el.name]" :maxlength="el.max" @blur="validateTrim(el.name)" />
        </a-form-item>


        <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-select v-model:value="formState[el.name]" :options="handleSelectOptions(el.name)" show-search
          :filter-option="filterOption" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-textarea v-model:value="formState[el.name]" :rows="4" :maxlength="el.max" />
        </a-form-item>

        <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" :options="store.cities" show-search
            :filter-option="filterOption" @change="handleDepartaments" />
          <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" :options="store.provinces"
            show-search :filter-option="filterOption" @change="handleProvinces" :disabled="!formState.city_id" />
          <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" :options="store.districts"
            show-search :filter-option="filterOption" :disabled="!formState.province_id" />
        </a-form-item>

        <div v-if="
          el.type === 'space1' ">
        </div>

      </template>
    </div>

    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="loading" class="fair-btn">SIGUIENTE</a-button>
    </a-form-item>


    <pre>{{ formState }}</pre>

  </a-form>
</template>


<script setup>
import { ref, onUnmounted, onMounted, reactive } from 'vue';
import { useCounterStore } from '@/stores/selectes.js';
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons-vue';

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

const loading = ref(false);
const provinces = ref(null);
const districts = ref(null);
const formState = reactive({});

const sicks = [
  { value: 'si', label: 'SI' },
  { value: 'no', label: 'NO' }
];

const handleSelectOptions = (name) => {
  if (name === 'country_id') {
    return store.countries;
  }
  if(name === 'gender_id') {
    return store.genders;
  }
  if(name === 'sick') {
    return sicks;
  }
  if(name === 'typedocument_id') {
    return store.typeDocuments;
  }
}

const person = {
  typedocument_id: {
    type: 'iSelect',
    label: 'TIPO DE DOCUMENTO DE IDENTIDAD',
    name: 'typedocument_id',
    required: true,
    message: 'Seleccionar tipo',
    disabled: true
  },
  dni: {
    type: 'iSearch',
    label: 'INGRESE NÚMERO DE IDENTIDAD',
    name: 'dni',
    required: true,
    message: 'Escribir tu número de documento',
    disabled: true,
    max: 11
  },
  space1: {
    type: 'space1'
  },

  name: {
    type: 'iText',
    label: 'NOMBRES DEL REPRESENTANTE',
    name: 'name',
    required: true,
    message: 'Escribir nombre',
    disabled: true,
    max: 50
  },
  lastname: {
    type: 'iText',
    label: 'APELLIDO PATERNO DEL REPRESENTANTE',
    name: 'lastname',
    required: true,
    message: 'Escribir nombre',
    disabled: true,
    max: 50
  },
  middlename: {
    type: 'iText',
    label: 'APELLIDO MATERNO DEL REPRESENTANTE',
    name: 'middlename',
    required: true,
    message: 'Escribir nombre',
    disabled: true,
    max: 50
  },

  country_id: {
    type: 'iSelect',
    label: 'PAÍS DE ORIGEN',
    name: 'country_id',
    required: true,
    message: 'Seleccionar país',
    disabled: false
  },
  city_id: {
    type: 'iSelectWrite',
    label: 'REGIÓN RESIDENTE',
    name: 'city_id',
    required: true,
    message: 'Seleccionar región',
    disabled: true
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'PROVINCIA RESIDENTE',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: true
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'DISTRITO RECIDENTE',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: true
  },
  address: {
    type: 'iText',
    label: 'DIRECCIÓN',
    name: 'address',
    required: true,
    message: 'Escribir dirección',
    disabled: false
  },
  birthday: {
    type: 'iDate',
    label: 'Fecha de nacimiento',
    name: 'birthday',
    required: true,
    message: 'Seleccionar fecha de nacimiento',
    disabled: true
  },
  gender_id: {
    type: 'iSelect',
    label: 'GÉNERO',
    name: 'gender_id',
    required: true,
    message: 'Seleccionar un tipo de género',
    disabled: true
  },
  sick: {
    type: 'iSelect',
    label: '¿TIENE ALGUNA DISCAPACIDAD?',
    name: 'sick',
    required: true,
    message: '¿Tiene discapacidad?',
    disabled: true
  },
  email: {
    type: 'iText',
    label: 'CORREO ELECTRÓNICO',
    name: 'email',
    required: true,
    message: 'Ingresar email',
    email: 'email',
    disabled: true
  },
  phone: {
    type: 'iText',
    label: 'NÚMERO DE CELULAR',
    name: 'phone',
    required: true,
    message: 'Escribe tu num. de celular',
    disabled: true,
    max: 9
  },





}

const handleSearchRUC = () => {

}
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id)
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}

const onSubmit = async () => {

};

</script>

<style lang="scss">
.fair-btn {
  margin: 1.5rem auto;
  background-color: var(--secondary);
  padding: 1.3rem 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 15px;

  &:hover {
    background-color: #cd0805 !important;
  }
}

.fair-form {
  margin-top: 3rem;
  :where(.css-dev-only-do-not-override-16pw25h).ant-btn-primary {
    background-color: var(--primary);

    // &:hover {
    //   background-color: #cd0805 !important;
    // }
  }
}

@media screen and (min-width: 900px) {
  .fair-form {
    display: grid;
    grid-gap: 0 2rem;
    grid-template-columns: 1fr 1fr 1fr;

    .ant-form-item:nth-child(25) {
      grid-column: 1/4;
    }
  }
}
</style>