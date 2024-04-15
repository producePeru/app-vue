const categorias = [
  {
    id: 1,
    nombrecategoria: 'Alimentos y Bebidas',
    imagen: '../../assets/img/icons/alimentos.png',
    class: 'comida'
  },
  {
    id: 2,
    nombrecategoria: 'Mascotas',
    imagen: '../../assets/img/icons/mascota.png',
    class: 'mascota'
  },
  {
    id: 3,
    nombrecategoria: 'Moda y Belleza',
    imagen: '../../assets/img/icons/maquilladora.png',
    class: 'moda'
  },
  {
    id: 4,
    nombrecategoria: 'Deco y Hogar',
    imagen: '../../assets/img/icons/hogar.png',
    class: 'hogar'
  },
  // {
  //   id: 5,
  //   nombrecategoria: 'Servicios y otros',
  //   imagen: '../../assets/img/icons/servicio.png',
  //   class: 'servicio'
  // },
  {
    id: 6,
    nombrecategoria: 'Infantil',
    imagen: '../../assets/img/icons/bebe.png',
    class: 'infantil'
  },
];



const marcas = [
  {
    id: 1,
    nombre: 'Gusto Raymi',
    imagen: 'https://lh3.google.com/u/0/d/1OjziPdQh4G0UObQCZ7nfImR8Gb2EAecS=w1920-h945-iv1',
    linkpagina: 'https://comsesur.com',
    descripcion: 'Raíces conscientes, productos sostenibles y exquisitos chocolates, café y  más',
    categoria_id: 1,
  },
  {
    id: 2,
    nombre: 'Exótica Superfoods',
    imagen: 'https://lh3.google.com/u/0/d/16T9nRxmpgjZFtjdbQAmEZ13EFhoNRVJA=w1919-h944-iv1',
    linkpagina: 'https://exoticasuperfoods.com/exotica-superfoods/shop/ ',
    descripcion: 'Natural y orgánico, superalimentos andinos y amazónicos',
    categoria_id: 1,
  },
  {
    id: 3,
    nombre: 'Can & Cat',
    imagen: 'https://lh3.google.com/u/0/d/1744ocDnnoJV-5389rgpj8bNOOAP1TfHu=w1919-h944-iv5',
    linkpagina: 'https://canicat.pe/',
    descripcion: 'Estilo y bienestar para tu mascota',
    categoria_id: 2,
  },
  {
    id: 4,
    nombre: 'Vestidos Nancy Alvarado',
    imagen: 'https://lh3.google.com/u/0/d/13dmAabvFRocZ1-vwRC2hQrMwnWia2izl=w1919-h944-iv1',
    linkpagina: 'https://www.vestidosnancyalvarado.com/',
    descripcion: 'Moda femenina: elegancia y estilo',
    categoria_id: 3,
  },
  {
    id: 5,
    nombre: 'Warayo',
    imagen: 'https://drive.google.com/file/d/1_PNkv4jMyXHK9oIhWdi69eiRJJHhwjPh/view?usp=sharing',
    linkpagina: 'www.terraamazonica.online',
    descripcion: 'Falta',
    categoria_id: 1,
  },
  {
    id: 6,
    nombre: 'Kera Super Foods',
    imagen: 'https://lh3.google.com/u/0/d/1fdSVtcrr5U1fapgaITSriupwy5zfKHbM=w1919-h944-iv1',
    linkpagina: 'none',
    descripcion: 'Vida mejor, superalimentos nativos',
    categoria_id: 1,
  },
  {
    id: 7,
    nombre: 'Misha Rastrera',
    imagen: '	https://lh3.google.com/u/0/d/1MvsA4nDhWdfQC1_5UCvArILVJHp04OcO=w1919-h944-iv1',
    linkpagina: 'https://www.misharastrera.com/',
    descripcion: 'Delicias Sostenibles: Andino - Amazónicas',
    categoria_id: 1,
  },
  {
    id: 8,
    nombre: 'Yurol',
    imagen: 'https://lh3.google.com/u/0/d/1W84p7zaZNInoHVW6c6agIipHzYE81ler=w1919-h944-iv1',
    linkpagina: 'https://yurolnaturalmarket.com/shop/',
    descripcion: 'Alimentación consciente con miel natural',
    categoria_id: 1,
  },
  {
    id: 9,
    nombre: 'Lencería Perricholi ',
    imagen: 'https://ecommerce-sami3.s3.amazonaws.com/sami3-prod/lenceriaperricholi.samishop.pe/images/logos/LOGO-HOME.png?v=5BN07dAE58U96',
    linkpagina: 'https://www.lenceriaperricholi.com/',
    descripcion: 'Empoderamiento femenino, lencería exclusiva',
    categoria_id: 3,
  },
  {
    id: 10,
    nombre: 'Perezoso',
    imagen: 'https://lh3.google.com/u/0/d/1Q4pfJbFmzhXDvm82pcmh3MKvFYOh6KwG=w1919-h944-iv2',
    linkpagina: 'https://perezoso.pe/',
    descripcion: 'Comodidad garantizada: colchones Perezoso',
    categoria_id: 4,
  },
  {
    id: 11,
    nombre: 'Grillcorp',
    imagen: 'https://lh3.google.com/u/0/d/1A7FQTp3QdBQCzT6Z8DiUwFIztAs0ZrKS=w1920-h945-iv1',
    linkpagina: 'https://www.grillcorp.com.pe/',
    descripcion: 'Calidad en cocción: parrillas, cilindros y más',
    categoria_id: 4,
  },
  {
    id: 12,
    nombre: 'Inga Pijamas',
    imagen: 'https://lh3.google.com/u/0/d/1nLe2o8Be2bcHwPuwg7oPpmOUSfq98rZD=w1919-h944-iv1',
    linkpagina: 'https://www.ingapijamas.com.pe/',
    descripcion: 'Comodidad y calidad en pijamas',
    categoria_id: 3,
  },
  {
    id: 13,
    nombre: 'Tablitas', //**** */
    imagen: 'https://lh3.google.com/u/0/d/1zzgZIWvF2qn9h61h0nr5oJe497CaWCm4=w1919-h944-iv2',
    linkpagina: 'none',
    descripcion: 'Muebles y más: transforma tu espacio',
    categoria_id: 4,
  },
  {
    id: 14,
    nombre: 'Arlin Textil',
    imagen: 'https://arlintextil.com/wp-content/uploads/2022/12/LOGO-ARLIN-SIN-FONDO-e1672377316764.png',
    linkpagina: 'https://arlintextil.com/',
    descripcion: 'Descansa con comodidad: Ropa de Cama y textiles afines',
    categoria_id: 4,
  },
  {
    id: 15,
    nombre: 'Finka Kivinaki',
    imagen: '',
    linkpagina: 'https://www.finkakivinaki.com/',
    descripcion: 'Comprar en nuestra tienda es 100% segura y todos los cafés están frescos',
    categoria_id: '1',
  },
  {
    id: 16,
    nombre: 'Linea Decor Mueble',
    imagen: 'https://lh3.google.com/u/0/d/1gtkx0TxHSp3MeYMK_fHfBD9OnjLQn17O=w1920-h945-iv1',
    linkpagina: 'https://www.lineadecormueble.com/',
    descripcion: 'Diseño y calidad en muebles',
    categoria_id: 4,
  },
  {
    id: 17,
    nombre: 'Only Cotton',
    imagen: 'https://lh3.google.com/u/0/d/1SaJnFSyOXzRtlc_nie0yeggvA6IkoIwJ=w1920-h945-iv1',
    linkpagina: 'https://onlycotton.samishop.com/',
    descripcion: 'Viste con amor y calidad: prendas 100% algodón premium',
    categoria_id: 3,
  },
  {
    id: 18,
    nombre: 'Murats',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1SOs554IOLQZkXeFhydrDGPLAmwySvkqo=w1920-h969-iv1',
    linkpagina: 'https://shopstar.pe/murats-bag',
    descripcion: 'Accesorios de cuero para mujeres',
    categoria_id: 3,
  },
  {
    id: 19,
    nombre: 'Per Ingredients By Vita &Co',
    imagen: 'https://vitaycoperu.com/wp-content/uploads/2021/08/Diseno-sin-titulo-8.png',
    linkpagina: 'http://vitaycoperu.com',
    descripcion: 'snacks y alimentos saludables',
    categoria_id: 1,
  },
  {
    id: 20,
    nombre: 'Wait Shop',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1Yl-feo3mTPxpJ8sI6V3cK3P_Wi3iQ9GT=w1920-h969-iv1',
    linkpagina: 'https://waitshop.pe/',
    descripcion: 'moda para damas',
    categoria_id: 3,
  },
  {
    id: 21,
    nombre: 'Isague',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1C1sXT8NB3IeiSxsSBfFS7JfkiQSTQHeX=w1920-h969-iv1',
    linkpagina: 'https://isague.com',
    descripcion: 'moda para hombres',
    categoria_id: 3,
  },
  {
    id: 22,
    nombre: 'Alimentos Molicusco',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1Fj_ZWG07xpOzCOfabKc3jdJNvQJ6m386=w1920-h969-iv1',
    linkpagina: 'https://www.molicusco.com/',
    descripcion: 'superalimentos de la región Cusco',
    categoria_id: 1,
  },
  {
    id: 23,
    nombre: 'Magnolia Essential Care',
    imagen: 'https://media.licdn.com/dms/image/D4E16AQFWJ_zx8Af5YA/profile-displaybackgroundimage-shrink_200_800/0/1666070493533?e=2147483647&v=beta&t=rtc-QKDxVDHLcZVuyA3z978A1JTynD6f5-egdDATFd4',
    linkpagina: 'https://magnoliaec.tiendada.com/',
    descripcion: 'productos artesanales para el aseo y cuidado personal',
    categoria_id: 3,
  },
  {
    id: 24,
    nombre: 'Annie Love',
    imagen: 'https://annielovedesign.com/cdn/shop/files/Captura_de_Pantalla_2023-01-09_a_la_s_21.29.38.png?v=1673317810&width=240',
    linkpagina: 'https://annielovedesign.com/',
    descripcion: 'joyería de alta calidad',
    categoria_id: 3,
  },
  {
    id: 25,
    nombre: 'Magdalena Shoes',
    imagen: 'https://www.magdalenashoes.com.pe/cdn/shop/files/Sin_titulo_6_x_2_cm_1_230x.png?v=1702598101',
    linkpagina: 'https://www.magdalenashoes.com.pe/',
    descripcion: 'calzado para damas',
    categoria_id: 3,
  },
  {
    id: 26,
    nombre: 'Noe Bernacelli',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/12MIFHq9uuZ1nD1k0odzanee2GRgYpuxg=w1920-h969-iv1',
    linkpagina: 'https://noebernacelli.com/',
    descripcion: 'ropa de alta costura para damas',
    categoria_id: 3,
  },
  {
    id: 27,
    nombre: 'Sotelo',
    imagen: 'https://static.wixstatic.com/media/d39168_52612a98c34549339fcc03a5e50ef5b5~mv2.jpg/v1/fill/w_2500,h_1382,al_c/d39168_52612a98c34549339fcc03a5e50ef5b5~mv2.jpg',
    linkpagina: 'https://www.bodegasotelo.com/',
    descripcion: 'pisco de Ica con multiples premios',
    categoria_id: 1,
  },
  {
    id: 28,
    nombre: 'Val&Pri Peru',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1CX0Z-gs910jAdt8KEUmeLZEJw-tevg_w=w1920-h969-iv1',
    linkpagina: 'https://valandpri.pe',
    descripcion: 'deliciosos alimentos sin gluten',
    categoria_id: 1,
  },
  {
    id: 29,
    nombre: 'Shu',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/18G0RmvYb6TAT5g6SeEr6fCkl0Yk056s-=w1920-h969-iv1',
    linkpagina: 'https://shuropamasculina.my.canva.site/catalogo',
    descripcion: 'moda masculina de alta calidad',
    categoria_id: 3,
  },
  {
    id: 30,
    nombre: 'Apisa Kids',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1a6iq1IA8paJPh3CnHzvMJqmtY0nG6Mp1=w1920-h969-iv1',
    linkpagina: 'none',
    descripcion: 'moda infantil',
    categoria_id: 6,
  },
  {
    id: 31,
    nombre: 'Chocolate Sojhadi',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1P2w8fxMkQ-wuXNTKttlNjzeJ0vqom0_G=w1920-h969-iv1',
    linkpagina: 'none',
    descripcion: 'cacao de la región San Martín',
    categoria_id: 1,
  },
  {
    id: 32,
    nombre: 'Hidrobee',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/16IQZ2u8N9FdR-wBT4NFQ7vExOqVffBw_=w1920-h969-iv1',
    linkpagina: 'none',
    descripcion: 'deliciosos licores a base de miel',
    categoria_id: 1,
  },
  {
    id: 33,
    nombre: "D'marko Jewelry",
    imagen: 'https://dmarkojewelry.com/wp-content/uploads/2021/03/logo1.png',
    linkpagina: 'https://dmarkojewelry.com/',
    descripcion: 'joyeria de oro',
    categoria_id: 3,
  },
  {

    id: 34,
    nombre: 'Yanni',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1iEDR_AotQClN1o7T3tfQ7YNXH0ArN_Rr=w1920-h969-iv1',
    linkpagina: 'https://yannishoes.com/',
    descripcion: 'calzado para dama',
    categoria_id: 3,
  },
  {
    id: 35,
    nombre: 'Indra',
    imagen: 'https://lh3.google.com/u/0/d/1-uFR7ey1CoXAyZUJYPBoQti_HzQB9vuP=w1920-h931-iv1',
    linkpagina: 'https://indra.com.pe/',
    descripcion: 'ROPA DEPORTIVA DE MUJER',
    categoria_id: 3,
  },
  {
    id: 36,
    nombre: "Aron puro cuero",
    imagen: 'https://aroncuero.com/cdn/shop/files/logo-web.png?v=1711392668&width=300',
    linkpagina: 'https://aroncuero.com/',
    descripcion: 'CARTERAS PARA DAMAS',
    categoria_id: 3,
  },
  {
    id: 37,
    nombre: 'Dimar´S',
    imagen: 'https://lh3.google.com/u/0/d/1oOWRSaFwxKxyucZKmrjNxXBD3Y1t5FHA=w1920-h931-iv1',
    linkpagina: 'none',
    descripcion: 'CALZADO DE CUERO PARA HOMBRE',
    categoria_id: 3,
  },
  {
    id: 38,
    nombre: "D'madrid Collection Ll",
    imagen: 'https://lh3.google.com/u/0/d/1scJGQjTCAVgmfSlWtyv4sfYqFIVQ8sIK=w2000-h1290-iv1',
    linkpagina: 'https://www.facebook.com/DMadridCollection?mibextid=ZbWKwL',
    descripcion: 'VESTIDOS PARA DAMAS',
    categoria_id: 3,
  },
  {
    id: 39,
    nombre: 'Emolinka',
    imagen: 'https://lh3.google.com/u/0/d/13iW8NMifF1wNfccrc5jfxLonH_ZPwTbX=w1920-h931-iv1',
    linkpagina: 'https://www.facebook.com/emolinkape/',
    descripcion: 'EMOLIENTE INSTANTÁNEO',
    categoria_id: 1,
  },
  {
    id: 40,
    nombre: 'Florandi',
    imagen: 'https://lh3.google.com/u/0/d/1hPzvwY8hxISDS0iM84FtT2kFugPgWxhr=w2000-h1290-iv1',
    linkpagina: 'https://www.facebook.com/florandi.artetextil/photos',
    descripcion: 'GORROS Y BOLSOS BORDADOS',
    categoria_id: 3,
  },
  {
    id: 41,
    nombre: 'Rousha',
    imagen: 'https://lh3.google.com/u/0/d/1IycW2o7aPx2CktmeTK_41qqmOjSuKHu8=w1920-h931-iv1',
    linkpagina: 'https://www.facebook.com/Rousha.pe/?locale=es_LA',
    descripcion: 'ROPA PARA DAMAS',
    categoria_id: 3,
  },
  {
    id: 42,
    nombre: 'Sumaqllaperu',
    imagen: 'https://lh3.google.com/u/0/d/1JUYUndvjw66UyRMv9q1jQi54cG_GyLXO=w1920-h931-iv1',
    linkpagina: 'https://www.facebook.com/sumaqllaperu',
    descripcion: 'BISUTERIA BORDADA',
    categoria_id: 3,
  },
  {
    id: 43, //**** */
    nombre: 'Shocomell By Pepito Z',
    imagen: 'https://lh3.google.com/u/0/d/1615QLYFXmhBpRsiqqJOn-CvUm--rH8Cl=w1920-h931-iv1',
    // linkpagina: 'https://www.facebook.com/PepitoZKids/?locale=es_LA',
    linkpagina: 'none',
    descripcion: 'ROPA PARA NIÑOS',
    categoria_id: 3,
  },
  {
    id: 44,
    nombre: 'Quinto Closet',
    imagen: 'https://lh3.google.com/u/0/d/1w8fq13O-8xYoDzCq46ipNk02HDbUUnHf=w1920-h931-iv1',
    linkpagina: 'https://quinto-closet.com/',
    descripcion: 'ROPA PARA DAMAS',
    categoria_id: 3,
  },
  {
    id: 45,
    nombre: 'Ensueños',
    imagen: 'https://xn--ensueos-8za.pe/wp-content/uploads/2021/09/isologo-1-2-1024x422.png',
    linkpagina: 'https://xn--ensueos-8za.pe/',
    descripcion: 'PIJAMAS',
    categoria_id: 3,
  },
  {
    id: 46,
    nombre: 'Naturally Divine Amazónia SAC',
    imagen: 'https://naturallydivineperu.com/wp-content/uploads/2020/11/logo-horizontal-mobile-copia.png',
    linkpagina: 'https://naturallydivineperu.com/',
    descripcion: 'ACEITES NATURALES',
    categoria_id: 1,
  },
  {
    id: 47,
    nombre: 'Nyrla Lévano',
    imagen: 'https://lh3.google.com/u/0/d/1rAO-7f20em2VIG4AL5udb-sLF7HMVexs=w1920-h931-iv1',
    linkpagina: 'https://nyrlalevano.com/',
    descripcion: 'PISCOS Y VINOS',
    categoria_id: 1,
  },
  {
    id: 48,
    nombre: 'Batan',
    imagen: 'https://lh3.google.com/u/0/d/1bP1PsclaIJkpxhEH8dyF5HOIENSYutU2=w1920-h931-iv1',
    linkpagina: 'https://sazonadoresbatan.com/',
    descripcion: 'SAZONADORES NATURALES',
    categoria_id: 1,
  },
  {
    id: 49, //***** */
    nombre: 'Illaq Perú',
    imagen: 'https://lh3.google.com/u/0/d/16grrm5uiYhoEAHwq__m61vPXRhLNctAH=w2000-h1290-iv1',
    linkpagina: 'none',
    descripcion: 'JOYERIA FINA',
    categoria_id: 3,
  },
  {
    id: 50,
    nombre: 'Muebles Crisostomo',
    imagen: 'https://lh3.google.com/u/0/d/1UMioH5oYZSUyMkzg_qMGllVAfqZy3LNX=w1920-h931-iv1',
    linkpagina: 'https://www.mueblescrisostomo.com/',
    descripcion: 'MUEBLES Y ESCRITORIOS',
    categoria_id: 4,
  }
]


