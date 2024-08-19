const fields = {
  numberDocument: {
    type: 'iSearch',
    label: 'Número de documento',
    name: 'numberDocument',
    required: true,
    message: 'Ingresar Número de documento',
    disabled: false
  },
  namePerson: {
    type: 'iText',
    label: 'Nombre',
    name: 'namePerson',
    required: true,
    message: 'Escribe nombre',
    disabled: true,
  },

  city_id: {
    type: 'iSelectWrite',
    label: 'Región del negocio',
    name: 'city_id',
    required: true,
    message: 'Seleccionar región',
    disabled: true
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'Provincia del negocio',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: true
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'Distrito del negocio',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: true
  },
  gender_id: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender_id',
    required: true,
    message: 'Seleccionar género',
    disabled: true,
  },
  sick: {
    type: 'iSelect',
    label: '¿Tiene discapacidad?',
    name: 'sick',
    required: true,
    message: 'Seleccionar estado',
    disabled: true,
  },
  ruc: {
    type: 'iSearch',
    label: 'Número de RUC',
    name: 'ruc',
    required: true,
    message: 'Escribe el número de RUC',
    disabled: false
  },

  divider: {
    type: 'iDivider',
  },

  component_1: {
    type: 'iSelectWrite',
    is: 'component',
    label: 'Componente 1',
    name: 'component_1',
    required: true,
    message: 'Seleccionar componente 1',
    disabled: false
  },
  component_2: {
    type: 'iSelectWrite',
    is: 'component',
    label: 'Componente 2',
    name: 'component_2',
    required: false,
    message: 'Seleccionar componente 2',
    disabled: false
  },
  component_3: {
    type: 'iSelectWrite',
    is: 'component',
    label: 'Componente 3',
    name: 'component_3',
    required: false,
    message: 'Seleccionar componente 3',
    disabled: false
  },

  startDate: {
    type: 'iDate',
    label: 'Día Inicio',
    name: 'startDate',
    required: true,
    message: 'Seleccionar fecha de inicio',
    placeholder: 'año-mes-día'
  },

  endDate: {
    type: 'iDate',
    label: 'Día Fin',
    name: 'endDate',
    required: true,
    message: 'Seleccionar fecha de fin',
    placeholder: 'año-mes-día'
  }
}

export default fields;