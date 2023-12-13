
const fields = {
  ruc: {
    type: 'iText',
    label: 'RUC',
    name: 'ruc',
    required: true,
    message: 'Escribe el RUC',
    disabled: true
  },
  socialReason: {
    type: 'iText',
    label: 'Razón social',
    name: 'socialReason',
    required: true,
    message: 'Escribe la razón social'
  },
  category: {
    type: 'iSearch',
    label: 'Rubro',
    name: 'category',
    required: true,
    message: 'Escribe la razón social'
  },
  type: {
    type: 'iSelect',
    label: 'Tipo de persona',
    name: 'type',
    required: true,
    message: 'Seleccionar un tipo',
  },
  department: {
    type: 'iSelect',
    label: 'Departamento',
    name: 'department',
    required: true,
    message: 'Seleccionar un tipo',
  },
  province: {
    type: 'iSelect',
    label: 'Provincia',
    name: 'province',
    required: true,
    message: 'Seleccionar un tipo',
  },
  district: {
    type: 'iSelect',
    label: 'Distrito',
    name: 'district',
    required: true,
    message: 'Seleccionar un tipo',
  },
  dniNumber: {
    type: 'iText',
    label: 'Número de documento DNI',
    name: 'dniNumber',
    required: true,
    message: 'El número de DNI no es válido',
    max: 8
  },
  name_full: {
    type: 'iText',
    label: 'Nombres y Apellidos',
    name: 'name_full',
    required: true,
    message: 'Escribe el nombre'
  },
  sex: {
    type: 'iSelect',
    label: 'Sexo',
    name: 'sex',
    required: true,
    message: 'Seleccionar un tipo',
    max: 12
  },
  phone: {
    type: 'iText',
    label: 'Teléfono',
    name: 'phone',
    required: true,
    message: 'Escribe el teléfono',
    max: 12
  },
  email: {
    type: 'iText',
    label: 'Correo electrónico',
    name: 'email',
    required: true,
    message: 'Escribe el teléfono',
    max: 100
  },
  agree: {
    type: 'iCheck',
    label: '',
    name: 'agree',
    required: true,
    message: 'Estoy de acuerdo'
  }

 
}

export default fields;