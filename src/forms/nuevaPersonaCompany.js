
const fields = {
  ruc: {
    type: 'iSearch',
    label: 'Ingresar número RUC',
    name: 'ruc',
    required: true,
    message: 'Escribe número de documento',
    disabled: false
  },
  social_reason: {
    type: 'iText',
    label: 'Razón social',
    name: 'social_reason',
    required: true,
    message: 'Escribir apellido',
    disabled: true
  },
  category: {
    type: 'iSelect',
    label: 'Rubro',
    name: 'category',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  person_type: {
    type: 'iSelect',
    label: 'Tipo',
    name: 'person_type',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  document_type: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'document_type',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  number_document: {
    type: 'iSearch',
    label: 'Ingresar número documento',
    name: 'number_document',
    required: true,
    message: 'Escribe número de documento',
    disabled: true
  },
  last_name: {
    type: 'iText',
    label: 'Apellido Paterno',
    name: 'last_name',
    required: true,
    message: 'Escribir apellido',
    disabled: false
  },
  middle_name: {
    type: 'iText',
    label: 'Apellido Materno',
    name: 'middle_name',
    required: true,
    message: 'Escribir apellido',
    disabled: false
  },
  name: {
    type: 'iText',
    label: 'Nombres',
    name: 'name',
    required: true,
    message: 'Escribir nombre',
    disabled: false
  },
  department: {
    type: 'iSelect',
    label: 'Departamento',
    name: 'department',
    required: false,
    message: 'Seleccionar departamento',
    disabled: false
  },
  province: {
    type: 'iSelect',
    label: 'Provincia',
    name: 'province',
    required: false,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district: {
    type: 'iSelect',
    label: 'Distrito',
    name: 'district',
    required: false,
    message: 'Seleccionar distrito',
    disabled: false
  },
  phone: {
    type: 'iText',
    label: 'Número Telefónico del contacto',
    name: 'phone',
    required: false,
    message: 'Número de contacto y 9 max',
    max: 9,
    disabled: false
  },
  email: {
    type: 'iText',
    label: 'Correo electrónico',
    name: 'email',
    required: true,
    message: 'Ingresa tu correo',
    email: 'email',
    disabled: false
  }
}

export default fields;