<template>
  <div>
    <div class="heritage">
      <a-input v-model:value="barcodeResult">
        <template #addonAfter>
          <CameraOutlined @click="handleOpenScan" />
        </template>
      </a-input>
      <a-button type="primary">Buscar</a-button>
    </div>

    <a-modal v-model:open="open" title="Scan Code" :footer="null" @cancel="handleCloseModal">
      <div>
        <video class="scan-video" ref="video" autoplay></video>
        <canvas ref="scan-canvas" style="display: none;"></canvas>
      </div>
    </a-modal>
  </div>

  <br>
  
  <TableScaner />


</template>

<script setup>
import { ref } from 'vue';
import Quagga from 'quagga';
import { CameraOutlined } from '@ant-design/icons-vue';
import TableScaner from './components/TableScan.vue'

const open = ref(false);
const video = ref(null);
const canvas = ref(null);
const isCameraOn = ref(false);
const barcodeResult = ref(null);
let stream = null;

const openCamera = async () => {
  try {
    const constraints = { video: { facingMode: 'environment' } }; // 'environment' for rear camera
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
        readers: ['code_128_reader', 'ean_reader', 'upc_reader'],
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
      open.value = false
      closeCamera()
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
  console.log("cerrado");
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.value.srcObject = null;
    isCameraOn.value = false;
    Quagga.stop();
    // barcodeResult.value = null;
  }
};

const handleOpenScan = () => {
  open.value = true;
  openCamera();
};

const handleCloseModal = () => {
  closeCamera();
};
</script>

<style lang="scss" scoped>
.scan-video {
  width: 100%;
}
.heritage {
  display: flex;
  gap: 1rem;
}
</style>
