<template>
  <section>
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

      <div class="form-action">
        <template v-for="(el, idx) in fields" :key="idx">
          
 
          <a-form-item 
          v-if="el.type === 'iText' && el.visible" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, max: el.max }]">

            <a-input v-model:value="formState[el.name]" :maxlength="el.max" />

          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker :locale="locale" v-model:value="formState[el.name]" style="width: 100%;" :format="dateFormat"
              placeholder="día/mes/año" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-model:value="formState[el.name]" :options="handleOptions(el.name)" show-search
              :filter-option="filterOption" @change="handleSelecttType" />
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
<!-- <pre>{{ dataRow }}</pre> -->
    </a-form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import fieldx from '@/forms/conveniosUgseCompromiso.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import { CloudUploadOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const props = defineProps(['dataRow']);
const token = Cookies.get('token');
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1' ? dev : prod;
const emit = defineEmits(['closeDraw']);

const fields = ref(fieldx)
const formState = reactive({});
const loading = ref(false);
const dateFormat = 'DD/MM/YYYY';
const route = useRoute();

const modalities = [
  { label: 'Virtual', value: 'v' },
  { label: 'Presencial', value: 'p' }
];

// funciones

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

const handleSelecttType = (val) => {
  if(val == 'p') {
    fields.value.address.visible = true; 
  } else {
    fields.value.address.visible = false;
  }
  formState.address = null;
}

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
    agreement_id: route.params.id,
    commitment_id: props.dataRow.id
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
      fields.value.address.visible = false;
      emit('closeDraw');
      handleClear();
    }
  } catch (error) {
    message.error("Error al subir");
  } finally {
    loading.value = false
  }
};


// START archivos ***
const maxFiles = 3;
const fileList = ref([]);
const acceptTypes = '.pdf, .doc, .docx, .xls, .xlsx, .jpeg, .jpg, .png';

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
</script>

<style lang="scss">
.form-action {
  display: grid;
  grid-gap: 0 1rem;
  grid-template-columns: 1.5fr 1.5fr;

  .ant-form-item:nth-child(1),
  .ant-form-item:nth-child(4),
  .ant-form-item:nth-child(5),
  .ant-form-item:nth-child(6),
  .ant-form-item:nth-child(7) {
    grid-column: 1/3;
  }
}
</style>