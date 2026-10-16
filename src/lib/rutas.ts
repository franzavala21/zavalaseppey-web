// Qué páginas de listado existen. Se generan solo las combinaciones con propiedades
// (salvo las de venta por localidad, que siempre existen porque tienen texto propio).

import { ZONAS, zonaPorSlug } from '../data/zonas';
import { filtrar, OPERACIONES, tipoPorSlug, type Operacion, type Propiedad } from './tokko';

export function operacionesConPaginas(props: Propiedad[]): Operacion[] {
  const ops: Operacion[] = ['venta', 'alquiler'];
  if (props.some((p) => p.operaciones.includes('temporario'))) ops.push('temporario');
  return ops;
}

export function rutasZona(props: Propiedad[]) {
  const out: { op: Operacion; zona: string }[] = [];
  for (const op of operacionesConPaginas(props)) {
    for (const z of ZONAS) {
      const n = filtrar(props, { operacion: op, zona: z.slug }).length;
      if (n > 0 || op === 'venta') out.push({ op, zona: z.slug });
    }
  }
  return out;
}

export function rutasTipo(props: Propiedad[]) {
  const out: { op: Operacion; zona: string; tipo: string }[] = [];
  for (const op of operacionesConPaginas(props)) {
    for (const z of ZONAS) {
      const tipos = new Set(filtrar(props, { operacion: op, zona: z.slug }).map((p) => p.tipoSlug));
      for (const t of tipos) out.push({ op, zona: z.slug, tipo: t });
    }
  }
  return out;
}

export function urlListado(op: Operacion, zona?: string, tipo?: string) {
  return `/${op}/${zona ? zona + '/' : ''}${tipo ? tipo + '/' : ''}`;
}

export function h1Listado(op: Operacion, zona?: string, tipo?: string) {
  const z = zona ? zonaPorSlug(zona) : undefined;
  const t = tipo ? tipoPorSlug(tipo) : undefined;
  const que = t ? t.plural : 'Propiedades';
  const donde = z ? `en ${z.nombre}` : 'en Salsipuedes y Sierras Chicas';
  return `${que} ${OPERACIONES[op].enLabel} ${donde}`;
}

/** Links a otras páginas que existen, para enlazado interno. */
export function relacionadosDe(props: Propiedad[], op: Operacion, zona?: string, tipo?: string) {
  const existentesZona = new Set(rutasZona(props).map((r) => `${r.op}|${r.zona}`));
  const existentesTipo = new Set(rutasTipo(props).map((r) => `${r.op}|${r.zona}|${r.tipo}`));
  const links: { href: string; label: string }[] = [];
  const add = (href: string, label: string) => { if (!links.some((l) => l.href === href)) links.push({ href, label }); };

  if (zona) {
    // Otros tipos en la misma zona
    for (const r of rutasTipo(props)) if (r.op === op && r.zona === zona && r.tipo !== tipo) add(urlListado(op, zona, r.tipo), h1Listado(op, zona, r.tipo));
    // Misma búsqueda en la otra operación
    const otra: Operacion = op === 'venta' ? 'alquiler' : 'venta';
    if (tipo && existentesTipo.has(`${otra}|${zona}|${tipo}`)) add(urlListado(otra, zona, tipo), h1Listado(otra, zona, tipo));
    else if (existentesZona.has(`${otra}|${zona}`)) add(urlListado(otra, zona), h1Listado(otra, zona));
  }
  // Otras localidades
  for (const z of ZONAS) {
    if (z.slug === zona) continue;
    if (tipo && existentesTipo.has(`${op}|${z.slug}|${tipo}`)) add(urlListado(op, z.slug, tipo), h1Listado(op, z.slug, tipo));
    else if (existentesZona.has(`${op}|${z.slug}`)) add(urlListado(op, z.slug), h1Listado(op, z.slug));
  }
  if (op === 'venta' && props.some((p) => p.aptoCredito)) add('/apto-credito/', 'Propiedades apto crédito');
  return links.slice(0, 7);
}
