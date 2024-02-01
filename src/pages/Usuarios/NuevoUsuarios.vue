<template>
  <h3>{{ route.query.dni ? 'ACTUALIZAR' : 'REGISTRO DE' }} USUARIO</h3>

  <a-divider />

  <a-spin v-if="isloading" />

  <div v-else class="user">

    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'document_type'" v-model:value="formState[el.name]" :options="typeDocuments" :disabled="el.disabled" />
            <a-select v-if="el.name == 'gender'" v-model:value="formState[el.name]" :options="geners" />
            <a-select v-if="el.name == 'isDisabled'" v-model:value="formState[el.name]" :options="disabilities" />
            <a-select v-if="el.name == 'office_code'" v-model:value="formState[el.name]" :options="offices" />
            <a-select v-if="el.name == 'sede_code'" v-model:value="formState[el.name]" :options="sedes" />
            <a-select v-if="el.name == 'role'" v-model:value="formState[el.name]" :options="typeUsers" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSearch'" class="item-max" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, max: el.max }]">
            <a-input-search :maxlength="15" :loading="searchLoading" v-model:value="formState[el.name]"
            @search="handleSearchApi" @input="validateNumber" :disabled="upDisabled" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

          <a-form-item v-show="!route.query.dni" v-if="el.type === 'iPassword'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
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
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
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
import fields from '@/forms/nuevoUsuario.js'
import { typeDocuments, geners, disabilities, typeUsers, offices } from '@/utils/selects.js'
import { usuarios, rutaDigital } from '@/utils/permissions.js'
import { userId } from '@/utils/cookies.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isloading = ref(true);
const loading = ref(!true);
const countries = ref([]);
const sedes = ref([]);
const dateFormat = 'YYYY-MM-DD';
const searchLoading = ref(false);
const upDisabled = ref(false);

const formState = reactive({
  nick_name: null,
  birthdate: null,
  gender: null,
  is_disabled: 0,
  phone_number: null,
  document_type: 1,
  document_number: null,
  last_name: null,
  middle_name: null,
  name: null,
  country_code: 173,
  email: null,
  password: null,
  office_code: null,
  sede_code: 1,
  role: null,
  created_by: userId,
  updated_by: userId
});

const clearFields = () => {
  formState.document_type = null
  formState.document_number = null
  formState.last_name = null
  formState.middle_name = null
  formState.name = null
  formState.country_code = null
  formState.email = null
  formState.office_code = null
  formState.sede_code = null
  formState.role = null
  formState.password = null
  formState.gender = null
}

const userRoles = ref({
  usuarios: [],
  rutaDigital: []
});
const userViews = ref({
  rutaDigital: false,
  usuarios: false,
});

const handleChange = value => {
  if (userRoles.value[value].length > 0) {
    userViews.value[value] = true
  } else {
    userViews.value[value] = false
  }
};

// const convertirAMinusculasConGuiones = (objeto) => {
//   if (typeof objeto === 'string') {
//     return objeto.toLowerCase().replace(/\s+/g, '-');
//   } else if (Array.isArray(objeto)) {
//     return objeto.map(convertirAMinusculasConGuiones);
//   } else if (typeof objeto === 'object') {
//     const resultado = {};
//     for (const clave in objeto) {
//       // eslint-disable-next-line no-prototype-builtins
//       if (objeto.hasOwnProperty(clave)) {
//         resultado[clave] = convertirAMinusculasConGuiones(objeto[clave]);
//       }
//     }
//     return resultado;
//   } else {
//     return objeto;
//   }
// }
// const objectToArray = (obj) => {
//   const newArray = Object.keys(obj)
//     .filter(key => obj[key] === true)
//     .map(key => (key === "rutaDigital" ? "ruta-digital" : key));    //añadir***
//   return newArray;
// }

const handleAsignedViews = async(idUser) => {

  const views = Object.fromEntries(
    Object.entries(userRoles.value).filter(([key, value]) => value.length > 0)
  );

  const payload = {
    id_user: idUser,
    created_by: userId,
    views: views,
    exclusions: null
  }

  try {
    const data = await makeRequest({ url: '/permission', method: 'POST', data: payload });

    message.success(data.message);
    router.push('/admin/usuarios/lista');

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
    const data = await makeRequest({ url: '/register-user', method: 'POST', data: payload });
    
    await handleAsignedViews(data.user_id)

  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};


const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};

const handleSearchApi = async searchValue => {
  console.log("Hello", searchValue);
  // if (!formState.documentType) return message.error('Selecciona el tipo de documento');
  // if (!searchValue) return message.error('El campo número de documento esta vacío');
  // console.log(typeof (searchValue))
};

const validateNumber = () => {
  formState.document_number = formState.document_number.replace(/\D/g, '');
};

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

const fetchData = async () => {
  if(route.query.dni) {
    try {
      const { data } = await makeRequest({ url: `user/${route.query.dni}`, method: 'GET' });
      
      formState.document_type = data.document_type;
      formState.document_number = data.document_number
      upDisabled.value = true
      formState.last_name = data.last_name
      formState.middle_name = data.middle_name
      formState.name = data.name
      formState.country_code = data.country_code
      formState.email = data.email
      formState.office_code = data.office_code
      formState.sede_code = data.sede_code
      formState.role = data.role
      formState.gender = data.gender
      formState.birthdate = data.birthdate
      formState.phone_number = data.phone_number

      userRoles.value = data.permission

      isloading.value = false

      if(data.permission.length > 1) {
        if(userRoles.value.usuarios.length >= 1) userViews.value.usuarios = true
        if(userRoles.value.rutaDigital.length >= 1) userViews.value.rutaDigital = true
      }


    } catch (error) {
      console.error('Error de red:', error);
    }

    return console.log("actualizar usuario")
  }
  console.log("crear usuario");
  isloading.value = false
}

onMounted(() => {
  fetchDataCountries(),
  fetchDataSedes(),
  fetchData()
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