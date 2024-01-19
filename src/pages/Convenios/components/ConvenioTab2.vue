<template>
  <section>
    <a-table
    bordered 
    :columns="columns" 
    :data-source="data" 
    :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'idx'">
          <span>{{ record.key }}</span>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const columns = [
  { title: '#',                           dataIndex: 'options', fixed: 'left', width: 0},
  { title: 'Descripción del compromiso',  dataIndex: 'pdf', fixed: 'left', width: 200},
  { title: 'Aliado / PNTE',               dataIndex: 'socialReason', fixed: 'left', width: 80},
  { title: 'Avance',                      dataIndex: 'category', align: 'center', width: 80},
  { title: 'Porcentaje',                  dataIndex: 'type', align: 'center', width: 80 },
  { title: 'Detalles',                    dataIndex: 'department', align: 'center', width: 80 }
];

const data = ref([]);
</script>