<template>
  <div class="wrapper-booking">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in final" :key="idx">

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max, min: el.min }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled" :maxlength="9">
              <template #prefix>
                <span v-show="isTwenty" class="emp-20">20</span>
              </template>
            </a-input>
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
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';
import { final } from '@/forms/asesorias.js'

const props = defineProps(['itemSelectedF20']);
const emit = defineEmits(['closeDraw']);

const loading = ref(false);
const isTwenty = ref(true);

const formState = reactive({
  task: 3,
  ruc: null
});

const onSubmit = async () => {
  loading.value = true;
  formState.mype_id = props.itemSelectedF20.mype.id;
  try {
    const response = await makeRequest({ url: `formalization/ruc20-step3/${props.itemSelectedF20.codesunarp}`, method: 'POST', data: formState});
    if (response.status === 200) {
      message.success(response.message);
   
      formState.ruc = null;
    
      emit('closeDraw', true)

    }
  } catch (error) {
    console.log("Error: " + error);
  } finally {
    loading.value = false;
  }
}
const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};
</script>

<style scoped lang="scss">
.wrapper-booking {
  max-width: 250px;
  margin-top: 2rem;
  h3 {
    margin-bottom: 2rem;
  }
  .emp-20 {
    color: #1677ff;
    font-weight: 600;
  }
}
</style>