<template>
  <div class="wrapper-booking">
    <a-spin :spinning="spinning">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in ructen" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'detailprocedure_id'" v-model:value="formState[el.name]" :options="store.detailProcedures" />
            <a-select 
            v-if="el.name == 'modality_id'" 
            :disabled="el.disabled"
            v-model:value="formState[el.name]" 
            :options="store.modalities" />
            <!-- <a-select v-if="el.name == 'economicsector_id'" v-model:value="formState[el.name]" :options="store.economicSectors" /> -->
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label" 
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.name === 'dni' && !!formState[el.name]" :maxlength="el.max" :placeholder="el.placeholder" />
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

            <a-select v-if="el.name == 'economicsector_id'" v-model:value="formState[el.name]" show-search :options="store.economicSectors"
              :filter-option="filterOption">
              <!-- <template #dropdownRender="{ menuNode: menu }">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <a-space style="padding: 4px 8px">
                  <a-input ref="inputRef" v-model:value="nameNewItemSector" placeholder="Nuevo registro" />
                  <a-button type="text" @click="handleAddItemSector" :loading="loadingNewItenSector">
                    <template #icon>
                      <PlusOutlined />
                    </template>
                    Agregar
                  </a-button>
                </a-space>
              </template> -->
            </a-select>

            <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" show-search :options="store.cities" 
              :filter-option="filterOption" @change="handleDepartaments" />
            <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" show-search :options="store.provinces"
              :filter-option="filterOption" @change="handleProvinces" :disabled="!formState.city_id" />
            <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" show-search :options="store.districts"
              :filter-option="filterOption" :disabled="!formState.province_id" />
            
            <!-- <a-select v-if="el.name == 'cde_id'" v-model:value="formState[el.name]" :options="store.cdes" show-search :filter-option="filterOption" /> -->
            
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button type="primary" class="btn-produce" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>

    </a-form>
    <div>{{ update() }}</div>
    <!-- <pre>{{ formState }}</pre> -->
    </a-spin>
  </div>
</template>

<script setup>
import { reactive, ref, defineComponent } from 'vue';
import { ructen } from '@/forms/asesorias.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js';
import { PlusOutlined } from '@ant-design/icons-vue';
import { dProfile } from '@/utils/storage.js';

const role = JSON.parse(localStorage.getItem('role'));

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
const props = defineProps(['info', 'idCde']);
const emit = defineEmits(['closeDraw']);

const loading = ref(false);
const nameNewItem = ref(null);
const nameNewItemSector = ref(null);
const loadingNewItenSector = ref(false);

const store = useCounterStore();
const loadingcategory = ref(false);

// store.$patch({ cdes: store.cdes });
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.$patch({ modalities: store.modalities });
store.$patch({ detailProcedures: store.detailProcedures });
store.$patch({ economicSectors: store.economicSectors });
store.$patch({ comercialActivities: store.comercialActivities });

// store.fetchCdes()
store.fetchDetailProcedures();
store.fetchModalities();
store.fetchEconomicSectors()
store.fetchComercialActivities()
store.fetchCities();

const spinning = ref(true);
const formState = reactive({
  detailprocedure_id: null,
  modality_id: null,
  economicsector_id: null,
  comercialactivity_id: null,
  city_id: null,
  province_id: null,
  district_id: null,
  address: null,
  user_id: storageData.user_id
});

const onlyRUC = (name) => {
  if(name == 'ruc') {
    const value = formState.ruc;
    if (value < 10000000000 || value > 10999999999) {
      formState.ruc = null;
    }
  }
}

const update = () => {
  const { documentnumber, city_id, province_id, district_id, address } = props.info;
  
  formState.dni = documentnumber;
  formState.modality_id = role.some(r => r.id === 7) ? 1 : null;
  
  formState.city_id = city_id;
  handleDepartaments(city_id);
  
  formState.province_id = province_id;
  handleProvinces(province_id);
  
  formState.district_id = district_id;

  formState.address = address;

  if (store.cities) {
    spinning.value = false;
  }
};


const validateOnlyNumber = (val) => {
  if(val == 'ruc') {
    const value = formState.ruc;
    if (value < 10000000000 || value > 20999999999) {
      formState.ruc = null;
    }
  }
};
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
const handleAddItemSector = async() => {
  try {
    loadingNewItenSector.value = true;
    const payload = {
      name: nameNewItemSector.value
    }
    const data = await makeRequest({ url: 'create/economic-sector', method: 'POST', data: payload});
    if(data.status == 200) {
      nameNewItemSector.value = null;
      store.fetchEconomicSectors();
    }
  } catch(e) {
    console.log(e);
  } finally {
    loadingNewItenSector.value = false;
  }
}
const onSubmit = async () => {
  loading.value = true;

  if(!props.info.id) return message.error("Error al registrar, actualiza la página");
  
  const payload = {
    dni: formState.dni,
    detailprocedure_id: formState.detailprocedure_id,
    modality_id: formState.modality_id,
    economicsector_id: formState.economicsector_id,
    comercialactivity_id: formState.comercialactivity_id,
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    address: formState.address,
    ruc: formState.ruc,
    user_id: storageData.user_id,
    people_id: props.info.id,
    cde_id: props.idCde ? props.idCde : null
  }
  
  try {
    const response = await makeRequest({ url: 'formalization/create-ruc-10', method: 'POST', data: payload});
    if (response.status === 200) {

      const payloadMype = {
        razonSocial: null,
        ruc: formState.ruc,
        createdFrom: 'F10'
      }

      await makeRequest({ url: 'mype/create', method: 'POST', data: payloadMype});

      try {
        await makeRequest({ url: `mype/update/${formState.ruc}`, method: 'PUT' });
      } catch (error) {
        console.log("Failed to update", error);
      } finally {
        message.success(response.message);
        formState.detailprocedure_id = null;
        formState.modality_id = null;
        formState.economicsector_id = null;
        formState.comercialactivity_id = null;
        formState.city_id = null;
        formState.province_id = null;
        formState.district_id = null;
        formState.address = null;
        formState.ruc = null;

        emit('closeDraw', true);
      }
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
  grid-template-columns: repeat(2,1fr);
  grid-gap: 0 1rem;
  .ant-form-item:nth-child(11) {
    grid-column: 1/3;
  }
  // .ant-form-item:nth-child(2) {
  //   grid-column: 1/3;
  // }
  // .ant-form-item:nth-child(3) {
  //   grid-column: 1/3;
  // }
  // .ant-form-item:nth-child(4) {
  //   grid-column: 1/3;
  // }
  // .ant-form-item:nth-child(5) {
  //   grid-column: 1/2;
  // }
  // .ant-form-item:nth-child(9) {
  //   grid-column: 2/4;
  // }
}
</style>