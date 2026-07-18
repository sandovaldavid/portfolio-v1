import { getCollection } from 'astro:content';
import type { Language } from '@shared/config/i18n';
import { isContentForLanguage, stripContentLocalePrefix } from '@shared/lib/content';
import type { DevlogPost } from './types';

/**
 * Returns all devlog posts for a given locale, sorted by pubDate desc.
 */
export async function getDevlogPosts(lang: Language): Promise<DevlogPost[]> {
	const posts = await getCollection('devlog', ({ id }) => isContentForLanguage(id, lang));

	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Returns a single post by its locale-stripped slug, or undefined if not found. */
export async function getDevlogPost(lang: Language, slug: string): Promise<DevlogPost | undefined> {
	const posts = await getDevlogPosts(lang);
	return posts.find(post => stripContentLocalePrefix(post.id) === slug);
}

/** Derives the route slug (without locale prefix) from a devlog post entry. */
export function getDevlogSlug(post: DevlogPost): string {
	return stripContentLocalePrefix(post.id);
}
