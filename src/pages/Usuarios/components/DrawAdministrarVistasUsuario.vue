<template>
  <div>
    <a-checkbox
      v-model:checked="state.checkAll"
      :indeterminate="state.indeterminate"
      @change="onCheckAllChange">
      {{ state.checkAll ? 'Desactivar' : 'Activar' }} todos
    </a-checkbox>
  </div>
  <a-divider />
  <a-checkbox-group v-model:value="state.checkedList" :options="plainOptions" style="display: grid; grid-template-columns: repeat(2,1fr); gap: .5rem;" />

  <br>
  <br>
  <a-button type="primary" html-type="submit" :loading="loading" @click="onSubmit">GUARDAR</a-button>

  <!-- <pre>::::- {{ props.idUser }}</pre> -->
</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { reactive, watch, ref } from 'vue';
import { message } from 'ant-design-vue';

const props = defineProps(['idUser']);
const emit = defineEmits(['closeDraw']);

const loading = ref(false);
const plainOptions = [
  'home',
  'asesorias',
  'asesorias-formalizaciones',
  'solicitudes',
  'solicitantes',
  'notarias',
  'asesores',
  'supervisores',
  'usuarios',
  'usuarios-nuevo',
  'usuarios-lista',
  'drive-mis-archivos',
  'drive-subir-archivo',
  'drive-mis-carpetas',
];

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
</script>


