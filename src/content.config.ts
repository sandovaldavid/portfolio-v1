import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			heroImage: image().optional(),
			draft: z.boolean().default(false),
			canonicalUrl: z.url().optional(),
		}),
});

const devlog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/devlog' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		pubDate: z.coerce.date(),
		version: z.string(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { blog, devlog };
