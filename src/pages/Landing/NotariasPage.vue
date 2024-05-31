<template>
  <div class="notaries">


    <div class="notaries-wrapper">
      <h1 class="notarie-title">CATÁLOGO DE NOTARIAS</h1>
      <h3 class="notarie-title-2">SI EL CAPITAL > 1 UIT (S/.5150) ADICIONAL PAGARÁ GASTOS REGISTRALES EN CUALQUIER
        NOTARIA</h3>
    </div>

    <br>

   



      <div class=" notaries-wrapper notaries-box" v-for="(item, idx) in dataSource" :key="idx">
        <div>
          <a-tag color="blue">{{ item.city.name }}</a-tag>
          <div class="notaries-box-adrres">
            <span>{{ item.province.name }}</span> -
            <span>{{ item.district.name }}</span> -
            <span>{{ item.address }}</span>
          </div>
          <h3 class="notaries-box-name">{{ item.name }}</h3>
          <div style="display: flex; align-items: baseline;">
            <span class="notaries-box-h4">BIOMETRICO: </span> 
            <span class="notaries-box-html" v-html="item.biometrico"></span>
          </div>
        </div>

        <div>
          <h4 class="notaries-box-h4">GASTOS NOTARIALES</h4>
          <div class="notaries-box-html" v-html="item.price"></div>
        </div>

        <div>
          <h4 class="notaries-box-h4">CONDICIONES</h4>
          <div class="notaries-box-html" v-html="item.conditions"></div>
        </div>


        <div>
          <h4 class="notaries-box-h4">SOCIO O INTERVINIENTE ADICIONAL</h4>
          <div class="notaries-box-html" v-html="item.sociointerveniente"></div>
        </div>



    







      <!-- <EnvironmentOutlined /> -->
      <!-- <a href="https://maps.app.goo.gl/HevFnRUXY9Xips3n8" target="_blank" rel="noopener noreferrer">ir añño</a> -->





    </div>





  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { useCounterStore } from '@/stores/selectes.js';
import { EnvironmentOutlined } from '@ant-design/icons-vue'

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'NOTARIA', fixed: 'left', dataIndex: 'namenotary', align: 'center', width: 180 },
  { title: 'REGIÓN', dataIndex: 'departamento', align: 'center', width: 120 },
  { title: 'PROVINCIA', dataIndex: 'province', align: 'center', width: 160 },
  { title: 'DISTRITO', dataIndex: 'distrite', align: 'center', width: 130 },
  { title: 'DIRECCION', dataIndex: 'address', align: 'center', width: 160 },
  { title: 'GASTOS NOTARIALES', dataIndex: 'pricex', align: 'center', width: 320 },
  { title: 'CONDICIONES', dataIndex: 'pricedescriptionx', align: 'center', width: 280 },
  { title: 'SOCIO O INTERVINIENTE ADICIONAL', dataIndex: 'socio', align: 'center', width: 200 },
  { title: 'BIOMETRICO', dataIndex: 'bio', align: 'center', width: 250 },
  { title: 'DATOS DE CONTACTO', dataIndex: 'contact', align: 'center', width: 260 },
];

const store = useCounterStore();
const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const city = ref(null);
const filterName = ref(null);
const filterCity = ref(null);

store.$patch({ cities: store.cities });
store.fetchCities();

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 230;
};
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const handleDepartaments = async () => {
  try {
    loading.value = true;
    const data = await requestNoToken({ url: `public/notaries/${city.value}`, method: 'GET' });
    dataSource.value = data.data
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}
const fetchData = async () => {
  try {
    loading.value = true;

    const values = {
      ...filterName.value && { name: filterName.value },
      ...filterCity.value && { city_id: filterCity.value }
    }

    const data = await requestNoToken({
      url: 'public/notaries-filters',
      method: 'GET',
      params: values
    });

    dataSource.value = data.data
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});
onMounted(() => {
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
  fetchData();
});
</script>

<style lang="scss">
.notarie-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #BA0F0F;
}

.notarie-title-2 {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 16px;
  text-align: center;
}

.notaries {
  background-color: rgb(236, 236, 236);
  width: 100%;
  padding: 1rem 0;

  &-wrapper {
    background-color: #fff;
    margin: auto;
    padding: 2rem 1rem;
    max-width: 1200px;
  }

  &-box {
    border-radius: 4px;
    // border: 1px solid #f0f0f0;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    padding: 2rem 1rem 1.5rem 1rem;
    margin: 1rem auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    grid-gap: 1rem;

    &-h4 {
      font-size: 13px;
      color: #BA0F0F;
    }

    &-adrres {
      font-size: 13px;
      color: #000000e0;
    }

    &-name {
      font-size: 16px;
      margin: .2rem 0;
    }

    &-html {
      br {
        display: none;
      }

      h1,
      h2,
      h3,
      h4 {
        font-size: 14px;
        margin: 0;

        strong {
          color: #000000e0;
          font-weight: 700;
        }
      }

      p {
        font-size: 13px;
        margin-top: .3rem;

        strong {
          font-size: 11px;

        }
      }
    }
  }
}
</style>