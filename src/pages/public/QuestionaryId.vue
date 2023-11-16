<template>
  <div class="background">
    <section class="container">
      <div class="questionary">

        <div class="box text-center">
          <img src="../../assets/img/tuempresa.png" alt="">
          <a-divider />
          <h1 class="title">{{ dataSource.cuestionario?.title }}</h1>
        </div>

        <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onSubmit" @finishFailed="onFinishFailed">
          <div class="box">
            <a-form-item class="search-ruc" name="ruc" label="Número de RUC"
              :rules="[{ required: true, message: 'Es importante el número de RUC' }]">
              <a-input-search :maxlength="15" :loading="searchLoading" size="large" v-model:value="formState.ruc"
                enter-button @search="handleSearchMype" @input="validateNumber" />
            </a-form-item>

            <div v-if="showForm">
              <a-form-item label="Nombres y Apellidos:" name="name"
                :rules="[{ required: true, message: 'Ingresar nombres y apellidos' }]">
                <a-input v-model:value="formState.name" />
              </a-form-item>
              <a-form-item label="Correo:" name="email"
                :rules="[{ required: true, message: 'Ingresar correo electrónico' }]">
                <a-input v-model:value="formState.email" />
              </a-form-item>
              <a-form-item label="Celular:" name="phone"
                :rules="[{ required: true, message: 'Ingresar número de celular' }]">
                <a-input v-model:value="formState.phone" />
              </a-form-item>
            </div>
          </div>

          <div v-for="(item, idx) in dataSource.cuestionario?.questions" :key="idx">
            <div class="box">
              <span>Pregunta {{ idx + 1 }}</span>
              <h3 class="box-title">{{ item.title }}</h3>
              <a-radio-group class="group-radios" v-model:value="formState.questions[idx].resp">
                <a-radio class="item-radio" :value="1">{{ item.opt1 }}</a-radio>
                <a-radio class="item-radio" :value="2">{{ item.opt2 }}</a-radio>
                <a-radio class="item-radio" :value="3">{{ item.opt3 }}</a-radio>
              </a-radio-group>
            </div>
          </div>

          <div>
            <div v-for="(item, idx) in dataSource.cuestionario?.ratings" :key="idx">
              <div class="box">
                <span>Calificación {{ idx + 1 }}</span>
                <h3 class="box-title">{{ item.title }}</h3>
                <a-rate class="rating-star" v-model:value="formState.ratings[idx].score" />
              </div>
            </div>
          </div>

          <div class="box" v-if="dataSource.cuestionario?.social">
            <span>Cuéntanos</span>
            <h3 class="box-title">¿A través de que medio recibió información sobre este taller?</h3>
            <a-radio-group class="group-radios" v-model:value="formState.media">
              <a-radio class="item-radio" :value="1">Redes sociales</a-radio>
              <a-radio class="item-radio" :value="2">SMS</a-radio>
              <a-radio class="item-radio" :value="3">Correo</a-radio>
              <a-radio class="item-radio" :value="4">Otros</a-radio>
            </a-radio-group>
          </div>

          <div class="box" v-if="dataSource.cuestionario?.comments">
            <span>Sugerencias</span>
            <h3 class="box-title">Para siguientes talleres, por favor indícanos los temas de tu interés</h3>
            <a-textarea v-model:value="formState.comments" placeholder="Basic usage" :rows="4" />
          </div>

          <br />

          <div class="box-btn">
            <a-button type="primary" html-type="submit" size="large" :loading="submitLoading">Enviar respuestas</a-button>
          </div>

        </a-form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue';
import router from "@/router";

const showForm = ref(false)
const loading = ref(false)
const searchLoading = ref(false)
const route = useRoute()
const dataSource = ref([])
const submitLoading = ref(false)

const formState = reactive({
  id_questionnaire: null,
  type_questionary: null,
  ruc: '',
  name: '',
  email: '',
  phone: '',
  questions: [],
  ratings: [],
  media: null,
  comments: null
});

const handleSearchMype = async (ruc) => {
  if (!ruc) {
    return message.warning('Ingresa el número de RUC');
  }
  searchLoading.value = true;
  showForm.value = true;
  try {
    const data = await makeRequest({ url: `/mype-ruc/${ruc}`, method: 'GET' });
    if (data.ruc) {
      formState.ruc = data.ruc;
      formState.name = data.nombres_apellidos;
      formState.email = data.email;
      formState.phone = data.telefono
    } else {
      formState.name = '';
      formState.email = '';
      formState.phone = ''
    }
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    searchLoading.value = false;
  }
}
const validateNumber = () => {
  formState.ruc = formState.ruc.replace(/\D/g, '');
};
const clearFields = () => {
  formState.ruc = ''
  formState.name = ''
  formState.email = ''
  formState.phone = ''
  formState.questions = []
  formState.ratings = []
  formState.media = null,
  formState.comments = null
}

const fetchData = async () => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `/questionary/ruta_digital/${route.params.id}`, method: 'GET' });
    dataSource.value = data

    formState.id_questionnaire = data.cuestionario.id
    formState.type_questionary = data.cuestionario.type_questionary

    data.cuestionario.questions.map(() => {
      const obj = { resp: null }
      formState.questions.push({ ...obj });
    })
    data.cuestionario.ratings.map(() => {
      const obj = { score: null }
      formState.ratings.push({ ...obj });
    })
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

const onSubmit = async() => {
  const payload = formState
  submitLoading.value = true;
  try {
    const data = await makeRequest({ url: `/answersmype`, method: 'POST', data:payload });
    message.success(data.message);
    router.push({name: 'enviado'});
  } catch (error) {
    console.error('Error de redxxxx:', error);
    // if(error.code == '"ERR_BAD_RESPONSE"') {
    //   router.push({name: 'pagina404'});
    // }
  } finally {
    submitLoading.value = false;
  }
};
const onFinishFailed = () => {
  message.error('Debes de completar todos los datos');
};

onMounted(
  fetchData
);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap');

.background {
  background-color: #f6f6f6;
  padding: 1rem 0;
}

.container {
  max-width: 960px;
  width: 100%;
  width: calc(100% - 1rem);
  margin: auto;
  // border: 1px solid red;
}

img {
  width: 200px;
}

.box {
  padding: 50px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: .6rem;
}

.questionary {
  font-family: 'Roboto', sans-serif;

  .title {
    margin: 1rem 0 0;
    font-weight: 500;
    line-height: 1.3;
  }
}

.box-title {
  line-height: 1.3;
  font-size: 18px;
  margin: .2rem 0 .5rem 0;
}

.group-radios {
  display: flex;
  flex-direction: column;

  .item-radio {
    border: 1px solid #d9d9d9;
    padding: .6rem;
    font-size: 15px;
    margin: 5px 0;
    border-radius: 4px;
  }
}

.rating-star {
  font-size: 26px;
}

.box-btn {
  text-align: center;
  margin-bottom: 3rem;
  .btn {
    margin: 0 !important;
  }
}

.search-ruc {
  @media screen and (min-width: 768px) {
    width: 350px;
  }
}</style>