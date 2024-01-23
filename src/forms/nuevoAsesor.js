
const fields = {
  document_type: {
    type: 'iSelect',
    label: 'Tipo de documento',
    name: 'document_type',
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
  id_supervisor: {
    type: 'iSelectWrite',
    label: 'Supervisor',
    name: 'id_supervisor',
    required: true,
    message: 'Seleccionar supervisor',
  },
  id_sede: {
    type: 'iSelect',
    label: 'CDE',
    name: 'id_sede',
    required: true,
    message: 'Seleccionar tipo de documento',
  },
  name: {
    type: 'iText',
    label: 'Nombres',
    name: 'name',
    required: true,
    message: 'Escribe el nombre'
  },
  last_name: {
    type: 'iText',
    label: 'Apellido Paterno',
    name: 'last_name',
    required: true,
    message: 'Escribe el apellidos'
  },
  middle_name: {
    type: 'iText',
    label: 'Apellido Materno',
    name: 'middle_name',
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
  phone: {
    type: 'iText',
    label: 'Num. Celular',
    name: 'phone',
    required: false,
    message: 'Escribe el celular del usuario',
    max: 9
  }
}

export default fields;