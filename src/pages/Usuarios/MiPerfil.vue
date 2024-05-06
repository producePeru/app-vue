<template>
  <div>

    <div class="profile-header">
      <h3>MIS DATOS</h3>
      <router-link to="cambiar-clave">
        <a-button>Cambiar contraseña</a-button>
      </router-link>
    </div>

    <a-divider />

    <section class="my-profile">
      <a-spin :spinning="spinning">
        <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
          @finishFailed="onSubmitFail">
          <div class="grid-profile">
            <template v-for="(el, idx) in fieldx" :key="idx">

              <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
                :rules="[{ required: el.required, message: el.message }]">
                <a-select v-if="el.name == 'gender_id'" v-model:value="formState[el.name]" :options="store.genders" />
                <a-select v-if="el.name == 'cde_id'" v-model:value="formState[el.name]" :options="store.cdes" />
                <a-select v-if="el.name == 'office_id'" v-model:value="formState[el.name]" :options="store.Offices" />
                <a-select v-if="el.name == 'role_id'" v-model:value="formState[el.name]" :options="store.roles"
                  @change="handleSelectSupervisor" />
                <a-select v-if="el.name == 'supervisor_id'" v-model:value="formState[el.name]"
                  :options="store.supervisores" />
              </a-form-item>

              <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
                :rules="[{ required: el.required, message: el.message, type: el.email }]">
                <a-input v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
              </a-form-item>

              <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
                :rules="[{ required: el.required, message: el.message }]">
                <a-date-picker :locale="locale" v-model:value="birthdateDate" style="width: 100%;" :format="dateFormat" />
              </a-form-item>
            </template>
          </div>
          <!-- <pre>:::::{{ storageEmail }}</pre> -->
          <a-form-item>
            <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">ACTUALIZAR</a-button>
          </a-form-item>
        </a-form>
      </a-spin>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/actualizarUsuario.js';
import { useCounterStore } from '@/stores/selectes.js';
import { makeRequest } from '@/utils/api.js'

import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

const store = useCounterStore();
const storageData = JSON.parse(localStorage.getItem('profile'));
const storageEmail = JSON.parse(localStorage.getItem('email'));
const emit = defineEmits(['closeDraw']);
const spinning = ref(false);

store.$patch({ genders: store.genders });
store.$patch({ cdes: store.cdes });
store.$patch({ Offices: store.Offices });
store.$patch({ roles: store.roles });
store.$patch({ supervisores: store.supervisores });

store.fetchGenders()
store.fetchCdes()
store.fetchOffices()
store.fetchRoles();
const props = defineProps(['updateUser']);

const loading = ref(false);
const fieldx = ref(fields)
const birthdateDate = ref(null);
const dateFormat = 'YYYY-MM-DD';
const formState = reactive({
  email: null,
  documentnumber: null,
  name: null,
  lastname: null,
  middlename: null,
  birthday: null,
  sick: null,
  phone: null,
  gender_id: null,
  cde_id: null,
  office_id: null,
  user_id: storageData.id,     //creador
});

const handleSelectSupervisor = (val) => {
  const supervisor_id = {
    type: 'iSelect',
    label: 'Supervisador',
    name: 'supervisor_id',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  };

  if (val === 2) {
    store.fetchSupervisores();
    fieldx.value = { ...fieldx.value, supervisor_id };
  } else {
    const { supervisor_id: removed, ...newValue } = fieldx.value;
    fieldx.value = newValue;
  }
}

const onSubmit = async () => {
  loading.value = true;
  formState.birthday = birthdateDate.value ? dayjs(birthdateDate.value).format('YYYY-MM-DD') : null;
  let payload = formState
  delete payload.email
  delete payload.documentnumber
  try {
    const data = await makeRequest({ url: `user/update/${storageData.id}`, method: 'PUT', data: payload });
    message.success(data.message)
  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};

const fetchData = async() => {
  try {
    spinning.value = true;
    
    const {data} = await makeRequest({ url: 'user/my-profile', method: 'GET' });
  
    if(data) {
      formState.email = storageEmail
      formState.documentnumber = storageData.documentnumber
      formState.name = data.name;
      formState.lastname = data.lastname;
      formState.middlename = data.middlename;
      formState.birthday = data.birthday;
      formState.sick = data.sick;
      formState.phone = data.phone;
      formState.gender_id = data.gender_id;
      formState.cde_id = data.cde_id;
      formState.office_id = data.office_id;
      if(data.birthday) birthdateDate.value = dayjs(data.birthday, dateFormat);
    }

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    spinning.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
  }
}
.my-profile {
  max-width: 550px;
}
.grid-profile {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;
}
</style>