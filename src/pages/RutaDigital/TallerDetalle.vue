<template>
  <div>
    
    <a-breadcrumb>
      <a-breadcrumb-item><router-link to="/admin/ruta-digital/talleres">Volver a Talleres de Ruta Digital</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Detalles del taller</a-breadcrumb-item>
    </a-breadcrumb>
    <br>
    <div>
      <span>Detalles:</span>
      <h3 class="c-primary details-title">{{ $route.query.taller }}</h3>
      <span>fecha del taller</span>
      <h3>{{ $route.query.date }}</h3>
      <span>Total inscritas</span>
      <div>
        <a-tag color="processing">{{ total }}</a-tag>
      </div>

    </div>
    
    <!-- <div>
      <div class="flex-baseline">Participantes: <h3> 100</h3></div>
      <div class="flex-baseline">Completados: <h3> 80</h3></div>
    </div> -->

   
    <div class="average">
      <a-button type="primary" :loading="loadingAverage" @click="handleAverageFinal">Promediar</a-button>
    </div>

    <a-table 
    bordered
    class="ant-table-striped"
    :scroll="{ x: valueX }"
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">

    <template #headerCell="{ column }">
      <template v-for="(item, i) in 5" :key="i">
        <div v-if="column.key === `te${i + 1}`">
          <span>
            <a-tooltip>
              <template #title>{{ questions[`q_testin_${i+1}`] }}</template>
              {{ `TE${i+1}` }} <QuestionCircleOutlined class="tooltip-table" />
            </a-tooltip>
          </span>
        </div>
      </template>

      <template v-for="(item, i) in 5" :key="i">
        <div v-if="column.key === `ts${i + 1}`">
          <span>
            <a-tooltip>
              <template #title>{{ questions[`q_testout_${i+1}`] }}</template>
              {{ `TS${i+1}` }} <QuestionCircleOutlined class="tooltip-table" />
            </a-tooltip>
          </span>
        </div>
      </template>
    </template>


    <template v-slot:bodyCell="{column, record}">
      <template v-for="(item, i) in 5" :key="i">
        <div v-if="column.dataIndex === `te${i + 1}`">
          <span class="ncheck">
            {{
              record[`te${i + 1}`] === 4 ? '✔️' :
              record[`te${i + 1}`] === 0 ? '❌' :
              record[`te${i + 1}`] === null ? '-' :
              ''
            }}
          </span>
        </div>
      </template>

      <template v-for="(item, i) in 5" :key="i">
        <div v-if="column.dataIndex === `ts${i + 1}`">
          <span class="ncheck">
            {{
              record[`ts${i + 1}`] === 4 ? '✔️' :
              record[`ts${i + 1}`] === 0 ? '❌' :
              record[`ts${i + 1}`] === null ? '-' :
              ''
            }}
          </span>
        </div>
      </template>

      <!-- promedios -->
      <template v-if="column.dataIndex == 'te_note'">
        <span v-if="record.te_note">
          <b>{{ record.te_note }} </b>
        </span>
      </template>
      <template v-if="column.dataIndex == 'ts_note'">
        <span v-if="record.ts_note">
          <b>{{ record.ts_note }} </b>
        </span>
      </template>
      <template v-if="column.dataIndex == 'average_final'">
        <span v-if="record.average_final">
          <b class="average-final">{{ record.average_final }} </b>
        </span>
      </template>
      <template v-if="column.dataIndex == 'average_satisfaction'">
        <span v-if="record.average_satisfaction">
          <b>{{ record.average_satisfaction }} %</b>
        </span>
      </template>
      <!-- promedios -->

      <template v-if="column.dataIndex == 'c1'">
        <span v-if="record.c1">
          {{ record.c1 * 20 }} % 
        </span>
      </template>
      <template v-if="column.dataIndex == 'c2'">
        <span v-if="record.c1">
          {{ record.c2 * 20 }} % 
        </span>
      </template>
      <template v-if="column.dataIndex == 'c3'">
        <span v-if="record.c1">
          {{ record.c3 * 20 }} % 
        </span>
      </template>

      <template v-if="column.dataIndex == 'suggest'">
        <a-button v-if="record.suggestions" size="small" @click="handleOpenModal(record)">Ver</a-button>
      </template>
      </template>
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small" :total="total" :pageSize="20"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <!-- modal -->
  <a-modal v-model:open="open" title="Sugerencias" :footer="null" width="350px">
    <div class="details-modal" v-if="dataModal">
      <b>RUC</b> <span>{{ dataModal.ruc_mype }}</span>
      <b>Sugerencia</b> <span>{{ dataModal.suggestions }}</span>
    </div>
  </a-modal>

