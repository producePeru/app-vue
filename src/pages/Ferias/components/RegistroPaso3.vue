<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
    
    <!-- <h2 style="margin-bottom: 1.5rem;">PARTICIPAR</h2> -->
    
    <div class="fair-form-3">
      <template v-for="(el, idx) in fair" :key="idx">

        
        
        <a-form-item v-if="el.type === 'iRadio'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, max: el.max }]">
          <a-radio-group v-model:value="formState[el.name]" :name="el.name">
            <a-radio value="si">SI</a-radio>
            <a-radio value="no">NO</a-radio>
            <a-radio v-if="el.other" value="otro">OTRO</a-radio>
          </a-radio-group>
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

    <a-form-item style="margin: 0;">
      <a-button type="primary" html-type="submit" :loading="loading" class="fair-btn">PARTICIPAR</a-button>
    </a-form-item>


    <!-- <pre>{{ formState }}</pre> -->

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

const fair = {
  hasPos: {
    type: 'iRadio',
    label: 'Cuenta con el servicio de pagos electrónicos mediante POS (Tarjeta de crédito y/o Débito)',
    name: 'hasPos',
    required: true,
    message: 'Escoger opción',
    disabled: true,
    other: false
  },
  hasYape: {
    type: 'iRadio',
    label: 'Su negocio cuenta con el servicio de pagos por medio de monederos electrónicos (Yape, PLIM, etc.)',
    name: 'hasYape',
    required: true,
    message: 'Escoger opción',
    disabled: true,
    other: false
  },
  hasVistualStore: {
    type: 'iRadio',
    label: 'Su negocio realiza ventas a través de tiendas virtuales, ya sea por medio de página web (Mercado Libre, Amazon, Redes Sociales, Whatsapp, etc)',
    name: 'hasVistualStore',
    required: true,
    message: 'Escoger opción',
    disabled: true,
    other: false
  },
  hasDelivery: {
    type: 'iRadio',
    label: 'Su negocio realiza entregas a domicilio (delivery)',
    name: 'hasDelivery',
    required: true,
    message: 'Escoger opción',
    disabled: true,
    other: false
  },
  hasElectronicInvoice: {
    type: 'iRadio',
    label: 'Su negocio emite factura electrónica',
    name: 'hasElectronicInvoice',
    required: true,
    message: 'Escoger opción',
    disabled: true,
    other: false
  },
  isFormalizedPnte: {
    type: 'iRadio',
    label: 'Se ha formalizado a través del Programa Nacional Tu Empresa',
    name: 'isFormalizedPnte',
    required: true,
    message: 'Escoger opción',
    disabled: true,
  },
  isIndecopi: {
    type: 'iRadio',
    label: '¿Su marca se encuentra registrada en INDECOPI?',
    name: 'isIndecopi',
    required: true,
    message: 'Escoger opción',
    disabled: true,
  },
  hasParticipatedFair: {
    type: 'iRadio',
    label: 'Ha participado en alguna feria virtual/presencial y/o rueda de negocios en los últimos años? Especificar',
    name: 'hasParticipatedFair',
    required: true,
    message: 'Escoger opción',
    disabled: true,
    other: true
  },
  nameFair: {
    type: 'iText',
    label: 'Ingrese evento donde participó',
    name: 'nameFair',
    required: false,
    message: 'Escribir nombre',
    disabled: true,
    max: 80
  },


 

  hasParticipatedProduce: {
    type: 'iRadio',
    label: 'Ha participado en algún servicio que ofrece PRODUCE (taller, capacitación, o asistencia técnica)',
    name: 'hasParticipatedProduce',
    required: true,
    message: 'Escoger opción',
    disabled: true,
    other: true
  },
  nameService: {
    type: 'iText',
    label: 'Ingrese nombre del servicio que participó en PRODUCE (taller, capacitación, o asistencia técnica)',
    name: 'nameService',
    required: false,
    message: 'Escribir nombre',
    disabled: true,
    max: 80
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

.fair-form-3 {
  margin-top: 3rem;

  :where(.css-dev-only-do-not-override-16pw25h).ant-btn-primary {
    background-color: var(--secondary);

    &:hover {
      background-color: #cd0805 !important;
    }
  }

}

@media screen and (min-width: 900px) {
  .fair-form-3 {
    display: grid;
    grid-gap: 0 2rem;
    grid-template-columns: 1fr 1fr 1fr;

    .ant-form-item:nth-child(25) {
      grid-column: 1/4;
    }
  }
}
</style>