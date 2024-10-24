<template>
  <div>
    <a-spin :spinning="spinning">
      <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
        <div class="grid-ruc20">
          <template v-for="(el, idx) in fields2" :key="idx">

            <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-select v-if="el.name == 'regime_id'" v-model:value="formState[el.name]" :options="store.regimes"
                show-search :filter-option="filterOption" />

              <a-select v-if="el.name == 'modality_id'" :disabled="el.disabled" v-model:value="formState[el.name]"
                :options="store.modalities" />

              <a-select v-if="el.name == 'typecapital_id'" v-model:value="formState[el.name]"
                :options="store.typeCapital" />

              <a-select v-if="el.name == 'isbic'" v-model:value="formState[el.name]" :options="bic" />


              <a-select v-if="el.name == 'notary_id'" :disabled="el.disabled" v-model:value="formState[el.name]"
                :options="notaries" option-label-prop="name" show-search :filter-option="filterNotaries">
                <template #option="{ value: val, name, city, province, district, address }">
                  <div class="select-notaries">
                    <span class="name">{{ name }}</span>
                    <span class="city">{{ city }} - {{ province }} - {{ district }}</span>
                    <span class="address">{{ address }}</span>
                  </div>
                </template>
              </a-select>

            </a-form-item>



            <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message, validator: (rule, value) => validateDates(el.name, value) }]">

              <a-date-picker :locale="locale" v-model:value="formState[el.name]" style="width: 100%;"
                :format="dateFormat" placeholder="día/mes/año" :disabled="el.disabled" />
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
              :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max, min: el.min }]">
              <a-input @input="validateOnlyNumber(el.name)" v-model:value="formState[el.name]" :disabled="el.disabled"
                :maxlength="el.max" :placeholder="el.placeholder" />
            </a-form-item>

            <!-- <a-form-item v-if="el.type === 'iNumber'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-input-number style="width: 100%;" v-model:value="formState[el.name]" :maxlength="el.max"
                @change="onlyRUC(el.name)" />
            </a-form-item> -->

            <a-form-item v-if="el.type === 'iNumber'" :name="el.name" :label="el.label" :rules="[
              { required: el.required, message: el.message },
              ...(el.name === 'ruc' ? [{ validator: validateRUC, trigger: 'change' }] : [])
            ]">
              <a-input-number style="width: 100%;" v-model:value="formState[el.name]" :maxlength="11" />
            </a-form-item>



            <a-form-item v-if="el.type === 'iTextLol'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-input @input="validateOnlyNumber(el.name)" v-model:value="formState.dni"
                :disabled="!props.documentnumber" :maxlength="el.max" :placeholder="el.placeholder" />
            </a-form-item>

            <a-form-item v-if="el.type === 'iMoney'" :name="el.name" :label="el.label"
              :rules="[{ required: el.required, message: el.message }]">
              <a-input-number :min="1" style="width: 100%;" v-model:value="formState[el.name]"
                :formatter="value => `S/ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/S\/\s?|(,*)/g, '')" />
            </a-form-item>

          </template>
        </div>
        <!-- <pre>{{ notaries }}</pre> -->
        <a-form-item>
          <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
        </a-form-item>

      </a-form>
    </a-spin>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, reactive, defineComponent } from 'vue';
