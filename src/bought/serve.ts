import menus from "./menus.html?raw";
import panels from "./menu-panels.json";
import frameCss from "../components/v2/v2.css?raw";

/**
 * Serve a purchased page snapshot with the shared BBI navigation and footer.
 * The original page markup, text, styles, scripts and images stay in its own
 * editable source/asset folder. Only its local asset URLs are namespaced.
 */
export function boughtPage(html: string, assetFolder?: string): Response {
  const { footer, header } = panels;
  const base = assetFolder ? `/bought/${assetFolder}` : "";
  const prepared = assetFolder
    ? html
        .replace(/(["'(=])\.\/(images|scripts|styles)\//g, `$1${base}/$2/`)
        .replace(/(["'(=])\/images\//g, `$1${base}/images/`)
        .replaceAll(`${base}/scripts/~flock.js`, `${base}/scripts/flock.js`)
    : html;
  const script = `<style>${frameCss}</style>${menus}`;
  const body = prepared
    .replace(/<nav\b[\s\S]*?<\/nav>/, header)
    .replace(/<div class="min-h-\[320px\]"><footer[\s\S]*?<\/footer><\/div>/, `<div class="v2">${footer}</div>`)
    .replace("</body>", `${script}</body>`);
  return new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
