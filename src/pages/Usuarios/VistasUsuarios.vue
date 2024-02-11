<template>





  <a-checkbox-group v-model:value="values" name="checkboxgroup" :options="options" />
  
  <button>ASIGNAR</button>
  

  <!-- <pre>{{ options }}</pre> -->

  <pre>{{ values }}</pre>


</template>
<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '@/utils/api.js';
import { useRoute } from 'vue-router';

const options = ref([]);
const values = ref([])
const loading = ref(false);
const loadingButton = ref(false);
const route = useRoute();
const id = "eyJpdiI6IlJ3bHkySWFmU2d3V3dtbVh4YzhsYnc9PSIsInZhbHVlIjoiTGtUNHdIajd6WGFRendSaWtxTDV6Zz09IiwibWFjIjoiNjllN2NkODNmNGE2YmVjMTUyZjViNjAxY2I1NmQ0MTNjNDgwMTgyMzdlNzYwYjg1YjI0NmM0NWUxZTQ0YTE1NyIsInRhZyI6IiJ9"



const createPermission = async() => {
  try {
    loadingButton.value = true;
    const {data} = await makeRequest({ url: `/views/${id}`, method: 'PUT', payload: values.value });
    options.value = data
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loadingButton.value = false;
  }
}


const fetchData = async() => {
  try {
    loading.value = true;
    const {data} = await makeRequest({ url: `/views/${id}`, method: 'GET' });
    options.value = data
  } catch (error) {
    console.error('Error de red:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(
  fetchData
);
</script>

<style scoped>
.ant-checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>