const fields = {
  numberDocument: {
    type: 'iSearch',
    label: 'Número de documento',
    name: 'numberDocument',
    required: true,
    message: 'Ingresar Número de documento',
    disabled: false
  },
  razonSocial: {
    type: 'iText',
    label: 'Nombre',
    name: 'razonSocial',
    required: true,
    message: 'Escribe nombre',
    disabled: false,
  },

  city_id: {
    type: 'iSelectWrite',
    label: 'Región del negocio',
    name: 'city_id',
    required: true,
    message: 'Seleccionar región',
    disabled: false
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'Provincia del negocio',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'Distrito del negocio',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: false
  },

  ruc: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'ruc',
    required: true,
    message: 'Escribe el número de RUC',
    disabled: false,
  },
  gender_id: {
    type: 'iSelect',
    label: 'Género',
    name: 'gender_id',
    required: true,
    message: 'Seleccionar género',
  },
  sick: {
    type: 'iSelect',
    label: '¿Tiene discapacidad?',
    name: 'sick',
    required: true,
    message: 'Seleccionar estado',
  },

  divider: {
    type: 'iDivider',
  },

  component1: {
    type: 'iSelectWrite',
    label: 'Componente 1',
    name: 'component',
    required: true,
    message: 'Seleccionar componente 1',
    disabled: false
  },
  component2: {
    type: 'iSelectWrite',
    label: 'Componente 2',
    name: 'component',
    required: true,
    message: 'Seleccionar componente 2',
    disabled: false
  },
  component3: {
    type: 'iSelectWrite',
    label: 'Componente 3',
    name: 'component',
    required: true,
    message: 'Seleccionar componente 3',
    disabled: false
  },

  dateStart: {
    type: 'iDate',
    label: 'Día Inicio',
    name: 'dateStart',
    required: true,
    message: 'Seleccionar fecha de inicio',
    placeholder: 'año-mes-día'
  },

  dateEnd: {
    type: 'iDate',
    label: 'Día Fin',
    name: 'dateEnd',
    required: true,
    message: 'Seleccionar fecha de fin',
    placeholder: 'año-mes-día'
  }
}

export default fields;