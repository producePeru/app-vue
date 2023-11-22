<template>
  <div class="test-container">

    <a-breadcrumb>
      <a-breadcrumb-item><router-link to="/admin/ruta-digital/talleres">Volver a Talleres de Ruta Digital</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Crear test de entrada</a-breadcrumb-item>
    </a-breadcrumb>

    <br>

    <div class="test-head">
      <h1>TEST DE ENTRADA</h1>
      <h2>Taller de redes sociales</h2>
      <span><b>Expositor:</b> Juan Manuel Sanz</span>
      <span><b>Fecha taller:</b> 20/12/2023</span>
    </div>

    <a-divider />
    
    <a-form layout="vertical" :model="formState" @finish="handleFinish" @finishFailed="handleFinishFailed">
      <a-form-item label="Fecha de expiración de la prueba" name="date_end" :rules="[{ required: true, message: 'Seleccionar una fecha' }]">
        <a-date-picker v-model:value="formState.date_end" format="DD-MM-YYYY" />
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
      <a-form-item class="text-center">
        <a-button type="primary" html-type="submit" :disabled="formState.user === '' || formState.option === ''">
          CREAR CUESTIONARIO
        </a-button>
      </a-form-item>
    </a-form>
  </div>

  <pre>{{ formState }}</pre>

</template>

<script setup>
import { reactive } from 'vue';


const formState = reactive({
  date_end: null,

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
});
const handleFinish = values => {
  console.log(values, formState);
};
const handleFinishFailed = errors => {
  console.log(errors);
};
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
    width: 1000px;
    margin: auto;
  }
}
</style>