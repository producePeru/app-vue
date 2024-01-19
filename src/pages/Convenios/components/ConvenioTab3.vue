<template>
  
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="showModal">Agregar</a-button>
  <br>
  <a-table 
  bordered
  :pagination="false"
  :scroll="{ x: valueX}" 
  :data-source="dataSource" 
  :columns="columns">
  <template v-slot:bodyCell="{column, record}">
    <template v-if="column.dataIndex == 'date'">
      <div>
        {{ record.date }}
      </div>
    </template>
    <template v-if="column.dataIndex == 'first'">
      <div>
        <span class="btn-uppdf">Subir archivo PDF</span>
      </div>
    </template>
    <template v-if="column.dataIndex == 'second'">
      <div>
        {{ record.date }}
      </div>
    </template>
    <template v-if="column.dataIndex == 'third'">
      <div>
        {{ record.date }}
      </div>
    </template>
    <template v-if="column.dataIndex == 'fourth'">
      <div>
        {{ record.date }}
      </div>
    </template>
    <template v-if="column.dataIndex == 'closure'">
      <div>
        {{ record.date }}
      </div>
    </template>
  </template>
  </a-table>

  <a-modal v-model:open="open" title="Agregar un informe" @ok="handleOk" width="400px" ok-text="Crear">
    <p>Selecciona la fecha de inicio del informe</p>
    <a-date-picker :locale="locale" v-model:value="dateReport" class="w-100" />
    <br><br>
  </a-modal>

  <pre>{{ dataSource }}</pre>

</template>
<script setup>
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');
import { ref } from 'vue';

const valueX = ref(1000)
const open = ref(false);
const dateReport = ref();
const dataSource = ref([]);

const columns = [
  { title: 'Fecha de informe',                dataIndex: 'date', fixed: 'left', align: 'center'},
  { title: 'Archivo del Primer Trimestre',    dataIndex: 'first', align: 'center'},
  { title: 'Archivo del Segundo Trimestre',   dataIndex: 'second', align: 'center'},
  { title: 'Archivo del Tercer Trimestre',    dataIndex: 'third', align: 'center'},
  { title: 'Archivo del Cuarto Trimestre',    dataIndex: 'fourth', align: 'center', },
  { title: 'Archivo de cierre',               dataIndex: 'closure', align: 'center'}
];

const showModal = () => {
  open.value = true;
};
const handleOk = () => {
  open.value = false;
  const obj = {
    date: dateReport.value,
    first: null,
    second: null,
    third: null,
    fourth: null,
    closure: null,
  }
  dataSource.value = [...dataSource.value, obj]
};

</script>

<style>
.w-100 {
  width: 100%;
}
</style>