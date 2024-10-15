<template>

  <header ref="navBar" :class="{ floatingNav: isFloating }">
    <div class="container header-wrapper">
      <img src="../../assets/formalizate/logo-produce.png" alt="logo-produce"
        style="position: relative; top: -8px; height: 60px;">
      <img src="../../assets/formalizate/logo-tuempresa.png" alt="logo-tu-empresa"
        style="position: relative; top: 8px;">
    </div>
  </header>


  <section class="fair">
    <div class="container">
      <div class="fair-title">
        <h1>POSTULACIONES PERÚ PRODUCE BARRANCA</h1>
        <h4>PLAZA DE ARMAS DE BARRANCA</h4>
      </div>

      <div class="fair-header">
        <img class="fair-header-img"
          src="https://www.mediasource.mx/hs-fs/hubfs/tipos-de-empresas-definicion-y-clasificacion.png?width=950&name=tipos-de-empresas-definicion-y-clasificacion.png"
          alt="">
        <div class="tag-html">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque omnis assumenda, aut repudiandae
            consequatur blanditiis! Blanditiis ratione aliquid consequuntur, vel sequi natus. Inventore itaque totam
            autem nulla nobis nihil enim.
          </p>
        </div>
      </div>

    </div>

    <div class="fair-section">
      <div class="container">
        <p>
          <b>Importante:</b> La información proporcionada tiene carácter de Declaración Jurada, la misma que se formula
          en el marco de lo establecido en el artículo 49 del TUO de la Ley 27444 Ley del Procedimiento Administrativo
          General, manifestando someterme a la normatividad vigente respecto a la materia y a las responsabilidades
          administrativas, civiles y/o penales que se pudieran derivar en caso que alguno DE LOS DATOS CONSIGNADOS SEAN
          FALSOS, INEXACTOS, siendo pasible de cualquier fiscalización posterior que el Ministerio de la Producción
          considere pertinente.
        </p>
      </div>
    </div>


  </section>









  <section class="form-x fair">
    <div class="container">
      <div class="form-x-wrapper">




        <!-- formulario -->
        <section style="margin: 2rem 0;">
          <a-form layout="vertical" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">

            <div class="fair-form">
              <template v-for="(el, idx) in mype" :key="idx">

                <a-form-item v-if="el.type === 'iSearch'" :name="el.name" :label="el.label"
                  :rules="[{ required: el.required, message: el.message, max: el.max }]">
                  <a-input-search v-model:value="formState[el.name]" placeholder="Ingresar RUC" enter-button="BUSCAR"
                    :maxlength="el.max" @search="onSearch" />
                </a-form-item>

                <a-form-item v-if="el.type === 'iText'" :name="el.name" :label="el.label"
                  :rules="[{ required: el.required, message: el.message, max: el.max }]">
                  <a-input v-model:value="formState[el.name]" :maxlength="el.max" @blur="validateTrim(el.name)" />
                </a-form-item>


                <!-- <a-form-item 
                class="item-max" 
                v-if="el.type === 'iSelect'" 
                :name="el.name" 
                :label="el.label" 
                :rules="[{ required: el.required, message: el.message }]">
                  <a-select 
                  v-if="el.name == 'type'" 
                  v-model:value="formState[el.name]" 
                  :options="types" />
                </a-form-item> -->

                <a-form-item v-if="el.type === 'iTextarea'" :name="el.name" :label="el.label"
                  :rules="[{ required: el.required, message: el.message }]">
                  <a-textarea v-model:value="formState[el.name]" :rows="3" :maxlength="el.max" />
                </a-form-item>

                <a-form-item class="item-max" v-if="el.type === 'iNumber'" :name="el.name" :label="el.label"
                  :rules="[{ required: el.required, message: el.message }]">
                  <a-input-number v-model:value="formState[el.name]" :min="1" :max="500" style="width: 120px;" />
                </a-form-item>

                <a-form-item class="item-max" v-if="el.type === 'iSelectWrite'" :name="el.name" :label="el.label"
                  :rules="[{ required: el.required, message: el.message }]">
                  <a-select v-if="el.name == 'city_id'" v-model:value="formState[el.name]" :options="store.cities"
                    show-search :filter-option="filterOption" @change="handleDepartaments" />
                  <a-select v-if="el.name == 'province_id'" v-model:value="formState[el.name]"
                    :options="store.provinces" show-search :filter-option="filterOption" @change="handleProvinces"
                    :disabled="!formState.city_id" />
                  <a-select v-if="el.name == 'district_id'" v-model:value="formState[el.name]"
                    :options="store.districts" show-search :filter-option="filterOption"
                    :disabled="!formState.province_id" />
                </a-form-item>

                <div v-if="
                  el.type === 'space1' ||
                  el.type === 'space2' ||
                  el.type === 'space3' ||
                  el.type === 'space4'
                ">
                </div>

              </template>
            </div>

            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="loading">PARTICIPAR</a-button>
            </a-form-item>

          </a-form>
        </section>

      </div>
    </div>
  </section>

  <FooterFormalization />

