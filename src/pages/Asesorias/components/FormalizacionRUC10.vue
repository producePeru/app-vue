<template>
  <div class="wrapper-booking">
    <!-- <h3>DATOS DE LA FORMALIZACIÓN</h3> -->
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in ructen" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'detail_procedure'" v-model:value="formState[el.name]" :options="prodecure_detail" />
            <a-select v-if="el.name == 'modality'" v-model:value="formState[el.name]" :options="modality" />
            <a-select v-if="el.name == 'economy_sector'" v-model:value="formState[el.name]" :options="economicSectors" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'category'" v-model:value="formState[el.name]" show-search :options="activities" :filter-option="filterOption">
              <template #dropdownRender="{ menuNode: menu }">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <a-space style="padding: 4px 8px">
                  <a-input ref="inputRef" v-model:value="name" placeholder="Nueva actividad" />
                  <a-button type="text" @click="handleAddItem" :loading="loadingcategory">
                    <template #icon>
                      <PlusOutlined />
                    </template>
                    Agregar
                  </a-button>
                </a-space>
              </template>
            </a-select>
            
            <a-select v-if="el.name == 'department'" v-model:value="formState[el.name]" show-search :options="departments" :filter-option="filterOption" @change="getProvinces" />
            <a-select v-if="el.name == 'province'" v-model:value="formState[el.name]" show-search :options="provinces" :filter-option="filterOption" @change="getDistricts" />
            <a-select v-if="el.name == 'district'" v-model:value="formState[el.name]" show-search :options="districts" :filter-option="filterOption" />
          </a-form-item>

        </template>
      </div>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>


      <!-- <pre>:::: {{ counter.count }}</pre> -->
      
    </a-form>

  </div>
</template>

<script setup>
import { ructen } from '@/forms/asesorias.js'
import { reactive, ref, onMounted, defineComponent } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { economicSectors } from '@/utils/selects.js'
import { modality, prodecure_detail } from '@/utils/selects.js'
import { makeRequest } from '@/utils/api.js';
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/someEvents.js'

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

const pageStore = useCounterStore()
const props = defineProps(['info']);
const storageData = JSON.parse(localStorage.getItem('user'));
const personData = JSON.parse(localStorage.getItem('info'));
const emit = defineEmits(['closeDraw']);

const name = ref();
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);
const activities = ref([]);
const loading = ref(false);
const loadingcategory = ref(false);

const formState = reactive({
  detail_procedure: null,
  modality: null,
  economy_sector: null,
  category: null,
  department: null,
  province: null,
  district: null,
  id_person: props.info.id,
  created_by: personData.id,
  created_dni: personData.dni
});

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};

const onSubmit = async () => {
  const payload = formState
  loading.value = true
  try {
    const data = await makeRequest({ url: '/formalization10', method: 'POST', data: payload });

    if(data.status == 400) {
      message.error(data.message);
      return pageStore.logout()
    }
    
    if(data) {
      message.success(data.message);
  
      formState.detail_procedure = null
      formState.modality = null
      formState.economy_sector = null
      formState.category = null
      formState.department = null
      formState.province = null
      formState.district = null

      emit('closeDraw', true)
    }
  } catch (error) {
    message.error('Error al registrar');
  } finally {
    loading.value = false
  }
};
const handleAddItem = async() => {
  loadingcategory.value = true;
  try {
    await makeRequest({ url: '/create-comercial-activities', method: 'POST', data: {name: name.value} });
    categories()
    name.value = ''
  } catch (error) {
    message.error('Error al registrar');
  } finally {
    loadingcategory.value = false;
  }
};
const onSubmitFail = () => {
  message.warning('Debes de completar todos los espacios requeridos')
};

const getDepartaments = async () => {
  try {
    const { data } = await requestNoToken({ url: '/departaments', method: 'GET' });
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    departments.value = [...departments.value, ...arr];
  } catch (error) {
    console.log(error);
  }
};
const getProvinces = async (id) => {
  formState.province = null
  formState.district = null
  provinces.value = []
  districts.value = []
  try {
    const { data } = await requestNoToken({ url: `/province/${id}`, method: 'GET' });
    let provincesArray = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    provinces.value = [...provinces.value, ...provincesArray];
  } catch (error) {
    console.log(error);
  }
};
const getDistricts = async (id) => {
  formState.district = null
  districts.value = []
  try {
    const { data } = await requestNoToken({ url: `/district/${id}`, method: 'GET' });
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    districts.value = [...districts.value, ...arr];
  } catch (error) {
    console.log(error);
  }
};

const categories = async () => {
  try {
    const { data } = await makeRequest({ url: `/comercial-activities`, method: 'GET' });
    activities.value = data
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getDepartaments(),
  categories()
});
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