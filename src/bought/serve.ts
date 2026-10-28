import menus from "./menus.html?raw";
import panels from "./menu-panels.json";

/**
 * Response for a purchased page that is still served as raw HTML. Adds the
 * shared header menus (same content as src/components/v2/frame.tsx, rendered
 * by scripts/render-menu-panels.tsx) and swaps the seller footer for ours.
 */
export function boughtPage(html: string): Response {
  const { footer, ...menuPanels } = panels as Record<string, string>;
  const script = menus.replace("__PANELS__", JSON.stringify(menuPanels).replace(/</g, "\\u003c"));
  const body = html
    .replace(/<div class="min-h-\[320px\]"><footer[\s\S]*?<\/footer><\/div>/, `<div class="v2">${footer}</div>`)
    .replace("</body>", `${script}</body>`);
  return new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
