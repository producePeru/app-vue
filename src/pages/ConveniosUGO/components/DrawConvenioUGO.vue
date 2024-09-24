<template>
  <a-spin :spinning="spinning">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-convenios">
        
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" />
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
            <!-- <a-select v-if="el.name == 'agreementstatus_id'" v-model:value="formState[el.name]" :options="store.agreementStatus" show-search :filter-option="filterOption" /> -->

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
import fields from '@/forms/convenios.js';
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
const formState = reactive({});
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
  formState.city_id = null
  formState.province_id = null
  formState.district_id = null
  formState.alliedEntity = null
  formState.homeOperations = null
  formState.startDate = null
  formState.external = null
  formState.years = null
  formState.endDate = null
  formState.observations = null
  formState.created_id = storageData.user_id
}
const onSubmit = async () => {
  loading.value = true

  const payload = {
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    alliedEntity: formState.alliedEntity,
    homeOperations: dayjs(formState.homeOperations).format('YYYY-MM-DD'),
    startDate: dayjs(formState.startDate).format('YYYY-MM-DD'),
    external: formState.external,
    years: formState.years,
    endDate: dayjs(formState.startDate).add(formState.years, 'year').format('YYYY-MM-DD'),
    observations: formState.observations,
    created_id: storageData.user_id,
    entity: 'ugo'
  }

  try {

    const method = props.idConvenio ? 'PUT' : 'POST';
    const url = props.idConvenio? `agreement/update-values/${props.idConvenio.id}` : 'agreement/create';

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
  message.error('Debes de completar todos los espacios requeridos')
};

const fetchData = async(data) => {
  if(data.id) {
    formState.city_id = data.city_id
    handleDepartaments(data.city_id)
    formState.province_id = data.province_id
    handleProvinces(data.province_id)
    formState.district_id = data.district_id
    formState.external = data.external
    formState.homeOperations = dayjs(data.startOperations, 'YYYY-MM-DD')
    formState.startDate = dayjs(data.startDate, 'YYYY-MM-DD')
    formState.years = data.years
    formState.observations = data.observations
    formState.alliedEntity = data.entity
  }
}

onMounted(() => {
  if (props.idConvenio) {
    fetchData(props.idConvenio);
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
  .ant-form-item:nth-child(9) {
    grid-column: 1/3;
  }
  .ant-form-item:nth-child(14) {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>