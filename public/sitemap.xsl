<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | iCreatePDF</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          :root {
            --bg-color: #09090b;
            --card-bg: #18181b;
            --border-color: #27272a;
            --text-main: #f4f4f5;
            --text-muted: #a1a1aa;
            --primary: #ef4444;
            --primary-hover: #dc2626;
            --accent-bg: rgba(239, 68, 68, 0.1);
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            padding: 32px 16px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 28px 32px;
            margin-bottom: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .header-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand h1 {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #ffffff;
          }
          .brand-badge {
            background: var(--accent-bg);
            color: var(--primary);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 4px 10px;
            border-radius: 9999px;
            border: 1px solid rgba(239, 68, 68, 0.2);
          }
          .header-desc {
            color: var(--text-muted);
            font-size: 13px;
            max-width: 800px;
          }
          .header-stats {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 8px;
            padding-top: 16px;
            border-top: 1px solid var(--border-color);
            font-size: 13px;
            color: var(--text-muted);
          }
          .header-stats strong {
            color: var(--text-main);
          }
          .card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          th {
            background: #202024;
            color: var(--text-muted);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border-color);
          }
          td {
            padding: 14px 20px;
            border-bottom: 1px solid var(--border-color);
            font-size: 13px;
            vertical-align: middle;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background: rgba(255, 255, 255, 0.02);
          }
          .url-cell {
            max-width: 500px;
            word-break: break-all;
          }
          .url-link {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.15s ease;
          }
          .url-link:hover {
            color: #93c5fd;
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
          }
          .priority-high {
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
          }
          .priority-med {
            background: rgba(59, 130, 246, 0.15);
            color: #60a5fa;
            border: 1px solid rgba(59, 130, 246, 0.3);
          }
          .priority-normal {
            background: rgba(161, 161, 170, 0.15);
            color: #d4d4d8;
            border: 1px solid rgba(161, 161, 170, 0.3);
          }
          .freq-tag {
            color: var(--text-muted);
            font-size: 12px;
            font-family: monospace;
          }
          .date-tag {
            color: var(--text-muted);
            font-size: 12px;
            white-space: nowrap;
          }
          .footer-note {
            margin-top: 24px;
            text-align: center;
            font-size: 12px;
            color: var(--text-muted);
          }
          .footer-note a {
            color: var(--text-main);
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-top">
              <div class="brand">
                <h1>iCreatePDF</h1>
                <span class="brand-badge">XML Sitemap</span>
              </div>
              <div>
                <a href="https://icreatepdf.com" style="color: #ef4444; text-decoration: none; font-weight: 600; font-size: 13px;">← Return to iCreatePDF.com</a>
              </div>
            </div>
            <p class="header-desc">
              This XML Sitemap is indexed by search engines like Google and Bing to discover published tools, guides, and pages. It has been transformed with XSLT for structured human readability.
            </p>
            <div class="header-stats">
              <span>Total Indexed URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></span>
              <span>Primary Host: <strong>https://icreatepdf.com</strong></span>
              <span>Encoding: <strong>UTF-8</strong></span>
            </div>
          </div>

          <div class="card">
            <table>
              <thead>
                <tr>
                  <th style="width: 50px;">#</th>
                  <th>URL Destination</th>
                  <th style="width: 120px;">Priority</th>
                  <th style="width: 140px;">Change Freq</th>
                  <th style="width: 200px;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td style="color: var(--text-muted); font-size: 11px;">
                      <xsl:value-of select="position()"/>
                    </td>
                    <td class="url-cell">
                      <a class="url-link" target="_blank">
                        <xsl:attribute name="href">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="sitemap:priority &gt;= 0.9">
                          <span class="badge priority-high"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority &gt;= 0.8">
                          <span class="badge priority-med"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge priority-normal"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td>
                      <span class="freq-tag"><xsl:value-of select="sitemap:changefreq"/></span>
                    </td>
                    <td>
                      <span class="date-tag">
                        <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                        <xsl:text> </xsl:text>
                        <xsl:value-of select="substring(sitemap:lastmod, 12, 8)"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer-note">
            Generated automatically by <a href="https://icreatepdf.com">iCreatePDF</a>. Designed for both machine crawling and human readability.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
