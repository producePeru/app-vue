<template>
  <h3 class="title-produce">REGISTRO DE NUEVO ASESOR EXTERNO - NOTARÍA</h3>

  <a-divider />

  <div class="user">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fieldx" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'notary_id'" v-model:value="formState[el.name]" :options="notaries"
              option-label-prop="name" show-search :filter-option="filterNotaries">
              <template #option="{ value: val, name, city, province, district, address }">
                <div class="select-notaries">
                  <span class="name">{{ name }}</span>
                  <span class="city">{{ city }} - {{ province }} - {{ district }}</span>
                  <span class="address">{{ address }}</span>
                </div>
              </template>
            </a-select>
            <a-select v-if="el.name == 'gender_id'" v-model:value="formState[el.name]" :options="store.genders" />
            <a-select v-if="el.name == 'cde_id'" v-model:value="formState[el.name]" :options="store.cdes" />
            <a-select v-if="el.name == 'role_id'" v-model:value="formState[el.name]" :options="rolesExternos" />
            <a-select v-if="el.name == 'supervisor_id'" v-model:value="formState[el.name]"
              :options="store.supervisores" />
          </a-form-item>



          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-if="el.name == 'documentnumber'" v-model:value="formState[el.name]" :maxlength="el.max"
              @input="validateOnlyNumber('documentnumber')" />
            <a-input v-else-if="el.name == 'phone'" v-model:value="formState[el.name]" :maxlength="el.max"
              @input="validateOnlyNumber('phone')" />
            <a-input v-else v-model:value="formState[el.name]" :maxlength="el.max" :disabled="el.disabled" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iDate'" :name="el.name" :label="el.label"
            :rules="[{ required: el.required, message: el.message }]">
            <a-date-picker :locale="locale" v-model:value="birthdateDate" style="width: 100%;" :format="dateFormat" />
          </a-form-item>
        </template>
      </div>

      <a-form-item>
        <a-button class="btn-produce" type="primary" html-type="submit" :loading="loading">GUARDAR</a-button>
      </a-form-item>

      <!-- <pre>{{ notaries }}</pre> -->

    </a-form>
  </div>
</template>

<script setup>
import { h, reactive, ref, defineComponent, onMounted } from 'vue';
import { requestNoToken } from '@/utils/noToken.js';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevoUsuarioNotariaExterna.js';
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/selectes.js';
import { Modal } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const store = useCounterStore();
const storageData = JSON.parse(localStorage.getItem('profile'));

store.$patch({ genders: store.genders });
store.$patch({ cdes: store.cdes });

store.fetchGenders();
store.fetchCdes();

const notaries = ref([]);
const fieldx = ref(fields);
const birthdateDate = ref(null);
const route = useRoute();
const loading = ref(false);
const dateFormat = 'DD/MM/YYYY';

const rolesExternos = [
  { label: 'Notaria', value: 7 },
];

const formState = reactive({});

const filterNotaries = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedName = option.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedCity = option.city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedProvince = option.province.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedDistrict = option.district.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return normalizedName.includes(normalizedInput) ||
    normalizedCity.includes(normalizedInput) ||
    normalizedProvince.includes(normalizedInput) ||
    normalizedDistrict.includes(normalizedInput);
};

const fetchDataNotaries = async () => {
  try {
    const { data } = await requestNoToken({
      url: 'public/notaries-filters',
      method: 'GET',
    });

    notaries.value = data.map(item => ({
      value: item.id,
      name: item.name,
      city: item.city.name,
      province: item.province.name,
      district: item.district.name,
      address: item.address
    }));

  } catch (error) {
    console.error('Error de red:', error);
  }
};

const clearFields = () => {
  formState.name = null;
  formState.lastname = null;
  formState.middlename = null;
  formState.documentnumber = null;
  birthdateDate.value = null;
  formState.phone = null;
  formState.gender_id = null;
  formState.cde_id = null;
  formState.office_id = null;
  formState.email = null;
  formState.password = null;
  formState.role_id = null;
  formState.notary_id = null;
};

const validateOnlyNumber = (val) => {
  formState[val] = formState[val].replace(/\D/g, '');
};

const onSubmit = async () => {
  loading.value = true;
  formState.email = `${formState.name.replace(/\s/g, '').toLowerCase()}${formState.lastname.replace(/\s/g, '').toLowerCase()}@pnte.com`;
  formState.password = formState.documentnumber;
  formState.birthday = birthdateDate.value ? dayjs(birthdateDate.value).format('YYYY-MM-DD') : null;

  const payloadNotary = { notary_id: formState.notary_id }

  const cdeNotary = await makeRequest({ url: 'create/cde-notary', method: 'POST', data: payloadNotary });
  console.log("😄😁", cdeNotary);

  try {

    const payloadUser = {
      email: formState.email,
      documentnumber: formState.documentnumber,
      password: formState.documentnumber
    };

    const dataUser = await makeRequest({ url: 'user/register-user', method: 'POST', data: payloadUser });

    if (dataUser.status !== 200) throw new Error('User registration failed');

    const payloadProfile = {
      name: formState.name,
      lastname: formState.lastname,
      middlename: formState.middlename,
      documentnumber: formState.documentnumber,
      birthday: formState.birthday,
      phone: formState.phone,
      gender_id: formState.gender_id,
      cde_id: cdeNotary,
      office_id: 5,
      user_id: dataUser.data.id,
      notary_id: formState.notary_id
    };

    const statusProfile = await makeRequest({ url: 'user/register-profile', method: 'POST', data: payloadProfile });

    if (statusProfile.status !== 200) throw new Error('Profile registration failed');

    const payloadRole = {
      role_id: formState.role_id,
      user_id: dataUser.data.id,
      documentnumber: formState.documentnumber,
    };

    const statusRole = await makeRequest({ url: 'user/register-roles', method: 'POST', data: payloadRole });

    if (statusRole.status !== 200) throw new Error('Role registration failed');

    const payloadViews = {
      user_id: dataUser.data.id,
    };

    const data = await makeRequest({ url: 'user/register-views', method: 'POST', data: payloadViews });

    Modal.success({
      title: 'La cuenta ha sido registrada',
      content: h('div', {}, [
        h('br'),
        h('p', `Correo: ${formState.documentnumber} o ${formState.email}`),
        h('p', 'Contraseña es el número de DNI ingresado'),
      ]),
      onOk() {
        clearFields();
      }
    });

  } catch (error) {
    message.error('No se pudo registrar este usuario');
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos');
};

onMounted(() => {
  fetchDataNotaries();
});
</script>

<style lang="scss" scoped>
.select-notaries {
  display: flex;
  flex-direction: column;

  .name {
    margin-bottom: .15rem;
    font-weight: 500;
    font-size: 15px;
    color: var(--secondary);
  }

  .city {
    color: var(--primary);
    display: block;
    margin-bottom: .2rem;
  }

  .city,
  .address {
    font-size: 12px;
    line-height: 1.2;
  }
}

.user {
  display: grid;
  grid-template-columns: 52% 42%;
  grid-gap: 5%;
}

.grid-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 1rem;

  .ant-form-item:nth-child(1) {
    grid-column: 1/3;
  }
}

.item-max {
  width: 100%;
  min-width: 100px;
}
</style>
