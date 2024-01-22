
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
    label: 'Apellidos',
    name: 'lastName',
    required: true,
    message: 'Escribe el apellidos'
  },
  department: {
    type: 'iSelect',
    label: 'Departamento',
    name: 'department',
    required: false,
    message: 'Seleccionar un tipo',
  },
  province: {
    type: 'iSelect',
    label: 'Provincia',
    name: 'province',
    required: false,
    message: 'Seleccionar un tipo',
  },
  district: {
    type: 'iSelect',
    label: 'Distrito',
    name: 'district',
    required: false,
    message: 'Seleccionar un tipo',
  },
  email: {
    type: 'iText',
    label: 'Correo',
    name: 'email',
    required: false,
    email: 'email',
    message: 'Escribe el correo del usuario'
  },
  phoneNumber: {
    type: 'iText',
    label: 'Num. Celular',
    name: 'phoneNumber',
    required: false,
    message: 'Escribe el celular del usuario',
    max: 9
  }
}

export default fields;