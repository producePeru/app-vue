
const fields = {
  documentType: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'documentType',
    required: true,
    message: 'Seleccionar tipo de documento',
  },
  documentNumber: {
    type: 'iText',
    label: 'Número de documento',
    name: 'documentNumber',
    required: true,
    message: 'Error en el tipo de documento'
  },
  firstName: {
    type: 'iText',
    label: 'Nombres',
    name: 'firstName',
    required: true,
    message: 'Escribe el nombre'
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
  gender: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender',
    required: true,
    message: 'Seleccionar tipo de género',
  },
  email: {
    type: 'iText',
    label: 'Correo',
    name: 'email',
    required: true,
    email: 'email',
    message: 'Escribe el correo del usuario'
  },
  rucNumber: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'rucNumber',
    required: false,
    message: 'Registra el Número de RUC'
  },
  phoneNumber: {
    type: 'iText',
    label: 'Celular',
    name: 'phoneNumber',
    required: false,
    message: 'Escribe el celular del usuario'
  },
  specialty: {
    type: 'iText',
    label: 'Especialidad',
    name: 'specialty',
    required: false,
    message: 'Registra la especialidad del expositor'
  },
  profession: {
    type: 'iText',
    label: 'Profesión',
    name: 'profession',
    required: false,
    message: 'Registra la especialidad del expositor'
  },
  cvLink: {
    type: 'iText',
    label: 'Link de CV',
    name: 'cvLink',
    required: false,
    message: 'Registra la especialidad del expositor'
  }
}

export default fields;