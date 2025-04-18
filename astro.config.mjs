import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://info-tt.ru",
  output: "hybrid",
  experimental: { contentLayer: true },
  adapter: netlify({ imageCDN: false }),
  integrations: [tailwind({ applyBaseStyles: false }), react(), sitemap(), icon(), markdoc(), keystatic()],
});
