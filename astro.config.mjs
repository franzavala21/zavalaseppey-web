import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import redirecciones from './integraciones/redirecciones.mjs';

// Dominio principal. Vercel redirige www → este dominio.
const SITE = 'https://inmobiliariazavalaseppey.com.ar';

// Páginas que todavía no se muestran a Google (guías sin terminar)
const BORRADORES = [];

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Las fotos de Tokko se optimizan al compilar (src/lib/fotos.ts)
  image: { domains: ['static.tokkobroker.com'] },
  // Salida estática igual que antes; el adapter permite que las redirecciones sean 301 reales
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('redirecciones-tokko') && !BORRADORES.some((b) => page.endsWith(b)),
      changefreq: 'daily',
    }),
    redirecciones(),
  ],
});
