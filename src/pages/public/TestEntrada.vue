<template>
  <div class="background">
    <section class="container" >
      <div class="questionary" >
        <div class="box">
          <div class="text-center">
            <img src="../../assets/img/tuempresa.png" alt="">
            <h1 class="title">Test de entrada</h1>
          </div>
          
          <a-divider />
          
          <div class="box-info-workshop">
            <span><b>Taller: </b>{{ testInfo.title }}</span>
            <span><b>Expositor: </b>{{ testInfo.exponent }}</span>
            <span><b>Fecha del taller:</b> {{ testInfo.workShopDate }}</span>
            <span><b>Fecha de expiración del cuestionario:</b> {{ formattedDate}}</span>
          </div>
        </div>

        <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onSubmit" @finishFailed="onFinishFailed">

          <div class="box">
            <a-form-item class="search-ruc f-15" name="ruc" label="Número de RUC"
              :rules="[{ required: true, message: 'Es importante el número de RUC' }]">
              <a-input-search :maxlength="15" :loading="searchLoading" size="large" v-model:value="formState.ruc"
                enter-button @search="handleSearchMype" @input="validateNumber" />
            </a-form-item>

            <!-- <div>
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
            </div> -->

            <div class="personal-info" v-if="formDataSearch.name">
              <h4 class="c-primary">Mis Datos</h4>
              <div>
                <span class="name">Nombres y Apellidos: </span>
                <span>{{ formDataSearch.name }}</span>
              </div>
              <div>
                <span class="name">Correo electrónico: </span>
                <span>{{ formDataSearch.email }}</span>
              </div>
              <div>
                <span class="name">Número de contácto: </span>
                <span>{{ formDataSearch.phone }}</span>
              </div>
              <br>
              <!-- <a-button>Editar datos</a-button> -->
            </div>
          </div>


          <div v-if="dataTestArr">
            <div class="box" v-for="(item, idx) in 5" :key="idx">
              <span class="box-mensagge">Pregunta {{ idx+1 }}</span>
              <h3 class="box-title">{{ dataTestArr['question'+(idx+1)] }}</h3>

              <a-form-item :name="`te${idx+1}`" :rules="[{ required: true, message: 'Escoge una respuesta' }]">
                <a-radio-group class="group-radios" v-model:value="formState[`te${idx+1}`]">

                  <template v-for="(radio, jdx) in 3" :key="jdx">
                    <a-radio class="item-radio" :value="jdx+1">{{ dataTestArr[`question${idx+1}_opt${jdx+1}`] }}</a-radio>
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
              <!-- <a-radio class="item-radio" value="otro">Otros</a-radio> -->
            </a-radio-group>
          </div>

          <div class="box-btn">
            <a-button type="primary" html-type="submit" size="large" :loading="submitLoading">Enviar respuestas</a-button>
          </div>

        </a-form>

      </div>
    </section>
    
    <RegistroMYPE :open="open" @handleCloseModal="open = false" :rucProp="rucProp" @handleSetData="handleSetData"/>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { message } from 'ant-design-vue';
import RegistroMYPE from './components/ModalRegistroMYPE.vue'
import { makeRequest } from '@/utils/api.js'
import { useRouter,useRoute } from 'vue-router';
import moment from 'moment';
import { requestNoToken } from '@/utils/noToken.js'

const route = useRoute();
const rucProp = ref(null)
const open = ref(false);
const searchLoading = ref(false)
const submitLoading = ref(false)
const dataTestArr = ref(null)
const router = useRouter();

const testInfo = reactive({
  id: null,
  exponent: null,
  idIn: null,
  idOut: null,
  dateTestIn: null,
  dateTestOut: null,
  title: null,
  workShopDate: null,
});
const formDataSearch = reactive({
  name: null,
  email: null,
  phone: null,
  ruc: null,
  dni: null,
})
const formState = reactive({
  te1: null,
  te2: null,
  te3: null,
  te4: null,
  te5: null,
  social: null,
});

