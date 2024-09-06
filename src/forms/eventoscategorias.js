
const fields = {
  name: {
    type: 'iText',
    label: 'Nombre de la categoría',
    name: 'name',
    required: true,
    message: '',
    disabled: false
  },

  color: {
    type: 'iSelect',
    label: 'Seleccionar color',	
    name: 'color',
    required: false,
    message: '',
    disabled: false
  },

}

export default fields;