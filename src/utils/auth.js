import Cookies from 'js-cookie';
import router from '../router/index';
import CryptoJS from 'crypto-js';

router.beforeEach((to, from, next) => {

  const isAuthenticated = Cookies.get('token');
  // const isAuthenticated = true;
  // let viewsStorage = JSON.parse(localStorage.getItem('views'));
  // viewsStorage = Array.isArray(viewsStorage) ? viewsStorage : [];
  // viewsStorage = [...viewsStorage, "inicio"];
  let viewsStorage = [];

  if(isAuthenticated) {
    const encryptedLocalStore = localStorage.getItem('views');
    viewsStorage = CryptoJS.AES.decrypt(encryptedLocalStore, 'appvistas').toString(CryptoJS.enc.Utf8);
  }

  // console.log("ssssf",viewsStorage);
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      // if (userRoles.some((role) => to.meta.roles.includes(role))) {
      //   next(); // Usuario autenticado y con roles permitidos
      // } else {
      //   next('/unauthorized'); // Usuario no tiene roles permitidos
      // }
      // next();
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