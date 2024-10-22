<template>
  <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

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


        <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message }]">
          <a-select v-model:value="formState[el.name]" :options="handleSelectOptions(el.name)"
            :disabled="el.disabled" @change="handleChangeEvent(el.name)" />
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


    <pre>{{ formState }}</pre>

  </a-form>
</template>


<script setup>
import { ref, onUnmounted, onMounted, reactive } from 'vue';
import { useCounterStore } from '@/stores/selectes.js';
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons-vue';

const store = useCounterStore();
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.fetchCities();

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
  {label: 'Alimentos y bebidas', value: 'alimentos'},
  {label: 'Artesanía', value: 'artesania'},
  {label: 'Cosmética orgánica', value: 'cosmetica'},
  {label: 'Cuero calzado', value: 'cuero'},
  {label: 'Decoración', value: 'decoracion'},
  {label: 'Gastronomía', value: 'gastronomia'},
  {label: 'Joyería', value: 'joyeria'},
  {label: 'Madera', value: 'madera'},
  {label: 'Metalmecánica', value: 'metalm'},
  {label: 'Textil confecciones', value: 'textil'}
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
    type: 'iText',
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
    type: 'iText',
    label: 'LINK DE PÁGINA WEB',
    name: 'web',
    required: false,
    message: 'Link de Página web',
    disabled: true
  },
  facebook: {
    type: 'iText',
    label: 'LINK DE PÁGINA DE FACEBOOK',
    name: 'facebook',
    required: false,
    message: 'Link de Página de Facebook',
    disabled: true
  },
  instagram: {
    type: 'iText',
    label: 'LINK DE INSTAGRAM',
    name: 'instagram',
    required: false,
    message: 'Link de Página de Instagram',
    disabled: true
  },
  description: {
    type: 'iTextarea',
    label: 'BREVE EXPLICACIÓN DEL NEGOCIO (aspectos resaltantes, productos, valor diferencial)',
    name: 'description',
    required: false,
    message: 'Escribir la descripción',
    disabled: false,
    max: 200,
    disabled: true
  },
  filePDF: {
    type: 'iFile',
    label: 'Adjuntar reporte tributario',
    name: 'filePDF',
    required: true,
    message: 'Adjuntar Reporte',
    disabled: true
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

const handleSearchRUC = () => {
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
    toggleFields(false);
  }
};
const validateTrim = (field) => {
  const trimmedValue = formState[field] ? formState[field].trim() : '';
  formState[field] = trimmedValue;
};
const handleChangeEvent = (name) => {
  if(name == 'isGremio') {
    if(formState.isGremio == 'si') {
      mype.value.nameGremio.display = 'block';
      mype.value.nameGremio.required = true;
    } else {
      mype.value.nameGremio.display = 'none';
      mype.value.nameGremio.required = false;
    }
  }
  if(name == 'pointSale') {
    if(formState.pointSale == 'si') {
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
    img1: formState.img1,
    img2: formState.img2,
    img3: formState.img3
  }
};

// START archivos ***
const maxFiles = 1;
const fileList = ref([]);
const acceptTypes = '.pdf';

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
  if (!formState.filePDF) {
    formState.filePDF = file;
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

const handleRemove = (file) => {
  const index = fileList.value.findIndex(item => item.uid === file.uid);
  if (index === 0) {
    formState.filePDF = null;
  }
  fileList.value.splice(index, 1);
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

    .ant-form-item:nth-child(25) {
      grid-column: 1/4;
    }
  }
}
</style>