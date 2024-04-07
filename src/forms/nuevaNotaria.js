
const fields = {
  city_id: {
    type: 'iSelect',
    label: 'Departamento',
    name: 'city_id',
    required: true,
    message: 'Seleccionar un tipo',
  },
  province_id: {
    type: 'iSelect',
    label: 'Provincia',
    name: 'province_id',
    required: false,
    message: 'Seleccionar un tipo',
  },
  district_id: {
    type: 'iSelect',
    label: 'Distrito',
    name: 'district_id',
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
  name: {
    type: 'iText',
    label: 'Nombre de la notaría',
    name: 'name',
    required: true,
    message: 'Ingresa el nombre de la notaría'
  },
  istestimonio: {
    type: 'checked',
    label: 'Incluye testimonio',
    name: 'istestimonio',
    required: true,
    message: 'Escribe un monto'
  },
  price: {
    type: 'iQuillEditor',
    label: 'Gastos notariales',
    name: 'price',
    required: true,
    message: 'Escribe la tarifa'
  },
  conditions: {
    type: 'iQuillEditor',
    label: 'Condiciones',
    name: 'conditions',
    required: true,
    message: 'Escribe la tarifa'
  },
  sociointerveniente: {
    type: 'iQuillEditor',
    label: 'Socio o interviniente',
    name: 'sociointerveniente',
    required: true,
    message: 'Escribe la tarifa'
  },
  biometrico: {
    type: 'iQuillEditor',
    label: 'Biométrico',
    name: 'biometrico',
    required: true,
    message: 'Escribir datos del biometrico'
  },
  infocontacto: {
    type: 'iQuillEditor',
    label: 'Datos del contacto',
    name: 'infocontacto',
    required: true,
    message: 'Escribe la tarifa'
  }
}

export default fields;