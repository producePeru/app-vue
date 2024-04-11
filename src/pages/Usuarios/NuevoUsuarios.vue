<template>
  <h3>REGISTRO DE USUARIO</h3>

  <a-divider />

  <div class="user">
    <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit"
      @finishFailed="onSubmitFail">
      <div class="grid-item">
        <template v-for="(el, idx) in fieldx" :key="idx">

          <a-form-item class="item-max" v-if="el.type === 'iSelect'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message }]">
            <a-select v-if="el.name == 'gender_id'" v-model:value="formState[el.name]" :options="store.genders" />
            <a-select v-if="el.name == 'cde_id'" v-model:value="formState[el.name]" :options="store.cdes" />
            <!-- <a-select v-if="el.name == 'office_id'" v-model:value="formState[el.name]" :options="store.Offices" /> -->
            
            
            <template v-if="storageRole[0].id == 3">
              <a-select v-if="el.name == 'role_id'" v-model:value="formState[el.name]" :options="rolesKarina" @change="handleSelectSupervisor" />
            </template>
            <template v-else>
              <a-select v-if="el.name == 'role_id'" v-model:value="formState[el.name]" :options="store.roles" @change="handleSelectSupervisor" />
            </template>
            

            <a-select v-if="el.name == 'supervisor_id'" v-model:value="formState[el.name]" :options="store.supervisores" />

          
            <a-select v-if="el.name == 'office_id'" v-model:value="formState[el.name]" show-search :options="store.Offices"
              :filter-option="filterOption">
              <template #dropdownRender="{ menuNode: menu }">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <a-space style="padding: 4px 8px">
                  <a-input ref="inputRef" v-model:value="nameNewItem" placeholder="Nueva actividad" />
                  <a-button type="text" @click="handleAddItem" :loading="loadingNewIten">
                    <template #icon>
                      <PlusOutlined />
                    </template>
                    Agregar
                  </a-button>
                </a-space>
              </template>
            </a-select>
          
          </a-form-item>

          <a-form-item v-if="el.type === 'iSearch'" class="item-max" :name="el.name" :label="el.label"
          :rules="[{ required: el.required, message: el.message, max: el.max }]">
            <a-input-search :maxlength="15" :loading="searchLoading" v-model:value="formState[el.name]"
            @search="handleSearchApi" @input="validateNumber" :disabled="upDisabled" />
          </a-form-item>

          <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label" :rules="[{ required: el.required, message: el.message, type: el.email }]">
            <a-input v-if="el.name == 'documentnumber'" v-model:value="formState[el.name]" :maxlength="el.max" @input="validateOnlyNumber('documentnumber')" />
            <a-input v-else-if="el.name == 'phone'" v-model:value="formState[el.name]" :maxlength="el.max" @input="validateOnlyNumber('phone')" />
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
    </a-form>
  </div>
</template>

<script setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import { makeRequest } from '@/utils/api.js'
import { h, reactive, ref, defineComponent } from 'vue';
import { message } from 'ant-design-vue';
import fields from '@/forms/nuevoUsuario.js'
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/selectes.js';
import { Modal } from 'ant-design-vue';
import locale from 'ant-design-vue/es/date-picker/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');
const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});

const storageData = JSON.parse(localStorage.getItem('profile'));
const storageRole = JSON.parse(localStorage.getItem('role'));

const store = useCounterStore();

store.$patch({ genders: store.genders });
store.$patch({ cdes: store.cdes });
store.$patch({ Offices: store.Offices });
store.$patch({ roles: store.roles });
store.$patch({ supervisores: store.supervisores });

store.fetchGenders()
store.fetchCdes()
store.fetchOffices()
store.fetchRoles()

const fieldx = ref(fields)
const birthdateDate = ref(null);
const route = useRoute();
const loading = ref(!true);
const dateFormat = 'YYYY-MM-DD';
const searchLoading = ref(false);
const upDisabled = ref(false);
const loadingNewIten = ref(false);
const nameNewItem = ref(null);

const rolesKarina = [
  {label: 'Drive Administrador', value: 3},
  {label: 'Drive Usuario', value: 4}
]

const formState = reactive({
  name: null,
  lastname: null,
  middlename: null,
  documentnumber: null,
  birthday: null,
  sick: 2,
  phone: null,
  gender_id : null,
  cde_id : null,
  office_id : null,
  user_id : storageData.user_id,     //creador
  email: null,
  password: null,
});

const clearFields = () => {
  formState.name = null,
  formState.lastname = null,
  formState.middlename = null,
  formState.documentnumber = null,
  birthdateDate.value = null,
  formState.phone = null,
  formState.gender_id  = null,
  formState.cde_id  = null,
  formState.office_id  = null,
  formState.email = null,
  formState.password = null
  formState.role_id = null
  
}
const modeTrim = (event) => {
    event.target.value = event.target.value.trim();
}


const validateOnlyNumber = (val) => {
  formState[val] = formState[val].replace(/\D/g, '');
};

const handleAddItem = async() => {
  try {
    loadingNewIten.value = true;
    const payload = {
      name: nameNewItem.value
    }
    const data = await makeRequest({ url: 'create/office', method: 'POST', data: payload});
    if(data.status == 200) {
      nameNewItem.value = null;
      store.fetchOffices();
    }
  } catch(e) {
    console.log(e);
  } finally {
    loadingNewIten.value = false;
  }
}
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
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
  loading.value = true
  formState.email = formState.name.substring(0, 2).toLowerCase() + formState.lastname.toLowerCase() + "@pnte.com";
  formState.password = formState.documentnumber
  formState.birthday = birthdateDate.value ? dayjs(birthdateDate.value).format('YYYY-MM-DD') : null;

  try {
    const data = await makeRequest({ url: 'user/create', method: 'POST', data: formState });
    
    Modal.success({
      title: 'La cuenta ha sido registrada',
      content: h('div', {}, [
        h('br'),
        h('p', `Correo: ${formState.email}`),
        h('p', 'Contraseña es el número de DNI ingresado'),
      ]),
      onOk() {
        clearFields()
        message.success(data.message)
        const { supervisor_id: removed, ...newValue } = fieldx.value;
        fieldx.value = newValue;
      }
    });

  } catch (error) {
    message.error('No se pudo registrar este usuario');
  } finally {
    loading.value = false;
  }
};

const onSubmitFail = () => {
  message.error('Debes de completar todos los espacios requeridos');
};

const handleSearchApi = async searchValue => {
  console.log("Hello", searchValue);
  // if (!formState.documentType) return message.error('Selecciona el tipo de documento');
  // if (!searchValue) return message.error('El campo número de documento esta vacío');
  // console.log(typeof (searchValue))
};

const validateNumber = () => {
  formState.document_number = formState.document_number.replace(/\D/g, '');
};
</script>

<style lang="scss" scoped>
.user {
  display: grid;
  grid-template-columns: 52% 42%;
  grid-gap: 5%;
}

.grid-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 1rem;
}

.item-max {
  width: 100%;
  min-width: 100px;
}

.roles {
  .title {
    margin-bottom: .3rem;
    display: block;
  }
}
.ant-input-disabled {
  color: #000000e0;
}
</style>