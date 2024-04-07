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

    <div class="wrapper-form_btn">
      <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">{{ !isIdUpdate ? 'GUARDAR' : 'Actualizar' }}</a-button>
    </div>

    <pre>{{ formState }}</pre>
  </a-form>


</template>

<script setup>
import { reactive, ref, onUpdated, onMounted } from 'vue'; 
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';
import fields from '@/forms/nuevaNotaria.js';
import { useCounterStore } from '@/stores/selectes.js';
import { QuillEditor } from '@vueup/vue-quill';
import 'quill/dist/quill.snow.css';

const store = useCounterStore();
store.$patch({ cities: store.cities });

const editorOptions = {
  theme: 'snow',
  modules: {
    
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      // ['link', 'image', 'video'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      // ['blockquote', 'code-block'],
      [{ script: 'sub' }, { script: 'super' }],
      // [{ indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  },
  contentType: 'html', 
};

const formState = reactive({
  city_id: null,
  province_id: null,
  district_id: null,
  address: null,
  name: null,
  istestimonio: null,
  price: null,
  conditions: null,
  sociointerveniente: null,
  biometrico: null,
  infocontacto: null,

  // created_by: storageData.id
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