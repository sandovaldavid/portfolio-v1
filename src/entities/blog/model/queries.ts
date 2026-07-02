import { getCollection } from 'astro:content';
import type { Language } from '@shared/config/i18n';
import type { BlogPost } from './types';

/** Blog post ids are prefixed with their locale folder (e.g. "en/my-post"). */
function stripLocalePrefix(id: string): string {
	return id.replace(/^(en|es)\//, '');
}

/**
 * Returns all published posts for a given locale, sorted by pubDate desc.
 * Drafts are excluded in production builds.
 */
export async function getBlogPosts(lang: Language): Promise<BlogPost[]> {
	const posts = await getCollection('blog', ({ id, data }) => {
		const isCurrentLocale = id.startsWith(`${lang}/`);
		const isPublished = import.meta.env.PROD ? !data.draft : true;
		return isCurrentLocale && isPublished;
	});

	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Returns a single post by its locale-stripped slug, or undefined if not found. */
export async function getBlogPost(lang: Language, slug: string): Promise<BlogPost | undefined> {
	const posts = await getBlogPosts(lang);
	return posts.find(post => stripLocalePrefix(post.id) === slug);
}

/** Derives the route slug (without locale prefix) from a blog post entry. */
export function getBlogSlug(post: BlogPost): string {
	return stripLocalePrefix(post.id);
}
