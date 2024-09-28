const fields = {


  accion: {
    type: 'iText',
    label: 'Acción',
    name: 'accion',
    required: true,
    message: 'Escribir la acción',
    disabled: true,
    max: 100
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
  adress: {
    type: 'iText',
    label: 'Lugar',
    name: 'adress',
    required: true,
    message: 'Escribir la acción',
    disabled: true,
    max: 100
  },
  participants: {
    type: 'iText',
    label: 'Número de participantes',
    name: 'participants',
    required: true,
    message: 'Escribir la acción',
    disabled: true
  },
  files: {
    type: 'iFile',
    label: 'Lugar',
    name: 'files',
    required: true,
    message: 'Subir archvivos',
    disabled: true
  },









}

export default fields;