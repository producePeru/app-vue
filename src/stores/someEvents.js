// stores/counter.js
import { defineStore } from 'pinia'
import { makeRequest } from '@/utils/api.js'
import Cookies from 'js-cookie';
import axios from 'axios';

export const useCounterStore = defineStore('pagestore', {
  state: () => ({
    count: 0,
    userPhoto: null
  }),

  actions: {
    increment() {
      count++
    },

    async logout() {

      const prod = import.meta.env.VITE_APP_URL_PRODUCTION
      const dev = import.meta.env.VITE_APP_URL_LOCAL
      const apiUrl = window.location.hostname == import.meta.env.VITE_URL_LOCAL ? dev : prod;

      try {
        const data = await makeRequest({ url: '/logout', method: 'POST'});
        if(data) {
          Cookies.remove('token');
          localStorage.clear();
          window.location.href = apiUrl
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async imgProfile() {
      console.log("aaaaaalalalalllll");
      try {
        const apiUrl = window.location.hostname == '127.0.0.1' ? import.meta.env.VITE_APP_API_URL_LOCAL : import.meta.env.VITE_APP_API_URL_PRODUCTION
        const token = Cookies.get('token');
        const storagePersonal = JSON.parse(localStorage.getItem('info'));

        const response = await axios.get(`${apiUrl}/profile-photo/${storagePersonal.id}/${storagePersonal.dni}`, {
          responseType: 'blob',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        this.userPhoto = url;
       

      } catch (error) {
        console.error('Error al descargar el archivo', error);
      }
    }
  },
})