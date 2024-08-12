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
      path: '/politicas-privacidad',
      name: 'politicas',
      component: () => import('../pages/PoliticasPrivacidad.vue')
    },
    {
      path: '/formalizacion-digital',
      name: 'formalizacion',
      component: () => import('../pages/FormalizacionDigital.vue')
    },
    {
      path: '/cyberwowpnte',
      name: 'landing',
      component: () => import('../pages/public/NoFound.vue')
    },
    {
      path: '/notarias',
      name: 'lasnotarias',
      component: () => import('../pages/Landing/NotariasPage.vue')
    },
  
    // {
    //   path: '/formalizacion-digital-mapa',
    //   name: 'formalizacion-mapa',
    //   component: () => import('../pages/Formalizacion/FormalizacionMapa.vue')
    // },
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
      path: '/test-salida/:slug',
      name: 'public-test-salida',
      component: () => import('../pages/public/TestSalida.vue')
    },
    {
      path: '/invitacion/:slug',
      name: 'public-invitacion',
      component: () => import('../pages/public/InvitacionPage.vue')
    },
    {
      path: '/enviado',
      name: 'enviado',
      component: () => import('../pages/public/SuccessMessage.vue')
    },

 
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../pages/Unauthorized.vue')
    },

   
    {
      path: '/:pathMatch(.*)*',
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
          meta: { requiresAuth: true },
        },
        {
          path: 'mypes',
          name: 'lista-mypes',
          component: () => import('../pages/Mypes/MypesList.vue'),
          meta: { requiresAuth: false },
        },
        {
          path: 'gamarra-produce',
          name: 'gamarra-produce',
          component: () => import('../pages/Landing/GamarraProduce/GamarraIndex.vue'),
        },
        {
          path: 'registrar-usuario',
          name: 'registrar-persona',
          component: () => import('../pages/Personas/NuevaPersona.vue'),
          meta: { requiresAuth: false },
        },
        {
          path: 'actualizar-usuario',
          name: 'actualizar-persona',
          component: () => import('../pages/Personas/ActualizarPersona.vue')
        },
        {
          path: 'patrimonios',
          name: 'patrimonios',
          component: () => import('../pages/Patrimonio/PatrimonioIndex.vue'),
        },

        
        {
          path: 'drive',
          name: 'drive',
          children: [
            {
              path: 'mis-carpetas',
              name: 'drive-mis-carpetas',
              component: () => import('../pages/Drive/DriveCarpetas.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'subir-archivo',
              name: 'drive-subir-archivo',
              component: () => import('../pages/Drive/DriveSubirArchivo.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'mis-archivos',
              name: 'drive-mis-archivos',
              component: () => import('../pages/Drive/DriveVerMisArchivos.vue'),
              meta: { requiresAuth: true },
            }
          ]
        },

        {
          path: 'asesorias',
          name: 'asesorias',
          children: [
            {
              path: 'solicitudes',
              name: 'solicitudes',
              component: () => import('../pages/Asesorias/SolicitudesLista.vue'),
              // meta: { requiresAuth: true },
            },
            {
              path: 'asesorias',
              name: 'asesorias',
              component: () => import('../pages/Asesorias/AsesoriasLista.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'asesorias-formalizaciones',
              name: 'asesorias-formalizaciones',
              component: () => import('../pages/Asesorias/AsesoriasFormalizaciones.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'planes-accion',
              name: 'planes-accion',
              component: () => import('../pages/Asesorias/PlanesDeAccion.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'solicitantes',
              name: 'solicitantes',
              component: () => import('../pages/Asesorias/SolicitantesLista.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'notarias',
              name: 'notarias',
              component: () => import('../pages/Asesorias/NotariasLista.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'supervisores',
              name: 'supervisores',
              component: () => import('../pages/Asesorias/SupervisoresLista.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'asesores',
              name: 'asesores',
              component: () => import('../pages/Asesorias/AsesoresLista.vue'),
              meta: { requiresAuth: true },
            }  
          ]
        },

        {
          path: 'convenios',
          name: 'convenios',
          children: [
            {
              path: 'estado-convenio',
              name: 'estado-convenio',
              component: () => import('../pages/ConveniosUGO/ConvenioEstado.vue'),
              meta: { requiresAuth: true },
            }
          ]
        },
        
        // {
        //   path: 'convenios',
        //   name: 'convenios',
        //   children: [
        //     {
        //       path: 'nuevo-convenio',
        //       name: 'nuevo-convenio',
        //       component: () => import('../pages/Convenios/NuevoConvenio.vue'),
        //       meta: { requiresAuth: true },
        //     },
        //     {
        //       path: 'compromisos/:id',
        //       name: 'compromisos',
        //       component: () => import('../pages/Convenios/CompromisosConvenios.vue'),
             
        //     },
        //     {
        //       path: 'lista-convenios',
        //       name: 'lista-convenios',
        //       component: () => import('../pages/Convenios/ListaConvenios.vue'),
        //       meta: { requiresAuth: true },
        //     },
        //     {
        //       path: 'convenio/:id',
        //       name: 'convenio-detalles',
        //       component: () => import('../pages/Convenios/ListaConvenioDetalle.vue'),
     
        //     }         
        //   ]
        // },
        {
          path: 'ruta-digital',
          name: 'rutadigital',
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
              name: 'taller-descripcion',
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
          meta: { requiresAuth: true },
          children: [
            {
              path: 'nuevo-usuario',
              name: 'usuarios-nuevo',
              component: () => import('../pages/Usuarios/NuevoUsuarios.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'asesor-externo-notario',
              name: 'asesor-externo-notario',
              component: () => import('../pages/Usuarios/NuevoUsuariosNotaria.vue'),
              meta: { requiresAuth: false },
            },
            {
              path: 'actualizar-usuario/:dni',
              name: 'usuarios-actualizar',
              component: () => import('../pages/Usuarios/ActualizarUsuario.vue'),
            
            },
            {
              path: 'usuario-vistas',
              name: 'usuarios-vistas',
              component: () => import('../pages/Usuarios/VistasUsuarios.vue'),
            },
            {
              path: 'lista',
              name: 'usuarios-lista',
              component: () => import('../pages/Usuarios/ListaUsuarios.vue'),
              meta: { requiresAuth: true },
            },     
          ]
        },

        {
          path: 'configuraciones',
          name: 'configuraciones',
          meta: { requiresAuth: true },
          children: [
            {
              path: 'tokens',
              name: 'tokens',
              component: () => import('../pages/Configuraciones/MisTokens.vue'),
              meta: { requiresAuth: true },
            }, 
          ]
        },


        {
          path: 'mi-perfil',
          name: 'mi-perfil',
          component: () => import('../pages/Usuarios/MiPerfil.vue'),
          meta: { requiresAuth: false },
        },  
        {
          path: 'cambiar-clave',
          name: 'cambiar-clave',
          component: () => import('../pages/Usuarios/CambiarClave.vue')
        },  
        {
          path: 'cyberwow',
          name: 'cyberwow',
          component: () => import('../pages/Wow/CyberWow.vue')
        }, 

      ]
    }
  ]
})



export default router
