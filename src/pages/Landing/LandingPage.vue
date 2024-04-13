<template>
  <div class="wow">
    <nav>
      <div class="container">
        <div class="nav-logos">
          <img src="../../assets/img/logos/logo-bicentenario.png" alt="cyberwowpnte">
          <img src="../../assets/img/logos/logo-ministerio.png" alt="cyberwowpnte">
          <img src="../../assets/img/logos/logo-punche-peru.png" alt="cyberwowpnte">
          <img src="../../assets/img/logos/logo-tu-empresa.png" alt="cyberwowpnte">
        </div>
      </div>
    </nav>

    <main>
      <div class="container">
        <div class="banner">
          <div>
            <a-carousel autoplay effect="fade">
              <div class="wow-banner">
                <img class="text" src="../../assets/img/wow/banner.png" alt="">
                <img class="girl" src="../../assets/img/wow/banner-girl.png" alt="">
              </div>
              <div class="wow-banner">
                <img class="text" src="../../assets/img/wow/banner-2.png" alt="">
                <img class="girl2" src="../../assets/img/wow/banner-girl-2.png" alt="">
              </div>
            </a-carousel>
          </div>
        </div>
      </div>
    </main>

    
    
    
    <section>
      <div class="container" v-if="active == 'category'">
        <div class="categories">
          <h2>Categorías</h2>
          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(category, idx) in categorias" :key="idx">
              <div class="card" @click="handleFindBrands(category)">
                <img style="width: 100%;" :src="category.imagen" alt="">
              </div>
            </a-col>
          </a-row>
        </div>
      </div>


      <div class="container" v-if="active == 'brand'">
        <div class="brands">

          <a-breadcrumb class="wow-links">
            <a-breadcrumb-item><a @click="brands = null">Inicio</a></a-breadcrumb-item>
            <a-breadcrumb-item>Categorías</a-breadcrumb-item>
          </a-breadcrumb>

          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(brand, idx) in brands" :key="idx">
              <div class="card" @click="handleclick(brand)">
                <a-card hoverable>
                  <template #cover>
                    <img alt="example" :src="brand.imagen" />
                  </template>
                  <a-card-meta title="Nombre" description="description">
                  </a-card-meta>
                </a-card>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>



      <div class="container" v-if="active == 'store'">
        <div class="stores">
          <a-breadcrumb class="wow-links">
            <a-breadcrumb-item><a @click="brands = null">Inicio</a></a-breadcrumb-item>
            <a-breadcrumb-item>Categorías</a-breadcrumb-item>
          </a-breadcrumb>

          <div class="sales" v-for="(store, i) in tiendas" :key="i">
            <h2>{{ store.titulo }}</h2>
            <a-row :gutter="[16, 16]">
              <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(brands, idx) in store.productos" :key="idx">
                <a-card hoverable @click="handleclick(brands)">
                  <template #cover>
                    <img alt="example" :src="brands.foto" style="height: 270px;" />
                  </template>
                  <a-card-meta :title="brands.modelo">
                    <template #description>
                      <div>{{ brands.descripcion }}</div>
                      <div><span>A partir de</span> <b>{{ brands.precio }}</b></div>
                    </template>
                  </a-card-meta>
                </a-card>
              </a-col>
            </a-row>
          </div>

        </div>
      </div>










    </section>


    <FooterFormalization />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FooterFormalization from '../Formalizacion/FormalizacionFooter.vue';
import { categorias, marcas, tiendas } from '@/json/wow.js'

const brands = ref(false);
const stores = ref(false);
const active = ref('category');

const handleFindBrands = (category) => {
  active.value = 'brand';
  const filteredBrands = marcas.filter(marca => marca.categoria_id === category.id);
  if (filteredBrands.length > 0) {
    brands.value = filteredBrands;
  } else {
    console.log('No se encontraron marcas para la categoría especificada.');
  }
}


const handleclick = (val) => {
  active.value = 'store';
  if(val.linkpagina == 'none') {
    const filteredBrands = marcas.filter(marca => marca.marca_id === val.categoria_id);
    stores.value = filteredBrands;
  } else {
    window.open(val.link, '_blank');
  }
}

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
    background-color: #fff;
    box-shadow: 0px 1px 10px #999;
  }

  main {
    padding-top: 60px;
    background-size: 100% 500px;
    background-image: url('../../assets/img/wow/wow.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;

    .banner {


      .text {
        width: 450px;
      }

      .girl {
        width: 32%;
        position: absolute;
        right: 3rem;
        bottom: 0;
      }

      .girl2 {
        width: 630px;
        position: absolute;
        right: 6rem;
        bottom: 0;
      }

      .wow-banner {
        position: relative;
        width: 100%;
        display: flex !important;
        height: 400px;
        align-items: center;
      }
    }
  }

  .container {
    height: 100%;
    padding: .6rem;

    @media screen and (min-width: 580px) {
      padding: 0 !important;
    }
  }

  .categories,
  .brands {
    margin: 3rem 0;
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
    padding: 3rem 0;

    h2 {
      margin-bottom: 1rem;
    }

    b {
      color: #ff4d38;
      font-size: 13px;
    }
  }

  .categories {
    .card {
      img {
        width: 100%;
        /* height: 200px; */
        border-radius: 6px;
        cursor: pointer;
      }

      &:hover {
        border-radius: 6px;
        transition: box-shadow 0.2s, border-color 0.2s;
        /* box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09); */
      }
    }
  }

  .wow-links {
    background-color: transparent !important;
    position: relative !important;
    box-shadow: none !important;
    z-index: 10;
  }

  @media screen and (max-width:992px) {
    .sales {
      b {
        color: #ff4d38;
        font-size: 12px;
      }
    }

    .wow-banner {
      justify-content: center;
    }

    .girl,
    .girl2 {
      display: none;
    }
  }
}
</style>

<style lang="scss">
.brands {
  .ant-card-body {
    padding: .8rem;
  }

  .ant-card-meta-title {
    margin: 0 !important;
  }

  .ant-card-cover {
    height: 170px;

    img {
      height: inherit;
    }
  }
}
</style>