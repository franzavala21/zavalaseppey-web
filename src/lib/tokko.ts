// Conector con la API de Tokko Broker.
// Se ejecuta SOLO al compilar el sitio (en el servidor de Vercel). La clave
// viene de la variable de entorno TOKKO_API_KEY y nunca llega al navegador.

import { ZONAS } from '../data/zonas';
import { FIXTURES } from './fixtures';
import { formatoPrecio, quitarAcentos, slugify } from './text';

export type Operacion = 'venta' | 'alquiler' | 'temporario';

export type Precio = { operacion: Operacion; moneda: 'USD' | 'ARS' | null; valor: number | null; texto: string };

export type Foto = { url: string; thumb: string; alt: string };

export type Propiedad = {
  id: string;
  slug: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  tipo: string; // "Casa"
  tipoSlug: string; // "casas"
  operaciones: Operacion[];
  precios: Precio[];
  zona: string | null; // slug de ZONAS, o null si es de otra localidad
  localidad: string; // "Salsipuedes"
  barrio: string | null; // "Villa Sol"
  ubicacion: string; // "Bº Villa Sol, Salsipuedes"
  lat: number | null;
  lng: number | null;
  dormitorios: number | null;
  ambientes: number | null;
  banos: number | null;
  toilettes: number | null;
  cocheras: number | null;
  supCubierta: number | null;
  supTerreno: number | null;
  supTotal: number | null;
  expensas: number | null;
  antiguedad: number | null;
  aptoCredito: boolean;
  destacada: boolean;
  etiquetas: string[];
  fotos: Foto[];
  videos: string[];
  actualizada: string | null;
};

// ---------- Tipos de propiedad ----------

const TIPOS: { match: RegExp; nombre: string; plural: string; slug: string }[] = [
  { match: /duplex|dúplex/i, nombre: 'Dúplex', plural: 'Dúplex', slug: 'duplex' },
  { match: /^ph$|ph /i, nombre: 'PH', plural: 'PH', slug: 'ph' },
  { match: /casa/i, nombre: 'Casa', plural: 'Casas', slug: 'casas' },
  { match: /departamento|depto/i, nombre: 'Departamento', plural: 'Departamentos', slug: 'departamentos' },
  { match: /terreno|lote/i, nombre: 'Terreno', plural: 'Terrenos', slug: 'terrenos' },
  { match: /local/i, nombre: 'Local comercial', plural: 'Locales comerciales', slug: 'locales' },
  { match: /oficina/i, nombre: 'Oficina', plural: 'Oficinas', slug: 'oficinas' },
  { match: /caba[ñn]a/i, nombre: 'Cabaña', plural: 'Cabañas', slug: 'cabanas' },
  { match: /quinta/i, nombre: 'Quinta', plural: 'Quintas', slug: 'quintas' },
  { match: /galp[oó]n|dep[oó]sito/i, nombre: 'Galpón', plural: 'Galpones y depósitos', slug: 'galpones' },
  { match: /cochera/i, nombre: 'Cochera', plural: 'Cocheras', slug: 'cocheras' },
  { match: /fondo de comercio/i, nombre: 'Fondo de comercio', plural: 'Fondos de comercio', slug: 'fondos-de-comercio' },
  { match: /campo|chacra/i, nombre: 'Campo', plural: 'Campos', slug: 'campos' },
];

export function tipoInfo(nombreTokko: string) {
  const t = TIPOS.find((x) => x.match.test(nombreTokko ?? ''));
  return t ?? { nombre: nombreTokko || 'Propiedad', plural: 'Otras propiedades', slug: 'otras' };
}

export function tipoPorSlug(slug: string) {
  return TIPOS.find((t) => t.slug === slug) ?? (slug === 'otras' ? { nombre: 'Propiedad', plural: 'Otras propiedades', slug } : undefined);
}

export const OPERACIONES: Record<Operacion, { label: string; enLabel: string; verbo: string }> = {
  venta: { label: 'Venta', enLabel: 'en venta', verbo: 'Comprar' },
  alquiler: { label: 'Alquiler', enLabel: 'en alquiler', verbo: 'Alquilar' },
  temporario: { label: 'Alquiler temporario', enLabel: 'en alquiler temporario', verbo: 'Alquiler temporario' },
};

function operacionDe(nombre: string): Operacion | null {
  const n = quitarAcentos(String(nombre ?? '')).toLowerCase();
  if (n.includes('temporari')) return 'temporario';
  if (n.includes('alquiler') || n.includes('rent')) return 'alquiler';
  if (n.includes('venta') || n.includes('sale')) return 'venta';
  return null;
}

