
const fields = {
  title: {
    type: 'iText',
    label: 'Título del taller',
    name: 'title',
    required: true,
    message: 'Escribe el título para el taller'
  },
  id_exponent: {
    type: 'iSelect',
    label: 'Seleccinar expositor',
    name: 'id_exponent',
    required: true,
    message: 'Seleccionar un expositor',
  },
  date_workshop: {
    type: 'iDate',
    label: 'Fecha del taller',
    name: 'date_workshop',
    required: false,
    message: 'Seleccionar la fecha del taller'
  },
  intervention: {
    type: 'iSelect',
    label: 'Seleccinar tipo de intervención',
    name: 'intervention',
    required: true,
    message: 'Seleccionar un tipo',
  }
}

export default fields;