<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
    @finishFailed="onFinishFailed">

    <h2>DATOS DE LA EMPRESA</h2>

    <div class="fair-form">
      <template v-for="(el, idx) in mype" :key="idx">

        <a-form-item v-if="el.type === 'iSearch'" :name="el.name" :label="el.label" :rules="[
          {
            required: el.required,
            message: el.message,
            max: el.max
          },
          {
            pattern: /^(10|15|20)\d{9,}$/,
            message: 'El número debe comenzar con 10, 15 o 20, tener solo números, y al menos 11 caracteres',
          }
        ]">
          <a-input-search v-model:value="formState[el.name]" placeholder="Ingresar RUC" enter-button="BUSCAR"
            :maxlength="el.max" @search="handleSearchRUC" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, max: el.max }]" :style="{ display: el.display }">
          <a-input v-model:value="formState[el.name]" :maxlength="el.max" @blur="validateTrim(el.name)"
            :disabled="el.disabled" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iLink'" :name="el.name" :label="el.label" :rules="[
          { required: el.required, message: el.message },
          { validator: validateURL, message: 'Por favor, introduce una URL válida.' } // Validator without message, handled inside the function
        ]">
          <a-input v-model:value="formState[el.name]" @blur="validateTrim(el.name)" :disabled="el.disabled" />
        </a-form-item>

        <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-select v-model:value="formState[el.name]" :options="handleSelectOptions(el.name)" :disabled="el.disabled"
            @change="handleChangeEvent(el.name)" />
        </a-form-item>

        <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-textarea v-model:value="formState[el.name]" :rows="4" :maxlength="el.max" :disabled="el.disabled" />
        </a-form-item>


        <a-form-item class="item-max" v-if="el.type === 'iNumber'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]" :style="{ display: el.display }">
          <a-input-number v-model:value="formState[el.name]" :min="1" :max="el.max" style="width: 180px;"
            :disabled="el.disabled" />
        </a-form-item>


        <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" :options="store.cities" show-search
            :filter-option="filterOption" @change="handleDepartaments" :disabled="el.disabled" />
          <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" :options="store.provinces"
            show-search :filter-option="filterOption" @change="handleProvinces" :disabled="!formState.city_id" />
          <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" :options="store.districts"
            show-search :filter-option="filterOption" :disabled="!formState.province_id" />

          <a-select v-if="el.name == 'businessSector'" v-model:value="formState[el.name]" :options="rubros" show-search
            :filter-option="filterOption" :disabled="el.disabled" />
        </a-form-item>


        <!-- <pre>{{ el['filePDF'] }}</pre> -->

        <!-- <a-form-item v-if="el.type === 'iFile'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-upload :before-upload="beforeUpload" :custom-request="dummyRequest" :file-list="fileList"
            :accept="acceptTypes" :multiple="true" :on-remove="handleRemove" show-upload-list>
            <a-button>
              <CloudUploadOutlined />
              {{ el.span }}
            </a-button>
          </a-upload>
        </a-form-item> -->

        <div v-if="el['filePDF']" class="ellipsis">
          <a-form-item v-if="el['filePDF'].name === 'filePDF'" :name="el['filePDF'].name" :label="el['filePDF'].label"
            :rules="[{ required: el['filePDF'].required, message: el['filePDF'].message }]">
            <a-upload :before-upload="(file) => beforeUpload(file, el['filePDF'].name)" :custom-request="dummyRequest"
              :file-list="fileList" :accept="'.pdf'" :multiple="false"
              :on-remove="(file) => handleRemove(file, 'filePDF')" show-upload-list>
              <a-button>
                <CloudUploadOutlined />
                {{ el['filePDF'].span }}
              </a-button>
            </a-upload>
          </a-form-item>

          <a-form-item v-if="el['logo'].name === 'logo'" :name="el['logo'].name" :label="el['logo'].label"
            :rules="[{ required: el['logo'].required, message: el['logo'].message }]">
            <a-upload :before-upload="(file) => beforeUpload(file, el['logo'].name)" :custom-request="dummyRequest"
              :file-list="fileListLogo" :accept="'.png,.jpeg,.jpg'" :multiple="false"
              :on-remove="(file) => handleRemove(file, 'logo')" show-upload-list>
              <a-button>
                <CloudUploadOutlined />
                {{ el['logo'].span }}
              </a-button>
            </a-upload>
          </a-form-item>
        </div>

        <a-form-item v-if="el.type === 'iFileImg'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-upload v-model:file-list="fileListImgs" :before-upload="handleBeforeUpload" list-type="picture-card"
            :on-remove="handleRemoveImage" @preview="handlePreview">
            <div v-if="fileListImgs.length < 3">
              <plus-outlined />
              <div style="margin-top: 8px; font-size: 13px;">Cargar Imagen</div>
            </div>
          </a-upload>
          <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>

        <div v-if="
          el.type === 'space1' ||
          el.type === 'space2' ||
          el.type === 'space3' ||
          el.type === 'space4' ||
          el.type === 'space5' ||
          el.type === 'space6' ||
          el.type === 'space7' ||
          el.type === 'space8'">
        </div>

      </template>
    </div>

    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="loading" class="fair-btn">SIGUIENTE</a-button>
    </a-form-item>


    <!-- <pre>{{ formState }}</pre> -->

  </a-form>
