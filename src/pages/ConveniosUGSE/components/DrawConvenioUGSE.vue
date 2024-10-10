<template>
  <a-spin :spinning="spinning">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-convenios">
        
        <template v-for="(el, idx) in fields" :key="idx">
          
          <!-- <a-form-item 
          v-if="el.type === 'iText'" 
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" />
          </a-form-item> -->

          <a-form-item 
          v-if="el.type === 'iText'" :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message, max: el.max },
                  ...(el.name === 'ruc' ? [{ type: 'string', len: 11, message: el.message }, { pattern: /^\d{11}$/, message: 'El RUC debe ser numérico.' }] : [])]">
              <a-input v-model:value="formState[el.name]" :maxlength="el.max" @blur="validateTrim(el.name)" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select 
              v-if="el.name == 'city_id'" v-model:value="formState[el.name]" :options="store.cities" show-search :filter-option="filterOption"
              @change="handleDepartaments" />
            <a-select 
              v-if="el.name == 'province_id'" v-model:value="formState[el.name]" :options="store.provinces" show-search :filter-option="filterOption"
              @change="handleProvinces" :disabled="!formState.city_id" />
            <a-select 
              v-if="el.name == 'district_id'" v-model:value="formState[el.name]" :options="store.districts" show-search :filter-option="filterOption"
              :disabled="!formState.province_id" />

            <a-select v-if="el.name == 'years'" v-model:value="formState[el.name]" :options="years" show-search :filter-option="filterOption" />
            
            <a-select 
            v-if="el.name == 'components'" 
            v-model:value="formState[el.name]" 
            :options="components" 
            show-search 
            :filter-option="filterOption" />

          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker v-if="el.name == 'endDate'" :disabled-date="disabledDate" :locale="locale" :disabled="!formState.startDate"
            v-model:value="formState[el.name]" style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" />
            <a-date-picker v-else :locale="locale" v-model:value="formState[el.name]" style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSwitch'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-switch v-model:checked="formState[el.name]" checked-children="si" un-checked-children="" :checkedValue="1" :unCheckedValue="0" />
          </a-form-item>

          <!-- <a-form-item v-if="el.type === 'iCheckbox'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-checkbox-group v-model:value="formState[el.name]" name="checkboxgroup" :options="plainOptions" style="display: grid; grid-gap: .2rem;" />
          </a-form-item> -->

          <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-textarea v-model:value="formState[el.name]" :rows="3" />
          </a-form-item>

          <span v-if="el.type === 'iSpace'"></span>
        </template>

      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">
          <span v-if="idConvenio">ACTUALIZAR</span>
          <span v-else>GUARDAR</span>
        </a-button>
      </a-form-item>
      <!-- <pre>{{ formState }}</pre> -->
    </a-form>
  </a-spin>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import fields from '@/forms/conveniosUgse.js';
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const storageData = JSON.parse(localStorage.getItem('profile'));
const store = useCounterStore();
const dateFormat = 'DD/MM/YYYY';
const emit = defineEmits(['closeDraw']);
const props = defineProps(['idConvenio']);

store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
// store.$patch({ agreementStatus: store.agreementStatus });
// store.$patch({ operationalStatus: store.operationalStatus });

store.fetchCities();
// store.fetchAgreementStatus();
// store.fetchOperationalStatus();

const loading = ref(false);
const spinning = ref(false);
// const plainOptions = ['UGO  - TU EMPRESA', 'TU EMPRESA - DVMYPE', 'DVMYPE-SG', 'SG-OGPPM', 'OGPPM-TU EMPRESA', 'TU EMPRESA-ALIADO'];
const formState = reactive({ });
const years = [
  {value: 1, label: '1 Año'},
  {value: 2, label: '2 Años'},
  {value: 3, label: '3 Años'},
  {value: 4, label: '4 Años'},
  {value: 5, label: '5 Años'},
  {value: 6, label: '6 Años'},
  {value: 7, label: '7 Años'},
  {value: 8, label: '8 Años'},
  {value: 9, label: '9 Años'},
  {value: 10, label: '10 Años'}
];

