
const fields = {
  typedocument_id: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'typedocument_id',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  documentnumber: {
    type: 'iSearch',
    label: 'Ingresar número',
    name: 'documentnumber',
    required: true,
    message: 'Escribe número de documento',
    disabled: true
  },
  lastname: {
    type: 'iText',
    label: 'Apellido Paterno',
    name: 'lastname',
    required: true,
    message: 'Escribir apellido paterno',
    disabled: true
  },
  middlename: {
    type: 'iText',
    label: 'Apellido Materno',
    name: 'middlename',
    required: true,
    message: 'Escribir apellido materno',
    disabled: true
  },
  name: {
    type: 'iText',
    label: 'Nombres',
    name: 'name',
    required: true,
    message: 'Escribir nombre',
    disabled: true
  },
  city_id: {
    type: 'iSelect',
    label: 'Departamento residente',
    name: 'city_id',
    required: true,
    message: 'Seleccionar departamento',
    disabled: true
  },
  province_id: {
    type: 'iSelect',
    label: 'Provincia residente',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: true
  },
  district_id: {
    type: 'iSelect',
    label: 'Distrito residente',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: true
  },
  address: {
    type: 'iText',
    label: 'Dirección',
    name: 'address',
    required: false,
    message: 'Escribir dirección',
    disabled: false
  },
  birthday: {
    type: 'iDate',
    label: 'Fecha de nacimiento',
    name: 'birthday',
    required: false,
    message: 'Seleccionar fecha',
    disabled: true
  },
  phone: {
    type: 'iText',
    label: 'Número Telefónico del contacto',
    name: 'phone',
    required: false,
    message: 'Número de celular',
    max: 9,
    disabled: true
  },
  email: {
    type: 'iText',
    label: 'Correo electrónico',
    name: 'email',
    required: false,
    message: 'Ingresar email',
    email: 'email',
    disabled: true
  },
  
  gender_id: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender_id',
    required: true,
    message: 'Seleccionar un tipo de género',
    disabled: true
  },
  lession: {
    type: 'iSelect',
    label: '¿Tiene discapacidad?',
    name: 'lession',
    required: true,
    message: '¿Tiene discapacidad?',
    disabled: true
  },
}

export default fields;