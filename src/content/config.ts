import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		updatedAt: z.date().optional().default(new Date()),
	}),
});

export const collections = {
	posts: postsCollection,
};
