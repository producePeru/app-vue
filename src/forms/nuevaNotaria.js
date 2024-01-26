
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
    required: false,
    message: 'Seleccionar un tipo',
  },
  district: {
    type: 'iSelect',
    label: 'Distrito',
    name: 'district',
    required: false,
    message: 'Seleccionar un tipo',
  },
  address: {
    type: 'iText',
    label: 'Dirección',
    name: 'address',
    required: false,
    message: 'Escribe la dirección'
  },
  normal_rate: {
    type: 'iNumber',
    label: 'Tarífa',
    name: 'normal_rate',
    required: true,
    message: 'Escribe la tarifa'
  },
  social_rate: {
    type: 'iNumber',
    label: 'Tarifa social',
    name: 'social_rate',
    required: true,
    message: 'Escribe un monto'
  }
}

export default fields;