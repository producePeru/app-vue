<template>
  <section>

    <a-breadcrumb>
      <a-breadcrumb-item><router-link to="/admin/convenios/ugse">Lista de convenios</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>
        <h4>Resumen General del convenio</h4>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <!-- <pre>{{ info }}</pre> -->
    <a-spin :spinning="spinning">

      <a-flex justify="space-between">
        
        <h1 class="info-h1">{{ info.alliedEntity }}</h1>
        
        <a-flex align="center" :gap="10">
          <div>

            <a-range-picker v-model:value="filterDate" @change="handleFilterDate" :format="dateFormat" />

          </div>
          <a-tooltip placement="topLeft" title="Descargar reporte en PDF">
            <a-button class="btn-pdf" @click="handleDownloadReportPDF(info.alliedEntity)" :loading="loadingFile"
              type="primary">
              <b> <VerticalAlignBottomOutlined /> PDF </b>
            </a-button>
          </a-tooltip>
        </a-flex>

      </a-flex>

      <br>

      <a-descriptions bordered size="small">
        <a-descriptions-item label="Región">{{ info.region?.name }}</a-descriptions-item>
        <a-descriptions-item label="Provincia">{{ info.provincia?.name }}</a-descriptions-item>
        <a-descriptions-item label="Distrito">{{ info.distrito?.name }}</a-descriptions-item>

        <a-descriptions-item label="RUC">{{ info.ruc }}</a-descriptions-item>
        <a-descriptions-item label="Componente" :span="2"><span style="text-transform: uppercase;">{{ info.components }}</span></a-descriptions-item>
       

        <a-descriptions-item label="Inicio convenio">{{ formatDate(info.startDate) }}</a-descriptions-item>
        <a-descriptions-item label="Fin convenio">{{ formatDate(info.endDate) }}</a-descriptions-item>
        <a-descriptions-item label="Renovación Automática" style="width: 200px;">
          {{ info.renovation }}
        </a-descriptions-item>

        <a-descriptions-item label="Punto Focal">{{ info.focal }}</a-descriptions-item>
        <a-descriptions-item label="Focal cargo">{{ info.focalCargo }}</a-descriptions-item>
        <a-descriptions-item label="Focal Num. celular">{{ info.focalPhone }}</a-descriptions-item>

        <a-descriptions-item label="Representante Legal">{{ info.aliado }}</a-descriptions-item>
        <a-descriptions-item label="Num. celular" :span="2">{{ info.aliadoPhone }}</a-descriptions-item>

        <a-descriptions-item label="Comentarios" :span="3">
          <p>{{ info.observations }}</p>
        </a-descriptions-item>
        
        <a-descriptions-item label="Archivos" :span="3">
          <div style="display: flex; flex-wrap: wrap;">
          
            <div class="conv-files" v-for="(file, j) in info.files_agreements" :key="j">
              <a v-if="spinerId != file.id" @click="handleDownloadAgreement(file)"><FileOutlined /> {{ file.name }}</a>
              <a-spin v-else :indicator="indicator" style="min-width: 100px;"> </a-spin>
            </div>

          </div>
        </a-descriptions-item>
      </a-descriptions>
      <!-- <pre>{{ info }}</pre> -->
      <br>

      <div v-if="info.compromisos?.length >= 1">
        <br>
        <h4>Compromisos</h4>
        <div class="acciones-box" v-for="(compromiso, i) in info.compromisos" :key="i" style="margin: 1rem 0;">
          <a-flex :gap="10">
            <b>{{ i + 1 }}</b>
            <div style="width: 100%;">
              <div style="margin-bottom: 6px;">Título: <b>{{ compromiso.title }}</b></div>
              <div>Tipo: <span style="text-transform: capitalize;">{{ compromiso.type }}</span></div>
              <div v-if="compromiso.meta">Meta: {{ compromiso.meta }}</div>
              <div v-if="compromiso.description">Descripción: {{ compromiso.description }}</div>
              <div>Registrado por: {{ compromiso.profile.name }} {{
                compromiso.profile.lastname
                }} {{ compromiso.profile.middlename }}</div>


              <div class="acciones" v-if="compromiso.acciones.length >= 1">
                <h4>Acciones</h4>
                <div class="acciones-box acciones-bg" v-for="(accion, j) in compromiso.acciones" :key="j">
                  <a-flex>
                    <div style="width: 20px;">{{ j + 1 }}</div>
                    <div style="width: 100%;">
                      <div>Conferencia: {{ accion.accion }}</div>
                      <div>Fecha: {{ formatDate(accion.date) }}</div>
                      <div>Modalidad: {{ accion.modality == 'v' ? 'Virtual' : 'Presencial' }}</div>
                      <div v-if="accion.address">
                        <EnvironmentOutlined /> {{ accion.address }}
                      </div>
                      <div>
                        <TeamOutlined /> {{ accion.participants }} participantes
                      </div>
                      <div v-if="accion.details">Detalle: {{ accion.details }}</div>
                      <div>Registrado por: {{ accion.profile.name }} {{ accion.profile.lastname }} {{
                        accion.profile.middlename }}</div>


                      <div class="conv-files">
                        <template v-if="accion.file1_name">
                          <a-spin v-if="spinName == accion.file1_name" :indicator="indicator"> </a-spin>
                          <template v-else>
                            <a @click="handleDownload(accion.file1_path, accion.file1_name)">
                              <FileOutlined /> {{ accion.file1_name }}
                            </a>
                          </template>
                        </template>

                        <template v-if="accion.file2_name">
                          <a-spin v-if="spinName == accion.file2_name" :indicator="indicator"> </a-spin>
                          <template v-else>
                            <a @click="handleDownload(accion.file2_path, accion.file2_name)">
                              <FileOutlined /> {{ accion.file2_name }}
                            </a>
                          </template>
                        </template>

                        <template v-if="accion.file3_name">
                          <a-spin v-if="spinName == accion.file3_name" :indicator="indicator"> </a-spin>
                          <template v-else>
                            <a @click="handleDownload(accion.file3_path, accion.file3_name)">
                              <FileOutlined /> {{ accion.file3_name }}
                            </a>
                          </template>
                        </template>
                      </div>

                    </div>
                  </a-flex>
                </div>
              </div>

            </div>
          </a-flex>
        </div>
      </div>

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
  VerticalAlignBottomOutlined,
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

