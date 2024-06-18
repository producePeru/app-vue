<template>
  <div class="wrapper-booking">
    <a-spin :spinning="spinning">
      <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
        @finishFailed="onSubmitFail">
        <div class="grid-booking">
          <template v-for="(el, idx) in fields" :key="idx">

            <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-select v-if="el.name == 'regime_id'" v-model:value="formState[el.name]" :options="store.regimes"
                show-search :filter-option="filterOption" />

              <a-select v-if="el.name == 'modality_id'" v-model:value="formState[el.name]"
                :options="store.modalities" />

              <a-select v-if="el.name == 'notary_id'" v-model:value="formState[el.name]" :options="notaries"
                option-label-prop="name" :disabled="!formState.city_id" show-search :filter-option="filterNotaries">
                <template #option="{ value: val, name, city, province, district, address }">
                  <div class="select-notaries">
                    <span class="name">{{ name }}</span>
                    <span class="city">{{ city }} - {{ province }} - {{ district }}</span>
                    <span class="address">{{ address }}</span>
                  </div>
                </template>
              </a-select>

              <a-select v-if="el.name == 'isbic'" v-model:value="formState[el.name]" :options="bic" />
              <a-select v-if="el.name == 'typecapital_id'" v-model:value="formState[el.name]" :options="store.typeCapital" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-date-picker :locale="locale" v-model:value="formState[el.name]" style="width: 100%;"
                :format="dateFormat" placeholder="día/mes/año" @change="formState.birthday = birthdateDate"
                :disabled="el.disabled" />
            </a-form-item>

            <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-select v-if="el.name == 'comercialactivity_id'" v-model:value="formState[el.name]" show-search
                :options="store.comercialActivities" :filter-option="filterOption">
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

              <a-select v-if="el.name == 'economicsector_id'" v-model:value="formState[el.name]" show-search
                :options="store.economicSectors" :filter-option="filterOption" />

              <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" show-search
                :options="store.cities" :filter-option="filterOption" @change="handleDepartaments" />

              <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" show-search
                :options="store.provinces" :filter-option="filterOption" @change="handleProvinces"
                :disabled="!formState.city_id" />

              <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" show-search
                :options="store.districts" :filter-option="filterOption" :disabled="!formState.province_id" />

            </a-form-item>

            <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
              <a-input @input="validateOnlyNumber(el.name)" v-model:value="formState[el.name]" :disabled="el.disabled"
                :maxlength="el.max" :placeholder="el.placeholder" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iNumber'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
              <a-input-number style="width: 100%;" v-model:value="formState[el.name]" :maxlength="11" @change="onlyRUC(el.name)"  />
            </a-form-item>

            <a-form-item v-if="el.type === 'iTextLol'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
              <a-input @input="validateOnlyNumber(el.name)" v-model:value="formState.dni" :disabled="!!props.info.dni"
                :maxlength="el.max" :placeholder="el.placeholder" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iMoney'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
              <a-input-number
              :min:="0"
              style="width: 100%;"
              v-model:value="formState[el.name]"
              :formatter="value => `S/ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/S\/\s?|(,*)/g, '')" />
            </a-form-item>

          </template>
        </div>

      
        <!-- <pre>{{ props.info }}</pre> -->
        
        <div>{{ update() }}</div>
        <a-form-item>
          <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
        </a-form-item>
      </a-form>
    </a-spin>

  </div>
</template>

<script setup>
import { reactive, ref, defineComponent, onMounted } from 'vue';
import { useCounterStore } from '@/stores/selectes.js';
import { fields } from '@/forms/asesoriasEdit.js'
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import { requestNoToken } from '@/utils/noToken.js';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

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

const dateFormat = 'DD/MM/YYYY';
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
const notaries = ref(null);

store.$patch({ cities: store.cities });
store.$patch({ modalities: store.modalities });
store.$patch({ economicSectors: store.economicSectors });
store.$patch({ comercialActivities: store.comercialActivities });
store.$patch({ regimes: store.regimes });
store.$patch({ typeCapital: store.typeCapital });
// store.$patch({ notaries: store.notaries });

// store.fetchNotaries();
store.fetchEconomicSectors();
store.fetchComercialActivities();
store.fetchRegimes();
store.fetchModalities();
store.fetchTypeCapital();
store.fetchCities();

