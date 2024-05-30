<template>
  <div>
    <div class="acciones" v-for="(item, idx) in stateData" :key="idx">
      <div class="accion-icons">
        <EditOutlined class="pointer ico-acc" @click="handleEdit(item)" />
        <SaveOutlined class="pointer ico-save" v-if="active === item.id" @click="handleSave(item)" />
        <DeleteOutlined class="pointer ico-acc" />
      </div>
      <div v-if="active === item.id">
        <a-textarea v-model:value="editedDescription" @input="autoResize" id="auto-resize" />
      </div>
      <p v-else>{{ item.description }}</p>
    </div>

    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
      <a-form-item name="description" label="Descripción" :rules="[{ required: true, message: 'Escribir la descripción' }]">
        <a-textarea v-model:value="formState.description" :maxlength="250" :rows="4" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
  </div>
  <pre>::: {{ idConvenio }}</pre>
</template>

<script setup>
import { ref, reactive, nextTick, watch } from 'vue';
import { EditOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';

const props = defineProps(['idConvenio']);
const emit = defineEmits(['closeDraw']);

const stateData = ref([
  {
    id: 1,
    description: 'Lorem'
  },
  {
    id: 2,
    description: 'Lorem  alias autem velit. A obcaecati incidunt vitae. Vero veniam reiciendis quis eveniet.'
  },
  {
    id: 3,
    description: 'Lorem  alias autem velit. A obcaecati incidunt vitae. Vero veniam reiciendis quis eveniet.'
  }
]);

const active = ref(null);
const editedDescription = ref('');
const loading = ref(false);
const textarea = ref(null);

const formState = reactive({
  description: null
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
}

function handleDelete(item) {
  stateData.value = stateData.value.filter(i => i.id !== item.id);
}

const onSubmit = async() => {
  try {
    const payload = {
      description: formState.description,
      agreements_id: props.idConvenio
    }
    const data = await makeRequest({ url: `agreement/create-acction`, method: 'POST', data: payload });
    if (data.status == 200) {
      message.success(data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};

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
  margin-bottom: 1.5rem;
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