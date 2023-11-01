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
        },

        {
          path: 'ruta-digital',
          name: 'ruta-digital',
          children: [
            {
              path: 'indicadores',
              name: 'indicadores',
              component: () => import('../pages/RutaDigital/IndicadoresRD.vue')
            },
            {
              path: 'mailing',
              name: 'mailing',
              component: () => import('../pages/RutaDigital/MailingRD.vue')
            },
            {
              path: 'reportes',
              name: 'reportes',
              component: () => import('../pages/RutaDigital/ReportesRD.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            },
          ]

        },

      ]
    }
  ]
})



export default router
