<template>
  <div class="container">

    <img class="hero" src="https://soporte-pnte.com/tuempresa/assets/images/fondo.jpeg" alt="">

    <div class="wrapper-login">
      <div class="title">
        <img class="logo" src="https://www.tuempresa.gob.pe/wp-content/uploads/2021/10/Produce-TuEmpresa.png" alt="">
        <h1>Iniciar Sesión</h1>
        <span>Ingrese su usuario y contraseña para ingresar a la plataforma.</span>
      </div>

      <a-form class="form-wrapper" :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

        <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" size="large">
            <template #prefix>
              <UserOutlined class="input-ico" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" size="large">
            <template #prefix>
              <LockOutlined class="input-ico" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">Recuerdame</a-checkbox>
          </a-form-item>
        </a-form-item>

        <a-form-item>
          <a-button size="large" block type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>

  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formState = reactive({
  username: '',
  password: '',
  remember: true,
});

const onFinish = (values) => {
  console.log('Success:', values);
  router.push('/admin/usuarios/lista');
};

const onFinishFailed = () => {
  message.error('Sin acceso');
};
</script>



<style lang="scss" scoped>
.hero {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}
.container {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  min-height: 100vh;


  .form-wrapper {
    width: 368px;
    min-width: 260px;
    margin: 0 auto;
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
.wrapper-login {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>