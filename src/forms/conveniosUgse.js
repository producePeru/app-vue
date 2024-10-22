const fields = {
  

  alliedEntity: {
    type: 'iText',
    label: 'Entidad Aliada',
    name: 'alliedEntity',
    required: true,
    message: 'Escribir la entidad aliada',
    disabled: true,
    max: 100
  },
  ruc: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'ruc',
    required: true,
    message: 'El RUC debe tener exactamente 11 caracteres.',
    disabled: true,
    min: 11,
    max: 11
  },

  component: {
    type: 'iSelect',
    label: 'Componente',
    name: 'components',
    required: true,
    message: 'Seleccionar un componente',
    disabled: true
  },

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


  // homeOperations: {
  //   type: 'iDate',
  //   label: 'Fecha de suscripción del convenio',
  //   name: 'homeOperations',
  //   required: true,
  //   message: 'Seleccionar fecha',
  //   disabled: true
  // },

  // space: {
  //   type: 'iSpace',
  // },


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
    label: 'Años del convenio',
    name: 'years',
    required: true,
    message: 'Seleccionar años',
    disabled: false
  },

  aliado: {
    type: 'iText',
    label: 'REPRESENTANTE LEGAL - NOMBRES',
    name: 'aliado',
    required: true,
    message: 'Escribir los nombres y apellidos',
    disabled: true,
    max: 100
  },
  aliadoPhone: {
    type: 'iNumber',
    label: 'REPRESENTANTE LEGAL - CELULAR',
    name: 'aliadoPhone',
    required: true,
    message: 'Escribir el número',
    disabled: true,
    max: 9
  },

  focal: {
    type: 'iText',
    label: 'PUNTO FOCAL - NOMBRES',
    name: 'focal',
    required: true,
    message: 'Escribir datos del punto focal',
    disabled: true,
    max: 100
  },

  focalCargo: {
    type: 'iText',
    label: 'PUNTO FOCAL - CARGO',
    name: 'focalCargo',
    required: true,
    message: 'Escribir cargo del Punto Focal',
    disabled: true,
    max: 50
  },

  focalPhone: {
    type: 'iNumber',
    label: 'PUNTO FOCAL - NUM. CELULAR',
    name: 'focalPhone',
    required: true,
    message: 'Escribir el número de telf.',
    disabled: true,
    max: 9
  },

  renovation: {
    type: 'iSwitch',
    label: 'Renovación Automática',
    name: 'renovation',
    required: false,
    message: 'Seleccionar',
    disabled: true
  },

  observations: {
    type: 'iTextarea',
    label: 'Comentarios',
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