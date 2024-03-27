<template>
  <div class="wrapper-booking">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in asesoria" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'component'" v-model:value="formState[el.name]" :options="components" />
            <a-select v-if="el.name == 'modality'" v-model:value="formState[el.name]" :options="modality" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-textarea v-model:value="formState[el.name]" :rows="3" />

          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'tema_compoment'" v-model:value="formState[el.name]" show-search :options="themes" :filter-option="filterOption" />
            
            <a-select v-if="el.name == 'department'" v-model:value="formState[el.name]" show-search :options="departments" :filter-option="filterOption" @change="getProvinces" />
            <a-select v-if="el.name == 'province'" v-model:value="formState[el.name]" show-search :options="provinces" :filter-option="filterOption" @change="getDistricts" />
            <a-select v-if="el.name == 'district'" v-model:value="formState[el.name]" show-search :options="districts" :filter-option="filterOption" />
          </a-form-item>

        </template>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>

    </a-form>

  </div>
</template>

<script setup>
import { asesoria } from '@/forms/asesorias.js'
import { reactive, ref, onMounted } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { modality, components } from '@/utils/selects.js'
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/someEvents.js'

const pageStore = useCounterStore()
const props = defineProps(['info']);
const storageData = JSON.parse(localStorage.getItem('user'));
const personData = JSON.parse(localStorage.getItem('info'));
const emit = defineEmits(['closeDraw']);

const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);
const themes = ref([]);
const loading = ref(false);

const formState = reactive({
  component: null,
  tema_compoment: null,
  modality: null,
  department: null,
  province: null,
  district: null,
  description: null,
  id_person: props.info.id,
  created_by: personData.id,
  created_dni: personData.dni
});

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const onSubmit = async () => {
  const payload = formState
  loading.value = true
  try {
    const data = await makeRequest({ url: '/create-consulting', method: 'POST', data: payload });

    if(data.status == 400) {
      message.error(data.message);
      return pageStore.logout()
    }

    if(data) {
      message.success(data.message);
  
      formState.component = null
      formState.tema_compoment = null
      formState.modality = null
      formState.department = null
      formState.province = null
      formState.district = null
      formState.description = null

      emit('closeDraw', true)
    }
  } catch (error) {
    message.error('Error al registrar');
  } finally {
    loading.value = false
  }
};

const onSubmitFail = () => {
  message.warning('Debes de completar todos los espacios requeridos')
};

const getDepartaments = async () => {
  try {
    const { data } = await requestNoToken({ url: '/departaments', method: 'GET' });
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    departments.value = [...departments.value, ...arr];
  } catch (error) {
    console.log(error);
  }
};
const getProvinces = async (id) => {
  formState.province = null
  formState.district = null
  provinces.value = []
  districts.value = []
  try {
    const { data } = await requestNoToken({ url: `/province/${id}`, method: 'GET' });
    let provincesArray = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    provinces.value = [...provinces.value, ...provincesArray];
  } catch (error) {
    console.log(error);
  }
};
const getDistricts = async (id) => {
  formState.district = null
  districts.value = []
  try {
    const { data } = await requestNoToken({ url: `/district/${id}`, method: 'GET' });
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    districts.value = [...districts.value, ...arr];
  } catch (error) {
    console.log(error);
  }
};

const getThemes = async () => {
  try {
    const { data } = await makeRequest({ url: `/theme-component`, method: 'GET' });
    themes.value = data
  } catch (error) {
    console.log(error);
  }
};

onMounted(async() => {
  await getDepartaments(),
  await getThemes()
});
</script>

<style scoped lang="scss">
.wrapper-booking {
  max-width: 700px;
  h3 {
    margin-bottom: 2rem;
  }
}
.grid-booking {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 0 1rem;
  .ant-form-item:nth-child(1) {
    grid-column: 1/3;
  }
  .ant-form-item:nth-child(2) {
    grid-column: 1/3;
  }
  .ant-form-item:nth-child(3) {
    grid-column: 1/3;
  }
  .ant-form-item:nth-child(4) {
    grid-column: 1/2;
  }
  .ant-form-item:nth-child(7) {
    grid-column: 1/4;
  }
}
</style>