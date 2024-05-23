const fields = {
  codesunarp: {
    type: 'iText',
    label: 'Código SID sunarp',
    name: 'codesunarp',
    required: false,
    message: 'Escribir el código SID sunarp',
    disabled: false
  },
  economicsector_id: {
    type: 'iSelectWrite',
    label: 'Sector económico',
    name: 'economicsector_id',
    required: true,
    message: 'Seleccionar el sector económico',
    disabled: false
  },
  comercialactivity_id: {
    type: 'iSelectWrite',
    label: 'Actividad comercial',
    name: 'comercialactivity_id',
    required: true,
    message: 'Seleccionar la actividad comercial',
    disabled: false
  },
  regime_id: {
    type: 'iSelect',
    label: 'Tipo de régimen societario',
    name: 'regime_id',
    required: true,
    message: 'Seleccionar el régimen societario',
    disabled: false
  },
  city_id: {
    type: 'iSelectWrite',
    label: 'Departamento',
    name: 'city_id',
    required: true,
    message: 'Seleccionar departamento',
    disabled: false
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'Provincia',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'Distrito',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: false
  },
  address: {
    type: 'iText',
    label: 'Dirección del negocio',
    name: 'address',
    required: false,
    message: 'Escribir apellido',
    disabled: false
  },
  modality_id: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality_id',
    required: true,
    message: 'Seleccionar la modalidad',
    disabled: false
  }
};

const acto = {
  name: {
    type: 'iText',
    label: 'Nombre empresa',
    name: 'name',
    required: true,
    message: 'Escribir nombre de la empresa',
    disabled: false
  },
  numbernotary: {
    type: 'iText',
    label: 'Número de solicitud de envio a Notaría',
    name: 'numbernotary',
    required: true,
    message: 'Escribir número de solicitud de envio a Notaría',
    disabled: false
  },
  city: {
    type: 'iSelect',
    label: 'Seleciona Provincia',
    name: 'city',
    required: false,
    message: 'Buscar por provincia',
    disabled: false
  },
  notary_id: {
    type: 'iSelect',
    label: 'Notaría',
    name: 'notary_id',
    required: true,
    message: 'Seleccionar una notaría',
    disabled: false
  },
  // modality: {
  //   type: 'iSelect',
  //   label: 'Modalidad de atención',
  //   name: 'modality',
  //   required: false,
  //   message: 'Seleccionar modalidad',
  //   disabled: false
  // }
};

const final = {
  ruc: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'ruc',
    required: true,
    message: 'Escribir número de RUC',
    disabled: false,
    max: 9,
    min: 9
  }
};

const ructen = {
  detailprocedure_id: {
    type: 'iSelect',
    label: 'Detalle del trámite',
    name: 'detailprocedure_id',
    required: true,
    message: 'Seleccionar detalle del trámite',
    disabled: false
  },
  modality_id: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality_id',
    required: true,
    message: 'Seleccionar modalidad de atención',
    disabled: false
  },
  economicsector_id: {
    type: 'iSelectWrite',
    label: 'Sector económico',
    name: 'economicsector_id',
    required: true,
    message: 'Seleccionar el sector económico',
    disabled: false
  },
  comercialactivity_id: {
    type: 'iSelectWrite',
    label: 'Actividad comercial',
    name: 'comercialactivity_id',
    required: true,
    message: 'Seleccionar la actividad comercial',
    disabled: false
  },
  city_id: {
    type: 'iSelectWrite',
    label: 'Región del negocio',
    name: 'city_id',
    required: true,
    message: 'Seleccionar departamento',
    disabled: false
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'Provincia del Negocio',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'Distrito del Negocio',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: false
  },
  ruc: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'ruc',
    required: false,
    message: 'Escribir RUC',
    disabled: false,
    max: 11
  },
  address: {
    type: 'iText',
    label: 'Direccion del Negocio',
    name: 'address',
    required: false,
    message: 'Escribir la direccion del Negocio',
    disabled: false
  },
};

const asesoria = {
  component_id: {
    type: 'iSelectWrite',
    label: 'Componente',
    name: 'component_id',
    required: true,
    message: 'Seleccionar un componente',
    disabled: false
  },
  theme_id: {
    type: 'iSelectWrite',
    label: 'Tema del componente',
    name: 'theme_id',
    required: true,
    message: 'Seleccionar un tema del componente',
    disabled: false
  },
  modality_id: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality_id',
    required: true,
    message: 'Seleccionar modalidad',
    disabled: false
  },
  ruc: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'ruc',
    required: false,
    message: 'Escribir número de RUC',
    disabled: false,
    max: 11,
    min: 11
  },
  city_id: {
    type: 'iSelectWrite',
    label: 'Región del negocio',
    name: 'city_id',
    required: true,
    message: 'Seleccionar departamento',
    disabled: false
  },
  province_id: {
    type: 'iSelectWrite',
    label: 'Provincia del Negocio',
    name: 'province_id',
    required: true,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district_id: {
    type: 'iSelectWrite',
    label: 'Distrito del Negocio',
    name: 'district_id',
    required: true,
    message: 'Seleccionar distrito',
    disabled: false
  },
  observations: {
    type: 'iTextarea',
    label: 'Nro de Reserva / Observaciones',
    name: 'observations',
    required: false,
    message: 'Seleccionar tipo de documento',
    disabled: false
  }
};

export {
  fields, acto, final, ructen, asesoria
}