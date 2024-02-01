const typeDocuments = [
  { label: 'DNI',   value: 1 },
  { label: 'CE',    value: 2 },
  { label: 'PAS',   value: 3 },
  { label: 'PTP',   value: 4 }
];

const geners = [
  { label: 'Masculino', value: 'h' },
  { label: 'Femenino', value: 'm' },
  { label: '...', value: 3 }
];

const disabilities = [
  { label: 'Si', value: 2 },
  { label: 'No', value: 1 },
];

const typeUsers = [
  { label: 'Administrador', value: 1 },
  { label: 'Usuario', value: 2 },
  { label: 'Invitado', value: 3 },
];

const offices = [
  { label: 'UGO', value: 1 },
  { label: 'UGSE', value: 2 },
  { label: 'UGERR', value: 3 },
  { label: 'Dirección', value: 4 },
  { label: 'Comunicación', value: 5 },
]

const convenioOffices = [
  { label: 'U. de Gestión de Servicios Empresariales', value: 1 },
  { label: 'U. de Gestión de Operaciones', value: 2 },
]

const convenioComponent = [
  { label: 'Digitalización', value: 1 },
  { label: 'Desarrollo Productivo', value: 2 },
  { label: 'Gestión Empresarial', value: 3 },
  { label: 'Formalización', value: 4 },
]

const entities = [
  { label: 'Tu empresa', value: 1 },
  { label: 'Aliado', value: 2 }
]

const typePerson = [
  { label: 'JURÍDICA', value: 1 },
  { label: 'NATURAL', value: 2 },
];

const categories = [
  {value: 1,label: 'AGROINDUSTRIAL'},
  {value: 2,label: 'ALIMENTOS Y BEBIDAS'},
  {value: 3,label: 'ARTESANIAS Y ARTES MANUALES'},
  {value: 4,label: 'AUDIOVISUALES'},
  {value: 5,label: 'BEBES Y NIÑOS'},
  {value: 6,label: 'BELLEZA Y RELAJACIÓN'},
  {value: 7,label: 'COMPUTACIÓN Y EQUIPOS DE OFICINA'},
  {value: 8,label: 'CONSTRUCCIÓN Y AGRO'},
  {value: 9,label: 'DEPORTES Y DEFENSA PERSONAL'},
  {value: 10,label: 'EDUCACIÓN Y CULTURA'},
  {value: 11,label: 'ELECTO HOGAR'},
  {value: 12,label: 'ESTADO E INSTITUCIONES'},
  {value: 13,label: 'EVENTOS Y ANIMACIÓN'},
  {value: 14,label: 'HOGAR Y JARDIN'},
  {value: 15,label: 'INSTRUMENTOS Y EQUIPOS MUSICALES'},
  {value: 16,label: 'JUEGOS Y ENTRETENIMIENTO'},
  {value: 17,label: 'LIBROS Y REVISTAS'},
  {value: 18,label: 'MASCOTAS'},
  {value: 19,label: 'MASCOTAS Y ACCESORIOS'},
  {value: 20,label: 'PASATIEMPOS Y COLECCIONABLES'},
  {value: 21,label: 'PRODUCCIÓN DE ALIMENTOS'},
  {value: 22,label: 'PRODUCCIÓN DE BEBIDAS'},
  {value: 23,label: 'PUBLICIDAD Y MARKETING'},
  {value: 24,label: 'RESTAURANTES Y DIVERSION'},
  {value: 25,label: 'ROPA CALZADO Y ACCESORIOS'},
  {value: 26,label: 'SALUD Y BIENESTAR'},
  {value: 27,label: 'SEGURIDAD INDUSTRIAL'},
  {value: 28,label: 'SERVICIOS ADMINISTRATIVOS Y CONTABLES'},
  {value: 29,label: 'SERVICIOS EN GENERAL'},
  {value: 30,label: 'SERVICIOS TECNOLOGICOS'},
  {value: 31,label: 'TRANSPORTES Y ADUANAS'},
  {value: 32,label: 'VEHICULOS Y ADUANAS'},
  {value: 33,label: 'VIAJES Y TURISMOS'}
]

export { 
  typeDocuments, 
  geners, 
  disabilities, 
  typeUsers, 
  offices, 
  convenioOffices,
  convenioComponent,
  entities,
  typePerson,
  categories
};