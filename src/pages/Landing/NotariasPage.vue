<template>

  <div class="all-notaries">
    <h1 class="title">CATÁLOGO DE NOTARIAS </h1>
    

    <div class="notaries-header">
      <h2 class="title-2">SI EL CAPITAL > 1 UIT (S/.5150) ADICIONAL PAGARÁ GASTOS REGISTRALES EN CUALQUIER NOTARIA</h2>
      <a-select 
      size="large"
      placeholder="Buscar por Provincia"
      style="width: 240px;"
      v-model:value="city" 
      show-search 
      :options="store.cities" 
      :filter-option="filterOption" @change="handleDepartaments" />
    </div>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" :columns="columns" :data-source="dataSource"
      :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ index + 1 }}
        </template>
        <template v-if="column.dataIndex == 'lastName'">
          {{ record.last_name }} {{ record.middle_name }}
        </template>
        <template v-if="column.dataIndex == 'departamento'">
          {{ record.city?.name }}
        </template>
        <template v-if="column.dataIndex == 'province'">
          {{ record.province?.name }}
        </template>
        <template v-if="column.dataIndex == 'distrite'">
          {{ record.district?.name }}
        </template>
        <template v-if="column.dataIndex == 'namenotary'">
          <h4 style="font-size: 16px; font-weight: 700;">{{ record.name }}</h4>
        </template>
        <template v-if="column.dataIndex == 'pricex'">
          <div class="gastos">
            <div v-html="record.price" class="style-price"></div>
          </div>
        </template>
        <template v-if="column.dataIndex == 'pricedescriptionx'">
          <div>
            <div v-html="record.conditions" class="style-conditions"></div>
          </div>
        </template>
        <template v-if="column.dataIndex == 'socio'">
          <div v-html="record.sociointerveniente" class="style-contact"></div>
        </template>
        <template v-if="column.dataIndex == 'bio'">
          <div v-html="record.biometrico" class="style-contact"></div>
        </template>
        <template v-if="column.dataIndex == 'contact'">
          <div v-html="record.infocontacto" class="style-contact"></div>
        </template>

      </template>
    </a-table>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { useCounterStore } from '@/stores/selectes.js';

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 70 },
  { title: 'NOTARIA', fixed: 'left', dataIndex: 'namenotary', align: 'center', width: 180 },
  { title: 'REGIÓN', dataIndex: 'departamento', align: 'center', width: 120 },
  { title: 'PROVINCIA', dataIndex: 'province', align: 'center', width: 120 },
  { title: 'DISTRITO', dataIndex: 'distrite', width: 120 },
  { title: 'DIRECCION', dataIndex: 'address', align: 'center', width: 160 },
  { title: 'GASTOS NOTARIALES', dataIndex: 'pricex', align: 'center', width: 320 },
  { title: 'CONDICIONES', dataIndex: 'pricedescriptionx', align: 'center', width: 260 },
  { title: 'SOCIO O INTERVINIENTE ADICIONAL', dataIndex: 'socio', align: 'center', width: 200 },
  { title: 'BIOMETRICO', dataIndex: 'bio', align: 'center', width: 220 },
  { title: 'DATOS DE CONTACTO', dataIndex: 'contact', align: 'center', width: 260 },
];

const store = useCounterStore();
const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const city = ref(null);

store.$patch({ cities: store.cities });
store.fetchCities();

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 250;
};
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const handleDepartaments = async() => {
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
    const data = await requestNoToken({ url: 'public/notaries', method: 'GET' });

    console.log("fdafafaf", data);
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
.all-notaries {
  padding: 2rem;
  .title {
    font-size: 26px;
    color: #0c57c0;
    font-weight: 600;
    text-align: center;
    text-shadow: 1px 1px 2px #717171;
  }

  .notaries-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 0 1rem;
    .title-2 {
      font-size: 16px;
      margin: 0;
      color: #e60000;
      // text-align: center;
      font-weight: 600;
    }
    @media screen and (max-width:900px) {
      flex-direction: column;
      .title-2 {
        font-size: 14px;
        text-align: center;
        margin-bottom: 1rem;
      }
    }
  }
  

  table th,
  table td {
    border: 1px solid #c3c3c3;
  }

  .ant-table-thead {
    .ant-table-cell:nth-child(1),
    .ant-table-cell:nth-child(2),
    .ant-table-cell:nth-child(3),
    .ant-table-cell:nth-child(4),
    .ant-table-cell:nth-child(5),
    .ant-table-cell:nth-child(6),
    .ant-table-cell:nth-child(7),
    .ant-table-cell:nth-child(8),
    .ant-table-cell:nth-child(9),
    .ant-table-cell:nth-child(10),
    .ant-table-cell:nth-child(11) {
      background-color: #0c57c0 !important;
      font-weight: 700;
      font-size: 15px;
      color: #fff;
    }
  }

  .ant-table-row {
    .ant-table-cell:nth-child(3),
    .ant-table-cell:nth-child(4),
    .ant-table-cell:nth-child(5) {
      background-color: #fffbe2 !important;
    }
  }
  .ant-table-row {
    .ant-table-cell:nth-child(6) {
      background-color: #f9eef8 !important;
    }
  }
  .ant-table-row {
    .ant-table-cell:nth-child(2) {
      background-color: #d5ffe7 !important;
    }
  }

  .ant-table-row {
    .ant-table-cell:nth-child(7) {
      // position: relative;
    }

    .ant-table-cell:nth-child(8) {
      // position: relative;
    }
  }
}

.style-price {

  h1 strong,
  h2 strong {
    font-size: 18px;
    font-weight: 700;
  }

  strong {
    font-weight: 500;
    font-size: 13px;
  }
}

.style-conditions {

  h1 strong,
  h2 strong {
    font-size: 14px;
  }
}

.style-price,
.style-conditions {

  h1 strong,
  h2 strong {
    // outline: 1px solid red;
    width: 100%;
    display: block;
    height: 20px;
  }

  strong {
    // outline: 1px solid green;
    width: 100%;
    display: block;
    // height: 20px;
  }
}

.style-contact {
  p {
    margin: 4px;
  }

  p strong {
    font-weight: 500;
    font-size: 14px;
    display: block;
  }
}
</style>