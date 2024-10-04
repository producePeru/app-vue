const fields = {
  accion: {
    type: 'iText',
    label: 'Nombre de la capacitación',
    name: 'accion',
    required: true,
    message: 'Escribir la acción',
    disabled: true,
    max: 100,
    visible: true
  },
  date: {
    type: 'iDate',
    label: 'Fecha',
    name: 'date',
    required: true,
    message: 'Seleccionar fecha',
    disabled: false
  },
  modality: {
    type: 'iSelect',
    label: 'Modalidad',
    name: 'modality',
    required: true,
    message: 'Seleccionar una opción',
    disabled: true
  },
  address: {
    type: 'iText',
    label: 'Lugar',
    name: 'address',
    required: false,
    message: 'Escribir la acción',
    disabled: true,
    max: 100,
    visible: false
  },
  participants: {
    type: 'iNumber',
    label: 'Número de participantes',
    name: 'participants',
    required: false,
    message: 'Escribir la acción',
    disabled: true
  },
  files: {
    type: 'iFile',
    label: 'Archivos (máximo 3 archivos)',
    name: 'files',
    required: false,
    message: 'Subir archivos',
    disabled: true
  },
  details: {
    type: 'iTextarea',
    label: 'Descripción',
    name: 'details',
    required: false,
    message: 'Escribir la acción',
    disabled: true,
    max: 240,
    rows: 3
  }
}

export default fields;