
const fields = {
  office: {
    type: 'iSelect',
    label: 'Oficina',
    name: 'office',
    required: true,
    message: 'Seleccionar Oficina',
  },
  nameInstitution: {
    type: 'iText',
    label: 'Nombre Institución',
    name: 'nameInstitution',
    required: true,
    message: 'Escribe cuenta de usuario'
  },
  component: {
    type: 'iSelect',
    label: 'Componente',
    name: 'component',
    required: true,
    message: 'Seleccionar Componente',
  },
  responsible: {
    type: 'iText',
    label: 'Responsable del PNTE',
    name: 'responsible',
    required: true,
    message: 'Escribe nombre del responsabable'
  },
  representative: {
    type: 'iText',
    label: 'Representante',
    name: 'representative',
    required: true,
    message: 'Escribe nombre del representante'
  },
  representativeEmail: {
    type: 'iText',
    label: 'Correo Electrónico',
    name: 'representativeEmail',
    required: true,
    message: 'Escribe el correo electrónico',
    email: 'email',
  },
  addendum: {
    type: 'iSwitch',
    label: '¿Es adenda?',
    name: 'addendum',
    required: true,
    message: 'Adenda'
  },
  proponent: {
    type: 'iText',
    label: 'Proponente',
    name: 'proponent',
    required: true,
    message: 'Nombre del proponente'
  },
  nameAgreement: {
    type: 'iText',
    label: 'Nombre del convenio',
    name: 'nameAgreement',
    required: true,
    message: 'Nombre del convenio'
  },
  focalPoint: {
    type: 'iText',
    label: 'Punto Focal',
    name: 'focalPoint',
    required: true,
    message: 'Nombre del punto focal'
  },
  phoneContact: {
    type: 'iText',
    label: 'Número Telefónico del contacto',
    name: 'phoneContact',
    required: true,
    message: 'Número de contacto y 9 max',
    max: 9
  },
  pdfDocument: {
    type: 'iUpload',
    label: 'Archivo de convenio / Adenda (PDF)',
    name: 'pdfDocument',
    required: true,
    message: 'Archivo de convenio / Adenda (PDF)'
  },

  dateIssue: {
    type: 'iDate',
    label: 'Fecha de Emisión',
    name: 'dateIssue',
    required: true,
    message: 'Seleccionar fecha'
  },
  effectiveDate: {
    type: 'iDate',
    label: 'Fecha de Inicio de Vigencia',
    name: 'effectiveDate',
    required: true,
    message: 'Seleccionar fecha'
  },
  dueDate: {
    type: 'iDate',
    label: 'Fecha de vencimiento',
    name: 'dueDate',
    required: true,
    message: 'Seleccionar fecha'
  },
  
  
  
}

export default fields;