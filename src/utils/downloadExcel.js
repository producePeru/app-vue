import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
const prod = import.meta.env.VITE_APP_API_URL_PRODUCTION
const dev = import.meta.env.VITE_APP_API_URL_LOCAL
const apiUrl = window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1' ? dev : prod;


export async function downloadExcel(url, setLoading) {
    try {
        // Establecer el estado de carga a true
        setLoading(true);

        // Realizar la solicitud para descargar el archivo
        const response = await axios({
            url: `${apiUrl}${url}`,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
            method: 'GET',
            responseType: 'blob',
        });

        // Crear un enlace temporal para descargar el archivo
        const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlBlob;

        // Obtener el nombre del archivo desde los encabezados de la respuesta
        const contentDisposition = response.headers['content-disposition'];
        const fileName = contentDisposition ? contentDisposition.split('filename=')[1].split(';')[0] : 'reporte.xlsx';
        link.setAttribute('download', fileName);

        // Añadir el enlace al DOM y hacer clic para iniciar la descarga
        document.body.appendChild(link);
        link.click();

        // Eliminar el enlace del DOM
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
    } finally {
        // Restablecer el estado de carga a false
        setLoading(false);
    }
}
