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

        <h2 class="ff title">Formulario de formalización digital</h2>
        
        <a-form class="form-values" :model="formState" name="basic" layout="vertical" autocomplete="off" @finish="onSubmit" @finishFailed="onFinishFailed">

          <h2 class="ff title2">Paso 1: Registro de datos</h2>
          <!-- <br><br><br> -->

          <a-form-item label="Número DNI" name="dni"
            :rules="[{ required: true, message: 'Por favor ingresa tu número de DNI', min:8, max:8 }]">
            <a-input v-model:value="formState.dni" @input="validateNumber" />
          </a-form-item>

          <a-form-item label="Nombres y Apellidos" name="name_lastname"
            :rules="[{ required: true, message: 'Por favor ingresa tu número de DNI' }]">
            <a-input v-model:value="formState.name_lastname" />
          </a-form-item>

          <a-form-item label="Correo electrónico" name="email"
            :rules="[{ required: true, message: 'Por favor ingresa tu correo electrónico', type: 'email' }]">
            <a-input v-model:value="formState.email" />
          </a-form-item>

          <a-form-item label="Número de celular" name="phone"
            :rules="[{ required: true, message: 'Por favor ingresa tu número de celular', min:9, max:9 }]">
            <div class="number-cel">
              <div class="flat-51">
                <img src="../assets/formalizate/flat.png" alt="peru">
                <span>+51</span>
              </div>
              <a-input v-model:value="formState.phone" />
            </div>
          </a-form-item>

          <a-form-item label="Departamento" name="departament" :rules="[{ required: true, message: 'Por favor selecciona un departamento' }]">
            <a-select v-model:value="formState.departament" show-search :options="departments" :filter-option="filterOption" @change="getProvinces" />
          </a-form-item>

          <a-form-item label="Provincia" name="province" :rules="[{ required: true, message: 'Por favor selecciona tu provincia' }]">
            <a-select v-model:value="formState.province" show-search :options="provinces" :filter-option="filterOption" @change="getDistricts" />
          </a-form-item>

          <a-form-item label="Distrito" name="district" :rules="[{ required: true, message: 'Por favor selecciona tu distrito' }]">
            <a-select v-model:value="formState.district" show-search :options="districts" :filter-option="filterOption" />
          </a-form-item>

          <a-form-item label="Dirección" name="address"
            :rules="[{ required: true, message: 'Por favor ingresa tu dirección' }]">
            <a-input v-model:value="formState.address" />
          </a-form-item>

          <a-form-item>
            <a-button :loading="loading" class="form-button" type="primary" html-type="submit">CONTINUAR</a-button>
          </a-form-item>
        </a-form>

      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-tuempresa-info">
          <img src="../assets/formalizate/logo-tuempresa.png" alt="footer logo tu empresa">
          <p class="ff">Programa Nacional "Tu Empresa" Brindamos a los emprendedores acompañamiento en formalización y constitución de empresas.</p>
        </div>

        <div></div>
       
        <div>
          <b>Contáctanos</b>
          <p>Lima - Guardia Civil : Av. Guardia Civil N° 834 - Primer Piso, San Isidro - Lima - Lima - San Isidro - Perú</p>
          <p>016162291</p>
        </div>

        <div class="footer-redes">
          <a href=""><img src="../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
          <a href=""><img src="../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
          <a href=""><img src="../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { message } from 'ant-design-vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const formState = reactive({
  dni: null,
  name_lastname: null,
  email: null,
  phone: null,
  departament: null,
  province: null,
  district: null,
  address: null,
  id_cde: null
});

const loading = ref(false);
const navBar = ref(null);
const isFloating = ref(false);
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);

const router = useRouter();

const onSubmit = async () => {
  Cookies.remove('formalizacion');
  loading.value = true
  try {
    const data = await requestNoToken({ url: '/public/formalization', method: 'POST', data: formState });
    
    if(data) {
      Cookies.set('formalization-data', JSON.stringify(formState));
      router.push({ name: 'formalizacion-mapa' });
    }
  } catch (error) {
    message.error('Error al registrar');
  } finally {
    loading.value = false
  }
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const validateNumber = () => {
  formState.dni = formState.dni.replace(/\D/g, '');
};
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const getDepartaments = async() => {
  try {
    const {data} = await requestNoToken({ url: '/departaments', method: 'GET' });
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    departments.value = [...departments.value, ...arr];
  } catch (error) {
    console.log(error);
  }
};
const getProvinces = async (id) => {
  formState.province = null
  formState.district = null
  provinces.value = []
  districts.value = []
  try {
    const { data } = await requestNoToken({ url: `/province/${id}`, method: 'GET' });
    let provincesArray = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    provinces.value = [...provinces.value, ...provincesArray];
  } catch (error) {
    console.log(error);
  }
};
const getDistricts = async (id) => {
  formState.district = null
  districts.value = []
  try {
    const { data } = await requestNoToken({ url: `/district/${id}`, method: 'GET' });
    let arr = data.map(item => ({
      label: item.label,
      value: item.id
    }));
    districts.value = [...districts.value, ...arr];
  } catch (error) {
    console.log(error);
  }
};

const handleScroll = () => {
  if (window.pageYOffset > 10) {
    isFloating.value = true;
  } else {
    isFloating.value = false;
  }
};

onMounted(() => {
  getDepartaments()
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

.form {
  padding: 4rem 0 3rem 0;
  background-color: $color-background;

  &-wrapper {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 0 4rem 0;
    h2 {
      // margin-bottom: 3rem;
    }
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
  .form-button {
    background-color: $color-primary;
    padding: 1.2rem 3rem;
    display: flex;
    align-items: center;
    margin: 2rem auto 0 auto;
    font-size: 15px;
  }
}

footer {
  padding: 3rem;
  p, b {
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
}
</style>






<style>
.ant-input, .ant-select-selector {
  height: 38px !important;
  /* background-color: #fbfbfb; */
}
.ant-form-item-label {
  padding: 0 0 4px !important;
}
</style>