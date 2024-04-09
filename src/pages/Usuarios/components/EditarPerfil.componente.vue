<template>
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
    <div>{{ update(props.updateUser) }}</div>
    <!-- <pre>{{ props.updateUser }}</pre> -->
    <a-form-item>
      <a-button type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
    </a-form-item>
  </a-form>
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
const emit = defineEmits(['closeDraw']);

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
  name: null,
  lastname: null,
  middlename: null,
  birthday: null,
  sick: null,
  phone: null,
  gender_id: null,
  cde_id: null,
  office_id: null,
  user_id : storageData.id,     //creador
});

const update = (val) => {
  if (val) {
    formState.name = val.profile.name;
    formState.lastname = val.profile.lastname;
    formState.middlename = val.profile.middlename;
    formState.birthday = val.profile.birthday;
    formState.sick = val.profile.sick;
    formState.phone = val.profile.phone;
    formState.gender_id = val.profile.gender_id;
    formState.cde_id = val.profile.cde_id;
    formState.office_id = val.profile.office_id;
    formState.email = val.email;
  }
}

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
  let payload = formState
  delete payload.email
  try {
    const data = await makeRequest({ url: `user/update/${props.updateUser.profile.id}`, method: 'PUT', data: payload });
    message.success(data.message)
    emit('closeDraw', true)
  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos')
};


</script>

<style lang="scss" scoped>
.grid-profile {
  display: grid;
  grid-template-columns: 1.5fr 1.5fr;
  grid-gap: 0 1rem;
}
</style>