// Localidades con página propia. El texto de cada una es contenido para Google:
// conviene ampliarlo con lo que sabe la inmobiliaria de cada lugar.

export type Zona = {
  slug: string;
  nombre: string;
  // Variantes de cómo puede venir escrita la localidad desde Tokko
  alias: string[];
  resumen: string;
  intro: string;
  bloques: { titulo: string; texto: string }[];
  destacada: boolean;
  // Foto de la tarjeta del inicio (public/zonas/). Las de Wikimedia Commons llevan crédito por licencia.
  foto?: { src: string; alt: string; autor: string; licencia: string; url: string };
};

export const ZONAS: Zona[] = [
  {
    slug: 'salsipuedes',
    nombre: 'Salsipuedes',
    foto: { src: '/zonas/salsipuedes.webp', alt: 'Cartel de bienvenida a Salsipuedes', autor: 'Claudio Elias', licencia: 'dominio público', url: 'https://commons.wikimedia.org/wiki/File:Salsipuedes055.JPG' },
    alias: ['salsipuedes'],
    resumen: 'La puerta de entrada a las Sierras Chicas. A 35 km de Córdoba por Ruta E-53.',
    intro:
      'Salsipuedes es la localidad más accesible de las Sierras Chicas: muchas de sus casas entran en el rango del crédito hipotecario. Está a unos 35 km de Córdoba Capital por la Ruta E-53.',
    bloques: [
      {
        titulo: 'Cuánto cuesta una casa en Salsipuedes',
        texto:
          'Es el mercado más chico y más accesible de las Sierras Chicas. Una casa de 2 dormitorios se publica hoy entre USD 45.000 y 85.000, y una de 3 dormitorios entre USD 80.000 y 180.000. Son valores de publicación: para saber cuánto vale una propiedad puntual, pedinos una tasación.',
      },
      {
        titulo: 'Comprar con crédito hipotecario',
        texto:
          'Para que un banco tome la propiedad, tiene que tener escritura y planos aprobados al día. En cada ficha lo marcamos con el sello Apto crédito. La evaluación crediticia y la cuota las define el banco; nosotros te entregamos la documentación de la propiedad.',
      },
      {
        titulo: 'Barrios con más movimiento',
        texto: 'Villa Sol, Las Tejas, Ariel y el centro sobre Av. Aguirre.',
      },
    ],
    destacada: true,
  },
  {
    slug: 'rio-ceballos',
    nombre: 'Río Ceballos',
    foto: { src: '/zonas/rio-ceballos.webp', alt: 'Lago del dique La Quebrada, Río Ceballos', autor: 'Claudio Elias', licencia: 'dominio público', url: 'https://commons.wikimedia.org/wiki/File:Rio_Ceballos_141.JPG' },
    alias: ['rio ceballos', 'río ceballos'],
    resumen: 'Sierra con todos los servicios: comercio, colegios y vida de pueblo grande.',
    intro:
      'Río Ceballos es la localidad más consolidada de las Sierras Chicas: tiene más comercios, colegios y servicios, con precios intermedios entre Salsipuedes y los barrios cerrados de Unquillo.',
    bloques: [
      {
        titulo: 'Cuánto cuesta una casa en Río Ceballos',
        texto:
          'Una casa de 2 dormitorios se publica entre USD 75.000 y 165.000, y una de 3 dormitorios entre USD 115.000 y 265.000. Es el mercado con más oferta de la zona.',
      },
      {
        titulo: 'Para quién es',
        texto: 'Para quien quiere vivir en la sierra sin resignar la comodidad de tener todo cerca.',
      },
    ],
    destacada: true,
  },
  {
    slug: 'unquillo',
    nombre: 'Unquillo',
    foto: { src: '/zonas/unquillo.webp', alt: 'Mural con la Capilla Buffo en Unquillo', autor: 'DanielleJoyArg', licencia: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Mural_en_Unquillo_con_Capilla_Buffo.jpg' },
    alias: ['unquillo'],
    resumen: 'Casco urbano accesible y barrios cerrados como Las Corzuelas y Corral de Barrancas.',
    intro:
      'Unquillo son dos mercados en uno: un casco urbano con precios accesibles y barrios cerrados como Las Corzuelas y Corral de Barrancas, donde pesan más el terreno, la privacidad y la vista.',
    bloques: [
      {
        titulo: 'Cuánto cuesta una casa en Unquillo',
        texto:
          'En el casco urbano y barrios como Cabana los valores rondan los USD 100.000. En los barrios cerrados los precios suben bastante, y muchas operaciones se hacen con permuta.',
      },
    ],
    destacada: true,
  },
  {
    slug: 'cordoba',
    nombre: 'Córdoba Capital',
    foto: { src: '/zonas/cordoba.webp', alt: 'Edificios de Córdoba Capital de noche con el Faro del Bicentenario', autor: 'Ed López', licencia: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:El_Faro_de_C%C3%B3rdoba_(cropped).jpg' },
    // Solo "Córdoba Capital": "Cordoba" a secas es la provincia en las ubicaciones de Tokko
    alias: ['cordoba capital', 'córdoba capital'],
    resumen: 'Departamentos seleccionados, muchos aptos para crédito hipotecario.',
    intro:
      'También trabajamos una selección de propiedades en Córdoba Capital, sobre todo departamentos aptos para crédito hipotecario y propiedades que nuestros clientes reciben en permuta.',
    bloques: [],
    destacada: true,
  },
];

export function zonaPorSlug(slug: string) {
  return ZONAS.find((z) => z.slug === slug);
}
