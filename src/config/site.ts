// Datos de la inmobiliaria. Todo lo que se cambie acá se actualiza en todo el sitio.

export const SITE = {
  name: 'Zavala Seppey',
  legalName: 'Zavala Seppey Servicios Inmobiliarios',
  url: 'https://inmobiliariazavalaseppey.com.ar',
  tagline: 'Inmobiliaria en Salsipuedes y Sierras Chicas',
  description:
    'Inmobiliaria en Salsipuedes y Sierras Chicas desde hace más de 25 años. Casas, terrenos y alquileres en Salsipuedes, Río Ceballos y Unquillo. Tasaciones y administración de alquileres.',

  whatsapp: '5493518196433', // formato internacional, sin + ni espacios
  whatsappLabel: '351 819-6433',
  email: 'inmobiliariazavalaseppey@gmail.com',

  address: {
    street: 'Av. Pasaje Colón esq. Güemes, Local 7',
    locality: 'Salsipuedes',
    region: 'Córdoba',
    country: 'AR',
    postalCode: '5113',
  },

  hours: [
    { label: 'Lunes a viernes', value: '9 a 18', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { label: 'Sábados', value: '9 a 13', days: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],

  social: {
    instagram: 'https://www.instagram.com/zavalaseppey/',
    facebook: '', // pegar el link de la página de Facebook
  },

  googleReviewsUrl: '', // link "Ver todas las reseñas" del perfil de Google
  matricula: '', // N° de matrícula del corredor, si se quiere mostrar

  stats: [
    { value: '+25', label: 'años en Sierras Chicas' },
    { value: '+130', label: 'alquileres en administración' },
    { value: '+200', label: 'operaciones de venta cerradas' },
    { value: '4,9', label: 'en reseñas de Google' },
  ],

  // Video de fondo del inicio. Subirlo a /public/video/hero.mp4 (y una foto a /public/video/hero.jpg)
  // y completar acá. Vacío = se muestra solo la foto.
  heroVideo: '',
  heroPoster: '',
};

export function waLink(text?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// Reseñas destacadas de Google. Reemplazar por las reales (texto textual, nombre y contexto).
export const REVIEWS: { text: string; name: string; context: string }[] = [
  { text: '[Reseña real de Google #1, copiada textual]', name: '[Nombre]', context: 'Compró en Salsipuedes' },
  { text: '[Reseña real de Google #2]', name: '[Nombre]', context: 'Propietario, administra con nosotros' },
  { text: '[Reseña real de Google #3]', name: '[Nombre]', context: 'Inquilino' },
];
