const fields = {


  notary_id: {
    type: 'iSelect',
    label: 'Selecciona la notaría',
    name: 'notary_id',
    required: true,
    message: 'Seleccionar una notaría',
    disabled: false
  },
  name: {
    type: 'iText',
    label: 'Nombres del encargado externo',
    name: 'name',
    required: true,
    message: 'Ingresar los nombres'
  },
  lastname: {
    type: 'iText',
    label: 'Apellido paterno del encargado externo',
    name: 'lastname',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  middlename: {
    type: 'iText',
    label: 'Apellido materno del encargado externo',
    name: 'middlename',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  documentnumber: {
    type: 'iText',
    label: 'Número de DNI del encargado externo',
    name: 'documentnumber',
    required: true,
    message: 'Ingresa el número de DNI',
    max: 8
  },
  birthday: {
    type: 'iDate',
    label: 'Fecha de nacimiento - día/mes/año',
    name: 'birthday',
    required: false,
    message: 'año-mes-día'
  },
  phone: {
    type: 'iText',
    label: 'Ingresar número celular',
    name: 'phone',
    required: true,
    message: 'Escribe número de documento',
    disabled: false,
    max: 9
  },
  gender_id: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender_id',
    required: true,
    message: 'Seleccionar un tipo de género',
    disabled: true
  },
  // cde_id: {
  //   type: 'iSelect',
  //   label: 'CDE',
  //   name: 'cde_id',
  //   required: true,
  //   message: 'Seleccionar la sede',
  //   disabled: true
  // },

  role_id: {
    type: 'iSelect',
    label: 'Rol',
    name: 'role_id',
    required: true,
    message: 'Seleccionar un rol de usuario',
    disabled: true
  }
}

export default fields;