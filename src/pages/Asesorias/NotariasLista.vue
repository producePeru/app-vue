<template>
  <div class="all-notary">
    <h3 class="title-produce">NOTARÍAS</h3>
    <div class="filters-notary">

      <div class="filters-center-produce">
        <a-button style="margin-right: 1rem;" type="primary" @click="showDrawer">Agregar Notaría</a-button>
        <router-link to="/notarias" target="_blank">
          <ShareAltOutlined /> Link para compartir
        </router-link>
      </div>

      <div class="filters-produce">
        <div>
          <label>Buscar por Nombre de Notaría</label>
          <a-input v-model:value="filterName" />
        </div>

        <div>
          <label>Buscar Notarías por REGIÓN</label>
          <a-select placeholder="Buscar por Provincia" v-model:value="filterCity" show-search :options="store.cities"
            :filter-option="filterOption" />
        </div>
        <a-button @click="fetchData">BUSCAR</a-button>
      </div>

    </div>

    <div class=" notaries-wrapper notaries-box" v-for="(item, idx) in dataSource" :key="idx">
      <div>
        <a-tag color="blue" style="margin-bottom: 6px;">{{ item.city.name }}</a-tag>
        <div class="notaries-box-adrres">
          <span>{{ item.province.name }}</span> -
          <span>{{ item.district.name }}</span> -
          <span>{{ item.address }}</span>
        </div>
        <h3 class="notaries-box-name">{{ item.name }}</h3>
        <div class="notaries-box-html-2" v-html="item.infocontacto"></div>
      </div>

      <div>
        <h4 class="notaries-box-h4">GASTOS NOTARIALES</h4>
        <div class="notaries-box-html" v-html="item.price"></div>
      </div>

      <div>
        <h4 class="notaries-box-h4">CONDICIONES</h4>
        <div class="notaries-box-html" v-html="item.conditions"></div>
      </div>
      <div>
        <h4 class="notaries-box-h4">SOCIO O INTERVINIENTE ADICIONAL</h4>
        <div class="notaries-box-html" v-html="item.sociointerveniente"></div>
        <div>
          <h4 class="notaries-box-h4" style="display: block;">BIOMETRICO: </h4>
          <span class="notaries-box-html" v-html="item.biometrico"></span>
        </div>
      </div>
    </div>

    <!-- <a-table bordered :scroll="{ x: valueX, y: valueY }" class="ant-table-striped" :columns="columns"
      :data-source="dataSource" :pagination="false" :loading="loading" size="small">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'idx'">
          {{ index + 1 }}
        </template>
<template v-if="column.dataIndex == 'lastName'">
          {{ record.last_name }} {{ record.middle_name }}
        </template>
<template v-if="column.dataIndex == 'departamento'">
          {{ record.city?.name }}
        </template>
<template v-if="column.dataIndex == 'province'">
          {{ record.province?.name }}
        </template>
<template v-if="column.dataIndex == 'distrite'">
          {{ record.district?.name }}
        </template>
<template v-if="column.dataIndex == 'namenotary'">
          {{ record.name }}
        </template>
<template v-if="column.dataIndex == 'pricex'">
          <div ref="divRef" class="gastos">
            <div v-html="record.price" class="style-price"></div>
          </div>
        </template>
<template v-if="column.dataIndex == 'pricedescriptionx'">
          <div>
            <div v-html="record.conditions" class="style-conditions"></div>
          </div>
        </template>
<template v-if="column.dataIndex == 'socio'">
          <div v-html="record.sociointerveniente" class="style-contact"></div>
        </template>
<template v-if="column.dataIndex == 'bio'">
          <div v-html="record.biometrico" class="style-contact"></div>
        </template>
<template v-if="column.dataIndex == 'contact'">
          <div v-html="record.infocontacto" class="style-contact"></div>
        </template>

<template v-if="column.dataIndex == 'actions'">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-button shape="circle" :icon="h(MoreOutlined)" size="small" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="handleEditNotary(record)">Editar</a>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm title="¿Seguro de eliminar?" @confirm="handleDeleteNotary(record)">
                    <template #icon><question-circle-outlined style="color: red" /></template>
<a>Eliminar</a>
</a-popconfirm>
</a-menu-item>
</a-menu>
</template>
</a-dropdown>
</template>

</template>
</a-table> -->

    <a-drawer v-model:open="open" class="draw-notary" root-class-name="root-class-name" title="Datos de la notaría"
      width="600" placement="right" @after-open-change="afterOpenChange">
      <formAddNotary @closeDraw="handleCloseDrawopen" :updateNotary="updateNotary" />
    </a-drawer>
  </div>
</template>


