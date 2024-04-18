<template>

  <div class="all-notaries">
    <h1>CATÁLOGO DE NOTARIAS LIMA </h1>
    <h2>SI EL CAPITAL > 1 UIT (S/.5150) ADICIONAL PAGARÁ GASTOS REGISTRALES EN CUALQUIER NOTARIA</h2>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" class="ant-table-striped" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
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
import { ref, onMounted, h, onBeforeUnmount } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', fixed: 'left', dataIndex: 'idx', align: 'center', width: 70 },
  { title: 'REGIÓN', dataIndex: 'departamento', fixed: 'left', align: 'center', width: 120 },
  { title: 'PROVINCIA', fixed: 'left', dataIndex: 'province', align: 'center', width: 140 },
  { title: 'DISTRITO', fixed: 'left', dataIndex: 'distrite', width: 140 },
  { title: 'DIRECCION', fixed: 'left', dataIndex: 'address', align: 'center', width: 140 },
  { title: 'NOTARIA', fixed: 'left', dataIndex: 'namenotary', align: 'center', width: 180 },
  { title: 'GASTOS NOTARIALES', dataIndex: 'pricex', align: 'center', width: 280 },
  { title: 'CONDICIONES', dataIndex: 'pricedescriptionx', align: 'center', width: 260 },
  { title: 'SOCIO O INTERVINIENTE ADICIONAL', dataIndex: 'socio', align: 'center', width: 200 },
  { title: 'BIOMETRICO', dataIndex: 'bio', align: 'center', width: 180 },
  { title: 'DATOS DE CONTACTO', dataIndex: 'contact', align: 'center', width: 260 },
];

const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 250;
};

const fetchData = async () => {
  try {
    loading.value = true;
    const data = await requestNoToken({ url: 'notary/list', method: 'GET' });

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

<style lang="scss" scoped>
.custom-content {
  height: 100%;
  overflow: auto;
  outline: 1px solid red;
}

.all-notaries {
  padding: 2rem;

  h1,
  h2 {
    font-weight: 600;
    margin: 0 auto 1rem 0;
    text-align: center;
  }

  h1 {
    color: #0070c0;
  }

  h2 {
    color: #ff0000;
    font-size: 22px;
    margin-bottom: 2rem;
  }
}
</style>

<style lang="scss">
.all-notaries {

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
      background-color: #8eaadb !important;
      font-weight: 700;
      font-size: 15px;
    }
  }

  .ant-table-row {

    .ant-table-cell:nth-child(2),
    .ant-table-cell:nth-child(3),
    .ant-table-cell:nth-child(4) {
      background-color: #e7e6e6 !important;
    }
  }

  .ant-table-row {
    .ant-table-cell:nth-child(6) {
      background-color: #cfe2f3 !important;
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