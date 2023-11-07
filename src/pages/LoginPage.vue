<template>
  <div class="container">

    <div class="title">
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
.container {
  position: relative;
  width: 100%;
  padding: 110px 0 144px;
  background-image: url(https://store.antdv.com/pro/preview/assets/background-d7103c44.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  min-height: 100vh;

  .form-wrapper {
    width: 368px;
    min-width: 260px;
    margin: 0 auto;
  }
}

.title {
  text-align: center;

  h1 {
    color: var(--text-color);
    position: relative;
    top: 2px;
    color: var(--text-color);
    font-weight: 600;
    font-size: 33px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  span {
    font-family: sans-serif;
    color: var(--text-color-secondary);
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