<template>
  <section>
    <a-flex align="center" :gap="8">
      <router-link to="/admin/convenios/ugse">
        <LeftOutlined /> Atrás
      </router-link>
      <h4 style="margin: 0;"> - COMPROMISOS - </h4>
      <span>{{ $router.currentRoute.value.params.name }}</span>
 
    </a-flex>
    <br>
    <a-button type="primary" @click="showDrawer">NUEVO</a-button>
    
    <br>
    <br>
  
    
    <a-table 
    bordered
    :scroll="{ x: 200 }" 
    class="table-compromisos" 
    :columns="columns"
    :data-source="dataSource" 
    :pagination="false" 
    :loading="loading" 
    size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>
        <template v-if="column.dataIndex == 'type'">
          <a-tag><span style="text-transform: uppercase;">{{ record.type }}</span></a-tag>
        </template>

        <template v-if="column.dataIndex == 'avances'">
          <span>{{ record.commitments.length }}</span>
        </template>

        <template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleOpenDrawAcion(record)">Nueva acción</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleOpenAcciones(record)">Ver Acciones</a>
                </a-menu-item>
                <!-- <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDelete(record)">
                    <template #icon><question-circle-outlined style="color: red" /></template>
                    <a>Eliminar</a>
                  </a-popconfirm>
                </a-menu-item> -->
              </a-menu>
            </template>
          </a-dropdown>
        </template>

      </template>
    </a-table>


    <!-- <pre>{{ dataSource }}</pre> -->
    <a-drawer v-model:open="open" title="Registrar un compromiso" placement="right" width="450px">
      <Compromisos @closeDraw="closeDrawer" /> 
    </a-drawer>

    <a-drawer v-model:open="drawAcion" title="Registrar un acción" placement="right" width="450px">
      <Acciones :dataRow="dataRow" @closeDraw="closeDrawer" />
    </a-drawer>

    <a-drawer v-model:open="openDetails" title="Detalles" placement="right" width="600px">
      <AccionesDetalles :dataRow="dataRow" />
    </a-drawer>

  </section>
</template>

<script setup>
import { h, ref, onMounted, computed } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { useRoute, useRouter } from 'vue-router';
import { MoreOutlined, LeftOutlined } from '@ant-design/icons-vue';
import Compromisos from './components/DrawCompromisos.vue';
import Acciones from './components/DrawAccionesUgse.vue';
import AccionesDetalles from './components/DrawAccionesDetalle.vue';

const open = ref(false);
const openDetails = ref(false);
const dataRow = ref(null);
const pageSize = 50;
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const dataSource = ref([]);
const drawAcion = ref(false);

const columns = [
  { title: '#',                             dataIndex: 'idx', align: 'center', width: 70 },
  { title: 'TÍTULO',                        dataIndex: 'title', width: 120 },
  { title: 'TIPO',                          dataIndex: 'type', width: 120, align: 'center' },
  { title: 'DESCRIPCIÓN',                   dataIndex: 'description', width: 180 },
  { title: 'BENEFICIARIOS',                 dataIndex: 'meta', width: 140, align: 'center' },
  { title: 'AVANCES',                       dataIndex: 'avances', width: 80, align: 'center' },
  { title: '',                              dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }
  // { title: 'ACCIONES', dataIndex: 'acciones', align: 'center', width: 100 },
];

const handleOpenAcciones = (data) => {
  dataRow.value = data;
  openDetails.value = true;
}
const handleOpenDrawAcion = (data) => {
  dataRow.value = data;
  drawAcion.value = true;
}
const closeDrawer = () => {
  fetchData();
  open.value = false;
  drawAcion.value = false;
}
const showDrawer = () => {
  open.value = true;
};
const params = ref({
  page: 1
});

const computeIndex = computed(() => (index) => {
  return (params.value.page - 1) * pageSize + index + 1;
});

const fetchData = async() => {
  loading.value = true;
  try {
    const data = await makeRequest({ url: `agreement/all-commitments/${route.params.id}`, method: 'GET' });
    if (data.status == 200) {
      dataSource.value = data.data;
    }
  } catch (error) {
    
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss">
.table-compromisos {
  tr {
    font-size: 13px;
  }
  .ant-empty-description {
    font-size: 13px;
  }
}
</style>