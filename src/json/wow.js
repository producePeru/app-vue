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
  {
    id: 5,
    nombrecategoria: 'Servicios y otros',
    imagen: '../../assets/img/icons/servicio.png',
    class: 'servicio'
  },
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
    linkpagina: 'https://kerasuperfood.com/tienda/',
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
    linkpagina: 'https://muebles-tablitas.com/',
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
    linkpagina: 'https://www.facebook.com/apisakidsface',
    descripcion: 'moda infantil',
    categoria_id: 6,
  },
  {
    id: 31,
    nombre: 'Chocolate Sojhadi',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/1P2w8fxMkQ-wuXNTKttlNjzeJ0vqom0_G=w1920-h969-iv1',
    linkpagina: 'https://www.facebook.com/chocolatesojhadi',
    descripcion: 'cacao de la región San Martín',
    categoria_id: 1,
  },
  {
    id: 32,
    nombre: 'Hidrobee',
    imagen: 'https://lh3.googleusercontent.com/u/0/d/16IQZ2u8N9FdR-wBT4NFQ7vExOqVffBw_=w1920-h969-iv1',
    linkpagina: 'https://www.facebook.com/HIDROBEEPERU',
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
    linkpagina: 'https://www.facebook.com/DIMARS.SHOES',
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
    nombre: 'Illaq Peru',
    imagen: 'https://lh3.google.com/u/0/d/16grrm5uiYhoEAHwq__m61vPXRhLNctAH=w2000-h1290-iv1',
    linkpagina: 'https://www.facebook.com/Illaqjoyeria/',
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
    titulo: 'ARLIN TEXTIL',
    productos: [
      {
        modelo: 'ARLIN TEXTIL',
        foto: 'https://hugobosspeprod.vtexassets.com/arquivos/ids/157709/50497391-475_3.jpg?v=638433580577570000',
        descripcion: 'Cojín Dia de la Madre Modelo 2',
        precioanterior: 's/ 119.00',
        precioactual: 'S/ 59.50',
        link: ''
      },
      {
        modelo: 'TOPITOP MUJER',
        foto: 'https://lospimas.com/cdn/shop/products/DSC_0631.recorte.jpg?v=1673484143',
        descripcion: 'Jean Mujer Micaela Celest',
        precio: ' S/ 69.93',
        link: ''
      },
      {
        modelo: 'TOPITOP MUJER',
        foto: 'https://lospimas.com/cdn/shop/products/DSC_0631.recorte.jpg?v=1673484143',
        descripcion: 'Jean Mujer Micaela Celest',
        precio: ' S/ 69.93',
        link: ''
      },
      {
        modelo: 'TOPITOP MUJER',
        foto: 'https://lospimas.com/cdn/shop/products/DSC_0631.recorte.jpg?v=1673484143',
        descripcion: 'Jean Mujer Micaela Celest',
        precio: ' S/ 69.93',
        link: ''
      }
    ]
  },
  {
    marca_id: 44,
    titulo: 'MARTIN XD XD',
    productos: [
      {
        modelo: 'ARLIN TEXTIL',
        foto: 'https://lospimas.com/cdn/shop/products/DSC_0631.recorte.jpg?v=1673484143',
        descripcion: 'Cojín Dia de la Madre Modelo 2',
        precioanterior: 's/ 119.00',
        precioactual: 'S/ 59.50',
        link: ''
      },
      {
        modelo: 'TOPITOP MUJER',
        foto: 'https://lospimas.com/cdn/shop/products/DSC_0631.recorte.jpg?v=1673484143',
        descripcion: 'Jean Mujer Micaela Celest',
        precio: ' S/ 69.93',
        link: ''
      },
      {
        modelo: 'TOPITOP MUJER',
        foto: 'https://lospimas.com/cdn/shop/products/DSC_0631.recorte.jpg?v=1673484143',
        descripcion: 'Jean Mujer Micaela Celest',
        precio: ' S/ 69.93',
        link: ''
      },
      {
        modelo: 'TOPITOP MUJER',
        foto: 'https://lospimas.com/cdn/shop/products/DSC_0631.recorte.jpg?v=1673484143',
        descripcion: 'Jean Mujer Micaela Celest',
        precio: ' S/ 69.93',
        link: ''
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