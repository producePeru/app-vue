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
            <a-select v-if="el.name == 'operationalstatus_id'" v-model:value="formState[el.name]" :options="store.operationalStatus" show-search :filter-option="filterOption" />
            <a-select v-if="el.name == 'agreementstatus_id'" v-model:value="formState[el.name]" :options="store.agreementStatus" show-search :filter-option="filterOption" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker v-if="el.name == 'endDate'" :disabled-date="disabledDate" :locale="locale" :disabled="!formState.startDate"
            v-model:value="formState[el.name]" style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" />
            <a-date-picker v-else :locale="locale" v-model:value="formState[el.name]" style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iCheckbox'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-checkbox-group v-model:value="formState[el.name]" name="checkboxgroup" :options="plainOptions" />
          </a-form-item>
        </template>

      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>

    </a-form>
  </a-spin>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
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

store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.$patch({ agreementStatus: store.agreementStatus });
store.$patch({ operationalStatus: store.operationalStatus });

store.fetchCities();
store.fetchAgreementStatus();
store.fetchOperationalStatus();

const loading = ref(false);
const spinning = ref(!true);
const plainOptions = ['UGO  - TU EMPRESA', 'TU EMPRESA - DVMYPE', 'DVMYPE-SG', 'SG-OGPPM', 'OGPPM-TU EMPRESA', 'TU EMPRESA-ALIADO'];
const formState = reactive({});

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
  formState.denomination = null
  formState.alliedEntity = null
  formState.homeOperations = null
  formState.address = null
  formState.reference = null
  formState.resolution = null
  formState.initials = null
  formState.startDate = null
  formState.endDate = null
  formState.city_id = null
  formState.province_id = null
  formState.district_id = null
  formState.operationalstatus_id = null
  formState.agreementstatus_id = null
  formState.createdBy = storageData.user_id
}
const onSubmit = async () => {
  loading.value = true

  const payload = {
    denomination: formState.denomination,
    alliedEntity: formState.alliedEntity,
    homeOperations: dayjs(formState.homeOperations).format('YYYY-MM-DD'),
    address: formState.address,
    reference: formState.reference,
    resolution: formState.resolution,
    initials: formState.initials,
    startDate: dayjs(formState.startDate).format('YYYY-MM-DD'),
    endDate: dayjs(formState.endDate).format('YYYY-MM-DD'),
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    operationalstatus_id: formState.operationalstatus_id,
    agreementstatus_id: formState.agreementstatus_id,
    createdBy: storageData.user_id
  }

  try {
    const data = await makeRequest({ url: 'agreement/create', method: 'POST', data: payload });

    if(data.status == 200) {
      message.success(data.message);
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
</script>

<style lang="scss" scoped>
.grid-convenios {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;
  .ant-form-item:nth-child(7) {
    grid-column: 1/3;
  }
  .ant-form-item:nth-child(14) {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>