<template>
  <div>
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

      <div class="grid-planes">
        <template v-for="(el, idx) in fields" :key="idx">

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'typeDocument'" v-model:value="formState[el.name]"
              :options="optionsTypeDocuments" />

            <a-select v-if="el.name == 'gender_id'" :disabled="el.disabled" v-model:value="formState[el.name]"
              :options="store.genders" />

            <a-select v-if="el.name == 'sick'" :disabled="el.disabled" v-model:value="formState[el.name]"
              :options="lessions" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iSearch'" class="item-max" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-input-search :loading="searchLoading == el.name" v-model:value="formState[el.name]"
              @search="handleSearchApiInfo(el.name)" @input="validateNumber(el.name)"
              @enterButton="handleSearchApiInfo(el.name)" :maxlength="el.max" />
          </a-form-item>

          <a-divider dashed v-if="el.type === 'iDivider'" style="grid-column: 1/3; margin: .5rem 0 1rem 0;" />

          <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" show-search :options="store.cities"
              :filter-option="filterOption" @change="handleDepartaments" />

            <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]" show-search
              :options="store.provinces" :filter-option="filterOption" @change="handleProvinces"
              :disabled="!formState.city_id" />

            <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]" show-search
              :options="store.districts" :filter-option="filterOption" :disabled="!formState.province_id" />

            <a-select v-if="el.is == 'component'" v-model:value="formState[el.name]" show-search
              :options="getFilteredComponents(el.name)" :filter-option="filterOption"
              @change="(value) => handleSelectComponent(value, el.name)" />


          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker :disabled-date="disabledDate" :locale="locale" v-model:value="formState[el.name]"
              style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" />
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
      <!-- <pre>{{ store.components }}</pre> -->
    </a-form>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, watch, onMounted } from 'vue';
import fieldx from '@/forms/planesAccion.js';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';
import { useCounterStore } from '@/stores/selectes.js';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const storageProfile = JSON.parse(localStorage.getItem('profile'))

const store = useCounterStore();
const emit = defineEmits(['closeDraw']);
const props = defineProps(['info']);

store.$patch({ cities: store.cities });
// store.$patch({ genders: store.genders });
// store.$patch({ components: store.components });

store.fetchCities();
// store.fetchGenders();
// store.fetchComponents();

const dateFormat = 'DD/MM/YYYY';
const fields = ref(fieldx)
const loading = ref(false);
const searchLoading = ref(null);

const components = [
  { label: "DESARROLLO PRODUCTIVO", value: 1 },
  { label: "DIGITALIZACIÓN", value: 2 },
  { label: "FINANZAS", value: 3 },
  { label: "FORMALIZACION", value: 4 },
  { label: "GESTIÓN EMPRESARIAL", value: 5 }
];
const optionsTypeDocuments = [
  { value: 1, label: 'DNI' },
  { value: 2, label: 'RUC' },
];
const lessions = [
  { label: "Si", value: "yes" },
  { label: "No", value: "no" }
];
const formState = reactive({
  numberDocument: null,
  component_1: null,
  component_2: null,
  component_3: null,
  ruc: null
});

const handleClear = () => {
  formState.numberDocument = null;
  formState.component_1 = null;
  formState.component_2 = null;
  formState.component_3 = null;
  formState.ruc = null;
  formState.idPerson = null;
  formState.namePerson = null;
  formState.city_id = null;
  formState.province_id = null;
  formState.district_id = null;
  formState.gender_id = null;
  formState.sick = null;
  formState.startDate = null;
  formState.endDate = null;
}

const getFilteredComponents = (currentField) => {
  const selectedValues = Object.keys(formState).reduce((acc, key) => {
    if (key !== currentField && formState[key] !== null) {
      acc.push(formState[key]);
    }
    return acc;
  }, []);

  // Filter out selected components
  return components.filter(component => !selectedValues.includes(component.value));

};