</template>


<script setup>
import { ref, reactive } from 'vue';
import { useCounterStore } from '@/stores/selectes.js';
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { makeRequest } from '@/utils/api.js';

const emit = defineEmits(['nextStep']);

const store = useCounterStore();
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.fetchCities();

const token = Cookies.get('token');
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1' ? dev : prod;

const loading = ref(false);
const formState = reactive({});

const sectorEconomico = [
  { label: 'COMERCIO', value: 'comercio' },
  { label: 'SERVICIOS', value: 'servicios' },
  { label: 'INDUSTRIA', value: 'industria' }
];
const sino = [
  { label: 'SI', value: 'si' },
  { label: 'NO', value: 'no' }
];

const rubros = [
  { label: 'Alimentos y bebidas', value: 'alimentos' },
  { label: 'Artesanía', value: 'artesania' },
  { label: 'Cosmética orgánica', value: 'cosmetica' },
  { label: 'Cuero calzado', value: 'cuero' },
  { label: 'Decoración', value: 'decoracion' },
  { label: 'Gastronomía', value: 'gastronomia' },
  { label: 'Joyería', value: 'joyeria' },
  { label: 'Madera', value: 'madera' },
  { label: 'Metalmecánica', value: 'metalm' },
  { label: 'Textil confecciones', value: 'textil' }
];

const handleSelectOptions = (name) => {
  if (name === 'economicSector') {
    return sectorEconomico;
  }
  if (name === 'isGremio') {
    return sino;
  }
  if (name === 'pointSale') {
    return sino;
  }
}

