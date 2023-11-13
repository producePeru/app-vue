<template>
  
  <section class="container-form">

    <a-breadcrumb class="breadcrumb-wrapper">
      <a-breadcrumb-item><router-link to="cuestionarios">Ver lista cuestionario</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>Crear cuestionario</a-breadcrumb-item>
    </a-breadcrumb>
    
    <div>
      <div>
        <h2>Título del cuestionario</h2>
        <a-input v-model:value="formState.title" />
      </div>
      <div class="slug">
        <div class="slug-title">Slug del cuestionario</div>
        <a-input v-model:value="formState.slug" />
      </div>
    </div>

    <template v-if="formState.title && formState.slug">
      <div class="question" v-for="(item, idx) in formState.questions" :key="idx">
        <div>
          <h3>Pregunta {{ idx + 1 }}</h3>
          <a-input v-model:value="item.title" />
        </div>
        <div>
          <span>Opción 1</span>
          <a-input v-model:value="item.opt1" />
        </div>
        <div>
          <span>Opción 2</span>
          <a-input v-model:value="item.opt2" />
        </div>
        <div>
          <span>Opción 3</span>
          <a-input v-model:value="item.opt3" />
        </div>
        <div>
          <span>Respuesta</span>
          <a-input-number v-model:value="item.resp" :min="1" :max="3" style="width: 100px;" />
          <a-button type="text" danger class="delete-item" @click="handleDeleteQuestion(idx)">
            <DeleteOutlined />
          </a-button>
        </div>
      </div>
      
      <a-button class="btn-question" @click="handleAddQuestion">Agregar pregunta</a-button>
      <a-divider />
      <div class="question" v-for="(item, idx) in formState.ratings" :key="idx">
        <div>
          <h4>Pregunta Rating {{ idx + 1 }}</h4>
          <a-input class="w-100" v-model:value="item.title" />
          <a-button type="text" danger class="delete-item" @click="handleDeleteRating(idx)">
            <DeleteOutlined />
          </a-button>
        </div>
      </div>
      <template v-if="formState.questions.length >= 1">
        <a-button class="btn-question" @click="handleAddRating">
          <StarOutlined /> Agregar rating
        </a-button>
        <a-divider />
        <div class="question-check">
          <a-checkbox v-model:checked="formState.comments">Comentarios</a-checkbox>
          <a-checkbox v-model:checked="formState.social">Redes sociales</a-checkbox>
        </div>

        <a-divider />

        <a-button size="large" type="primary" :loading="loading" @click="onSubmit">Crear cuestionario</a-button>
      </template>
    </template>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { DeleteOutlined, StarOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { makeRequest } from '@/utils/api.js'
import router from "@/router";

const loading = ref(false);
const question = ref({
  title: '',
  opt1: '',
  opt2: '',
  opt3: '',
  resp: null
})
const rating = ref({
  title: ''
})

const formState = reactive({
  type_questionary: 'ruta_digital',
  title: '',
  slug: '',
  questions: [],
  ratings: [],	
  comments: false,
  social: false
})


const handleAddQuestion = () => {
  formState.questions.push({ ...question.value });
}
const handleAddRating = () => {
  formState.ratings.push({ ...rating.value });
}
const handleDeleteQuestion = (index) => {
  if (index >= 0 && index < formState.questions.length) {
    formState.questions.splice(index, 1);
  }
};
const handleDeleteRating = (index) => {
  if (index >= 0 && index < formState.ratings.length) {
    formState.ratings.splice(index, 1);
  }
};

const onSubmit = async() => {
  loading.value = true;
  const payload = formState
  try {
    const data = await makeRequest({ url: '/questionnary/create', method: 'POST', data: payload });
    message.success(data.message);
    router.push({name: 'cuestionarios'});
  } catch (error) {
    console.error('Error de red:', error);
    message.error('Error, no se ha podido crear este formulario');
  } finally {
    loading.value = false;
  }
}


</script>

<style lang="scss" scoped>
h3, h4 {
  margin: 0;
}
.breadcrumb-wrapper {
  margin-bottom: 1.5rem;
}
.w-100 {
  width: 100%;
}
.container-form {
  width: 100%;
  margin: auto;
  .slug {
    margin: .6rem 0 1.2rem;
    max-width: 250px;
    &-title {
      margin-bottom: .3rem;
    }
  }
}
.question {
  border: 1px solid #c7cdd1;
  background: #f7f7f7;
  padding: .5rem 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  div {
    display: grid;
    grid-template-columns: 100px 9fr;
    margin: .5rem 0;
    position: relative;
    align-items: center;
    .delete-item {
      position: absolute;
      right: 0;
    }
  }
}
.btn-question {
  display: block;
  margin: 1rem 0;
  color: #389e0d;
  border-color: #b7eb8f;
}
.question-check {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 992px) {
  .container-form {
    width: 70%;
  }
}

</style>

