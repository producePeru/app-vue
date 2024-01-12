const typeDocuments = [
  { label: 'DNI',   value: 1 },
  { label: 'CE',    value: 2 },
  { label: 'PAS',   value: 3 },
  { label: 'PTP',   value: 4 }
];

const geners = [
  { label: 'Masculino', value: 1 },
  { label: 'Femenino', value: 2 },
  { label: '...', value: 3 }
];

const disabilities = [
  { label: 'Si', value: 2 },
  { label: 'No', value: 1 },
];

const typeUsers = [
  { label: 'Administrador', value: '1' },
  { label: 'Usuario', value: '2' },
  { label: 'Invitado', value: '3' },
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


export { 
  typeDocuments, 
  geners, 
  disabilities, 
  typeUsers, 
  offices, 
  convenioOffices,
  convenioComponent,
  entities
};