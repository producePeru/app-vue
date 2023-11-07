<template>
  <h3>Registro de Usuarios</h3>
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
            <a-select v-if="el.name == 'tipo_documento'" v-model:value="formState[el.name]" :options="typeDocuments" />
            <a-select v-if="el.name == 'genero'" v-model:value="formState[el.name]" :options="geners" />
            <a-select v-if="el.name == 'discapacidad'" v-model:value="formState[el.name]" :options="disabilities" />
            <a-select v-if="el.name == 'idOficina'" v-model:value="formState[el.name]" :options="offices"/>
            <a-select v-if="el.name == 'idSede'" v-model:value="formState[el.name]" :options="sedes" />
            <a-select v-if="el.name == 'tipo_usuario'" v-model:value="formState[el.name]" :options="typeUsers" />
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
            <a-date-picker v-model:value="formState.fecha_nacimiento" style="width: 100%;" format="YYYY-MM-DD" />
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">Registrar usuario</a-button>
      </a-form-item>
    </a-form>


    <!-- <pre>{{ formState }}</pre> -->

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

const loading = ref(!true);
const countries = ref([]);
const sedes = ref([]);


const formState = reactive({
  usuario: '',
  clave: '',
  tipo_documento: '',
  nro_documento: '',
  apellido_paterno: '',
  apellido_materno: '',
  nombres: '',
  pais: '',
  fecha_nacimiento: null,
  genero: '',
  discapacidad: null,
  correo: '',
  celular: '',
  tipo_usuario: null,
  idOficina: null,
  idSede: null,
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
  formState.usuario = ''
  formState.clave = ''
  formState.tipo_documento = ''
  formState.nro_documento = ''
  formState.apellido_paterno = ''
  formState.apellido_materno = ''
  formState.nombres = ''
  formState.pais = ''
  formState.fecha_nacimiento = null
  formState.genero = ''
  formState.discapacidad = null
  formState.correo = ''
  formState.celular = ''
  formState.tipo_usuario = null
  formState.idOficina = null
  formState.idSede = null
}

const onSubmit = async values => {
  const idUsuarioRegistrador = 1;
  const payload = {...values, idUsuarioRegistrador}
  
  loading.value = true
  try {
    const data = await makeRequest({ url: '/register-user', method: 'POST', data: payload });
    clearFields()
    message.success(data.message);
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
  if(!formState.tipo_documento) return message.error('Selecciona el tipo de documento');
  if(!searchValue) return message.error('El campo número de documento esta vacío');
 
  console.log(typeof(searchValue))

  // try {
  //   const data = { dni: formState.nro_documento, tipo_doc: formState.tipo_documento };

  //   const response = await axios.post('https://soporte-pnte.com/tuempresa/tu-empresa/consultar-dni', data);

  //   console.log(response.data); 
  // } catch (error) {
  //   console.error('Error posting data:', error);
  // }
};



const validateNumber = () => {
  formState.nro_documento = formState.nro_documento.replace(/\D/g, ''); 
};

const filterOption = (input, option) => {
  // return option.value.indexOf(input.toLowerCase()) >= 0;
};

const fetchDataCountries = async() => {
  try {
    const data = await makeRequest({ url: '/countries', method: 'GET' });
    data.map((item) => {
      const obj = { value: item.idPais, label: item.nombre }
      countries.value = [...countries.value, obj]
    })
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const fetchDataSedes = async() => {
  try {
    const data = await makeRequest({ url: '/sedes', method: 'GET' });
    data.map((item) => {
      const obj = { label: item.nombre, value: item.idSede }
      sedes.value = [...sedes.value, obj]
    })
  } catch (error) {
    console.error('Error de red:', error);
  }
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