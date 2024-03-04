<template>
  <header class="header" ref="navBar" :class="{ floatingNav: isFloating }">
    <div class="container header-wrapper">
      <img src="../../assets/formalizate/logo-produce.png" alt="logo-produce">
      <img src="../../assets/formalizate/logo-tuempresa.png" alt="logo-tu-empresa">
    </div>
  </header>
  <!-- <pre>{{ markerInfo }}</pre> -->

  <section class="form-map">
    <div class="container">
      <div class="background-map">
        <h2 class="title2 ff">Paso 2: Selección de puntos de atención</h2>
        <div class="info-gps">
          <span>Este ícono
          <img src="../../assets/formalizate/gps-ico.png" alt="formalizate ubicación">
          represeta la ubicación geográfica de nuestros centros de desarrollo empresarial, pulse en el mapa a continuación para elegir el de su preferencia.</span>
        </div>
        <!-- <input type="text" ref="searchInput" placeholder="Buscar lugar..." /> -->
        <!-- <br>
        <br> -->
        <div ref="mapContainer" style="height: 500px;"></div>

      </div>
    </div>
  </section>

  
  <a-modal v-model:open="open" title="" width="350px" :footer="false">
    <div class="modal-info ff">
      <span>Quiero atenderme aquí</span>
      <h3>{{ markerInfo.title }}</h3>
    </div>
    <a-button @click="onSubmit" :loading="loading" class="form-button" type="primary" html-type="submit">ESCOGER</a-button>
  </a-modal>


  <footer>
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-tuempresa-info">
          <img src="../../assets/formalizate/logo-tuempresa.png" alt="footer logo tu empresa">
          <p class="ff">Programa Nacional "Tu Empresa" Brindamos a los emprendedores acompañamiento en formalización y
            constitución de empresas.</p>
        </div>

        <div></div>

        <div>
          <b>Contáctanos</b>
          <p>Lima - Guardia Civil : Av. Guardia Civil N° 834 - Primer Piso, San Isidro - Lima - Lima - San Isidro - Perú
          </p>
          <p>016162291</p>
        </div>

        <div class="footer-redes">
          <a href=""><img src="../../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
          <a href=""><img src="../../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
          <a href=""><img src="../../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const router = useRouter();

let map;
const mapContainer = ref(null);
let searchInput;
const loading = ref(false);
const open = ref(false);
const navBar = ref(null);
const isFloating = ref(false);
const markers = ref([]);
const markerInfo = ref(null);
import Cookies from 'js-cookie';

const showModal = (data) => {
  markerInfo.value = data
  open.value = true;
};

const onSubmit = async () => {
  let payload = Cookies.get('formalization-data');

  if(!payload) router.push({ name: 'formalizacion' });

  payload = JSON.parse(payload);
  payload.id_gps_cdes = markerInfo.value.title;
  loading.value = true
  try {
    const data = await requestNoToken({ url: '/public/formalization', method: 'POST', data: payload });
    if(data.status == 200) {
      router.push({ name: 'formalizacion' });
      message.success(data.message);
      Cookies.remove('formalization-data');
    }
  } catch (error) {
    message.error('Error al registrar xd');
  } finally {
    loading.value = false
  }
};

const handleScroll = () => {
  if (window.pageYOffset > 10) {
    isFloating.value = true;
  } else {
    isFloating.value = false;
  }
};
const locationsCdes = async() => {
  try {
    const {data} = await requestNoToken({ url: `/public/location-cdes`, method: 'GET' });
    const formattedData = data.map(item => ({
      position: {
        lat: parseFloat(item.position.lat),
        lng: parseFloat(item.position.lng)
      },
      title: item.title
    }));

    markers.value = [...markers.value, formattedData];
  } catch (error) {
    console.log(error);
  }
};


onMounted(async () => {
  window.addEventListener('scroll', handleScroll);

  await locationsCdes();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      map = new window.google.maps.Map(mapContainer.value, {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 11,
      });

      markers.value[0].forEach(markerInfo => {
        const marker = new window.google.maps.Marker({
          position: markerInfo.position,
          map,
          title: markerInfo.title
        });

        marker.addListener('click', () => {
          showModal(markerInfo);
        });
      });

      searchInput = new window.google.maps.places.SearchBox(document.getElementById('searchInput'));

      searchInput.addListener('places_changed', () => {
        const places = searchInput.getPlaces();

        if (places.length === 0) {
          return;
        }

        const place = places[0];
        map.setCenter(place.geometry.location);
        map.setZoom(15);

        new window.google.maps.Marker({
          position: place.geometry.location,
          map,
          title: place.name
        });
      });
    }, () => {
      console.error('Error al obtener la ubicación del usuario.');
    });
  } else {
    console.error('La geolocalización no está disponible en este navegador.');
  }
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

.floatingNav {
  border-radius: 2px;
  box-shadow: 0px 1px 10px #cbcbcb;
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.ff {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
}
.info-gps {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  span {
    font-size: 14px;
  }
  img {
    width: 30px;
  }
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
.background-map {
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
}
.form-map {
  padding: 2rem 0;
  background-color: $color-background;

  &-wrapper {
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h2 {
      margin-bottom: 3rem;
    }
  }
}
.modal-info {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3 {
    margin: .5rem 0 0 0;
  }
}
.form-button {
    background-color: $color-primary;
    padding: 1.2rem 3rem;
    display: flex;
    align-items: center;
    margin: 1rem auto 0 auto;
    font-size: 15px;
    &:active, &:hover {
      background-color: $color-primary;
    }
  }
.form-values {
  max-width: 600px !important;
  width: 100%;

  .ant-form-item-label {
    padding: 0 0 4px !important;
  }

  .number-cel {
    display: flex;
    gap: .6rem;

    .flat-51 {
      display: flex;
      border: 1px solid #d9d9d9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .3rem 1rem;
      height: 38px;
      border-radius: 6px;

      img {
        width: 35px;
        height: 25px;
        margin-right: 5px;
      }
    }
  }
}

footer {
  padding: 3rem;

  p,
  b {
    font-size: 13px;
    color: $color-text;
    line-height: 1.3;
  }

  .footer-wrapper {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1.7fr .6fr;
  }

  .footer-tuempresa-info {
    img {
      width: 100px;
    }
  }

  .footer-redes {
    img {
      width: 45px;
    }
  }
}

@media screen and (max-width: 900px) {
  .title {
    font-size: 24px;
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

  .form-wrapper {
    padding: 3rem 1.5rem;

    h2 {
      margin-bottom: 1.5rem;
    }
  }

  .form {
    padding: 2rem 0;
  }

  footer {
    .footer-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}</style>


<style>.ant-input,
.ant-select-selector {
  height: 38px !important;
  /* background-color: #fbfbfb; */
}
.ant-form-item-label {
  padding: 0 0 4px !important;
}
.gm-style-mtc-bbw {
  display: none !important;
}
</style>