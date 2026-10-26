/**
 * robots.txt, generated so the sitemap URL follows `site` in astro.config.mjs
 * rather than being duplicated as a literal.
 */

import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("http://localhost:4321");
  const sitemap = new URL("sitemap-index.xml", origin).href;

  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
