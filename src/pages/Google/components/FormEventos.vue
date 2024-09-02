<template>
  <div>
    <a-form class="form-events" layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

      <div class="grid-events">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-textarea v-model:value="formState[el.name]" :rows="2" style="resize: none;" />
          </a-form-item>


          <a-form-item v-if="el.type === 'iLinkVideo'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <div class="video-conference">
              <VideoCameraOutlined />
              <label v-if="linkVideoConference" class="form-label-1">Establecer enlace de videoconferencia</label>
              <label v-else class="form-label-2" @click="linkVideoConference = true">Agrega video conferencia</label>
            </div>
            <a-input v-if="linkVideoConference" v-model:value="formState.username" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iColor'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">

            <div style="display: flex; align-items: center; justify-content: space-between">
              <label class="form-label-1">Color de fondo</label>
              <a-select v-model:value="selectedColor" style="width: 70px;">
                <a-select-option v-for="color in colors" :key="color" :value="color">
                  <div :style="{ backgroundColor: color, }" class="bg-color"></div>
                </a-select-option>
              </a-select>
            </div>

          </a-form-item>



          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'category_id'" v-model:value="formState[el.name]" :options="categories" />

            <a-select v-if="el.name == 'repeat'" v-model:value="formState[el.name]" :options="repeats" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker show-time :locale="locale" v-model:value="formState[el.name]" style="width: 100%;"
              :disabled-date="(value) => disabledDate(value, el.name)" :show-time="{ format: 'HH:mm' }"
              format="DD-MM-YYYY HH:mm" placeholder="" />
            </a-form-item>

        </template>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" style="float: inline-end;">GUARDAR</a-button>
      </a-form-item>



    </a-form>


    <pre>{{ formState }}</pre>



  </div>
</template>

<script setup>
import { ref, reactive, defineProps, watch, onMounted } from 'vue';
import { VideoCameraOutlined } from '@ant-design/icons-vue';
import fields from '@/forms/eventos.js';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';

import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const storageProfile = JSON.parse(localStorage.getItem('profile'))

const emit = defineEmits(['closeDraw']);
const props = defineProps(['info']);



const dateFormat = 'DD/MM/YYYY';
const loading = ref(false);
const linkVideoConference = ref(false);
const selectedColor = ref(null);


const colors = [
  'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'gray', 'black'
];
const repeats = [
  { label: "Cada Semana", value: "week" },
  { label: "Cada Mes", value: "mont" },
  { label: "Cada Año", value: "year" }
];
const categories = [
  { label: "Si", value: "yes" },
  { label: "No", value: "no" }
];
const formState = reactive({
  startDate: null,
  endDate: null,
  hola: null
});

const handleClear = () => {

}





const disabledDate = (value, el) => {
  console.log("Disabled", el);

  if (el == 'startDate') {
    return value < new Date().setHours(0, 0, 0, 0);
  }
  if (el == 'endDate') {
    const startDate = formState.startDate;
    return startDate && value <= new Date(startDate).getTime();
  }
  return false;
};


const onSubmit = async () => {
  loading.value = true;

  if (formState.ruc && validation.valid === false) {
    loading.value = false;
    return;
  }

  const payload = {
    people_id: formState.idPerson,
    cde_id: storageProfile.cde_id,
    component_1: formState.component_1,
    component_2: formState.component_2,
    component_3: formState.component_3,
    ruc: formState.ruc,
    startDate: dayjs(formState.startDate).format('YYYY-MM-DD'),
    endDate: dayjs(formState.endDate).format('YYYY-MM-DD'),
    ...(props.info && { idItem: props.info.id })
  }

  let rutaUrl = null;

  props.info ? rutaUrl = `plans-action/update` : rutaUrl = `plans-action/create`;

  try {
    const data = await makeRequest({ url: `${rutaUrl}`, method: 'POST', data: payload });
    if (data.status == 200) {
      message.success(data.message);
      handleClear()
      emit('closeDraw');
    }
    if (data.status == 400) {
      message.warning(data.message);
    }
  } catch (error) {
    console.log("Failed to update record");
  } finally {
    loading.value = false;
  }
}

function handleSetInfo(info) {
  if (info) {

    console.log("Setting info", info);

    formState.startDate = dayjs(info.start, 'YYYY-MM-DD 00:00');
    formState.endDate = dayjs(info.end, 'YYYY-MM-DD 23:59');

  } else {
    handleClear()
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
.grid-events {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;

  .ant-form-item:nth-child(1),
  // .ant-form-item:nth-child(2),
  // .ant-form-item:nth-child(3),
  .ant-form-item:nth-child(4),
  .ant-form-item:nth-child(5) {
    grid-column: 1/3;
  }
}

.video-conference {
  display: flex;
  gap: 5px;
  padding-bottom: 8px;
}



.form-label-1 {
  color: #606060 !important;
}

.form-label-2 {
  cursor: pointer;
  color: #1677ff;
}

.bg-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 5px;
}
</style>

<style lang="scss">
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