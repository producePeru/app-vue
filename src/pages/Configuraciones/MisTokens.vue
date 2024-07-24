<template>
  <div>
    <h3 class="title-produce">TOKENS</h3>

    <a-row style="margin: 1rem 0;">
      <a-col :xs="24" :md="12" :lg="18">
        <a-button type="primary" @click="showDrawer" style="margin-right: .5rem;">Nuevo Token</a-button>
        <a href="https://apis.net.pe/app/account/signup" target="_blank">Crear cuenta</a>
      </a-col>
    
    </a-row>

    <a-table bordered :scroll="{ x: valueX, y: valueY }" class="table-users" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ computeIndex(index) }}
        </template>
        <template v-if="column.dataIndex == 'date'">
          <div>{{ formatDate(record.created_at) }}</div>
        </template>
        
        <template v-if="column.dataIndex == 'status'">
          <a-radio-group v-model:value="value" @change="handleChooseToken(record)">
            <a-radio :value="record.id" />
          </a-radio-group>
        </template>

        <template v-if="column.dataIndex == 'test'">
          <a-button v-if="value == record.id" primary type="text" @click="handleTestToken" style="font-size: 13px;">PROBAR</a-button>
        </template>
        
      </template>
    </a-table>
  </div>

  <div class="paginator">
    <span><a-tag color="blue"><b>{{ total }} </b></a-tag>Itens</span>
    <a-pagination size="small" :total="total" :pageSize="pageSize" @change="handlePaginator" :showSizeChanger="false" />
  </div>

  <a-drawer v-model:open="open" class="draw-notary" root-class-name="root-class-name" title="Tokens" placement="right" width="500" >
    <NuevoToken @closeDraw="closeDrawer" />
  </a-drawer>

</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { ref, onMounted, h, onBeforeUnmount, computed, reactive } from 'vue';
import { MoreOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useCounterStore } from '@/stores/selectes.js';
import moment from 'moment';
import NuevoToken from './components/NuevoToken.vue'

const store = useCounterStore();
store.$patch({ cdes: store.cdes });

const open = ref(false);
const value = ref(1);
const selectedRow = ref(null);
const updateUser = ref(null);
const spinning = ref(false);
const openModal = ref(false);
const current = ref(0);

const rol = ref('solicitante');
const pageSize = ref(50);
const dataSource = ref([])
const loading = ref(false)
const total = ref(0)
const router = useRouter();
const params = ref({ page: 0 });
const url = ref('token/list')
const valueX = ref(1200)
const valueY = ref(window.innerHeight - 100);

const columns = [
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 20 },
  { title: 'NOMBRE', dataIndex: 'name', width: 60 },
  { title: 'TOKEN', dataIndex: 'token', fixed: 'left', width: 120 },
  { title: 'TOTAL', dataIndex: 'count', width: 30, align: 'center'},
  { title: 'CREADO', dataIndex: 'date', width: 50 },
  { title: 'ACTIVADO', dataIndex: 'status', width: 30, align: 'center'},
  { title: 'TEST', dataIndex: 'test', width: 30, align: 'center'},
  // { title: '', dataIndex: 'actions', align: 'center', width: 20, fixed: 'right' }
];

const actualizarAltura = () => {
  valueY.value = window.innerHeight - 300;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});

const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY HH:mm A');
}
const handleChooseToken = async(token) => {
  await makeRequest({ url: `token/update-status/${token.id}`, method: 'PUT' });
}
const handleTestToken = async() => {
  try {
    const response = await makeRequest({ url: `user/only-dni/45424747`, method: 'GET' });
    console.log("response: ", response);

    if(response.status == 429) {
      return message.warning(response.message);
    }
    if(response.status == 401) {
      return message.error(response.message);
    }

    message.success("Puedes usar este token");

  } catch (error) {
    console.error('Error de red:', error);
  }
}
const showDrawer = () => {
  open.value = true;
};
const closeDrawer = () => {
  fetchData();
  open.value = false;
}
const handlePaginator = (current) => {
  params.value.page = current;
  fetchData()
}

// const handleDeleteUser = async (val) => {
//   try {
//     const data = await makeRequest({ url: `user/only-dni/45424747/1`, method: 'GET' });
//     if (data) {
//       fetchData();
//       message.success(data.message);
//     }
//   } catch (error) {
//     console.error('Error de red:', error);
//   }
// }

const fetchData = async (val) => {
  try {
    loading.value = true;

    let parx;
    parx = params.value.page == 0 ? '' : params.value;
    parx = val ? { ...parx, ...val } : parx;

    const  response  = await makeRequest({ url: url.value, method: 'GET', params: parx });
    const data = response.data

    dataSource.value = data.data
    total.value = data.total;
    pageSize.value = data.per_page;
    value.value = response.id_active;
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const computeIndex = computed(() => (index) => {
  return (params.value.page) * pageSize.value + index + 1;
});

onMounted(() => {
  fetchData();
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
});
</script>

<style lang="scss">
.paginator {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.table-users {
  tr {
    font-size: 13px;
  }
}
</style>