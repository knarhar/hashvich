/**
 * robots.txt, generated so the sitemap URL follows `site` in astro.config.mjs
 * rather than being duplicated as a literal.
 */

import type { APIRoute } from "astro";
import { BASE_PATH } from "../i18n/routes.ts";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("http://localhost:4321");
  const sitemap = new URL(`${BASE_PATH}sitemap-index.xml`, origin).href;

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
