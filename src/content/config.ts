import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    date: z.date(),
    draft: z.boolean().default(false),
    description: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
};