</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { useRouter,useRoute } from 'vue-router';
import { ref, onMounted, reactive, h } from 'vue';
import { MoreOutlined,DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const router = useRouter();
const route = useRoute();

const dataSource = ref([])
const questions = ref([])

const loading = ref(false)
const loadingAverage = ref(false)
const valueX = ref(1000)
const valueY = ref('60vh')
const open = ref(false);
const dataModal = ref(false);
const total = ref(0)
const idUserSelected = ref(null)

const params = ref({
  page: 1
})

const columns = [
  { title: 'RUC',             dataIndex: 'ruc_mype', fixed: 'left', width: 150 },
  { title: 'TE1',             dataIndex: 'te1', align: 'center', width: 60, key: 'te1'},
  { title: 'TE2',             dataIndex: 'te2', align: 'center', width: 60, key: 'te2'},
  { title: 'TE3',             dataIndex: 'te3', align: 'center', width: 60, key: 'te3'},
  { title: 'TE4',             dataIndex: 'te4', align: 'center', width: 60, key: 'te4'},
  { title: 'TE5',             dataIndex: 'te5', align: 'center', width: 60, key: 'te5'},
  { title: 'Nota',            dataIndex: 'te_note', align: 'center', width: 70},
  { title: 'TS1',             dataIndex: 'ts1', align: 'center', width: 60, key: 'ts1'},
  { title: 'TS2',             dataIndex: 'ts2', align: 'center', width: 60, key: 'ts2'},
  { title: 'TS3',             dataIndex: 'ts3', align: 'center', width: 60, key: 'ts3'},
  { title: 'TS4',             dataIndex: 'ts4', align: 'center', width: 60, key: 'ts4'},
  { title: 'TS5',             dataIndex: 'ts5', align: 'center', width: 60, key: 'ts5'},
  { title: 'Nota',            dataIndex: 'ts_note', align: 'center', width: 70},

  { title: 'Promedio Final',  dataIndex: 'average_final', align: 'center', width: 120},

  { title: 'C1',                    dataIndex: 'c1', align: 'center', width: 70},
  { title: 'C2',                    dataIndex: 'c2', align: 'center', width: 70},
  { title: 'C3',                    dataIndex: 'c3', align: 'center', width: 70},
  { title: 'Promedio Satisfacción', dataIndex: 'average_satisfaction', align: 'center', width: 120},
  { title: 'Sugerencias',           dataIndex: 'suggest', align: 'center', width: 100},
];

const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}
const handleAverageFinal = async() => {
  try {
    loadingAverage.value = true;
    const data = await makeRequest({ url: `/workshop/details/average`, method: 'PUT' });
    fetchData()
    message.success(data.message);
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loadingAverage.value = false;
  }
}
const handleOpenModal = (row) => {
  dataModal.value = row;
  open.value = true;
};

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `/workshop/details/${route.query.id}`, method: 'GET', params:params.value });
    dataSource.value = data.data
    total.value = data.total;

    if(data.data.length < 1) return
    fetchAllQuestions(data?.data[0]?.workshop_id)

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const fetchAllQuestions = async(idWorkshop) => {
  try {
    const data = await makeRequest({ url: `/test-all-questions/${idWorkshop}`, method: 'GET'});
    questions.value = data
  } catch (error) {
    console.error('Error de red:', error);
  }
}
onMounted(() => {
  fetchData()

});
</script>

<style scoped>
.details-title {
  margin: 10px 0;
}
.filters {
  margin: 1rem 0;
}
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
.ncheck {
  font-size: 8px;
}
.tooltip-table {
  color: #1677ff;
  font-size: 11px;
}
.average {
  margin-bottom: .5rem;
  display: flex;
  justify-content: flex-end;
}
.average-final {
  color: #1677ff;
}
</style>