import { useCounterStore } from '@/stores/selectes.js';
import { fields } from '@/forms/asesorias.js';
import { makeRequest } from '@/utils/api.js';
import { requestNoToken } from '@/utils/noToken.js';
import { message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

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

const emit = defineEmits(['closeDraw']);
const props = defineProps(['info', 'idCde']);

const fields2 = ref(null);
const storageData = JSON.parse(localStorage.getItem('profile'));
const role = JSON.parse(localStorage.getItem('role'));
const dateFormat = 'DD/MM/YYYY';
const store = useCounterStore();

const loading = ref(false);
const loadingcategory = ref(false);
const spinning = ref(true);
const notaries = ref([]);
const nameNewItem = ref(null);

const formState = reactive({});

store.$patch({ cities: store.cities });
store.$patch({ modalities: store.modalities });
store.$patch({ economicSectors: store.economicSectors });
store.$patch({ comercialActivities: store.comercialActivities });
store.$patch({ regimes: store.regimes });
store.$patch({ typeCapital: store.typeCapital });

store.fetchEconomicSectors();
store.fetchComercialActivities();
store.fetchRegimes();
store.fetchModalities();
store.fetchTypeCapital();
store.fetchCities();

const bic = [
  { value: 'SI', label: 'SI' },
  { value: 'NO', label: 'NO' }
];


const validateDates = (fieldName, value) => {
  const dateReception = formState.dateReception ? dayjs(formState.dateReception) : null;
  const dateTramite = formState.dateTramite ? dayjs(formState.dateTramite) : null;

  // Validación para dateReception
  if (fieldName === 'dateReception' && dateTramite) {
    // La fecha de recepción no puede ser mayor que la fecha de trámite
    if (dayjs(value).isAfter(dateTramite)) {
      return Promise.reject('La fecha de recepción no puede ser mayor que la fecha de trámite');
    }
  }

  // Validación para dateTramite
  if (fieldName === 'dateTramite' && dateReception) {
    const maxDate = dateReception.add(30, 'days');

    // Permitir que las fechas sean iguales
    if (dayjs(value).isBefore(dateReception) && !dayjs(value).isSame(dateReception)) {
      return Promise.reject('La fecha de trámite no puede ser menor que la fecha de recepción');
    }

    // La fecha de trámite no puede ser más de 30 días después de la fecha de recepción
    if (dayjs(value).isAfter(maxDate)) {
      return Promise.reject('La fecha de trámite no puede ser más de 30 días después de la fecha de recepción');
    }
  }

  return Promise.resolve(); // Si pasa las validaciones
};


const handleChangeDate = (name) => {
  console.log("jsjsjsjs", name);


  if (name == 'dateReception') {

    formState.dateTramite = null;

    fields2.value.dateTramite.disabled = false;
  }

}

const disabledDate = (current) => {
  const dateReception = formState.dateReception;
  return current && (current > dayjs().endOf('day') || (dateReception && current.isBefore(dayjs(dateReception).startOf('day'))));
};


const validateRUC = (rule, value) => {
  if (!value) {
    // If no value is provided, validation passes (not required)
    return Promise.resolve();
  }
  const regex = /^20\d{9}$/;
  if (regex.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject('El RUC debe comenzar por 20 y ser 11 carácteres');
  }
};
// const onlyRUC = (name) => {
//   if(name == 'ruc') {
//     const value = formState.ruc;
//     if (value < 20000000000 || value > 20999999999) {
//       formState.ruc = null;
//     }
//   }
// };
const validateOnlyNumber = (val) => {
  if (val == 'ruc' || val == 'montocapital') {
    formState[val] = formState[val].replace(/\D/g, '');
  }
};

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
const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id);
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}
const handleGetNotariesByRegion = async () => {
  try {
    // const values = { city_id: formState.city_id }
    const { data } = await requestNoToken({
      url: 'public/notaries-filters',
      method: 'GET',
      // params: values
    });

    // notaries.value = null;
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
    spinning.value = false;

  } catch (error) {
    console.error('Error de red:', error);
  }
};

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

function handleSetInfo(info) {
  fields2.value = fields
  const { documentnumber, city_id, province_id, district_id, address } = props.info;
  const containsId = role.some(role => role.id === 7);

  formState.dni = documentnumber;

  formState.city_id = city_id;
  handleDepartaments(city_id);

  formState.province_id = province_id;
  handleProvinces(province_id);

  formState.district_id = district_id;

  formState.address = address;

  handleGetNotariesByRegion();

  if (containsId) {
    fields2.value.notary_id.disabled = true;
    fields2.value.modality_id.disabled = true;
    formState.modality_id = 1;
    formState.notary_id = storageData.notary_id;
  }
}

const onSubmit = async () => {
  loading.value = true;

  if (!props.info.id) return message.error("Error al registrar, actualiza la página");

  const payload = {
    codesunarp: formState.codesunarp,
    numbernotary: formState.numbernotary,
    address: formState.address,
    economicsector_id: formState.economicsector_id,
    comercialactivity_id: formState.comercialactivity_id,
    regime_id: formState.regime_id,
    city_id: formState.city_id,
    province_id: formState.province_id,
    district_id: formState.district_id,
    modality_id: formState.modality_id,
    notary_id: formState.notary_id,
    user_id: storageData.user_id,
    people_id: props.info.id,

    nameMype: formState.nameMype,
    dateReception: formState.dateReception ? dayjs(formState.dateReception).format('YYYY-MM-DD') : null,
    dateTramite: formState.dateTramite ? dayjs(formState.dateTramite).format('YYYY-MM-DD') : null,
    ruc: formState.ruc,
    dni: formState.dni,

    typecapital_id: formState.typecapital_id,
    isbic: formState.isbic,
    montocapital: formState.montocapital,
    cde_id: props.idCde ? props.idCde : null
  }

  try {
    const response = await makeRequest({ url: 'formalization/create-ruc20', method: 'POST', data: payload });

    if (response.status === 200) {

      const payloadMype = {
        razonSocial: null,
        ruc: formState.ruc,
        createdFrom: 'F20'
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


<style scoped lang="scss">
.grid-ruc20 {
  @media (width >=820px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0 1rem;

    .ant-form-item:nth-child(3) {
      grid-column: 3/5;
    }

    .ant-form-item:nth-child(12) {
      grid-column: 1/3;
    }

    .ant-form-item:nth-child(13) {
      grid-column: 3/5;
    }

    .ant-form-item:nth-child(18) {
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