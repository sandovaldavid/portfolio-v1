import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getBlogPosts, getBlogSlug } from '@entities/blog';
import { Language } from '@shared/config/i18n';
import { siteConfig } from '@shared/config/site.config';

export async function GET(context: APIContext) {
	const posts = await getBlogPosts(Language.ENGLISH);
	return rss({
		title: `${siteConfig.name} — Blog`,
		description: siteConfig.defaultDescription,
		site: context.site ?? siteConfig.url,
		items: posts.map(post => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${getBlogSlug(post)}/`,
		})),
	});
}
