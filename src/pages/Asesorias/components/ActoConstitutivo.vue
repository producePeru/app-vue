<template>
  <div class="wrapper-booking">
    <a-spin :spinning="spinning">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-booking">
        <template v-for="(el, idx) in acto" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            
            <a-select v-if="el.name == 'notary_id'" v-model:value="formState[el.name]" :options="notaries" option-label-prop="name" :disabled="!city">
              <template #option="{ value: val, name, city, province, district, address }">
                <div class="select-notaries">
                  <span class="name">{{ name }}</span>
                  <span class="city">{{ city }} - {{ province }} - {{ district }}</span>
                  <span class="address">{{ address }}</span>
                </div>
              </template>
            </a-select>
            
            <a-select 
            v-if="el.name == 'city'"
            placeholder="Seleccionar una provincia para la notaría"
            style="width: 350px;"
            v-model:value="city" 
            show-search 
            :options="store.cities" 
            :filter-option="filterOption" @change="handleDepartaments" />
          
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email, max: el.max }]">
            <a-input v-model:value="formState[el.name]" />
          </a-form-item>

        </template>
      </div>

      <div>{{ update() }}</div>

      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
    </a-spin>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { acto } from '@/forms/asesorias.js';
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { requestNoToken } from '@/utils/noToken.js';

const storageData = JSON.parse(localStorage.getItem('profile'));
const store = useCounterStore();
const props = defineProps(['info', 'itemSelectedF20']);
const emit = defineEmits(['closeDraw']);

store.$patch({ notaries: store.notaries });
store.$patch({ cities: store.cities });
store.fetchNotaries();
store.fetchCities();

const spinning = ref(true);
const loading = ref(false);
const city = ref(null);
const notaries = ref(null);

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const formState = reactive({
  task: 2,
  name: null,
  numbernotary: null,
  notary_id: null,
  user_id: storageData.user_id,
  userupdated_id: storageData.id
})
const update = () => {
  if(store.notaries?.length) spinning.value = false;
}
const handleDepartaments = async() => {
  try {
    const values = { city_id: city.value }

    const {data} = await requestNoToken({ 
      url: 'public/notaries-filters', 
      method: 'GET',
      params: values
    });

    notaries.value = null;
    formState.notary_id = null;

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
}

const onSubmit = async () => {
  loading.value = true;
  formState.people_id = props.info.id;
  try {
    const response = await makeRequest({ url: `formalization/ruc20-step2/${props.itemSelectedF20.id}`, method: 'POST', data: formState});
    if (response.status === 200) {
      message.success(response.message);
   
      formState.name = null;
      formState.numbernotary = null;
      formState.notary_id = null;
    
      emit('closeDraw', true)

    }
  } catch (error) {
    console.log("Error: " + error);
  } finally {
    loading.value = false;
  }
}
const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};

</script>

<style scoped lang="scss">
.wrapper-booking {
  max-width: 350px;
  margin-top: 2rem;
  h3 {
    margin-bottom: 2rem;
  }
}
.select-notaries {
  display: flex;
  flex-direction: column;
  .name {
    margin-bottom: .15rem;
    font-weight: 500;
    font-size: 15px;
  }
  .city {
    color: #0958d9;
    display: block;
    margin-bottom: .2rem;
  }
  .city, .address {
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>