<template>

  <div class="all-notaries">
    <h1>CATÁLOGO DE NOTARIAS LIMA </h1>
    <h2>SI EL CAPITAL > 1 UIT (S/.5150) ADICIONAL PAGARÁ GASTOS REGISTRALES EN CUALQUIER NOTARIA</h2>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" class="ant-table-striped" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record }">

        <template v-if="column.dataIndex == 'lastName'">
          {{ record.last_name }} {{ record.middle_name }}
        </template>
        <template v-if="column.dataIndex == 'departamento'">
          {{ record.department?.descripcion }}
        </template>
        <template v-if="column.dataIndex == 'province'">
          {{ record.province?.descripcion }}
        </template>
        <template v-if="column.dataIndex == 'distrite'">
          {{ record.district?.descripcion }}
        </template>


      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, onMounted, h, onBeforeUnmount } from 'vue';

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#',           dataIndex: 'lastName', fixed: 'left', width: 70 },
  { title: 'REGIÓN',             dataIndex: 'name', fixed: 'left', width: 120 },
  { title: 'PROVINCIA',      dataIndex: 'document_type', align: 'center', width: 100},
  { title: 'DISTRITO',      dataIndex: 'number_document', align: 'center', width: 120},
  { title: 'DIRECCION',        dataIndex: 'departamento', align: 'center', width: 140},
  { title: 'NOTARIA',           dataIndex: 'province', align: 'center', width: 140},
  { title: 'GASTOS NOTARIALES',            dataIndex: 'distrite', align: 'center', width: 140},
  { title: 'CONDICIONES',            dataIndex: 'distrite', align: 'center', width: 140},
  { title: 'SOCIO O INTERVINIENTE ADICIONAL',            dataIndex: 'distrite', align: 'center', width: 140},
  { title: 'BIOMETRICO',              dataIndex: 'email', width: 180},
  { title: 'DATOS DE CONTACTO',             dataIndex: 'phone', width: 100},
];

const dataSource = [
          {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },
          {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          }, {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          }, {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          }, {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          }, {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          }, {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          }, {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          }, {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },
          {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },
          {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
          },
        ];

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 250;
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});
onMounted(() => {
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
});
</script>

<style lang="scss" scoped>
.all-notaries {
  padding: 2rem;
  h1, h2 {
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