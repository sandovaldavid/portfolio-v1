import { getCollection } from 'astro:content';
import type { Language } from '@shared/config/i18n';
import { isContentForLanguage, stripContentLocalePrefix } from '@shared/lib/content';
import type { BlogPost } from './types';

/**
 * Returns all published posts for a given locale, sorted by pubDate desc.
 * Drafts are excluded in production builds.
 */
export async function getBlogPosts(lang: Language): Promise<BlogPost[]> {
	const posts = await getCollection('blog', ({ id, data }) => {
		const isCurrentLocale = isContentForLanguage(id, lang);
		const isPublished = import.meta.env.PROD ? !data.draft : true;
		return isCurrentLocale && isPublished;
	});

	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Returns a single post by its locale-stripped slug, or undefined if not found. */
export async function getBlogPost(lang: Language, slug: string): Promise<BlogPost | undefined> {
	const posts = await getBlogPosts(lang);
	return posts.find(post => stripContentLocalePrefix(post.id) === slug);
}

/** Derives the route slug (without locale prefix) from a blog post entry. */
export function getBlogSlug(post: BlogPost): string {
	return stripContentLocalePrefix(post.id);
}
