<template>

  <div class="fair-wrapper">
    <header ref="navBar" class="floatingNav">
      <div class="container header-wrapper">
        <img src="../../assets/formalizate/logo-produce.png" alt="logo-produce"
          style="position: relative; top: -8px; height: 60px;">
        <img src="../../assets/formalizate/logo-tuempresa.png" alt="logo-tu-empresa"
          style="position: relative; top: 8px;">
      </div>
    </header>

    <section v-if="caducated">

    </section>



    <section v-else>
      <section class="fair">
        <div class="container containerx" style="margin-top: 1rem; border-radius: 8px 8px 0 0;">

          <div style="padding-top: 3rem;">
            <div class="fair-title">
              <h1>{{ fair?.title }}</h1>
              <h4>PLAZA DE ARMAS DE BARRANCA</h4>
            </div>

            <div class="fair-header">
              <img class="fair-header-img"
                src="https://img.freepik.com/vector-gratis/ilustracion-concepto-buen-equipo_114360-4225.jpg?t=st=1729730698~exp=1729734298~hmac=46e52e8192a794b1851dfef70a4925f3a7ce5694bbfdbe91908a80b9d2b774f0&w=826"
                alt="">
              <div class="tag-html">
                <div v-html="fair?.description"></div>
              </div>
            </div>
          </div>

        </div>

        <div class="fair-section">
          <div class="container" style="background-color: #def1f8;">
            <p>
              <b>Importante:</b> La información proporcionada tiene carácter de Declaración Jurada, la misma que se
              formula
              en el marco de lo establecido en el artículo 49 del TUO de la Ley 27444 Ley del Procedimiento
              Administrativo
              General, manifestando someterme a la normatividad vigente respecto a la materia y a las responsabilidades
              administrativas, civiles y/o penales que se pudieran derivar en caso que alguno DE LOS DATOS CONSIGNADOS
              SEAN
              FALSOS, INEXACTOS, siendo pasible de cualquier fiscalización posterior que el Ministerio de la Producción
              considere pertinente.
            </p>
          </div>
        </div>
      </section>

      <!-- <pre>{{ fair }}</pre> -->


      <section class="form-x fair">
        <div class="container containerx" style="margin-bottom: 2rem; border-radius: 0 0 8px 8px;">
          <div class="form-x-wrapper" style="padding: 2rem 1.5rem;">

            <!-- formulario -->
            <section>

              <!-- <a-steps @change="handleSteepState" v-model:current="current" status="error" :items="[
                { title: 'Empresa' },
                { title: 'Representante Legal' },
                { title: 'Participar' }
              ]" /> -->

              <div style="margin-top: 2rem;">
                <RegistroPaso1 v-if="current == 0" />
                <RegistroPaso2 v-if="current == 1" />
                <RegistroPaso3 v-if="current == 2" />
              </div>

            </section>

          </div>
        </div>
      </section>
    </section>

    <FooterFormalization />
  </div>

</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { useRoute } from 'vue-router';
import FooterFormalization from '@/pages/Formalizacion/FormalizacionFooter.vue'
import RegistroPaso1 from './components/RegistroPaso1.vue';
import RegistroPaso2 from './components/RegistroPaso2.vue';
import RegistroPaso3 from './components/RegistroPaso3.vue';

const fair = ref(null);
const caducated = ref(!true);
const current = ref(0);
const navBar = ref(null);
const isFloating = ref(false);
const route = useRoute();

const handleScroll = () => {
  if (window.pageYOffset > 10) {
    isFloating.value = true;
  } else {
    isFloating.value = false;
  }
};



const fetchData = async () => {
  try {

    const slug = route.params.slug;

    const response = await makeRequest({ url: `fair/data/${slug}`, method: 'GET' });
    console.log("response", response);

    if (response.status == 200) {
      fair.value = response.data
    }



  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    // loading.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  fetchData();
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style lang="scss">
header {
  z-index: 90;
  position: sticky;
  background-color: #fff;
  // margin-bottom: 10px;
  top: 0;


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

.floatingNav {
  border-radius: 2px;
  box-shadow: 0px 1px 10px #cbcbcb;
}

// fair
.fair-wrapper {
  background-color: #F7F7FA;
}

.fair {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  .containerx {
    background-color: #fff;
    // box-shadow: 0px 1px 10px #cbcbcb;
  }

  .fair-title {
    text-align: center;
    margin-bottom: 1rem;

    h1 {
      margin-bottom: .6rem;
      font-weight: 700;
      font-size: 30px;
    }

    h4 {
      color: var(--secondary);
    }
  }

  .fair-header {
    display: grid;
    grid-template-columns: 1fr;

    .tag-html {
      margin: 1.5rem 0 .5rem 0;

      br {
        display: none;
      }

      p {
        line-height: 1 !important;
        margin-bottom: 5px;
      }

      strong {
        margin: 10px 0 !important;
        line-height: 2;
      }

      ul {
        margin: 0;

        li {
          margin-bottom: 5px;

          &:last-child {
            margin: 0 !important;
          }
        }


      }

      p,
      ul li {
        font-size: 13px !important;
      }
    }

    .fair-header-img {
      width: 100%;
      max-height: 380px;
      object-fit: contain;
    }

    p {
      font-size: 14px;
      line-height: 1.4;
    }
  }

  .fair-section {
    background-color: #def1f8;
    padding: 2rem;

    p {
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }
  }

  .fair-form {}

  @media screen and (min-width: 900px) {
    .fair-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2rem;

      .tag-html {
        margin-top: 0;
      }
    }

  }
}
</style>