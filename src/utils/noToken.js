import axios from 'axios';

const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL_NO_TOKEN
const apiUrl = window.location.hostname == '127.0.0.1' ? dev : prod;

const api = axios.create({
  baseURL: apiUrl
});


api.interceptors.request.use(
  (config) => {
    
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// Agregar un interceptor para respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function makeRequest({ method, url, data, params }) {
  // eslint-disable-next-line no-useless-catch
  try {
    let response;

    const config = { params }; 
    // Agregar los parámetros como parte de la configuración

    if (method === 'GET') {
      response = await api.get(url, config); 
    } else if (method === 'POST') {
      response = await api.post(url, data, config); 
    } else if (method === 'PUT') {
      response = await api.put(url, data, config); 
    } else if (method === 'DELETE') {
      response = await api.delete(url, config); 
    } else {
      throw new Error('Método de solicitud no válido');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}
