<template>
  
  <header class="header" ref="navBar" :class="{ floatingNav: isFloating }">
    <div class="container header-wrapper">
      <img src="../assets/formalizate/logo-produce.png" alt="logo-produce">
      <img src="../assets/formalizate/logo-tuempresa.png" alt="logo-tu-empresa">
    </div>
  </header>

  <section class="form-x politicas">
    <div class="container">
      <div class="form-x-wrapper ff">

        <h2 class="ff title">POLÍTICA DE PRIVACIDAD – CREA TU EMPRESA</h2>
        <p>{{ p1 }}</p>
        
        <ol>
          <div>
            <li class="title-2">Objetivo</li>
            <p>{{ obj }}</p>
          </div>
          <div>
            <li class="title-2"> Identidad y domicilio:</li>
            <p>{{ identidad1 }}</p>
            <p>{{ identidad2 }}</p>
          </div>
          <div>
            <li class="title-2">Datos personales recopilados:</li>
            <p>{{ datosPersonales1 }}</p>
            <ul style="margin: 1rem 0 1rem 3rem;">
              <li>Nombres y apellidos </li>
              <li>Número de DNI u otro documento de identidad</li>
              <li>Teléfono de contacto</li>
              <li>Domicilio</li>
              <li>Correo electrónico</li>
            </ul>
            <p>{{ datosPersonales2 }}</p>
          </div>
          <div>
            <li class="title-2">Finalidad del tratamiento de los datos personales </li>
            <p>{{ finalidad1 }}</p>
            <p>{{ finalidad2 }}</p>
          </div>
          <div>
            <li class="title-2">Transferencia</li>
            <p>{{ transferencia1 }}</p>
            <p>{{ transferencia2 }}</p>
          </div>
          <div>
            <li class="title-2">Consentimiento</li>
            <p>{{ consentimiento1 }}</p>
            <p>{{ consentimiento2 }}</p>
          </div>
          <div>
            <li class="title-2">Plazo de tratamiento de los datos personales</li>
            <p>{{ plazo }}</p>
          </div>
          <div>
            <li class="title-2">Seguridad de los Datos Personales</li>
            <p>{{ seguridad }}</p>
          </div>
          <div>
            <li class="title-2">Sobre el ejercicio de derechos como titular de datos personales</li>
            <p>{{ seguridad }}</p>
            <p>{{ seguridad1 }}</p>
            <p>De considerar que no ha sido atendido en el ejercicio de sus derechos puede
            presentar una reclamación ante la Autoridad Nacional de Protección de Datos
            Personales dirigiéndose al correo electrónico protegetusdatos@minjus.gob.pe. </p>
          </div>
          <div>
            <li class="title-2">Vigencia y Modificación de la Política de Privacidad</li>
            <p>{{ videncia }}</p>
          </div>
        </ol>

      </div>
    </div>
  </section>

  <FooterFormalization />
  
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import FooterFormalization from './Formalizacion/FormalizacionFooter.vue'

const p1 = ref(
`El Programa Nacional “Tu Empresa”, en adelante TU EMPRESA, respeta la legislación
vigente en materia de protección de datos personales, la privacidad de los ciudadanos,
el secreto y seguridad de la información concerniente a las personas, de conformidad
en lo previsto en el artículo 2 numeral 6 de la Constitución Política y lo establecido en la
Ley Nº 29733, Ley de Protección de datos personales, y su reglamento aprobado con
Decreto Supremo N° 003-2013-JUS, adoptando para ello las medidas técnicas y
organizativas necesarias para evitar la pérdida, mal uso, alteración, acceso no
autorizado y robo de los datos personales facilitados, habida cuenta del estado de la
tecnología, la naturaleza de los datos y los riesgos a los que están expuestos.`);

const obj = ref(
`La presente Política tiene como objetivo establece las disposiciones necesarias
para garantizar la seguridad de la información contenida en la base de datos de TU
EMPRESA, basado en el cumplimiento de la presente política de privacidad.`);

const identidad1 = ref(`El presente Política de Privacidad del servicio digital denominado “CREA TU
EMPRESA”, se encuentra a cargo y es de responsabilidad de TU EMPRESA.`);

const identidad2 = ref(`Cabe recalcar que TU EMPRESA asegura la máxima reserva y protección sobre
aquellos datos personales de los usuarios que utilicen el Servicio.`);

const datosPersonales1 = (`TU EMPRESA recopila datos personales por medio del registro que usted realiza
en el formulario, los mismos que están referidos a: `);

