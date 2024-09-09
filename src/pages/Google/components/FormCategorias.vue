<template>
  <div>
    <a-form class="form-events" layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

      <div class="grid-events">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select v-model:value="formState[el.name]" style="width: 70px;">
              <a-select-option v-for="color in colors" :key="color" :value="color">
                <div :style="{ backgroundColor: color, }" class="bg-color"></div>
              </a-select-option>
            </a-select>
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" style="width: 100%; margin-top: 1rem;">GUARDAR</a-button>
      </a-form-item>

    </a-form>

    <!-- <pre>{{ formState }}</pre> -->

  </div>
</template>

<script setup>
import { ref, reactive, defineProps, watch, onMounted } from 'vue';
import fields from '@/forms/eventoscategorias.js';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';

const emit = defineEmits(['closeDraw']);
const props = defineProps(['info']);

const loading = ref(false);

const colors = [
  'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'gray', 'black'
];

const formState = reactive({});

const handleClear = () => {
  formState.name = null;
  formState.color = null;
}

const onSubmit = async () => {
  loading.value = true;

  const payload = {
    name: formState.name,
    color: formState.color
  }

  try {
    const data = await makeRequest({ url: `event/create-category`, method: 'POST', data: payload });
    if (data.status == 200) {
      message.success(data.message);
      handleClear()
      emit('closeDraw');
    }
  } catch (error) {
    console.log("Failed to update record");
  } finally {
    loading.value = false;
  }
}

</script>

<style lang="scss">
.grid-events {
  input, textarea, div, select {
    font-size: 13px !important;
  }
}

.bg-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 5px;
}

.ant-picker-header-view,
.ant-picker-time-panel-cell-inner {
  font-size: 13px;
}

.form-events {
  label {
    font-size: 12px !important;
  }

  .ant-form-item-label {
    padding: 0 0 4px !important;
  }

  .ant-form-item:last-child {
    margin: 0;
  }

  .ant-form-item {
    margin-bottom: 10px;
  }
}
</style>