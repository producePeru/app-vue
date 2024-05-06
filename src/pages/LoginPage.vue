<template>
  <div class="container-login" >

    <img class="hero" src="../assets/img/login/login.jpg" alt="login">

    <div class="wrapper-login">
      <div class="title">
        <h1>Iniciar Sesión</h1>
        <span>Ingrese su usuario y contraseña para ingresar a la plataforma.</span>
      </div>

      <a-form class="form-wrapper" :model="formState" name="basic" autocomplete="off" @finish="onSubmit" @finishFailed="onFinishFailed">

        <a-form-item name="email" :rules="[{ required: true, message: 'Ingresa tu cuenta de email' }]">
          <a-input v-model:value="formState.email" size="large">
            <template #prefix>
              <UserOutlined class="input-ico" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: 'La contraseña es incorrecta' }]">
          <a-input-password v-model:value="formState.password" size="large">
            <template #prefix>
              <LockOutlined class="input-ico" />
            </template>
          </a-input-password>
        </a-form-item>

        <br />

        <a-form-item>
          <a-button size="large" block type="primary" html-type="submit" class="btn-login" :loading="loading">Ingresar</a-button>
        </a-form-item>
 
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { requestNoToken } from '@/utils/noToken.js'

const loading = ref(false)
const router = useRouter();
const islogin = ref(false);

const formState = reactive({
  email: '',
  password: '',
});

const onSubmit =async() => {
  // return console.log("iaiiaia", window.location.hostname);
  loading.value = true;
  try {
    const data = await requestNoToken({ url: `login`, method: 'POST', data:  formState });

    localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('profile', JSON.stringify(data.profile));
    localStorage.setItem('role', JSON.stringify(data.role));
    localStorage.setItem('email', JSON.stringify(data.email));

    const encViews = CryptoJS.AES.encrypt(JSON.stringify(data.views), 'appvistas').toString();
    localStorage.setItem('views', encViews);

    Cookies.set('token', data.token);

    router.push('/admin/inicio');

  } catch (error) {
    message.error("Las credenciales son incorrectas")
    console.log("Error: " + error)
  } finally {
    loading.value = false
  }
};


const onFinishFailed = () => {
  message.error('Sin acceso');
};
</script>

<style lang="scss" scoped>
.container-login {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  .hero {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;
  }
  .wrapper-login {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 2rem;
    .form-wrapper {
      width: 100%;
      .btn-login {
        background-color: var(--primary) !important;
      }
    }
  }
  @media screen and (min-width: 720px) {
    grid-template-columns: 1.8fr 1fr;
    .hero {
      display: block;
    }
    .form-wrapper {
      width: 368px !important;
    }
  }
}

.title {
  text-align: center;
  .logo {
    // width: 150px;
    // width: 220px;
    margin-bottom: 2rem;
    max-width: 220px;
    width: 100%;
  }
  h1 {
    position: relative;
    top: 2px;
    // color: #fff;
    font-weight: 600;
    font-size: 33px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  span {
    font-family: sans-serif;
    // color: #fff;
    font-size: 14px;
    margin-top: 12px;
    margin-bottom: 30px;
    display: block;
  }
}

.input-ico {
  color: var(--primary-color);
  font-size: var(--font-size-base);
}
</style>