const dateFormat = 'DD/MM/YYYY';
const filterDate = ref();
const spinerId = ref(null);
const spinning = ref(false);
const loadingFile = ref(false);
const route = useRoute();
const activeKey = ref([]);

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '18px',
  },
  spin: true,
});
const spinNameAg = ref(null);
const spinName = ref(null);
const info = ref([]);
const formatDate = (dateString) => {
  if(dateString) {
    return dayjs(dateString).format('DD-MM-YYYY');
  }
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

const handleDownloadAgreement = async (file) => {
  spinerId.value = file.id;
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
    spinerId.value = null;
  }
};


const handleDownloadReportPDF = async (name, date) => {
  try {
    loadingFile.value = true;
    const id = route.params.id;

    const urlApi = date ? `${apiUrl}pdf/agreements-general/${id}?start=${date.start}&end=${date.end}` : `${apiUrl}pdf/agreements-general/${id}`

    const response = await axios.get(urlApi, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name}.pdf`);
    document.body.appendChild(link);
    link.click();

  } catch (error) {
    console.error('Error descargando el PDF:', error);
  } finally {
    loadingFile.value = false;
  }
}

const handleFilterDate = async (date) => {
  if (!Array.isArray(date) || date === null) {
    console.warn("Invalid date array provided.");
    await fetchData(); 
    return; 
  }

  if (date.length === 2) {
    const value = {
      start: dayjs(date[0]).format('YYYY/MM/DD'),
      end: dayjs(date[1]).format('YYYY/MM/DD')
    };
    await fetchData(value);
  } 
};

const fetchData = async (date) => {
  try {
    spinning.value = true;

    const id = route.params.id;

    const url = date ? `/agreement/general/${id}?start=${date.start}&end=${date.end}` : `/agreement/general/${id}`

    const response = await makeRequest({ url, method: 'GET' });

    info.value = response

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss">
.minuscula {
  text-transform: lowercase;
}

.ant-descriptions-view table span {
  font-size: 13px;
}

.acciones {
  margin: 1rem 0;
  line-height: 1.4;

  h4 {
    margin-top: 0;
  }

  &-box {
    border: 1px solid rgba(12, 12, 12, 0.14);
    width: 100%;
    margin-bottom: .7rem;
    border-radius: 8px;
    padding: .5rem;

    div {
      font-size: 13px;
    }
  }

  &-bg {
    background-color: rgba(0, 0, 0, 0.02);
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

.info-h1 {
  text-transform: uppercase;
  margin: 1rem 0;
  color: var(--primary);
  font-size: 16px;
}

.info-h4 {
  color: var(--secondary);
  margin: 0;
  font-size: 14px;
}
</style>