// Propiedades de EJEMPLO con la misma forma que devuelve la API de Tokko
// (verificada contra la API real en octubre de 2026). Se usan solo cuando no hay
// TOKKO_API_KEY (desarrollo local). Nunca se publican.
// Los datos son ficticios. Las direcciones ("Calle Ficticia …") están para comprobar
// que nunca aparecen en el HTML: `grep -r "Ficticia" dist/` tiene que dar vacío.

// Forma real de Tokko:
// - operation_type: "Venta" | "Alquiler"; prices con currency "USD" | "ARS", period e is_promotional
// - superficies como texto ("300.00"), siempre en m² aunque surface_measurement diga "HA"
// - suite_amount = dormitorios; room_amount casi siempre 0
// - credit_eligible: "Apto crédito" | "No especificado"
// - location por niveles: "Argentina | Cordoba | Colon | Unquillo | Las Corzuelas"
//   ("Cordoba" a secas es la provincia; la capital figura como "Cordoba Capital")
// - deleted_at viene con fecha también en propiedades activas
const op = (operation_type: 'Venta' | 'Alquiler', currency: 'USD' | 'ARS', price: number) => ({
  operation_id: operation_type === 'Venta' ? 1 : 2,
  operation_type,
  prices: [{ currency, is_promotional: false, period: 0, price }],
});
const loc = (niveles: string[]) => ({
  name: niveles[niveles.length - 1],
  short_location: niveles.slice(-3).join(' | '),
  full_location: ['Argentina', 'Cordoba', ...niveles].join(' | '),
  divisions: [],
});
const tag = (type: number, name: string) => ({ id: 0, name, type });
const base = (direccion: string) => ({
  address: direccion, fake_address: direccion, real_address: direccion,
  surface_measurement: 'M2', web_price: true, is_starred_on_web: false, credit_eligible: 'No especificado',
  suite_amount: 0, room_amount: 0, bathroom_amount: 0, toilet_amount: 0, parking_lot_amount: 0,
  surface: '0.00', roofed_surface: '0.00', total_surface: '0.00', expenses: 0, age: 0,
  photos: [], videos: [], tags: [], custom_tags: [],
  created_at: '2025-03-10T10:00:00', deleted_at: '2026-09-01T12:00:00',
});

