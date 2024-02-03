<template>
  <a-result status="404" title="404" sub-title="Lo sentimos, la página que visitaste no existe.">
    <template #extra>
      <a-button type="primary"><router-link to="/">Regresar</router-link></a-button>
    </template>
  </a-result>
</template>