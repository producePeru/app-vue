<template>
  

  <a-spin :spinning="spinning">
    <a-checkbox-group v-model:value="state.checkedList" :options="plainOptions" class="views-list" />
  </a-spin>

  <br><br>

  <a-button type="primary" html-type="submit" :loading="loading" @click="onSubmit">GUARDAR</a-button>

  <!-- <pre>::::- {{ props.idUser }}</pre> -->
</template>

<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js'
import { message } from 'ant-design-vue';

const props = defineProps(['idUser']);
const emit = defineEmits(['closeDraw']);

const spinning = ref(true);
const loading = ref(false);
// const plainOptions = [
//   'home',
//   'asesorias',
//   'planes-accion',
//   'asesorias-formalizaciones',
//   'solicitudes',
//   'solicitantes',
//   'notarias',
//   'asesores',
//   'supervisores',
//   'usuarios',
//   'usuarios-nuevo',
//   'usuarios-lista',
//   'asesor-externo-notario',

//   'drive-mis-archivos',
//   'drive-subir-archivo',
//   'drive-mis-carpetas',

//   'convenios',
//   'estado-convenio',

//   'configuraciones',
//   'tokens'
// ];
const plainOptions = [
  { label: 'Inicio', value: 'inicio' },
  
  { label: 'Drive Principal', value: 'drive' },
  { label: 'Drive Carpetas', value: 'drive-mis-carpetas' },
  { label: 'Drive Archivos', value: 'drive-mis-archivos' },
  { label: 'Drive Subir Archivo', value: 'drive-subir-archivo' },
  
  { label: 'AF - Principal', value: 'asesorias' },
  { label: 'AF - Registro', value: 'asesorias-formalizaciones' },
  { label: 'AF - Reportes', value: 'asesorias' },
  { label: 'AF - Planes de Acción', value: 'planes-accion' },
  { label: 'AF - Solicitantes', value: 'solicitantes' },
  { label: 'AF - Notarias', value: 'notarias' },
  { label: 'AF - Asesores', value: 'asesores' },

  { label: 'Convenios Principal', value: 'convenios' },
  { label: 'Convenios UGO', value: 'estado-convenio-ugo' },
  { label: 'Convenios UGSE', value: 'estado-convenio-ugse' },


  { label: 'Calendario Principal', value: 'eventos' },
  { label: 'Eventos Lista', value: 'eventos-calendario-google' },

  { label: 'Usuarios Principal', value: 'usuarios' },
  { label: 'Usuarios Registrar', value: 'usuarios-nuevo' },
  { label: 'Usuarios Externo', value: 'asesor-externo-notario' },
  { label: 'Usuarios Lista', value: 'usuarios-lista' },


  { label: 'Config. Principal', value: 'configuraciones' },
  { label: 'Config. Token API', value: 'tokens' },

];


onMounted(() => {
  if (props.idUser) {
    fetchData(props.idUser);
  }
});
const state = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: [],
});
const onCheckAllChange = e => {
  Object.assign(state, {
    checkedList: e.target.checked ? plainOptions : [],
    indeterminate: false,
  });
};

watch(
  () => state.checkedList,
  val => {
    state.indeterminate = !!val.length && val.length < plainOptions.length;
    state.checkAll = val.length === plainOptions.length;
  },
);

watch(() => props.idUser, (newValue) => {
  if (newValue) {
    fetchData(newValue);
  }
});

const onSubmit = async () => {
  loading.value = true;
  const payload = {
    views: state.checkedList
  }
  try {
    const data = await makeRequest({ url: `user/views/${props.idUser.id}`, method: 'PUT', data: payload });
    if(data.status == 403) return message.error(data.message);
    message.success(data.message);
    emit('closeDraw', true);
  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
}

const fetchData = async() => {
  spinning.value = true;
  try {
    const {data} = await makeRequest({ url: `user/views/${props.idUser.id}`, method: 'GET' });
    state.checkedList = data
  } catch (error) {
    console.log("Error", error);
  } finally {
    spinning.value = false;
  }
}
</script>


<style lang="scss">
.views-list {
  display: grid; 
  grid-template-columns: repeat(2,1fr); 
  gap: .5rem; 
  span {
    font-size: 13px;
  }
  label:nth-child(6),
  label:nth-child(13),
  label:nth-child(15),
  label:nth-child(19)

  {
    grid-column: 1/3;
  }
}
</style>