import Cookies from 'js-cookie';
import router from '../router/index';
import CryptoJS from 'crypto-js';

router.beforeEach((to, from, next) => {

  const isAuthenticated = Cookies.get('token');

  let viewsStorage = [];

  if (isAuthenticated) {
    const encryptedLocalStore = localStorage.getItem('views');
    if (encryptedLocalStore) {
      const decryptedViews = CryptoJS.AES.decrypt(encryptedLocalStore, 'appvistas').toString(CryptoJS.enc.Utf8);
      viewsStorage = JSON.parse(decryptedViews); 
    }
  }


  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
 
      if (viewsStorage.includes(to.name)) {
        next();
      } else {
        next('/admin/inicio'); 
      }

    } else {

      localStorage.removeItem('user');
      localStorage.removeItem('views');
      Cookies.remove('user');
      next('/'); 
    }
  } else {

    next();
  }
});