</template>

<script setup>
import { ref, onUnmounted, onMounted, reactive } from 'vue';
import FooterFormalization from '@/pages/Formalizacion/FormalizacionFooter.vue'
import { useCounterStore } from '@/stores/selectes.js';

const store = useCounterStore();
store.$patch({ cities: store.cities });
store.$patch({ provinces: store.provinces });
store.$patch({ districts: store.districts });
store.fetchCities();

const loading = ref(false);
const navBar = ref(null);
const isFloating = ref(false);
const formState = reactive({});

const handleScroll = () => {
  if (window.pageYOffset > 10) {
    isFloating.value = true;
  } else {
    isFloating.value = false;
  }
};

const mype = {
  ruc: {
    type: 'iSearch',
    label: 'NÚMERO DE RUC',
    name: 'ruc',
    required: true,
    message: 'Escribir RUC',
    disabled: true,
    max: 11
  },
  space1: {
    type: 'space1'
  },
  space2: {
    type: 'space2'
  },
  comercialName: {
    type: 'iText',
    label: 'NOMBRE COMERCIAL',
    name: 'comercialName',
    required: true,
    message: 'Escribir el título',
    disabled: true,
    max: 100
  },
  socialReason: {
    type: 'iText',
    label: 'RAZÓN SOCIAL',
    name: 'socialReason',
    required: true,
    message: 'Escribir el título',
    disabled: true,
    max: 100
  },
  space3: {
    type: 'space3'
  },
  city_id: {
    type: 'iSelectWrite',
    label: 'REGIÓN DE LA EMPRESA',
    name: 'city_id',
    required: true,
    message: 'Seleccionar región',
    disabled: false
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'PROVINCIA DE LA EMPRESA',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'DISTRITO DE LA EMPRESA',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: false
  },

  address: {
    type: 'iText',
    label: 'DIRECCIÓN DE LA EMPRESA',
    name: 'address',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },
  economicSector: {
    type: 'iText',
    label: 'SECTOR ECONÓMICO',
    name: 'economicSector',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },
  businessSector: {
    type: 'iText',
    label: 'RUBRO DEL NEGOCIO',
    name: 'businessSector',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },

  percentageOwnPlan: {
    type: 'iText',
    label: 'Porcentaje de su producción en Planta propia',
    name: 'percentageOwnPlan',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },
  percentageMaquila: {
    type: 'iText',
    label: 'Porcentaje de su Producción en MAQUILA',
    name: 'percentageMaquila',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },
  monthlyProduction: {
    type: 'iText',
    label: 'Capacidad de Producción Mensual',
    name: 'monthlyProduction',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },

  percentageOwnPlan: {
    type: 'iText',
    label: '¿Pertenece a algún gremio empresarial?',
    name: 'percentageOwnPlan',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },
  percentageMaquila: {
    type: 'iText',
    label: 'NOMBRE GREMIO',
    name: 'percentageMaquila',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },
  monthlyProduction: {
    type: 'iText',
    label: 'Adjuntar reporte tributario',
    name: 'monthlyProduction',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },

  pointSale: {
    type: 'iText',
    label: '¿Cuenta con puntos de venta?',
    name: 'percentageMaquila',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },
  numberPointSale: {
    type: 'iText',
    label: '¿Cuántos puntos de venta?',
    name: 'numberPointSale',
    required: true,
    message: 'Escribir el RUC',
    disabled: true,
    max: 11
  },

  space4: {
    type: 'space4'
  },

  web: {
    type: 'iText',
    label: 'LINK DE PÁGINA WEB',
    name: 'web',
    required: true,
    message: 'Escribir el RUC',
    disabled: true
  },
  facebook: {
    type: 'iText',
    label: 'LINK DE PÁGINA DE FACEBOOK',
    name: 'facebook',
    required: true,
    message: 'Escribir el RUC',
    disabled: true
  },
  instagram: {
    type: 'iText',
    label: 'LINK DE INSTAGRAM',
    name: 'instagram',
    required: true,
    message: 'Escribir el RUC',
    disabled: true
  },

  description: {
    type: 'iTextarea',
    label: 'BREVE EXPLICACIÓN DEL NEGOCIO (aspectos resaltantes, productos, valor diferencial)',
    name: 'description',
    required: false,
    message: 'Escribir la descripción',
    disabled: false,
    max: 200
  }
}

