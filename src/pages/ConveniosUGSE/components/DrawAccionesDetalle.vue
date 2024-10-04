<template>
  <section>
    <a-spin :spinning="spinning">
     
      <a-empty v-if="commitments.length < 1" />

      <template v-else>
        <a-comment v-for="(item, idx) in commitments" :key="idx">
          <template #author>
            <div class="convenios-header">
              <span>{{ item.profile.name }} {{ item.profile.lastname }} {{ item.profile.middlename }}</span>

              <div v-if="profile.user_id == item.profile.id || role.some(r => r.id === 8)">
                <span key="comment-nested-reply-to" class="ico-delete-comp">
                  <DeleteOutlined @click="handleDelete(item.id)" />
                </span>
              </div>

            </div>
          </template>
          <template #avatar>
            <a-avatar>{{ item.profile.name.charAt(0) }}</a-avatar>
          </template>
          <template #content>
            <div class="convenios-description">
              <div>
                <b>{{ item.accion }} </b>
                <span> - {{ formatDate(item.date) }}</span>
              </div>
              <p style="white-space: normal;"> {{ item.details }} </p>
              <div class="conv-part" v-if="item.address">
                <EnvironmentOutlined /> {{ item.address }}
              </div>

              <div class="conv-part const-mod" v-if="item.participants">
                <div>
                  <TeamOutlined /> {{ item.participants }} participantes
                </div>
                <div>
                  <SafetyOutlined />
                  <span> Modalidad: </span>{{ item.modality == 'v' ? 'Virtual' : 'Presencial' }}
                </div>
              </div>

              <div class="conv-files">
                <template v-if="item.file1_name">
                  <a-spin v-if="spinName == item.file1_name" :indicator="indicator"> </a-spin>
                  <template v-else>
                    <a @click="handleDownload(item.file1_path, item.file1_name)">
                      <FileOutlined /> {{ item.file1_name }}
                    </a>
                  </template>
                </template>


                <template v-if="item.file2_name">
                  <a-spin v-if="spinName == item.file2_name" :indicator="indicator"> </a-spin>
                  <template v-else>
                    <a @click="handleDownload(item.file2_path, item.file2_name)">
                      <FileOutlined /> {{ item.file2_name }}
                    </a>
                  </template>
                </template>

                <template v-if="item.file3_name">
                  <a-spin v-if="spinName == item.file2_name" :indicator="indicator"> </a-spin>
                  <template v-else>
                    <a @click="handleDownload(item.file3_path, item.file3_name)">
                      <FileOutlined /> {{ item.file3_name }}
                    </a>
                  </template>
                </template>
              </div>

            </div>
          </template>
        </a-comment>
      </template>
      <!-- <pre>{{dataRow}}</pre> -->
    </a-spin>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, watch, h } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { CloudUploadOutlined, TeamOutlined, DeleteOutlined, EnvironmentOutlined, FileOutlined, SafetyOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import fields from '@/forms/conveniosUgseCompromiso.js';
import axios from 'axios';
import Cookies from 'js-cookie';

import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const props = defineProps(['dataRow']);
const role = JSON.parse(localStorage.getItem('role'));
const profile = JSON.parse(localStorage.getItem('profile'));

const token = Cookies.get('token');
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1' ? dev : prod;

const formState = reactive({});
const loading = ref(false);
const dateFormat = 'DD/MM/YYYY';
const spinning = ref(false);
const route = useRoute();
const spinName = ref(null);

const commitments = ref([]);

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '18px',
  },
  spin: true,
});

// funciones
const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
}


const handleDownload = async (path, name) => {
  spinName.value = name;
  try {
    const response = await axios.get(`${apiUrl}agreement/commitment-download/${path}`, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Error al descargar el archivo', error);
  } finally {
    spinName.value = null;
  }
};

const handleDelete = async (id) => {
  try {

    const response = await makeRequest({ url: `/agreement/commitment-delete/${id}`, method: 'DELETE' });
    if(response.status == 200) fetchData()
    
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const fetchData = async (row) => {
  try {
    spinning.value = true;

    const id = route.params.id;

    const response = await makeRequest({ url: `/agreement/commitments/${row.id}`, method: 'GET' });

    commitments.value = response.data

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false;
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
  if (props.dataRow) {
    fetchData(props.dataRow);
  }
});

watch(() => props.dataRow, (newValue) => {
  if (newValue) {
    fetchData(newValue);
  }
});

</script>

<style lang="scss">
.ant-empty-description {
  font-size: 13px;
}
.compromisos {
  display: grid;
  grid-template-columns: 350px auto;
  gap: 3rem;
}

.compromiso-box {}

.compromisos-form {
  form {
    padding: 1rem;
    border: 1px solid #efefef;
    border-radius: 4px;
    background-color: #f1f1f147;
  }
}

.compromiso-user {
  color: #777;
}

.ant-comment-content-author-name {
  width: 100%;
}

.convenios-header {
  display: flex;
  justify-content: space-between;

  .ico-delete-comp {
    cursor: pointer;

    &:hover {
      color: var(--secondary) !important;
    }
  }
}


.convenios-description {
  font-size: 13px;

  b {
    font-weight: 600;
  }

  .conv-part {
    margin-top: 5px;
    color: #00000073;
    font-size: 12px;
  }

  .const-mod {
    display: flex;
    gap: 1rem;
  }

  .conv-files {
    margin-top: 5px;

    a {
      margin-right: 14px;
      color: #009ed0;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>