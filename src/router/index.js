import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/LoginPage.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/DashboardPage.vue'),
      children: [
        {
          path: 'users',
          name: 'users',
          component: () => import('../pages/UsersPage.vue')
        },
        {
          path: 'rr',
          name: 'rr',
          component: () => import('../pages/TelePage.vue')
        }
      ]
    }
  ]
})

export default router