const datosPersonales2 = (`Esta información servirá para cumplir con las finalidades detalladas más adelante y
relacionadas al Servicio.`);

const finalidad1 = ref(`TU EMPRESA tratará sus datos personales con la finalidad de gestionar el presente
Servicio en ejercicio de las funciones públicas conferidas y siempre en el marco de
sus competencias.`);

const finalidad2 = ref(`Los datos personales no podrán ser utilizados para otras finalidades no informadas
y que no guarden relación con el presente Servicio.`);

const transferencia1 = ref(`No se encuentra prevista la transferencia de sus datos personales a terceros, salvo
para el cumplimiento del presente Servicio y cuando se trate de una obligación legal
a petición de un organismo público o autoridad judicial.`);

const transferencia2 = ref(`Los datos serán almacenados en los servidores de Amazon Web Services siendo
encargados de esta gestión la Presidencia del Consejo de Ministros (PCM) a través
de la Secretaría de Gobierno y Transformación Digital. En estos casos, la Entidad
garantiza que el tratamiento de sus datos se limite a las finalidades antes
autorizadas, que se mantengan de forma confidencial, así como que se
implementen las medidas de seguridad que exige la Ley de Protección de Datos
personales, su Reglamento y los Lineamientos para Uso de Servicios en la Nube
para Entidades de la Administración Pública del Estado Peruano.
`);

const consentimiento1 = ref(`TU EMPRESA realizará tratamiento sobre datos personales obtenidos con el
consentimiento previo, expreso e informado del titular de los datos personales.`);

const consentimiento2 = ref(`Al aceptar esta Política de Privacidad, el usuario presta su consentimiento para el
tratamiento de datos personales para las finalidades expuestas.`);

const plazo = ref(`Los datos personales tratados serán almacenados en el banco de datos personales
denominado “Usuarios de los servicios del Programa Nacional “Tu Empresa” de
titularidad de TU EMPRESA. Asimismo, TU EMPRESA conserva sus datos
personales durante el tiempo imprescindible y necesario para gestionar el presente
Servicio y otros relacionados al mismo, sin perjuicio de que los usuarios puedan
revocar el consentimiento en cualquier momento.`);

const seguridad = ref(`En cumplimiento de la normativa vigente, TU EMPRESA y las entidades
involucradas en el tratamiento han adoptado medidas legales, organizativas y
técnicas apropiadas para garantizar la seguridad de los datos personales, evitando
su alteración, pérdida, tratamiento indebido o acceso no autorizado que puedan
afectar a la integridad, confidencialidad disponibilidad de datos personales.`);

const seguridad1 = `Además de los anteriores derechos, el usuario tendrá derecho a retirar el
consentimiento otorgado en cualquier momento mediante el procedimiento descrito
líneas arriba, sin que el retiro del consentimiento afecte la licitud del tratamiento
anterior al retiro del mismo.)..`

const videncia = ref(`TU EMPRESA se reserva el derecho a modificar su Política de Privacidad en el
supuesto de que exista un cambio en la legislación vigente, doctrinal,
jurisprudencial. TU EMPRESA podrá realizar modificaciones y correcciones a esta
Política de Privacidad. Si se introdujera algún cambio en esta Política, el nuevo texto
se publicará y estará a disposición en este mismo formulario o a solicitud de los
interesados por cualquier medio.`);

const navBar = ref(null);
const isFloating = ref(false);

const handleScroll = () => {
  if (window.pageYOffset > 10) {
    isFloating.value = true;
  } else {
    isFloating.value = false;
  }
};


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style lang="scss" scoped>

$color-background: #F7F7FA;

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
.form-x {
  padding: 2rem 0 3rem 0;
  background-color: $color-background;

  &-wrapper {
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 4rem 5rem;
  
  }
}
.politicas {
  .title {
    font-family: "Inter", sans-serif;
    margin-bottom: 1.5em;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 24px;
    line-height: 1.3;
  }
  p, ul, li, ol {
    color: rgba(0, 0, 0, 0.88);
    word-break: break-word;
    line-height: 1.5714285714285714;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    padding: 0;
  }
  p {
    text-align: justify;
  }
  .title-2 {
    font-size: 20px;
    font-weight: 600;
    margin: 1.5rem 0 1rem 1rem;
  }
}


@media screen and (max-width: 900px) {
  .form-x {
    padding: 1rem .5rem;
    &-wrapper {
      padding: 2rem;
    }
  }
  .politicas {
    .title {
      font-size: 20px;
      text-align: center;
    }
    p, ul, li, ol {
      font-size: 15px;
    }
  }
}
</style>