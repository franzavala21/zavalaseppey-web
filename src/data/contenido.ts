export const FAQS = [
  {
    q: '¿Qué propiedades son aptas para crédito hipotecario?',
    a: 'Las que tienen escritura y planos aprobados al día. En cada ficha lo marcamos con el sello Apto crédito. La evaluación crediticia y la cuota las define el banco; nosotros te entregamos la documentación de la propiedad.',
  },
  {
    q: '¿Cuánto cuesta alquilar una casa en Salsipuedes?',
    a: 'Depende del tamaño y del estado de la casa. Escribinos por WhatsApp y te pasamos lo disponible hoy con su precio y sus requisitos.',
  },
  {
    q: '¿Qué necesito para alquilar?',
    a: 'Habitualmente tres recibos de sueldo o una garantía propietaria. Te confirmamos los requisitos exactos de cada propiedad antes de la visita.',
  },
  {
    q: '¿Administran alquileres de propietarios que no viven en la zona?',
    a: 'Sí. Cobramos el alquiler, controlamos luz, agua y tasa, aplicamos los aumentos por índice y te liquidamos cada mes con comprobante.',
  },
  {
    q: '¿Cuánto cobran por tasar una propiedad?',
    a: 'Si la tasación es para vender o alquilar con nosotros, no tiene cargo. Pedila desde la sección Tasaciones o por WhatsApp.',
  },
];

export const GUIAS: { slug: string; tag: string; titulo: string; bajada: string; borrador?: boolean }[] = [
  {
    slug: 'comprar-casa-con-credito-hipotecario-en-salsipuedes',
    tag: 'Crédito hipotecario',
    titulo: 'Cómo comprar tu primera casa en Salsipuedes con crédito UVA',
    bajada: 'Qué documentación necesita la propiedad, qué piden los bancos y por qué Salsipuedes entra en el rango financiable.',
  },
  {
    slug: 'precios-de-casas-en-sierras-chicas',
    tag: 'Precios',
    titulo: 'Cuánto cuesta una casa en Salsipuedes, Río Ceballos y Unquillo',
    bajada: 'Rangos de precio por localidad y por cantidad de dormitorios.',
  },
  {
    slug: 'vivir-en-salsipuedes',
    borrador: true, // tiene partes [completar]: no se muestra ni se indexa hasta completarla
    tag: 'Mudarse a las sierras',
    titulo: 'Vivir en Salsipuedes trabajando en Córdoba: lo que hay que saber',
    bajada: 'Distancias, transporte, servicios y en qué barrios conviene buscar.',
  },
];

export const GUIAS_PUBLICADAS = GUIAS.filter((g) => !g.borrador);
