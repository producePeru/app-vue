<template>
  <div>
    <video class="scan-video" ref="video" autoplay></video>
    <canvas ref="scan-canvas" style="display: none;"></canvas>
    <p v-if="barcodeResult">Código de barras detectado: {{ barcodeResult }}</p>

    <pre>{{ isCameraOn }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Quagga from 'quagga';

const video = ref(null);
const canvas = ref(null);
const isCameraOn = ref(false);
const barcodeResult = ref(null);
let stream = null;

const openCamera = async () => {
  try {
    const constraints = { video: true };
    const streamObj = await navigator.mediaDevices.getUserMedia(constraints);

    video.value.srcObject = streamObj;
    stream = streamObj;
    isCameraOn.value = true;

    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: video.value,
      },
      decoder: {
        readers: ['code_128_reader'],
      },
    }, (err) => {
      if (err) {
        console.error('Error initializing:', err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      Quagga.stop();
      barcodeResult.value = result.codeResult.code;
    });

  } catch (error) {
    console.error('Error accessing camera:', error);
  }

  video.value.addEventListener('loadedmetadata', () => {
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
  });
};

const closeCamera = () => {
  console.log("cerrando....");
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.value.srcObject = null;
    isCameraOn.value = false;
    Quagga.stop();
    barcodeResult.value = null;
  }
};

const toggleCamera = () => {
  isCameraOn.value ? closeCamera() : openCamera();
};

onMounted(() => {
  // Código de inicialización, si es necesario
  openCamera();
  closeCamera()
});

onBeforeUnmount(() => {
  // Código de limpieza, si es necesario
});
</script>

<style lang="scss" scoped>
.scan-video {
  width: 100%;
}
</style>