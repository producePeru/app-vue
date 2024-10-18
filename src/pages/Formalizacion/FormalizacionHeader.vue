<template>
  <header class="header" ref="navBar" :class="{ floatingNav: isFloating }">
    <div class="container header-wrapper">
      <img src="../assets/formalizate/logo-produce.png" alt="logo-produce">
      <img src="../assets/formalizate/logo-tuempresa.png" alt="logo-tu-empresa">
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.floatingNav {
  border-radius: 2px;
  box-shadow: 0px 1px 10px #cbcbcb;
}

header {
  z-index: 90;
  position: sticky;
  // margin-bottom: 10px;
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
</style>