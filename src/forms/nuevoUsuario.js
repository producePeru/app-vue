const fields = {
  email: {
    type: 'iText',
    label: 'Correo',
    name: 'email',
    required: true,
    email: 'email',
    message: 'Escribe el correo del usuario'
  },
  // password: {
  //   type: 'iPassword',
  //   label: 'Contraseña',
  //   name: 'password',
  //   required: true,
  //   message: 'Registra la contraseña'
  // },
  name: {
    type: 'iText',
    label: 'Nombres',
    name: 'name',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  lastname: {
    type: 'iText',
    label: 'Apellido paterno',
    name: 'lastname',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  middlename: {
    type: 'iText',
    label: 'Apellido materno',
    name: 'middlename',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  documentnumber: {
    type: 'iText',
    label: 'Número de DNI',
    name: 'documentnumber',
    required: true,
    message: 'Escribe el apellido paterno',
    max: 8
  },
  birthday: {
    type: 'iDate',
    label: 'Fecha de nacimiento',
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
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  cde_id: {
    type: 'iSelect',
    label: 'CDE',
    name: 'cde_id',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  office_id: {
    type: 'iSelect',
    label: 'Oficina',
    name: 'office_id',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  role_id: {
    type: 'iSelect',
    label: 'Rol',
    name: 'role_id',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  }
}

export default fields;