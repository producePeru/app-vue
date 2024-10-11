<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
    <div class="form-fair">
      <template v-for="(el, idx) in fields" :key="idx">
        <a-form-item 
        v-if="el.type === 'iText'" 
        :name="el.name" 
        :label="el.label" 
        :rules="[{ required: el.required, message: el.message, max: el.max }]">
          <a-input v-model:value="formState[el.name]" :maxlength="el.max" @blur="validateTrim(el.name)" />
        </a-form-item> 

        <a-form-item 
        class="item-max" 
        v-if="el.type === 'iSelect'" 
        :name="el.name" 
        :label="el.label" 
        :rules="[{ required: el.required, message: el.message }]">
          <a-select 
          v-model:value="formState[el.name]" 
          :options="handleSelect(el.name)" />
        </a-form-item>

        <a-form-item 
        v-if="el.type === 'iTextarea'" 
        :name="el.name" 
        :label="el.label"
        :rules="[{ required: el.required, message: el.message }]">
          <a-textarea v-model:value="formState[el.name]" :rows="3" :maxlength="el.max" />
        </a-form-item>

        <a-form-item 
        class="item-max" 
        v-if="el.type === 'iNumber'" 
        :name="el.name" 
        :label="el.label"
        :rules="[{ required: el.required, message: el.message }]">
          <a-input-number v-model:value="formState[el.name]" :min="1" :max="500" style="width: 100%" />
        </a-form-item>

        <a-form-item 
        v-if="el.type === 'iQuillEditor'" 
        :name="el.name" 
        :label="el.label" 
        :rules="[{ required: el.required, message: el.message }]">
          <QuillEditor 
          class="quill-height-200" 
          v-model:content="formState[el.name]" 
          :options="editorOptions" 
          contentType="html" />
        </a-form-item>

        <a-form-item 
        v-if="el.type === 'iDate'" 
        :name="el.name" 
        :label="el.label"
        :rules="[{ required: el.required, message: el.message }]">
          <a-date-picker 
          :locale="locale" 
          v-model:value="formState[el.name]" 
          style="width: 100%;" 
          :format="dateFormat"
          placeholder="día/mes/año" />
        </a-form-item>

        <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
          <a-select 
            v-if="el.name == 'city_id'" 
            v-model:value="formState[el.name]" 
            :options="store.cities" 
            show-search 
            :filter-option="filterOption"
            @change="handleDepartaments" />
          <a-select 
            v-if="el.name == 'province_id'" 
            v-model:value="formState[el.name]" 
            :options="store.provinces" 
            show-search :filter-option="filterOption"
            @change="handleProvinces" 
            :disabled="!formState.city_id" />
          <a-select 
            v-if="el.name == 'district_id'" 
            v-model:value="formState[el.name]" 
            :options="store.districts" 
            show-search 
            :filter-option="filterOption"
            :disabled="!formState.province_id" />
        </a-form-item>

      </template>
    </div>

    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="loading">{{ dataRow ? 'ACTUALIZAR' : 'GUARDAR' }}</a-button>
    </a-form-item>

  </a-form>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { QuillEditor } from '@vueup/vue-quill';
import { useCounterStore } from '@/stores/selectes.js';
import 'quill/dist/quill.snow.css';

import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const store = useCounterStore();
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.fetchCities();

const loading = ref(false);
const dateFormat = 'DD/MM/YYYY';

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

const props = defineProps(['dataRow']);
const emit = defineEmits(['closeDraw']);
const route = useRoute();

const formState = reactive({ }); 

