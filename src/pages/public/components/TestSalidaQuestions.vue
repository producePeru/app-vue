<template>
  <a-spin v-if="isloading" />

  <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onSubmit" @finishFailed="onFinishFailed">
    
    <div v-if="dataTestArr">
      <div class="box" v-for="(item, idx) in 5" :key="idx">
        <span class="box-mensagge">Pregunta {{ idx + 1 }}</span>
        <h3 class="box-title">{{ dataTestArr['question' + (idx + 1)] }}</h3>

        <a-form-item :name="`ts${idx + 1}`" :rules="[{ required: true, message: 'Escoge una respuesta' }]">
          <a-radio-group class="group-radios" v-model:value="formState[`ts${idx + 1}`]">

            <template v-for="(radio, jdx) in 3" :key="jdx">
              <a-radio class="item-radio" :value="jdx + 1">{{ dataTestArr[`question${idx + 1}_opt${jdx + 1}`] }}</a-radio>
            </template>
          </a-radio-group>
        </a-form-item>
      </div>
    </div>

    <div class="box rate" v-if="dataTestArr">
      <div>
        <h3 class="box-title">{{ dataTestArr.satistaction1 }}</h3>
        <a-rate class="star-rate" v-model:value="formState.rate_1" />
      </div>
      <div class="rate-wrapper">
        <h3 class="box-title">{{ dataTestArr.satistaction2 }}</h3>
        <a-rate class="star-rate" v-model:value="formState.rate_2" />
      </div>
      <div>
        <h3 class="box-title">{{ dataTestArr.satistaction3 }}</h3>
        <a-rate class="star-rate" v-model:value="formState.rate_3" />
      </div>
    </div>

    <div class="box" v-if="dataTestArr">
      <span class="box-mensagge">Sugerencias</span>
      <h3 class="box-title">{{ dataTestArr.comments }}</h3>
      <a-textarea v-model:value="formState.comments" allow-clear />
    </div>

    <div class="box-btn">
      <a-button type="primary" html-type="submit" :loading="submitLoading">ENVIAR</a-button>
    </div>

  </a-form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { requestNoToken } from '@/utils/noToken.js'

const props = defineProps(['workshop', 'rucdni'])

const router = useRouter();
const submitLoading = ref(false)
const dataTestArr = ref(null)
const isloading = ref(true);

const formState = reactive({
  ruc: null,
  dni: null,
  ts1: null,
  ts2: null,
  ts3: null,
  ts4: null,
  ts5: null,
  rate_1: null,
  rate_2: null,
  rate_3: null,
  comments: null
});


const scrollTop = () => {
  window.scrollTo({
    top: 200,
    behavior: 'smooth'
  });
}

const onSubmit = async () => {
  const payload = {
    ts1: formState.ts1,
    ts2: formState.ts2,
    ts3: formState.ts3,
    ts4: formState.ts4,
    ts5: formState.ts5,
    c1: formState.rate_1,
    c2: formState.rate_2,
    c3: formState.rate_3,
    suggestions: formState.comments,

    ruc_mype: props.rucdni.ruc,
    dni_mype: props.rucdni.number_document,
    workshop_id: props.workshop.id
  }

  submitLoading.value = true;
  try {

    await requestNoToken({ url: `/sending-test-answers/${props.workshop.id_out}`, method: 'POST', data: payload });
    const query = {
      status: 'success',
      title: '¡Gracias por participar de este formulario!',
      subTitle: 'Seguiremos desarrollando más talleres para tí'
    }

    router.push({ name: 'enviado', query });

  } catch (error) {
    console.error('Error:', error.response.data.errors[0]);
  } finally {
    submitLoading.value = false;
  }
};
const onFinishFailed = () => {
  message.error('Debes de completar todos los datos');
  scrollTop()
};

const fetchOut = async () => {
  try {
    const { data } = await requestNoToken({ url: `/testout-questions/${props.workshop.id}`, method: 'GET' });
    dataTestArr.value = data
    isloading.value = false;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(
  fetchOut
);
</script>


<style scoped lang="scss">
.star-rate {
  font-size: 24px;
  margin-bottom: .6rem;
  position: relative;
  top: -.4rem;
}
.box {
  padding: 0.5rem 1rem;
  background: #fff;
  border-radius: 8px;
  .box-info-workshop {
    display: flex;
    flex-direction: column;
    line-height: 1.6;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  .box-mensagge {
    font-size: 14px;
    margin-bottom: .2rem;
    display: block;
    color: #e31d1a;
  }

  .group-radios {
    display: flex;
    flex-direction: column;
    .item-radio {
      border: 1px solid rgba(5, 5, 5, 0.06);;
      padding: .6rem;
      font-size: 15px;
      margin: 5px 0;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.3;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    }
  }
}
.box-btn {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 2rem;
  .btn {
    margin: 0 !important;
  }
}
</style>