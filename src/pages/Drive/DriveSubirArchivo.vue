<template>
  <h3>SUBIR ARCHIVOS</h3>

  <br>

  <div class="agreement-wrapper">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item v-if="el.type === 'iUpload'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-upload :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
              <a-button>
                <upload-outlined></upload-outlined>
                Seleccionar archivo 
              </a-button>
            </a-upload>
          </a-form-item>

        </template>
      </div>

      <a-form-item v-if="fileList.length >= 1">
        <a-button type="primary" html-type="submit" :loading="loading">SUBIR {{ fileList.length == 1 ? 'ARCHIVO' : 'ARCHIVOS' }}</a-button>
      </a-form-item>

    </a-form>
  </div>

</template>

<script setup>

import fields from '@/forms/drive.js'
import axios from 'axios';
import Cookies from 'js-cookie';
import { UploadOutlined } from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';

const userId = Cookies.get('usuario');
const token = Cookies.get('token');

const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == '127.0.0.1' ? dev : prod;

const loading = ref(false);
const fileList = ref([]);
const formState = reactive({
  pdfDocument: null,
});


// file PDF
const handleRemove = file => {
  formState.pdfDocument = null
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const beforeUpload = file => {

  const allowedExtensions = ['pdf', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx', 'png', 'jpg', 'jpeg', 'gif'];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    message.error('Solo se permiten archivos PDF, Excel, Word, PowerPoint e imágenes.');
    return false;
  }
  fileList.value = [...fileList.value, file]; 
  formState.pdfDocument = 'file'

  return false;
};


const onSubmit = async () => {

  loading.value = true

  const payload = {
    created_by: userId,
    files: fileList.value
  };

  try {
    const {data} = await axios.post(`${apiUrl}/drive/up-files`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    message.success(data.message);
    fileList.value = []
  } catch (error) {
    message.error("Error al subir");
  } finally {
    loading.value = false
  }
};

const onSubmitFail = () => {
  if(fileList.value >= 1) {
    formState.pdfDocument = 'file'
  } else {
    message.error('Debes al menos subir un archivo')
  }
  
};
</script>

<style lang="scss" scoped>
.agreement-wrapper {
  max-width: 450px;
}
</style>