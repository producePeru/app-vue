const fields = {
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
  address: {
    type: 'iText',
    label: 'Dirección del negocio',
    name: 'address',
    required: true,
    message: 'Digitar la dirección del negocio',
    disabled: false
  },
  modality_id: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality_id',
    required: true,
    message: 'Seleccionar la modalidad',
    disabled: false
  },
  nameMype: {
    type: 'iText',
    label: 'Nombre empresa',
    name: 'nameMype',
    required: true,
    message: 'Escribir nombre de la empresa',
    disabled: false
  },
  ruc: {
    type: 'iNumber',
    label: 'Número de RUC',
    name: 'ruc',
    required: false,
    message: 'Escribir número de RUC',
    disabled: false,
    max: 11,
    min: 11,
    // placeholder: 'EN TRÁMITE completar con CEROS',
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
  notary_id: {
    type: 'iSelect',
    label: 'Notaría',
    name: 'notary_id',
    required: true,
    message: 'Seleccionar una notaría',
    disabled: false
  },
  numbernotary: {
    type: 'iText',
    label: 'Número solicitud constancia',
    name: 'numbernotary',
    required: true,
    message: 'Escribir número de solicitud de constancia',
    disabled: false
  },
  dateReception: {
    type: 'iDate',
    label: 'Fecha de Recepcion todo OK',
    name: 'dateReception',
    required: false,
    message: 'Escribir el código SID sunarp',
    disabled: false
  },
  dateTramite: {
    type: 'iDate',
    label: 'Fecha tramite SID SUNARP o SUNAT',
    name: 'dateTramite',
    required: false,
    message: 'Escribir el código SID sunarp',
    disabled: false
  },
  dni: {
    type: 'iTextLol',
    label: 'Núm. documento Identidad',
    name: 'dni',
    required: true,
    message: 'Escribir número de documento',
    disabled: false,
    placeholder: 'Número documento'
  },

  isbic: {
    type: 'iSelect',
    label: '¿Es una sociedad BIC?',
    name: 'isbic',
    required: false,
    message: 'Buscar BIC',
    disabled: false
  },
  typecapital_id: {
    type: 'iSelect',
    label: 'Tipo de aporte de capital',
    name: 'typecapital_id',
    required: false,
    message: 'Seleccionar BIC',
    disabled: false
  },
  montocapital: {
    type: 'iMoney',
    label: 'Monto de capital social',
    name: 'montocapital',
    required: false,
    message: 'Escribir el Monto de capital social',
    disabled: false
  },
  
};

const acto = {};
const final = {
  
};

const ructen = {
  dni: {
    type: 'iText',
    label: 'Número de documento de identidad',
    name: 'dni',
    required: true,
    message: 'Escribir número de documento',
    disabled: false,
    placeholder: 'Número documento'
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
  ruc: {
    type: 'iText',
    label: 'Número de RUC',
    name: 'ruc',
    required: false,
    message: 'Escribir RUC',
    disabled: false,
    max: 11
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
  address: {
    type: 'iText',
    label: 'Direccion del Negocio',
    name: 'address',
    required: true,
    message: 'Escribir la direccion del Negocio',
    disabled: false
  },
};

const asesoria = {
  dni: {
    type: 'iText',
    label: 'Número de documento',
    name: 'dni',
    required: true,
    message: 'Escribir número de documento',
    disabled: false,
    placeholder: 'Número documento'
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
    placeholder: 'Número de RUC (Opcional)',
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