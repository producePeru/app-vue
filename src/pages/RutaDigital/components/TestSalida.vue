<template>
  <div class="test-container">
    <a-breadcrumb>
      <a-breadcrumb-item><router-link to="/admin/ruta-digital/talleres">Volver a Talleres de Ruta Digital</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>{{ $route.name == 'test-salida' ? 'Crear' : 'Editar' }} test de salida</a-breadcrumb-item>
    </a-breadcrumb>

    <br>

    <div class="test-head">
      <h1>TEST DE SALIDA</h1>
      <h2>{{ $route.query.taller }}</h2>
      <span><b>Expositor:</b> {{ $route.query.exponent }}</span>
      <span><b>Fecha taller:</b> {{ $route.query.date }}</span>
    </div>

    <a-divider />
    
    <a-form layout="vertical" :model="formState" @finish="onSubmit">
      <a-form-item label="Fecha de expiración de la prueba" name="date_end" :rules="[{ required: true, message: 'Seleccionar una fecha' }]">
        <a-date-picker v-model:value="formState.date_end" :format="dateFormat" />
      </a-form-item>
      
      <div v-for="(item, idx) in 5" :key="idx">
        <a-form-item :label="`Pregunta ${idx+1}`" :name="[`question${idx+1}`]" :rules="[{ required: true, message: 'Escribir pregunta' }]">
          <a-input v-model:value="formState[`question${idx+1}`]" />
        </a-form-item>
        <a-form-item>
          <a-radio-group class="options" v-model:value="formState[`question${idx+1}_resp`]">
            
            <div class="option" v-for="(val, j) in 3" :key="j">
              <a-radio :value="j+1" />
              <a-input :placeholder="`Option ${j+1}`" v-model:value="formState[`question${idx+1}_opt${j+1}`]" />
            </div>
            
          </a-radio-group>
        </a-form-item>
      </div>

      <br>
      <div>
        <h3>NIVEL DE SATISFACCIÓN</h3>
        <a-form-item label="Pregunta 1" name="satistaction1" :rules="[{ required: true, message: 'Escribir pregunta' }]">
          <a-input v-model:value="formState.satistaction1" />
        </a-form-item>
        <a-form-item label="Pregunta 2" name="satistaction2" :rules="[{ required: true, message: 'Escribir pregunta' }]">
          <a-input v-model:value="formState.satistaction2" />
        </a-form-item>
        <a-form-item label="Pregunta 3" name="satistaction3" :rules="[{ required: true, message: 'Escribir pregunta' }]">
          <a-input v-model:value="formState.satistaction3" />
        </a-form-item>
      </div>

      <div>
        <a-checkbox v-model:checked="formState.is_comments">Comentarios</a-checkbox>
        
        <a-form-item v-if="formState.is_comments" label="Título comentario" name="comments" :rules="[{ required: formState.comments, message: 'Escribir pregunta' }]">
          <a-input v-model:value="formState.comments" />
        </a-form-item>
      </div>

      <br>
      <a-form-item class="text-center">
        <a-button type="primary" html-type="submit" :loading="loading">
          {{  $route.name == 'test-salida' ? 'CREAR' : 'EDITAR' }} CUESTIONARIO
        </a-button>
      </a-form-item>
    </a-form>
  </div>

</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { makeRequest } from '@/utils/api.js'
import { message } from 'ant-design-vue';
import moment from 'moment';
import dayjs from 'dayjs';
const dateFormat = 'DD/MM/YYYY';

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const formState = reactive({
  workshop_id: +route.query.id,
  user_id: 1,

  date_end: ref(dayjs('04/12/2023', dateFormat)),
  question1: null,
  question1_opt1: null,
  question1_opt2: null,
  question1_opt3: null,
  question1_resp: null,

  question2: null,
  question2_opt1: null,
  question2_opt2: null,
  question2_opt3: null,
  question2_resp: null,

  question3: null,
  question3_opt1: null,
  question3_opt2: null,
  question3_opt3: null,
  question3_resp: null,

  question4: null,
  question4_opt1: null,
  question4_opt2: null,
  question4_opt3: null,
  question4_resp: null,

  question5: null,
  question5_opt1: null,
  question5_opt2: null,
  question5_opt3: null,
  question5_resp: null,

  satistaction1: null,
  satistaction2: null,
  satistaction3: null,

  comments: null,
  is_comments: false
  
});

// const handleSetDate = () => {
//   formState.date_end = moment(date_end.value).format('YYYY-MM-DD');
// }

const onSubmit = async() => {
  loading.value = true;

  let url = null
  let method = null

  if(router.currentRoute.value.name == 'editar-test-salida') {
    url = `/testout/${route.query.test}`;
    method = 'PUT';
  } else {
    url = `/create-test-out/${route.query.id}`;
    method = 'POST';
  }

  let payload = formState
  try {
    const data = await makeRequest({ url, method, data: payload });
    message.success(data.message);
    router.push('/admin/ruta-digital/talleres');
  } catch (error) {
    console.error('Error de red:', error);
    message.error('No se pudo crear este cuestionario');
  } finally {
    loading.value = false;
  }
};

const fetchData = async() => {
  if(router.currentRoute.value.name != 'editar-test-salida') return
  try {
    const {data} = await makeRequest({ url: `/testout/${route.query.test}`, method: 'GET' });
    
    let fec = moment(data.date_end).format('DD/MM/YYYY')
    formState.date_end = ref(dayjs(fec, dateFormat));

    for (let index = 1; index <= 5; index++) {
      formState['question'+index] = data['question'+index]
      formState['question'+index+'_opt1'] = data['question'+index+'_opt1']
      formState['question'+index+'_opt2'] = data['question'+index+'_opt2']
      formState['question'+index+'_opt3'] = data['question'+index+'_opt3']
      formState['question'+index+'_resp'] = data['question'+index+'_resp']
    }

    console.log("suusus", data.is_comments);

    formState.satistaction1 = data.satistaction1
    formState.satistaction2 = data.satistaction2
    formState.satistaction3 = data.satistaction3
    formState.comments = data.comments 
    formState.is_comments = data.is_comments == 1 ? true : false

  } catch (error) {
    console.error('Error de red:', error);
  }
}
onMounted(
  fetchData
);
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .option {
    display: flex;
  }
}

.test-container {
  .test-head {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: .6rem;
    h2 {
      color: #cf1322;
      font-size: 24px;
    }
    h1, h2 {
      margin: 0;
    }
  }
  @media screen and (min-width: 1200px) {
    width: 900px;
    margin: auto;
  }
}
</style>