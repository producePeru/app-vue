
const fields = {
  ruc: {
    type: 'iText',
    label: 'RUC',
    name: 'ruc',
    required: true,
    message: 'Escribe el RUC'
  },
  business_name: {
    type: 'iText',
    label: 'Razón social',
    name: 'business_name',
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
  type_person: {
    type: 'iSelect',
    label: 'Tipo de persona',
    name: 'type_person',
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
  document_number: {
    type: 'iText',
    label: 'Número de documento DNI',
    name: 'document_number',
    required: true,
    message: 'Escribe el número del documento'
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
  },
  phone: {
    type: 'iText',
    label: 'Teléfono',
    name: 'phone',
    required: true,
    message: 'Escribe el teléfono'
  },
  email: {
    type: 'iText',
    label: 'Correo electrónico',
    name: 'email',
    required: true,
    message: 'Escribe el teléfono'
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