<template>
  <div class="wrapper-booking">
    <a-spin :spinning="spinning">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in asesoria" :key="idx">
          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <!-- <a-select v-if="el.name == 'component_id'" v-model:value="formState[el.name]" :options="store.components" @change="handleSelectComponent" /> -->
            <a-select v-if="el.name == 'modality_id'" v-model:value="formState[el.name]" :options="store.modalities" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-textarea v-model:value="formState[el.name]" :rows="3" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" @input="validateOnlyNumber(el.name)" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <!-- <a-select v-if="el.name == 'theme_id'" v-model:value="formState[el.name]" show-search :options="store.componentThemes" 
              :filter-option="filterOption" /> -->
            <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" show-search :options="store.cities" 
              :filter-option="filterOption" @change="handleDepartaments" />
            <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" show-search :options="store.provinces"
              :filter-option="filterOption" @change="handleProvinces" :disabled="!formState.city_id" />
            <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" show-search :options="store.districts"
              :filter-option="filterOption" :disabled="!formState.province_id" />

            <a-select v-if="el.name == 'component_id'" v-model:value="formState[el.name]" show-search :options="store.components" :filter-option="filterOption" @change="handleSelectComponent">
              <template #dropdownRender="{ menuNode: menu }">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <a-space style="padding: 4px 8px">
                  <a-input ref="inputRef" v-model:value="nameNewItem" placeholder="Nueva componente" />
                  <a-button type="text" @click="handleAddItem" :loading="loadingcategory">
                    <template #icon>
                      <PlusOutlined />
                    </template>
                    Agregar
                  </a-button>
                </a-space>
              </template>
            </a-select>

            <a-select v-if="el.name == 'theme_id'" v-model:value="formState[el.name]" show-search :options="store.componentThemes" :filter-option="filterOption" :disabled="!formState.component_id">
              <template #dropdownRender="{ menuNode: menu }">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <a-space style="padding: 4px 8px">
                  <a-input ref="inputRef" v-model:value="nameNewItem2" placeholder="Nueva tema" />
                  <a-button type="text" @click="handleAddThemeNew" :loading="loadingcategory">
                    <template #icon>
                      <PlusOutlined />
                    </template>
                    Agregar
                  </a-button>
                </a-space>
              </template>
            </a-select>


          </a-form-item>
        </template>
      </div>

      <div>{{ update() }}</div>
      <a-form-item>
        <a-button type="primary" class="btn-produce" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
      <!-- <pre>{{ formState }}</pre> -->
    </a-form>
    </a-spin>
  </div>
</template>

<script setup>
import { reactive, ref, defineComponent } from 'vue';
import { message } from 'ant-design-vue';
import { asesoria } from '@/forms/asesorias.js'
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js';
import { PlusOutlined } from '@ant-design/icons-vue';

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});

const store = useCounterStore();
const storageData = JSON.parse(localStorage.getItem('profile'));
const loading = ref(false);
const props = defineProps(['info']);
const emit = defineEmits(['closeDraw']);
const loadingcategory = ref(false);
const nameNewItem = ref(null);
const nameNewItem2 = ref(null);

store.$patch({ components: store.components });
store.$patch({ componentThemes: store.componentThemes });
store.$patch({ modalities: store.modalities });
store.$patch({ cities: store.cities });
// store.$patch({ provinces: store.provinces });
// store.$patch({ districts: store.districts });

store.fetchComponents();
store.fetchComponentThemes();
store.fetchModalities();
store.fetchCities();
store.fetchGenders();

const spinning = ref(true);

const formState = reactive({
  observations: null,
  user_id: storageData.user_id,
  people_id: null,
  component_id: null,
  theme_id: null,
  modality_id: null,
  city_id: null,
  province_id: null,
  district_id: null,
});

const validateOnlyNumber = (val) => {
  if(val == 'ruc') {
    formState[val] = formState[val].replace(/\D/g, '');
  }
};
const handleAddItem = async() => {
  try {
    loadingcategory.value = true;
    const payload = {
      name: nameNewItem.value
    }
    const data = await makeRequest({ url: 'create/component', method: 'POST', data: payload});
    if(data.status == 200) {
      nameNewItem.value = null;
      store.fetchComponents();
    }
  } catch(e) {
    console.log(e);
  } finally {
    loadingcategory.value = false;
  }
}
const handleAddThemeNew = async() => {
  try {
    loadingcategory.value = true;
    const payload = {
      component_id: formState.component_id,
      name: nameNewItem2.value
    }
    const data = await makeRequest({ url: 'create/theme', method: 'POST', data: payload});
    if(data.status == 200) {
      nameNewItem2.value = null;
      store.fetchComponentThemes(formState.component_id);
    }
  } catch(e) {
    console.log(e);
  } finally {
    loadingcategory.value = false;
  }
}
const update = () => {
  if(store.cities) spinning.value = false;
}
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
  formState.people_id = props.info.id
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

  // .ant-form-item:nth-child(5) {
  //   grid-row: 3;
  //   grid-column: 3/3;
  // }

  .ant-form-item:nth-child(8) {
    grid-column: 1/4;
  }
}
</style>