// Datos de la inmobiliaria. Todo lo que se cambie acá se actualiza en todo el sitio.

export const SITE = {
  name: 'Zavala Seppey',
  legalName: 'Zavala Seppey Servicios Inmobiliarios',
  url: 'https://inmobiliariazavalaseppey.com.ar',
  tagline: 'Inmobiliaria en Salsipuedes y Sierras Chicas',
  description:
    'Inmobiliaria en Salsipuedes y Sierras Chicas desde hace más de 25 años. Casas, terrenos y alquileres en Salsipuedes, Río Ceballos y Unquillo. Tasaciones y administración de alquileres.',

  // Dos líneas de WhatsApp (formato internacional, sin + ni espacios)
  whatsapp: '5493515936478', // ventas, tasaciones y consultas generales
  whatsappLabel: '351 593-6478',
  whatsappAlquiler: '5493518196433', // alquileres y administración
  whatsappAlquilerLabel: '351 819-6433',
  email: 'inmobiliariazavalaseppey@gmail.com',

  address: {
    street: 'Güemes, Local 7',
    locality: 'Salsipuedes',
    region: 'Córdoba',
    country: 'AR',
    postalCode: '5113',
  },
  mapsUrl: 'https://maps.app.goo.gl/uBABqDkcZpXf6A8t7', // "Cómo llegar" a la oficina en Google Maps

  hours: [
    { label: 'Lunes a viernes', value: '9 a 18', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { label: 'Sábados', value: '10 a 13', days: ['Saturday'], opens: '10:00', closes: '13:00' },
  ],

  social: {
    instagram: 'https://www.instagram.com/zavalaseppey/',
    facebook: '', // pegar el link de la página de Facebook
  },

  googleReviewsUrl: 'https://maps.app.goo.gl/uBABqDkcZpXf6A8t7', // ficha de Google con todas las reseñas
  matricula: '', // N° de matrícula del corredor, si se quiere mostrar

  stats: [
    { value: '+25', label: 'años en Sierras Chicas' },
    { value: '+130', label: 'alquileres en administración' },
    { value: '+200', label: 'operaciones de venta cerradas' },
  ],

  // Video de fondo del inicio. Subirlo a /public/video/hero.mp4 (y una foto a /public/video/hero.jpg)
  // y completar acá. Vacío = se muestra solo la foto.
  heroVideo: '',
  heroPoster: '',
};

export type Linea = 'general' | 'alquiler';

export function waNumero(linea: Linea = 'general') {
  return linea === 'alquiler' ? SITE.whatsappAlquiler : SITE.whatsapp;
}

export function waLink(text?: string, linea: Linea = 'general') {
  const base = `https://wa.me/${waNumero(linea)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// Reseñas destacadas de Google, copiadas textuales de la ficha (todas de 5 estrellas).
// Agregar solo reseñas reales, con el link a cada una.
export const REVIEWS: { text: string; name: string; url: string }[] = [
  {
    text: 'Para sacarse el sombrero, la verdad excelente atención. Desde el primer contacto hasta que se concretó la operación. Muy puntuales con las reuniones, muy directos y sin letra chica, como tiene que ser. Buscando lo mejor para todas las partes involucradas. Muchas gracias Ignacio por tu compromiso y buena predisposición',
    name: 'Gonzalo Pantalena',
    url: 'https://maps.app.goo.gl/HQKMqKMuhCoWdd2N8',
  },
  {
    text: 'Excelente atención y se ocupan mucho de cada propiedad que tienen. Ya trabajamos varias veces con ellos y los recomiendo siempre',
    name: 'César Constantino Colomba Vicini',
    url: 'https://maps.app.goo.gl/EhqXun4b5PPXttvr9',
  },
  {
    text: 'Excelente la atención por parte de la inmobiliaria. Cumplieron con todo',
    name: 'Familia Cacho',
    url: 'https://maps.app.goo.gl/dfrHSsX8Dnxeo3dD6',
  },
  {
    text: 'Tuve una muy buena experiencia. Excelente atención! Gracias por su amabilidad',
    name: 'Lucila Canalini',
    url: 'https://maps.app.goo.gl/mbGWrdcVsoZ8oKKH6',
  },
];
