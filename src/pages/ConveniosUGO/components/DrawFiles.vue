<template>
  <div>
    <div class="agreements-file">
      <b>Formatos a subir</b>
      <span>pdf, doc, docx, xls, xlsx, ppt, pptx</span>
      <span>*(Máximo 20MB)</span>
    </div>

    <a-upload
      :file-list="fileList"
      name="file"
      @change="handleChange"
      :custom-request="customRequest"
      :before-upload="beforeUpload">

      <a-button style="margin-bottom: .6rem;" :loading="loading">
        <CloudUploadOutlined />
        SUBIR ARCHIVO
      </a-button>

      <template #itemRender="{ file, actions }">
        <a-space style="margin: 0rem 0; font-size: 13px; width: 100%;">
          <div class="file-options">
            <span style="line-height: 1.3;">{{ file.name }}</span>
            <span>{{ formatDate(file.date) }}</span>
            <a v-if="spinerId != file.uid" @click="handleDownload(file)">Descargar</a>
            <a-spin v-else :indicator="indicator"> </a-spin>

            <a-spin v-if="spinerzDeleteId == file.uid" :indicator="indicator"> </a-spin>
            <a v-else @click="handleRemove(file)" style="color: var(--error);"><DeleteOutlined /></a>

          </div>
        </a-space>
      </template>
    </a-upload>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');
import axios from 'axios';
import { h, ref, onMounted, watch } from 'vue';
import { message } from 'ant-design-vue';
import { CloudUploadOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import Cookies from 'js-cookie';
import { makeRequest } from '@/utils/api.js';

const token = Cookies.get('token');
const props = defineProps(['idConvenio']);
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION;
const dev = import.meta.env.VITE_APP_API_URL_LOCAL;
const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? dev : prod;

const loading = ref(false);
const fileList = ref([]);
const spinerId = ref(null);
const spinerzDeleteId = ref(null);

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '20px',
  },
  spin: true,
});
onMounted(() => {
  if (props.idConvenio) {
    fetchData(props.idConvenio);
  }
});

watch(() => props.idConvenio, (newValue) => {
  if (newValue) {
    fetchData(newValue);
  }
});

const formatDate = (dateString) => {
  return dayjs(dateString).format('DD-MM-YYYY HH:mm');
}
const beforeUpload = (file) => {
  customRequest(file);
  return false; 
};

const customRequest = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('agreements_id', props.idConvenio);

  loading.value = true;
  try {
    const { data } = await axios.post(`${apiUrl}agreement/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    if(data.status == 200) {
      message.success(data.message);
      fetchData(props.idConvenio)
    }
  } catch (error) {
    message.error('Error al subir este tipo de archivo');
  } finally {
    loading.value = false;
  }
};

const handleDownload = async (file) => {
  spinerId.value = file.uid;
  try {
    const response = await axios({
      url: `${apiUrl}agreement/file-download/${file.uid}`,
      method: 'POST',
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.name); 
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  } finally {
    spinerId.value = null;
  }
};

const handleChange = info => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
    fileList.value = info.fileList.filter(file => file.status !== 'error');
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
    fileList.value = info.fileList.filter(file => file.uid !== info.file.uid);
  }
};

const handleRemove = async (file) => {
  spinerzDeleteId.value = file.uid;
  try {
    const data = await makeRequest({ url: `agreement/delete/file/${file.uid}`, method: 'DELETE' });
    if (data.status == 200) {
      fetchData(props.idConvenio);
      message.success(data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinerzDeleteId.value = null;
  }
}

const fetchData = async (agreements_id) => {
  try {
    const { data } = await axios.get(`${apiUrl}agreement/list-files/${agreements_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (data.status === 200) {
      fileList.value = data.data.map(file => ({
        uid: file.id,
        name: file.name,
        status: 'done',
        url: file.path,
        date: file.created_at
      }));
    }
  } catch (error) {
    console.error('Error fetching files:', error);
  }
};
</script>



<style lang="scss">
.agreements-file {
  display: flex;
  gap: .3rem;
  margin-bottom: 1rem;
  span {
    font-size: 13px;
    color: var(--secondary);
  }
}
.ant-space-item {
  width: 100%;
}
.file-options {
 
  display: grid;
  grid-template-columns: 3fr 2fr .8fr .8fr;
  padding: .25rem .5rem;
  a {
    text-align: center;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
}
</style>