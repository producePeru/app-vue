import { defineStore } from 'pinia';
import { makeRequest } from '@/utils/api.js'
import { userId } from '@/utils/cookies.js' 
// import { pinia } from '@/utils/pinia';

export const useSideBar = defineStore('sidebar', {
  state: () => ({
    views: null
  }),
  persist: true,
  // persist: {
  //   storage: sessionStorage,
  //   paths: ['views'],
  // },
  actions: {
    async handleVisibleViews(id) {
      
      try {
        const isId = id ? id : userId
        const {data} =  await makeRequest({ url: `/permission/${isId}`, method: 'GET'});
        localStorage.setItem('sidebar',JSON.stringify(data));
      } catch (error) {
        console.error('Error de red:', error);
      }
    },
  },
});
