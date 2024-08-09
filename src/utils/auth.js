import Cookies from 'js-cookie';
import router from '../router/index';
import CryptoJS from 'crypto-js';

router.beforeEach((to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = Cookies.get('token');

    if (isAuthenticated) {
      let viewsStorage = [];

      const encryptedLocalStore = localStorage.getItem('views');
      if (encryptedLocalStore) {
        const decryptedViews = CryptoJS.AES.decrypt(encryptedLocalStore, 'appvistas').toString(CryptoJS.enc.Utf8);
        viewsStorage = JSON.parse(decryptedViews);
      }

      if (!viewsStorage.includes(to.name) && to.name !== 'inicio') {
        return next('/admin/inicio');
      } else {
        return next();
      }

    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('views');
      Cookies.remove('user');

      const publicPages = ['landing', 'lasnotarias', 'formalizacion', 'videos'];
      if (publicPages.includes(to.name) || to.path === '/') {
        return next();
      } else {
        return next('/');
      }
    }
  } else {
    // Si la ruta no requiere autenticación, permitir el acceso
    next();
  }
});