// ---------- Normalización ----------

const num = (v: unknown): number | null => {
  const n = typeof v === 'string' ? parseFloat(v.replace(',', '.')) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
};

const coord = (v: unknown): number | null => {
  const n = typeof v === 'string' ? parseFloat(v) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) && n !== 0 ? n : null;
};

function zonaDe(textoUbicacion: string) {
  const t = ' ' + quitarAcentos(textoUbicacion).toLowerCase() + ' ';
  // Se busca primero las localidades más específicas (todas menos Córdoba Capital)
  const orden = [...ZONAS].sort((a, b) => (a.slug === 'cordoba' ? 1 : 0) - (b.slug === 'cordoba' ? 1 : 0));
  for (const z of orden) {
    if (z.alias.some((a) => t.includes(quitarAcentos(a)))) return z;
  }
  return null;
}

function esAptoCredito(p: any) {
  const v = p.credit_eligible;
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    const s = quitarAcentos(v).toLowerCase();
    if (s.includes('no')) return false;
    if (s.includes('apto')) return true;
  }
  const textos = [p.publication_title, ...(p.tags ?? []).map((t: any) => t?.name)].join(' ');
  return /apto\s*cr[eé]dito/i.test(textos) && !/no\s+apto/i.test(textos);
}

export function normalizar(p: any): Propiedad | null {
  if (!p || p.id == null) return null;

  const tipo = tipoInfo(p.type?.name ?? '');
  const precios: Precio[] = [];
  const operaciones: Operacion[] = [];
  for (const op of p.operations ?? []) {
    const o = operacionDe(op.operation_type);
    if (!o || operaciones.includes(o)) continue;
    operaciones.push(o);
    const pr = (op.prices ?? [])[0];
    const moneda = pr?.currency === 'USD' ? 'USD' : pr?.currency ? 'ARS' : null;
    const valor = p.web_price === false ? null : num(pr?.price);
    precios.push({ operacion: o, moneda, valor, texto: formatoPrecio(moneda, valor) });
  }
  if (!operaciones.length) return null;

  const loc = p.location ?? {};
  const full = [loc.full_location, loc.short_location, loc.name].filter(Boolean).join(' | ');
  const zona = zonaDe(full);
  const nombreLoc: string = loc.name ?? '';
  // Si la ubicación de Tokko es un barrio, la localidad sale de la zona detectada
  const localidad = zona?.nombre ?? (String(loc.short_location ?? '').split('|').pop()?.trim() || nombreLoc || 'Córdoba');
  const barrio = zona && nombreLoc && quitarAcentos(nombreLoc).toLowerCase() !== quitarAcentos(zona.nombre).toLowerCase() && !zona.alias.includes(quitarAcentos(nombreLoc).toLowerCase()) ? nombreLoc : null;
  const ubicacion = barrio ? `Bº ${barrio.replace(/^b[º°o]?\.?\s+/i, '')}, ${localidad}` : localidad;

  const fotos: Foto[] = [...(p.photos ?? [])]
    .filter((f: any) => f?.image && !f.is_blueprint)
    .sort((a: any, b: any) => (b.is_front_cover ? 1 : 0) - (a.is_front_cover ? 1 : 0) || (a.order ?? 0) - (b.order ?? 0))
    .map((f: any, i: number) => ({
      url: f.image,
      thumb: f.thumb || f.image,
      alt: f.description || `${tipo.nombre} ${operaciones[0] === 'venta' ? 'en venta' : 'en alquiler'} en ${ubicacion} — foto ${i + 1}`,
    }));

  const videos: string[] = (p.videos ?? [])
    .map((v: any) => v?.player_url || v?.url)
    .filter((u: any) => typeof u === 'string' && /^https:\/\//.test(u));

  // En Tokko: suite_amount = dormitorios, room_amount = ambientes
  const dormitorios = num(p.suite_amount);
  const titulo: string = (p.publication_title || '').trim() || autoTitulo(tipo.nombre, dormitorios, operaciones[0], ubicacion);

  const slug = slugify(
    [tipo.nombre, dormitorios ? `${dormitorios} dormitorios` : '', OPERACIONES[operaciones[0]].enLabel, barrio ?? '', localidad, p.id]
      .filter(Boolean)
      .join(' ')
  );

  return {
    id: String(p.id),
    slug,
    codigo: p.reference_code ?? String(p.id),
    titulo,
    descripcion: p.description ?? '',
    tipo: tipo.nombre,
    tipoSlug: tipo.slug,
    operaciones,
    precios,
    zona: zona?.slug ?? null,
    localidad,
    barrio,
    ubicacion,
    lat: coord(p.geo_lat),
    lng: coord(p.geo_long),
    dormitorios,
    ambientes: num(p.room_amount),
    banos: num(p.bathroom_amount),
    toilettes: num(p.toilet_amount),
    cocheras: num(p.parking_lot_amount),
    supCubierta: num(p.roofed_surface),
    supTerreno: num(p.surface),
    supTotal: num(p.total_surface),
    expensas: num(p.expenses),
    antiguedad: typeof p.age === 'number' ? p.age : null,
    aptoCredito: esAptoCredito(p),
    destacada: Boolean(p.is_starred_on_web),
    etiquetas: (p.tags ?? []).map((t: any) => t?.name).filter(Boolean),
    fotos,
    videos,
    actualizada: p.deleted_at ? null : (p.created_at ?? null),
  };
}

function autoTitulo(tipo: string, dorm: number | null, op: Operacion, ubicacion: string) {
  return `${tipo}${dorm ? ` ${dorm} dorm.` : ''} ${OPERACIONES[op].enLabel} en ${ubicacion}`;
}

// ---------- Lectura ----------

let cache: Promise<Propiedad[]> | null = null;

export function getPropiedades(): Promise<Propiedad[]> {
  if (!cache) cache = cargar();
  return cache;
}

async function cargar(): Promise<Propiedad[]> {
  const key = process.env.TOKKO_API_KEY || import.meta.env.TOKKO_API_KEY;
  if (!key) {
    console.warn('\n[tokko] Sin TOKKO_API_KEY: se usan propiedades de EJEMPLO. No publicar así.\n');
    return FIXTURES.map(normalizar).filter(Boolean) as Propiedad[];
  }

  const crudas: any[] = [];
  const limit = 50;
  for (let offset = 0; offset < 5000; offset += limit) {
    const url = `https://www.tokkobroker.com/api/v1/property/?key=${encodeURIComponent(key)}&format=json&lang=es_ar&limit=${limit}&offset=${offset}`;
    const res = await fetchConReintentos(url);
    const data = await res.json();
    const objs = data?.objects ?? [];
    crudas.push(...objs);
    if (!data?.meta?.next || objs.length < limit) break;
  }

  const props = crudas.map(normalizar).filter(Boolean) as Propiedad[];
  // Si Tokko responde vacío por un error, preferimos que el build falle
  // y quede publicada la versión anterior, antes que un sitio sin propiedades.
  if (!props.length) throw new Error('[tokko] La API no devolvió propiedades. Se cancela la publicación.');
  console.log(`[tokko] ${props.length} propiedades cargadas.`);
  return props;
}

async function fetchConReintentos(url: string, intentos = 3): Promise<Response> {
  let ultimoError: unknown;
  for (let i = 0; i < intentos; i++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.ok) return res;
      ultimoError = new Error(`Tokko respondió ${res.status}`);
    } catch (e) {
      ultimoError = e;
    }
    await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
  }
  throw ultimoError;
}

