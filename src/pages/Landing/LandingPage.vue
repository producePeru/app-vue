<template>
  <div class="wow">
    <div class="nav">
      <div class="container">
        <div class="nav-logos">
          <a href="https://bicentenario.gob.pe/bicentenario-2024-escribamos-juntos-una-nueva-historia/" target="_blank">
            <img class="logos" src="../../assets/img/logos/logo-bicentenario.png" alt="cyberwowpnte">
          </a>
          <a href="https://www.gob.pe/produce" target="_blank">
            <img class="logos" src="../../assets/img/logos/logo-ministerio.png" alt="cyberwowpnte">
          </a>

          <a href="https://www.gob.pe/institucion/midagri/campa%C3%B1as/33376-con-punche-peru" target="_blank">
            <img class="logos" src="../../assets/img/logos/logo-punche-peru.png" alt="cyberwowpnte">
          </a>

          <a href="https://www.gob.pe/tuempresa" target="_blank">
            <img class="logos" src="../../assets/img/logos/logo-tu-empresa.png" alt="cyberwowpnte">
          </a>
        </div>
      </div>
    </div>


    <div class="main">
      <div class="container">
        <a-carousel autoplay effect="fade">
          <div class="banner">
            <img class="text-info-1" src="../../assets/img/wow/banner.png" alt="">
            <img class="img-girl-1" src="../../assets/img/wow/banner-girl.png" alt="">
          </div>
          <div class="banner">
            <img class="text-info-2" src="../../assets/img/wow/banner-2.png" alt="">
            <img class="img-girl-2" src="../../assets/img/wow/banner-girl-2.png" alt="">
          </div>
        </a-carousel>
      </div>
    </div>


    <section>
      <div class="container" v-if="active == 'category'">
        <div class="wrapper">
          <h2>Categorías</h2>
  
            <a-row :gutter="[16, 16]">
              <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(category, idx) in categorias" :key="idx">
                <div class="description" :class="category.class" @click="handleFindBrands(category)">
                  <img v-if="category.class == 'comida'" src="../../assets/img/icons/alimentos.png"
                    :alt="category.class">
                  <img v-if="category.class == 'mascota'" src="../../assets/img/icons/mascota.png"
                    :alt="category.class">
                  <img v-if="category.class == 'moda'" src="../../assets/img/icons/maquilladora.png"
                    :alt="category.class">
                  <img v-if="category.class == 'hogar'" src="../../assets/img/icons/hogar.png" :alt="category.class">
                  <img v-if="category.class == 'servicio'" src="../../assets/img/icons/servicio.png"
                    :alt="category.class">
                  <img v-if="category.class == 'infantil'" src="../../assets/img/icons/bebe.png" :alt="category.class">
                  <h3>{{ category.nombrecategoria }}</h3>
                </div>
              </a-col>
            </a-row>
        
        </div>
      </div>
    </section>


    <section class="container" v-if="active == 'brand'">
      <div class="wrapper">
        <div class="breadcrumb">
          <h3 @click="active = 'category', spinning = true">
            <HomeOutlined /> atrás</h3>
            <h2>{{ nameCategory.nombrecategoria }}</h2>
        </div>
       
        <a-spin :spinning="spinning">
          <a-row :gutter="[16, 16]">
            <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" v-for="(brand, idx) in brands" :key="idx">
              <div class="card" @click="handleclick(brand)">
                <a-card hoverable class="brand-card">
                  <template #cover>
                    <img class="brand-img" :alt="brand.descripcion" :src="brand.imagen" />
                  </template>
                  <a-card-meta :title="brand.nombre" :description="uppercase(brand.descripcion)">
                  </a-card-meta>
                </a-card>
              </div>
            </a-col>
          </a-row>
        </a-spin>
      </div>
    </section>



    <!-- <div class="container" v-if="active == 'store'">
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
      </div> -->

    <FooterFormalization />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import FooterFormalization from '../Formalizacion/FormalizacionFooter.vue';
import { categorias, marcas, tiendas } from '@/json/wow.js';
import { HomeOutlined } from '@ant-design/icons-vue'

const spinning = ref(true);
const brands = ref(false);
const stores = ref(false);
const active = ref('category');
const nameCategory = ref('');

