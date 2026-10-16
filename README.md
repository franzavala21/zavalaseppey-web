# Sitio web — Zavala Seppey Servicios Inmobiliarios

Sitio en [Astro](https://astro.build) que lee las propiedades desde la API de **Tokko Broker** al publicarse y genera una página por propiedad, por operación, por localidad y por tipo. Se publica en **Vercel** y se actualiza solo cada 6 horas.

## Cómo funciona

```
Tokko (propiedades) ──► Vercel compila el sitio ──► páginas HTML livianas ──► Google
                             ▲
     GitHub Action cada 6 h ─┘  (o un cambio en el código)
```

- La clave de Tokko vive solo en Vercel (`TOKKO_API_KEY`). No está en el código ni llega al navegador.
- Si Tokko falla o devuelve cero propiedades, la publicación se cancela y **queda online la versión anterior**.
- Sin clave (en una computadora), el sitio usa propiedades de ejemplo de `src/lib/fixtures.ts`.

## Puesta en marcha

1. **Vercel → Add New → Project** → elegir este repositorio.
2. En **Environment Variables** agregar `TOKKO_API_KEY` con la clave de Tokko. **Deploy**.
3. Revisar el sitio en la dirección provisoria `*.vercel.app`.
4. **Actualización automática:** Vercel → Settings → Git → **Deploy Hooks** → crear uno (nombre `tokko`, rama `main`) y copiar la URL. En GitHub → Settings → Secrets and variables → Actions → **New repository secret**: `VERCEL_DEPLOY_HOOK` con esa URL. Para probarlo: pestaña **Actions** → *Actualizar propiedades desde Tokko* → **Run workflow**.
5. **Dominio:** Vercel → Settings → Domains → agregar `inmobiliariazavalaseppey.com.ar` (principal) y `www.inmobiliariazavalaseppey.com.ar` (redirige al principal).
6. **NIC Argentina:** en nic.ar → el dominio → Delegaciones → reemplazar por `ns1.vercel-dns.com` y `ns2.vercel-dns.com`. Tarda de minutos a 24 h.
7. **Google Search Console:** agregar la propiedad de dominio, verificarla con el registro TXT que da Google (se carga en Vercel → Domains → DNS Records) y enviar `https://inmobiliariazavalaseppey.com.ar/sitemap-index.xml`.

## Qué se edita y dónde

| Quiero cambiar… | Archivo |
|---|---|
| Teléfono, dirección, horarios, redes, números de trayectoria | `src/config/site.ts` |
| Reseñas de Google | `src/config/site.ts` → `REVIEWS` |
| Video de fondo del inicio | subir a `public/video/` y completar `heroVideo` y `heroPoster` en `src/config/site.ts` |
| Texto de cada localidad | `src/data/zonas.ts` |
| Preguntas frecuentes | `src/data/contenido.ts` |
| Guías | `src/pages/guias/*.md` (y la lista en `src/data/contenido.ts`) |
| Colores y estilos | `src/styles/global.css` |

Una guía con `borrador: true` no aparece en el listado ni se indexa en Google. Al terminarla, sacar esa línea, sacar `borrador: true` en `contenido.ts` y quitarla de `BORRADORES` en `astro.config.mjs`.

## Páginas que se generan

- `/` inicio
- `/propiedades/` todas, con filtros (el buscador del inicio lleva acá)
- `/venta/`, `/alquiler/`
- `/venta/salsipuedes/`, `/venta/rio-ceballos/`, `/venta/unquillo/`, `/venta/cordoba/` (siempre existen) y las de alquiler que tengan propiedades
- `/venta/salsipuedes/casas/` y demás combinaciones localidad + tipo con propiedades
- `/apto-credito/`
- `/propiedad/<tipo>-<dormitorios>-<operacion>-<barrio>-<localidad>-<id>/` una por propiedad
- `/tasaciones/`, `/administracion-de-alquileres/`, `/nosotros/`, `/contacto/`, `/guias/`

## SEO incluido

Título y descripción propios por página, URL canónica, Open Graph, `sitemap-index.xml`, `robots.txt`, migas de pan, datos estructurados (`RealEstateAgent`, `RealEstateListing`, `BreadcrumbList`, `FAQPage`, `Article`), enlazado interno entre localidades y tipos, imágenes con texto alternativo y carga diferida, fuentes servidas desde el propio sitio.

Privacidad: nunca se muestra la dirección exacta. El mapa usa coordenadas redondeadas (zona aproximada).

## Trabajar en una computadora

```bash
npm install
cp .env.example .env   # pegar la clave de Tokko
npm run dev            # http://localhost:4321
```
