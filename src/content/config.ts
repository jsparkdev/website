import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		updatedAt: z.date(),
	}),
})

export const collections = {
	posts: postsCollection,
}
