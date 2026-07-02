import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export interface BlogPostMeta {
	slug: string;
	title: string;
	description: string;
	pubDate: Date;
	updatedDate?: BlogPost['data']['updatedDate'];
	tags: string[];
	heroImage?: BlogPost['data']['heroImage'];
	canonicalUrl?: BlogPost['data']['canonicalUrl'];
}
