
const fields = {
  title: {
    type: 'iText',
    label: 'Título del taller',
    name: 'title',
    required: true,
    message: 'Escribe el título para el taller'
  },
  exponentId: {
    type: 'iSelect',
    label: 'Seleccinar expositor',
    name: 'exponentId',
    required: true,
    message: 'Seleccionar un expositor',
  },
  workshopDate: {
    type: 'iDate',
    label: 'Fecha del taller',
    name: 'workshopDate',
    required: false,
    message: 'Seleccionar la fecha del taller'
  },
  typeIntervention: {
    type: 'iSelect',
    label: 'Seleccinar tipo de intervención',
    name: 'typeIntervention',
    required: true,
    message: 'Seleccionar un tipo',
  },
  slug: {
    type: 'iText',
    label: 'Slug',
    name: 'slug',
    required: true,
    message: 'Escribe el título para el taller'
  },
  link: {
    type: 'iText',
    label: 'Link del taller',
    name: 'link',
    required: false,
    message: 'Escribe el título para el taller'
  },
}

export default fields;