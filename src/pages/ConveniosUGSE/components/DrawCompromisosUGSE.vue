<template>
  <section>
    <a-tabs v-model:activeKey="activeKey" @change="handleEventTab">
      <a-tab-pane key="1">
        <template #tab>
          <span style="font-size: 13px;">
            <!-- <BorderOutlined /> -->
            TU EMPRESA
          </span>
        </template>

        <a-spin :spinning="spinning">
          <div v-if="tuempresas.length >= 1">
            <div class="compromiso compromiso-head">
              <span>#</span>
              <span>COMPROMISOS</span>
              <span style="text-align: center;">¿CUMPLIÓ?</span>
            </div>

            <div class="compromiso compromiso-body" v-for="(item, idx) in tuempresas" :key="idx">
              <span class="compromiso-number">{{ idx + 1 }}</span>
              <p>{{ item.commitment }}</p>
              <span class="compromiso-check">
                <a-checkbox v-model:checked="item.fulfilled" @change="handleChangeStatus(item.id)"></a-checkbox>
              </span>
            </div>
          </div>

          <a-empty v-else :image="simpleImage" />
        </a-spin>

      </a-tab-pane>


      <a-tab-pane key="2">
        <template #tab>
          <span style="font-size: 13px;">
            <SolutionOutlined />
            ALIADO
          </span>
        </template>

        <a-spin :spinning="spinning">
          <div v-if="tuempresas.length >= 1">
            <div class="compromiso compromiso-head">
              <span>#</span>
              <span>COMPROMISOS</span>
              <span style="text-align: center;">¿CUMPLIÓ?</span>
            </div>

            <div class="compromiso compromiso-body" v-for="(item, idx) in aliados" :key="idx">
              <span class="compromiso-number">{{ idx + 1 }}</span>
              <p>{{ item.commitment }}</p>
              <span class="compromiso-check">
                <a-checkbox v-model:checked="item.fulfilled" @change="handleChangeStatus(item.id)"></a-checkbox>
              </span>
            </div>
          </div>

          <a-empty v-else :image="simpleImage" />
        </a-spin>

      </a-tab-pane>
    </a-tabs>



    <div class="convenios-form">
      <h4>Regitsrar nuevo compromiso - TU EMPRESA</h4>

      <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
        @finishFailed="onFinishFailed">

        <a-form-item label="Descripción:" name="commitment"
          :rules="[{ required: true, message: 'Por favor menciona el compromiso' }]">
          <a-textarea v-model:value="formState.commitment" :rows="4" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
        </a-form-item>

      </a-form>
    </div>

  </section>

</template>


<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { Empty } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { BorderOutlined, SolutionOutlined } from '@ant-design/icons-vue';


const props = defineProps(['convenio']);
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const activeKey = ref('1');
const checked = ref(false);
const loading = ref(false);
const spinning = ref(false);
const tuempresas = ref([]);
const aliados = ref(null);

const formState = reactive({
  commitment: null
});

const handleEventTab = (a) => {
  fetchData();
}

const onSubmit = async () => {
  const payload = {
    commitment: formState.commitment,
    fulfilled: 0,
    type: activeKey.value == "1" ? 'tuempresa' : 'aliado',
    id_agreement: props.convenio.id
  }

  loading.value = true;

  try {
    const data = await makeRequest({ url: '/commitments/create', method: 'POST', data: payload });
    if (data.status == 200) {
      message.success('Compromiso agregado');
      formState.commitment = null;
      fetchData();
    }
  } catch (error) {
    message.error('Se presentó un error en el servidor');
  } finally {
    loading.value = false;
  }
};


const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const handleChangeStatus = async(id) => {
  try {
    const data = await makeRequest({ url: `/commitments/fulfilled/${id}`, method: 'PUT' });
    if (data.status == 200) {
      message.success(data.message);
    }
  } catch (error) {
    message.error('Se presentó un error en el servidor');
  }
}

const fetchData = async (data) => {
  spinning.value = true;
  try {
    const response = await makeRequest({ url: `commitments/list/${props.convenio.id}/${activeKey.value == "1" ? 'tuempresa' : 'aliado'}`, method: 'GET' });
    tuempresas.value = response.data
    aliados.value = response.data
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false;
  }
}

onMounted(() => {
  if (props.convenio) {
    fetchData(props.convenio);
  }
});

watch(() => props.convenio, (newValue) => {
  if (newValue) {
    fetchData(newValue);
  } else {
    console.log("Fetching data........");

  }
});
</script>

<style lang="scss">
.compromiso {
  display: grid;
  grid-template-columns: .2fr 3fr .4fr;
  // gap: 1rem;
  // padding: .5rem 1rem;
}

.compromiso-head {
  background-color: var(--primary);
  color: #fff;
  font-weight: 600;
  border-radius: 4px 4px 0 0;
  padding: .5rem .2rem .5rem 1rem;
  font-size: 13px;
}

.compromiso-body {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  font-size: 13px;
  line-height: 1.3;

  p {
    padding: .6rem 1rem;
    margin: 0;
  }
}

.compromiso-number {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #ccc;
}

.compromiso-check {
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #ccc;
}

.convenios-form {
  margin: 2rem 0;

  h4 {
    color: #000000e0;
    font-weight: 500;
  }
}
</style>