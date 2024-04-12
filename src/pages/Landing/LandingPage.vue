<template>
  <div class="wow">
    <nav :style="{ backgroundColor: navbarBackground, boxShadow: navbarShadow }">
      <div class="container">
        <div class="nav-logos">
          <img width="130" src="https://sf.ezoiccdn.com/ezoimgfmt/www.vectorlogo.es/wp-content/uploads/2024/04/logo-vector_cantabria-infinita.png?ezimgfmt=rs:630x320/rscb1/ngcb1/notWebP" alt="">
          <img width="130" src="https://sf.ezoiccdn.com/ezoimgfmt/www.vectorlogo.es/wp-content/uploads/2024/04/logo-vector_cantabria-infinita.png?ezimgfmt=rs:630x320/rscb1/ngcb1/notWebP" alt="">
          <img width="130" src="https://sf.ezoiccdn.com/ezoimgfmt/www.vectorlogo.es/wp-content/uploads/2024/04/logo-vector_cantabria-infinita.png?ezimgfmt=rs:630x320/rscb1/ngcb1/notWebP" alt="">
          <img width="130" src="https://sf.ezoiccdn.com/ezoimgfmt/www.vectorlogo.es/wp-content/uploads/2024/04/logo-vector_cantabria-infinita.png?ezimgfmt=rs:630x320/rscb1/ngcb1/notWebP" alt="">
        </div>
      </div>
    </nav>
    
    <main></main>

    <section>
      <div class="container">

        <div class="sales">
          <h2>Jean Paul Creations</h2>
          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item, idx) in 4" :key="idx">
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="	https://i.postimg.cc/fbnB2yfj/na1.png" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>
                    <div>OFERTA POLOS BASICOS HOMBRE</div>
                    <div style="font-size: 13px;"><span>A partir de</span> <b>S/. 29.00 PEN</b></div>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <div class="sales">
          <h2>Jean Paul Creations</h2>
          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item, idx) in 4" :key="idx">
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="	https://i.postimg.cc/fbnB2yfj/na1.png" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>
                    <div>OFERTA POLOS BASICOS HOMBRE</div>
                    <div style="font-size: 13px;"><span>A partir de</span> <b>S/. 29.00 PEN</b></div>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <div class="sales">
          <h2>Jean Paul Creations</h2>
          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item, idx) in 4" :key="idx">
              <a-card hoverable>
                <template #cover>
                  <img alt="example" src="	https://i.postimg.cc/fbnB2yfj/na1.png" />
                </template>
                <a-card-meta title="Europe Street beat">
                  <template #description>
                    <div>OFERTA POLOS BASICOS HOMBRE</div>
                    <div style="font-size: 13px;"><span>A partir de</span> <b>S/. 29.00 PEN</b></div>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
    </section>

    <br>
    <br> 

    <FooterFormalization />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FooterFormalization from '../Formalizacion/FormalizacionFooter.vue';
const navbarBackground = ref('transparent');
const navbarShadow = ref('');

const sales = ref([
  {
    // id: 1,
    // title: 'Title 1',
    // description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto optio eum architecto aliquid aut! Laborum magni adipisci error, modi alias obcaecati itaque esse illum dolore, ducimus eum porro atque nam.',
    // img: '	https://i.postimg.cc/fbnB2yfj/na1.png'
  }
])

const handleScroll = () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    navbarBackground.value = '#fff';
    navbarShadow.value = '0px 1px 10px #999';
  } else {
    navbarBackground.value = 'transparent';
    navbarShadow.value = '';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.wow {
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    transition: background-color 0.3s ease;
    z-index: 99;
  }

  main {
    padding-top: 60px;
    height: 100vh;
    background-image: url('https://www.staffcreativa.pe/blog/wp-content/uploads/compras-online.jpg');
    background-size: cover;
    background-position: center;
  }

  .container {
    height: 100%;
    padding: .6rem;

    @media screen and (min-width: 580px) {
      padding: 0 !important;
    }
  }

  .nav-logos {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    p {
      margin: 0;
    }
  }

  .sales {
    padding: 3rem 0 .5rem 0;
    h2 {
      margin-bottom: 1rem;
    }
    b {
      color: #ff4d38;
    }
  }
}
</style>