// ---------- Consultas ----------

export function precioDe(p: Propiedad, op?: Operacion) {
  return (op && p.precios.find((x) => x.operacion === op)) || p.precios[0];
}

export function filtrar(props: Propiedad[], f: { operacion?: Operacion; zona?: string; tipoSlug?: string }) {
  return props.filter(
    (p) =>
      (!f.operacion || p.operaciones.includes(f.operacion)) &&
      (!f.zona || p.zona === f.zona) &&
      (!f.tipoSlug || p.tipoSlug === f.tipoSlug)
  );
}

export function ordenarRecientes(props: Propiedad[]) {
  return [...props].sort((a, b) => Number(b.destacada) - Number(a.destacada) || Number(b.id) - Number(a.id));
}

export function similares(props: Propiedad[], p: Propiedad, n = 3) {
  const op = p.operaciones[0];
  const ref = precioDe(p, op)?.valor ?? 0;
  return props
    .filter((x) => x.id !== p.id && x.operaciones.includes(op))
    .map((x) => {
      let s = 0;
      if (x.zona && x.zona === p.zona) s += 3;
      if (x.tipoSlug === p.tipoSlug) s += 2;
      const v = precioDe(x, op)?.valor;
      if (ref && v && precioDe(x, op)?.moneda === precioDe(p, op)?.moneda) s += Math.max(0, 2 - Math.abs(v - ref) / ref * 4);
      return { x, s };
    })
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((r) => r.x);
}
