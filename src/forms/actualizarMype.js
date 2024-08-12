const fields = {
  ruc: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'ruc',
    required: true,
    message: 'Escribe el número de RUC',
    max: 11,
    disabled: false
  },
  razonSocial: {
    type: 'iText',
    label: 'Razón Social',
    name: 'razonSocial',
    required: true,
    message: 'Escribe la razón Social',
    disabled: false,
  },
  
  actividadEconomica: {
    type: 'iText',
    label: 'Actividad Económica',
    name: 'actividadEconomica',
    required: true,
    message: 'Escribe la Actividad Económica',
  },

  departamento: {
    type: 'iText',
    label: 'Departamento',
    name: 'departamento',
    required: true,
    message: 'Escribe el departamento',
  },

  provincia: {
    type: 'iText',
    label: 'Provincia',
    name: 'provincia',
    required: true,
    message: 'Escribe la provincia'
  },

  distrito: {
    type: 'iText',
    label: 'Distrito',
    name: 'distrito',
    required: true,
    message: 'Escribe el distrito',
  },

  direccion: {
    type: 'iText',
    label: 'Direccion',
    name: 'direccion',
    required: true,
    message: 'Escribe la dirección',
    disabled: false,
  },
}

export default fields;