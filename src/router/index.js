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
      path: '/cuestionario/:id',
      name: 'questionary',
      component: () => import('../pages/public/QuestionaryId.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/DashboardPage.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../pages/Inicio/InicioDashboard.vue'),
        },
        {
          path: 'ruta-digital',
          name: 'ruta-digital',
          children: [
            {
              path: 'reportes',
              name: 'reportes',
              component: () => import('../pages/RutaDigital/ReportesRD.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            },
            {
              path: 'mype',
              name: 'mype',
              component: () => import('../pages/RutaDigital/MypesRD.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            },
            {
              path: 'crear-cuestionario',
              name: 'crear-cuestionario',
              component: () => import('../pages/RutaDigital/CrearCuestionario.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            },
            {
              path: 'cuestionarios',
              name: 'cuestionarios',
              component: () => import('../pages/RutaDigital/CuestionariosRD.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            },
          ]

        },

        {
          path: 'usuarios',
          name: 'usuarios',
          children: [
            {
              path: 'nuevo-usuario',
              name: 'nuevo-usuario',
              component: () => import('../pages/Usuarios/NuevoUsuarios.vue')
            },
            {
              path: 'lista',
              name: 'lista',
              component: () => import('../pages/Usuarios/ListaUsuarios.vue')
            },
            {
              path: 'reportes',
              name: 'usuario-reportes',
              component: () => import('../pages/Usuarios/ReportesUsuario.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            }
          ]

        },

      ]
    }
  ]
})



export default router
