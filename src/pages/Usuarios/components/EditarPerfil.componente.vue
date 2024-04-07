<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onSubmitFail">
    <div class="grid-profile">
      <template v-for="(el, idx) in fields" :key="idx">

        <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
          <a-select v-if="el.name == 'document_type'" v-model:value="formState[el.name]" :options="typeDocuments"
            :disabled="el.disabled" />
          <a-select v-if="el.name == 'gender'" v-model:value="formState[el.name]" :options="geners" />
          <a-select v-if="el.name == 'isDisabled'" v-model:value="formState[el.name]" :options="disabilities" />
          <a-select v-if="el.name == 'office_code'" v-model:value="formState[el.name]" :options="offices" />
          <a-select v-if="el.name == 'sede_code'" v-model:value="formState[el.name]" :options="sedes" />
          <a-select v-if="el.name == 'role'" v-model:value="formState[el.name]" :options="typeUsers" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, type: el.email }]">
          <a-input v-model:value="formState[el.name]" :disabled="el.disabled" />
        </a-form-item>

        <a-form-item v-show="!route.query.dni" v-if="el.type === 'iPassword'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-input v-model:value="formState[el.name]" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-select v-model:value="formState[el.name]" show-search :options="countries" :filter-option="filterOption" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-date-picker :locale="locale" v-model:value="formState.birthdate" style="width: 100%;"
            :format="dateFormat" />
        </a-form-item>
      </template>
    </div>

    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/actualizarUsuario.js'

import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const formState = reactive({});

const onSubmit = async () => {};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};

</script>

<style lang="scss" scoped>
.grid-profile {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;
  
  // .ant-form-item:nth-child(7) {
  //   grid-column: 1/3;
  //   grid-row: 4;
  // }
  // .ant-form-item:nth-child(8) {
  //   grid-column: 1/3;
  //   grid-row: 5;
  // }
  // .ant-form-item:nth-child(9) {
  //   grid-column: 1/3;
  //   grid-row: 6;
  // }
  // .ant-form-item:nth-child(10) {
  //   grid-column: 1/3;
  //   grid-row: 7;
  // }
  // .ant-form-item:nth-child(11) {
  //   grid-column: 1/3;
  //   grid-row: 8;
  // }

  // .ant-input-number {
  //   width: 100%;
  // }
}
</style>