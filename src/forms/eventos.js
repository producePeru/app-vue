
const fields = {
  nameEvent: {
    type: 'iText',
    label: 'Nombre del evento',
    name: 'nameEvent',
    required: true,
    message: '',
    disabled: false
  },

  startDate: {
    type: 'iDate',
    label: 'Fecha de Inicio',
    name: 'startDate',
    required: true,
    message: '',
    disabled: false
  },

  endDate: {
    type: 'iDate',
    label: 'Fecha de Fin',
    name: 'endDate',
    required: true,
    message: '',
    disabled: false
  },

  description: {
    type: 'iTextarea',
    label: 'Descripción',
    name: 'description',
    required: false,
    message: 'Escribe una descripción',
    disabled: false
  },

  allDay: {
    type: 'iCheckbox',
    label: '',
    name: 'allDay',
    required: false,
    message: 'Escribe una descripción',
    disabled: false
  },

  linkVideo: {
    type: 'iLinkVideo',
    label: '',
    name: 'linkVideo',
    required: false,
    message: 'Escribe una descripción',
    disabled: false
  },

  category_id: {
    type: 'iSelect',
    label: 'Categoría',	
    name: 'category_id',
    required: false,
    message: '',
    disabled: false
  },

  repetir: {
    type: 'iSelect',
    label: 'Repetir',	
    name: 'repeat',
    required: false,
    message: '',
    disabled: false
  },

  color: {
    type: 'iColor',
    label: '',	
    name: 'color',
    required: false,
    message: '',
    disabled: false
  },

}

export default fields;