const formState = reactive({
  city_id: null,
  province_id: null,
  district_id: null,
  address: null,
  modality_id: null,
  nameMype: null,
  ruc: null,
  economicsector_id: null,
  comercialactivity_id: null,
  regime_id: null,
  numbernotary: null,
  notary_id: null,
  dateReception: null,
  dateTramite: null,
  // user_id: storageData.user_id,
  montocapital: null
});
const bic = [
  {value: 'SI', label: 'SI'},
  {value: 'NO', label: 'NO'}
]
const validateOnlyNumber = (val) => {
  if (val == 'ruc') {
    formState[val] = formState[val].replace(/\D/g, '');
  }
};
const onlyRUC = (name) => {
  if(name == 'ruc') {
    const value = formState.ruc;
    if (value < 20000000000 || value > 20999999999) {
      formState.ruc = null;
    }
  }
}
const update = () => {
  // handleGetNotariesByRegion()
  formState.city_id = props.info.city_id;
  handleDepartaments(props.info.city_id)
  formState.province_id = props.info.province_id;
  handleProvinces(props.info.province_id)
  formState.district_id = props.info.district_id;
  formState.address = props.info.address;
  formState.modality_id = props.info.modality_id;
  formState.nameMype = props.info.nameMype;
  formState.ruc = props.info.ruc;
  formState.economicsector_id = props.info.economicsector_id;
  formState.comercialactivity_id = props.info.comercialactivity_id;
  formState.regime_id = props.info.regime_id;
  formState.numbernotary = props.info.numbernotary;
  formState.notary_id = props.info.notary_id;
  formState.dni = props.info.dni;
  formState.typecapital_id = props.info.typecapital_id
  formState.isbic = props.info.isbic;
  formState.montocapital = props.info.montocapital
  if(props.info.dateReception) formState.dateReception = dayjs(props.info.dateReception, 'YYYY-MM-DD');
  if(props.info.dateTramite) formState.dateTramite = dayjs(props.info.dateTramite, 'YYYY-MM-DD');

  if (store.regimes?.length) spinning.value = false;
}
const filterNotaries = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const normalizedName = option.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedCity = option.city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedProvince = option.province.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedDistrict = option.district.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return normalizedName.includes(normalizedInput) ||
         normalizedCity.includes(normalizedInput) ||
         normalizedProvince.includes(normalizedInput) ||
         normalizedDistrict.includes(normalizedInput);
};
const handleAddItem = async () => {
  try {
    loadingcategory.value = true;
    const payload = {
      name: nameNewItem.value
    }
    const data = await makeRequest({ url: 'create/comercial-activities', method: 'POST', data: payload });
    if (data.status == 200) {
      nameNewItem.value = null;
      store.fetchComercialActivities();
    }
  } catch (e) {
    console.log(e);
  } finally {
    loadingcategory.value = false;
  }
}
const handleAddItenSector = async () => {
  try {
    loadingcategory.value = true;
    const payload = {
      name: nameNewItem2.value
    }
    const data = await makeRequest({ url: 'create/economic-sector', method: 'POST', data: payload });
    if (data.status == 200) {
      nameNewItem2.value = null;
      store.fetchEconomicSectors();
    }
  } catch (e) {
    console.log(e);
  } finally {
    loadingcategory.value = false;
  }
}

const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id);
  // handleGetNotariesByRegion()
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}
const handleGetNotariesByRegion = async () => {
  try {
    const values = { city_id: formState.city_id }
    const { data } = await requestNoToken({
      url: 'public/notaries-filters',
      method: 'GET',
      // params: values
    });

    notaries.value = null;
    // formState.notary_id = null;

    const notarias = data.map(item => ({
      value: item.id,
      name: item.name,
      city: item.city.name,
      province: item.province.name,
      district: item.district.name,
      address: item.address
    }));

    notaries.value = notarias;

  } catch (error) {
    console.error('Error de red:', error);
  }
};

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const onSubmit = async () => {
  loading.value = true;
  // formState.people_id = props.info.id;
  const payload = {
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    address: formState.address,
    modality_id: formState.modality_id,
    nameMype: formState.nameMype,
    ruc: formState.ruc,
    dni: formState.dni,
    economicsector_id: formState.economicsector_id,
    comercialactivity_id: formState.comercialactivity_id,
    regime_id: formState.regime_id,
    numbernotary: formState.numbernotary,
    notary_id: formState.notary_id,
    dateReception: formState.dateReception ? dayjs(formState.dateReception).format('YYYY-MM-DD') : null,
    dateTramite: formState.dateTramite ? dayjs(formState.dateTramite).format('YYYY-MM-DD') : null,
    userupdated_id: storageData.user_id,

    typecapital_id: formState.typecapital_id,
    isbic: formState.isbic,
    montocapital: formState.montocapital
  }

  try {
    const response = await makeRequest({ url: `formalization/update-ruc-20/${props.info.id}`, method: 'PUT', data: payload});
    
    if (response.status === 200) {
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
      formState.nameMype = null;
      formState.dateReception = null;
      formState.dateTramite = null;
      formState.notary_id = null;
      formState.ruc = null;
      formState.numbernotary = null;
      formState.isbic = null;
      formState.montocapital = null;
      formState.typecapital_id = null;

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

onMounted(() => {
  handleGetNotariesByRegion()
});
</script>

<style scoped lang="scss">
.grid-booking {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 1rem;

  .ant-form-item:nth-child(4) {
    grid-column: 1/3;
  }

  .ant-form-item:nth-child(6) {
    // grid-row: 4;
    grid-column: 1/3;
  }

  .ant-form-item:nth-child(11) {
    grid-column: 1/3;
  }


  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);

    .ant-form-item:nth-child(4),
    .ant-form-item:nth-child(13) {
      grid-column: initial;
    }

    .ant-form-item:nth-child(10) {
      grid-column: 1/3;
    }
  }
}

.select-notaries {
  display: flex;
  flex-direction: column;

  .name {
    margin-bottom: .15rem;
    font-weight: 500;
    font-size: 15px;
    color: var(--secondary);
  }

  .city {
    color: var(--primary);
    display: block;
    margin-bottom: .2rem;
  }

  .city,
  .address {
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>