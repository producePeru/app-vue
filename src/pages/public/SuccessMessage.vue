<template>
  <a-result
    :status="route.query.status"
    :title="route.query.title"
    :sub-title="route.query.subTitle">
  </a-result>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
