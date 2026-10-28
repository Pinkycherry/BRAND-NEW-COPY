/**
 * Renders the header menu panels (src/components/v2/frame.tsx) to static HTML
 * for the raw purchased pages, so every page shows the same menu content.
 * Run: bun scripts/render-menu-panels.tsx > src/bought/menu-panels.json
 */
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";

import { Header, Footer, LearnPanel, ToolsPanel, ValidatePanel } from "../src/components/v2/frame";

const out = {
  header: renderToStaticMarkup(createElement(Header)),
  Validate: renderToStaticMarkup(createElement(ValidatePanel)),
  Learn: renderToStaticMarkup(createElement(LearnPanel)),
  "Free Tools": renderToStaticMarkup(createElement(ToolsPanel)),
  footer: renderToStaticMarkup(createElement(Footer)),
};
process.stdout.write(JSON.stringify(out));