const mype = ref({
  ruc: {
    type: 'iSearch',
    label: 'NÚMERO DE RUC',
    name: 'ruc',
    required: true,
    message: 'Escribir RUC',
    disabled: true,
    max: 11
  },
  space1: {
    type: 'space1'
  },
  space2: {
    type: 'space2'
  },
  comercialName: {
    type: 'iText',
    label: 'NOMBRE COMERCIAL',
    name: 'comercialName',
    required: true,
    message: 'Escribir el nombre comercial',
    disabled: true,
    max: 100
  },
  socialReason: {
    type: 'iText',
    label: 'RAZÓN SOCIAL',
    name: 'socialReason',
    required: true,
    message: 'Escribir la razón social',
    disabled: true,
    max: 100
  },
  space3: {
    type: 'space3'
  },
  city_id: {
    type: 'iSelectWrite',
    label: 'REGIÓN DE LA EMPRESA',
    name: 'city_id',
    required: true,
    message: 'Seleccionar región',
    disabled: true
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'PROVINCIA DE LA EMPRESA',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: true
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'DISTRITO DE LA EMPRESA',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: false
  },
  address: {
    type: 'iText',
    label: 'DIRECCIÓN DE LA EMPRESA',
    name: 'address',
    required: true,
    message: 'Escribir la dirección',
    disabled: true,
    max: 100
  },
  // economicSector: {
  //   type: 'iSelect',
  //   label: 'SECTOR ECONÓMICO',
  //   name: 'economicSector',
  //   required: true,
  //   message: 'Seleccionar sector económico',
  //   disabled: true
  // },

  businessSector: {
    type: 'iSelectWrite',
    label: 'RUBRO DEL NEGOCIO',
    name: 'businessSector',
    required: true,
    message: 'Seleccionar rubro del negocio',
    disabled: true,
    max: 11
  },
  space8: {
    type: 'space8'
  },
  percentageOwnPlan: {
    type: 'iNumber',
    label: 'Porcentaje de su producción en Planta propia',
    name: 'percentageOwnPlan',
    required: true,
    message: 'Porcentaje de producción',
    disabled: true,
    max: 100
  },
  percentageMaquila: {
    type: 'iNumber',
    label: 'Porcentaje de su Producción en MAQUILA',
    name: 'percentageMaquila',
    required: true,
    message: 'Porcentaje de producción',
    disabled: true,
    max: 100
  },
  capacityProdMounth: {
    type: 'iNumber',
    label: 'Capacidad de Producción Mensual',
    name: 'capacityProdMounth',
    required: true,
    message: 'Capacidad de Producción Mensual',
    disabled: true,
    max: 2000000
  },
  isGremio: {
    type: 'iSelect',
    label: '¿Pertenece a algún gremio empresarial?',
    name: 'isGremio',
    required: true,
    message: 'Pertenece a un gremio empresarial',
    disabled: true,
  },
  nameGremio: {
    type: 'iText',
    label: 'NOMBRE GREMIO',
    name: 'nameGremio',
    required: false,
    message: 'Escribir nombre del gremio',
    disabled: false,
    display: 'none'
  },
  space6: {
    type: 'space6'
  },
  pointSale: {
    type: 'iSelect',
    label: '¿Cuenta con puntos de venta?',
    name: 'pointSale',
    required: true,
    message: 'Cuenta con puntos de venta',
    disabled: true,
  },
  numberPointSale: {
    type: 'iNumber',
    label: '¿Cuántos puntos de venta?',
    name: 'numberPointSale',
    required: false,
    message: '¿Cuántos puntos de venta?',
    disabled: false,
    max: 1000,
    display: 'none'
  },
  space4: {
    type: 'space4'
  },
  web: {
    type: 'iLink',
    label: 'LINK DE PÁGINA WEB',
    name: 'web',
    required: false,
    message: 'Link de Página web',
    disabled: true,
    isLink: true
  },
  facebook: {
    type: 'iLink',
    label: 'LINK DE PÁGINA DE FACEBOOK',
    name: 'facebook',
    required: false,
    message: 'Link de Página de Facebook',
    disabled: true,
    isLink: true
  },
  instagram: {
    type: 'iLink',
    label: 'LINK DE INSTAGRAM',
    name: 'instagram',
    required: false,
    message: 'Link de Página de Instagram',
    disabled: true,
    isLink: true
  },
  description: {
    type: 'iTextarea',
    label: 'BREVE EXPLICACIÓN DEL NEGOCIO (aspectos resaltantes, productos, valor diferencial)',
    name: 'description',
    required: false,
    message: 'Escribir la descripción',
    max: 200,
    disabled: true
  },

  files: {
    filePDF: {
      type: 'iFile',
      label: 'Adjuntar reporte tributario',
      name: 'filePDF',
      required: true,
      message: 'Adjuntar Reporte',
      disabled: true,
      span: 'Reporte Tributario PDF'
    },
    logo: {
      type: 'iFile',
      label: 'LOGO DE LA EMPRESA (OPCIONAL)',
      name: 'logo',
      required: false,
      message: 'Logo',
      disabled: true,
      span: 'Logo de la Empresa'
    }
  },
  space7: {
    type: 'space7'
  },
  fileImgs: {
    type: 'iFileImg',
    label: 'CARGAR IMAGENES DE TUS PRODUCTOS (Max 3 productos)',
    name: 'fileImgs',
    required: false,
    message: 'Adjuntar Reporte',
    disabled: true
  }
});

