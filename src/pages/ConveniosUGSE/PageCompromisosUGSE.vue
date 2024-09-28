<template>
  <section class="compromisos">

    <div>
      <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

        <div class="">

          <template v-for="(el, idx) in fields" :key="idx">
            <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message, max: el.max }]">
              <a-input v-model:value="formState[el.name]" :maxlength="el.max" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-date-picker :locale="locale" v-model:value="formState[el.name]" style="width: 100%;"
                :format="dateFormat" placeholder="día/mes/año" />
            </a-form-item>

            <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-select v-model:value="formState[el.name]" :options="handleOptions(el.name)" show-search
                :filter-option="filterOption" />
            </a-form-item>

            <a-form-item class="item-max" v-if="el.type === 'iNumber'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-input-number v-model:value="formState[el.name]" :min="1" :max="200" />
            </a-form-item>

            <a-form-item class="item-max" v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-textarea v-model:value="formState[el.name]" :rows="el.rows" :maxlength="el.max" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iFile'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-upload :before-upload="beforeUpload" :custom-request="dummyRequest" :file-list="fileList"
                :accept="acceptTypes" :multiple="true" :on-remove="handleRemove" show-upload-list>
                <a-button>
                  <CloudUploadOutlined />
                  Cargar archivos
                </a-button>
              </a-upload>
            </a-form-item>
          </template>

        </div>

        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
        </a-form-item>

      </a-form>
    </div>


    <div>
      <div class="compromiso-box" v-for="(item, idx) in commitments" :key="item.id">
        <div>
          <b>Título:</b>
          <span>{{ item.accion }}</span>
        </div>

        <div style="display: flex;">
          <div>
            <b>Fecha:</b>
            <span>{{ formatDate(item.date) }}</span>
          </div>
          <div style="margin-left: 20px;">
            <b>Modalidad:</b>
            <span>{{ item.modality == 'v' ? 'Virtual' : 'Presencial' }}</span>
          </div>
        </div>
        <div>
          <b>Lugar:</b>
          <span>{{ item.address }}</span>
        </div>
        <div>
          <b>Cantidad de participantes:</b>
          <span>{{ item.participants }}</span>
        </div>
        <b v-if="item.details">Detalles</b>
        <span>{{ item.details }}</span>


        <div>
          <span v-if="item.file1_name"><a href="" target="_blank">Archivo 1 </a></span>
          <span v-if="item.file2_name">| <a href="" target="_blank">Archivo 2 </a></span>
          <span v-if="item.file3_name">| <a href="" target="_blank">Archivo 3 </a></span>
        </div>


      </div>
    </div>

  </section>
</template>



<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { CloudUploadOutlined } from '@ant-design/icons-vue';
import fields from '@/forms/conveniosUgseCompromiso.js';
import axios from 'axios';
import Cookies from 'js-cookie';

import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const token = Cookies.get('token');
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1' ? dev : prod;


const formState = reactive({});
const loading = ref(false);
const dateFormat = 'DD/MM/YYYY';

const commitments = ref([]);

const modalities = [
  { label: 'Virtual', value: 'v' },
  { label: 'Presencial', value: 'p' }
];


// funciones
const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
}

const handleClear = () => {
  formState.accion = null;
  formState.date = null;
  formState.modality = null;
  formState.address = null;
  formState.participants = null;
  formState.file1 = null;
  formState.file2 = null;
  formState.file3 = null;
  formState.details = null;

  fileList.value = [];
};

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
  loading.value = true;

  const payload = {
    accion: formState.accion,
    date: dayjs(formState.date).format('YYYY-MM-DD'),
    modality: formState.modality,
    address: formState.address,
    participants: formState.participants,
    file1: formState.file1,
    file2: formState.file2,
    file3: formState.file3,
    details: formState.details,
    id_agreement: 1
  }

  try {
    const response = await axios.post(`${apiUrl}agreement/commitments`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    if (response.data.status == 200) {
      message.success(response.data.message);
      handleClear()
    }
  } catch (error) {
    message.error("Error al subir");
  } finally {
    loading.value = false
  }
};

const fetchData = async () => {
  try {
    // loading.value = true;

    const id = 1;

    const response = await makeRequest({ url: `/agreement/commitments/${id}`, method: 'GET' });

    commitments.value = response.data



  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    // loading.value = false;
  }
};



// START archivos ***
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
    message.error('Solo puedes cargar un máximo de 3 archivos');
    return false; // Evitar cargar más de maxFiles
  }

  // Almacenar el archivo directamente en el formState
  if (!formState.file1) {
    formState.file1 = file;
  } else if (!formState.file2) {
    formState.file2 = file;
  } else if (!formState.file3) {
    formState.file3 = file;
  }

  // Agregar el archivo a la lista de archivos
  fileList.value.push({
    uid: file.uid, // Identificador único para cada archivo
    name: file.name,
    status: 'done',
  });

  return false; // Evita la carga automática, usaremos nuestra lógica
};

// Elimina el archivo correspondiente del formState
const handleRemove = (file) => {
  const index = fileList.value.findIndex(item => item.uid === file.uid);
  if (index === 0) {
    formState.file1 = null;
  } else if (index === 1) {
    formState.file2 = null;
  } else if (index === 2) {
    formState.file3 = null;
  }
  fileList.value.splice(index, 1); // Eliminar el archivo de fileList
};
// END archivos ***


onMounted(() => {
  fetchData();
});
</script>

<style lang="scss">
.compromisos {
  display: grid;
  grid-template-columns: 350px auto;
  gap: 6rem;
}

.compromiso-box {
  margin-bottom: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.88);
  word-break: break-word;
  line-height: 1.5714285714285714;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  b {
    margin-right: 4px;
    // font-weight: 600;
    // font-size: 12px;
  }
}
</style>