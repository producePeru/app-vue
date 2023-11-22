<template>
  <h3>Calendario de talleres</h3>
  <br>
  <div :style="{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px', padding: '1rem'}">
    <a-calendar v-model:value="value" @panelChange="onPanelChange" :locale="locale">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
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

  <pre>::: {{ value }}</pre>
</template>

<script setup>
import { ref } from 'vue';

import locale from 'ant-design-vue/es/locale/es_ES';
import 'moment/locale/es'; 
import moment from 'moment';
// const value = ref(moment('11-5-2023', 'MM-DD-YYYY'));
// const locale = ref(moment.locale('es'));



const value = ref();

const getListData = (current) => {

  const dateKey = `${current.year()}-${current.month() + 1}-${current.date()}`;
  const simulatedData = {
    '2023-11-5': [
      {type: 'warning', content:'Taller es similar al Módulo de tarea y amplia su funcionalidad de diversas maneras. '},
      {type: 'success', content:'Taller de redes'},
      {type: 'warning', content:'Taller de redes'},
      {type: 'warning', content:'Taller de redes'}
    ]
  };

  return simulatedData[dateKey] || [];
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
</script>


<style scoped>
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