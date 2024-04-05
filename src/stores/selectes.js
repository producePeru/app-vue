import { defineStore } from 'pinia';
import { makeRequest } from '@/utils/api.js';

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { 
      count: 0,
      cities: null,
      provinces: null,
      districts: null,
      Offices: null,
      cdes: null,
      genders: null,
      modalities: null,
      typeDocuments: null,
      components: null,
      componentThemes: null,
      roles: null,
      detailProcedures: null,
      economicSectors: null,
      comercialActivities: null,
      regimes: null,
      notaries: null
    }
  },

  actions: {
    increment() {
      this.count++
    },
    async fetchCities() {
      try {
        const { data } = await makeRequest({ url: 'select/cities', method: 'GET' });
        this.cities = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchProvinces(id) {
      try {
        const { data } = await makeRequest({ url: `select/provinces/${id}`, method: 'GET' });
        this.provinces = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchDistricts(id) {
      try {
        const { data } = await makeRequest({ url: `select/districts/${id}`, method: 'GET' });
        this.districts = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchOffices() {
      try {
        const { data } = await makeRequest({ url: `select/offices`, method: 'GET' });
        this.Offices = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchCdes() {
      try {
        const { data } = await makeRequest({ url: `select/cdes`, method: 'GET' });
        this.cdes = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchGenders() {
      try {
        const { data } = await makeRequest({ url: `select/genders`, method: 'GET' });
        this.genders = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchModalities() {
      try {
        const { data } = await makeRequest({ url: `select/modalities`, method: 'GET' });
        this.modalities = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchTypeDocuments() {
      try {
        const { data } = await makeRequest({ url: `select/type-documents`, method: 'GET' });
        this.typeDocuments = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchComponents() {
      try {
        const { data } = await makeRequest({ url: `select/components`, method: 'GET' });
        this.components = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchComponentThemes(id) {
      try {
        const { data } = await makeRequest({ url: `select/component-theme/${id}`, method: 'GET' });
        this.componentThemes = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchRoles() {
      try {
        const { data } = await makeRequest({ url: `select/roles`, method: 'GET' });
        this.roles = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchDetailProcedures() {
      try {
        const { data } = await makeRequest({ url: `select/detail-procedures`, method: 'GET' });
        this.detailProcedures = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchEconomicSectors() {
      try {
        const { data } = await makeRequest({ url: `select/economic-sectors`, method: 'GET' });
        this.economicSectors = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchComercialActivities() {
      try {
        const { data } = await makeRequest({ url: `select/comercial-activities`, method: 'GET' });
        this.comercialActivities = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchRegimes() {
      try {
        const { data } = await makeRequest({ url: `select/regimes`, method: 'GET' });
        this.regimes = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    async fetchNotaries() {
      try {
        const { data } = await makeRequest({ url: `select/notaries`, method: 'GET' });
        this.notaries = data;
      } catch (error) {
        console.error('Error de red:', error);
      }
    },
  },
})