import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const home = defineCollection({
  loader: file("src/data/home.json"),
});

export const collections = { home };
