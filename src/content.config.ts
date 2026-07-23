import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nonEmptyString = z.string().trim().min(1);

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

const portfolioProfile = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/portfolio-profile' }),
	schema: z.object({
		profileId: z.string().regex(/^[a-z0-9-]+$/),
		locale: z.enum(['en', 'es']),
		seo: z.object({
			title: nonEmptyString,
			description: nonEmptyString,
		}),
		summary: nonEmptyString,
		biography: z.array(nonEmptyString).min(3),
		focusAreas: z.array(nonEmptyString).min(1),
		availabilityStatement: nonEmptyString,
		location: nonEmptyString,
		workMode: nonEmptyString,
		researchSummary: nonEmptyString,
		currentRoleSummary: nonEmptyString,
	}),
});

export const collections = { blog, devlog, portfolioProfile };
