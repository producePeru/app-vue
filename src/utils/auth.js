import router from '../router/index'

router.beforeEach((to, from, next) => {

  const isAuthenticated = true;
  const userRoles = ['admin'];
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      if (userRoles.some((role) => to.meta.roles.includes(role))) {
        next(); // Usuario autenticado y con roles permitidos
      } else {
        next('/unauthorized'); // Usuario no tiene roles permitidos
      }
    } else {
      next('/'); // Usuario no autenticado
    }
  } else {
    next();
  }
});