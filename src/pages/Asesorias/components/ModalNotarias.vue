<template>
  <a-modal 
  v-model:open="open" 
  :title="`${!isIdUpdate ? 'Registrar' : 'Actualizar'} notaría`" 
  style="top: 40px"
  footer="" 
  @cancel="handleCloseModal"
  width="700px">

    <a-form
    layout="vertical"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onSubmit">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item 
          class="item-max"
          v-if="el.type === 'iSelect'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'documentType'" v-model:value="formState[el.name]" :options="typeDocuments" />
            <a-select v-if="el.name == 'department'" v-model:value="formState[el.name]" :options="departments" @change="handleDepartaments" />
            <a-select v-if="el.name == 'province'" v-model:value="formState[el.name]" :options="provinces" @change="handleProvinces" />
            <a-select v-if="el.name == 'district'" v-model:value="formState[el.name]" :options="districts" />
          </a-form-item>

          <a-form-item
          v-if="el.type === 'iText'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

          <a-form-item
          v-if="el.type === 'iNumber'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message }]">
            <a-input-number v-model:value="formState[el.name]" />
          </a-form-item>

        </template>
      </div>

      <div class="wrapper-form_btn">
        <a-button type="primary" html-type="submit" :loading="loading">{{!isIdUpdate ? 'Crear' : 'Actualizar'}}</a-button>
      </div>

      <!-- <pre>{{ formState }}</pre> -->
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref, onUpdated, onMounted } from 'vue'; 
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevaNotaria.js'
import { makeRequest } from '@/utils/api.js';
import { requestNoToken } from '@/utils/noToken.js'
import { userId } from '@/utils/cookies.js'

const props = defineProps(['isIdUpdate'])
const emit = defineEmits(['handleCloseModal', 'refreshTable'])

onUpdated(() => {
  if (props.isIdUpdate) {
    formState.name = props.isIdUpdate.name
    formState.department = props.isIdUpdate.department
    formState.province = props.isIdUpdate.province
    formState.district = props.isIdUpdate.district
    formState.address = props.isIdUpdate.address
    formState.normal_rate = +props.isIdUpdate.normal_rate
    formState.social_rate = +props.isIdUpdate.social_rate
    getProvinces(props.isIdUpdate.department)
    getDistricts(props.isIdUpdate.province)
  } else {
    clearFields()
  }
});

// start_place
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);

const getDepartaments = async() => {
  try {
    const {data} = await requestNoToken({ url: '/departaments', method: 'GET' });

    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    departments.value = [...departments.value, ...arr];

  } catch (error) {
    console.log(error);
  }
};
const handleDepartaments = (id, evt) => {
  formState.province = null
  formState.district = null
  provinces.value = []
  districts.value = []
  getProvinces(evt.value)
}
const getProvinces = async(id) => {
  try {
    const {data} = await requestNoToken({ url: `/province/${id}`, method: 'GET' });
    
    let provincesArray = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    provinces.value = [...provinces.value, ...provincesArray];

  } catch (error) {
    console.log(error);
  }
};
const handleProvinces = (id, evt) => {
  formState.district = null
  districts.value = []
  getDistricts(evt.value)
}
const getDistricts = async(id) => {
  try {
    const {data} = await requestNoToken({ url: `/district/${id}`, method: 'GET' });
 
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    districts.value = [...districts.value, ...arr];

  } catch (error) {
    console.log(error);
  }
};
// end_place

const open = ref(true);
const loading = ref(false);

const formState = reactive({
  name: null,
  department: null,
  province: null,
  district: null,
  address: null,
  normal_rate: null,
  social_rate: null,
  created_by: userId
});

const handleCloseModal = () => {
  emit('handleCloseModal', true)
  open.value = false;
}

const clearFields = () => {
  formState.name = null
  formState.department = null
  formState.province = null
  formState.district = null
  formState.address = null
  formState.normal_rate = null
  formState.social_rate = null
}

const onSubmit = async() => {

  if(formState.social_rate > formState.normal_rate) return message.warning('La tarifa social no puede ser mayor a la Tarífa original')
  const payload = formState
  loading.value = true
  let url, method

  if(props.isIdUpdate) {
    url = `/notary/${props.isIdUpdate.id}`
    method = "PUT"
  } else {
    url = "/notary"
    method = "POST"
  }
  try {
    const data = await makeRequest({ url, method, data: payload });
    clearFields()
    emit('refreshTable', true)
    message.success(data.message);
    handleCloseModal()
  } catch (error) {
    message.error('No se pudo registrar');
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  getDepartaments()
});
</script>

<style lang="scss" scoped>
.wrapper-form_btn {
  margin-top: 1rem;
  text-align: right;
}
.grid-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 1.5rem;
}
.white {
  display: none;
}
.grid-item {
  .ant-form-item:nth-child(5)  {
    grid-column: 1/3;
  }
  .ant-input-number {
    width: 100%;
  }
}
</style>