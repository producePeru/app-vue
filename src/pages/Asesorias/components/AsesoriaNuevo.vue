<template>
  <div class="wrapper-booking">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in asesoria" :key="idx">
          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'component_id'" v-model:value="formState[el.name]" :options="store.components" @change="handleSelectComponent" />
            <a-select v-if="el.name == 'modality_id'" v-model:value="formState[el.name]" :options="store.modalities" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-textarea v-model:value="formState[el.name]" :rows="3" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'theme_id'" v-model:value="formState[el.name]" show-search :options="store.componentThemes" 
              :filter-option="filterOption" />
            <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" show-search :options="store.cities" 
              :filter-option="filterOption" @change="handleDepartaments" />
            <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" show-search :options="store.provinces"
              :filter-option="filterOption" @change="handleProvinces" />
            <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" show-search :options="store.districts"
              :filter-option="filterOption" />
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button type="primary" class="btn-produce" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
      <!-- <pre>{{ props.info }}</pre> -->
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { asesoria } from '@/forms/asesorias.js'
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js';

const store = useCounterStore();
const storageData = JSON.parse(localStorage.getItem('profile'));
const loading = ref(false);
const props = defineProps(['info']);
const emit = defineEmits(['closeDraw']);

store.$patch({ components: store.components });
store.$patch({ componentThemes: store.componentThemes });
store.$patch({ modalities: store.modalities });
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });

store.fetchComponents();
store.fetchComponentThemes();
store.fetchModalities();
store.fetchCities();
store.fetchGenders();

const formState = reactive({
  observations: null,
  user_id: storageData.id,
  people_id: props.info.id,
  component_id: null,
  theme_id: null,
  modality_id: null,
  city_id: null,
  province_id: null,
  district_id: null,
});

const handleSelectComponent = (id) => {
  formState.theme_id = null
  store.fetchComponentThemes(id);
};
const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id);
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const onSubmit = async () => {
  loading.value = true;
  try {
    const response = await makeRequest({ url: 'advisory/create', method: 'POST', data: formState});
    
    if (response.status === 200) {
      message.success(response.message);
      formState.component_id = null;
      formState.theme_id = null;
      formState.modality_id = null;
      formState.city_id = null;
      formState.province_id = null;
      formState.district_id = null;
      formState.observations = null;

      emit('closeDraw', true)
    }
  } catch (error) {
    console.log("Error: " + error);
  } finally {
    loading.value = false;
  }
}
const onSubmitFail = () => {
  message.warning('Debes de completar todos los espacios requeridos')
};
</script>

<style scoped lang="scss">
.wrapper-booking {
  max-width: 700px;
  width: 100%;
  h3 {
    margin-bottom: 2rem;
  }
}

.grid-booking {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 1rem;

  .ant-form-item:nth-child(1) {
    grid-column: 1/3;
  }

  .ant-form-item:nth-child(2) {
    grid-column: 1/3;
  }

  .ant-form-item:nth-child(3) {
    grid-column: 1/3;
  }

  .ant-form-item:nth-child(4) {
    grid-column: 1/2;
  }

  .ant-form-item:nth-child(7) {
    grid-column: 1/4;
  }
}
</style>