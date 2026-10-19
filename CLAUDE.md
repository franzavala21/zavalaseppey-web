# Contexto para Claude Code — sitio web Zavala Seppey

Sitio de una inmobiliaria de Salsipuedes (Sierras Chicas, Córdoba, Argentina). Objetivo principal: **posicionamiento en Google** para búsquedas locales ("casas en venta en Salsipuedes", "alquiler Río Ceballos", "tasaciones Salsipuedes").

## Stack
- Astro (salida 100% estática), TypeScript, CSS propio en `src/styles/global.css`. Sin frameworks de UI.
- Propiedades desde la API de Tokko Broker, leídas **solo al compilar** (`src/lib/tokko.ts`).
- Hosting: Vercel. Actualización cada 6 h con `.github/workflows/actualizar-propiedades.yml` (deploy hook).
- Dominio: DNS en Cloudflare (nube gris), raíz `A 76.76.21.21`, `www` CNAME a Vercel y redirige a la raíz. Los MX y el TXT son del email (Cloudflare Email Routing): no tocarlos.
- Comandos: `npm run dev`, `npm run build`. Sin `TOKKO_API_KEY` usa `src/lib/fixtures.ts`.

## Reglas que no se rompen
1. **La clave de Tokko nunca va en el código**, ni en el cliente, ni en commits. Solo `process.env.TOKKO_API_KEY`.
2. **Nunca publicar la dirección exacta** de una propiedad ni el nombre del propietario. El mapa muestra un círculo de zona aproximada (350 m) con el centro redondeado y corrido: la casa queda adentro, nunca en el centro. Excepción decidida por la inmobiliaria: si la propiedad tiene en Tokko la etiqueta "Ubicación exacta en web", la ficha muestra el pin exacto.
3. Si Tokko falla o devuelve 0 propiedades, el build **debe fallar** (así queda online la versión anterior).
4. No inventar datos: precios, superficies, reseñas o cifras que no vengan de Tokko o de `src/config/site.ts`. Lo que falta se muestra como "Consultar".
5. Apto crédito: la inmobiliaria **no calcula cuotas ni promete créditos**; eso lo hace el banco.
6. Todo en español rioplatense (vos, tenés). Sin emojis en el sitio.
7. Cada página nueva: `title` y `description` propios, un solo `h1`, migas de pan con `breadcrumbJsonLd`, y que aparezca en el sitemap (o en `BORRADORES` si no está terminada).
8. Accesibilidad: botones y links reales, `alt` en imágenes, contraste AA (usar `--naranja-texto` para texto chico, no `--naranja`).

## Marca
Naranja `#E64E1B` (venta) · Verde `#1B6B58` (alquiler / WhatsApp) · Hueso `#F4F2EF` · Tinta `#141517`. Montserrat (títulos) + Lato (texto), servidas con @fontsource.
WhatsApp 351 819-6433 · Av. Pasaje Colón esq. Güemes, Local 7, Salsipuedes.

## Mapa del código
- `src/config/site.ts` datos de contacto, horarios, números, reseñas, video del inicio
- `src/data/zonas.ts` localidades con texto SEO · `src/data/contenido.ts` FAQ y lista de guías
- `src/lib/tokko.ts` conector y normalización · `src/lib/rutas.ts` qué listados existen · `src/lib/seo.ts` JSON-LD
- `src/components/Listado.astro` listado reutilizable con filtros del lado del cliente
- `src/pages/[op]/[zona]/[tipo]/` listados · `src/pages/propiedad/[slug].astro` ficha
- `integraciones/redirecciones.mjs` 301 desde el sitio viejo de Tokko (`/p/<id>` y secciones), se escriben en `.vercel/output/config.json` al compilar

## Pendientes conocidos
- Link de Facebook, video y foto del inicio.
- Confirmar los números de `stats` en `src/config/site.ts` (+25 años, +130 alquileres, +200 ventas). El "4,9 en Google" se sacó: la ficha real tiene 3,9.