const productos = [
  {
    marca_id: 43,
    titulo: 'Shocomell By Pepito Z',
    productos: [
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_E_tM1W14KDzNvPzFD12kbFySKn-a7JE6KwFhZJlwZ3CpDoskA-sMiEtt_B_Y4QFwNmU07hLIijQSTgm4sgZ1UCJplc9qR0io0RI8jhu91bpOpyQIXG8CxBEUkFBmZeTEun9OmtSNYrkmC-lrrzWldEJ9yn78_J-Csv6jYTfc6-OzP_CQetu6PEx2Vu5GhMrHnaFnXfs1nDMIiG8CeDZ-1DoK1vw9OqMQ8AHN78UODwsp2ee5_kv5_llH9hwEZbR1SeBGNtBYM5YczCNlgwJqt5xSQkflvPL_hm-efSnBM5Ta-P0FEn-BsM1GL4COIAoOyOakcpBiYlwNmF_Vte2seV8rQmqN2D4in0dpqRWwPpeRcNd6PAJx9Nz-FdWhrHeb-djF1ac_gooVhO0mYgrpgkJZZp3x7cvnW-mLN2rtRpjPPBDbri64I-MCdShJlSpMRH9dwF3TVOybtqITA-ru4dliBQjPRgXcF1jK6sl2ipOAUixKrAMGluVxXZzyaPUtD5xTc_JNAEhtQyZWVih-YXDgnMba95bfi4lr0F-e1aahwL3irAoEzOBveUxpB0TnHryA3N0fJk1GS-e5yDWRFMj37jxtLobOwInZBCo7INDisR6grjqsVFZq-4FmHp6BGqnQxC2eCuOcI9fSgtQ_dQnZTsSaPv4YEpPC78BevUcHRB1dGCtD8AtvwCGLb3muFW3T1iwJIi6ysCm1cgFWjX8F8WnXB324mew4ntve4Ivur1aELeesVKZREXFEVuZqNay7SwW8BmuOfmBbn5sVPHQFcPO_OivoBKUGKMmrPG2WVv2lqqrSZzuXNd5JDVDWOHpJYVpWh41RBPWLR1-YPpulEBeuuvOmBBelxSRDtEol-Kp5n6Y7GvcPm7nWi41hPWY4rrU4LNfhYNJeOF3aYO3wqagchXr77eiDbRT1EyxJ9xMvh0RC5-6lINHzCfUXdE4xuaFd5yC3j4mtaKM3Rm5FhL8qsBqzJoNBysOeh4HKUiL0LWRGvVuF-VX-5M0cRX_5lGK8PY7sCX7ktBeaF2LpsjZmaQf3wJMzmzYrscGfEEY3qHeSPfOEZoeeKK41vIhbz8Hg3tAR1IuCXE1wyLXaTwUW-_JtrLnQji_FHMzH4LMoF1jU9hKmIUHBuu-Udsbay66qah5_0wnMZD9uZwtlhhRNxoqJUSgcRQHKhlXhIY7G-oUySnHFj4OkRciLyRyy-g3zEEmwfSB6hKOjkkDqWly2Xk5WTZaxhk1GryTIRInr7JBjm1DhCjVnQbzzxcnf01nkNPjBfX0h-lpafcCZWB99sgeADNoa_VuoOOr70OByEufIRNt6Y_7fY8jliVPLOU9vgP721jUcJyZCiA61yW9snqVtxytml0a3gZB5ZZb4Af17utbAAYo6CSUt9pP_ufswrqJX8WfKpH-_lm1QFrPS5icW5ZyITCkEI5dtKeRVoEpnULROKULPTKdNX1pa_B5W1ZvAYs8o_1btBHSiySM0qYOiHkfdWQOzm-W3vNf1Y0m6ita6AAAsZRkhmJVPy8AauS55-Yk7hgTUNU4eeEr-b45Fu3W5hTsuqwVhtgLe48A5N0wj10ObR7R_qgJWZ8biBo8Xe3RA=w1920-h912',
        descripcion: 'Descuento del 50%, Camisa lino 100% algodón',
        precioanterior: 's/ 60.00',
        precioactual: 'S/ 30.00',
        link: 'https://wa.link/duzwqw'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_GFxa3DjYgilmq45csbe7aCjugkvD9JSGGKgwSqiHlQ5hjMhTGuMImaF3kdqt3pfaw7T5Ieh_rI94YDOTQ2_a1JyAAAEpDn15rq0cZygp5Ixj0WXuirfNfH8m5NwChxUriDdpsCqP2w7lzDPf8a5VLjcTEwsw0xzSd9w6nf0MDJH2qaZh5JAZBo8or_b1bnMnjb3TH2AZFaEFo1dI2lx8AD4a7j0KnzBrjr0FfM0qOmOSdYHXgiJ8h3ewx6Xn2gurTKjnm9OwDMYNS3cRBS9mtasGveLFt1fr_yQYYQxW05IgE2ZSozucnPzJcbYlrMO2zREhZdnoOAA85U__KAWC6glpyT0e99RHjv067AVKHUWX7-09A38DEvgj4IexK5LhA4TUcqyxyWKGsCvdAbtLVjbe1czCqYIfXIJ_3nQes57Ct1Yq9XPQEgJXvMA15Dh6J2C0C4HcGeILpn8AJxLhNvwaRmp2dJo6aNLpsBd8pnjeg2NdE2LbskOpR5U7G3Ofxww6IiRK-hTCbuogmOf29co7daN5LF4ONW6m8nBP7oFUj8uNdirK7414dD50kwe0agdbiDGHyKf6SGzOTbSczQXbBKO7yAWpDyWrSdpln3XUTDuMjk9-5r6XzAVZFfv7GovxXktGkKf8sBSaEdxG6TMHAd_uVAC3BrTCrha0tlgBEdJfS_-2clYlkmkCTqryghWEi8Vl_uNfvNAMtEqhIsaeelUHUQqsCq_mLLlBcH0VigvuUMh9ckD0RxTSdhehwuIhUr0fXhjSb0OJ4tjqKKDn75MkAHF-8cntQcQowG3Fdxwc2ikdTJTZeZObbaZL50SMRuh1VZzW9VNzGkcObS3jpNitvgCuvbN3YAA-aXvIJPUIRydEt99-q1Vyqhk4NvSF5M-1AU94Eaee2Nvw8fUF7dPvY5S2mygyDRtwdLZWLomfuEjfhOm1a52I0qF-d9JZoxh8e6AcR3dbfBFfnEoeNmBa5EN8ZmEndI7BbwKLLy5tUrkI585cZehKHBcrM-58cdk1GSF2U8kd9bMOvnxa9DGGGLwO6gLB7pJcZ7QBdThIIzI0KQ3rwZaQwMGJnrOYnL7ZnWK_6KB9_-8TMVNSyP5YAOiNocIow9nLyKEbQvjta0KslyNwZxGuHDrqugq7Sdt2RaRnMad1-KUBaQ-0LAFIn3J1usUEet7Wmk5nSEg8bFisi13Q8tpiG_EWmWOrSjnyuoTv5Ybo05M4RWZZ4nMqywLfzlAqFacGIVglZFoqWPc6zeCTM7MSF4_TmKkLOr60ozi-slZ75KUDu0LhUqlkHZAx-ixsTxolZY-n4PjaaxA2MOiPYfydjcXJZVMfwPXN3W331g_wYLJZsUYJ3YOJGZEgsJGNMg2Nw9XpeXhz7t2hkNQLrjb72ekmAekpLZJtJ_W4whO1IVAHB9jNDWi8C-OVt4Waah4WHuC48RCL8iy6_6vpl69R4MrfjZDlJzPSNFuCvh-dRiwjxUgn204rgw69oJKgnHB0Rmfap9_IXHTgHu1-BXEp2YaUg98I2Ryn0hdE1DKIUnr3U4sjtZo6YxP-Mqlh6CjUDfYB2VQjFD7ANBjujS3SqMC-CfOHgWyET-RYGkHQ=w1920-h912',
        descripcion: 'Pantalón para Niños Renzo, 3x2 Sólo por Cyberwow',
        precioanterior: 's/ 210.00',
        precioactual: 'S/ 140.00',
        link: 'https://wa.link/duzwqw'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_FsmPhho-4MT2kC5SkNBVpoGcEioUxhISUiOfy0d3KYjjM6wj6VINB4h8yIOM44-2_yBLvereZ66FPieceFozjb4AIEUOmedhKWWYLq3V02BfI4r4vsvjcv5YKqW2FDbFanWg6iFvIEVWO2KZV7IlJZFDfYtlrhn2gQ5tO0q86qjAdkQv8zk1Py8dZznn8UCJR2BLKsqXLSDtF3jI4ZslfNGTbkRzVkBiXOtSqWHjsywlFAzjIWBng_8ZF5pbuUwvPaSAOAjmEIupSUMCMMs5dOBrNypuxZc7OM0Vs9DJKLXMrnodzIS-lhmPKin-oQHzCwWdtNxVhO-IMbw15WP-ZDw3usbbk7Dc2-GpJEE9Md6IGzuZG4OGzoXBusq52S4vtANSmEZgKscRY2l6cjP92yfuGN3MHxZ5tlcN2rRlqcfyp3_t2cTWSLCSnCfxYl557A5lpIzl137gMzQgh_Sg2EmFXRY_xxis5lejCQF-F9a5NCyP8xm3xAhQdq6OblmV45q26DAMGs9AV_1sw40yCXIROYU9tfzZ-WAwkSpdwgRQ2eQZy-rVb-TM3bHMto7bNjGHa9bYl4OpF9PWczSxJas3Y_1nRv2SUsb9QaMbCU-RTzoxRMHjnWAb8MJ1K1leRjepyewO9XqhThycqOnOYcA9O-mHnREwldWOJcyv1g6AR8K4XEOXIfyPANmY5N3jO0wmzDcTjb6uq0kiKX-LiZ2-W8IBtteoUeaWpNsauTK3XNJYd5U9Nr-iLYK0QxEo4MV_E331_0gCy1lvSmTAHSn2tVAaWAEgrVfUl9q5MyZNge-9aRYKCIBJapJN6_PMNRtXgXTWahX_sn7v-07ZP48N5WYpvfOXhSBuwpYgPlew9IkT1WQI_d-A5fzYBBvrmLeoSoB7onUQFqBHPQ9wb8_OwBVzgnQrZ2Q7yRS9AG_yA7pO2_FAQQOCjLo_TLvJxtNBQ466cN3IPeK6dA8nS0LqNAtPB33C2FN-ZB8OTR6VDfJ3dgJuPBHbDbr3412dDeBOISiWxcbvVV6LmwkuHFPqGZR0ipWE3b4ch3lHndy1lgq43K_rUVPHGy-bxDrusR9g2YcOQSH5viBPhXig1cVy2sYJe6iJJanfwu9teeRZ58x9ASpr5PfF2I3wuOCjXxm-HuioKdE-jDXB8G5ZrgmjT8iOC9mx7O9hnL_50DaK0WDVgIwhByDq28T0wqHDRYx46044x_iFmmJGIBAD-6W3Qh_H5yZ8gNyHrY1Mf1a0wy18B6gnoTSGsHgaQEgo6ky2uU1sHUObEOlGXxNJTL5BrBUQ_7RdWl4uYQtra53NZh_mipTfqXt5XCZqp_bk18sJnx19LkzErua3fIgy0AbiErvrn63pHWH_BjP-3XaslkK-hh6Bn2o_26zI4lZZIiuLYVqLOXVDNY4Kk3OGtyopBYtFgPj6VQ01yGynRwqNXoEgnSchWb6Ug6JcMjsCZfqTL2w6EW1O2FPCViRFD-lwGnKnZsOsTdueC8iLovAFRnATBjKN-eZpyHo_2FRHQXgixwn2iaWVR9RqdXbl6JYeOrvL8G09u1kpD41yvJoDLHBN0JnlSHpk0OA25CRl47fJOLJS7oPYjcsg=w1920-h912',
        descripcion: 'Polos para niños  de 100 % algodón, 2x1',
        precioanterior: 's/ 72.00',
        precioactual: 'S/ 36.00',
        link: 'https://wa.link/duzwqw'
      }
    ]
  },
  {
    marca_id: 49,
    titulo: 'ILLAQ Perú',
    productos: [
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_E0xXEnrdc1mvSVjjVY_IDEIYCgrrR--dTVaV4J6cVT3mQ5JbmIh8qn2BTD7WcNggiakdW4tGchffqWMz4YFclzLfDTdgaIylx2MHTRwAwj0ig1CTNGxxtJ7AmbWSB_VZ4230Qz8ndODeA35Gkno4NMp2M1G4YCKo1DLp4UfwMe2wiUf0gGb5L84hHu0miPuIIBfEw5ihcLDKVGwt5FGuWQlM7Mf85evxl2-HT5e_PlfQpKxUcvysfQGw7VdA0rtHvOIFDqKHC1ly4cXJVaMMyn-GzVuoyJOXLIe-AqJbIbFaPDXydQraij9h3b6UYo6YF0aMab9qVxflZmC0lYGJSB1kc5rhdb9FMlUep-X6qzYtd8ciU6SaYX4lMQAoxTFxnBN3NyXwS0gP84eIYSSuFbpjadQFZGpG5IIfb6uk-NetusmcyvgjqAQcDinPXrHBlSixu8713S87dw8WsTOc6QYaBF2n07e94vQjC2EydWSwZfwyl-reppB-1tWJXhNQTt52UmnDYwApl3XEZxcSKnZvSYKBILx1QGz0BisSRbDABDxeSq60dmg71dAJRfOJ53oq72HuJub4b0UJRDu21BfDhmEjpLIlmCWfIuiESrha5GIOwTyErFTnl13x-44H45dhpkjf40UO_toNpuUClpuwJ_BU-DGLnhh4sUrprzxaINUohGxY0bvQ3tb2D7f7yAJTQbtMFtfoyAsC3IkqKpJa3PK3A6h_bppaDfmzvaa5V8bfwLX7C4DprHMaUT8eTzBIN51Fjfyzzb1X6pjFSpbpDL9696zLOQKrcu7bfriILEiadm60OVhqapVAAJ3P0FgHY7DN6uEYXCTAyM4Hva1VEVFOa1lXh_cDP2Sbl69v9tr5sVGdujU-sG73rS8NAKu7wtDKozLASGSRwSlV3BEgxJx1CeLGkPE_lSIAlZIzCLgTp5HGRyV_APRkGfLr6mgroWiC86Kpn_Qvngev6rP7X-QxNPJNn3Zg8kKW8CcAvdPI7LPue688yU7jrvV2Pxj28qOWC4xcFBWomerpn1XyPVLHffYPn5t390YHUL4cdziflNvhyZsQgemX6QOoEvBVvOzeUWDFeiRC6CDXKzu3zQ_nwTwO25jEGNguPbS7jab9YbH9OvmY2oOV_zzQKWLCBQk1YGbDTaZQnHb7HBhBt1acm1yhbOOmmdSSdJf4VfTo0I5R5rXKTHtWPwfBUkmn6jgwt7udOH2O86QC3UozqMs3h6ERh7l4tMy0BfXGAUZGaMmhlhLSym11q1PJ-S59dQCzku70XPHpgbgHXfgIhKrIb1Znyk7dAoiGRfMEEN98vPA0H_VvgMhaorQ8n7IewP6oEfgHq3FITLeTMWrJOv6qbO1ZUIY6GrVI2tHpypveYZl9d2Uir5fyJ06NkDPoVnSI2nvbceI7ziVMgVsRgMMCY-4i-3N_NVkNGwwnBECqozVd9VsOzu8bxbtuyLN73isnF-i3MUopiWsgp_ZLgdppDquOIbXVqLs2cR5lviSATLni2rPwuiDSndsIJbjy2YfVOmBSAi0kRU4-TvR573C5rpa9uC4zI25y3wBzYgxZWdS6ZIfoZ4mxg-yksozoS6M45g6mEpPQ=w1920-h969',
        descripcion: 'Descuento 25%, Juego Bichota de plata 950',
        precioanterior: 's/ 385.00',
        precioactual: 'S/ 290.00',
        link: 'https://wa.link/pqyx9t'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_FBosLyR9h658tiaBwyiKCnppZfM1GWMIQNqM9p74LoxFxB2f5kAETwBk5f0SMdCCtVJDm1iiTQXCNggft1kOINS0mY7obOwAha8_BnWtgieYLPPfV8jM4nnv6ic8cUrk5AeDKrd_Bya_ZTGJ3m47hN22m5skskzMwXSC8JWWUSN9HCJvMHZkn2Jjn3dor0ANtHBzzEJvezCUk2xv6486jWmPzCdO4ean15hZx0XFf_OejZNibhqgjrhkxbf84ABn7linV1UjtHnjc4FIzG1-1RH3zrZEpBz0ArS3gQLdqUIqIGX4NtXO_-GFcg0GclXRDKEh7IM4ePS1ankZA29sWOVuIYE4WRzGaXadQMzQqTC9Pa1MrO15_LYIKqnwGLJKUSamk9y67dRI7Ch_YyYh0w5eVi-J02eIpvbds8fac0BCtWSuZPeUNiaVn8rNKdm6uPV5CF9Kz3U4y7y9HtamJranR69A8_BFvtiUHSeSjdHsJglYMf9u_FaC0_HK8ZxmvWhO_8vKIachedR_Q3zdPyl5Zd9403YE3uN4idXd224ZDZMyHfJ8KpdRWvs04YQ8_t3VJ0iVy05zDHgrcdm49keYIlNCEqMGOSmHVLliBOzbr9CMD6WVuV9T7DFgNZpqxXeIpaFTjy6eNHlZSBBQEONvt1QRX9NYIyxWE6HVCYHx45s7WvmalbmQA_jD4n4QPD9le0_QT7Uc6yNBPowLDr8NlyaFw80MLrAxzCc5e8TcuHwXrKqfh9LTdKUrpQ4k_aBDpLutLrnQejX0cmTN0viGwQ41fwCeyY0dwuu7rSp8HysEVWnpPZrl_1GVgTELl1itEFKfKBIE_tS6fXFBhvnUq2lsy_HegltmzZ2S-p63m3vp7wrFsRTxHxPRWqqFNDivKu-oHmexiCcqKKExJK8oUNhxGuwMkHJ5BMzSt7DcjSKPeImSIyabFR0CacWXnlNClXTZvy1oHlTZvzztpTaapZ4NPHJwpknRpyavIwU8kvjmNcoDRXIIwtYGfBLwSJlo8h_aiIER8rdi07pes-ddFHmfgyQH95huea0nlsBsN2f2LJYdUXq4WBYpIShxN9kFcIjf-I1XbyDxAdmVQ2jcYx-2g7-8WVDYxM-Qqaiq8PfzveEUPE-0MsLXu7cy_IJJzpjKAv7Z7HuMUoXS6DqlOW_QHM2zen2o1WmuRklTKnGahm3iAvAweQz0-uJpt9G-0fqrSb-rcX9TIpUFHRqk8cU4Gu4DnmDbC7LDSCWyRl_lYeByRBPXXssHHwwZydSQJDCz4Cys1txTqUH36f2W0aIf2lLK5F2kebJWal3FRkVbMNGIvzrWEpjwjW2ubO893HI3Mm1x5O_JiLIzedPFUh2v34MMZonGtX1hjBVTVs1y4Xyo30EXMKrXUE877_GOzL7-1j0rSW2fbeYaC_NocJtm2fT6SzpEuszpMqdDmV59kVD9wpEcKU-YBFseemU0rCTibod7KZOMVsPKMhlmK7giVQZtkUDBfSRBH7nvZpB0b3bPtSbUB5ztq8AMAtkakS3JGNL6CweGYB3a76MkgtPO_eHSHoYARpUyK60FH3YuRW_NlDwIulBdPvHQBgsokcwv69-VYA8Q=w1920-h969',
        descripcion: 'Descuento 25%, Juego Sol Inti de plata 950',
        precioanterior: 's/ 375.00',
        precioactual: 'S/ 280.00',
        link: 'https://wa.link/r8krmp'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_GA3y-RaknSs5YvE5Q9j8mHfoQpJvkjKxue9-Lg2keJt2fyM6--AVOhfmH7eY1_GMs0VrvDnfuepDZxyUd5eHQzIR1N6e_ZM3B4YDWre2eNAZfTW28jYXq7OLWAdopa-uLb00jY5cJAcRbxt7ykwB547jB-E6itbZDQZvsBiN6CNWcQcsLnbiVE0GQkljtPCsQp4hLastO1Oj5tgEIpb-L08_8UrkPh-RJHG1FbCgFRWbyHNStAnjzEgfLFsj3dlAjje89bqN6ux4KTc4vMQpGl4JCOG4txc3xO25G3Y4hFxP0STAfs52g_uVM3ETGDNT61WcP1QSxU3W1UVuUwAH5sPYbnJTvpicDpgGggGP8uMZ7FKMNh5NdVVqZ6plx8Es5tn5yrlyvf-ET2Sh0TuO5QcDDhnQxtr6L9QWsjF8brudl_6EiZUMKn2TgSyS9A2RfNzdkQjJbNHPFFaIuGI1EYpdm5mVNCBbnqnOZgRQxQ4xgyENYweljAuR83Cud1MI00GTKk6IshAX-dCax2h0wjjiHtvswgwxffOj_vaQ6ymE10bexhALpylEtKA6H5SjjJKapXpwAfw5eVXVrfoE55t6Qs-5cws1J3Klz0pL4aH50JokjDs_97ldpbqEc61fmhHlZNqOOTT0quZPBi3jkL0OtPDbwu-Sl9gdiVzgeRnbvxvdniJbWUCYB-rgp-WrnEBzbpylBj9joPR_6UGEw5uwpQdDDcMtglLFfhLfjX5qsXsVbFNzRM68AlVCzSOi-HNfsXvidKt0R5qcsQsa5Eu0NAx8QzmLNhXnfUFfpbM5kbpx71ixe-8LedRv_2bszx6l2IAob24hkonDjRmeT2CqArSl1DM3-FJaWPydJ-GEExc_WxGzYGJ_LKyKj9H_eQ-nm1rYXHJQnrCRT7jiO-gfqrJFj5Chm5fUdK5mu1BCFXabSCLN7cGwkIeU2N-gpiP5_tF08eZFdcYhEIBmQyuW6-CGasyR0DCl3il9PXf6o9iMWT5bEHrGXL06wWGD5EpEMAv8MeUO_QUb85cU4ARAIlEG0IwpMaRFJI-sI563lW-o4kKZf8Gvzqn_0IK8ditwir-QfkuG0bQCvnvuhAIgMWQQeB45o00_35X1IYW8LBEBN84aGokLw_537atgfq4VPxV-Dz3sCm7YYQCbpMgIC9eL7GethX03oV5PMG88jq7wcyzpLKNc_0jXd4kOKw0cZHqYDRQHhCP2va9fEJEVNEppM-Hf5aV-CFKoDmdRNAVykmNBZxhMBwJleubNuqPvA8q1wqh-VUL-jPK1AQ33mqtgxR-1di-hwQsTXSAvmmoonSo4KyuOnB8kCBIDEpjtGWHPAZUr_mC8FFRDxdkZebeNWUSY1cG9WjdzvEwRqwmPz26KHkuaGUiMGYhDqJdByAZGwYwIAEZK7ZilDrrHH4cLyyo8Apz8FgI9IrZNXCK9FdqJLrpXHjkS3SrWJuduGAfiBLwsIfBUunqezEugwTRHkdC8mpUpTTpYgyPCRMHZ93IC2OCsvX-g9L1Nttkjt13SNhDx_Qrw8ZF2MSK8ZbKNkMdWlDmXcAUlNH1PTq6_P6gs8iNNDPlSs8A-jGngYrbvrGnMU=w1920-h969',
        descripcion: 'Descuento 25%, Juego Flor Martillada de plata 950',
        precioanterior: 's/ 360.00',
        precioactual: 'S/ 269.00',
        link: 'https://wa.link/dn62mo'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_GA3y-RaknSs5YvE5Q9j8mHfoQpJvkjKxue9-Lg2keJt2fyM6--AVOhfmH7eY1_GMs0VrvDnfuepDZxyUd5eHQzIR1N6e_ZM3B4YDWre2eNAZfTW28jYXq7OLWAdopa-uLb00jY5cJAcRbxt7ykwB547jB-E6itbZDQZvsBiN6CNWcQcsLnbiVE0GQkljtPCsQp4hLastO1Oj5tgEIpb-L08_8UrkPh-RJHG1FbCgFRWbyHNStAnjzEgfLFsj3dlAjje89bqN6ux4KTc4vMQpGl4JCOG4txc3xO25G3Y4hFxP0STAfs52g_uVM3ETGDNT61WcP1QSxU3W1UVuUwAH5sPYbnJTvpicDpgGggGP8uMZ7FKMNh5NdVVqZ6plx8Es5tn5yrlyvf-ET2Sh0TuO5QcDDhnQxtr6L9QWsjF8brudl_6EiZUMKn2TgSyS9A2RfNzdkQjJbNHPFFaIuGI1EYpdm5mVNCBbnqnOZgRQxQ4xgyENYweljAuR83Cud1MI00GTKk6IshAX-dCax2h0wjjiHtvswgwxffOj_vaQ6ymE10bexhALpylEtKA6H5SjjJKapXpwAfw5eVXVrfoE55t6Qs-5cws1J3Klz0pL4aH50JokjDs_97ldpbqEc61fmhHlZNqOOTT0quZPBi3jkL0OtPDbwu-Sl9gdiVzgeRnbvxvdniJbWUCYB-rgp-WrnEBzbpylBj9joPR_6UGEw5uwpQdDDcMtglLFfhLfjX5qsXsVbFNzRM68AlVCzSOi-HNfsXvidKt0R5qcsQsa5Eu0NAx8QzmLNhXnfUFfpbM5kbpx71ixe-8LedRv_2bszx6l2IAob24hkonDjRmeT2CqArSl1DM3-FJaWPydJ-GEExc_WxGzYGJ_LKyKj9H_eQ-nm1rYXHJQnrCRT7jiO-gfqrJFj5Chm5fUdK5mu1BCFXabSCLN7cGwkIeU2N-gpiP5_tF08eZFdcYhEIBmQyuW6-CGasyR0DCl3il9PXf6o9iMWT5bEHrGXL06wWGD5EpEMAv8MeUO_QUb85cU4ARAIlEG0IwpMaRFJI-sI563lW-o4kKZf8Gvzqn_0IK8ditwir-QfkuG0bQCvnvuhAIgMWQQeB45o00_35X1IYW8LBEBN84aGokLw_537atgfq4VPxV-Dz3sCm7YYQCbpMgIC9eL7GethX03oV5PMG88jq7wcyzpLKNc_0jXd4kOKw0cZHqYDRQHhCP2va9fEJEVNEppM-Hf5aV-CFKoDmdRNAVykmNBZxhMBwJleubNuqPvA8q1wqh-VUL-jPK1AQ33mqtgxR-1di-hwQsTXSAvmmoonSo4KyuOnB8kCBIDEpjtGWHPAZUr_mC8FFRDxdkZebeNWUSY1cG9WjdzvEwRqwmPz26KHkuaGUiMGYhDqJdByAZGwYwIAEZK7ZilDrrHH4cLyyo8Apz8FgI9IrZNXCK9FdqJLrpXHjkS3SrWJuduGAfiBLwsIfBUunqezEugwTRHkdC8mpUpTTpYgyPCRMHZ93IC2OCsvX-g9L1Nttkjt13SNhDx_Qrw8ZF2MSK8ZbKNkMdWlDmXcAUlNH1PTq6_P6gs8iNNDPlSs8A-jGngYrbvrGnMU=w1920-h969',
        descripcion: 'Descuento 25%, Joyero',
        precioanterior: 's/ 260.00',
        precioactual: 'S/ 195.00',
        link: 'https://wa.link/bskhlr'
      }
    ]
  },
  {
    marca_id: 6,
    titulo: 'Kera Super Foods',
    productos: [
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYWaHX9Q5RAV0_XVQ4OCn8rN0kLNBtG9Ta1RyaMirrESfF_-TZsNYBieBkW86igqK1mSKGPz658GcBR3ksEsWvYUR0MCgknG88=w1920-h912',
        descripcion: 'Descuento del 10% maca negra en polvo 500g',
        precioanterior: 's/ 43.00',
        precioactual: 'S/ 38.70',
        link: 'https://wa.link/mu6v5x'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihYZPwqnc8Sv-Yyj1tyIlDiNLPZ8lDl3B5zFji9Pz_MXzmP5m7EOW4MbBsdtjRkco3FhJG7JvIWlj3XoY9_wQ-3rs8KptSle3cY=w1920-h912',
        descripcion: 'Descuento del 10% flor de jamaica 200g',
        precioanterior: 's/ 15.00',
        precioactual: 'S/ 13.50',
        link: 'https://wa.link/mu6v5x'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZAq3pf6s36MdWdR6Y3Pcjr483GbyTDJi5FG29h0AynXNlD2Ry4rAjunzSG6hcT7ZfW1qLfhbUITPnKqNGvwLDURSOmC_HAunQ=w1920-h912',
        descripcion: 'Descuento del 10% arándano deshidratado 100g',
        precioanterior: 's/ 12.00',
        precioactual: 'S/ 10.80',
        link: 'https://wa.link/mu6v5x'
      }
      
    ]
  },
  {
    marca_id: 13,
    titulo: 'Tablitas',
    productos: [
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_HDUdAham3PoOF6LnIaxWJDKR1aNjzh0ItYAEBiic8w2-Y4pudFpcm-NnV3vMk37k8Rs9z66ZwMNPVMFy-A_ZPnh7u6K0SQLojCR3GxUYxKgYCri9Es_P89aupHykronZGb2kuKMGq7B-Qvl85tgd-zxNziGhauJGX1wkGT1EbEAqVeBitUKsqV_kTCUAo3d6EHsiGHSJJNuBoxj83SkyUNQP7NHQPXnyZdRqO5_z6vfmRdfwPGEIvz1s0eOnSfkFUOQ9_NiiiMfOzCshCQuCCPgnkXvEb3pqHBzUP-xrsZGym-AO9vdktf1TL-cLd7u-HNZoNt3Zx3YH1xTcjrgjtyL3nxZ9bH2dt4KWjaTpMStiOh46dlIPk6Pe3GH5JicXAMkR5Vr_zjMjzkyREgOkvljxCkRsU29BCadgKU3BPgsPS_tyEDhgHV7qpuKiwGIFr9iL-_sHtSkpKYbvqVBS5kHr0DtIpG7TJPgATdUfwzvolaeQIfp0JU4zk14DsXGMyLGjiTTPAK6z7mQYPZSuf5RnNlDdsQUQ-FkrJOY6D-PbLyoczkYTbXb5GQeZEULel0i1nAYmeOdiU_vJL2_Cce9MfNejdISr6QGikeTjSuxmNMC1YBvjXQVAbJQ14iIewdE59wPKyNsYEh1fP9UBc79h-27jdMdTP3ucTH0Oxu0H6429ZQmpsZpaJaYihleZkJ-t8XFJJtHlJ0H5cxpHsvuyxXkE-0myMYTcFIF8ml4bTXpmTDDnZ_HAZFMS1aBku9gewo1EPKrZpzEiKwk3TrBZvsw1IP8O6iGn0QrSh_pXXNo3GUTfQI7dFu3Vz70xLQch7vTIEcTfSCBE0fOO_ZLaLpP_ydswLzAG2p85Mqf5F6e5wzTHf25Tm36ifa6I4rOpnXVQItXS5IKV32_taM3Q7Y9B6fDtVnsECL0Pqus11nlddGFY5Xx6KWqAsFc_7BIFWMMaafsktS6fbG0gF5fB_Kj1sWboFUqBSEMB0XiwG5x-qcYnv0b9qZmFYwsi3HdyMvafsqTy_EIvz--9kyzhkVqY3NFoWTR-a9IrL4RvVGE4ukYYLqO7awjX4vs0ZDrANAJ5cG6noJmG74eNQEWFXzBHZxPjDupycnUcRwpbzX-zHLIvNjOqbIFCIKoPOMtC8vFKRDf3hJFidEYICe-e1wYhOK2EKETdQaUeiRmXf1BQSsRbAX8JTTvMPllpuoBsobZJz2IU8hNIGSfVThZeCFqXQTEnipiR8EdZb0z6PjJdPqABH9zUhqC7Ym_lRBNJMHIXLXT0WCFu-NXWSVcnJZCuGcOV_G9cEF0MrtZOwYoBryZ27p_guclvSp6g4u9wCtcwVaBktapfahhhnJGAlSaOHGvOAqKJSoyODRmt0TcRU7qqbiEqR7RCwS6lKDHo4Nze3noZWgaXugUM-MYgmFOGHj2Qw4ms76i0IzJbbR9FSNUPVXU6eomTyx3YQiy_8HKb_81f3K2H3WB93p8v1xn_n8PHaA1Qz1H7O6SPHNKew-oE_B6EFqbifGo-qIl1Kp33LyeWe3FP0N2WqYhXlZ73-ufOeMbBypTYqsiMhkMZdRnVGliFYSNaoGYiE_xpHnSOER8Cw=w1920-h953',
        precioanterior: 's/ 3400.00',
        precioactual: 'S/ 3150.00',
        link: 'https://wa.me/p/4881755391942001/51984003557'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_EFSJ3OkEnWSJQa863ZYm4m_swz92orx7NKeXvI5rnL6eyyxCYa1u-8TsNbgiWgEXInWeGkj2R7vP8bn_2Ajs-g6jVZbYdxQR396y_0a_oFVB_LNwn8G4Ns5AD20WLAzzpEGlyfJyS3-Ld7AtXlxp82RvdGctYF0UX643M7CYOXusNGkhOMOHKP4OBdfehswrvt8GFQz5i32wJwfvhnKDtiUW6DOtQyMBZhVY602A4AhMAXXfRT0yNMhTQtTCOZjhvxR4dRUM189glz3NluubPm91kgi-HUbKdPeNqnJC8R6B1-HWkpnX7vrU43VOub55BbP6H_BU-kYmjUspzCk-FvuoGqVzQecjruDbd-23_qyKOKTQCX0v_g0I9quweM71POfb2new2ASJFltRlBcAOq-8v4DetwfwfknN9-fgijQuWTDSGhKv7Bkjk6e5yrUicWDJjPV1Y6jzF-oFtAtWvPZw34CkmWtLCm-i7UNLFDsQDWuQmNdFq506FQxq-gGG9ULPrU81Gxg3aHjRY3Mvb5_Ke2GqgKYUu378vaD2J2-f4TB8fze6aXU37f3LB3T1IwRKK1OvUtKn7IwarOOqhIQBz-gjhJi414cuen6R5g1YLonJ4yOJTJep8-mWi7hCGLv8UvbAE6sI8n2NuqBaXZh9bETnYEI3AgrRhnTOjzL4A5MP32rdjbzrcLNrZVItr9u7X-I_JdUr6v4v1xA3L3crC_KzcQDRAGD7wo_XqchcAN68oBveWAugEHDl3sc0jywsZk8kBovPOIM_L6CINcFsWPrV-fXOwesaVo6Z5gAz28E9w7E1Bu1CAqB4mS_pH2MtY75eXGMIbjOpOh_mXK7fyOTWYTNvB4mQc4WsiwLMdyCy-OMbg74Z2OZG3guOEZd5ed05JID8LSriJ3tbako3nGqM6tnaEKnAwoIrcnIoGfrH-3BmJV0gf0Lmnp9I-hOexCzyAbuTPrr7LVLcg2Fp7p66uWN0d799VBhQZiznR6U6QdZaPffa8WbM6IvqAGpME2RAazgpzcqhej-PQM1_KcxFvU2WQOWtemUn_Y8OOr_AzuwaJ2lplGzogjeZU3NXzG9bictoPIBhdnS1Gdd9uBHmU2TRwGp5jwt9gxW8TzfWEt6xmWXyMx09pIAVxslB_qieqFandkxiEdMnmbctPeBVOyfcEKm4QuB5QJy_cbPWIqvUpB2R1qZIlc0nF8fvBxZzNyn6DW5DO7_Bggt2pgW9UcHEJkXxxZwC06neIZMf1820oYcUbWXEdMHyU3rHQcA5-l0fFfIpKD9IJngpfofel-9lQdeWc8KngSWFYxi2OIFrlQq-lyGF-WSSdCwpYHWMB6pP6KgeiFVDblZv77Imb41lloqfGn1f36bjtaTXOYOaQsLasCqCXaa8hQ1_SX0VTZI3y_O9_vB8lRpB6BRQENsetI7NpbtsIPp95Mo-Z07U990aA11cdQb0IotL2-uOCEO0RkTJGzo_6SNxRuARQlBAOuh4AsKUZ62_ugRq5w1cSWeH82IpALBqFf-0ceBep46Fu8F8TWCMy-ZhCDl4TXYie4r0y64YBmInbpV49xQlUjOf1tNTOoqIM39JZJdR-atE-TBQ=w1365-h953',
        descripcion: 'Oferta en menos 10% en sofas de 3-2-1 cuerpos',
        precioanterior: 's/ 3500.00',
        precioactual: 'S/ 3150.00',
        link: 'https://wa.me/p/4509324969117376/51984003557'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_Fb5BMOy0LeaKMlZ6t7QLl2zNP9MrXg9bMKV84UISwe2Y0lI-APJeCQLDjNUEgJf4Vm0mkI_XKfR89DrV3vtPz0EIG6OFTw3LLBbGD59xuzhSeASnTJH_Gwkg72XPQ3TjwoV1sLbYUSXZQywmVdA2suwWfb5wttJRm0kxYEFrYcG47jIxX_ouofKLrm02UuVEmBkkWhemEiB6QbEFwTlKGSofmW035I2OjiaknkVPlnaGFWM4DN0id-jAn3vhvHFCwsl8AT3L0BRJtRuhLxGRLyMjLKEqK-fmy9P4yGJW0Dk4TDcvpIMQlSFr40AAixb8k0Xq3foC5fce-J5RbKcf4iGxIxNbuDlFkCaWvuKUXmLuwsk3DZPG7UbSwZw1XcWZr98co9Sfi-h9mmFZpSacsHuTFMAjt8JYqtIoc2RPtg2QXcgJY4p_1_xQbyZnfVaFOYlwpZTRmPw2Qux4wlctB91DeO4PAyG3CNvvzneNqzjHEQWqSpJleovY_2hqmCjAoGXrOAjLpfWraVXXfsDY2OW9cldS1yopy-vlUCLPRwauTpkuiaGix5qBoqpzoJlQojo4wiAarhnXmeklBYhAEZJX1DF2eu3E86RysCuF-DNtl9lc_Vn9cTaGw1R1BH8MF_Oi7HSPzDqulEzJgtUpO7EEaFxvJJVQJdIHaZj3Vq7AffbZORpbMKtzvCR4-768sGLJvU65iVnrO1wzpeKDZk4RmQAOxZG33B_7NTlqeY-0FEVwu0kPIzx8j9X3eZ69T4Yz6QJgltIElqemkLKZN_EvaJcCd3mr-SJhN6_26GRKSAbsp3aBqev9RS9oa9uI3E82s1foUTexPClCa9AROGuXvKiIQeuth2pS-K4Y5yR21kxBFdmaV2LHGtXXdrQ9wD7QAkbnpS3E-FTOyLQBlnsPc-GvOZ-8dbFvAirKgsXnkzfQeuNC0NmRsiFjs_GseBehIgDzpIyV-Cvt2mr7Arlp1fFzzNKUJxyqfsnTZPkq8wjjBUSqkNastv1u8IkzRO0udKwH2fRBeJKNqxxRUoEmogA1S-ejdvB5e5JwulGAF91HqlvMRnzb4ZM95GTdFylbHFzgwR7EMH0SpEhEXXdbjIU6DHTdxXAtgZm_vWaruKBi51MGZ4vETXwzuc_VIIHGE9aSbd5SY9jKS7w-LVmpVKtcm2jY3q-wb_TzIDHg8B48Pm0ewDLBB3V5h2LB6etG_GtM42YJtsrfMdYNx98O_RbtkArSW6Wz_pNwDTvgKmGBgWTE7YahbrtlcXwpL5AO13kv01GcUMjB0_E4EBWC1DGs87YSMEyxAGeC_l6UMTx3x_iAWKdn2NN5lfUpKK0RA_tLMoNXPVUugucpCReeFijRwvuFiMKtywgB16_ocTqCiCuBmwIYNOIIEZOSRhsG14cuB30j8y4MObo3uJgXY6mrONKBUwQYzuknQ3JA_KZ_JwpwGLBHVFtTlnV2XzfBQCNWvIpYgetNPC1psOHxV4z3kowPNzjVKd2sNc_Ka4atDrF7Otjx01x8ZdhnjRqA1Nhb8H4xLN2JCKRqMyUqMbeZMT8E9SvIuUiNoKHtqrc0TlbD3Ih6W2iQUmYC2li_dRkYjHAFdImw=w1920-h953',
        descripcion: 'Super descuento por unica vez en veladores princesa',
        precioanterior: 's/ 480.00',
        precioactual: 'S/ 336.00',
        link: 'https://wa.me/p/7662691357147818/51984003557'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_Hkvf_WFTBFiYlTZXxkz2dbULrin4sA6S2B_vm1Lx8yNWdlpO1IaojEJeWqjJxP2gCMkwC9jrk6Rt7cuMcAMzQDL7P9SqlLjrNWC7epehIkYve1kFyq0OCstGZW9LYtPlCCNspi080NJXzp5X-LMuz-5NcxNCdodbrjGOfaS3iyfSHWMuz4sUBorihCEp8ycHhHzqAWXYiMFNMI4Z2UHuUp5nCGuE-0RDgEhXzHF4dZ2r8BkXsSHz8KX3Oc7u-Z-35sp8nDWVwWbOFSQk_J84H1PHJZddUI3hJ0FzCFmDjiWjV8Cx0hwWPwTXSatMQeS8yAELPJORoKadPUZtlyiD1w2jodc4tbw-Zk1WHogIPjknmq1cmhtp0atCaUZg0V5RRd7yy10BNHSmjFfCg5Cscj5-ogrlDHcw5tEl3XhoTxGR6JUjZZudWlFE66j3p1Efpqckq7FGweWPEEW3JWTTxsiUk6vC31nalsGtOoVbCKZaPTMtiyBAgo_VZKKRUw2UiaUDcfQ_pF3nPhFWYwHBhe28yL7BxLudWFWzqxIkMHNpmYDtfkfLSw8Ibx0JIyGpBYENcam3_WJxn5sk0fZW7VTleRQeKtUP9z_J2Gh1pbE-tDrrIDhpo7s7Qd3HLUK532DOXm5OL2hA8NFZa3Hrd0k1ag4HjNNjVuUp-1v5x3LLh3dsU25n6hJdPtXW8m-rtkxJ5Vri43bxJqpGd6zO1Lm1CNI8UQgvKuBYcQ4306nJgC_VKRbp7pnbRXKQOdTvDtLuch7knr9BEWUJkwjZigthCo5eQkbCEwCRfxxBOUrePnhaHboXSVtBBrQILsiUw95iaFWhihCFFkY79ZP7hE6yx0Eg06MgIx7SrOA6CHt0qxLV_dKVnC3JNnIb7oTiXqT9J3K-FM1Vg6yq20hPf0MxzbCRDV17rp3hfw_sdDa3aKsxYUrQVFyzi3Ls9g0Zx_Vy8VPaUHo3DD1wDtSnwPfx-JotJY4S9EIucZtM19l23NMnvZhP3nJ9ZaxwdTfmDp_iXOp7v0UyLMqio_A7S4zjbXMr5Y1O3JkLqH6j0vpuAakTjjCLiEFDvImS4whq_ZPa7SLoGpbNKA6mhv3eZYGdVp2EUrtt7LtN3RTASMxwt4TuLk8Zl98p519smOi-yfoeAZ88EnIgTC_IZMIuoSQ0qr-6npXcHb64nFt8cai4Wam0vZv8kP_1rFTp0Ioqsg4ugMMvYfq33NEuMdVxzJSULBMGSkpUpX49wZKfIh8OhONe18NPlNlLoiQ0dVUfrA8KxmbOzAVRH9VVm3cK70FcL0HkIl3dyK2rBTjI0yZAxjDvO8lfUtfOXts-rY_dWmEorr0xb4uCBuUM_4Rm8fM6v0G1YdzHFi01Btw5lMz5QbqGc4sVutCFniVeOT1SZWUCBeXZoOfg42fv6Io1socYlpyxCTEuXKEGCxaGY-93VYtT37r16rK1iNkjEC7rBbNmZ1-xUKPxpfVWEW5TxdDEj21EPoBxbIpiLjszQRlAGNuAR3XclLqIKN1a6MGOYXdKGIg7fNoO7q_oqq9gpJ0RtKSvYikQErF4buvog9YGLv1UpTXWAkfjplw3qN_aDrav6KutmcmaVvRQ=w1365-h953',
        descripcion: 'Descuento en cama ventanal tapizado',
        precioanterior: 's/ 1680.00',
        precioactual: 'S/ 1512.00',
        link: 'https://wa.me/p/6129910280367526/51984003557'
      }
    ]
  },
  {
    marca_id: 30,
    titulo: 'Apisa Kids',
    productos: [
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_GgLfr-16YwP4emoAICBeVJ-qFapwbWslbG8qTrRgxKnhlo21q18fhCam9xocX34BX_8pl_eCZ19IfuB2_jGloqR2MKOdNyNH6jhGE4z8WCzeC77zkZaWqodr2SfdAB2RoM6RrIBerkJNWO6NBxY8PRBzQxHlB5VfMCda0tklyQL_Oy3rV96n3e2GpkxSrHab1PxEfYlpRO6wnw3RyBE3y_9MKu-dlt1GeAUgkKhcgVfHk81ygY7-XobRwZwQ-ZtJ1L6WRNzVr-xUc5hmGRrjX_58lhAkH2rQY3AkdsjLnifr51kxGvFVX0vbXwVS221mU8ukAE3EkgcwMbupUwsrMoqArMl_m6gMe6N-XRaZ1rn3atBD4oEzrgjqHzzk4eLqW8i8Kdx107RaL6rqroUwwNECr404P9XRPCvrUFoQ-vgAY9u4YCz8xAvIsQ_GAo9MZEsWHHaggmy45bwgOjozkUgzaitSeV-Tp-pa1MOCAceJfgHpGjjqWqNIP3dLsXrdG-nuYEDk-mwuWTnaI2-0E3_CVoALz395yOaF1Fmx98Bwm6tugwBBNCvGQecjHPejzvt9ruLCCJE3-ApgeqY0l6DQz8kULaHbpn1pObE1VNsplS4uT_mVYbAQnm8OD1Gw3kJa_AzcQfuQKr4OTXoeVbwCp174CTeuov-4NgKmWEJOR1jU7ldwTtxs6prMgvssBHdc0zKFeTOiPK6tJXJdEb6kfZgwTASzk8UF-iHE-jPkdn6hgQENXReXJ_lMBgzHXvBFmEpLu79Sqo-QL-rMYT9DmbJAl90f3QlmMdEJXcMSSW5K-per7zkEFBQUWOH25LFSr8LZfexmhPr7YaC_cJNtFTzwKDm5CHbAKh3zeDAUnHnfSn-NM-_Yz_4eWLF91iI34HbTPX94kNfKThi8zd0R8S2X4YF9iz4pefKpaPaKTUk-5irHZgh4NfrxI8SNL3zQjEBCoDqw1RvU87JNoIcw6ebXrY1vvrF-EhzRxTepuOiHufOBKvaUbx5I8pyh51_65wAwYz0IjSrARNfkf5WriSGOP-tYjj9iQvZWBxMh5eY0vbaLA2wmXiDiHEfZEZVozX307HiT3zjtMLJGRiMPltLwa6XJa75MGYwoHFaL4FvDHuQRwu5IAH3dPsljCmGceJDTlsZiIe09eqkxLmOA-7hdUkYxp-cOqQ92p7LBLyl5O4F-dc0N2mbvdaoa-U5Wa2dWV_Wz6HW06Y9WKZluiaTP_Nw5jcA0Q8lVAVfw0m1v48m3vkTUJ24_5YYne4bjXIAbNm4TjEGhLSzaUJdnlMTosBqXKK_ULvgG-IAQldWiKxegejMIS5Jbt3ZOgHjHdvc0ilmVA6x20y8Z7cadbBIbsEvKO-4IiuTV249hbRzNnMifxBWEKvYaPY6wjd6mXlYg3Vq8ZAXKUGnj66CSBKzKFuCIQbgFZ1BrYddo6nwjRtIX8Yopur2KVwc4yrRI1lBvHrIahfLc3mccrbZDYXxq3gAn3QmPLqCWsMrXfb2r23my89iQiSy7jmmKpSgjO-yVSy53QpedUymkT02nV1hqk7peL-NpY7VfUtGr1oUtXlT5fqpQfC6Y84Lxr5rCdS9QRpNNibAg=w1920-h953',
        descripcion: 'Arma tu tripack de ropa infantil niño 2 polos y/o bvd + short',
        precioanterior: 's/ 50.99',
        precioactual: 'S/ 35.00',
        link: 'https://api.whatsapp.com/send/?phone=984003557&text&type=phone_number&app_absent=0'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_E_JLHXPCrUbuxXi6HeBm7rmVTxGDs15F_3KgxNReakyfrrYxWPH0vZwq6hwfL7VFrT5vpW18tYcKrn81EK4ONZZYln8tp8T-Qcd5Yn8hepOQj4cjx9S7JRBoD8dbR0eL5OrweOVMbOtqQMYaUzW9ARVov53ytk8n0qWa_brJPu1U1_oaGu81YYUpO0G-0Xuvv4T4C1Q7nb042d1We6FFr0DMET9iI2olmGxQ36BRGfvQ0d489l21j4PN85es5N7c8AuWYCxAfKBfnEohwrpyo-V4Wuz1lAyqvjf5C5UsMYJdFpwdwzEl9aVdeCMuseAC0o7MEC5BwdtXM1F1Dqsy4xRQxO43MhfP0uwcEqWR6G5yF0iY0VPCqQGbmXnu_OroWwXvVu7MBxVj3-7zliq7MkxEkvVgYgLbUFE8wOUJx21TQvT2U4GPjjjEEMx5a2Ymubf9-HVY1-ezekkB_2_czvGNU7uXWRnC56cl6W5n_1z4fl8K9dnWLp-qOkqBVz3PBKRlkYUsQAPDEg9ojixDx0y13WvqW-1X1iGKmqf5W2qPjtJDRDkk_A8BA15lGxJfcJyf5vyvJ4G7Cgq-9tKxYT_PIFMqO2-Ecy4iUUUJoE9QGGuC8h_-MZDK7ceDImIPQ9m0NPc3srBavwwoRDC_M0PfIdXjciMMLzi7LUM8ORrzRT0BBwyeNcjD8KsD9Es99xVhXVfdH4tBCN_fdR91gMlPoV3fB-tqbYpORxUbiQhTkdGKC_ieRkrmtnr4cx_keuJgDFakydvFJbfh3OVmUPqXz3a7HxxxXQKLdxxAlBh2Twe-hxEI_dNjgM3DbWBmjeXZIQipt47RTbUMxZfuYP9-UW5GygqZzkfyc5EAE0yrpHaCygmQ8lHfWuk5gNYljcMTxbFu0mooIac2GxTmWtw6DPc9IKIQto0Yn2YAwS6WiGsYzlAy3ZOUPeuQY1sJfi80q-iDDfTMAeo0oHOCUef6fMSIXZAHKCJrkjy4b-z2ip9tw52hVbmQQWU6cKGhr3lhJjgjRmX0x6upF7wY6NT2U9yRiZqdQKKUUXcqr5rK2Mx2NCPhtGfTRQVb1BoG5gXyYElIwS0NVUd3XEIp_--O4XxPmYwcaB99jeAZujy2SPXZy4TYOMqpl1d8j7iJKJHVzTRyRJ3r8BLwQkg0XSkrF4DsVlW2ZTClLfIqugOTqQd7SBwgaGRsv9XOyo_scktwK7_N1lr2taUW7DC20r2Qf-uik8LvoHN6hQuOkjoPeQOa7g2ILtM7hvTqc0RmIi7agCG5bnqF2wq3cwCRbqHmBAdSMqSbNBc_t1cV8fT-vTm9vR8aeGhsTyiy0vREU4LcClskVYhux89Fa_8rrpzRV1Csn384p4eELuTLZNOU2QHM8UYmbrG_HOQtFPtPYqvpA7YimuWUT-dFWjcZivYaiVBsxdojsSJdrHPCySgS1eloJiBLVlWY0VISdOrbRRmwZw82RtrhMVkJUVN9-1iwqM9QCojI8q6KBhSw5Ap7ITBJprDEKHkXedf7a8HMu1rEP0un9E05QQ6MKU6v0wJDx6XDAirOZwQPQlcHU3x7ca4OLJAZmTotlC8LSwS88tjIu_2YX_xtRO7g=w1365-h953',
        descripcion: 'Arma tu tripack de ropa infantil niña 2 polos + chavito',
        precioanterior: 's/ 50.00',
        precioactual: 'S/ 35.00',
        link: 'https://api.whatsapp.com/send/?phone=984003557&text&type=phone_number&app_absent=1'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_GO8mO1qdJW7XnCFCu9LZfdPwCYmHLock9VA2YNDJ9-iOgYw3znFia_GjtQyLSPH1dEnxE2zzItIu3Mr-6Fb3dzpt6BccsOghTNf-UIYBqOkR57toGJ-xS7E86XP3IM4ShuL8iT08aDJE_S0Fp48Ve_x2z0jX_-SHNqMhckdJuhvfjcT1gD9jWYN5quz8DFfUM2phWGDDnV0UAo84cufbC-YdRZ6FDqn50qTcw-b54Ha0eGDv8f4y_qwyD6dxh4f0AE7k5v-WBPd-vjeIWIy5SNAwRSMLNwNYiy6nobzLMW8stNDpdXY3q0e5nm8REpn-FR5BoUr9H3ceVLvllSPeL467s5DsBPp27PiPI1XB_2cVe7GMTxB000mfDo3Y7wiAr7GUZf_HiEmdE5rAuYmmYBYNrUk0b1aQVvQbiH3y_CYATuz9AZQpfnT2tTG_irRr4vYw2GtYVAcz4oBtTFMIMIU6ehA30Nv42q7UbtK6u0RSfpaP-U2A-1-U2pZug7gSRtVFhgqc_r9SkJ5A-oIwLm4_lifmiw_h671WWf-NIHPnnb9YlEz-8qQG9yGSMtSonZUUuHWWwOhA7jtxLfAHmbVSyXhbvDeI1KFudsQCbZdVBNWWts18v_0q8-WA6whNFyugppHacMaYCxBK8ZlK7IZ1PEqMbwbR9Q5hrGHIMVEulJBjI3emrmMm_WRCdejX9z2pueI3VVB9XCdnwwlWtLZNJ4yvzoJidA22N8DgX6sqT-z0yEhjB7uDtvo2lisqhIek5tpbDCbFk6ULfMqsqDG2RFpmgOyKWSFgFIbfCEowx4bz7hHtINpRs7XFg6GrVE8UrkCgU-y-UUSk0ZjO7uWjXD3KgMbFhzTlWC9_Kqs-0y0VKg7c1o1rUl1KeYORE8w3K2cx_0zKYSWQSzr8b4sQdPj7_WPdiXINjXYqBKEFrwYUgIdZPDDoLXcdivnJgyB4pKzPjX0G2cLSo6LoQYYFsCguzYJHOnO0m7eXACXrap0G8oLS60kPrS-RBQR6M7feCfsOGPOxb8opA9H_SkQAmjCOpwddzKqceiXcbmzVH5eb9Ru8IA-b4qcgZe3Ot391M10fVza45VKOVbcWq7F6g51jdRZuN044nDY1HUKpUtrW6c_O_yNEyMVei6b5WJ4psDYGCtpAyO279E0gHJx6avNBqlGRnPgMmWOoyDivZcTtNhAmiRedG6loGqYaXVrBcDYR7TLRaFDSZjx8AHUvA_U3E-rE6EKTiN63aUQJcH2c7bTQf4x1xeoyTZ40Nr40mKxmZdD2BUdofqqB0I_LcEgn226N_6n1vOo2gZR1ubf8J23GxnywzjhAM-wEmb_DfDZdDFPLHpiAbHF0OoE8LBJPHINGw7HbXG9ayULDsgALeyhWYYW80hIcgxa--jnvKQlVbVEfaP9AhjFrqSqxHZxImUw9KFLTRQJXAFRrbV72PR4rriLUjTTlb0UEE9U-DCy_m7uM5V_KcCuQcH8dMG4V13FGazsnzYyPzGfKRnNDUnEuhcf0NIyK8t1DLPqOtUATv3nlVEJFoY1G5pZ8f7fzrYAYej0anUvUuUf8SvvKMF-mB4U6EKjYh5OMrEPNbS01TPVpn52Q=w1920-h953',
        descripcion: 'Polos infantil 100% algodón',
        precioanterior: 's/ 22.00',
        precioactual: 'S/ 12.00',
        link: 'https://api.whatsapp.com/send/?phone=984003557&text&type=phone_number&app_absent=2'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_ElGvcltIpxywkuRLRdPPVEwcAMCDikmtpisX_MZ35d184sGyamm0qXy8VQAdoUnqWUPME1JMKQUy35er-vAhAQpH4wOXvgVO5CcwaGlaKkFmVKYo5MoXjtH8Pk6n0Ul8OQDhOxIG_sYG-Egu3aAe0ZnetzsoE5OSrMcXKL7qO5ZIrrJpEQu3FufTB0iUKFuYibXEre6qQGfH5Mg3CpI6M-LaDIMft6RH1NRVRkHHIAZhgyeC2jq3IGzYnCJ3ByIO6Zodd4JlTdFXm3pqt9GPn2NLX2a0ksFfQNQb9wAazPfnvufeiYe6oLGzZ-xjA16RCjC9VjJ3ReabB0tYDqxjzgUCH52NEPbAPXGDfVqCNJ1bmwcEelt2eIANjwY3B8g6rZmZcAX8YlFJmcbUOtDBxdzHjnm4XIhZZwf04BNhlmQ0wacRujt-06nz9nbQCXBM36_hsla5fFxlsZIKtwhj336KviQR6O6kN1ZL98UHzbemLG_iu3sumZmoUTZvRBTl07nHYRE-GHJySMpxXeD8LKy_d07XFrj5gryLvsEGprr3G0tWo4FrT1fJ52H9Rrjj42RZ3ChAlHL6kIqvBXExbzLY45LgPqhYX1f-6c3GpD0xKJvPy_AmnIVnJUM-OI_l6Nb81CxLNy8tll945-MFMfD2rB6b1tsILAtwn27N6Sa22QKS2izaJiRyLt1v-0zTIJD-R0PplWiYeIwl-jm37WW3H_SwFhfgedGotXLokXSLFnvfR2P73QTTG3dQOfVdxAJR7PlZqOrcM3nFBezg_q9FWN1KTzZ3JU_oJnnRRjeT2CZ29UXZZwT6xV-Xeqv5XeYOYRWuu3oZpILIgNBywpLlugQMSmdUBwEHmOk0nY2vs92gh2WM9hhr_s3s9Ry2cFDNlDo5MYnSJVxZjs1kDAugjaLHj1j4k-mlHCniySIj06OWzl6hLobzatsAvSBvEXwTTkPwiAAcH-SgEfftEyzYDxGK9-Qg04iFiQPWDqn5VgO_TqseElBIVl-AOZC3JGMVOWNoC9cVcSEKHD-Ik7YJVpuKZA0a_OOSyPOBladi3Bvzvo2ge2o4tmFHQjkZjf1uu3Z1o2y2tVR1aaUKMnC-A1Zf330aYfJQHKArRHOQ5h0Tn0GUZ4O5I0EEe3XEcTroGSrFrtorYLRcvNEld80KLxHldds8Cveho3Db0ZRZEqyMv0qEVmcfwjzEmQhwt9nZM-kg7RInlPLMEuWzjqRSbwAriocll6h-Reo_wYf-UJkpbvpe5tCbIgyyUMqOyhiuTU5wT7IyxqHUUtrGmxIExEfFKOOQgwt-ELDlqcxHrKoVeBIUmeMR6dyjJtVOk8yPWFATfAbaEfGHwmc4u2mA5-wheaOpNESGbuuW8-9auUO4sq3Br-e0tyPUle-d7ZstzCbG0M7enjXi8gfHR5Dxzeb7SPk6sbzLdKAmEOUk0AYZwDTC3Yh5lh_cNGYUJDTLzwFL01zHiusjjio1hEZyWF5nKZ3F_7uUAeNJ8W-f_82eUWEcs9nSlZMBRfryhVNoGr0vOz8_UtszJx3ibQ_oDt3VscEFjjGfclcFWRL44lMHW1ZxfkpTK4EGqaeBZF1mlDSNh4Z4XG_w=w1920-h953',
        descripcion: 'Polos infantil 100% algodón con bolsillos',
        precioanterior: 's/ 30.00',
        precioactual: 'S/ 20.00',
        link: 'https://api.whatsapp.com/send/?phone=984003557&text&type=phone_number&app_absent=2'
      }
    ]
  },
  {
    marca_id: 37,
    titulo: 'DIMAR´S',
    productos: [
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_HV7V91LYLi0iVTpxG2OAK8fByc9dCAfuiTJhP8r6rYVFX92TRCoa_ncWVX28wjUginsNpXz-PYqq1U4DleJVEpJSBvGSeYUS2b_BTiccO5aQd-Q7j3EMRFtTs-TxGroEvYUBYWwT8TdYs62Y9zUDuR3UCYr-lAercxLh4v2LEBAVuwRHt1kn2Q_-m38Dt1qFwFAnTiC41YNvzO40-vyHWwHn0Cj98OulkZQK-P1YqqobVZ-qLtlzJeEUKFv1TjkJQ5uMToKmjUbhYCjZqOBaZvc_g8Ycpf37muIGJ5HQ2tfobWP6PHSE5F74GCJZfhg2DsD8whRIRfZ2M6nvWnl_cvfDuyvketfq6cJn1pJio7RRpanK9so085fqHQcJ71WApAFSetapR_amfHpZ0QDN3Wg9_ytR4zsWCT5NH2qVSYlY9_arkIY95RPxx0M9wGdcMqp9GZU-_hpst2v-d9Jh5ZHI_ncsxKc2CCwzKWyTbfGi88l9581ImcHSs2-fGfGmterBEH0xLRZiVrLdtxe2-Vbldo06rz4dG5fGmgJcBDGNa6DyYj6DRi6VptOjwMj0-erpUhPScQsNJiuNeCImsXazm1gKXhoEr8d4QXt6ifRSugWCTifHzZYIV50EwokVzHBBYsD0zFwp2oe9f3EDssrYRV-2Zsau53XuED9xLcC4xvxZgJ9K1I_nQRQyXsjhJRNrx4p7nF2E1Mmv3SpitsA6abugxkgk6OdbUPnoH4RPGhVvWFCKoo7erch6MsYEst_iWd_YlmVcDiY5ZfN6sLOny4_qQafc7YR6hiLrj4doZdYrub6yskgwxD8d2EpOyzw32grdoUx0vh-8GhDWN4uXsWGMhZJNrRv2ZH19tc985Lh2W_TbcWe0hU5uy2wlVcZ4lCRB8qx8YcRT0T6qRgyW-grP4w50EEnH_v6wKG5kB744AWB7D1DEG6f9DQtHSSnoXV-esKP3bNUmfD0YWpeTKZNtpZ15XgxF1UsOOdKvzfQrjSSV5gDjtovFf6wmKOsMdpXW3LgSdM75PN4DnEDoh6PtLCS04QM19J_dk8L0_uy0HE334vn7hiKnWTxc5YnUi3S8sQRmjuO_5dqJyQpnYFxncwx2_4AlmR8rlZdEygtCOxIRnkhRidmk615booHOukoK-ff_AW-R0I2w2RPQ3hfuY77Gxgdc2YkVeXrTXWO4IQfk0iGLjikVh6H4xvrufSng5CEEK_me_6zS5YZBO4rnprb5fqH_h1A31ZMbx_3U_WjVyua3uPS_vs5VzMbDghe-nQhYDyW7O-TgsX4HNxnKT4f4gKFR0S-8YXEBKymVxgDo4J1xK8eFm6IZCKkcnZ0CvvxxvOdZRzqXuvcTPtGbS0ZMMSO9KHVvehQn7XI4eZV3ja3de-4mvlvCUZ4xTn1lc5YkKU363_oJZC7ja9LBFCqKel67txqRmTKzlTfB8fexg04J6jHAr18blOt4SV7YPGB3zkaGoLblmRq8YrRn9o8r8PghsHSSN7CyoA2emT9_KMi7tmHcPNDzYqF3l4osORShDj6-ZBOk3RTehW5_jNbTGBUs6Nrgt4-bMbZTznxWg6AL1EnS3sDnnEHxJxNsKPwLM=w1920-h953',
        descripcion: 'Estilo duradero: Zapatos de cuero con envío gratis',
        precioanterior: 's/ 160.00',
        precioactual: 'S/ 90.00',
        link: 'https://api.whatsapp.com/send/?phone=951370029&text&type=phone_number&app_absent=0'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_H5GcV9s2PMemO8qcuffIUTBujaTRQvUaxEarMgiGqt7myQ394duEAVB4BeWOyzldINmpBH7Np4Mq7SVT7U0k5hdDkX5MocN0Ve8bAvqmtM6iAUHU1MeBxZjG-Rup5esrzi6V8vJXNe7rkQ9a-E_v_V7BIeQG9FG0bCFe_KhtBwochTstBejixWFBIar7rAOJi1tW9VWYGmPuaJlZwH3KrchGR3HrHQoCJIbXS-I3yymHP48wrWKs823_eeH2lh0rfneeaMwlekzxF78lsHvh8X80CTmza1dfQCOS4Sq-gkEs8fdQViPPhf6mzO4A5L5jdQ9gv_qVN5KyXGwpuutgD-OYIcu12MoV4t-4hf9CtKz0FThcK5mku4-4W0g4ItsEWnTyfUeFY5zBo4QAsYPqvHHaQ1A5BKuE7XNeN_PAh-LFw1y6Tn78aTK6MSFPO8ScBfUf015_6_JzMj_kMDyQjlWqWIbHZ-6yRNK7EIZdrQ6nIBj4UaEgk4TIOf165gwYjlTd99C-ToHAd29jl-j27ACnDIQ4IGwOwV7KGqHgA3KMxirl8k18k4XoWsVv_e4Ylx4VNdx1-VnzLCssFWzGG9gwrDS6vQBscU8SkalhuW9S7vegFp3Jp7bcbb3DwfSU26axcTzbcng6qig454IgmZsa9UwK7yGDXacKfkAGparNcXd3Oo_AihTHKGIqMYXgxJhlqyMQstNlBD7QCCeimcGa3McpekR6JxM4A2tHPRa1-IIpYd2vULUWjM457Ib6DjBkEPqEakDws1wbNBNExH6HF_NN_KaX8DC1M2WztdNehE8F260GqAre8MYLLCXABmmFlqWL5IXSmwsFXfnNev8LJzJCGk_iaOKJxhMOCbtShB4pHS6qf6VQ5VZGCeptoXiWfeTfNbkzbq4BADeu4fYnB2cK46fK38iB08HZu2rr73repZBfIzDgn_GmvvB2aDj3hZc_8NDyJadVsU9U5NWC70X6pYh5pUUbd4T-yuW1WNHSqCDBOwPdykq4SJOXlLR2fe1rwXMzESFG5KliDn0VCxKWC8Al06hek1c4f5oFRNe_wfGFTRg92y_9zsPIImwvjeZLT6U09Zq1SqUF99a-rumbnM_cmkUlgh0iIsU9yqQlgUeX6X1kDK-OVEwX8ggEwc9w4I6stIqDa5mdBN99HGiXuuI3luMDyb1MGvfWc6ws6R-HbQ8pODCynZWSIuiqcRbJ2mGmqD9oF4qdTd4m3x-fo7Ti0PxREA47rdVe_8WSauFVbhR39Lqnt0p_KuNsh4oWzUge7ooNvPsrSqmLoNQhifpapGC49u_CxLSMlmYBvpQ1E_Vh8FAqJeLqapNOeOZDojII7Y0uelXa1JEE5CUGO30yAtYkovrcP1HhMYjtyRBPl9jbR2Evx7SU2R-Ja2aw_DgJFgFhRwGyWDQD2FOlBGeEkATL8wM0C44_NGlnWiH0kzFTPjLYE-cXANMaDPqe4SbxI3IaaklY0pCEDK2MCqqk4wiVwoqcmbqbH2j7XKmcqKY6j_z2iQAHCmwyAcApw5kSpt5y-BXSip-j-9OcAIQ2NXE4AwuiaJUDLIgyVIRfLYKwDBnvhEQs6s8SRueoNj9kCz0A=w1365-h953',
        descripcion: 'Estilo duradero: Zapatos de cuero con envío gratis',
        precioanterior: 's/ 140.00',
        precioactual: 'S/ 80.00',
        link: 'https://api.whatsapp.com/send/?phone=951370029&text&type=phone_number&app_absent=1'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_EiukAK5ODZvMhxhSF3V0lA6pnXaBEs5xeHyBjYloEejNZv-USvbfJ9hFXW3cGOrzLwt88HYyzLDEUgOYvuaOk1g3xF11d_snjWflyVrdHQeuYxt7IWITXiWadE--9U7eNOukqGq1kFpHUve6TQgKbAqxLgGfwwF7gijeEohvzrx9hjIXKRZ63tmlPMAPfqvuExZJF2rymc-JOhQbV5QeCzc3-Pocaun1SQxRv8tgNlZ_nsY6B505fS5As9zdunZjmNRxWR_0v9Cb56MKPeB38ZOPl4Z7Ybc6PD2rvBJlQoseJQfOmcGVAVD6XoxPYvpSXNRamTVTA7-2gocuhMcYfuRQ6lQbzeC6dk6_XQ79ArwGIesh4jMm28PIj7HIidY0cMbNr6ZmodtaX4qGu1BfZTnmyNymdxlgnTPYL9bHXVQV_3AD0qofvr0rUq2AStZboFAmORWWt2LODfJSftOH93fGP6Jmp-3eEh4NH0dvjacLFfiAqmQa2d3geffIl4O5XP7h3GY-sbR3ltDQHG6FHXTjxyEIEn90NGRTI_7RHD_gI7xRHurwuBgtO4wCcl1aKo6Iyg2lNo9aAPxUoFvlzR2QsdNc8DbrUt7GAiqFQFXSQHyQdYtXGZv-tG9Vji_gFW_9yDdpwGyTyCSxglNlqQjWdEDJ58vQcqa5NPMLpbRATotJMNGPXos2eD62jppU_AreVNMVNONRDc9aFiPzGXM4MXxx7qckkgUl0ttkkK03RwxuL3-Bb8ZtgxHnWwVgdzd-MBugLVHdbQDK2NUp3Xepr-T_mFhUUbiIJE0HHv8nJ8aOL5GMWYJ7dTMTiVhPyOD8sa7PGzxWr3KSEmVrrHLm7-Schl1zVs9Had_8zvMjtc27fVePPOOm8S711PC5X6yiZpUfK-Tnz_JE21mZbgNZWqqbcphYDTHgtrlU5mDY-v-Ei43k2SYgn_LiHIKYC-o0UaimbqUCUSuOaLH1g4PZxTTF3R_ix6tapRX7rC_OTIXIrz4zOAT-BvYV3-DBIOAb_JCVlIHPGbjWLARJe9tTosG0KU0Mgw_4SIZTWlgCNziq3hrIesoa_8Wcy6P_tk8DpqxDQQi-g2uEX27FZdcYlfrA-SGC8nvXf7JKHOqqMgg69XmPwCH-nTCqlqdsNoavgcAjCVXm373UFG4b8XmQsvfv3m8x-w57ASNufkOXe08rjN3rVdjqXOOLVA_i_ycJclajXep2uNp35BIu7IiqjGVSmNZ1_5K2sqVMqqf6Speu0qmbTcgcAeLPL58iozGbB_KA0X01NKn17VBVxcT3aNlR64t2x2tlHvbrL7AJhs_77lKTCT42C9E02iNRPv6CsGwErDP5LzTlGPxjRIV2qIPln0ioT9kYSZnSzHyMFWdewhn7oJUS23ClhPP4z8AS0esPqkKT8eBpj5gOgfTQ6XZD7CEaZzNBjS4tkKTZ3QVrozTL8q6c93dyemdlUzzT_OrpfD0fcMarVMWbakRwxCoQiqt41itVa_r3xZ-oxzk6aIIpU8qvawDdo26UYEasULLkFL4KEEd2QaOFU_MO_FVHxGDeannvHOgjF9degg4-DmecuEFSNu-BwbjrnZT2hyRQFCMf4=w1920-h953',
        descripcion: 'Estilo duradero: Zapatos de cuero con envío gratis',
        precioanterior: 's/ 150.00',
        precioactual: 'S/ 85.00',
        link: 'https://api.whatsapp.com/send/?phone=951370029&text&type=phone_number&app_absent=2'
      }
    ]
  },
  {
    marca_id: 31,
    titulo: 'Chocolate Sojhadi',
    productos: [
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_Gd6O5SuYzwNW0_ljrdb33IrLdmL2rdKu7SsmiYPtreQcoqogqHOCzveGdpV5HeGkRpRUOluB-VtjHrtp30FRUFw2RuLuoePqitxPJ8SV2D1OU48HN__547it3718gwnkjGVzySfj6I6lcQVZSi6d1mvxrzKUUrMSoSPF9o88MaeGtlme_YUbG5uZBg3ltOn1O3ZqYg3czdo62b2KryXsrxpagaOyp24nChhO26EkqqyChnzA8s2wUTzkb4B5gM1mkoX_See1nq8jKujycGos778k0u_xv4gFwJSv62PnY9x3AQEB0kXaXDvSPxI875CeZmIrIgCOjQRpSS6As6xcUy9B5Uzf0JuDBrBxU8zTMoHgIXONye5DlxdedtC5GxoH7lnEjOgxo-6pPpokPP8ztxwzPFjMgZhIWUL6cUnu_BHXhr_ytissJocZuHWV_MLvU79YG8ka2YVdGmSD9zmliZ63YE6rMTZf3khkwKXHO5ipOtjs9lvAk5pPUa13Wx4HtUnHKzF1AzuNnxGC7c4AD_c8TSt4O5MeQ-qewEQTWXMiaB-iYuzGn68fQv-fyVYBIcQ3dNTdhgsVok6De4ClFc4qp1EfkOa5mYbbYJ3jC_D0iKIXh96W6MiQiS-D4hEpx7gfEdMKae0VbpUDyw-vKdAV1pU6vdmDg4V4B-OE3baOAebKEd6xXUeGyX7CVbpI3-A3OBt0JiY3IiJWOH3CP4o8C-iR-2n57GCFccWt75j-E2OSh6HLyv8ERba-GXvPeCQ0uYBS_Pd76EiLUb4yxzW2u2OzRN9QbeX3rGcb89GDsf87h-_K8JV-n1D0CvxutG9IUo_FgQk1fW1pRt4ondNaoj7ogtWWk-B7JcymYEBCvcQ4p22TTNy9EcbXGbXK5VtJH1sIARR-P7xArFX77lDHXTV9GdZ3mHStxCylyqu5pJ8-LbvyM2T-wdOgsty0t6M_Chz7TLtPD3X0vRO0QvIxIIsx6rsEvUuasr3TidTRbmwXcW_R438b6j1-YBVqKN_NCh091wlsVUSIxWXb09q_6WZCRrHCLBl2JgB5eVnw1uSHEutEVHgcQjbJ--wzOCLRepbDfSAmEXjVfZfbW9WlWukpV7iT2LyGK9syG-7hJ4t3Jtdfzl8KXcBG2QxKb0yYVjcAVHHtAdBbswrkoqexyMs5D9w0Kp2ET5A3ol22BsG7NoF15s8qS5oGqTGldG1I-K1hhEjQ1DK9j933dVVc0A0M9x6x-x7adiVAPk-wiepGSWrRFhJHbofZ3uA7sBkUcjnpmmMQXvvcV_AxIFjLCHm4SEN5NU1WvpT8X5KXexUdcgYIcM2EdoXaR_pjM6qoJEoSVstM5AejMKUSeHJARUO-pGpDHIA2uq0QnytukxkB-BVeBye3OXKMUW__UXO6GXhHWZdhrGKEb3d_V3nt-aWu8vyrC20h6tEGfpayuh0oJKxFzEWmcHuAZpmhKQWhvB7P1tTB7bvI2xveCQSZFF2NFwBN_j-Pb-UZnGlvvsYzvEh-2TLnemu_MY8L9x7oNS6xKeueVC-rNobqnrpyHhynZiyz-nfAJiQ7UZLsvk0co88HflfnhhaBXGcE1QKryusGKmX3FB7w=w1920-h953',
        descripcion: 'Chocolate  de cacao  en barra',
        precioanterior: 's/ 17.00',
        precioactual: 'S/ 15.00',
        link: 'https://api.whatsapp.com/send/?phone=971559901&text&type=phone_number&app_absent=0'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_ECykUK3zd04uyiS9QZm9GnY98w5O7WJgIGEy6Qrq-TD1c9LJ_j9qhaRE5gIJ-i7d5C_CwXLMpFFLt5l6zd1a6sIs7Ao12g-DoWjxpwZ4oz7D5BmRtA6CiQ8i9cabJgEaNeyafhsZXkRbmFgfPGZ5rRAG-ASOpV7sUaUbo4vm0Dhl9HSRbv9Db3fjmmmi6gxZzk1ohJ6ayutzQa7RIJIoRAtJ5IZNxYAg-KLlDZRb_-oaJpj1JlP4pOeJ3vpqFw7ru49H6rvmb29lElY922tLpuUlleNGYvF-1RwYtKolkFBGOggvieUdevjnYHPSGuDZa0J0oHnE6_iNMYgJq-1fLTUr8RO8oxlJPUL-taHtnNeJNQRwN2oWh97xthjGzr6jCPs8WNSsFhO3QcpPkyd5VFQ7aLS7b9bjaoCzJ7QWgVCkOZDmjqQ1SAWUsJmJYVYwZmqs-VZaQGa13AafJMYTgky_gxtpOumWHE4Auyn0UC4G9R_mzR6sBWxDxVzl09tOhosVVoiqlnRmFiu9BXXOcVkfMiuRuMV5O_Cwj3zAcYpLgkSmJd4BlgHJ2bsVHEwc5cYiIwjmUOhLKevJwFfYc1T5ThldwccuxRweaNWh2i-0EY1S8vWFPjtrIsAB-FMlSp4Ocosm8ZSGdH_2WTBdiWklhssN94cvrUvAfv40NEt0gx6Nb2hddhU6jhCKZ17wYUBf5ONGn2Xc19Egk_nfQ08WWMD2c-aM5ZcLMsYaaJBcFPIHO1chYSEhl_qxocet6qqM87yOmgHhwGZOmAByn0PfUYnf3kFacQvT--0a6qYBVj8bSTSkqgVpP3gxwqNqt8tXX1h4JmJcHJsKojmynQohgjI0SUzzTvDOK1AqjHu-NnvIcT2MoWsQbhg4z26Iyq2edve_YZ45KWKFJ0mUqui7L6s1R8m9aaXhhnKfkMoo-ZoBLbPOxSiy73ZhncSGCYPZpAjZB80r-lWxBFUDAexs6GWUs93Ur8vmphNy_pRMcAFd9vO1nyXPWaWlRZzHjTdbPdx9jPVuiFuFtgaq1JlDPITRb6O6tdXHmbkiEpaJ33w2Qj8TN062SovnaTvpJm7ToBqcVv3rdnIs8EsnakwU3oSg5h6m4A59lPR9BEHY-AdEqb0DLQHiSBF5e5Y6QtmDQh6cQWXVItNPdyhZuqYwRCbQUv_Qlqe6qL0Rk4WBVROxDfMACPnRTPthsGtcUlK6UjcOoFJOoTdJVACqaPIz8bnpUmEwjzIENb8tMerrp6PzuIGpYSlZsrNTksL_QU9ycNfWX75Sls6BsiU5dyk6muLS3QFj6SV6vLX6W25XhKAuRIdYxRssEDhuqnTBsq11asQ7USrbHdq6eBW_EOMrPyKFLtUGzZTfqeOgjOaROaQcxJMX2eBs3TE_vr_ENZpUCUhznZPqF5B0_btosM6Uh6r3oNqHOeo7Ux_96npA7N8gU0aG8B8a6Lbcqff7DDnX50MaCbRacnIsiVFo59GPm99M_DtIRdDfRwcH3_njwmZcnpTGC1Sfmj3ZaJ8i9U-gVRTkr16ZSlSjlw_VAIIHteJED6YeTx3AkVNwO38HXoKnGGZ0EBLdaBCmz0ZApyCRduvje4GIlbxA=w1920-h953',
        descripcion: 'Chocolate  de cacao  en barra',
        precioanterior: 's/ 12.00',
        precioactual: 'S/ 10.00',
        link: 'https://api.whatsapp.com/send/?phone=971559901&text&type=phone_number&app_absent=1'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_Hqt_pzzIYfrHjwvROmoqXgs082e3qnGvbWUq27QN0lICRY0n33LI-HWpsf1ihQR64CWHHx0dvA_rl6Aj1N1MUP117rOlU9wGlOjBLcHf5fp5tRa5y32FjE4gOmM90mCMl3o89AtZPKnPqbTuOyTzKewNFdpXbJOfvnhLjo_v8VZT4w0ySRgoDgt0kiCh2b1lJGoPkJ4E69GWhlmBTPzcoZc73o6ZZ4_6mjo5riJG9vMxhmFLPrFp2IsDjmFHHO2ls2TR3vjEZprutt4X0JBnE-j2o2kVdp5OFq492vTWuWlNDaAkur6fLwwE7T3HB9ux6-RDOEauj92iCkIKjSnMJfCnkWQtCZkXvaH3Egp2KSfjud3IdFxIqFZv2jZkmGtS7U26_FsrS2PC00Y6SqdO24Bs3iY08-a3XsN7V88OSLzEkwyU9DmslNzW2uXEdWQdmPKFpCibGdosTTUCf7mPdvKQpsUTcYyP7wAVNz4CXFszr6LtGZtV73CvvMBvYvQdUrQrBNxQD9VY7hOhpRP_wYHjuQjQorQrFi2QEcIyGsos11SUtomJPVvjJB9tv1c5ep0r8XsVyxVRQBmYlQGVHrL1yVmD6oKvDuulnyqP_wnILR3IM1lQ_yMurXuhp21eXe4PIuEDUkF20jFNCtwxOcu3-qcn7YGU2cVwXHixWjV4g6H3gER7oGe_K9ZUJAJOZQqmwSZgcGnYHMhuKREBpoXWObOtP5h9HdnZxRPdgoA7luVYvdQUBUBaBQzcB6OPkJSgv1a1WylJ04se_SlFZqsxUDbeMyYeOKelzDzTNvcypR_FhalOk3XtuLKx4N-WLSFAEVUtP97a25LOrwC_8_A8kWIBHY1mOJh-7rHBIhlq9cRm8BjBXCkStN0cItkzRZj085kXXwaIE1xNH8BZV10Rxu5m03IdYleURQJC0u4bFucrMgfw01AIssrWNhRzfk6PFtyOdmG9WrcpOPbbatJTqHcGtWiL7doldFwLp_r1Io775UQTw78ZSJjJ_fIspNcRkno_WuMr6mjFMwk0iKhKEiqyjJYZWMidv7W7F2q8Y-nNdpnWY8nL03GGCipf18RBZAjlqqGJeLan8yaNBIE8wDdqfUUSz5xqrn91WsBqzhruErL1Er_854GPg4FjQDp2vDM8rpfu7pc1a1Ihjb_kOj_AmuT0skPZTziTUTvGDR4qygwGh-TeIddbAHNGsk4rIe3TYrMvkHCDoaGInY_Vu1vypV4SbnUborKuFnEyMiHQrqXhsFZN5UH3dtkWxfGb2Ul4_GgdJi1GxjR43xZrkdv6n0y8_I2fTtPJAVbo65zF2GdfEawBDCZm5EJoazh0bLoP_4q-l8SpJhDCdsdmyiTiWagTxuJRhgC4mQXKSeC2D-XhbWOV6Y0EUXP_Qh7TOxZGESnva2BqHAyjZANQ5JqmpMAhBc9S0Ha3pbho0d11DjTVYhXsVgeUBudeNunaNa2KRFGKUP_u-KX_X2RPyL8ADO74oevjwtuRAmMsT508kADOfptoS97NjJTE922SwjcBqGur8H9u36-dqTbOgd7-6E32IT0R8Ko-nTAJEsOpi7zNet-rHHrx63gzR1ZfOVCVMHTAY=w1920-h953',
        descripcion: 'Chocolate  de cacao  en barra',
        precioanterior: 's/ 15.00',
        precioactual: 'S/ 12.00',
        link: 'https://api.whatsapp.com/send/?phone=971559901&text&type=phone_number&app_absent=2'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_FGn6F5cDEA6Muy2YkIBUGcd8Pw0LTCU7yHY7yWEz5ijC9xw0KVWzCTFmmVL6SOEA5WG2nXop6ymhIYjADVAlKEKGhOQK0aTMTfF_l-MeKGhZ6POqknQjKGnkiaNBI0Sn0nw0clPOXx2MeO7J5cOveGd6mbIvOHMKyqrmlhL5jjzfUHmHpkIkNiGXqJ3bj7eWzIvpn7qv8BGtAQiP7_sN7fAd3-U5CD_p7ZSkyX-JHAm92rY38I_asfpSy7D2c9h4eGUMPDMJBE1bMJ-bWNrql-pmzs-Nv8lSgXvefD_iq10SlUkagqCAXAV4AwGgdHJhI8VHhgxz9JJGq7p_w1ld_hXKRvU3ckr8-qhZM05-b2Ngu_hMKu20xl_lLM-Wx6xdTyvlF7zOe6C6t5BgwtsgMzyeRhsCXdUKXYPvcP51zOqaiICCS5yNwpDYlUi6S9qnKgIFrziCT5hpn5UznLPcCw96s_HX0c8Rlyf2gnmHWACKtotGpNN3yfINJm_hsAvNL3ESD0Vf4CDmVePbi1qNmSSxn0peiVyBb1MYl59st0dM5pLce8tACbWruYMH19Js5pEycsahi0BjGnrkAGB1DI8pkWbD4VlU4raqkUvAVpAZo3B-vsKsjTTJU6EkgHKAyuk4VKpzrqUtpeTCEviAdsYwpUddDE1cbhAr86HMK8NlFGhpr6KJraPFU5DNkefRG3A3Li7JhyQHfeDbWqc2VSyeOuYqv_wfa-kiMqMkCEDPqHezS-JYbrLiA2HkNqahvRAb_I4UOD3H5txiNNFYDN00QEXKvyGgN4G5-BLP2uLmHtzfv5V3TFMFttj0IcV0ljhpfArKbfX3VQp3pRT-G3lv3dX_LXJDjnCPBRZr0_T-sZFvZmsR25sHevGq9Fs_zhgKVrkB4WAeaKUFteQlL2V4YVETNc1HzBbkjT0k9uuLKHR24UA7DhBwBbQtsAcZ780tYOcezwSPYEldi2Sx85Sy0X3WImbGTVAC6G5jmwVMfRJAcYF0ty1B7T4VCZlmUJUsEeowN1BSjc3ppgOlBq2fDqlnMkmgLoJfxDa62Jad3O89mNXgMy5iJ3gyc93aLkaQXyYkmwDUcJFQZt_ZHX-KuaDajInI_c8BWIKap8KkILIXZ_BanglXEGugQks3rNp8E5gUTfSxAITPrGIybbfLGbrcil2X8yetATNWURPR4l19L9IWM0wlF4-WMC0mZ6Wdqh52A_kcJ5t6DgQ4fI2AU4P3QkBP6CGD5EdSEEYLparuMLEtSli2169FCpGC3AYjIXtdkv04nDEMTxB9tEsH7H7s4rHWCVbajjkrxBTZvkjWvJHG8BPcy74Jj__JW_g3XGD6pbKyIC3atkeBLlQUCT5Hpb2473lnSaos7eQUQWKRMFfP4LR5vgXMiUyHZVdBdO77h572crcr53tPy8JYcXzBTi4Wl3UOMSfxXyRodsyQKcwBNv77cAWW0Pn85jU2R2zjMMN9vsxBNBUWv8ouPqCz0DphGNU5MYB2Fwau55K_LuA-O1MfvfaHuufOof7DMGDLzlgZVpoHy7TIyZPN0zPeXOvAavLKvlJfJ7iSrRjuI7eCO2HGNXg9b77lvbsawrOSshTpgU6A=w1920-h953',
        descripcion: 'Pasta de cacao 100%',
        precioanterior: 's/ 59.00',
        precioactual: 'S/ 56.00',
        link: 'https://api.whatsapp.com/send/?phone=971559901&text&type=phone_number&app_absent=3'
      }
    ]
  },
  {
    marca_id: 32,
    titulo: 'Hidrobee',
    productos: [
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_HL1ym8FpkKYd1CTj0DQqzCixpNJMRFCyjGmVyUPvvnVABpCeHseHI3J4eAHkhkSwtTPfMcgGHwAZUoZ6EzNbi33Xe7cTbINO2h9AKCdqmtCLELDGf22zggS1nkZV2CPhPE3z_0Wvy1_xUvU-oRP5iQFJe8PkwzqLgwmIIGMx_fUBX8C55wxqunaXQXdX3XXP6CWA96v6TBOph51QNNpFQbLdgfwqlVnmx8EVC9hH_Ehjq1GJ3iBH6tz-rsLlWA911VWbkvcNrnd2-QPp9WEe-qVWyHRsb8n2NLy51DWtOMNV2rGSuFNtNwPWxsjdqlZHKciQFcmIWTQtxGnzHJlAYhzF5sT0nHthNrZ6NiLlwC7r954zoA7V3eo1UVMCR998bNCufZPHHccTPIBkbbkJV4huJSlJQ2R2g7YclQJz4-LwyC2a3-NLZuzpM5mU9EUA2fgRMeBcLDoxEptJrmcUwKGOrYuyJ1tV-bMsLR3n4DvRzHUYUfz4cyJ0VDx60m92GsYABuFRJLf4R5lnfLEMCSlEIK6_QtFT5sdowtsyBHD-dbSqQP3aDrnkzAWuoQBdtsKGLWwXddGYfkOGK9je7yNiBgy8EhdowPWUVSpDAZU2pNCH_44wDXSx_Jre3dgeYvK9ljniez9xJHurfrbJresmoruLOiAwDd4YBphLalOuQt1OOVGL2DirfYDpv0am0G3CK3NOvKBHB0u-MKvXIYN6lXWPqF3T1N5uaJsGvglN9bK2IXdCpfnlKTpWLVbHxs2UbZjbcqLD8M2XEKAcseaeRsaAl2fnBWHn8u0ZuQYPLQb3pO8O-FR0wFxO8qU2N_2nw3GR4QDDf2insAg7sBhOMBSbllKhq6yiddJzFwFrXG2BRtl5njfCFSKJ_l2gONaZU53hq8AcdwfWEQTJt2ak---LicQdXFA6rJwSDSik1M4X5E9Xd-0X9awWH2JuauglsMb44rvGfLj5Zy0hapK81tDeIOJ-DBsozRWXf4oqF2fCvG-9jnervr1DN9VNpsttM7pmNTUSwtK6aDFyXJuyBWB_yLXxtaUhB30DMzTR3-OmEXWcuCnKvHEIBz_i4FKvbYSEPfwTrJyW-2qAYX8QSO3yk1pFWoDwmScj2Fj_NZkeNAup5uEJKRdXP0C72U4uCPJd22qiadXok2od0QGZmur5to6luIvrnEywXjAxF5Y2yeOHCLkuUzQ8Z7-bM74OxwrLF-mjCpuhAt1BJnQ7a8bDrAycc5igzm8YJGUKLSsPq2Z_vS_DF0WU0ibWLOX_kkhh9KrEWKHBUxPxmRyy9VFEFWKhVTpBP-EUflKN-DRACgykEP1FV45ni2A832BK2btCOTkCFI7aRFPfE4DeFZDfNOeGmKWC2kNnLe0vDpCB1O9C26HCexoJC6z6kn6WMboYQW7O9FaJXqW3edOZmf97bVM3aRHiu3RTA0cNEofnr9Bb31igG5pEGu26JIOSM0u1Z3euxv2aY8Yqao-jwrmfmjdEXNaVvhQLx145xesQZ2hbC79yOwz5FIN4WNbXWStaIJc7Cb7-G9mlFo5iT7V8RWdMwa2FAWdA2xi6nMzN6gMJLg9eGKqXfTQ2m-OKsfTXid-1U=w1920-h953',
        descripcion: 'Licor de Maiz Morado',
        precioanterior: 's/ 20.00',
        precioactual: 'S/ 15.00',
        link: 'https://api.whatsapp.com/send/?phone=990071436&text&type=phone_number&app_absent=0'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_GGLcc87EQeCSz9MtNlxaUD0t1dFRtCaMc2J3sLxmX67WD3z50fCiGN6nffTkq2YwEfrSugGkTBzfhVb_dRo7q3y934crKVw0QDgiZhFWDXcZ8I1Eh_l6hZ2asA9NztUsD9KGTKUB6jcs1IvTt45XL_w7P0ovhGSEwAI6f0QI9zorxqckoS4hgNFxgJXaxt2JSV5173NSS3sfSch7Y8iXwWzM9Zf4I4CvXx6isyIUJTuvVvWXaSQT4rHrzpDooWT85TYh9jQtiRlkkOo6wb3ie-gvzfRSDVokXG5pwZkDAaSxgzRUvzzUXwh2LVCyKBRPJWQHoq_2E6CoTFwlyV8VnPE3wCOarof9LuEfgu5uCc2Tyyh2q3XItxL9JrPpril51AN9O608SYtaalIsDLbiPVDt6wF3s_-kHSR8CUFKfwR3rQjo-_-18kvAm380RHeSm9wilgU_HgfRTVSLeCJRlWABjZthwRW4bhHUWDAVTlLvKFafZvIFU8bIJt7PDzpt4hHZlSRPbCwtl1_7S5lYlYMHdi42j2yQFpwUfsGNiNI18A2UHCKlKQinTdXOxDMl-hQpQhep2zFhrHOYZBg-vPhkSZybfn4lcAgKUZwitnfZArXaWP-2P5SOWkipP4SMxlDYggbLA_XHu1QrxhPSEsktgTRQB4NZ2UuIB7xbWGXPe_sz-_sBIE1slbDvmSdi_x30UGhXtzVxr-awknRc0tZLeUHspqHMDase5vsFhnYQGVudgsaDIpZUr51qM71OScCUqq-IgsfzwESDiulYMZ-ERPjVW5uSiaXc55R1YTlHN8NOFtDdXhK-wj3eZC_hYAXdx0GEFFMsMftfxZ2CpvwZM5eJSdADcLa3ucBAMNvJKLQhFh1aLOKKGUKCb1YXp_RS0J6dkkmD4R0GpP3qVbO_4PSJb41P_IAmHz1Q0B6TvDJ-wCN3g2CXx4Mzx5F1Q5iOBgPPguDvctoIagu480X261Uc0kprK379RZj2zXu57UoP2MCHeVG0x1yhDv_e5d8m_Pfa9Nj-34ewXPEa56wl_ApEXhNyvAxEiCGYWGvsHRS00cHY9lhHN0qGxIuchsInP7xYxwxPrDRz-c4WTjXqGXfFPyJUn1he1U_F8sUHzCV7vcaDOb21SVIMDRwsu0y4rPw56f29LTyZPmq4mdAMWJ2WhHO1mE_4hNsgRB6iDvz2L9NZCx64LGa4O1jf89_NNw8k8BnHBgmon57g04EfQRC5gza7E5hFG4BrK46QD5zkYQhdlN6UFo9YkxN3WFhBXgzVu7DXqxEaKTIdLEdVCJcvaR3SfI18zTDtFQkDlKuHXhxnaUACrf5jlzQWJHGU7SzouQ3-bHOmfzmt4s5jYghWBlOubEdpBPCd1ViEXOHrg6-pJlmrWBgtCGFdvzE5vJVAzeF38SeiNNYUsS9jW0EK31dMLWETsXUTyVJbI9EzaxWyLIuH3ONnux-umAo41TNp1DkU18BSMdg_AGSjLZEgscmeyNbzKDE2OTaBJkeUAZ6gtLAg0lLm9PyJJ16MNDPgWAF2G-_acrysBV4q-jgimPrfcWZ6V_yICa4PHQunlC9RQCGq8a4_bMhjZ7iHFSWq1nSwaZTQ=w1920-h953',
        descripcion: 'Fermentado de betarraga',
        precioanterior: 's/ 18.00',
        precioactual: 'S/ 15.00',
        link: 'https://api.whatsapp.com/send/?phone=990071436&text&type=phone_number&app_absent=1'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_HfjgRX8IAhSgACKangBbznLMaYglJRDCmmI8BLELWqLWFUfX1Khor9Gwj0Jdc-XF8Eg1rBkARlHxOU_0uegtFgEyT-RyOKyalIiAQLOiugru8YqCvq6iuxAIr4OO9jsAEZbCdbMJ_zv2seg3DfJBfb1_COF5fMg3rvrOADrLkOoV1fTlynldH94bCo0Uw4hb463mNRPokYPUm2DHAlj8VAwXmYhhYj4QbSQdPM9eoK0iHKt_uN6fQhzWTkkVcXlJ5Vn1tBjn7Qy_KRkTSNVg6u5GARDyCsiaC25rpUwBZQNwpKhTIjwGwIMXM3IA4OYtSFv9IV1fZMzsNiWFGQpLwtIlPNY85a61cWyVpzZ1KidKJWNaiSBwo2YYcJ77r1nppqF3GjwcFx3R3poTWxmjeZHJbbCxuaNJeRQvfDGgpdc6BjdNSkpEt6bGCMuz6g5BG69aYtrhcIaTN-E7v0ah8W1Fk-A0K-s3z828FcYsVMvdy6EQOn07zXpQ58Y8MUohC8ODq-ZX1NCB_NIWfdTWksP3Zs8Voqg1mqJujRWPNM0RVM6kdM1_xU4oob8-xowhmm_nBnKHCxL9c_AeW9NrDDCT8tBVlPMfl5P9EWFHZT1YAtRauPQ9In-m2oqb801qy6D1s-JKurw0JIL6aT9xxxUNJcMqEUP2EZrWAlN5kHTm928E17L0UVaoSs5zkjMJDAyE9k57vrqRHi5VqNVeL4URGqS0QLUwt1LTSoA1-gBjSFiejfJLF_iGybdikYHMN4NM0X8ytjYtA8a825HP7GLjcS3YcRAW0gkOa6YcMVTlhrHucWbSOcUvxRMwxFGDkEuoIJo3Iud6jJ0DTa5-EtFCucDmNOJJgijD2gvzlp_lZnbauxUhngxWbDg16UsHKI3FC8CzJ5mSxVhybrEJ8g3YvMqtDJBZytkcepcQUmiWjG8uRuOcRdr7JwTM7vlT1v2-oDcAfklc2j-KcQnkhk9b5_TMZkHRwGtFXfkMmkKmvQkhAr8d7Q3EeXS6wGUraZ3GZTHs2ZFRMhDrGpCtZf3OONWtI6tgEB_se17KLvzPsj7D7E6pWe2pMcCs-0gHrlHeBMJ1YFMea8-vpS52kx7jsrNMFz0fu4uFG7USRugWnKT5sjYzyOtFdz8kVrDHUXOlm7ImZtCvXRhx4x5rqWriJq4QRYUIY200lleUkv3cqo0hi_2woW6THv93HfG78NpGMyFMUuxoNkgvZAfcz198FlNmeod5kjYcIF5IawEKtOaICP5NwKBjtDJPAlunrBz4Et8NNYPIy4hzFZWPjodl1zf4uzPeBUZmRg3eZYUeXKHUAMcEmABn3ycmpx0g3MVwGf_jlFPZGj8AsB1dN22wiHg1AzVW3ap3EfkEQSrHr4BMxo11PINtws4rjnAPhCjhSf03pv25HgkS4qm8v1J-PTbNXtLeHIbOLJPD2uU3ZrMYwKrhFgBkywqlt0XpwEWwo8-8GoJv6PYjb4RlcD9TS9ir0H7kjLnzM9mrDEbg1TfKUubybjuVwRJOCnJIjWv3v48guLQIRLlZ8vhTZqMVf6zlnVyRV-DHz6FXhqI00wMZDWMvu9Bex9FnhrJr15y93QKgUWDkUtxQ=w1920-h953',
        descripcion: 'Licor de café',
        precioanterior: 's/ 20.00',
        precioactual: 'S/ 15.00',
        link: 'https://api.whatsapp.com/send/?phone=990071436&text&type=phone_number&app_absent=2'
      },
      {
        modelo: '',
        foto: 'https://lh3.googleusercontent.com/fife/ALs6j_EACrhctkpYs3TycJYZoWQTml9G4nPTO1cHrh7I7280-Bwx1VqwNmPJl8Ug_z5Ecf1K8QSXQ7Hi-srpK0Sm34qkDdqr1LsI0cNihcOhczGgRRf6ti6jtf8PvchTXv23gMUFsB7ixC6tCba3NedVDZu5cpdV_IDsqPLvTt1P6vkU6Xffu8P96f8R7E0j6XBBfOLzg21cWJak6L33SFkYOpYjJ2_3xOJqMLqhACEDVJp6r5y1EPEPkGfdZ5vkLnebEwHYoipf0OYtfkpjWwceIPz0KVTPPlG7PYlrraTUfIERlELE5eq4eONgbymzlv-2hBOKzF2_QAckHjQaYF0xETVBO5sjdTbKOc46swUijio66TEyuvSXVVJJcTXsOrjWT1-Dou9A4vC5DWlBJ2zF0DrwZDwAhh3WO3TRAH3cAjyHnLDQyJsbG215wAKUWrgvvcB5yc0DXa4Ls-2say5BPJv6rlkefuUjPfgIvxY2h6g8qjX9w4DuHSvZ9DtxzL2CmOMEfYhxhAL0lYnQdyN7u7GCC8UaC9zdYs-LEkDvTB8ZXZPB0zczE2wGzQeLQz_9JyR7Ebp0ILPOvoVwc17XpD25QO2lljLjYJU2yu9n6oHQvHY5PJApCzpKZvXqUqVQkrog1IoRn7cAvtJZ7ZpmNK-pGpxOvSC3Y9x3v_c9PWzy7JameT76dLGND383_Y0Wd--PJF2pcEf135tM061FW63Tln0G1fNrnjs2m7FIjCMiESMSe9pY536TDGUz3-6WR8tRfDdkXNIcWSalK49VbTIRHxl-CswlpUHvlZFnm8Ml6okWtE9QtboFI7entgpyBDP96VfilQSW3FAQ5o7aVsJVDCLYeNvdyq_HqpfA-WF3y-hHsmkhKZQovLs69DAhxBEzyoQd0gZPEAN4sW129ypmapQ3r2bdWVxB6z6DiX5lcR-42CAf65Nq1Ll9Z-Gm9rR27Xoo85q_HGVJhxsjLv7dgPDWW3xL4Pcv5afMgvL3exaVdtjU4Cbf-W1I1kX-BQgbrqDmzGoOwGLh7GHlBoEbLRtA5Q5zFXZvspWKW68b5yZmECJAIBBW1GpUbZ43LpLaOTarLbq7BtAOQVnR9EeVAwLpZAdI_izWI2Pxp5M662TUxFTOHvW2dF3WgCu_8UrMOVNlnZGJdQ7Sm2lr_zFkcjjxhJ2ivkMIpoL4yqfYaEmQhKcTOd1F6cgSsE1EsepQxNfusXJ_2eylxFMl_Ar6mEifm1FElKYHRCQ8D6-H_F3qaMM1IUwORsXVedPxAupzziNiUMAvwE9-JwSf7AbqVcZlt0AqwBsrpMyw-wVNqBH1b_VnHjsym2VB5t2sCwa8s1hay6JGiJJ_IhsRWSsEqCsQyjMa5MYSiDGJCSV5IuwU_zTHYQWBCRi5rj9GNzHHCvvhYa2OHNjrvO6Fs8yUVc676EQ-unHzKcJPdxVygsvSa8YIEt9poS1Z1bgnGHXaALmjYnVI2b9Q4-bq9qLzOCjEmkJBVnxGA6lK8AYffOmN13rDcwZ9Mn3RA25ZLSlfN3HWWfJd4O6gOhdQYd7A47JteIhKuMl9VEBxWUPdtjBuT9oZ3iFBALQAGIo2z39WRY-N-9Q_pNDnhg=w1365-h953',
        descripcion: 'Hidromiel elaborada a vace de miel de miel multi floral',
        precioanterior: 's/ 18.00',
        precioactual: 'S/ 15.00',
        link: 'https://api.whatsapp.com/send/?phone=990071436&text&type=phone_number&app_absent=3'
      }
    ]
  }
];



export {
  categorias, marcas, productos
}


// CREATE TABLE cyberwow (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255),
//   description TEXT NULL,
//   image VARCHAR(255) NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   deleted_at TIMESTAMP NULL
// );
// CREATE TABLE cyberwow_products (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   model VARCHAR(255) NULL,
//   photo VARCHAR(255) NULL,
//   price1 DECIMAL(10, 2),
//   priceo2 DECIMAL(10, 2),
//   link VARCHAR(255),
//   id_cyberwow INT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   deleted_at TIMESTAMP NULL,
//   FOREIGN KEY (id_cyberwow) REFERENCES cyberwow(id)
// );