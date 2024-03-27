<template>
  <div class="upload-example">
    <a-modal v-model:open="open" title="Basic Modal" @ok="cropImage" okText="Aceptar" class="cropper-modal" :closable="false">
      <Cropper
      :maxWidth="400"
      ref="cropper"
      class="upload-cropper"
      :src="image"
      :stencil-component="$options.components.Stencil" />
    </a-modal>
    
    <div class="profile-photo">
      <img class="photo-user" :src="imageCroppered" alt="">
      <label @click="openFileInput" for="fileInput" class="photo-shadow">
        Cambiar foto
      </label>
    </div>

    <input type="file" ref="file" @change="uploadImage($event)" accept="image/*" style="display: none;"/>

  </div>
</template>

<script>
import axios from 'axios';
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import Stencil from "./Stencil.vue";
import { makeRequest } from '@/utils/api.js';
import Cookies from 'js-cookie';
import { useCounterStore } from '@/stores/someEvents.js'

const pageStore = useCounterStore();

export default {
  data() {
    return {
      open: false,
      image: null,
      imageCroppered: null,
      storagePersonal: JSON.parse(localStorage.getItem('info')),
      apiUrl: window.location.hostname == '127.0.0.1' ? import.meta.env.VITE_APP_API_URL_LOCAL : import.meta.env.VITE_APP_API_URL_PRODUCTION,
      token: Cookies.get('token'),
    };
  },
  components: {
    Cropper,
    Stencil,
  },
  methods: {
    openFileInput() {
      this.$refs.file.click();
    },

    async cropImage() {
      const result = this.$refs.cropper.getResult();
      
      const payload = { image: result.canvas.toDataURL("image/jpeg") }

      const data = await makeRequest({ url: `/profile-photo/${this.storagePersonal.id}/${this.storagePersonal.dni}`, method: 'POST', data: payload });

      if(data.status == 200) {
        this.imageCroppered = result.canvas.toDataURL("image/jpeg")
        this.open = false

        localStorage.removeItem('photoUser');
        // window.location.reload();
        // localStorage.setItem('photo', JSON.stringify(result.canvas.toDataURL("image/jpeg")));

        pageStore.setPhotoProfile(result.canvas.toDataURL("image/jpeg"))

      }
      
    },
    
    uploadImage(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        this.open = true
      }
    },

    async showPhoto() {
      
      try {
        const response = await axios.get(`${this.apiUrl}/profile-photo/${this.storagePersonal.id}/${this.storagePersonal.dni}`, {
          responseType: 'blob',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        this.imageCroppered = url;
        
        // localStorage.removeItem('photo');

        localStorage.setItem('photo', JSON.stringify(url));
        // window.location.reload();

      } catch (error) {
        console.error('Error al descargar el archivo', error);
      }
    }
  },

  created() {
    this.showPhoto()
  }
};
</script>

<style lang="scss">
.profile-photo {
  height: 130px;
  width: 130px;
  position: relative;
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 1px 1px 11px 0px #f1f1f1;
  .photo-user {
    width: 100%;
  }
 
  .photo-shadow {
    height: 130px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #06060663;
    margin-top: -1rem;
    color: #fff;
    opacity: 0;
    position: absolute;
    z-index: 2;
    top: 1rem;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
}

.cropper-modal {
  .ant-modal-header  {
    display: none;
  }
}
.upload-cropper {
  height: 300px;
}
</style>