const handleValidateRUC = () => {
  const ruc = formState.ruc;

  // Verificar si el RUC tiene exactamente 11 dígitos numéricos
  if (ruc) {
    if (!/^\d{11}$/.test(ruc)) {
      message.error("El número de RUC debe contener exactamente 11 dígitos numéricos.");
      return { valid: false };
    }
  }

  // Verificar si el RUC comienza con 10, 15 o 20
  const validPrefix = /^(10|15|20)/;
  if (ruc) {
    if (!validPrefix.test(ruc)) {
      message.error("El número de RUC debe comenzar con 10, 15 o 20.");
      return { valid: false };
    }
  }

  // Si ambas validaciones pasan, retornar válido
  return { valid: true };
}

const disabledDate = (current) => {
  // return current && current > dayjs().endOf('day');
  if (!current) return false; // No date selected

  const startDate = formState.startDate ? dayjs(formState.startDate) : null;

  // Disable dates after the startDate and dates in the future
  return (startDate && current.isBefore(startDate, 'day')) || current.isAfter(dayjs().endOf('day'), 'day');
};
const validateNumber = (name) => {
  formState[name] = formState[name].replace(/\D/g, '');
};

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const handleSearchApiInfo = async (name) => {

  if (!formState.numberDocument) return message.warning("Ingrese un número a buscar...");

  try {
    if (name == 'numberDocument') {
      searchLoading.value = name;
      const data = await makeRequest({ url: `person/data/${formState.numberDocument}`, method: 'GET' });
      // console.log("Searchingxxx", data);
      if (data.status == 404) {
        searchLoading.value = null;
        formState.numberDocument = null;
        return message.warning('Este usuario no fue registrado');
      }
      if (data.status == 200) {
        formState.idPerson = data.data.id;
        formState.namePerson = data.data.namePerson;
        formState.city_id = data.data.city_id;
        handleDepartaments(data.data.city_id);
        formState.province_id = data.data.province_id;
        handleProvinces(data.data.province_id);
        formState.district_id = data.data.district_id;
        // formState.gender_id = data.data.gender_id;

        // formState.gender_id = 1

        console.log("FormState", data.data.gender_id);
        formState.sick = data.data.sick;
      }
    }

    if (name == 'ruc') {
      searchLoading.value = name;
      const data = await makeRequest({ url: `plans-action/components/${formState.ruc}`, method: 'GET' });
      if (data.status == 200) {
        const resp = data.data
        resp.component_1 && (formState.component_1 = resp.component_1);
        resp.component_2 && (formState.component_2 = resp.component_2);
        resp.component_3 && (formState.component_3 = resp.component_3);
        resp.endDate && (formState.endDate = dayjs(resp.endDate, 'YYYY-MM-DD'));
      } else {
        searchLoading.value = null;
        formState.ruc = null;
        return message.warning('No se han registrado datos con ese número de RUC');
      }
    }

  } catch (error) {
    console.log("Failed to update record");
  } finally {
    searchLoading.value = null;
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

const handleSelectComponent = (value, fieldName) => {
  // const otherFields = Object.keys(formState).filter(key => 
  //   key !== fieldName && key.startsWith('component_')
  // );

  // if (otherFields.some(key => formState[key] === value)) {
  //   formState[fieldName] = null;
  //   console.error('Opción ya seleccionada en otro campo');
  // } else {
  //   formState[fieldName] = value;
  // }
}

const onSubmit = async () => {
  loading.value = true;

  const validation = handleValidateRUC();


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
    formState.numberDocument = info.emprendedor_dni;
    handleSearchApiInfo('numberDocument');
    formState.ruc = info.ruc;
    formState.component_1 = info.component_1;
    formState.component_2 = info.component_2;
    formState.component_3 = info.component_3;
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
.grid-planes {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;

  .ant-form-item:nth-child(12) {
    grid-column: 1/2;
  }

  .ant-form-item:nth-child(13) {
    // grid-column: 1/2;
  }
}
</style>