<template>
  <footer>
    <div class="container">
      <div class="footer-wrapper ff">
        <div class="footer-tuempresa-info">
          <img src="../../assets/img/logos/logo-tu-empresa.png" alt="footer logo tu empresa">
          <p class="ff">Programa Nacional Tu Empresa del Ministerio de la Producción. <br> Brindamos a los emprendedores <br>acompañamiento en formalización <br>y constitución de empresas.</p>
        </div>

        <div></div>
       
        <div>
          <b>Contáctanos</b>
          <p><EnvironmentOutlined /> Lima - Guardia Civil : Av. Guardia Civil N° 834 - Primer Piso, San Isidro - Lima - Lima - San Isidro - Perú</p>
          <p><PhoneOutlined /> 016162291</p>
        </div>

        <!-- <div class="footer-redes">
          <a href=""><img src="../../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
          <a href=""><img src="../../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
          <a href=""><img src="../../assets/formalizate/ico-fb.png" alt="tu empresa facebook"></a>
        </div> -->

      </div>
    </div>
  </footer>
</template>

<script setup>
import { EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons-vue';
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

footer {
  padding: 3rem;
  background-color: #e9e9e9;
  p, b {
    font-size: 13px;
    color: #4A5568;
    line-height: 1.3;
  }
  .footer-wrapper {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
  }
  .footer-tuempresa-info {
    img {
      width: 100px;
    }
  }
  .footer-redes {
    img {
      width: 45px;
    }
  }
}

@media screen and (max-width: 900px) {
  footer {
    .footer-wrapper {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
}
</style>