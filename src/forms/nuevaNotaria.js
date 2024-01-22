
const fields = {
  name: {
    type: 'iText',
    label: 'Nombre notaría',
    name: 'name',
    required: true,
    message: 'Ingresa el nombre de la notaría'
  },
  department: {
    type: 'iSelect',
    label: 'Departamento',
    name: 'department',
    required: true,
    message: 'Seleccionar un tipo',
  },
  province: {
    type: 'iSelect',
    label: 'Provincia',
    name: 'province',
    required: true,
    message: 'Seleccionar un tipo',
  },
  district: {
    type: 'iSelect',
    label: 'Distrito',
    name: 'district',
    required: true,
    message: 'Seleccionar un tipo',
  },
  address: {
    type: 'iText',
    label: 'Dirección',
    name: 'address',
    required: true,
    message: 'Escribe la dirección'
  },
  fee: {
    type: 'iText',
    label: 'Tarífa',
    name: 'fee',
    required: true,
    message: 'Escribe la tarifa'
  },
  saving: {
    type: 'iText',
    label: 'Tarifa social',
    name: 'saving',
    required: true,
    message: 'Escribe un monto'
  }
}

export default fields;