<template>
  <div>
    <h3>Mis cuestionarios</h3>
    
    <a-row class="table-header">
      <a-col :span="8">
        <router-link to="crear-cuestionario"><a-button type="primary">Crear cuestionario</a-button></router-link>
      </a-col>
      <a-col :span="8" :offset="8"></a-col>
    </a-row>

    <a-table 
    bordered
    class="ant-table-striped"
    :scroll="{ x: valueX }" 
    :columns="columns" 
    :data-source="dataSource" 
    :pagination="false"
    :loading="loading"
    size="small">
      <template v-slot:bodyCell="{column, record}">
        <template v-if="column.dataIndex == 'date'">
          <div class="text-center">
            <span>{{ handleCreationDate(record.created_at) }}</span>
          </div>
        </template> 
        <template v-if="column.dataIndex == 'questions'">
          <div class="text-center">
            <b>{{ record.questions.length }}</b>
          </div>
        </template>
        <template v-if="column.dataIndex == 'rating'">
          <div class="text-center">
            <a-tag :color="record.ratings.length >= 1 ? 'green' : 'orange'">{{ record.ratings.length >= 1 ? 'Si' : 'No' }}</a-tag>
          </div>
        </template>
        <template v-if="column.dataIndex == 'comments'">
          <div class="text-center">
            <a-tag :color="record.comments == 1 ? 'green' : 'orange'">{{ record.comments == 1 ? 'Si' : 'No' }}</a-tag>
          </div>
        </template>
        <template v-if="column.dataIndex == 'redes'">
          <div class="text-center">
            <a-tag :color="record.social == 1 ? 'green' : 'orange'">{{ record.social == 1 ? 'Si' : 'No' }}</a-tag>
          </div>
        </template>
        <template v-if="column.dataIndex == 'link'">
          <div class="text-center">
            <router-link :to="`/cuestionario/${record.slug}`">
              <LinkOutlined />
            </router-link>
          </div>
        </template>
      </template>
      
    </a-table>
  </div>

  <div class="paginator">
    <a-pagination size="small"  :total="total" :pageSize="20"  @change="handlePaginator" :showSizeChanger="false" />
  </div>

</template>

<script setup>

import { makeRequest } from '@/utils/api.js'
import { ref, onMounted } from 'vue';
import moment from 'moment';
import 'moment/locale/es';
import { LinkOutlined } from '@ant-design/icons-vue';
moment.locale('es');

const handleCreationDate = (date) => {
  return moment(date).format('l')
}

const loading = ref(false)
const valueX = ref(1200)
const total = ref(0)
const dataSource = ref([])

const params = ref({
  page: 1
})
const handlePaginator = (current) =>{
  params.value.page = current;
  fetchData()
}

const columns = [
  { title: 'Slug',            dataIndex: 'slug', fixed: 'left', width: 150},
  { title: 'Título',          dataIndex: 'title', width: 250},
  { title: 'Fecha creación',  dataIndex: 'date', width: 80, align: 'center'},
  { title: 'Preguntas',      dataIndex: 'questions', width: 70, align: 'center'},
  { title: 'Ratings',         dataIndex: 'rating', width: 40, align: 'center'},
  { title: 'Comentarios',     dataIndex: 'comments', width: 70, align: 'center'},
  { title: 'Redes',           dataIndex: 'redes', width: 40, align: 'center'},
  { title: 'Link',            dataIndex: 'link', width: 40, align: 'center'},
];

const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: '/questionnaries/ruta_digital', method: 'GET', params:params.value });
    dataSource.value = data.data
    total.value = data.total;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(
  fetchData
);
</script>

<style lang="scss">
.table-footer {
  background-color: #fafafa;
}
.paginator {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
.table-header {
  margin: 1rem 0;
}
.text-center {
  text-align: center;
}
</style>
