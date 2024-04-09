<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
    <div class="grid-notary">
      <template v-for="(el, idx) in fields" :key="idx">
        
        <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
          <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" :options="store.cities" @change="handleDepartaments" />
          <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" :options="store.provinces" @change="handleProvinces" />
          <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" :options="store.districts"/>
        </a-form-item>

        <a-form-item v-if="el.type === 'checked'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
          <a-checkbox v-model:checked="formState[el.name]" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
          <a-input v-model:value="formState[el.name]" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iNumber'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-input-number v-model:value="formState[el.name]" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iQuillEditor'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
          <QuillEditor class="quill-editor" v-model:content="formState[el.name]" :options="editorOptions" contentType="html" />
        </a-form-item>

      </template>
    </div>

    <div>{{ update(props.updateNotary) }}</div>

    <div class="wrapper-form_btn">
      <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
    </div>
  </a-form>
  
</template>

<script setup>
import { reactive, ref } from 'vue'; 
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';
import fields from '@/forms/nuevaNotaria.js';
import { useCounterStore } from '@/stores/selectes.js';
import { QuillEditor } from '@vueup/vue-quill';
import 'quill/dist/quill.snow.css';

const storageData = JSON.parse(localStorage.getItem('profile'))
const store = useCounterStore();
const emit = defineEmits(['closeDraw']);
const props = defineProps(['updateNotary'])

store.$patch({ cities: store.cities });
store.fetchCities();

const editorOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  },
  contentType: 'html', 
};

const loading = ref(false);
const formState = reactive({
  city_id: null,
  province_id: null,
  district_id: null,
  address: null,
  name: null,
  istestimonio: false,
  price: null,
  conditions: null,
  sociointerveniente: null,
  biometrico: null,
  infocontacto: null,
  user_id : storageData.id,     //creador
});

const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id)
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}

const clearFields = () => {
  formState.city_id = null
  formState.province_id = null
  formState.district_id = null
  formState.address = null
  formState.name = null
  formState.istestimonio = false
  formState.price = '</p>'
  formState.conditions = '</p>'
  formState.sociointerveniente = '</p>'
  formState.biometrico = '</p>'
  formState.infocontacto = '</p>'
}

const update = (val) => {
  if(val) {
    formState.city_id = val.city.id
    handleDepartaments(val.city.id)
    formState.province_id = val.province.id
    handleProvinces(val.province.id)
    formState.district_id = val.district.id
    formState.address = val.address
    formState.name = val.name
    formState.istestimonio = val.istestimonio == 0 ? false : true
    formState.price = val.price
    formState.conditions = val.conditions
    formState.sociointerveniente = val.sociointerveniente
    formState.biometrico = val.biometrico
    formState.infocontacto = val.infocontacto
  } else {
    clearFields()
  }
}


const onSubmit = async () => {
  let payload = formState
  loading.value = true;
  try {

    let url = null, method = null;

    if(props.updateNotary) {
      url = `notary/update/${props.updateNotary.id}`;
      method = 'PATCH';
    } else {
      url = 'notary/create';
      method = 'POST';
    }

    const data = await makeRequest({ url, method, data: payload });

    clearFields()
    emit('closeDraw', true)
    message.success(data.message)

  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};

</script>

<style lang="scss" scoped>
.grid-notary {
  display: grid;
  grid-template-columns: 1.3fr 1.5fr;
  grid-gap: 0 1rem;
  
  .ant-form-item:nth-child(7) {
    grid-column: 1/3;
    grid-row: 4;
  }
  .ant-form-item:nth-child(8) {
    grid-column: 1/3;
    grid-row: 5;
  }
  .ant-form-item:nth-child(9) {
    grid-column: 1/3;
    grid-row: 6;
  }
  .ant-form-item:nth-child(10) {
    grid-column: 1/3;
    grid-row: 7;
  }
  .ant-form-item:nth-child(11) {
    grid-column: 1/3;
    grid-row: 8;
  }

  .ant-input-number {
    width: 100%;
  }
}
</style>