import { getCollection } from 'astro:content';
import type { Language } from '@shared/config/i18n';
import type { DevlogPost } from './types';

/** Devlog post ids are prefixed with their locale folder (e.g. "en/my-post"). */
function stripLocalePrefix(id: string): string {
	return id.replace(/^(en|es)\//, '');
}

/**
 * Returns all devlog posts for a given locale, sorted by pubDate desc.
 */
export async function getDevlogPosts(lang: Language): Promise<DevlogPost[]> {
	const posts = await getCollection('devlog', ({ id }) => id.startsWith(`${lang}/`));

	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Returns a single post by its locale-stripped slug, or undefined if not found. */
export async function getDevlogPost(lang: Language, slug: string): Promise<DevlogPost | undefined> {
	const posts = await getDevlogPosts(lang);
	return posts.find(post => stripLocalePrefix(post.id) === slug);
}

/** Derives the route slug (without locale prefix) from a devlog post entry. */
export function getDevlogSlug(post: DevlogPost): string {
	return stripLocalePrefix(post.id);
}