export const FIXTURES: any[] = [
  {
    ...base('Calle Ficticia 101 - Salsipuedes'),
    id: 7001, reference_code: 'ZHO7001', is_starred_on_web: true, credit_eligible: 'Apto crédito',
    publication_title: 'CASA 2 DORM. EN VENTA - SALSIPUEDES - APTO CRÉDITO',
    type: { id: 3, code: 'HO', name: 'Casa' }, operations: [op('Venta', 'USD', 48000)],
    location: loc(['Colon', 'Salsipuedes']),
    suite_amount: 2, bathroom_amount: 1, surface: '300.00', roofed_surface: '70.00',
    geo_lat: '-31.1379', geo_long: '-64.2955', tags: [tag(1, 'Agua Corriente'), tag(3, 'Parrilla'), tag(2, 'Patio')],
    custom_tags: [{ id: 1, name: 'Ubicación exacta en web' }], // ejemplo del pin exacto en el mapa
    description: '   En Salsipuedes hay pocas casas a este precio con escritura y planos al día.\n\nDos dormitorios, cocina comedor, baño completo y patio con asador sobre un lote de 300 m².',
  },
  {
    ...base('Calle Ficticia 202 - Villa Sol - Salsipuedes'),
    id: 7002, reference_code: 'ZHO7002', is_starred_on_web: true, credit_eligible: 'Apto crédito',
    publication_title: 'Dúplex 2 dorm. en venta - Villa Sol, Salsipuedes | Apto crédito',
    type: { id: 13, code: 'DU', name: 'Duplex' }, operations: [op('Venta', 'USD', 55000)],
    location: loc(['Colon', 'Salsipuedes']),
    suite_amount: 2, bathroom_amount: 1, toilet_amount: 1, parking_lot_amount: 1,
    geo_lat: '-31.1352', geo_long: '-64.2981', tags: [tag(2, 'Balcón'), tag(3, 'Parrilla'), tag(9, 'Escritura inmediata')],
    description: 'Dúplex con escritura y planos al día, dentro de un complejo de viviendas.\n\nAbajo, cocina comedor y living integrados con toilette y patio. Arriba, dos dormitorios con placares y baño completo.',
  },
  {
    ...base('Calle Ficticia 303 - Rio Ceballos'),
    id: 7003, reference_code: 'ZHO7003', is_starred_on_web: true, web_price: false,
    publication_title: 'VENTA CASA EN RIO CEBALLOS - 4 TERRENOS - PILETA',
    type: { id: 3, code: 'HO', name: 'Casa' }, operations: [op('Venta', 'USD', 250000)],
    location: { name: 'Rio Ceballos', short_location: 'Argentina | Cordoba | Rio Ceballos ', full_location: 'Argentina | Cordoba | Rio Ceballos ', divisions: [] },
    suite_amount: 2, bathroom_amount: 2, roofed_surface: '250.00', surface: '1700.00',
    geo_lat: '-31.1664', geo_long: '-64.3196', videos: [{ provider: 'youtube', player_url: 'https://www.youtube.com/embed/xxxxxxxxxxx', url: 'https://www.youtube.com/watch?v=xxxxxxxxxxx' }],
    tags: [tag(3, 'Pileta'), tag(3, 'Quincho')],
    description: 'Casa sobre cuatro terrenos: 1.700 m² de parque con pileta y quincho.',
  },
  {
    ...base('Lote Ficticio 4 Mza. 4 - Las Corzuelas'),
    id: 7004, reference_code: 'ZHO7004', is_starred_on_web: true,
    publication_title: 'LAS CORZUELAS - MODERNA PROPIEDAD - Paneles Solares',
    type: { id: 3, code: 'HO', name: 'Casa' }, operations: [op('Venta', 'USD', 395000)],
    location: loc(['Colon', 'Unquillo', 'Las Corzuelas']),
    suite_amount: 2, bathroom_amount: 2, roofed_surface: '268.00', surface: '1068.00', parking_lot_amount: 2, age: 7, expenses: 365000,
    geo_lat: '-31.2302', geo_long: '-64.3150', tags: [tag(3, 'Pileta'), tag(9, 'Paneles solares')],
    description: 'Casa con paneles solares, termo solar y losa radiante en barrio cerrado.',
  },
  {
    ...base('Calle Ficticia 505 - Salsipuedes'),
    id: 7005, reference_code: 'ZLA7005',
    publication_title: 'LOTE 300 M2 EN VENTA - SALSIPUEDES | CON ESCRITURA',
    type: { id: 1, code: 'LA', name: 'Terreno' }, operations: [op('Venta', 'USD', 9500)],
    location: loc(['Colon', 'Salsipuedes']), surface: '300.00',
    geo_lat: '-31.1340', geo_long: '-64.2990',
    description: 'Lote plano de 10 × 30 m con escritura, a 2 cuadras de la Ruta E-53.',
  },
  {
    ...base('Calle Ficticia 606 - Rio Ceballos'),
    id: 7006, reference_code: 'ZLA7006', web_price: false,
    publication_title: 'Lote Comercial en Alquiler sobre Ruta E-53 - Río Ceballos',
    type: { id: 1, code: 'LA', name: 'Terreno' }, operations: [op('Alquiler', 'ARS', 3500000)],
    location: loc(['Colon', 'Rio Ceballos', 'Lomas del Chañar']), surface: '2900.00',
    geo_lat: '-31.1500', geo_long: '-64.3000',
    description: 'Lote comercial de 2.900 m² sobre la Ruta E-53, ideal para depósito o local de exposición.',
  },
  {
    ...base('Calle Ficticia 707 - Agua de Oro'),
    id: 7007, reference_code: 'ZLA7007', surface_measurement: 'HA',
    publication_title: 'FRACCIÓN 7 HAS. EN AGUA DE ORO',
    type: { id: 1, code: 'LA', name: 'Terreno' }, operations: [op('Venta', 'USD', 170000)],
    location: loc(['Colon', 'Agua De Oro']), surface: '70000.00',
    geo_lat: '-31.0700', geo_long: '-64.3000',
    description: 'Fracción de 7 hectáreas con escritura y plano de mensura. Localidad fuera de las zonas con página propia.',
  },
  {
    ...base('Calle Ficticia 808 - Centro - Cordoba'),
    id: 7008, reference_code: 'ZAP7008', credit_eligible: 'Apto crédito',
    publication_title: 'Departamento 2 dorm. en VENTA - Centro, Córdoba | Apto crédito',
    type: { id: 2, code: 'AP', name: 'Departamento' }, operations: [op('Venta', 'USD', 60000)],
    location: loc(['Cordoba Capital', 'Centro']),
    suite_amount: 2, bathroom_amount: 1, expenses: 70000, age: 20,
    geo_lat: '-31.4140', geo_long: '-64.1880', tags: [tag(2, 'Balcón')],
    description: 'Departamento externo en segundo piso, en pleno centro. Desocupado.',
  },
];