const validateURL = (rule, value) => {
  return new Promise((resolve, reject) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-z0-9-]+\.)+[a-z]{2,}([\/\w \.-]*)*\/?$/i;

    if (!value) {
      resolve(); // If the field is empty, validation passes
    } else if (!urlPattern.test(value)) {
      reject(new Error('Por favor, introduce una URL válida.')); // Reject if invalid
    } else {
      resolve(); // The URL is valid
    }
  });
};



const handleSearchRUC = async () => {

  const ruc = formState.ruc;
  const isValid = /^\d{11}$/.test(ruc) && /^(10|15|20)/.test(ruc);

  const fieldsToToggle = [
    'comercialName',
    'socialReason',
    'city_id',
    'address',
    'businessSector',
    'percentageOwnPlan',
    'percentageMaquila',
    'capacityProdMounth',
    'isGremio',
    'pointSale',
    'web',
    'facebook',
    'instagram',
    'description'
  ];

  const toggleFields = (disabled) => {
    fieldsToToggle.forEach(field => {
      mype.value[field].disabled = disabled;
    });
  };

  if (!isValid) {
    console.error('El RUC debe tener 11 caracteres, comenzar con 11, 15 o 20, y contener solo números.');
    toggleFields(true);
  } else {

    try {

      const response = await makeRequest({ url: `mype/search-api/${formState.ruc}`, method: 'GET' });

      if (response.status == 200) {
        formState.address = response.data.address;
        formState.comercialName = response.data.comercialName;
        formState.description = response.data.description;
        formState.facebook = response.data.facebook;
        formState.instagram = response.data.instagram;
        formState.web = response.data.web;
        formState.socialReason = response.data.socialReason;
      }

    } catch (error) {
      console.error('Error de red:', error);
    } finally {
      toggleFields(false);
    }

  }
};

const validateTrim = (field) => {
  const trimmedValue = formState[field] ? formState[field].trim() : '';
  formState[field] = trimmedValue;
};
const handleChangeEvent = (name) => {
  if (name == 'isGremio') {
    if (formState.isGremio == 'si') {
      mype.value.nameGremio.display = 'block';
      mype.value.nameGremio.required = true;
    } else {
      mype.value.nameGremio.display = 'none';
      mype.value.nameGremio.required = false;
    }
  }
  if (name == 'pointSale') {
    if (formState.pointSale == 'si') {
      mype.value.numberPointSale.display = 'block';
      mype.value.numberPointSale.required = true;
    } else {
      mype.value.numberPointSale.display = 'none';
      mype.value.numberPointSale.required = false;
    }
  }
};

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id)
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}

const onFinishFailed = () => {
  window.scrollTo({ top: document.documentElement.scrollHeight / 4, behavior: 'smooth' });
}

const onSubmit = async () => {
  const payload = {
    ruc: formState.ruc,
    comercialName: formState.comercialName,
    socialReason: formState.socialReason,
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    address: formState.address,
    businessSector: formState.businessSector,
    percentageOwnPlan: formState.percentageOwnPlan,
    percentageMaquila: formState.percentageMaquila,
    capacityProdMounth: formState.capacityProdMounth,
    isGremio: formState.isGremio,
    nameGremio: formState.isGremio == 'si' ? formState.nameGremio : null,
    pointSale: formState.pointSale,
    numberPointSale: formState.pointSale == 'si' ? formState.numberPointSale : null,
    web: formState.web,
    facebook: formState.facebook,
    instagram: formState.instagram,
    description: formState.description,
    filePDF: formState.filePDF,
    logo: formState.logo,
    img1: formState.img1,
    img2: formState.img2,
    img3: formState.img3
  };

  loading.value = true;

  try {
    const response = await axios.post(`${apiUrl}fair/first-or-new`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.data.status == 200) {
      emit('nextStep', response.data.id_mype);
    }

    console.log("Success", response);

  } catch (error) {
    message.error("Error al subir");
  } finally {
    loading.value = false;
  }

};

