
const fields = {
  nickName: {
    type: 'iText',
    label: 'Usuario',
    name: 'nickName',
    required: true,
    message: 'Escribe cuenta de usuario'
  },
  password: {
    type: 'iText',
    label: 'Contraseña',
    name: 'password',
    required: true,
    message: 'Registra la contraseña'
  },
  documentType: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'documentType',
    required: true,
    message: 'Seleccionar tipo de documento',
  },
  documentNumber: {
    type: 'iText',
    label: 'Núm. de documento',
    name: 'documentNumber',
    required: true,
    message: 'Error en el tipo de documento'
  },
  lastName: {
    type: 'iText',
    label: 'Apellido paterno',
    name: 'lastName',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  middleName: {
    type: 'iText',
    label: 'Apellido materno',
    name: 'middleName',
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
  countryCode: {
    type: 'iSelectWrite',
    label: 'País',
    name: 'countryCode',
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
  officeCode: {
    type: 'iSelect',
    label: 'Oficina',
    name: 'officeCode',
    required: true,
    message: 'Seleccionar un tipo',
  },
  sedeCode: {
    type: 'iSelect',
    label: 'Sede donde labora',
    name: 'sedeCode',
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

  birthdate: {
    type: 'iDate',
    label: 'Fecha de nacimiento',
    name: 'birthdate',
    required: false,
    message: 'Seleccionar fecha'
  },
  gender: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender',
    required: false,
    message: 'Seleccionar tipo de documento',
  },
  
  isDisabled: {
    type: 'iSelect',
    label: '¿Tiene discapacidad?',
    name: 'isDisabled',
    required: false,
    message: 'Seleccionar un tipo',
  },
 
  phoneNumber: {
    type: 'iText',
    label: 'Celular',
    name: 'phoneNumber',
    required: false,
    message: 'Escribe el celular del usuario'
  },
  
  
}

export default fields;