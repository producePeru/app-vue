<template>
  <section>

    <div>
      <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

        <div class="grid-convenios">

          <template v-for="(el, idx) in fields" :key="idx">
            <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message, max: el.max }]">
              <a-input v-model:value="formState[el.name]" :maxlength="el.max" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-date-picker :locale="locale" :disabled="!formState.startDate" v-model:value="formState[el.name]"
                style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" />
            </a-form-item>


            <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-select v-model:value="formState[el.name]" :options="handleOptions(el.name)" show-search
                :filter-option="filterOption" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iFile'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-upload :before-upload="beforeUpload" :custom-request="dummyRequest" :file-list="fileList"
                :accept="acceptTypes" :multiple="true" :on-remove="handleRemove">
                <a-button icon="upload">Cargar archivo (PDF, Word, Excel)</a-button>
              </a-upload>
            </a-form-item>




          </template>

        </div>

        <!-- <a-form-item>
<a-button type="primary" html-type="submit" :loading="loading">
  <span v-if="idConvenio">ACTUALIZAR</span>
  <span v-else>GUARDAR</span>
</a-button>
</a-form-item> -->

      </a-form>
    </div>
    <pre>{{ formState }}</pre>
  </section>
</template>



<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import fields from '@/forms/conveniosUgseCompromiso.js';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const formState = reactive({});
const dateFormat = 'DD/MM/YYYY';
const modalities = [
  { label: 'Virtual', value: 'v' },
  { label: 'Presencial', value: 'p' }
];




// funciones


// archivos ***
const maxFiles = 3;
const fileList = ref([]);
const acceptTypes = '.pdf, .doc, .docx, .xls, .xlsx';

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const beforeUpload = (file) => {
  if (fileList.value.length >= maxFiles) {
    alert('Solo puedes cargar un máximo de 3 archivos.');
    return false;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64 = reader.result;
    const index = fileList.value.length;

    if (index === 0) {
      formState.file1 = { name: file.name, base64 };
    } else if (index === 1) {
      formState.file2 = { name: file.name, base64 };
    } else if (index === 2) {
      formState.file3 = { name: file.name, base64 };
    }

    fileList.value.push(file); 
  };

  return false; 
};

const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  
  fileList.value.splice(index, 1);
  
  if (index === 0) {
    formState.file1 = null;
  } else if (index === 1) {
    formState.file2 = null;
  } else if (index === 2) {
    formState.file3 = null;
  }
};

// archivos ***

const handleOptions = (name) => {
  if (name === 'modality') {
    return modalities;
  }
  return [];
};

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const onSubmit = async () => {

}

</script>