// START archivos ***
const maxFiles = 1;
const fileList = ref([]);
const fileListLogo = ref([]);

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const beforeUpload = (file, name) => {

  if (name == 'logo') {
    if (fileListLogo.value.length >= maxFiles) {
      message.error('Solo puedes cargar un archivo, elimina el que está cargado');
      return false;
    }
  }
  if (name == 'filePDF') {
    if (fileList.value.length >= maxFiles) {
      message.error('Solo puedes cargar un archivo, elimina el que está cargado');
      return false;
    }
  }

  const isPDF = name === 'filePDF' && file.type === 'application/pdf';
  const isImage = name === 'logo' && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');

  if (!isPDF && !isImage) {
    message.error('Formato de archivo no permitido');
    return false;
  }

  formState[name] = file;

  if (name == 'logo') {
    fileListLogo.value.push({
      uid: file.uid,
      name: file.name,
      status: 'done',
    });
  }

  if (name == 'filePDF') {
    fileList.value.push({
      uid: file.uid,
      name: file.name,
      status: 'done',
    });
  }

  return false;
};

const handleRemove = (file, name) => {

  if (name == 'filePDF') {
    const index = fileList.value.findIndex(item => item.uid === file.uid);
    formState[name] = null;
    fileList.value.splice(index, 1);
  }
  if (name == 'logo') {
    const index = fileListLogo.value.findIndex(item => item.uid === file.uid);
    formState[name] = null;
    fileListLogo.value.splice(index, 1);
  }
};
// END archivos ***



// ---------  INICIO CARGAR IMAGEN 
const fileListImgs = ref([]);

const maxFilesImg = 3;
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

const handlePreview = async (file) => {
  console.log("Preview", file);

  if (file.url) {
    previewImage.value = file.url;
  }

  else if (file.originFileObj) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file.originFileObj); // Convierte el archivo a base64 para vista previa
  }
  else if (file.thumbUrl) {
    previewImage.value = file.thumbUrl;
  }
  else {
    console.error("No se pudo obtener una imagen válida para la vista previa.");
    return;
  }
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};


const handleRemoveImage = (file) => {
  const index = fileListImgs.value.findIndex(item => item.uid === file.uid);
  if (index === 0) {
    formState.img1 = null;
  } else if (index === 1) {
    formState.img2 = null;
  } else if (index === 2) {
    formState.img3 = null;
  }
  fileListImgs.value.splice(index, 1);
}

const handleBeforeUpload = (file) => {
  if (fileListImgs.value.length >= maxFilesImg) {
    message.error('Solo puedes cargar un máximo de 3 imágenes');
    return false;
  }

  if (!formState.img1) {
    formState.img1 = file;
  } else if (!formState.img2) {
    formState.img2 = file;
  } else if (!formState.img3) {
    formState.img3 = file;
  }

  fileListImgs.value.push({
    uid: file.uid,
    name: file.name,
    status: 'done',
  });

  return false;
};
// FIN CARGAR IMAGEN

</script>

<style lang="scss">
.fair-btn {
  margin: 1.5rem auto;
  background-color: var(--secondary);
  padding: 1.3rem 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 15px;

  &:hover {
    background-color: #cd0805 !important;
  }
}

.fair-form {
  margin-top: 2rem;
}

@media screen and (min-width: 900px) {
  .fair-form {
    display: grid;
    grid-gap: 0 2rem;
    grid-template-columns: 1fr 1fr 1fr;

    .ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .ant-form-item:nth-child(25) {
      grid-column: 1/4;
    }

    .ant-form-item:nth-child(26) {
      background-color: red;
      border: 3px solid red;
    }
  }
}
</style>