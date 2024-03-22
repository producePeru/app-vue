<template>

  <div style="padding: 0 1rem;">
    <h2 class="ff title">Formulario de formalización digital</h2>

    <a-form class="form-values" :model="formState" name="basic" layout="vertical" autocomplete="off" @finish="onSubmit"
      @finishFailed="onFinishFailed">

      <h2 class="ff title2">Paso 1: Registro de datos</h2>
      <!-- <br><br><br> -->

      <a-form-item label="Número DNI" name="number_document"
        :rules="[{ required: true, message: 'Por favor ingresa tu número de DNI', min: 8, max: 8 }]">
        <a-input v-model:value="formState.number_document" @input="validateNumber('dni')" :maxlength="8" disabled />
      </a-form-item>

     
      <a-form-item label="Apellido Paterno" name="last_name"
        :rules="[{ required: true, message: 'Por favor ingresa tu apellido paterno' }]">
        <a-input v-model:value="formState.last_name" disabled />
      </a-form-item>

      <a-form-item label="Apellido Materno" name="middle_name"
        :rules="[{ required: true, message: 'Por favor ingresa tu apellido materno' }]">
        <a-input v-model:value="formState.middle_name" disabled />
      </a-form-item>
      

      <a-form-item label="Nombres" name="name"
        :rules="[{ required: true, message: 'Por favor ingresa tu nombre' }]">
        <a-input v-model:value="formState.name" disabled />
      </a-form-item>

      <a-form-item label="Correo electrónico" name="email"
        :rules="[{ required: true, message: 'Por favor ingresa tu correo electrónico', type: 'email' }]">
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item label="Número de celular" name="phone"
        :rules="[{ required: true, message: 'Por favor ingresa tu número de celular' }]">
        <div class="number-cel">
          <div class="flat-51">
            <img src="../../assets/formalizate/flat.png" alt="peru">
            <span>+51</span>
          </div>
          <a-input v-model:value="formState.phone" @input="validateNumber('phone')" :maxlength="9" />
        </div>
      </a-form-item>

      <a-form-item label="Departamento" name="department"
        :rules="[{ required: true, message: 'Por favor selecciona un departamento' }]">
        <a-select v-model:value="formState.department" show-search :options="departments" :filter-option="filterOption"
          @change="getProvinces" />
      </a-form-item>

      <a-form-item label="Provincia" name="province"
        :rules="[{ required: true, message: 'Por favor selecciona tu provincia' }]">
        <a-select v-model:value="formState.province" show-search :options="provinces" :filter-option="filterOption"
          @change="getDistricts" />
      </a-form-item>

      <a-form-item label="Distrito" name="district"
        :rules="[{ required: true, message: 'Por favor selecciona tu distrito' }]">
        <a-select v-model:value="formState.district" show-search :options="districts" :filter-option="filterOption" />
      </a-form-item>

      <a-form-item label="Dirección" name="address"
        :rules="[{ required: true, message: 'Por favor ingresa tu dirección' }]">
        <a-input v-model:value="formState.address" />
      </a-form-item>

      <a-form-item>
        <a-checkbox v-model:checked="accept" name="type" @change="handleCheckTerminos">
          He leído y acepto los términos y condiciones
          <router-link to="/politicas-privacidad" target="_blank" style="margin-left: .5rem;">Ver términos y
            condiciones</router-link>
        </a-checkbox>
        <div v-if="showerror" class="error-msn">Acepta los términos y condiciones</div>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" class="form-button btn-produce" type="primary" html-type="submit">CONTINUAR</a-button>
      </a-form-item>
    </a-form>

  </div>

</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { requestNoToken } from '@/utils/noToken.js'
import { message } from 'ant-design-vue';

const storageData = JSON.parse(localStorage.getItem('user'));
const props = defineProps(['dniData']);
const emit = defineEmits(['dataPerson']);

const formState = reactive({
  document_type: 'dni',
  number_document: null,
  last_name: null,
  middle_name: null,
  name: null,
  email: null,
  phone: null,
  department: null,
  province: null,
  district: null,
  address: null,

  created_by: storageData ? storageData.id : null,
  update_by: storageData ? storageData.id : null,
  post: 5
});

const showerror = ref(false);
const accept = ref(false);
const loading = ref(false);
const departments = ref([]);
const provinces = ref([]);
const districts = ref([]);

const handleCheckTerminos = () => {
  if (showerror.value) showerror.value = false
}
const getToken = () => {
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LcQMYopAAAAAHSEhhbYKcmXQuwDPScDljW1ZBUu', { action: 'submit' })
        .then(token => {
          resolve(token);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

const onSubmit = async () => {
  if (!accept.value) {
    showerror.value = true;
    return message.error('Completa los valores del formulario');
  }

  loading.value = true

  try {
    const token = await getToken();
    const captcha = await requestNoToken({ url: '/public/formalization-user', method: 'POST', data: { recaptcha_token: token, data: formState } });

    if (captcha) {
  
      const values = {
        'dni_person': formState.number_document,
        'id_gps': null,
      }

      await requestNoToken({ url: '/public/formalization-digital', method: 'POST', data: values });
      emit('dataPerson', formState)
   

    } else {
      message.warning('No verificado')
    }

  } catch (error) {
    message.error('Error al registrar');
  } finally {
    loading.value = false
  }
};
const onFinishFailed = () => {
  message.error('Completa los valores del formulario');
};

const validateNumber = (val) => {
  formState[val] = formState[val].replace(/\D/g, '');
};
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const getDepartaments = async () => {
  try {
    const { data } = await requestNoToken({ url: '/departaments', method: 'GET' });
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



onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js?render=6LcQMYopAAAAAHSEhhbYKcmXQuwDPScDljW1ZBUu';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  getDepartaments()

  formState.number_document = props.dniData.numeroDocumento
  formState.last_name = props.dniData.apellidoPaterno
  formState.middle_name = props.dniData.apellidoMaterno
  formState.name = props.dniData.nombres

  if(props.dniData.email) formState.email = props.dniData.email
  if(props.dniData.phone) formState.phone = props.dniData.phone
  if(props.dniData.department) {
    formState.department = props.dniData.department
    getProvinces(props.dniData.department)
  } 

  if(props.dniData.province) {
    formState.province = props.dniData.province
    getDistricts(props.dniData.province)
  }
  if(props.dniData.district) formState.district = props.dniData.district
});

</script>

<style lang="scss" scoped>
.column-2 {
  display: flex;
  gap: 0 1.5rem;
}

.ff {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
}

.title {
  font-size: 26px;
  color: #2D3748;
  font-weight: 700;
}

.title2 {
  font-size: 18px;
  color: #2D3748;
  font-weight: 700;
  margin-bottom: .8rem;
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
        width: 32px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }

  .form-button {
    padding: 1.2rem 3rem;
    display: flex;
    align-items: center;
    margin: 2rem auto 0 auto;
    font-size: 15px;
  }
}

.error-msn {
  color: #ff4d4f;
  font-size: 12px;
}

@media screen and (max-width: 900px) {
  .form-wrapper {
    padding: 3rem 1.5rem;

    h2 {
      margin-bottom: 1.5rem;
    }
  }

  .form {
    padding: 2rem 0;
  }
}
</style>

<style>
.ant-input-disabled {
  color: #000000e0 !important;
}
.ant-input,
.ant-select-selector {
  height: 38px !important;
  /* background-color: #fbfbfb; */
}

.ant-form-item-label {
  padding: 0 0 4px !important;
}
</style>