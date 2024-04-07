<template>
  <div class="profile-header">
    <h3>MIS DATOS</h3>
    <router-link to="cambiar-clave">
      <!-- <a-button>Cambiar contraseña</a-button> -->
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin: 0;
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
</style>