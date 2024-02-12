<template>
  <section class="invitation">

    <a-spin v-if="isloading" />

    <div v-else class="container">
      <div class="header">
        <img class="logo-ruta" src="../../assets/img/logorutadigital.png" alt="">
      </div>

      <div class="lazing">
        <h3>TEST DE SALIDA</h3>
      </div>

      <div v-if="workshop" class="invitacion-info text-html"> 
        <div>
          <p>
            ¡Capacítate con <b>#RUTADIGITAL</b> del Ministerio de Producción del Perú, a través de <b>#TuEmpresa</b>!
          </p>
          <br>
          <p><b>Taller: </b> {{ workshop.title }}</p>
          <p><b>Exponente: </b> {{ workshop.exponent_name }}</p>
          <p><b>Fecha: </b> {{ workshop.workshop_date }}</p>
          <!-- <p><b>Fecha de expiración del cuestionario: </b>
            <p>{{ workshop.test_out_date }}</p>
          </p> -->
   
        </div>

        <div >
          <!-- <img class="img-wom" src="../../assets/img/imgInvitacion.jpg" alt=""> -->
          <img class="img-taller" src="https://img.freepik.com/vector-gratis/proyecto-inicio-negocio-lanzar-idea-exitosa_107791-13390.jpg" alt="">
        </div>
      </div>

      <br>
      
      <EmpresaUsuario v-if="!isRegister"  @registerMYPE="handleRegisterSuccess" />
      <TestSalida v-else :workshop="workshop" :rucdni="rucdni" />
    
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { useRoute } from 'vue-router';
import EmpresaUsuario from './components/EmpresaUsuario.vue'
import TestSalida from './components/TestSalidaQuestions.vue'

const isloading = ref(true);
const route = useRoute();
const workshop = ref(null);
const isRegister = ref(!false);
const rucdni = ref(null);

const handleRegisterSuccess = (val) => {
  isRegister.value = true
  rucdni.value = val
}

const fetchData = async() => {
  try {
    const data = await requestNoToken({ url: `/get-workshop-slug/${route.params.slug}`, method: 'GET' });
    workshop.value = data.workshop
    isloading.value = false;
  } catch (error) {
    console.error('Error de red:', error);
  }
}

onMounted(() => {
  fetchData()
});

</script>

<style lang="scss" scoped>
.img-taller {
  height: 200px;
  width: 100%;
}
.invitation {
  background-color: #f9f9f9;
  padding: 0 0 1rem 0;
  min-height: 100vh;
}
.container {
  max-width: 800px;
  margin: auto;
  min-width: 300px;
  // border: 1px solid #d1d1d1;
  padding-bottom: 2rem;
  background-color: #fff;
  border-radius: 6px;
}

.header {
  background-image: url("../../assets/img/header.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 140px;
  position: relative;
  margin-bottom: 1rem;
}
.logo-ruta {
  width: 100%;
  max-width: 240px;
  position: absolute;
  right: 50%;
  top: 25%;
  transform: translate(50%, 50%);
}

.lazing {
  background-color: #1d71b8;
  text-align: center;
  color: #fff;
  padding: 1rem 0;
  h3 {
    font-weight: 600;
    margin: 0;
    font-size: 17px;
  }
}

.invitacion-info {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 1rem;
  grid-gap: 1rem;
  padding: .5rem 1rem;
  .img-wom {
    width: 95%;
  }
  .logo-clock {
    width: 30px;
    margin-right: .3rem;
    position: relative;
    top: -.1rem;
  }
  .horario {
    // color: red;
    font-size: 15px;
    font-weight: 500;
  }
}
.plataforma {
  display: flex;
  align-items: center;
  gap: .6rem;
  h3 {
    color: #1d71b8;
    padding-top: .3rem;
    margin: 0;
  }
  .logo-zoom {
    width: 100px;
  }
}
</style>

<style lang="scss">
.horario {
  color: rgba(0, 0, 0, 0.88);
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
}
.text-html {
  h2 {
    font-size: 22px;
  }
  h3 {
    font-size: 16px;
  }
  p {
    font-size: 14px;
    line-height: 1.3;
    color: rgba(0, 0, 0, 0.88);
    white-space: initial;
    margin-bottom: .5rem;
  }
  h2, p {
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
  }
}
</style>