<template>
  <div class="background">
    <section class="container">
      <div class="questionary">
        <div class="box">
          <div class="text-center">
            <img src="../../assets/img/tuempresa.png" alt="">
            <div class="head-title">
              <h2 class="title">Confirmación de asistencia a talleres de Ruta Digital</h2>
            </div>
          </div>
          
          <a-divider />
          
          <div v-if="testInfo.title" class="box-info-workshop">
            <span><b>Taller: </b>{{ testInfo.title }}</span>
            <span><b>Expositor: </b>{{ testInfo.exponent }}</span>
            <span><b>Fecha del taller:</b> {{ testInfo.workShopDate }}</span>
          </div>

          <a-skeleton v-else active />

        </div>

        <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onSubmit" @finishFailed="onFinishFailed">
          
          <div class="box">
            <a-form-item class="search-ruc f-15" name="ruc" label="Número de RUC"
              :rules="[{ required: true, message: 'Es importante el número de RUC' }]">
              <a-input-search :maxlength="15" :loading="searchLoading" size="large" v-model:value="formState.ruc"
                enter-button @search="handleSearchMype" @input="validateNumber" />
            </a-form-item>

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

          <div class="box">
        
            <div class="html-invitation" v-html="dataPresentation.content"></div>
            <br>
            <h3 class="box-title">¿Estas interesado en participar en este taller de Ruta Digital?</h3>
            <a-radio-group v-model:value="formState.attendance">
              <a-radio value="si">SI</a-radio>
              <a-radio value="no">NO</a-radio>
            </a-radio-group>
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
import { useRouter,useRoute } from 'vue-router';
import { makeRequest } from '@/utils/api.js'
import moment from 'moment';
import { requestNoToken } from '@/utils/noToken.js'

const route = useRoute();
const router = useRouter();

const rucProp = ref(null)
const open = ref(false);
const searchLoading = ref(false)
const submitLoading = ref(false)
const dataPresentation = ref([])

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
  id_questionnaire: null,
  ruc: null,
  dni: null,
  attendance: null,
  social: null
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
const scrollTop = () => {
  window.scrollTo({
    top: 200,
    behavior: 'smooth'
  });
}
const onSubmit = async() => {
  if(formDataSearch.name == null && formDataSearch.dni == null && formDataSearch.ruc == null) {
    handleSearchMype()
    message.warning('Revisando sus datos')
    scrollTop()
    return 
  }

  const payload = {
    ruc_mype: formDataSearch.ruc,
    dni_mype: formDataSearch.dni,
    workshop_id: testInfo.id,
    email: formDataSearch.email,
    is_participant: formState.attendance
  }

  submitLoading.value = true;
  try {
    const data = await makeRequest({ url: `/accept-invitation/${testInfo.id}`, method: 'POST', data:payload });
    message.success(data.message);
    router.push({name: 'enviado'});

    await requestNoToken({ url: `/add-point/${testInfo.id}/${formState.social}`, method: 'PUT' });


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
const fetchDataPresentation = async(idx) => {
  // console.log("isisiisiss", idx);
  try {
    const {data} = await requestNoToken({ url: `/invitations/${idx}`, method: 'GET' });
    dataPresentation.value = data
  } catch (error) {
    console.error('Error de red:', error);
  }
}

const fetchData = async() => {
  try {
    const data = await requestNoToken({ url: `/get-workshop-slug/${route.params.slug}`, method: 'GET' });
    testInfo.id = data.workshop.id;
    testInfo.exponent = data.workshop.exponent_name;
   
    testInfo.title = data.workshop.title;
    testInfo.workShopDate = data.workshop.workshop_date;

    await fetchDataPresentation(data.workshop.id_invitation)

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
  .box {
    padding: 50px;
    background: #fff;
    border-radius: 8px;
    margin-bottom: .6rem;
    .head-title {
      margin: 2rem 0 2rem 0;
      h1 {
        font-size: 16px;
        margin-bottom: 0.2rem;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
      }
      h2 {
        color: #e31d1a;
        font-family: 'Roboto', sans-serif;
      }
    }
    .p-text {
      font-size: 15px;
      font-family: 'Roboto', sans-serif;
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
    .box-info-workshop {
      display: flex;
      flex-direction: column;
      line-height: 1.6;
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

.search-ruc {
  @media screen and (min-width: 768px) {
    width: 350px;
  }
}
</style>

<style>
.html-invitation p {
  margin: 0;
}
</style>