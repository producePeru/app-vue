
const fields = {
  usuario: {
    type: 'iText',
    label: 'Usuario',
    name: 'usuario',
    required: true,
    message: 'Escribe cuenta de usuario'
  },
  clave: {
    type: 'iText',
    label: 'Contraseña',
    name: 'clave',
    required: true,
    message: 'Registra la contraseña'
  },
  tipo_documento: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'tipo_documento',
    required: true,
    message: 'Seleccionar tipo de documento',
  },
  nro_documento: {
    type: 'iSearch',
    label: 'Número de documento',
    name: 'nro_documento',
    required: true,
    message: 'Error en el tipo de documento'
  },
  apellido_paterno: {
    type: 'iText',
    label: 'Apellido paterno',
    name: 'apellido_paterno',
    required: true,
    message: 'Escribe el apellido paterno'
  },
  apellido_materno: {
    type: 'iText',
    label: 'Apellido materno',
    name: 'apellido_materno',
    required: true,
    message: 'Escribe el apellido materno'
  },
  nombres: {
    type: 'iText',
    label: 'Nombres',
    name: 'nombres',
    required: true,
    message: 'Escribe el nombre'
  },
  pais: {
    type: 'iSelectWrite',
    label: 'País',
    name: 'pais',
    required: true,
    message: 'Seleccionar país'
  },

  fecha_nacimiento: {
    type: 'iDate',
    label: 'Fecha de nacimiento',
    name: 'fecha_nacimiento',
    required: true,
    message: 'Seleccionar país'
  },
  genero: {
    type: 'iSelect',
    label: 'Género',
    name: 'genero',
    required: true,
    message: 'Seleccionar tipo de documento',
  },
  discapacidad: {
    type: 'iSelect',
    label: '¿Tiene discapacidad?',
    name: 'discapacidad',
    required: true,
    message: 'Seleccionar un tipo',
  },
  correo: {
    type: 'iText',
    label: 'Correo',
    name: 'correo',
    required: true,
    email: 'email',
    message: 'Escribe el correo del usuario'
  },
  celular: {
    type: 'iText',
    label: 'Celular',
    name: 'celular',
    required: true,
    message: 'Escribe el celular del usuario'
  },
  oficina: {
    type: 'iSelect',
    label: 'Oficina',
    name: 'idOficina',
    required: true,
    message: 'Seleccionar un tipo',
  },
  sede_labora: {
    type: 'iSelect',
    label: 'Sede donde labora',
    name: 'idSede',
    required: true,
    message: 'Seleccionar un tipo',
  },
  tipo_usuario: {
    type: 'iSelect',
    label: 'Tipo de usuario',
    name: 'tipo_usuario',
    required: true,
    message: 'Seleccionar un tipo',
  }
}

export default fields;