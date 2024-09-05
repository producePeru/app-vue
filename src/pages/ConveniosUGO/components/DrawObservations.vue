<template>
  <div>
    <a-spin :spinning="spinning">
      <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
        <a-form-item name="description" label="Orbservaciones"
          :rules="[{ required: true, message: 'Escribir la descripción' }]">
          <a-textarea v-model:value="formState.description" :rows="6" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading">ACTUALIZAR</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';

const props = defineProps(['idConvenio']);
const emit = defineEmits(['refreshTable']);

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

const onSubmit = async () => {
  loading.value = true;
  try {
    const payload = {
      observations: formState.description
    }
    const data = await makeRequest({ url: `agreement/update-values/${props.idConvenio.id}`, method: 'PUT', data: payload });
    if (data.status == 200) {
      message.success(data.message);
      emit('refreshTable', true)
      // fetchData();
      // formState.description = null;
    }
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
};
const fetchData = async () => {
  formState.description = props.idConvenio.observations
  formState.description != null && (spinning.value = false);
}
</script>


<style lang="scss">
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
    font-size: 13px
  }
}
</style>