<template>
  <div class="fof">
    <h1>Página 404</h1>
  </div>
</template>

<style lang="scss">
.fof {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.fof h1 {
  font-size: 20px;
  display: inline-block;
  padding-right: 12px;
  animation: type .5s alternate infinite;
}

@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }

  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>