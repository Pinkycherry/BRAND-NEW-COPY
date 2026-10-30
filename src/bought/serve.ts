/**
 * Serve a purchased page snapshot without redesigning its original frame.
 * Preserve the supplied header, footer, page markup, copy and interactions.
 * Only namespace the page-local image, stylesheet and script paths so each
 * imported folder can keep its own editable assets.
 */
export function boughtPage(html: string, assetFolder: string): Response {
  const base = `/bought/${assetFolder}`;
  const prepared = html
    .replace(/(["'(=])\.\/(images|scripts|styles)\//g, `$1${base}/$2/`)
    .replace(/(["'(=])\/images\//g, `$1${base}/images/`)
    .replaceAll(`${base}/scripts/~flock.js`, `${base}/scripts/flock.js`);
  return new Response(prepared, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
