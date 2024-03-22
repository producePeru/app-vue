<template>
  <h3>CAMBIAR CONTRASEÑA</h3>

  <a-divider />

  <div class="password">
    <a-form 
    layout="vertical" 
    ref="formRef" 
    name="custom-validation" 
    :model="formState" 
    :rules="rules" 
    @finish="onSubmit" 
    @finishFailed="handleFinishFailed">
      
      <a-form-item has-feedback label="Contraseña actual" name="current_password">
        <a-input-password v-model:value="formState.current_password" type="password" autocomplete="off" />
      </a-form-item>  

      <a-form-item has-feedback label="Nueva contraseña" name="password">
        <a-input v-model:value="formState.password" type="password" autocomplete="off" />
      </a-form-item>

      <a-form-item has-feedback label="Repetir la nueva contraseña" name="password_confirmation">
        <a-input v-model:value="formState.password_confirmation" type="password" autocomplete="off" />
      </a-form-item>

      <!-- <pre>{{ storageData }}</pre> -->

      <a-form-item>
        <a-button :loading="loading" class="password-btn" type="primary" html-type="submit">CAMBIAR</a-button>
      </a-form-item>

    </a-form>
  </div>


</template>

<script setup>
import { makeRequest } from '@/utils/api.js'
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const storageData = JSON.parse(localStorage.getItem('user'))
const router = useRouter();

import { reactive, ref } from 'vue';
const formRef = ref();
const loading = ref(false);
const formState = reactive({
  current_password: null,
  password: '',
  password_confirmation: null,
});

const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Por favor ingrese la contraseña');
  } else if (value.length >= 8) {
    formRef.value.validateFields('password_confirmation'); 
    return Promise.resolve();
  } else {
    return Promise.reject('La contraseña debe tener al menos 8 caracteres');
  }
};
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Por favor ingrese la nueva contraseña nuevamente');
  } else if (value !== formState.password) {
    return Promise.reject("No coinciden las contraseñas!");
  } else {
    return Promise.resolve();
  }
};

const rules = {
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: 'change',
    },
  ],
  password_confirmation: [
    {
      validator: validatePass2,
      trigger: 'change',
    },
  ],
  current_password: [
    {
      required: true,
      trigger: 'change',
    },
  ],
};

const onSubmit = async() => {
  loading.value = true
  try {
    const data = await makeRequest({ url: `/change-password-user/${storageData.id}/${storageData.document_number}`, method: 'POST', data: formState });
    message.success(data.message);
    router.push({name: 'mi-perfil'});
  } catch (error) {
    message.error('La contraseña actual es incorrecta');
  } finally {
    loading.value = false;
  }
};
const handleFinishFailed = errors => {
  console.log(errors);
};

</script>

<style lang="scss" scoped>
.password {
  max-width: 300px;
}
.password-btn {
  margin-top: 1rem;
}
</style>