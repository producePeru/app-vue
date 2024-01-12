<template>
  <a-button type="primary" @click="showDrawer">NUEVO</a-button>
  <a-drawer
    v-model:open="open"
    title="Nuevo compromiso"
    placement="right"
    @close="closeDrawer"
    @after-open-change="afterOpenChange">
    
    <CompromisosConvenios @handleCreateItem="handleCreateItem" />

  </a-drawer>


  <section>
    <br> <br>
    <h3>COMPROMISOS</h3> 
  
    <div>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1">
          <template #tab>
            <span>
              <HomeOutlined />
              Tu empresa
            </span>
          </template>

          <a-spin :spinning="spinning" />
          <div class="wrapper" v-for="(item,idx) in arrEmpresa" :key="idx">
            <div class="compromission">
              <div>{{ idx + 1 }}</div>
              <div class="details">
                <p>{{ item.description }}</p>
                <template v-if="item.isMeta">
                  <span><b>Unidad de medida: </b> {{ item.unitMeasurement }}</span>
                  <span><b>Meta numérica: </b> {{ item.metaNumb }}</span>
                </template>
              </div>
              <div>
                <EditOutlined class="action" />
                <DeleteOutlined class="action action-delete" />
              </div>
            </div>
          </div>

        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span>
              <UsergroupAddOutlined />
              Aliado
            </span>
          </template>
          
          <div class="wrapper" v-for="(item,idx) in arrAlidado" :key="idx">
            <div class="compromission">
              <div>{{ idx + 1 }}</div>
              <div class="details">
                <p>{{ item.description }}</p>
                <template v-if="item.isMeta">
                  <span><b>Unidad de medida: </b> {{ item.unitMeasurement }}</span>
                  <span><b>Meta numérica: </b> {{ item.metaNumb }}</span>
                </template>
              </div>
              <div>
                <EditOutlined class="action" />
                <DeleteOutlined class="action action-delete" />
              </div>
            </div>
          </div>

        </a-tab-pane>
      </a-tabs>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CompromisosConvenios from './components/DrawerCompromisos.vue'
import { HomeOutlined, UsergroupAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { makeRequest } from '@/utils/api.js'
import { useRoute } from 'vue-router';

const route = useRoute();
const open = ref(false);
const activeKey = ref('1');

const arrEmpresa = ref([])
const arrAlidado = ref([])
const spinning = ref(false);

const afterOpenChange = bool => {
  console.log('open', bool);
};
const closeDrawer = bool => {
  console.log("7777", bool);
}
const showDrawer = () => {
  open.value = true;
};
const handleCreateItem = (val) => {
  if(val) fetchData();
}


const fetchData = async() => {
  spinning.value = true;
  try {
    const {data} = await makeRequest({ url: `/agreements/commitments/${route.params.id}`, method: 'GET' });
    arrEmpresa.value = data[0]['empresa'];
    arrAlidado.value = data[1]['aliados']; 
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false
  }
}

onMounted(() => {
  fetchData()
});
</script>

<style lang="scss" scoped> 
.wrapper {
  &:last-child div {
    border: none;
  }
}
.compromission {
  display: grid;
  grid-template-columns: 12px 2fr .5fr;
  grid-gap: 1rem;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  .details {
    display: flex;
    flex-direction: column;
    b {
      font-weight: 500;
    }
  }
  .action {
    margin-left: .8rem;
    cursor: pointer;
  }
  .action-delete {
    color: #ff4d4f;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 20px 2fr 300px;
  }
}
</style>