const timeOut = () => {
  setTimeout(() => {
    spinning.value = false
  },1000);
}
const handleFindBrands = (category) => {
  timeOut()
  active.value = 'brand';
  const filteredBrands = marcas.filter(marca => marca.categoria_id === category.id);
  if (filteredBrands.length > 0) {
    brands.value = filteredBrands;
    nameCategory.value = category
  } else {
    console.log('No se encontraron marcas para la categoría especificada.');
  }
}
const uppercase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
const handleclick = (val) => {
  if (val.linkpagina == 'none') {
    const filteredBrands = marcas.filter(marca => marca.marca_id === val.categoria_id);
    stores.value = filteredBrands;
    active.value = 'store';
  } else {
    window.open(val.linkpagina, '_blank');
  }
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=News+Cycle:wght@400;700&display=swap');
.wow {
  .nav {
    background-color: #fff;
    box-shadow: 0px 1px 10px #999;
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 99;
  }

  .container {
    height: 100%;
    padding: .6rem;
  }

  .nav-logos {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;

    .logos {
      width: 97px;
      height: 40px;
    }
  }

  .main {
    background-size: cover;
    background-image: url('../../assets/img/wow/wow.png');
    background-repeat: no-repeat;
    padding: 2rem 1rem;

    .banner {
      padding-bottom: 3rem;

      .text-info-1,
      .text-info-2 {
        width: 90%;
        margin: auto;
      }

      .img-girl-1,
      .img-girl-2 {
        display: none;
      }
    }
  }

  .wrapper {
    margin: 2rem 0 3rem 0;

    h2 {
      margin-bottom: 1.5rem;
      color: #fc2b73;
      font-family: "News Cycle", sans-serif;
      font-weight: 600;
    }
    .category-option {
      background-size: 100% 98%;
      height: 190px;
      border-radius: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .description {
      color: #fff;
      position: relative;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 160px;
      gap: 1rem;
      border-radius: 10px;
      cursor: pointer;

      &:hover {
        border-radius: 6px;
        transition: box-shadow 0.2s, border-color 0.2s;
        box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
      }

      h3 {
        font-size: 20px;
        font-family: "News Cycle", sans-serif;
        font-weight: 400;
        font-size: 18px;
        margin: 0;
      }
    }

    .brand-img {
      width: 90%;
      height: 110px;
      object-fit: scale-down;
      margin: auto;
      padding-top: 1rem;
    }
    .brand-card {
      .ant-card-meta-description {
        line-height: 1.3;
      }
      .ant-card-body {
        // padding: 12px 20px;
      }
    }
    .breadcrumb {
      display: flex;
      align-items: baseline;
      margin-bottom: 2rem;
      h2, h3 {
        margin: 0;
        font-family: "News Cycle", sans-serif;
        font-weight: 600;
      }
      h3 {
        color: #c9c9c9;
        margin-right: 12px;
        cursor: pointer;
        font-weight: 400;
        &:hover {
          color: #fc2b73;
        }
      }
    }
  }

  @media screen and (min-width: 992px) {
    .container {
      padding: 0;
    }

    .nav-logos {
      .logos {
        width: initial;
      }
    }

    .main {
      padding: 0;

      .banner {
        height: 400px;
        display: flex !important;
        align-items: center;
        justify-content: space-around;
        height: 403px;
        padding: 1rem 0 0 0;

        .text-info-1,
        .text-info-2 {
          width: 400px;
          margin: initial;
        }

        .img-girl-1 {
          display: block;
          width: 350px;
          position: relative;
          top: 1.2rem;
        }

        .img-girl-2 {
          display: block;
          width: 190px;
        }
      }
    }

    .wrapper {
      .description {
        height: 200px;

        h3 {
          font-size: 22px;
        }
      }
    }
  }
}


.comida {
  background: linear-gradient(45deg, rgba(#09AFE8, 1) 0%, rgba(#29F499, 1) 100%)
}

.mascota {
  background: linear-gradient(45deg, rgba(#06db18, 1) 0%, rgba(#06db18, 1) 100%);
}

.moda {
  background: linear-gradient(45deg, rgba(#FF998B, 1) 0%, rgba(#FF6D88, 1) 100%);
}

.hogar {
  background: linear-gradient(45deg, #FFD700 0%, #f9da2f 50%, #ffdb12 100%);
}

.servicio {
  background: linear-gradient(45deg, #8249c4 0%, #8249c4 50%, #8249c4 100%);
}

.infantil {
  background: linear-gradient(45deg, #3fa2ff 0%, #3fa2ff 50%, #3fa2ff 100%);
}
</style>