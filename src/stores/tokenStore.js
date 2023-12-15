import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: '',
  }),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    setToken() {
      console.log("yayayayay")
      this.token = Cookies.set('token');
      
    },
    clearToken() {
      console.log("QUUQUQUQU");
      this.token = null;
    },
  },
});
