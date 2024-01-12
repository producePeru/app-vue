<template>
  <h3>NUEVO CONVENIO</h3>

  <br>

  <div class="agreement-wrapper">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'office'" v-model:value="formState[el.name]" :options="convenioOffices" />
            <a-select v-if="el.name == 'component'" v-model:value="formState[el.name]" :options="convenioComponent"
              @change="handleChooseComponent" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-model:value="formState[el.name]" show-search :options="countries" :filter-option="filterOption" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker :locale="locale" v-model:value="formState[el.name]" style="width: 100%;"
              :format="dateFormat" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSwitch'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-switch v-model:checked="formState[el.name]" :checkedValue="1" :unCheckedValue="0" class="ml-1-3">
              <template #checkedChildren>Si</template>
              <template #unCheckedChildren>No</template>
            </a-switch>
          </a-form-item>

          <a-form-item v-if="el.type === 'iUpload'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove" :max-count="1"
              accept=".pdf">
              <a-button>
                <upload-outlined></upload-outlined>
                Subir archivo PDF
              </a-button>
            </a-upload>
          </a-form-item>

        </template>

        <div class="span1"></div>
        <div class="span2"></div>
        <div class="span3"></div>
        <div class="span4"></div>
        <div class="span5"></div>
      </div>
      <br>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import fields from '@/forms/convenio.js'

import { UploadOutlined } from '@ant-design/icons-vue';
import { convenioOffices, convenioComponent } from '@/utils/selects.js'
import { makeRequest } from '@/utils/api.js'
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { userId } from '@/utils/cookies.js'
import { useFileUploadStore } from '@/stores/formData.js';

const router = useRouter();

const loading = ref(false);
const dateFormat = 'YYYY-MM-DD';
const fileList = ref(null);

const formState = reactive({
  office: null,
  nameInstitution: null,
  component: null,
  responsible: null,
  representative: null,
  representativeEmail: null,
  addendum: 0,
  proponent: null,
  nameAgreement: null,
  focalPoint: null,
  phoneContact: null,
  pdfDocument: null,
  dateIssue: null,
  effectiveDate: null,
  dueDate: null,
  created_by: userId
});

const clearFields = () => {
  formState.office = null
  formState.nameInstitution = null
  formState.component = null
  formState.responsible = null
  formState.representative = null
  formState.representativeEmail = null
  formState.addendum = 0
  formState.proponent = null
  formState.nameAgreement = null
  formState.focalPoint = null
  formState.phoneContact = null
  formState.pdfDocument = null
  formState.dateIssue = null
  formState.effectiveDate = null
  formState.dueDate = null
}

const handleChooseComponent = () => {
  let name = formState.component
  const types = {
    1: "Responsable 1",
    2: "Responsable 2",
    3: "Responsable 3",
    4: "Responsable 4"
  };
  formState.responsible = types[name];
}

// file PDF
const handleRemove = file => {
  formState.pdfDocument = null
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
const beforeUpload = file => {
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes

  if (file.size > maxSize) return message.error("El tamaño máximo del archivo PDF es 10MB")

  fileList.value = [file]; 
  formState.pdfDocument = file.name; 
  return false;
}
const handleUpload = async () => {
  const fileUploadStore = useFileUploadStore();
  const pdf = fileList.value[0];
  fileUploadStore.handleUpload(pdf);
};

const onSubmit = async () => {
  const payload = formState
  loading.value = true
  try {
    const data = await makeRequest({ url: '/agreements/new-agreement', method: 'POST', data: payload });
    if(data) {
      handleUpload()
      clearFields()
      loading.value = false;
      // router.push({ name: '' });
    }
  } catch (error) {
    message.error('Se presentó un error en el servidor');
    loading.value = false;
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};
</script>

<style lang="scss" scoped>
.agreement-wrapper {
  max-width: 900px;
}

.grid-item {
  display: grid;
  grid-template-columns: 47% 47%;
  grid-gap: 0 1.5rem;

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;

    .span1 {
      grid-row: 1;
      grid-column: 3/3;
    }

    .span2 {
      grid-row: 2;
      grid-column: 3/3;
    }

    .span3 {
      grid-row: 4;
      grid-column: 3/3;
    }

    .span4 {
      grid-row: 5;
      grid-column: 3/3;
    }

    .span5 {
      grid-row: 6;
      grid-column: 2/4;
    }
    .ml-1-3 {
      margin-left: 1.3rem;
    }
  }
}
</style>