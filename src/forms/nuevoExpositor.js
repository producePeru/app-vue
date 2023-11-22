
const fields = {
  type_document: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'type_document',
    required: true,
    message: 'Seleccionar tipo de documento',
  },
  number_document: {
    type: 'iText',
    label: 'Número de documento',
    name: 'number_document',
    required: true,
    message: 'Error en el tipo de documento'
  },
  name: {
    type: 'iText',
    label: 'Nombres',
    name: 'name',
    required: true,
    message: 'Escribe el nombre'
  },
  last_name_p: {
    type: 'iText',
    label: 'Apellido paterno',
    name: 'last_name_p',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  last_name_m: {
    type: 'iText',
    label: 'Apellido materno',
    name: 'last_name_m',
    required: true,
    message: 'Escribe el apellido materno'
  },
  sex: {
    type: 'iSelect',
    label: 'Género',
    name: 'sex',
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
  ruc: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'ruc',
    required: false,
    message: 'Registra el Número de RUC'
  },
  phone: {
    type: 'iText',
    label: 'Celular',
    name: 'phone',
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
  url_cv: {
    type: 'iText',
    label: 'Link de CV',
    name: 'url_cv',
    required: false,
    message: 'Registra la especialidad del expositor'
  }
}

export default fields;