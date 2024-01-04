<template>
  <h3>REGISTRO DE USUARIOS</h3>
  <!-- <span>Formulario para el registro de usuarios:</span> -->
  <a-divider />

  <div class="user">

    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'documentType'" v-model:value="formState[el.name]" :options="typeDocuments" />
            <a-select v-if="el.name == 'gender'" v-model:value="formState[el.name]" :options="geners" />
            <a-select v-if="el.name == 'isDisabled'" v-model:value="formState[el.name]" :options="disabilities" />
            <a-select v-if="el.name == 'officeCode'" v-model:value="formState[el.name]" :options="offices" />
            <a-select v-if="el.name == 'sedeCode'" v-model:value="formState[el.name]" :options="sedes" />
            <a-select v-if="el.name == 'role'" v-model:value="formState[el.name]" :options="typeUsers" />
          </a-form-item>

          <!-- <a-form-item v-if="el.type === 'iSearch'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, len: 8 }]">
            <a-input-search v-model:value="formState[el.name]" enter-button @search="handleSearchUser"
              @input="validateNumber" />
          </a-form-item> -->

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-model:value="formState[el.name]" show-search :options="countries" :filter-option="filterOption" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker :locale="locale" v-model:value="formState.birthdate" style="width: 100%;" :format="dateFormat" />
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">Registrar usuario</a-button>
      </a-form-item>
    </a-form>


    <section class="roles">
      <div>
        <a-checkbox v-model:checked="userViews.rutaDigital">Ruta Digital</a-checkbox>
        <a-select v-model:value="userRoles.rutaDigital" mode="multiple" style="width: 100%"
          placeholder="Agrega vistas para este usuario" @change="handleChange('rutaDigital')" :options="rutaDigital" />
      </div>
      <br>
      <div>
        <a-checkbox v-model:checked="userViews.usuarios">Usuarios</a-checkbox>
        <a-select v-model:value="userRoles.usuarios" mode="multiple" style="width: 100%"
          placeholder="Agrega vistas para este usuario" @change="handleChange('usuarios')" :options="usuarios" />
      </div>
      <br>
    </section>
  </div>
</template>

<script setup>
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

import { makeRequest } from '@/utils/api.js'
import { requestNoToken } from '@/utils/noToken.js'
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import fields from '@/forms/nuevoUsuario.js'
import { typeDocuments, geners, disabilities, typeUsers, offices } from '@/utils/selects.js'
import { usuarios, rutaDigital } from '@/utils/permissions.js'
import { userId } from '@/utils/cookies.js'

const loading = ref(!true);
const countries = ref([]);
const sedes = ref([]);
const router = useRouter();
const dateFormat = 'YYYY-MM-DD';

const formState = reactive({
  nickName: null,
  password: null,
  documentType: 1,
  documentNumber: null,
  middleName: null,
  name: null,
  countryCode: 173,
  birthdate: ref(dayjs('2000-01-01T05:00:00.000Z', dateFormat)),
  gender: null,
  isDisabled: null,
  email: null,
  phoneNumber: null,
  role: null,
  officeCode: null,
  sedeCode: 1,
  _id: userId
});

const clearFields = () => {
  formState.nickName = ''
  formState.password = ''
  formState.documentType = 1
  formState.documentNumber = ''
  formState.lastName = ''
  formState.middleName = ''
  formState.name = ''
  formState.countryCode = 173
  formState.birthdate = null
  formState.gender = ''
  formState.isDisabled = null
  formState.email = ''
  formState.phoneNumber = ''
  formState.role = null
  formState.officeCode = null
  formState.sedeCode = null,
  userRoles.usuarios = [],
  userRoles.rutaDigital = [],
  userViews.rutaDigital = false,
  userViews.usuarios = false
}

const userRoles = reactive({
  usuarios: [],
  rutaDigital: []
});
const userViews = reactive({
  rutaDigital: false,
  usuarios: false,
});

const handleChange = value => {
  if (userRoles[value].length > 0) {
    userViews[value] = true
  } else {
    userViews[value] = false
  }
};

const convertirAMinusculasConGuiones = (objeto) => {
  if (typeof objeto === 'string') {
    return objeto.toLowerCase().replace(/\s+/g, '-');
  } else if (Array.isArray(objeto)) {
    return objeto.map(convertirAMinusculasConGuiones);
  } else if (typeof objeto === 'object') {
    const resultado = {};
    for (const clave in objeto) {
      // eslint-disable-next-line no-prototype-builtins
      if (objeto.hasOwnProperty(clave)) {
        resultado[clave] = convertirAMinusculasConGuiones(objeto[clave]);
      }
    }
    return resultado;
  } else {
    return objeto;
  }
}
const objectToArray = (obj) => {
  const newArray = Object.keys(obj)
    .filter(key => obj[key] === true)
    .map(key => (key === "rutaDigital" ? "ruta-digital" : key));    //añadir***
  return newArray;
}

const handleAsignedViews = async(idPermission) => {
  let principal = objectToArray(userViews);
  let data = convertirAMinusculasConGuiones(userRoles)
  const arrays = [data.usuarios, data.rutaDigital];       //añadir***

  const allPermisions = [].concat(...principal, ...arrays);

  const payload = {
    _id: idPermission,
    created: userId,
    views: allPermisions,
    exclusions: null
  }

  try {
    const data = await makeRequest({ url: '/permission', method: 'POST', data: payload });
    clearFields()
    console.log(data);
    if(data) message.success("Usuario registrado con éxito")
  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
}

const onSubmit = async () => {
  const payload = formState
  loading.value = true
  try {
    const data = await makeRequest({ url: '/register', method: 'POST', data: payload });
    handleAsignedViews(data.data)
    console.log("eeeee", data.data);
    // router.push('/admin/ruta-digital/talleres');
  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};


const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};

// const handleSearchUser = async searchValue => {
//   if (!formState.documentType) return message.error('Selecciona el tipo de documento');
//   if (!searchValue) return message.error('El campo número de documento esta vacío');
//   console.log(typeof (searchValue))
// };
// const validateNumber = () => {
//   formState.documentNumber = formState.documentNumber.replace(/\D/g, '');
// };

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const fetchDataCountries = async () => {
  try {
    const { data } = await requestNoToken({ url: '/countries', method: 'GET' });
    countries.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const fetchDataSedes = async () => {
  try {
    const { data } = await makeRequest({ url: '/sedes', method: 'GET' });
    sedes.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(() => {
  fetchDataCountries(),
  fetchDataSedes()
});

</script>

<style lang="scss" scoped>
.user {
  display: grid;
  grid-template-columns: 52% 42%;
  grid-gap: 5%;
}

.grid-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 1rem;
}

.item-max {
  width: 100%;
  min-width: 100px;
}

.roles {
  .title {
    // color: #1677ff;
    margin-bottom: .3rem;
    display: block;
  }
}
</style>