const formattedDate = computed(() => {
  return moment(testInfo.dateTestIn).format('DD-MM-YYYY'); 
});
const validateNumber = () => {
  formState.ruc = formState.ruc.replace(/\D/g, '');
};
const handleSetData = (data) => {
  formDataSearch.name = data.name_complete
  formDataSearch.email = data.email
  formDataSearch.phone = data.phone
  formDataSearch.ruc = data.ruc
  formDataSearch.dni = data.dni_number
}
const handleSearchMype = async () => {

  formDataSearch.ruc = null
  formDataSearch.dni = null

  let ruc = formState.ruc
  if (!ruc) {
    return message.warning('Ingresa el número de RUC');
  } 
  searchLoading.value = true

  try {
    const {data} = await requestNoToken({ url: `/data-mype/${ruc}`, method: 'GET' });
    
    if (data.ruc) {
      formDataSearch.ruc = data.ruc;
      formDataSearch.name = data.name_complete;
      formDataSearch.email = data.email;
      formDataSearch.phone = data.phone
      formDataSearch.dni = data.dni_number
    }
  } catch (error) {
    console.error('Error de red:', error.response.status);

    formDataSearch.name = null;
    formDataSearch.email = null;
    formDataSearch.phone = null;
    formDataSearch.dni = null;

    if(error.response.status == 404) {
      try {
        const {data} = await requestNoToken({ url: `/api-data-mype/${formState.ruc}`, method: 'GET' });
        const result = {
          razonSocial: data.razonSocial,
          numeroDocumento: data.numeroDocumento
        }
        rucProp.value = result
        open.value = true;
      } catch (error) {
        message.warning("El número de RUC no es válido")
        console.error('Error de red:', error);
      }
    }
  } finally {
    searchLoading.value = false;
  }
}

const onSubmit = async() => {
  if(formDataSearch.name == null && formDataSearch.dni == null && formDataSearch.ruc == null) {
    handleSearchMype()
    message.warning('Revisando sus respuestas')
    scrollTop()
    return 
  }

  const payload = {
    te1: formState.te1,
    te2: formState.te2,
    te3: formState.te3,
    te4: formState.te4,
    te5: formState.te5,
    social: formState.social,
    ruc_mype: formDataSearch.ruc,
    dni_mype: formDataSearch.dni,
    workshop_id: testInfo.id
  }

  submitLoading.value = true;
  try {
    const data = await requestNoToken({ url: `/sending-test-answers/${testInfo.id}`, method: 'POST', data:payload });
    message.success(data.message);
    router.push({name: 'enviado'});

    await requestNoToken({ url: `/addPoint/${testInfo.id}/${formState.social}`, method: 'PUT' });

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

const fetchin = async(idx) => {
  try {
    const {data} = await requestNoToken({ url: `/testin-questions/${idx}`, method: 'GET' });
    dataTestArr.value = data
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const fetchData = async() => {
  try {
    const data = await requestNoToken({ url: `/get-workshop-slug/${route.params.slug}`, method: 'GET' });
    testInfo.id = data.workshop.id;
    testInfo.exponent = data.workshop.exponent_name;
    testInfo.idIn = data.workshop.id_in;
    testInfo.idOut = data.workshop.id_out;
    testInfo.dateTestIn = data.workshop.test_in_date;
    testInfo.dateTestOut = data.workshop.test_out_date;
    testInfo.title = data.workshop.title;
    testInfo.workShopDate = data.workshop.workshop_date;

    await fetchin(data.workshop.id)

  } catch (error) {
    console.error('Error de red:', error);
  }
}

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
  img {
    width: 200px;
  }
  h1 {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  .box {
    padding: 50px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: .6rem;
    .title {
      margin-top: 1rem;
      color: #e31d1a;
    }
    .box-title {
      font-size: 18px;
    }
    .box-info-workshop {
      display: flex;
      flex-direction: column;
      line-height: 1.6;
      font-family: 'Roboto', sans-serif;
      b {
        color: #d9363e;
        font-size: 15px;
      }
    }
    .box-mensagge {
      font-size: 15px;
      margin-bottom: .2rem;
      display: block;
      color: #e31d1a;
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
  }
  .box-btn {
    text-align: center;
    margin-bottom: 3rem;
    margin-top: 2rem;
    .btn {
      margin: 0 !important;
    }
  }
}
.personal-info {
  .c-primary {
    color: #d9363e;
    font-size: 16px;
  }
  .name {
    font-weight: 500;
  }
}
.search-ruc {
  @media screen and (min-width: 768px) {
    width: 350px;
  }
}
</style>


<style lang="scss">
.my-wrapper {
  label {
    font-size: 15px !important;
  }
}
</style>