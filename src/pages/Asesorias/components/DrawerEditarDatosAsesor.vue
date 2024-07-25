<template>
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
            <a-date-picker :locale="locale" v-model:value="formState[el.name]" style="width: 100%;" :format="dateFormat" placeholder="día/mes/año" />
          </a-form-item>
        </template>
      </div>

      <div>{{ update(props.record) }}</div>
      <!-- <pre>{{record}}</pre> -->
      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/actualizarAsesor.js';
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
const props = defineProps(['record']);
const spinning = ref(true);
const dateFormat = 'DD/MM/YYYY';
const loading = ref(false);
const fieldx = ref(fields)
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
    formState.name = val.profile_name;
    formState.lastname = val.profile_lastname;
    formState.middlename = val.profile_middlename;
    formState.documentnumber = val.profile_documentnumber
    formState.phone = val.profile_phone;
    formState.gender_id = val.gender_id;
    formState.cde_id = val.cde_id;
    formState.office_id = val.office_id;
    formState.email = val.email;
    if(val.profile_birthday) formState.birthday = dayjs(val.profile_birthday, 'YYYY-MM-DD');
  }
  if(store.genders?.length) spinning.value = false;
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
  const payload = {
    name: formState.name,
    lastname: formState.lastname,
    middlename: formState.middlename,
    birthday: formState.birthday ? dayjs(formState.birthday).format('YYYY-MM-DD') : null,
    sick: formState.sick,
    phone: formState.phone,
    gender_id: formState.gender_id,
    cde_id: formState.cde_id,
    office_id: formState.office_id,
    user_id: storageData.id,     
  }
  try {
    const data = await makeRequest({ url: `user/update/${props.record._id}`, method: 'PUT', data: payload });
    message.success(data.message);
    emit('closeDraw');
  } catch (error) {
    // message.error('No se pudo registrar este usuario', error);
    console.log("NOOo", error);
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