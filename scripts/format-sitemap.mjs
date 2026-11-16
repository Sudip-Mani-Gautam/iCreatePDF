import fs from 'fs';
import path from 'path';

const targetDir = process.argv[2] || 'out';
const sitemapPath = path.resolve(targetDir, 'sitemap.xml');

if (fs.existsSync(sitemapPath)) {
  let content = fs.readFileSync(sitemapPath, 'utf8');

  // 1. Inject XML stylesheet declaration right after XML header
  if (!content.includes('xml-stylesheet')) {
    content = content.replace(
      /<\?xml version="1\.0" encoding="UTF-8"\?>/,
      '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n'
    );
  }

  // 2. Cleanly format and indent XML blocks
  content = content
    .replace(/<url>/g, '\n  <url>\n    ')
    .replace(/<\/url>/g, '\n  </url>')
    .replace(/<\/loc>/g, '</loc>\n    ')
    .replace(/<\/lastmod>/g, '</lastmod>\n    ')
    .replace(/<\/changefreq>/g, '</changefreq>\n    ')
    .replace(/<\/priority>/g, '</priority>\n    ')
    .replace(/<xhtml:link/g, '<xhtml:link')
    .replace(/\/>/g, '/>\n    ')
    .replace(/\n    \n  <\/url>/g, '\n  </url>')
    .replace(/<\/urlset>/g, '\n</urlset>\n');

  fs.writeFileSync(sitemapPath, content, 'utf8');
  console.log(`[format-sitemap] Successfully added XSL stylesheet & formatted ${sitemapPath}`);
} else {
  console.log(`[format-sitemap] No sitemap found at ${sitemapPath}, skipping.`);
}
