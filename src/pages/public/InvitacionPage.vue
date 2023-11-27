<template>
  <div class="background">
    <section class="container">
      <div class="questionary">
        <div class="box">
          <div class="text-center">
            <img src="../../assets/img/tuempresa.png" alt="">
            <div class="head-title">
              <h1>Confirmación de asistencia a talleres de Ruta Digital</h1>
              <h2 class="title">Confirmación de asistencia a talleres de Ruta Digital</h2>
            </div>
          </div>
          
          <a-divider />
          
          <div class="box-info-workshop">
            <span><b>Expositor: </b>Juan Manuel Sanz</span>
            <span><b>Fecha del taller:</b> 20/12/2023</span>
            <span><b>Fecha de expiración del cuestionario:</b> 22/12/2023 - 22:00</span>
          </div>
        </div>

        <a-form layout="vertical" :model="formState" autocomplete="off" @finish="onSubmit" @finishFailed="onFinishFailed">
          
          <div class="box">
            <a-form-item class="search-ruc" name="ruc" label="Número de RUC"
              :rules="[{ required: true, message: 'Es importante el número de RUC' }]">
              <a-input-search :maxlength="15" :loading="searchLoading" size="large" v-model:value="formState.ruc"
                enter-button @search="handleSearchMype" @input="validateNumber" />
            </a-form-item>

            <div>
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


          <div class="box">
            <h3 class="box-title">¿A través de que medio recibió información sobre este taller?</h3>
            <a-radio-group v-model:value="formState.attendance">
              <a-radio :style="radioStyle" :value="1">SI</a-radio>
              <a-radio :style="radioStyle" :value="0">NO</a-radio>
            </a-radio-group>
          </div>

          <div class="box">
            <span class="box-mensagge">Opcional</span>
            <h3 class="box-title">¿Cómo te enteraste del taller?</h3>
            <a-radio-group class="group-radios" v-model:value="formState.social">
              <a-radio class="item-radio" :value="1">Redes sociales</a-radio>
              <a-radio class="item-radio" :value="2">SMS</a-radio>
              <a-radio class="item-radio" :value="3">Correo</a-radio>
              <a-radio class="item-radio" :value="4">Otros</a-radio>
            </a-radio-group>
          </div>          

          <div class="box-btn">
            <a-button type="primary" html-type="submit" size="large" :loading="submitLoading">Enviar respuestas</a-button>
          </div>

          

        </a-form>


        <pre>{{ formState }}</pre>




      </div>
    </section>


    <RegistroMYPE :open="open" @handleCloseModal="open = false"/>


  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import RegistroMYPE from './components/ModalRegistroMYPE.vue'

const open = ref(false);
const searchLoading = ref(false)
const submitLoading = ref(false)

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
const handleSearchMype = async (ruc) => {
  if (!ruc) {
    return message.warning('Ingresa el número de RUC');
  } else {
    open.value = true
  }
  // searchLoading.value = true;
  // showForm.value = true;
  // try {
  //   const data = await makeRequest({ url: `/mype-ruc/${ruc}`, method: 'GET' });
  //   if (data.ruc) {
  //     formState.ruc = data.ruc;
  //     formState.name = data.nombres_apellidos;
  //     formState.email = data.email;
  //     formState.phone = data.telefono
  //   } else {
  //     formState.name = '';
  //     formState.email = '';
  //     formState.phone = ''
  //   }
  // } catch (error) {
  //   console.error('Error de red:', error);
  // } finally {
  //   searchLoading.value = false;
  // }
}

const onSubmit = async() => {
  console.log("uauuaauu")
  // const payload = formState
  // submitLoading.value = true;
  // try {
  //   const data = await makeRequest({ url: `/answersmype`, method: 'POST', data:payload });
  //   message.success(data.message);
  //   router.push({name: 'enviado'});
  // } catch (error) {
  //   console.error('Error de redxxxx:', error);
    // if(error.code == '"ERR_BAD_RESPONSE"') {
    //   router.push({name: 'pagina404'});
    // }
  // } finally {
  //   submitLoading.value = false;
  // }
};
const onFinishFailed = () => {
  message.error('Debes de completar todos los datos');
};
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
 
    .box-title {
      font-size: 18px;
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