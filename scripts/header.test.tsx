import { expect, test } from 'bun:test';
import { readFileSync, readdirSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { Header, Footer, ValidatePanel, LearnPanel, ToolsPanel } from '../src/components/v2/frame';
import panels from '../src/bought/menu-panels.json';
import { TAXONOMY } from '../src/data/taxonomy';

// A stale raw-page copy previously left ten routes with a different header.
test('raw header, footer and panels match the React source', () => {
  expect(panels.header).toBe(renderToStaticMarkup(<Header />));
  expect(panels.footer).toBe(renderToStaticMarkup(<Footer />));
  expect(panels.Validate).toBe(renderToStaticMarkup(<ValidatePanel />));
  expect(panels.Learn).toBe(renderToStaticMarkup(<LearnPanel />));
  expect(panels['Free Tools']).toBe(renderToStaticMarkup(<ToolsPanel />));
});
test('all header links resolve to approved routes, with no hash placeholders', () => {
  const routes = new Set(readdirSync('src/routes').filter(f => f.endsWith('.tsx')).flatMap(f =>
    [...readFileSync(`src/routes/${f}`, 'utf8').matchAll(/createFileRoute\(["']([^"']+)/g)].map(m => m[1]!.replace(/\/$/, '') || '/')));
  TAXONOMY.forEach(c => routes.add(`/category/${c.slug}`));
  ['startup-cost','break-even','roi','funding-needed'].forEach(slug => routes.add(`/calculator/${slug}`));
  for (const [, href] of panels.header.matchAll(/href="([^"]*)"/g)) expect(routes.has(href!)).toBe(true);
});
test('disclosures have unique IDs and real controlled panels', () => {
  const ids = [...panels.header.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  expect(new Set(ids).size).toBe(ids.length);
  for (const [, id] of panels.header.matchAll(/aria-controls="([^"]+)"/g)) expect(ids).toContain(id);
  expect(panels.header.match(/<details>/g)?.length).toBe(3);
});
test('each purchased page has a replaceable top navigation', () => {
  const files = readdirSync('src/bought').filter(f => f.endsWith('.html') && f !== 'menus.html');
  expect(files.length).toBeGreaterThanOrEqual(10);
  for (const file of files) {
    const source = readFileSync(`src/bought/${file}`, 'utf8');
    const output = source.replace(/<nav\b[\s\S]*?<\/nav>/, panels.header);
    expect(output.match(/data-header-version=/g)?.length).toBe(1);
    expect(output).toContain('</body>');
  }
});
