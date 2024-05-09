<template>
  <a-drawer v-model:open="open" title="Seleccionar usuarios" placement="right" @close="handleCloseDrawer">
    <div>
      <a-checkbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate" @change="onCheckAllChange">
        <b>Seleccionar todos</b>
      </a-checkbox>
    </div>

    <br>

    <a-spin :spinning="spinning">
      <a-checkbox-group v-model:value="state.checkedList" :options="plainOptions" class="vertical-options" />
    </a-spin>

    <br>
    <br>
  
    <a-button class="btn-produce" type="primary" :loading="loading" @click="onSubmit">GUARDAR</a-button>

  </a-drawer>
</template>

<script setup>
import { ref, reactive, watch, onMounted, defineProps } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';

const props = defineProps(['idFile', 'selectedUsers']);
const emit = defineEmits(['handleCloseDrawer']);
const storageProfile = JSON.parse(localStorage.getItem('profile'))

const spinning = ref(false);
const open = ref(true)
const plainOptions = ref([]);
const loading = ref(false);

const state = reactive({
  indeterminate: false,
  checkAll: false,
  checkedList: props.selectedUsers
});
const onCheckAllChange = e => {
  Object.assign(state, {
    checkedList: e.target.checked ? plainOptions.value.map(option => option.value) : [],
    indeterminate: false,
  });
};


const handleCloseDrawer = () => {
  state.checkedList = [];
  open.value = false;
  emit('handleCloseDrawer');
}


watch(
  () => state.checkedList,
  (val) => {
    if (val.length === 0) {
      console.log("state.checkedList está vacío");
    }
    state.indeterminate = !!val.length && val.length < plainOptions.value.length;
    state.checkAll = val.length === plainOptions.value.length;
  }
);
const onSubmit = async () => {
  loading.value = true;
  const payload = {
    drive_id: props.idFile,
    user_ids: state.checkedList
  }
  try {
    const data = await makeRequest({ url: `drive/visible-users`, method: 'PUT', data: payload });
    if (data.status == 200) message.success(data.message);
    handleCloseDrawer()
  } catch (error) {
    message.error('No tienes permisos');
  } finally {
    loading.value = false;
  }
};

const fetchData = async () => {
  spinning.value = true;
  try {
    const data = await makeRequest({ url: 'drive/users', method: 'GET' });
    plainOptions.value = data.filter(item => item.value !== storageProfile.user_id);
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false;
  }
}
onMounted(() => {
  fetchData();
});
</script>


<style scoped>
.vertical-options {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  text-transform: uppercase;
}
</style>
