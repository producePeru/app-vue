<template>
  <h3>Calendario de talleres</h3>
  <br>
  <div :style="{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px', padding: '1rem'}">
    <a-calendar v-model:value="value" @panelChange="onPanelChange">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" @click="handleSelectDay" />
          </li>
        </ul>
      </template>
      <template #monthCellRender="{ current }">
        <div v-if="getMonthData(current)" class="notes-month">
          <section>{{ getMonthData(current) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>  
  </div>




  <a-modal v-model:open="open" title="Detalles del día" >
    <!-- <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p> -->

    <template #footer>
      <a-button key="back">Cerrar</a-button>
    </template>
  </a-modal>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js'

const open = ref(false);
const value = ref();
const simulatedData = ref({});

const getListData = (current) => {
  const dateKey = `${current.year()}-${current.month() + 1}-${current.date()}`;
  return simulatedData.value[dateKey] || [];
};

const getMonthData = (current) => {
  const monthData = {
    8: '20 talleres',
    9: '10 talleres'
  };

  return monthData[current.month()];
};

const onPanelChange = (value, mode) => {
  console.log(value, mode);
};
const handleSelectDay = (val, string) => {
  console.log("jasjakjska", val);
  open.value = true
}


const fetchData = async() => {
  try {
    const data = await makeRequest({ url: '/workshop/bydate', method: 'GET' });
    simulatedData.value = data;
  } catch (error) {
    console.error('Error de red:', error);
  } 
};

onMounted(
  fetchData
);
</script>


<style lang="scss" scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}


</style>

<style lang="scss">
.ant-picker-cell {
  padding: 0;
  border: 1px solid #4096ff !important;
}
.ant-picker-calendar-date {
  border-top: none !important;
  margin: 0 !important;
}
.ant-picker-calendar-date-today {
  margin: 0;
  padding: 0;
}
</style>