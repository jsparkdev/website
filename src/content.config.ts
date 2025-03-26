import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

const extend = z.object({ description: z.string() });

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend }),
  }),
};
