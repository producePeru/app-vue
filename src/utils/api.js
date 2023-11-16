import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl
});

// Agregar un interceptor para solicitudes
api.interceptors.request.use(
  (config) => {
    // Verificar si config.headers existe y, si no, inicializarlo como un objeto vacío
    config.headers = config.headers || {};

    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];  // Eliminar el encabezado si no hay token
    }

    // Establecer el tipo de contenido como application/json
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    // Desactivar el estado de carga en caso de error

    // Manejo de errores de solicitud
    return Promise.reject(error);
  }
);

// Agregar un interceptor para respuestas
api.interceptors.response.use(
  (response) => {
    // Desactivar el estado de carga al recibir una respuesta
    // Puedes realizar modificaciones en la respuesta aquí
    // Por ejemplo, procesar los datos antes de que lleguen al componente
    return response;
  },
  (error) => {
    // Desactivar el estado de carga en caso de error
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
