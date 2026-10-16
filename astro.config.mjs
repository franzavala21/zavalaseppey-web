import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio principal. Vercel redirige www → este dominio.
const SITE = 'https://inmobiliariazavalaseppey.com.ar';

// Páginas que todavía no se muestran a Google (guías sin terminar)
const BORRADORES = ['/guias/vivir-en-salsipuedes/'];

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !BORRADORES.some((b) => page.endsWith(b)),
      changefreq: 'daily',
    }),
  ],
});
