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
  type_regimen: {
    type: 'iSelect',
    label: 'Tipo de régimen societario',
    name: 'type_regimen',
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
  modality: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality',
    required: true,
    message: 'Seleccionar modalidad',
    disabled: false
  }
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
  detail_procedure: {
    type: 'iSelect',
    label: 'Detalle del trámite',
    name: 'detail_procedure',
    required: true,
    message: 'Escribir número de RUC',
    disabled: false
  },
  modality: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality',
    required: true,
    message: 'Seleccionar modalidad',
    disabled: false
  },
  economy_sector: {
    type: 'iSelect',
    label: 'Sector económico',
    name: 'economy_sector',
    required: true,
    message: 'Seleccionar el sector económico',
    disabled: false
  },
  category: {
    type: 'iSelectWrite',
    label: 'Actividad comercial',
    name: 'category',
    required: true,
    message: 'Seleccionar la actividad comercial',
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
};

const asesoria = {
  component: {
    type: 'iSelect',
    label: 'Componente',
    name: 'component',
    required: true,
    message: 'Seleccionar un componente',
    disabled: false
  },
  tema_compoment: {
    type: 'iSelectWrite',
    label: 'Tema del componente',
    name: 'tema_compoment',
    required: true,
    message: 'Seleccionar un tema del componente',
    disabled: false
  },
  modality: {
    type: 'iSelect',
    label: 'Modalidad de atención',
    name: 'modality',
    required: true,
    message: 'Seleccionar modalidad',
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
  description: {
    type: 'iTextarea',
    label: 'Observaciones',
    name: 'description',
    required: false,
    message: 'Seleccionar tipo de documento',
    disabled: false
  }
};

export {
  fields, acto, final, ructen, asesoria
}