// Fotos de Tokko en el tamaño justo. Tokko solo da una miniatura de 260 px (se ve pixelada)
// y la foto grande de 1600 px (~400 KB). Al compilar se baja la grande y se generan
// versiones webp de varios anchos; el navegador elige la que corresponde a la pantalla.

import { getImage } from 'astro:assets';

export type FotoWeb = { src: string; srcset: string };

export async function fotoWeb(url: string, anchos: number[]): Promise<FotoWeb> {
  try {
    const img = await getImage({ src: url, inferSize: true, width: Math.max(...anchos), widths: anchos, format: 'webp', quality: 72 });
    return { src: img.src, srcset: img.srcSet.attribute };
  } catch (e) {
    // Si una foto no se puede bajar, se usa la de Tokko tal cual en vez de cortar la publicación
    console.warn(`[fotos] No se pudo optimizar ${url}: ${(e as Error).message}`);
    return { src: url, srcset: '' };
  }
}
