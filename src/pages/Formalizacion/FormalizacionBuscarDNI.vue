<template>
  <a-card v-if="!dataUser" style="max-width: 330px; width: 100%;">
    <a-form class="form-values" :model="formState" name="basic" layout="vertical" autocomplete="off" @finish="onSubmit">
      <a-form-item label="Número DNI" name="dni"
        :rules="[{ required: true, message: 'Por favor ingresa tu número de DNI', min:8, max:8 }]">
        <a-input v-model:value="formState.dni" @input="validateNumber('dni')" :maxlength="8" />
      </a-form-item>

      <a-button class="btn-dni btn-produce" :loading="loading" type="primary" html-type="submit">SOLICITAR</a-button>
    
    </a-form>
  </a-card>

  <!-- <FORMALIZACIONMSN v-if="isNotice" /> -->


  <section class="notice" v-if="dataUser">

    <img v-if="dataUser.booking == 'pendiente'"   src="../../assets/img/fd-ico.png" alt="">
    <img v-if="dataUser.booking == 'aprobado'"    src="../../assets/img/fd-ico-success.png" alt="">
    <img v-if="dataUser.booking == 'desaprobado'" src="../../assets/img/fd-ico-error.png" alt="">

    <h2>Hola, {{ dataUser.name }}</h2>
    
    <p v-if="dataUser.booking == 'desaprobado'">Tu solicitud ha sido desaprobada</p>

    <p v-if="dataUser.booking == 'aprobado'">Tu solicitud ha sido aprobado</p>

    <p  v-if="dataUser.booking == 'pendiente'">El proceso de verificación de datos está en proceso</p>

  </section>
</template>


<script setup>
import { reactive, ref } from 'vue';
import { requestNoToken } from '@/utils/noToken.js';

const emit = defineEmits(['dniDataPerson']);

const loading = ref(false);
const dataUser = ref(null);

const formState = reactive({
  dni: null
});

const validateNumber = (val) => {
  formState[val] = formState[val].replace(/\D/g, '');
};

const onSubmit = async () => {
  loading.value = true;
  try {
    const data = await requestNoToken({ url: `public/dni/${formState.dni}`, method: 'GET' });
    console.log("dddddd", data);
    emit('dniDataPerson', data)
  } 
  catch(e) {
    console.log('You have an error', e);
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
$color-primary: #BA0F0F;
.btn-dni {
  margin-top: .2rem;
  width: 100%;
}
.notice {
  text-align: center;
  img {
    width: 65px;
    margin-bottom: .5rem;
  }
}
</style>