<template>
  <section>

    <a-spin :spinning="spinning">
      <span>
        <router-link to="/admin/convenios/ugse">
          <LeftOutlined /> Atrás
        </router-link>
      </span>

      <div class="conv-det" v-if="general">
        
        <a-flex align="center" gap="small">
          <a-flex align="center" :gap="4">
           <h3 style="margin: 0;">{{ general.alliedEntity }}</h3>
          </a-flex>
        </a-flex>
      
        <a-flex class="conv-city" align="center" gap="small">
          <EnvironmentOutlined />
          <p>{{ general.region.name }} - {{ general.provincia.name }} - {{ general.distrito.name }}</p>
        </a-flex>

        <div>
          <span>RUC:</span> <span>{{ general.ruc }} </span>
        </div>


        <div>
          <span>Componente:</span> <span style="text-transform: capitalize;">{{ general.components }} </span>
        </div>
        <a-flex align="center" gap="small">
          <span>Inicio del convenio:</span> <span>{{ formatDate(general.startDate) }} </span> - 
          <span>Fin del convenio:</span> <span>{{ formatDate(general.endDate) }} </span>
        </a-flex>
        <a-flex align="center" gap="small">
          <span>Representante Legal:</span> <span>{{ general.aliado }} </span>
          <span style="color: #00000073;"><PhoneOutlined /> <span>{{ general.aliadoPhone }}</span> </span>
        </a-flex>
        <div>
          <span>Punto Focal:</span> <span>{{ general.focal }} | <span style="color: #00000073; font-size: 13px;">{{ general.focalCargo }}</span> | <span style="color: #00000073;"><PhoneOutlined /> {{ general.focalPhone }}</span></span>
        </div>
        <div>
          <span>Comentarios:</span> <span>
            <p style="margin: 0;">{{ general.observations }}</p>
          </span>
        </div>
        <div>
          <div class="conv-files">
            <span v-for="(file, jx) in general.files_agreements" :key="jx">
              <a @click="handleDownloadFile(file)"> <FileOutlined /> {{ file.name }}</a>
            </span>
          </div>
        </div>
      </div>


      <div v-if="commitments.length < 1"> </div>

      <template v-else>
        <a-comment v-for="(item, idx) in commitments" :key="idx">
          <template #author>
            <div class="convenios-header">
              <span>{{ item.profile.name }} {{ item.profile.lastname }} {{ item.profile.middlename }}</span>
            </div>
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

    </a-spin>

  </section>
</template>

<script setup>
import { reactive, ref, onMounted, watch, h } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { 
  BankOutlined,
  CloudUploadOutlined, 
  TeamOutlined, 
  PhoneOutlined,
  DeleteOutlined, 
  EnvironmentOutlined, 
  FileOutlined, 
  SafetyOutlined, 
  LeftOutlined, 
  LoadingOutlined 
} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
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
const spinning = ref(false);
const route = useRoute();
const spinName = ref(null);

const general = ref(null);
const commitments = ref([]);

const modalities = [
  { label: 'Virtual', value: 'v' },
  { label: 'Presencial', value: 'p' }
];
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

const handleDownloadFile = async (file) => {
  // spinerId.value = file.uid;
  try {
    const response = await axios({
      url: `${apiUrl}agreement/file-download/${file.id}`,
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
    // spinerId.value = null;
  }
};

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

const fetchData = async () => {
  try {
    spinning.value = true;

    const id = route.params.id;

    const response = await makeRequest({ url: `/agreement/general/${id}`, method: 'GET' });

    general.value = response;
    commitments.value = response.commitments

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
  fetchData();
});
</script>

<style lang="scss">
.conv-det {
  margin-top: 1rem;
  line-height: 1.3;
  .conv-city {
    margin: 4px 0;
    color: #00000073;
    p {
      font-size: 13px;
      margin: 0;
    }
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
</style>