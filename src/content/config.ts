import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const home = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/data/home" }),
});

export const collections = { home };
