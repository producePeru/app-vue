import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('token');
import { message } from 'ant-design-vue';
import { userId } from '@/utils/cookies.js'

const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == '127.0.0.1' ? dev : prod;

export const useFileUploadStore = defineStore('fileUpload', {

  state: () => ({

  }),

  actions: {
    async handleUpload(fileList) {
      // const pdf = fileList.value[0];
      const formData = new FormData();

      formData.append('pdf', fileList);
      formData.append('created', userId);

      try {
        const {data} = await axios.post(`${apiUrl}/agreements/upload-pdf`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
        message.success(data.message);
      } catch (error) {
        message.error("Error al subir el archivo PDF, excede el tamaño del archivo permitido");
      }
    }
  },
  
});
