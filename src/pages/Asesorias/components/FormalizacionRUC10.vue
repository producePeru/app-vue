<template>
  <div class="wrapper-booking">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in ructen" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'detailprocedure_id'" v-model:value="formState[el.name]" :options="store.detailProcedures" />
            <a-select v-if="el.name == 'modality_id'" v-model:value="formState[el.name]" :options="store.modalities" />
            <a-select v-if="el.name == 'economicsector_id'" v-model:value="formState[el.name]" :options="store.economicSectors" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'comercialactivity_id'" v-model:value="formState[el.name]" show-search :options="store.comercialActivities"
              :filter-option="filterOption">
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

    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, defineComponent } from 'vue';
import { ructen } from '@/forms/asesorias.js';
import { message } from 'ant-design-vue';
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

const storageData = JSON.parse(localStorage.getItem('profile'));
const props = defineProps(['info']);
const emit = defineEmits(['closeDraw']);

const loading = ref(false);
const nameNewItem = ref(null);
const store = useCounterStore();
const loadingcategory = ref(false);
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.$patch({ modalities: store.modalities });
store.$patch({ detailProcedures: store.detailProcedures });
store.$patch({ economicSectors: store.economicSectors });
store.$patch({ comercialActivities: store.comercialActivities });

store.fetchDetailProcedures();
store.fetchModalities();
store.fetchEconomicSectors()
store.fetchComercialActivities()
store.fetchCities();

const formState = reactive({
  detailprocedure_id: null,
  modality_id: null,
  economicsector_id: null,
  comercialactivity_id: null,
  city_id: null,
  province_id: null,
  district_id: null,
  user_id: storageData.user_id
});

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
    const response = await makeRequest({ url: 'formalization/create-ruc-10', method: 'POST', data: formState});
    if (response.status === 200) {
      message.success(response.message);
      formState.detailprocedure_id = null;
      formState.modality_id = null;
      formState.economicsector_id = null;
      formState.comercialactivity_id = null;
      formState.city_id = null;
      formState.province_id = null;
      formState.district_id = null;

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
  h3 {
    margin-bottom: 2rem;
  }
}
.grid-booking {
  display: grid;
  grid-template-columns: repeat(3,1fr);
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
    grid-column: 1/3;
  }
  .ant-form-item:nth-child(5) {
    grid-column: 1/2;
  }
}
</style>