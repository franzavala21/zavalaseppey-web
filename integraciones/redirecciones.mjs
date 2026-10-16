// Redirecciones 301 desde el sitio viejo (plantilla de Tokko) a las URLs nuevas.
//
// Con el adapter de Vercel, las rutas salen de .vercel/output/config.json y Vercel ignora
// los "redirects" de vercel.json. Por eso se agregan acá, al principio de las rutas, para
// que la URL vieja llegue a la nueva en un solo salto (antes de la regla de la barra final).
//
// Fichas: la plantilla vieja usa /p/<id de Tokko>-<texto>. El id es el mismo que usa este
// sitio, así que cada ficha se redirige a su URL nueva sin importar el texto.

import fs from 'node:fs';

const MAPA = 'redirecciones-tokko.json';

// Secciones del sitio viejo (relevadas en octubre de 2026)
const SECCIONES = {
  '/Propiedades': '/propiedades/',
  '/Venta': '/venta/',
  '/Alquiler': '/alquiler/',
  '/Alquiler-temporario': '/alquiler/',
  '/Emprendimientos': '/propiedades/',
  '/Contacto': '/contacto/',
  '/Tasaciones': '/tasaciones/',
  '/Casas': '/propiedades/?tipo=casas',
  '/Casas-en-Venta': '/propiedades/?op=venta&tipo=casas',
  '/Casas-en-Alquiler': '/propiedades/?op=alquiler&tipo=casas',
  '/Terrenos': '/propiedades/?tipo=terrenos',
  '/Terrenos-en-Venta': '/propiedades/?op=venta&tipo=terrenos',
  '/Terrenos-en-Alquiler': '/propiedades/?op=alquiler&tipo=terrenos',
  '/Departamentos': '/propiedades/?tipo=departamentos',
  '/Departamentos-en-Venta': '/propiedades/?op=venta&tipo=departamentos',
  '/Departamentos-en-Alquiler': '/propiedades/?op=alquiler&tipo=departamentos',
  '/Oficinas': '/propiedades/?tipo=oficinas',
  '/Oficinas-en-Venta': '/propiedades/?op=venta&tipo=oficinas',
  '/Oficinas-en-Alquiler': '/propiedades/?op=alquiler&tipo=oficinas',
  '/fondos-de-comercio': '/propiedades/',
  '/fondos de comercio-en-Venta': '/propiedades/',
  '/fondos de comercio-en-Alquiler': '/propiedades/',
  // Emprendimientos (/d/<id>-...)
  '/d/46415': '/venta/salsipuedes/terrenos/', // Estancia San Miguel, Salsipuedes
  '/d/43662': '/propiedades/', // Brisas de las Sierras, Las Tapias
};

// Fichas que ya no están en Tokko
const FICHA_VIEJA_DESTINO = '/propiedades/';

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '(?: |%20)');

export function rutasRedireccion(mapa) {
  // caseSensitive: Vercel compara sin distinguir mayúsculas por defecto, y "/Venta" → "/venta/" sería un bucle
  const r = (src, destino) => ({ src, caseSensitive: true, status: 301, headers: { Location: destino } });
  return [
    ...Object.entries(mapa).map(([id, destino]) => r(`^/p/${id}(?:-[^/]*)?/?$`, destino)),
    r('^/p/\\d+(?:-[^/]*)?/?$', FICHA_VIEJA_DESTINO),
    ...Object.entries(SECCIONES).map(([viejo, destino]) =>
      r(viejo.startsWith('/d/') ? `^${escapar(viejo)}(?:-[^/]*)?/?$` : `^${escapar(viejo)}/?$`, destino)
    ),
  ];
}

export default function redirecciones() {
  return {
    name: 'redirecciones-sitio-viejo',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const salida = new URL('./.vercel/output/', new URL('..', import.meta.url));
        const archivos = [new URL(MAPA, dir), new URL(`static/${MAPA}`, salida)];
        const mapa = JSON.parse(fs.readFileSync(archivos[0], 'utf8'));
        for (const f of archivos) fs.rmSync(f, { force: true });

        const configPath = new URL('config.json', salida);
        if (!fs.existsSync(configPath)) {
          logger.warn('No hay .vercel/output/config.json: las redirecciones no se aplicaron.');
          return;
        }
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const nuevas = rutasRedireccion(mapa);
        config.routes = [...nuevas, ...(config.routes ?? [])];
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        logger.info(`${nuevas.length} redirecciones 301 del sitio viejo (${Object.keys(mapa).length} fichas).`);
      },
    },
  };
}
