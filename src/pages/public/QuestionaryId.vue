<template>
  <div class="background">
    <section class="container">
      <div class="questionary">



        <div class="box text-center">
          <img src="data:image/png;base64,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" alt="">
            <a-divider />
          <h1 class="title">REGISTRO DE SALIDA - TALLER: "WhatsApp Business y Google My Business para Emprendedores"</h1>
        </div>

        
          <a-form
          layout="vertical"
          :model="formState"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed" >

          <div class="box">
            <a-form-item 
            name="ruc" 
            label="Número de RUC" 
            :rules="[{ required: true, message: 'Es importante el número de RUC' }]">
              <a-input-search size="large" v-model:value="formState.ruc" enter-button @search="handleSearchMype" @input="validateNumber"/>
            </a-form-item>

            <div>
              <h4>RUC:</h4>
              <span>92939934090349034</span>
            </div>
            <div>
              <h4>Nombres y Apellidos:</h4>
              <span>92939934090349034</span>
            </div>
            <div>
              <h4>Correo:</h4>
              <span>92939934090349034</span>
            </div>
            <div>
              <h4>Celular:</h4>
              <span>92939934090349034</span>
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

          <div v-for="(item, idx) in dataSource.cuestionario?.ratings" :key="idx">
            <div class="box">
              <span>Calificación {{ idx + 1 }}</span>
              <h3 class="box-title">{{ item.title }}</h3>
              
            </div>
          </div>

          

           <!-- <pre>{{ dataSource }}</pre> -->


            <!-- <a-form-item
              label="Username"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username" />
            </a-form-item> -->

      

   
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
          </a-form>

        
        
        
        
        
        
        
        
       <pre>{{ dataSource }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js'
import { useRoute } from 'vue-router'

const loading = ref(false)
const route = useRoute()
const dataSource = ref([])

const formState = reactive({
  ruc: '',


  questions: [],
  ratings: [],




  username: '',
  password: '',
  remember: true,
});

const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const handleSearchMype = () => {

}
const validateNumber = () => {
  formState.ruc = formState.ruc.replace(/\D/g, ''); 
};


const fetchData = async() => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `/questionary/ruta_digital/${route.params.id}`, method: 'GET' });
    dataSource.value = data


    console.log("QUE", data.cuestionario.questions)

    data.cuestionario.questions.map(() => {
      const obj = { resp: null }
      formState.questions.push({ ...obj });
    })
    data.cuestionario.ratings.map(() => {
      const obj = { resp: null }
      formState.ratings.push({ ...obj });
    })
 




  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
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
</style>