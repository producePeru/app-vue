
const fields = {
  typedocument_id: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'typedocument_id',
    required: false,
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  documentnumber: {
    type: 'iText',
    label: 'Número de documento',
    name: 'documentnumber',
    required: false,
    message: 'Escribe número de documento',
    disabled: true
  },
  lastname: {
    type: 'iText',
    label: 'Apellido Paterno',
    name: 'lastname',
    required: true,
    message: 'Escribir apellido',
    disabled: false
  },
  middlename: {
    type: 'iText',
    label: 'Apellido Materno',
    name: 'middlename',
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
  city_id: {
    type: 'iSelect',
    label: 'Departamento',
    name: 'city_id',
    required: false,
    message: 'Seleccionar departamento',
    disabled: false
  },
  province_id: {
    type: 'iSelect',
    label: 'Provincia',
    name: 'province_id',
    required: false,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district_id: {
    type: 'iSelect',
    label: 'Distrito',
    name: 'district_id',
    required: false,
    message: 'Seleccionar distrito',
    disabled: false
  },
  phone: {
    type: 'iText',
    label: 'Número de celular',
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
  birthday: {
    type: 'iDate',
    label: 'Fecha de nacimiento',
    name: 'birthday',
    required: false,
    message: 'Seleccionar fecha',
    disabled: false
  },
  gender_id: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender_id',
    required: false,
    message: 'Seleccionar tipo de documento',
  },
  sick: {
    type: 'iSelect',
    label: '¿Tiene discapacidad?',
    name: 'sick',
    required: false,
    message: 'Seleccionar un tipo',
  }
}

export default fields;