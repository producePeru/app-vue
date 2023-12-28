<template>
  <h3>REGISTRO DE USUARIOS</h3>
  <span>Formulario para el registro de usuarios:</span>

  <a-divider />

  <div class="user">
    
    <a-form
    layout="vertical"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onSubmit"
    @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fields" :key="idx">
          
          <a-form-item 
          class="item-max"
          v-if="el.type === 'iSelect'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'documentType'" v-model:value="formState[el.name]" :options="typeDocuments" />
            <a-select v-if="el.name == 'gender'" v-model:value="formState[el.name]" :options="geners" />
            <a-select v-if="el.name == 'isDisabled'" v-model:value="formState[el.name]" :options="disabilities" />
            <a-select v-if="el.name == 'officeCode'" v-model:value="formState[el.name]" :options="offices"/>
            <a-select v-if="el.name == 'sedeCode'" v-model:value="formState[el.name]" :options="sedes" />
            <a-select v-if="el.name == 'role'" v-model:value="formState[el.name]" :options="typeUsers" />
          </a-form-item>

          <a-form-item 
          v-if="el.type === 'iSearch'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message, len: 8 }]">
            <a-input-search v-model:value="formState[el.name]" enter-button @search="handleSearchUser" @input="validateNumber"/>
          </a-form-item>

          <a-form-item
          v-if="el.type === 'iText'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

          <a-form-item
          v-if="el.type === 'iSelectWrite'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message }]">
            <a-select v-model:value="formState[el.name]" show-search :options="countries" :filter-option="filterOption" />
          </a-form-item>

          <a-form-item
          v-if="el.type === 'iDate'"
          :name="el.name" 
          :label="el.label" 
          :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker v-model:value="formState.birthdate" style="width: 100%;" />
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">Registrar usuario</a-button>
      </a-form-item>
    </a-form>


    <section>
      <div>
        <a-checkbox v-model:checked="userRoles.user">Usuarios</a-checkbox>
        <a-select
        v-model:value="userRoles.userActions"
        mode="multiple"
        style="width: 100%"
        placeholder="Agrega vistas para este usuario"
        @change="handleChange('user')"
        :options="usuarios" />
      </div>
      <br>
      <div>
        <a-checkbox v-model:checked="userRoles.digital">Ruta Digital</a-checkbox>
        <a-select
        v-model:value="userRoles.digitalActions"
        mode="multiple"
        style="width: 100%"
        placeholder="Agrega vistas para este usuario"
        @change="handleChange('digital')"
        :options="rutaDigital" />
      </div>

    </section>


    <div>
      <h1></h1>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios';
import { makeRequest } from '@/utils/api.js'
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevoUsuario.js'
import idUserStorage from '@/utils/storage'
import { useRouter } from 'vue-router';
import { requestNoToken } from '@/utils/noToken.js'

const loading = ref(!true);
const countries = ref([]);
const sedes = ref([]);
const router = useRouter();

const formState = reactive({
  nickName: '',
  password: '',
  documentType: 1,
  documentNumber: '',
  middleName: '',
  name: '',
  countryCode: 173,
  birthdate: null,
  gender: '',
  isDisabled: null,
  email: '',
  phoneNumber: '',
  role: null,
  officeCode: null,
  sedeCode: 1,
});

const typeDocuments = [
  { label: 'DNI', value: 1 },
  { label: 'CE', value: 2 },
  { label: 'PAS', value: 3 },
  { label: 'PTP', value: 4 } 
];
const geners = [
  { label: 'Masculino', value: 1 },
  { label: 'Femenino', value: 2 },
  { label: '...', value: 3 }
];
const disabilities = [
  { label: 'Si', value: 2 },
  { label: 'No', value: 1 },
];
const typeUsers = [
  { label: 'Administrador', value: '1' },
  { label: 'Usuario', value: '2' },
  { label: 'Invitado', value: '3' },
  // { label: 'Asesor empresarial', value: 4 },
  // { label: 'Capacitador', value: 5 }
]
const offices = [
  { label: 'Dirección ejecutiva', value: 1 },
  { label: 'Unidad de gestión de servicios empresariales', value: 2 },
  { label: 'Unidad de gestión de operaciones', value: 3 },
  { label: 'Unidad de gestión estratégica y entrega de resultados', value: 4 }
]

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
  formState.sedeCode = null
}




const usuarios = ref([
  {value: 'Nuevo Usuario'}, {value: 'Lista de usuarios'}
]);
const rutaDigital = ref([
  {value: 'Reportes'}, {value: 'Calendario'}, {value: 'Talleres'}, {value: 'MYPE'}, {value: 'Expositores'}
]);


const userRoles = reactive({
  user: false,
  userActions: [],
  digital: false,
  digitalActions: []
});

const handleChange = value => {
  if(!userRoles[value]) {
    userRoles[value] = true
  }
};


const onSubmit = async () => {
  const payload = formState
  loading.value = true
  try {
    const data = await makeRequest({ url: '/register', method: 'POST', data: payload });
    clearFields()
    message.success(data.message);
    router.push('/admin/ruta-digital/talleres');
  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};


const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};




const handleSearchUser = async searchValue => {
  if(!formState.documentType) return message.error('Selecciona el tipo de documento');
  if(!searchValue) return message.error('El campo número de documento esta vacío');
 
  console.log(typeof(searchValue))

  // try {
  //   const data = { dni: formState.documentNumber, tipo_doc: formState.documentType };

  //   const response = await axios.post('https://soporte-pnte.com/tuempresa/tu-empresa/consultar-dni', data);

  //   console.log(response.data); 
  // } catch (error) {
  //   console.error('Error posting data:', error);
  // }
};



const validateNumber = () => {
  formState.documentNumber = formState.documentNumber.replace(/\D/g, ''); 
};

const filterOption = (input, option) => {
  // return option.value.indexOf(input.toLowerCase()) >= 0;
};

const fetchDataCountries = async() => {
  try {
    const {data} = await requestNoToken({ url: '/countries', method: 'GET' });
    countries.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const fetchDataSedes = async() => {
  // try {
  //   const data = await makeRequest({ url: '/sedes', method: 'GET' });
  //   data.map((item) => {
  //     const obj = { label: item.nombre, value: item.sedeCode }
  //     sedes.value = [...sedes.value, obj]
  //   })
  // } catch (error) {
  //   console.error('Error de red:', error);
  // }
}

onMounted(
  fetchDataCountries(),
  fetchDataSedes()
);

</script>

<style lang="scss" scoped>
.user {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
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
</style>