// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/**
 * Static build for Cloudflare Pages.
 *   Build command:    npm run build
 *   Output directory: dist
 * No adapter: the site is fully static, so Pages serves dist/ directly.
 *
 * Set SITE_URL in the Pages environment to the production origin. Without it
 * the build still succeeds, and canonical/hreflang/sitemap URLs point at the
 * placeholder below, which must not be deployed as-is.
 */
const SITE = process.env.SITE_URL ?? "https://example.com";

export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "always",

  i18n: {
    locales: ["ru", "hy", "en"],
    defaultLocale: "ru",
    routing: {
      // Every locale is prefixed: /ru/, /hy/, /en/.
      prefixDefaultLocale: true,
      // Off deliberately. Astro's built-in root redirect emits a 2-second
      // meta refresh, which is slow for readers and treated as a soft
      // redirect by search engines. src/pages/index.astro does the same job
      // with a 0-second refresh and a canonical, and public/_redirects
      // handles it at the edge on Cloudflare. See docs/design-gaps.md.
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // Emits xhtml:link alternates for each page from the i18n map below.
      i18n: {
        defaultLocale: "ru",
        locales: { ru: "ru", hy: "hy", en: "en" },
      },
      // The root redirect is not a real page.
      filter: (page) => new URL(page).pathname !== "/",
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
