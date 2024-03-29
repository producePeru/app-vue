
const fields = {
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
    label: 'Ingresar número',
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
    required: false,
    message: 'Número de contacto y 9 max',
    email: 'email',
    disabled: false
  },
  birthdate: {
    type: 'iDate',
    label: 'Fecha de nacimiento',
    name: 'birthdate',
    required: false,
    message: 'Seleccionar fecha',
    disabled: false
  },
  gender: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender',
    required: false,
    message: 'Seleccionar tipo de documento',
  },
  lession: {
    type: 'iSelect',
    label: '¿Tiene discapacidad?',
    name: 'lession',
    required: false,
    message: 'Seleccionar un tipo',
  }
}

export default fields;