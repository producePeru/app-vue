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
            <a-select 
            v-if="el.name == 'modality_id'" 
            :disabled="el.disabled"
            v-model:value="formState[el.name]" 
            :options="store.modalities" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-textarea v-model:value="formState[el.name]" :rows="3" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" @input="validateOnlyNumber(el.name)" :placeholder="el.placeholder" :disabled="el.name === 'dni' && !!formState[el.name]"  />
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
            
            <a-select v-if="el.name == 'economicsector_id'" v-model:value="formState[el.name]" show-search :options="store.economicSectors"
              :filter-option="filterOption" />
            
            <a-select v-if="el.name == 'comercialactivity_id'" v-model:value="formState[el.name]" show-search :options="store.comercialActivities"
              :filter-option="filterOption" />
            
            <!-- <a-select v-if="el.name == 'cde_id'" v-model:value="formState[el.name]" :options="store.cdes" show-search :filter-option="filterOption" @change="handleChangeCde"/> -->
            
            <a-select 
            v-if="el.name == 'component_id'" 
            :disabled="el.disabled"
            v-model:value="formState[el.name]" 
            show-search 
            :options="store.components" 
            :filter-option="filterOption"
            @change="handleSelectComponent">
              <!-- <template #dropdownRender="{ menuNode: menu }">
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
              </template> -->
            </a-select>

            <a-select v-if="el.name == 'theme_id'" v-model:value="formState[el.name]" show-search :options="store.componentThemes" :filter-option="filterOption" :disabled="!formState.component_id">
              <!-- <template #dropdownRender="{ menuNode: menu }">
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
              </template> -->
            </a-select>


          </a-form-item>
        </template>
      </div>

      <div>{{ update() }}</div>
      <a-form-item>
        <a-button type="primary" class="btn-produce" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
      <!-- <pre>{{ info }}</pre> -->
      <!-- <pre>::::{{ idCde }}</pre> -->
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
import CryptoJS from 'crypto-js';

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

const store = useCounterStore();
const storageData = JSON.parse(localStorage.getItem('profile'));
const loading = ref(false);
const props = defineProps(['info', 'idCde']);
const emit = defineEmits(['closeDraw']);
const loadingcategory = ref(false);
const nameNewItem = ref(null);
const nameNewItem2 = ref(null);

// store.$patch({ cdes: store.cdes });
store.$patch({ components: store.components });
store.$patch({ componentThemes: store.componentThemes });
store.$patch({ modalities: store.modalities });
store.$patch({ cities: store.cities });
store.$patch({ economicSectors: store.economicSectors });
store.$patch({ comercialActivities: store.comercialActivities });

// store.$patch({ provinces: store.provinces });
// store.$patch({ districts: store.districts });
// store.fetchCdes()
store.fetchEconomicSectors();
store.fetchComercialActivities();
store.fetchComponents();
store.fetchComponentThemes();
store.fetchModalities();
store.fetchCities();
store.fetchGenders();


const spinning = ref(true);

const formState = reactive({
  cde_id: null,
  dni: null,
  economicsector_id: null,
  comercialactivity_id: null,
  component_id: null,
  theme_id: null,
  modality_id: null,
  ruc: null,
  city_id: null,
  province_id: null,
  district_id: null,
  observations: null,
  user_id: storageData.user_id,
});

const handleChangeCde = (id) => {
  let data = dProfile;
  dProfile.cde_id = id;
  localStorage.setItem('profile', JSON.stringify(data));
  const encryptProfile = CryptoJS.AES.encrypt(JSON.stringify(data), 'appProfile').toString();
  localStorage.setItem('eProfile', encryptProfile);
}
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
  // formState.dni = props.info.documentnumber;
  // formState.city_id = props.info.city_id;
  // handleDepartaments(props.info.city_id)
  // formState.province_id = props.info.province_id;
  // handleProvinces(props.info.province_id)
  // formState.district_id = props.info.district_id;
  // // Validamos si es notario externo el asesor
  // role.some(r => r.id === 7) ? formState.component_id = 4 : formState.component_id = null;
  // role.some(r => r.id === 7) ? formState.modality_id = 1 : formState.modality_id = null;
  // role.some(r => r.id === 7) && store.fetchComponentThemes(4);
  // if(store.cities) spinning.value = false;
  
  const { documentnumber, city_id, province_id, district_id } = props.info;
  const isNotarioExterno = role.some(r => r.id === 7);

  formState.dni = documentnumber;

  formState.city_id = city_id;
  handleDepartaments(city_id);

  formState.province_id = province_id;
  handleProvinces(province_id);

  formState.district_id = district_id;

  formState.component_id = isNotarioExterno ? 4 : null;
  formState.modality_id = isNotarioExterno ? 1 : null;

  if (isNotarioExterno) store.fetchComponentThemes(4);

  if (store.cities) spinning.value = false;
  
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

  if(!props.info.id) return message.error("Error al registrar actualiza la página");

  const payload = {
    dni: formState.dni,
    economicsector_id: formState.economicsector_id,
    comercialactivity_id: formState.comercialactivity_id,
    observations: formState.observations,
    user_id: storageData.user_id,
    people_id: props.info.id,
    component_id: formState.component_id,
    theme_id: formState.theme_id,
    modality_id: formState.modality_id,
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    ruc: formState.ruc,
    cde_id: props.idCde ? props.idCde : null
  }

  try {
    const response = await makeRequest({ url: 'advisory/create', method: 'POST', data: payload});
    
    if (response.status === 200) {
      
      const payloadMype = {
        razonSocial: null,
        ruc: formState.ruc,
        createdFrom: 'asesorias'
      }

      // await makeRequest({ url: 'mype/create', method: 'POST', data: payloadMype});
      message.success(response.message);
      formState.component_id = null;
      formState.theme_id = null;
      formState.modality_id = null;
      formState.city_id = null;
      formState.province_id = null;
      formState.district_id = null;
      formState.observations = null;
      formState.ruc = null;
      formState.economicsector_id = null;
      formState.comercialactivity_id = null;

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
  h3 {
    margin-bottom: 2rem;
  }
}

.grid-booking {
  @media (width >= 820px) {
    display: grid;
    grid-gap: 0 1rem;
    grid-template-columns: repeat(2, 270px);
    .ant-form-item:nth-child(11) {
      grid-column: 1/3;
    }
  }
}
</style>