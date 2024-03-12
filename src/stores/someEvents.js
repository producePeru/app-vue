// stores/counter.js
import { defineStore } from 'pinia'
import { makeRequest } from '@/utils/api.js'
import Cookies from 'js-cookie';

export const useCounterStore = defineStore('pagestore', {
  state: () => {
    return { count: 0 }
  },

  actions: {
    increment() {
      this.count++
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
    }
  },
})