<template>
  <div>
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

      <div class="grid-mype">
        <template v-for="(el, idx) in fields" :key="idx">
          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>

    </a-form>

  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, reactive } from 'vue';
import fields from '@/forms/actualizarMype.js';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';

const props = defineProps({
  info: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['closeDraw']);

const loading = ref(false);
const formState = reactive({});

function handleSetInfo(info) {
  formState.ruc = info.ruc;
  formState.razonSocial = info.razonSocial;
  formState.actividadEconomica = info.actividadEconomica;
  formState.departamento = info.departamento;
  formState.provincia = info.provincia;
  formState.distrito = info.distrito;
  formState.direccion = info.direccion;
}

const onSubmit = async() => {
  loading.value = true;
  
  const payload = {
    ruc: formState.ruc,
    razonSocial: formState.razonSocial,
    actividadEconomica: formState.actividadEconomica,
    departamento: formState.departamento,
    provincia: formState.provincia,
    distrito: formState.distrito,
    direccion: formState.direccion,
  }

  try {
    const data = await makeRequest({ url: `mype/update-by-ruc/${props.info.id}`, method: 'PUT', data: payload });
    if(data.status == 200) {
      message.success(data.message);
      emit('closeDraw');
    } 
  } catch (error) {
    console.log("Failed to update record");
  } finally {
    loading.value = false;
  }

}

onMounted(() => {
  if (props.info) {
    handleSetInfo(props.info);
  }
});

watch(() => props.info, (newValue) => {
  if (newValue) {
    handleSetInfo(newValue);
  }
});

</script>

<style lang="scss" scoped>
.grid-mype {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;
}
</style>