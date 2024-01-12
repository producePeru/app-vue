<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onSubmitFail">
    <template v-for="(el, idx) in fields" :key="idx">
      <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
        :rules="[{ required: el.required, message: el.message }]">
        <a-select v-if="el.name == 'entity'" v-model:value="formState[el.name]" :options="entities" />
      </a-form-item>

      <template v-if="isVisible">
        <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, max: el.max }]">
          <a-input v-model:value="formState[el.name]" />
        </a-form-item>
      </template>

      <template v-if="isVisible">
        <a-form-item v-if="el.type === 'iNumber'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-input-number v-model:value="formState[el.name]" :min="1" :max="10" />
        </a-form-item>
      </template>

      <a-form-item v-if="el.type === 'iTextArea'" :name="el.name" :label="el.label"
        :rules="[{ required: el.required, message: el.message, max: el.max }]">
        <a-textarea v-model:value="formState[el.name]" />
      </a-form-item>

      <a-form-item class="final-column" v-if="el.type === 'iCheck'" :name="el.name" :label="el.label"
        :rules="[{ required: el.required, message: el.message }]">
        <a-checkbox @change="handleCheckStatus" v-model:checked="formState[el.name]">
          <span class="agree-message">¿Desea incluir meta numérica?</span>
        </a-checkbox>
      </a-form-item>

    </template>
    <br>
    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
    </a-form-item>
  </a-form>
  <pre>{{ formState }}</pre>
</template>

<script setup>
import fields from '@/forms/compromiso.js'
import { entities } from '@/utils/selects.js'
import { makeRequest } from '@/utils/api.js'
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { userId } from '@/utils/cookies.js'

const emit = defineEmits(['handleCreateItem'])

const loading = ref(false);
const isVisible = ref(false);

const formState = reactive({
  created: userId,
  idAgreement: 1,
  entity: null,
  isMeta: false,
  unitMeasurement: null,
  metaNumb: null,
  description: null
});

const clearFields = () => {
  formState.created = userId
  formState.entity = null
  formState.isMeta = false
  formState.unitMeasurement = null
  formState.metaNumb = null
  formState.description = null
  isVisible.value = false
}

const handleCheckStatus = () => {
  isVisible.value = !isVisible.value;
}

const onSubmit = async () => {
  loading.value = true
  const payload = formState
  try {
    const data = await makeRequest({ url: '/agreements/commitments', method: 'POST', data: payload });
    clearFields()
    emit('handleCreateItem', true)
    message.success(data.message)
  } catch (error) {
    message.error('Se presentó un error, los valores son requeridos',);
  } finally {
    loading.value = false;
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};
</script>