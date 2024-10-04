<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
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
        v-if="el.name == 'type'" 
        v-model:value="formState[el.name]" 
        :options="types" />
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
        <a-input-number v-model:value="formState[el.name]" :min="1" :max="500" style="width: 120px;" />
      </a-form-item>

    </template>

    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
    </a-form-item>

  </a-form>
  <!-- <pre>{{ route.params.id }}</pre> -->
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

const emit = defineEmits(['closeDraw']);
const route = useRoute();
const formState = reactive({
  title: null,
  type: null,
  description: null,
  meta: null
});

const fields = {
  title: {
    type: 'iText',
    label: 'Título del Compromiso',
    name: 'title',
    required: true,
    message: 'Escribir el título',
    disabled: true,
    max: 100
  },
  type: {
    type: 'iSelect',
    label: 'Tipo convenio',
    name: 'type',
    required: true,
    message: 'Seleccionar una opción',
    disabled: true
  },
  description: {
    type: 'iTextarea',
    label: 'Descripción del compromiso',
    name: 'description',
    required: false,
    message: 'Escribir la descripción',
    disabled: false,
    max: 200
  },
  meta: {
    type: 'iNumber',
    label: 'Beneficiario',
    name: 'meta',
    required: false,
    message: 'Escribir la acción',
    disabled: true
  },
}

const loading = ref(false);
const types = [
  { label: 'Aliado',  value: 'aliado' },
  { label: 'PNTE',    value: 'pnte' },
  { label: 'Ambos',   value: 'ambos' },
];
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
    const response = await makeRequest({ url: '/agreement/create-commitment', method: 'POST', data: payload });
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
</script>