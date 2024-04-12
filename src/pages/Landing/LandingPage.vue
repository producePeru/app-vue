<template>
  <div class="wow">
    <nav :style="{ backgroundColor: navbarBackground, boxShadow: navbarShadow }">
      <div class="container">
        <div class="nav-logos">
          <img src="../../assets/img/logos/logo-bicentenario.png" alt="cyberwowpnte">
          <img src="../../assets/img/logos/logo-ministerio.png" alt="cyberwowpnte">
          <img src="../../assets/img/logos/logo-punche-peru.png" alt="cyberwowpnte">
          <img src="../../assets/img/logos/logo-tu-empresa.png" alt="cyberwowpnte">
        </div>
      </div>
    </nav>
    
    <main></main>

    <section>
      <div class="container">

        <div class="sales" v-for="(store,i) in wow" :key="i">
          <h2>{{ store.brand }}</h2>
          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(product, idx) in store.products" :key="idx">
              <a-card hoverable @click="handleclick(product)">
                <template #cover>
                  <img alt="example" :src="product.photo" />
                </template>
                <a-card-meta :title="product.modelo">
                  <template #description>
                    <div>{{ product.description }}</div>
                    <div style="font-size: 13px;"><span>A partir de</span> <b>{{ product.price }}</b></div>
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
import wow  from '@/json/wow.js'

const navbarBackground = ref('transparent');
const navbarShadow = ref('');

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

const handleclick = (val) => {
  window.open(val.link, '_blank');
}
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
    background-image: url('../../assets/img/wow/wow.png');
    background-size: 100% 100%;
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
    img {
      height: 40px;
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