// DATOS PERSONALES
const people = {
  dni: {
    type: 'iText',
    label: 'INGRESE NÚMERO DE IDENTIDAD',
    name: 'dni',
    required: true,
    message: 'Escribir tu DNI',
    disabled: true
  },
  name: {
    type: 'iText',
    label: 'NOMBRE DEL REPRESENTANTE',
    name: 'name',
    required: true,
    message: 'Escribir nombre',
    disabled: true
  },
  lastname: {
    type: 'iText',
    label: 'APELLIDO PATERNO DEL REPRESENTANTE',
    name: 'lastname',
    required: true,
    message: 'Escribir apellido paterno',
    disabled: true
  },
  middlename: {
    type: 'iText',
    label: 'APELLIDO MATERNO DEL REPRESENTANTE',
    name: 'middlename',
    required: true,
    message: 'Escribir apellido materno',
    disabled: true
  },
  country_id: {
    type: 'iText',
    label: 'PAÍS DE ORIGEN',
    name: 'country_id',
    required: true,
    message: 'Seleccionar país',
    disabled: true
  },
  birthday: {
    type: 'iText',
    label: 'FECHA DE NACIMIENTO',
    name: 'birthday',
    required: true,
    message: 'Fecha de nacimiento',
    disabled: true
  },
  sick: {
    type: 'iText',
    label: '¿ALGUNA DISCAPACIDAD?',
    name: 'sick',
    required: true,
    message: 'Alguna dispacidad',
    disabled: true
  },
  email: {
    type: 'iText',
    label: 'CORREO ELECTRÓNICO',
    name: 'email',
    required: true,
    message: 'Escribir el correo electrónico',
    disabled: true
  },
  phone: {
    type: 'iText',
    label: 'TELÉFONO / CELULAR',
    name: 'phone',
    required: true,
    message: 'Escribir el número',
    disabled: true
  },
















  meta: {
    type: 'iNumber',
    label: 'Meta',
    name: 'meta',
    required: false,
    message: 'Escribir la acción',
    disabled: true
  },
}

const onSearch = () => {

}

const filterOption = (input, option) => {
  const normalizedInput = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedLabel = option.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return normalizedLabel.includes(normalizedInput);
};
const handleDepartaments = (id) => {
  formState.province_id = null
  formState.district_id = null
  store.fetchProvinces(id)
}
const handleProvinces = (id) => {
  formState.district_id = null
  store.fetchDistricts(id)
}
const onSubmit = async () => {

};
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style lang="scss">
header {
  z-index: 90;
  position: sticky;
  margin-bottom: 10px;
  top: 0;
  background: #fff;

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    height: 60px;

    img {
      height: 55px;
      object-fit: cover;
    }
  }
}

.floatingNav {
  border-radius: 2px;
  box-shadow: 0px 1px 10px #cbcbcb;
}


// fair

.fair {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

  .fair-title {
    text-align: center;
    margin: 2rem 0 2.5rem 0;

    h1 {
      margin-bottom: .6rem;
      font-weight: 700;
    }

    h4 {
      color: var(--secondary);
    }
  }

  .fair-header {
    display: grid;
    grid-template-columns: 1fr;
    .tag-html {
        margin: 1.5rem 0 .5rem 0;
      }
    img {
      width: 100%;
    }

    p {
      font-size: 14px;
      line-height: 1.4;
    }
  }

  .fair-section {
    background-color: #def1f8;
    padding: 1rem;

    p {
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }
  }



  @media screen and (min-width: 900px) {
    .fair-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2rem;

      .tag-html {
        margin-top: 0;
      }
    }
  }
}
</style>