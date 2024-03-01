const fields = {
  code_sid_sunarp: {
    type: 'iText',
    label: 'Código SID sunarp',
    name: 'code_sid_sunarp',
    required: true,
    message: 'Escribir apellido',
    disabled: false
  },
  economy_sector: {
    type: 'iSelect',
    label: 'Sector económico',
    name: 'economy_sector',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: false
  },
  category: {
    type: 'iSelectWrite',
    label: 'Actividad comercial',
    name: 'category',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: false
  },
  department: {
    type: 'iSelectWrite',
    label: 'Departamento',
    name: 'department',
    required: true,
    message: 'Seleccionar departamento',
    disabled: false
  },
  province: {
    type: 'iSelectWrite',
    label: 'Provincia',
    name: 'province',
    required: true,
    message: 'Seleccionar provincia',
    disabled: false
  },
  district: {
    type: 'iSelectWrite',
    label: 'Distrito',
    name: 'district',
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
};

const acto = {
  social_reason: {
    type: 'iText',
    label: 'Nombre empresa',
    name: 'social_reason',
    required: true,
    message: 'Escribir apellido',
    disabled: false
  },
  type_regimen: {
    type: 'iSelect',
    label: 'Tipo de régimen societario',
    name: 'type_regimen',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: false
  },
  num_notary: {
    type: 'iText',
    label: 'Número de solicitud de envio a Notaría',
    name: 'num_notary',
    required: false,
    message: 'Seleccionar departamento',
    disabled: false
  },
  id_notary: {
    type: 'iSelect',
    label: 'Notaría',
    name: 'id_notary',
    required: false,
    message: 'Seleccionar notaría',
    disabled: false
  },
  modality: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality',
    required: false,
    message: 'Seleccionar modalidad',
    disabled: false
  }
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
  details: {
    type: 'iText',
    label: 'Detalle del trámite',
    name: 'details',
    required: true,
    message: 'Escribir número de RUC',
    disabled: false
  },
  modality: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality',
    required: false,
    message: 'Seleccionar modalidad',
    disabled: false
  },
  commercial: {
    type: 'iSelect',
    label: 'Actividad comercial',
    name: 'commercial',
    required: false,
    message: 'Seleccionar modalidad',
    disabled: false
  },
  economic_sector: {
    type: 'iSelect',
    label: 'Sector económico',
    name: 'economic_sector',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: false
  },
};

const asesoria = {
  component: {
    type: 'iSelect',
    label: 'Componente',
    name: 'component',
    required: false,
    message: 'Seleccionar modalidad',
    disabled: false
  },
  tema_compoment: {
    type: 'iSelect',
    label: 'Tema del componente',
    name: 'tema_compoment',
    required: false,
    message: 'Seleccionar modalidad',
    disabled: false
  },
  description: {
    type: 'iTextarea',
    label: 'Sector económico',
    name: 'description',
    required: true,
    message: 'Seleccionar tipo de documento',
    disabled: false
  },
};

export {
  fields, acto, final, ructen, asesoria
}