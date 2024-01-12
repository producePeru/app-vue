<template>
  <div class="container">

    <img class="hero" src="https://soporte-pnte.com/tuempresa/assets/images/fondo.jpeg" alt="">

    <div class="wrapper-login">
      <div class="title">
        <img class="logo" src="https://www.tuempresa.gob.pe/wp-content/uploads/2021/10/Produce-TuEmpresa.png" alt="">
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

        <!-- <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">Recuerdame</a-checkbox>
          </a-form-item>
        </a-form-item> -->
        <br />

        <a-form-item>
          <a-button size="large" block type="primary" html-type="submit" class="btn-login" :loading="loading">Ingresar</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { requestNoToken } from '@/utils/noToken.js'
import { reactive, ref } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import { makeRequest } from '@/utils/api.js'
import CryptoJS from 'crypto-js';
// import { useSideBar } from '../stores/index';
// const myStore = useSideBar();

const loading = ref(false)
const router = useRouter();

const formState = reactive({
  email: '',
  password: '',
});

const onSubmit =async() => {
  loading.value = true
  try {
    const payload = formState
    const {data} = await requestNoToken({ url: '/login', method: 'POST', data:  payload });
    
    const personalData = {
      'email': data.email,
      'name': data.name,
      'nick': data.nick
    }
    
    localStorage.setItem('user', JSON.stringify(personalData));
    Cookies.set('token', data.access_token);                          //token
    Cookies.set('user', data.id);                                     //data-user-id
    Cookies.set('role', data.role);                                   //role-user

    if(data.access_token) await fetchData(data.id);

    router.push('/admin/inicio');
  
  } catch (error) {
    message.error("Las credenciales son incorrectas")
    console.error('Error de red:', error);
  } finally {
    loading.value = false
  }
};

const visibles = [
  "inicio",
  'usuarios','nuevo-usuario', 'lista', 
  'ruta-digital', 'reportes', 'calendario', 'talleres', 'mype', 'expositores', 'test-entrada', 'editar-test-entrada', 'test-salida', 'editar-test-salida', 'taller-descripcion',
  'convenios', 'nuevo-convenio', 'compromisos', 'lista-convenios'
]

const fetchData = async(id) => {
  try {
    const {data} =  await makeRequest({ url: `/permission/${id}`, method: 'GET'});
    
    const secretKey = 'vistas_secret_key';

    if(data.views == '***') {
      localStorage.setItem('views', CryptoJS.AES.encrypt(JSON.stringify(visibles), secretKey).toString());
    } else {
      data.views = [...data.views, "inicio"]
      localStorage.setItem('views', CryptoJS.AES.encrypt(JSON.stringify(data.views), secretKey).toString());
    }

  } catch (error) {
    console.error('Error de red:', error);
  }
}

const onFinishFailed = () => {
  message.error('Sin acceso');
};
</script>

<style lang="scss" scoped>
.container {
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
      width: 368px;
      min-width: 260px;
      margin: 0 auto;
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
  }
}

.title {
  text-align: center;
  .logo {
    width: 150px;
    width: 220px;
    margin-bottom: 2rem;
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