const components = [
  {value: 'financiamiento', label: 'Acceso en Financiamiento'},
  {value: 'desarrollo',     label: 'Desarrollo Productivo'},
  {value: 'digitalizacion', label: 'Digitalización'},
  {value: 'formalizacion',  label: 'Formalización'},
  {value: 'gestion',        label: 'Gestión Empresarial'}
];

const validateTrim = (field) => {
  const trimmedValue = formState[field] ? formState[field].trim() : '';
  formState[field] = trimmedValue;
};

const disabledDate = current => {
  const startDate = dayjs(formState.startDate).add(1, 'day').startOf('day');
  const currentDate = dayjs(current).startOf('day');
  return currentDate.isBefore(startDate, 'day');
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
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const update = () => {
  // spinning.value = false;
}

const clearFields = () => {
  const fieldsToClear = [
    'city_id', 
    'province_id', 
    'district_id', 
    'alliedEntity',
    'ruc', 
    'components', 
    'startDate', 
    'years',
    'aliado', 
    'aliadoPhone',
    'focal',
    'focalCargo',
    'focalPhone',
    'endDate',
    'observations'
  ];

  fieldsToClear.forEach(field => {
    formState[field] = null;
  });

  formState.created_id = storageData.user_id;
};


const onSubmit = async () => {
  loading.value = true

  const payload = {
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    alliedEntity: formState.alliedEntity,
    ruc: formState.ruc,
    components: formState.components,
    startDate: dayjs(formState.startDate).format('YYYY-MM-DD'),
    years: formState.years,
    aliado: formState.aliado,
    aliadoPhone: formState.aliadoPhone,
    focal: formState.focal,
    focalCargo: formState.focalCargo,
    focalPhone: formState.focalPhone,
    renovation: formState.renovation,
    endDate: dayjs(formState.startDate).add(formState.years, 'year').format('YYYY-MM-DD'),
    observations: formState.observations,
    created_id: storageData.user_id,
    entity: 'ugse'
  }

  try {

    const method = props.idConvenio ? 'PUT' : 'POST';
    const url = props.idConvenio? `agreement/update-values/${props.idConvenio.id}` : 'agreement/create-ugse';

    const data = await makeRequest({ url, method, data: payload });

    if(data.status == 200) {
      message.success(data.message);
      emit('closeDraw', true)
      clearFields();
    }

  } catch (error) {
    message.error('Se originó un error: ' + error.message);
  } finally {
    loading.value = false;
  }
};

const onSubmitFail = () => {
  message.error('Por favor corrige los valores con errores')
};

const fetchData = async(data) => {
  if(data.id) {
    formState.city_id = data.city_id
    handleDepartaments(data.city_id)
    formState.province_id = data.province_id
    handleProvinces(data.province_id)
    formState.district_id = data.district_id;
    formState.ruc = data.ruc;
    formState.components = data.components;
    formState.startDate = dayjs(data.startDate, 'YYYY-MM-DD');
    formState.years = data.years;
    formState.aliado = data.aliado;
    formState.aliadoPhone = data.aliadoPhone;
    formState.focal = data.focal;
    formState.focalCargo = data.focalCargo;
    formState.focalPhone = data.focalPhone;
    formState.observations = data.observations;
    formState.alliedEntity = data.entity;
  } 
}

onMounted(() => {
  if (props.idConvenio) {
    fetchData(props.idConvenio);
  } else {
    formState.city_id = 15
    handleDepartaments(15)
  }
});

watch(() => props.idConvenio, (newValue) => {
  if (newValue) {
    fetchData(newValue);
  } else {
    clearFields();
  }
});
</script>

<style lang="scss" scoped>
.grid-convenios {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;
  .ant-form-item:nth-child(15) {
    grid-column: 1/3;
  }
}
</style>