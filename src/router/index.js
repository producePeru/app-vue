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



    // ruta_tests
    {
      path: '/test-entrada/:slug',
      name: 'public-test-entrada',
      component: () => import('../pages/public/TestEntrada.vue')
    },
    {
      path: '/test-salida',
      name: 'public-test-salida',
      component: () => import('../pages/public/TestSalida.vue')
    },
    {
      path: '/invitacion',
      name: 'public-invitacion',
      component: () => import('../pages/public/InvitacionPage.vue')
    },









    // {
    //   path: '/F',
    //   name: 'questionary',
    //   component: () => import('../pages/public/QuestionaryId.vue')
    // },





    {
      path: '/enviado',
      name: 'enviado',
      component: () => import('../pages/public/SuccessMessage.vue')
    },
    {
      path: '/404',
      name: 'pagina404',
      component: () => import('../pages/public/NoFound.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/DashboardPage.vue'),
      children: [
        {
          path: 'inicio',
          name: 'inicio',
          component: () => import('../pages/Inicio/InicioDashboard.vue'),
          meta: { requiresAuth: true, roles: ['admin', 'user'] },
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

            {
              path: 'talleres',
              name: 'talleres',
              component: () => import('../pages/RutaDigital/TalleresRD.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] }
            },
            
            
            { //entrada
              path: 'talleres/test-entrada',
              name: 'test-entrada',
              component: () => import('../pages/RutaDigital/components/TestEntrada.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] }
            },
            {
              path: 'talleres/editar-test-entrada',
              name: 'editar-test-entrada',
              component: () => import('../pages/RutaDigital/components/TestEntrada.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] }
            },
            { //salida
              path: 'talleres/test-salida',
              name: 'test-salida',
              component: () => import('../pages/RutaDigital/components/TestSalida.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] }
            },
            {
              path: 'talleres/editar-test-salida',
              name: 'editar-test-salida',
              component: () => import('../pages/RutaDigital/components/TestSalida.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] }
            },






            {
              path: 'taller-detalle',
              name: 'taller-id',
              component: () => import('../pages/RutaDigital/TallerDetalle.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            },
            {
              path: 'calendario',
              name: 'calendario',
              component: () => import('../pages/RutaDigital/CalendarioTalleres.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            },
            {
              path: 'expositores',
              name: 'expositores',
              component: () => import('../pages/Usuarios/ExpositoresLista.vue'),
              meta: { requiresAuth: true, roles: ['admin', 'user'] },
            }
            


            




            
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
            },
            
          ]

        },

        {
          path: 'mis-datos',
          name: 'mis-datos',
          component: () => import('../pages/Usuarios/MiPerfil.vue')
        },

      ]
    }
  ]
})



export default router
