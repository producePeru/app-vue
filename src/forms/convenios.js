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
  denomination: {
    type: 'iText',
    label: 'Denominación',
    name: 'denomination',
    required: true,
    message: 'Escribir la denominación',
    disabled: true
  },
  alliedEntity: {
    type: 'iText',
    label: 'Entidad Aliada',
    name: 'alliedEntity',
    required: true,
    message: 'Escribir la entidad aliada',
    disabled: true
  },
  homeOperations: {
    type: 'iDate',
    label: 'Inicio de Operaciones',
    name: 'homeOperations',
    required: true,
    message: 'Escribir el incio de las operaciones',
    disabled: true
  },


  address: {
    type: 'iText',
    label: 'Dirección',
    name: 'address',
    required: true,
    message: 'Escribir la dirección',
    disabled: true
  },
  reference: {
    type: 'iText',
    label: 'Referencia',
    name: 'reference',
    required: true,
    message: 'Escribir la referencia',
    disabled: true
  },
  resolution: {
    type: 'iText',
    label: 'Resolución de Autorización de CDE',
    name: 'resolution',
    required: true,
    message: 'Escribir la referencia',
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
  endDate: {
    type: 'iDate',
    label: 'Fin del convenio',
    name: 'endDate',
    required: true,
    message: 'Seleccionar fecha fin de convenio',
    disabled: true
  },
  
  operationalstatus_id: {
    type: 'iSelect',
    label: 'Estado de operatividad',
    name: 'operationalstatus_id',
    required: true,
    message: 'Seleccionar estado de operatividad',
    disabled: true
  },
  agreementstatus_id: {
    type: 'iSelect',
    label: 'Estado de convenio',
    name: 'agreementstatus_id',
    required: true,
    message: 'Seleccionar estado de convenio',
    disabled: true
  },
  initials: {
    type: 'iCheckbox',
    label: 'Entidades',
    name: 'initials',
    required: true,
    message: 'Escribir la referencia',
    disabled: true
  }
}

export default fields;