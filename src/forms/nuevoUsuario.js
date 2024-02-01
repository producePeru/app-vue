
const fields = {
  // nickName: {
  //   type: 'iText',
  //   label: 'Usuario',
  //   name: 'nickName',
  //   required: true,
  //   message: 'Escribe cuenta de usuario'
  // },
  document_type: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'document_type',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: true
  },
  document_number: {
    type: 'iSearch',
    label: 'Ingresar número',
    name: 'document_number',
    required: true,
    message: 'Escribe número de documento',
    disabled: false,
    max: 8
  },
  last_name: {
    type: 'iText',
    label: 'Apellido paterno',
    name: 'last_name',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  middle_name: {
    type: 'iText',
    label: 'Apellido materno',
    name: 'middle_name',
    required: true,
    message: 'Escribe el apellido materno'
  },
  name: {
    type: 'iText',
    label: 'Nombres',
    name: 'name',
    required: true,
    message: 'Escribe el nombre'
  },
  country_code: {
    type: 'iSelectWrite',
    label: 'País',
    name: 'country_code',
    required: true,
    message: 'Seleccionar país'
  },
  email: {
    type: 'iText',
    label: 'Correo',
    name: 'email',
    required: true,
    email: 'email',
    message: 'Escribe el correo del usuario'
  },
  password: {
    type: 'iPassword',
    label: 'Contraseña',
    name: 'password',
    required: false,
    message: 'Registra la contraseña'
  },
  office_code: {
    type: 'iSelect',
    label: 'Oficina',
    name: 'office_code',
    required: true,
    message: 'Seleccionar un tipo',
  },
  sede_code: {
    type: 'iSelect',
    label: 'Sede donde labora',
    name: 'sede_code',
    required: true,
    message: 'Seleccionar un tipo',
  },
  role: {
    type: 'iSelect',
    label: 'Tipo de usuario',
    name: 'role',
    required: true,
    message: 'Seleccionar un tipo',
  },

  // birthdate: {
  //   type: 'iDate',
  //   label: 'Fecha de nacimiento',
  //   name: 'birthdate',
  //   required: false,
  //   message: 'Seleccionar fecha'
  // },
  gender: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender',
    required: false,
    message: 'Seleccionar tipo de documento',
  },
  
  // isDisabled: {
  //   type: 'iSelect',
  //   label: '¿Tiene discapacidad?',
  //   name: 'isDisabled',
  //   required: false,
  //   message: 'Seleccionar un tipo',
  // },
 
  // phoneNumber: {
  //   type: 'iText',
  //   label: 'Celular',
  //   name: 'phoneNumber',
  //   required: false,
  //   message: 'Escribe el celular del usuario'
  // },
  
  
}

export default fields;