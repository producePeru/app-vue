<template>

  <a-spin v-if="isloading" />

  <a-form v-else layout="vertical" :model="formState" autocomplete="off" @finish="onSubmit" @finishFailed="onFinishFailed">

    <div v-if="dataTestArr">
      <div class="box" v-for="(item, idx) in 5" :key="idx">
        <span class="box-mensagge">Pregunta {{ idx + 1 }}</span>
        <h3 class="box-title">{{ dataTestArr['question' + (idx + 1)] }}</h3>

        <a-form-item :name="`te${idx + 1}`" :rules="[{ required: true, message: 'Escoge una respuesta' }]">
          <a-radio-group class="group-radios" v-model:value="formState[`te${idx + 1}`]">

            <template v-for="(radio, jdx) in 3" :key="jdx">
              <a-radio class="item-radio" :value="jdx + 1">{{ dataTestArr[`question${idx + 1}_opt${jdx + 1}`] }}</a-radio>
            </template>
          </a-radio-group>
        </a-form-item>
      </div>
    </div>

    <div class="box">
      <span class="box-mensagge">Opcional</span>
      <h3 class="box-title">¿Cómo te enteraste del taller?</h3>
      <a-radio-group class="group-radios" v-model:value="formState.social">
        <a-radio class="item-radio" value="rrss">Redes sociales</a-radio>
        <a-radio class="item-radio" value="sms">SMS</a-radio>
        <a-radio class="item-radio" value="correo">Correo</a-radio>
      </a-radio-group>
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

const submitLoading = ref(false)
const dataTestArr = ref(null)
const router = useRouter();
const isloading = ref(true);

const formState = reactive({
  te1: null,
  te2: null,
  te3: null,
  te4: null,
  te5: null,
  social: null,
});

const onSubmit = async () => {
  const payload = {
    te1: formState.te1,
    te2: formState.te2,
    te3: formState.te3,
    te4: formState.te4,
    te5: formState.te5,
    social: formState.social,
    ruc_mype: props.rucdni.ruc,
    dni_mype: props.rucdni.number_document,
    workshop_id: props.workshop.id
  }

  submitLoading.value = true;

  try {

    await requestNoToken({ url: `/sending-test-answers/${props.workshop.id_in}`, method: 'POST', data: payload });
    await requestNoToken({ url: `/public/add-point/${props.workshop.id}/${formState.social}`, method: 'PUT' });
    
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
const scrollTop = () => {
  window.scrollTo({
    top: 200,
    behavior: 'smooth'
  });
}
const onFinishFailed = () => {
  message.error('Debes de completar todos los datos');
  scrollTop()
};

const fetchInQuestions = async () => {
  try {
    const { data } = await requestNoToken({ url: `/testin-questions/${props.workshop.id}`, method: 'GET' });
    dataTestArr.value = data
    isloading.value = false;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(
  fetchInQuestions
);
</script>

<style scoped lang="scss">
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