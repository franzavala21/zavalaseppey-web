// Mapa id de Tokko → URL nueva de la ficha. Lo usa integraciones/redirecciones.mjs para
// armar las 301 desde las URLs del sitio viejo (/p/<id>-...). Se borra de la salida al terminar el build.
import { getPropiedades } from '../lib/tokko';

export async function GET() {
  const props = await getPropiedades();
  return new Response(JSON.stringify(Object.fromEntries(props.map((p) => [p.id, `/propiedad/${p.slug}/`]))));
}
