// Propiedades de EJEMPLO con la misma forma que devuelve la API de Tokko.
// Se usan solo cuando no hay TOKKO_API_KEY (desarrollo local). Nunca se publican.

const op = (tipo: string, currency: string, price: number) => ({ operation_type: tipo, prices: [{ currency, price }] });
const loc = (barrio: string, localidad: string) => ({
  name: barrio || localidad,
  short_location: `Colón | ${localidad}${barrio ? ' | ' + barrio : ''}`,
  full_location: `Argentina | Córdoba | Colón | ${localidad}${barrio ? ' | ' + barrio : ''}`,
});

export const FIXTURES: any[] = [
  {
    id: 7001, reference_code: 'ZSE-7001', is_starred_on_web: true, web_price: true,
    publication_title: 'Casa 2 dorm. en venta — Las Tejas, Salsipuedes | Apto crédito',
    type: { name: 'Casa' }, operations: [op('Venta', 'USD', 48000)], location: loc('Las Tejas', 'Salsipuedes'),
    suite_amount: 2, room_amount: 3, bathroom_amount: 1, surface: 300, credit_eligible: 'Apto crédito',
    geo_lat: '-31.1379', geo_long: '-64.2955', photos: [], tags: [{ name: 'Asador' }, { name: 'Patio' }],
    description: 'En Salsipuedes hay pocas casas a este precio con escritura y planos al día.\n\nDos dormitorios, cocina comedor, baño completo y patio con asador sobre un lote de 300 m².',
  },
  {
    id: 7002, reference_code: 'ZSE-7002', is_starred_on_web: true, web_price: true,
    publication_title: 'Dúplex 2 dorm. en venta — Villa Sol, Salsipuedes | Apto crédito',
    type: { name: 'Duplex' }, operations: [op('Venta', 'USD', 55000)], location: loc('Villa Sol', 'Salsipuedes'),
    suite_amount: 2, room_amount: 3, bathroom_amount: 1, toilet_amount: 1, parking_lot_amount: 1, credit_eligible: 'Apto crédito',
    geo_lat: '-31.1352', geo_long: '-64.2981', photos: [], tags: [{ name: 'Balcón' }, { name: 'Asador' }, { name: 'Baulera' }, { name: 'Cochera cubierta' }],
    description: 'En Salsipuedes hay pocas propiedades a este precio que un banco pueda tomar para un crédito hipotecario. Este dúplex es una de ellas: escritura y planos al día.\n\nAbajo, la cocina comedor y el living integrados, con un toilette y salida a un patio con asador. Arriba, los dos dormitorios con placares y el baño completo. Uno de los dormitorios tiene balcón propio con vista a las sierras.\n\nSuma cochera cubierta y baulera, dentro de un complejo de viviendas.',
  },
  {
    id: 7003, reference_code: 'ZSE-7003', is_starred_on_web: true, web_price: false,
    publication_title: 'Casa sobre 4 terrenos con pileta y depto independiente — Río Ceballos',
    type: { name: 'Casa' }, operations: [op('Venta', 'USD', 0)], location: loc('Parque Río Ceballos', 'Río Ceballos'),
    suite_amount: 2, bathroom_amount: 2, roofed_surface: 250, surface: 1700,
    geo_lat: '-31.1664', geo_long: '-64.3196', photos: [], tags: [{ name: 'Pileta' }, { name: 'Quincho' }, { name: 'Hogar a leña' }, { name: 'Portón automático' }],
    description: 'Donde la mayoría de las casas de la zona se levanta sobre un lote, esta ocupa cuatro: 1.700 m² de parque.\n\nRecibe vehículo y departamento de 1 dormitorio en Córdoba como parte de pago.',
  },
  {
    id: 7004, reference_code: 'ZSE-7004', is_starred_on_web: true, web_price: false,
    publication_title: 'Casa eficiente 2 dorm. en Bº Cerrado Las Corzuelas, Unquillo',
    type: { name: 'Casa' }, operations: [op('Venta', 'USD', 0)], location: loc('Las Corzuelas', 'Unquillo'),
    suite_amount: 2, bathroom_amount: 2, roofed_surface: 268, surface: 1068, parking_lot_amount: 2, age: 7, expenses: 365000,
    geo_lat: '-31.2302', geo_long: '-64.3150', photos: [], tags: [{ name: 'Paneles solares' }, { name: 'Losa radiante' }, { name: 'Jacuzzi' }, { name: 'Grupo electrógeno' }],
    description: 'Lo mejor de esta casa no entra en las fotos: 18 paneles solares, termo solar, grupo electrógeno y losa radiante con bomba de calor, frío en verano y calor en invierno.',
  },
  {
    id: 7005, reference_code: 'ZSE-7005', is_starred_on_web: true, web_price: true,
    publication_title: 'Lote 300 m² en venta — Villa Sol, Salsipuedes | Con escritura',
    type: { name: 'Terreno' }, operations: [op('Venta', 'USD', 9500)], location: loc('Villa Sol', 'Salsipuedes'),
    surface: 300, geo_lat: '-31.1340', geo_long: '-64.2990', photos: [], tags: [],
    description: 'Lote plano de 10 × 30 m con escritura, a 2 cuadras de la Ruta E-53. Contado USD 9.500 o financiado USD 10.500.',
  },
  {
    id: 7006, reference_code: 'ZSA-7006', is_starred_on_web: true, web_price: true,
    publication_title: 'Casa a estrenar 2 dorm. en alquiler — Villa Sol, Salsipuedes',
    type: { name: 'Casa' }, operations: [op('Alquiler', 'ARS', 590000)], location: loc('Villa Sol', 'Salsipuedes'),
    suite_amount: 2, bathroom_amount: 1, parking_lot_amount: 1,
    geo_lat: '-31.1361', geo_long: '-64.2970', photos: [], tags: [{ name: 'Termotanque solar' }, { name: 'Galería' }],
    description: 'Casa a estrenar sobre la Ruta E-53, con galería y vista a las sierras.',
  },
  {
    id: 7007, reference_code: 'ZSA-7007', web_price: true,
    publication_title: 'Local comercial en alquiler — calle Córdoba, Salsipuedes',
    type: { name: 'Local' }, operations: [op('Alquiler', 'ARS', 350000)], location: loc('', 'Salsipuedes'),
    bathroom_amount: 1, geo_lat: '-31.1370', geo_long: '-64.2960', photos: [], tags: [{ name: 'Vidriera' }],
    description: 'Local con vidriera. Podés arrancar con uno y sumar el de al lado cuando necesites crecer, sin mudarte. No apto gastronomía.',
  },
  {
    id: 7008, reference_code: 'ZSE-7008', web_price: false,
    publication_title: 'Depto 2 dorm. en venta — Centro, Córdoba | Apto crédito',
    type: { name: 'Departamento' }, operations: [op('Venta', 'USD', 0)],
    location: { name: 'Centro', short_location: 'Córdoba Capital | Centro', full_location: 'Argentina | Córdoba | Córdoba Capital | Centro' },
    suite_amount: 2, bathroom_amount: 1, expenses: 70000, age: 20, credit_eligible: 'Apto crédito',
    geo_lat: '-31.4140', geo_long: '-64.1880', photos: [], tags: [{ name: 'Ascensor' }],
    description: 'Departamento externo en segundo piso con vista a las cúpulas del centro. Desocupado.',
  },
];