const fields = {
  title: {
    type: 'iText',
    label: 'Nombre de la Feria',
    name: 'title',
    required: true,
    message: 'Escribir el nombre de la Feria',
    disabled: true,
    max: 100
  },
  description: {
    type: 'iQuillEditor',
    label: 'Descripción de la Feria',
    name: 'description',
    required: false,
    message: 'Escribir la descripción',
    disabled: false
  },
  metaMypes: {
    type: 'iNumber',
    label: 'Meta MYPEs Participantes',
    name: 'metaMypes',
    required: false,
    message: 'Escribir la meta',
    disabled: true
  },
  metaSales: {
    type: 'iNumber',
    label: 'Meta en ventas',
    name: 'metaSales',
    required: false,
    message: 'Escribir le meta en ventas',
    disabled: true
  },
  startDate: {
    type: 'iDate',
    label: 'Fecha Inicio de la Feria',
    name: 'startDate',
    required: true,
    message: 'Seleccionar fecha',
    disabled: false
  },
  endDate: {
    type: 'iDate',
    label: 'Fecha Fin de la Feria',
    name: 'endDate',
    required: true,
    message: 'Seleccionar fecha',
    disabled: false
  },
  modality: {
    type: 'iSelect',
    label: 'Modalidad',
    name: 'modality',
    required: true,
    message: 'Seleccionar una opción',
    disabled: true
  },
  powerBy: {
    type: 'iSelect',
    label: 'Pertenece al',
    name: 'powerBy',
    required: true,
    message: 'Seleccionar una opción',
    disabled: true
  },
  typeFair: {
    type: 'iSelect',
    label: 'Tipo de Feria',
    name: 'typeFair',
    required: true,
    message: 'Seleccionar una opción',
    disabled: true
  },
  city_id: {
    type: 'iSelectWrite',
    label: 'Región del negocio',
    name: 'city_id',
    required: true,
    message: 'Seleccionar región',
    disabled: false
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'Provincia del negocio',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'Distrito del negocio',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: false
  }
};

const types = [
  { label: 'PRESENCIAL',  value: 'p' },
  { label: 'VIRTUAL',     value: 'v' },
];
const pertenece = [
  { label: 'PP093',   value: 'pp093' },
  { label: 'PUNCHE',  value: 'punche' },
  { label: 'APNOP',   value: 'apnop' }
];
const typeFair = [
  { label: 'PERÚ PRODUCE',        value: 'pp' },
  { label: 'PERÚ IMPARABLE',      value: 'pi' },
  { label: 'GAMARRA IMPARABLE',   value: 'gi' },
  { label: 'FESTI PRODUCE',       value: 'fp' },
  { label: 'MUJER PRODUCE',       value: 'mp' },
  { label: 'MACRO EVENTO',        value: 'me' }
];
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const handleSelect = (name) => {
  if(name == 'modality') {
    return types;
  }
  if(name == 'powerBy') {
    return pertenece;
  }
  if(name == 'typeFair') {
    return typeFair;
  }
}
const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id)
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}

const clear = () => {
  formState.title = null;
  formState.type = null;
  formState.description = null;
  formState.meta = null;
}

const onSubmit = async () => {
  loading.value = true;
  const payload = {
    title: formState.title,
    type: formState.type,
    description: formState.description,
    meta: formState.meta,
    agreement_id: route.params.id
  }

  try {
    
    const method = props.dataRow ? 'PUT' : 'POST';
    const url = props.dataRow ? `agreement/update-commitment/${props.dataRow.id}` : '/agreement/create-commitment';
    
    const response = await makeRequest({ url , method, data: payload });
    if(response.status == 200) {
      message.success(response.message);
      emit('closeDraw');
      clear();
    }
    
  } catch (error) {
    message.error('Se presentó un error, los valores son requeridos',);
  } finally {
    loading.value = false;
  }
}

const validateTrim = (field) => {
  const trimmedValue = formState[field] ? formState[field].trim() : '';
  formState[field] = trimmedValue;
};

function handleSetInfo(info) {
  formState.title = info.title;
  formState.type = info.type;
  formState.description = info.description;
  formState.meta = info.meta;
}

onMounted(() => {
  if (props.dataRow) {
    handleSetInfo(props.dataRow);
  }
});

watch(() => props.dataRow, (newValue) => {
  if (newValue) {
    handleSetInfo(newValue);
  } else {
    clear();
  }
});
</script>

<style lang="scss">
.form-fair {
  display: grid;
  grid-gap: 0 1rem;
  grid-template-columns: 1.5fr 1.5fr;  
  .ant-form-item:nth-child(1),
  .ant-form-item:nth-child(2) {
    grid-column: 1/3;
  }
}
</style>