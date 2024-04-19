
const fields = {

  pdfDocument: {
    type: 'iUpload',
    label: '',
    name: 'pdfDocument',
    required: false,
    message: ''
  },
  file_id: {
    type: 'iSelect',
    label: 'Seleccionar una carpeta',
    name: 'file_id',
    required: true,
    message: 'Debes seleccionar una carpeta'
  }
}

export default fields;