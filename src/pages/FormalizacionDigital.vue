<template>
  
  <header class="header" ref="navBar" :class="{ floatingNav: isFloating }">
    <div class="container header-wrapper">
      <img src="../assets/formalizate/logo-produce.png" alt="logo-produce">
      <img src="../assets/formalizate/logo-tuempresa.png" alt="logo-tu-empresa">
    </div>
  </header>


  <!-- <section class="container">
    <div class="baner">
      <div>
        <img class="baner-img" src="../assets/formalizate/image 18.png" alt="">
      </div>
      <div>
        <h1 class="ff title">Formalización</h1>
        <p class="ff baner-text-1">¡Únete a nuestra plataforma web y descubre un mundo de posibilidades! </p>
        <p class="ff baner-text-2">Regístrate ahora para acceder a contenido exclusivo, conectar con personas afines y
          aprovechar al máximo todas nuestras herramientas. ¡Te esperamos para empezar esta emocionante aventura juntos!
        </p>
      </div>
    </div>
  </section> -->

  <section class="form">
    <div class="container">
      <div class="form-wrapper">

        <DNISEARCH v-if="page == 1" 
        @dniDataPerson="dniDataPerson" />

        <FORMALIZACIONFORM v-if="page == 2" 
        :dniData="dniData" 
        @dataPerson="dataPerson" />

        <FORMALIZACIONMAPA v-if="page == 3"
        :stepData2="stepData2"
        @endForm="endForm" />

      </div>
    </div>
  </section>


  <FooterFormalization />
  
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { message } from 'ant-design-vue';
import DNISEARCH from './Formalizacion/FormalizacionBuscarDNI.vue';
import FORMALIZACIONFORM from './Formalizacion/FormalizacionFormulario.vue';
import FORMALIZACIONMAPA from './Formalizacion/FormalizacionMapa.vue';
import FooterFormalization from './Formalizacion/FormalizacionFooter.vue';

// const storageData = JSON.parse(localStorage.getItem('formalization'))

const page = ref(1);
const dniData = ref(null);
const stepData2 = ref(null);
const navBar = ref(null);
const isFloating = ref(false);

const dniDataPerson = (val) => {
  if(val) {
    dniData.value = val
    page.value = 2
    return
  }
  message.warning('El número de documento no es correcto');
}

const dataPerson = (val) => {
  stepData2.value = val
  page.value = 3
}
const endForm = () => {
  dniData.value = null
  stepData2.value = null
  page.value = 1
}

const handleScroll = () => {
  if (window.pageYOffset > 10) {
    isFloating.value = true;
  } else {
    isFloating.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style lang="scss" scoped>
$color-primary: #BA0F0F;
$color-title: #2D3748;
$color-text: #4A5568;
$color-background: #F7F7FA;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
header {
  z-index: 90;
  position: sticky;
  margin-bottom: 10px;
  top: 0;
  background: #fff;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    height: 60px;

    img {
      height: 55px;
      object-fit: cover;
    }
  }
}
.form {
  padding: 4rem 0 3rem 0;
  background-color: #F7F7FA;

  &-wrapper {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 0 4rem 0;
  }
}
.floatingNav {
  border-radius: 2px;
  box-shadow: 0px 1px 10px #cbcbcb;
}


.ff {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
}
.title {
  font-size: 26px;
  color: $color-title;
  font-weight: 700;
  // text-align: center;
}
.title2 {
  font-size: 18px;
  color: $color-title;
  font-weight: 700;
  margin-bottom: .8rem;
}
//banner
.baner {
  display: flex;
  align-items: center;
  gap: 6rem;

  &-img {
    height: 450px;
  }
  &-text-1 {
    color: $color-primary;
    margin: 1.5rem 0;
  }

  &-text-2 {
    color: $color-text;
    line-height: 1.5;
  }
}

@media screen and (max-width: 900px) {
  .title {
    font-size: 20px;
    color: $color-title;
    font-weight: 600;
  }
  .baner {
    flex-direction: column;
    gap: 2rem;
    &-img {
      width: 200px;
      height: auto;
    }
    p {
      font-size: 15px;
      text-align: center;
    }
  }
 
}
</style>