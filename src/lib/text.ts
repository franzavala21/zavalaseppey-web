export function quitarAcentos(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function slugify(s: string) {
  return quitarAcentos(String(s ?? ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function escapeHtml(s: string) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Texto plano con saltos de línea → párrafos HTML seguros. */
export function parrafos(texto: string) {
  return String(texto ?? '')
    .replace(/\r/g, '')
    .split(/\n{2,}|\n(?=\s*[-•·*]\s)/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

/** Primeras ~N letras de un texto, cortando en palabra. */
export function resumen(texto: string, max = 155) {
  const limpio = String(texto ?? '').replace(/\s+/g, ' ').trim();
  if (limpio.length <= max) return limpio;
  return limpio.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

const nf = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });

export function formatoPrecio(moneda: string | null, valor: number | null) {
  if (!valor || !moneda) return 'Consultar precio';
  const simbolo = moneda === 'USD' ? 'USD' : '$';
  return `${simbolo} ${nf.format(valor)}`;
}

export function formatoNumero(n: number) {
  return nf.format(n);
}
