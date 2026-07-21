import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getBlogPosts, getBlogSlug } from '@entities/blog';
import { Language } from '@shared/config/i18n';
import { siteConfig } from '@shared/config/site.config';

export async function GET(context: APIContext) {
	const posts = await getBlogPosts(Language.SPANISH);
	return rss({
		title: `${siteConfig.name} — Blog`,
		description:
			'Portafolio de David Sandoval, Ingeniero de Software especializado en .NET 8, Angular 19 y predicción de abandono de proyectos OSS con redes neuronales BiLSTM.',
		site: context.site ?? siteConfig.url,
		items: posts.map(post => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/es/blog/${getBlogSlug(post)}/`,
		})),
	});
}
