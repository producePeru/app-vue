
const fields = {
  entity: {
    type: 'iSelect',
    label: 'Entidad',
    name: 'entity',
    required: true,
    message: 'Seleccionar Oficina',
  },
  isMeta: {
    type: 'iCheck',
    label: '',
    name: 'isMeta',
    required: false,
    // message: 'Estoy de acuerdo'
  },
  unitMeasurement: {
    type: 'iText',
    label: 'Unidad de medida',
    name: 'unitMeasurement',
    required: false,
    message: 'Unidad de medida'
  },
  metaNumb: {
    type: 'iNumber',
    label: 'Meta numérica',
    name: 'metaNumb',
    required: false,
    message: 'Escribe Meta numerica'
  },
  description: {
    type: 'iTextArea',
    label: 'Compromiso',
    name: 'description',
    required: true,
    message: 'Escribe descripción del compromiso'
  },


  
  
  
}

export default fields;