<template>
  <a-spin :spinning="spinning">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-convenios">
        
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" />
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
import fields from '@/forms/tokens.js';
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const emit = defineEmits(['closeDraw']);

const loading = ref(false);
const spinning = ref(!true);
const formState = reactive({});

const clearFields = () => {
  formState.token = null
  formState.name = null
}
const onSubmit = async () => {
  loading.value = true

  const payload = {
    token: formState.token,
    name: formState.name
  }

  try {
    const data = await makeRequest({ url: 'token/create', method: 'POST', data: payload });

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
</script>

<style lang="scss" scoped>

</style>