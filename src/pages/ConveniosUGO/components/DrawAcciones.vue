<template>
  <div>
    <a-spin :spinning="spinning">
      <div class="acciones" v-for="(item, idx) in stateData" :key="idx">
        <div class="accion-icons">
          <EditOutlined class="pointer ico-acc" @click="handleEdit(item)" />
          <SaveOutlined class="pointer ico-save" v-if="active === item.id" @click="handleSave(item)" />
          <DeleteOutlined class="pointer ico-acc" @click="handleDelete(item)" />
        </div>
        <div v-if="active === item.id">
          <a-textarea v-model:value="editedDescription" @input="autoResize" id="auto-resize" />
        </div>
        <p v-else>{{ item.description }}</p>
      </div>
    </a-spin>
    
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
      <a-form-item name="description" label="Registra una acción" :rules="[{ required: true, message: 'Escribir la descripción' }]">
        <a-textarea v-model:value="formState.description" :maxlength="250" :rows="4" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">CREAR</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, watch, onMounted } from 'vue';
import { EditOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';

const props = defineProps(['idConvenio']);
const emit = defineEmits(['closeDraw']);

const stateData = ref([]);
const spinning = ref(true);
const active = ref(null);
const editedDescription = ref('');
const loading = ref(false);
const textarea = ref(null);

const formState = reactive({
  description: null
});

onMounted(() => {
  if (props.idConvenio) {
    fetchData(props.idConvenio);
  }
});

watch(() => props.idConvenio, (newValue) => {
  if (newValue) {
    fetchData(newValue);
  }
});

function handleEdit(item) {
  active.value = item.id;
  editedDescription.value = item.description;
  nextTick(() => {
    autoResize();
  });
}

function handleSave(item) {
  const index = stateData.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    stateData.value[index].description = editedDescription.value;
  }
  active.value = null;
  handleUpdateAction(item.id)
}

const handleDelete = async (val) => {
  try {
    const data = await makeRequest({ url: `agreement/delete-acction/${val.id}`, method: 'DELETE' });
    if (data.status == 200) {
      fetchData();
      message.success(data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const handleUpdateAction = async(id) => {
  try {
    const payload = {
      description: editedDescription.value
    }
    const data = await makeRequest({ url: `agreement/update/${id}`, method: 'PUT', data: payload });
    if (data.status == 200) {
      message.success(data.message);
      fetchData();
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
const onSubmit = async() => {
  try {
    const payload = {
      description: formState.description,
      agreements_id: props.idConvenio
    }
    const data = await makeRequest({ url: `agreement/create-acction`, method: 'POST', data: payload });
    if (data.status == 200) {
      message.success(data.message);
      // emit('closeDraw', true)
      fetchData();
      formState.description = null;
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
const fetchData = async() => {
  spinning.value = true;
  try {
    const data = await makeRequest({ url: `agreement/list/${props.idConvenio}`, method: 'GET' });
    if (data.status == 200) {
      stateData.value = data.data;
      console.log("Success", data);
    }
  } catch (error) {
    
  } finally {
    spinning.value = false;
  }
}
const autoResize = () => {
  nextTick(() => {
    const textarea = document.getElementById('auto-resize');
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });
};


</script>


<style lang="scss">
textarea {
    width: 100%;
    resize: none; /* Evita que el usuario redimensione manualmente */
    overflow: hidden; /* Oculta el scroll cuando no es necesario */
  }


.acciones {
  border: 1px solid #dddddd;
  padding: 1rem;
  border-radius: 4px;
  position: relative;
  margin-bottom: .8rem;
  .accion-icons {
    position: absolute;
    right: .5rem;
    top: -.5rem;
    background: #fff;
    display: flex;
    gap: .8rem;
    padding: 0 .5rem;
    .ico-save {
      color: var(--primary);
    }
    .ico-acc {
      opacity: .3;
      &:hover {
        color: var(--secondary);
        opacity: 1;
      }
    }
  }
  p {
    margin: 0;
  }
}
</style>