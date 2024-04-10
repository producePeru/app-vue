<template>
  <div class="wrapper-booking">
    <a-spin :spinning="spinning">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in acto" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'notary_id'" v-model:value="formState[el.name]" :options="store.notaries" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

        </template>
      </div>
      <!-- <pre>{{ formState }}</pre> -->
      <div>{{ update() }}</div>

      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
    </a-spin>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { acto } from '@/forms/asesorias.js';
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';

const storageData = JSON.parse(localStorage.getItem('profile'));
const store = useCounterStore();
const props = defineProps(['info', 'itemSelectedF20']);
const emit = defineEmits(['closeDraw']);

store.$patch({ notaries: store.notaries });
store.fetchNotaries();

const spinning = ref(true);
const loading = ref(false);
const formState = reactive({
  task: 2,
  name: null,
  numbernotary: null,
  notary_id: null,
  user_id: storageData.user_id,
  userupdated_id: storageData.id
})
const update = () => {
  if(store.notaries?.length) spinning.value = false;
}

const onSubmit = async () => {
  loading.value = true;
  formState.people_id = props.info.id;
  try {
    const response = await makeRequest({ url: `formalization/ruc20-step2/${props.itemSelectedF20.codesunarp}`, method: 'POST', data: formState});
    if (response.status === 200) {
      message.success(response.message);
   
      formState.name = null;
      formState.numbernotary = null;
      formState.notary_id = null;
    
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
}
</style>