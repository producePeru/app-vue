<template>
  <div class="wrapper-booking">
    <a-spin :spinning="spinning">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'regime_id'" v-model:value="formState[el.name]" :options="store.regimes" />
            <!-- <a-select v-if="el.name == 'economicsector_id'" v-model:value="formState[el.name]" :options="store.economicSectors" /> -->
            <a-select v-if="el.name == 'modality_id'" v-model:value="formState[el.name]" :options="store.modalities" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'comercialactivity_id'" v-model:value="formState[el.name]" show-search :options="store.comercialActivities" :filter-option="filterOption">
              <template #dropdownRender="{ menuNode: menu }">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <a-space style="padding: 4px 8px">
                  <a-input ref="inputRef" v-model:value="nameNewItem" placeholder="Nueva actividad" />
                  <a-button type="text" @click="handleAddItem" :loading="loadingcategory">
                    <template #icon>
                      <PlusOutlined />
                    </template>
                    Agregar
                  </a-button>
                </a-space>
              </template>
            </a-select>

            <a-select v-if="el.name == 'economicsector_id'" v-model:value="formState[el.name]" show-search :options="store.economicSectors" :filter-option="filterOption">
              <template #dropdownRender="{ menuNode: menu }">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <a-space style="padding: 4px 8px">
                  <a-input ref="inputRef" v-model:value="nameNewItem2" placeholder="Nuevo Sector" />
                  <a-button type="text" @click="handleAddItenSector" :loading="loadingcategory">
                    <template #icon>
                      <PlusOutlined />
                    </template>
                    Agregar
                  </a-button>
                </a-space>
              </template>
            </a-select>

            <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" show-search :options="store.cities" 
              :filter-option="filterOption" @change="handleDepartaments" />
            <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" show-search :options="store.provinces"
              :filter-option="filterOption" @change="handleProvinces" />
            <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" show-search :options="store.districts"
              :filter-option="filterOption" />

          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled" />
          </a-form-item>

        </template>
      </div>
      <!-- <pre>{{ props.info }}</pre>
      <pre>:::::{{ formState }}</pre> -->
      <div>{{ update() }}</div>
      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
    </a-spin>
  </div>
</template>

<script setup>
import { reactive, ref, defineComponent } from 'vue';
import { useCounterStore } from '@/stores/selectes.js';
import { fields } from '@/forms/asesorias.js'
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';

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

const route = useRoute();
const storageData = JSON.parse(localStorage.getItem('profile'));
const props = defineProps(['info']);
const emit = defineEmits(['closeDraw']);
const loadingcategory = ref(false);
const nameNewItem = ref(null);
const nameNewItem2 = ref(null);
const spinning = ref(true);
const loading = ref(false);
const store = useCounterStore();
store.$patch({ cities: store.cities });
store.$patch({ modalities: store.modalities });
store.$patch({ economicSectors: store.economicSectors });
store.$patch({ comercialActivities: store.comercialActivities });
store.$patch({ regimes: store.regimes });

store.fetchEconomicSectors();
store.fetchComercialActivities();
store.fetchRegimes();
store.fetchCities();
store.fetchModalities();

const formState = reactive({
  task: 1,
  codesunarp: null,
  economicsector_id: null,
  comercialactivity_id: null,
  regime_id: null,
  city_id: null,
  province_id: null,
  district_id: null,
  address: null,
  modality_id: null,
  user_id: storageData.user_id
});
const update = () => {
  if(store.regimes?.length) spinning.value = false;
}

const handleAddItem = async() => {
  try {
    loadingcategory.value = true;
    const payload = {
      name: nameNewItem.value
    }
    const data = await makeRequest({ url: 'create/comercial-activities', method: 'POST', data: payload});
    if(data.status == 200) {
      nameNewItem.value = null;
      store.fetchComercialActivities();
    }
  } catch(e) {
    console.log(e);
  } finally {
    loadingcategory.value = false;
  }
}
const handleAddItenSector = async() => {
  try {
    loadingcategory.value = true;
    const payload = {
      name: nameNewItem2.value
    }
    const data = await makeRequest({ url: 'create/economic-sector', method: 'POST', data: payload});
    if(data.status == 200) {
      nameNewItem2.value = null;
      store.fetchEconomicSectors();
    }
  } catch(e) {
    console.log(e);
  } finally {
    loadingcategory.value = false;
  }
}

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
  formState.people_id = props.info.id;
  try {
    const response = await makeRequest({ url: 'formalization/ruc20-step1', method: 'POST', data: formState});
    if (response.status === 200) {

      // Formalizacion Digital Atendido...
      if(route.query.formalizaciondigital) {
        let payload2 = {
          id: +route.query.formalizaciondigital,
          documentnumber: route.query.number
        }
        await makeRequest({ url: 'formalization/digital/update-attended', method: 'PUT', data: payload2});
      }

      message.success(response.message);
   
      formState.codesunarp = null;
      formState.economicsector_id = null;
      formState.comercialactivity_id = null;
      formState.regime_id = null;
      formState.city_id = null;
      formState.province_id = null;
      formState.district_id = null;
      formState.address = null;
      formState.modality_id = null;
    
      emit('closeDraw', true)

    }
  } catch (error) {
    console.log("Error: " + error);
  } finally {
    loading.value = false;
  }
}
const onSubmitFail = () => {
  message.warning('Debes de completar todos los espacios requeridos');
};
</script>

<style scoped lang="scss">
.wrapper-booking {
  max-width: 700px;
  margin-top: 2rem;
  h3 {
    margin-bottom: 2rem;
  }
}
.grid-booking {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 0 1rem;
  .ant-form-item:nth-child(1) {
    grid-column: 1/4;
    max-width: 297px;
  }
  .ant-form-item:nth-child(2) {
    grid-column: 1/4;
    max-width: 297px;
  }
  .ant-form-item:nth-child(3) {
    grid-column: 1/4;
    max-width: 297px;
  }
  .ant-form-item:nth-child(3) {
    grid-column: 1/4;
    max-width: 297px;
  }
  .ant-form-item:nth-child(4) {
    grid-column: 1/4;
    grid-row: 4;
    max-width: 297px;
  }
  .ant-form-item:nth-child(8) {
    grid-column: 1/3;
    grid-row: 7;
    // max-width: 297px;
  }
  .ant-form-item:nth-child(9) {
    grid-column: 3/4;
    grid-row: 7;
    // max-width: 297px;
  }
}
</style>

<style>
.ant-form-item-label {
  padding: 0 0 2px 0 !important;
}
</style>