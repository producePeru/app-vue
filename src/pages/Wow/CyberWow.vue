<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="formData.name" required>
    </div>
    <div>
      <label for="description">Descripción:</label>
      <textarea id="description" v-model="formData.description"></textarea>
    </div>
    <div>
      <label for="image">Imagen:</label>
      <input type="file" id="image" accept="image/*" @change="handleImageChange">
    </div>
    <button type="submit">Enviar</button>
  </form>

</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  name: '',
  description: '',
  image: null,
});

function handleImageChange(event) {
  const file = event.target.files[0];
  formData.value.image = file;
}

async function submitForm() {
  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.value.name);
  formDataToSend.append('description', formData.value.description);
  formDataToSend.append('image', formData.value.image);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formDataToSend
    });
    if (response.ok) {
      console.log('Datos enviados correctamente');
    } else {
      console.error('Error al enviar los datos');
    }
  } catch (error) {
    console.error('Error al enviar los datos:', error);
  }
}
</script>