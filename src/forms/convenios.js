const fields = {
  city_id: {
    type: 'iSelect',
    label: 'Región',
    name: 'city_id',
    required: true,
    message: 'Seleccionar una región',
    disabled: true
  },
  province_id: {
    type: 'iSelect',
    label: 'Provincia',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: true
  },
  district_id: {
    type: 'iSelect',
    label: 'Distrito',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: true
  },

  alliedEntity: {
    type: 'iText',
    label: 'Entidad Aliada',
    name: 'alliedEntity',
    required: true,
    message: 'Escribir la entidad aliada',
    disabled: true,
    max: 100
  },
  homeOperations: {
    type: 'iDate',
    label: 'Fecha de suscripción del convenio',
    name: 'homeOperations',
    required: true,
    message: 'Seleccionar fecha',
    disabled: true
  },

  // space: {
  //   type: 'iSpace',
  // },
  external: {
    type: 'iSwitch',
    label: 'CDE AGENTE EXTERNO',
    name: 'external',
    required: false,
    message: 'Seleccionar',
    disabled: true
  },

  startDate: {
    type: 'iDate',
    label: 'Inicio Convenio Vigente',
    name: 'startDate',
    required: true,
    message: 'Seleccionar fecha de convenio vigente',
    disabled: true
  },
  
  years: {
    type: 'iSelect',
    label: 'Número de años vigente',
    name: 'years',
    required: true,
    message: 'Seleccionar años',
    disabled: false
  },

  observations: {
    type: 'iTextarea',
    label: 'Observaciones',
    name: 'observations',
    required: false,
    message: 'Seleccionar',
    disabled: false
  }

  // reference: {
  //   type: 'iText',
  //   label: 'Referencia',
  //   name: 'reference',
  //   required: true,
  //   message: 'Escribir la referencia',
  //   disabled: true
  // },
  // resolution: {
  //   type: 'iText',
  //   label: 'Resolución de Autorización de CDE',
  //   name: 'resolution',
  //   required: true,
  //   message: 'Escribir la referencia',
  //   disabled: true
  // },
  
  // endDate: {
  //   type: 'iDate',
  //   label: 'Fin del convenio',
  //   name: 'endDate',
  //   required: true,
  //   message: 'Seleccionar fecha fin de convenio',
  //   disabled: true
  // },

   // address: {
  //   type: 'iText',
  //   label: 'Dirección',
  //   name: 'address',
  //   required: true,
  //   message: 'Escribir la dirección',
  //   disabled: true
  // },

  // denomination: {
  //   type: 'iText',
  //   label: 'Entidad Aliada',
  //   name: 'denomination',
  //   required: true,
  //   message: 'Escribir la entidad aliada',
  //   disabled: true
  // },
  
  // initials: {
  //   type: 'iCheckbox',
  //   label: 'Entidades',
  //   name: 'initials',
  //   required: true,
  //   message: 'Escribir la referencia',
  //   disabled: true
  // }
}

export default fields;