<script setup>
import { ref, onMounted, h, onBeforeUnmount } from 'vue';
import formAddNotary from './components/DrawerNotaria.componente.vue';
import { LinkOutlined, QuestionCircleOutlined, ShareAltOutlined } from '@ant-design/icons-vue';
import { requestNoToken } from '@/utils/noToken.js';
import { MoreOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { makeRequest } from '@/utils/api.js';
import { message } from 'ant-design-vue';
import { useCounterStore } from '@/stores/selectes.js';

const storageRole = JSON.parse(localStorage.getItem('role'))
const store = useCounterStore();
store.$patch({ cities: store.cities });
store.fetchCities();

const valueY = ref(window.innerHeight - 100);
const columns = [
  { title: '#', dataIndex: 'idx', fixed: 'left', align: 'center', width: 50 },
  { title: 'NOTARIA', fixed: 'left', dataIndex: 'namenotary', align: 'center', width: 120 },
  { title: 'REGIÓN', fixed: 'left', dataIndex: 'departamento', align: 'center', width: 100 },
  { title: 'PROVINCIA', fixed: 'left', dataIndex: 'province', align: 'center', width: 100 },
  { title: 'DISTRITO', fixed: 'left', dataIndex: 'distrite', width: 130, align: 'center' },
  { title: 'DIRECCION', dataIndex: 'address', align: 'center', width: 160 },
  { title: 'GASTOS NOTARIALES', dataIndex: 'pricex', align: 'center', width: 300 },
  { title: 'CONDICIONES', dataIndex: 'pricedescriptionx', align: 'center', width: 260 },
  { title: 'SOCIO O INTERVINIENTE', dataIndex: 'socio', align: 'center', width: 200 },
  { title: 'BIOMETRICO', dataIndex: 'bio', align: 'center', width: 150 },
  { title: 'DATOS DE CONTACTO', dataIndex: 'contact', align: 'center', width: 260 },
  ...(storageRole[0].id === 3 || storageRole[0].id === 1 ? [{ title: '', dataIndex: 'actions', width: 50, align: 'center', fixed: 'right' }] : [])

];

const valueX = ref(1200)
const dataSource = ref([])
const loading = ref(false)
const open = ref(false);
const updateNotary = ref(null);
const city = ref(null);
const filterName = ref(null);
const filterCity = ref(null);

const handleSearchFilters = async () => {
  try {
    loading.value = true;
    const data = await makeRequest({ url: `public/notaries/${city.value}`, method: 'GET' });
    dataSource.value = data.data
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}
const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const actualizarAltura = () => {
  valueY.value = window.innerHeight - 270;
};
const afterOpenChange = bool => {
  console.log('open', bool);
};
const showDrawer = () => {
  updateNotary.value = null;
  open.value = true;
};
const handleCloseDrawopen = () => {
  fetchData();
  open.value = false;
  city.value = null;
}
const handleDeleteNotary = async (val) => {
  try {
    const data = await makeRequest({ url: `notary/delete/${val.id}`, method: 'DELETE' });
    if (data) {
      fetchData();
      message.success(data.message);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}
const handleEditNotary = (data) => {
  updateNotary.value = data
  open.value = true;
}

const fetchData = async () => {
  try {
    loading.value = true;

    const values = {
      ...filterName.value && { name: filterName.value },
      ...filterCity.value && { city_id: filterCity.value }
    }

    const data = await requestNoToken({
      url: 'public/notaries-filters',
      method: 'GET',
      params: values
    });

    dataSource.value = data.data

  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}
onBeforeUnmount(() => {
  window.removeEventListener('resize', actualizarAltura);
});
onMounted(() => {
  window.addEventListener('resize', actualizarAltura);
  actualizarAltura();
  fetchData();
});
</script>

<style lang="scss">
.ant-popover-inner {
  width: 200px;
}

.filters-notary {
  margin: .6rem 0 1rem 0;
  display: flex;
  justify-content: space-between;

  .ant-select {
    width: 100%;
  }
}
</style>

<style lang="scss">
.notaries {
  background-color: rgb(236, 236, 236);
  width: 100%;
  min-height: 100vh;

  &-filter {
    display: flex;
    align-items: end;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;

    .notary-div {
      display: flex;
      flex-direction: column;
      width: 250px;

      label {
        font-size: 14px;
        margin-bottom: .2rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }
    }

    @media screen and (max-width: 600px) {
      flex-direction: column;
      align-items: center;

      .notary-div {
        width: 80%;
      }
    }
  }

  &-wrapper {
    background-color: #fff;
    margin: auto;
    padding: 2rem 1rem;
  }

  &-box {
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
    padding: 1.5rem 1rem .5rem 1rem;
    margin: 1rem auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    grid-gap: 1rem;

    &-h4 {
      font-size: 13px;
      color: #BA0F0F;
    }

    &-adrres {
      font-size: 13px;
      color: #000000e0;
    }

    &-name {
      font-size: 16px;
      margin: .2rem 0;
    }

    &-html-2 {
      margin: .3rem 0;
      padding: .5rem 0;
      border-top: 1px solid #eee;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

      p {
        margin: 0;
        font-size: 13px
      }
    }

    &-html {
      br {
        display: none;
      }

      h1,
      h2,
      h3,
      h4 {
        font-size: 14px;
        margin: 0;

        strong {
          color: #000000e0;
          font-weight: 700;
        }
      }

      p {
        font-size: 13px;
        margin-top: .3rem;

        strong {
          font-size: 11px;

        }
      }
    }


    @media screen and (max-width: 780px) {
      grid-template-columns: 1fr 1fr;
      grid-gap: 0 1rem;
      // margin: 1rem;
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      padding: 1.5rem 1rem 1rem;
    }
  }
}
</style>