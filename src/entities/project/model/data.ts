import { TAGS } from '@entities/technology';
import type { ProjectItem } from './types';

/**
 * Project database
 */
export function getProjectsData(t: (key: string) => string): ProjectItem[] {
	return [
		{
			title: t('projects.techshop.title'),
			description: t('projects.techshop.description'),
			link: 'https://byte-shop-ecommerce.vercel.app',
			github: 'https://github.com/sandovaldavid/byte-shop-ecommerce',
			image: '/projects/project-15-TechShop.webp',
			tags: [TAGS.NEXTJS, TAGS.REACT, TAGS.SANITY, TAGS.TAILWIND],
			featured: true,
			category: t('projects.category.fullstack') ?? 'Full-Stack Development',
		},
		{
			title: t('projects.mail.title'),
			description: t('projects.mail.description'),
			link: 'https://mail.devsandoval.me',
			github: 'https://github.com/sandovaldavid/project-03-mail',
			image: '/projects/project-14-mail.webp',
			tags: [TAGS.DJANGO, TAGS.BOOTSTRAP, TAGS.JAVASCRIPT],
		},
		{
			title: t('projects.wiki.title'),
			description: t('projects.wiki.description'),
			link: 'https://wiki.devsandoval.me',
			github: 'https://github.com/sandovaldavid/project-01-wiki',
			image: '/projects/project-01-wiki.webp',
			tags: [TAGS.DJANGO, TAGS.PYTHON, TAGS.MARKDOWN, TAGS.BOOTSTRAP],
			featured: true,
			category: t('projects.category.machine-learning') ?? 'Machine Learning',
		},
		{
			title: t('projects.auctions.title'),
			description: t('projects.auctions.description'),
			link: 'https://auctions.devsandoval.me',
			github: 'https://github.com/sandovaldavid/project-02-auctions',
			image: '/projects/project-02-auctions.webp',
			tags: [TAGS.DJANGO, TAGS.PYTHON, TAGS.BOOTSTRAP, TAGS.JAVASCRIPT],
			category: t('projects.category.fullstack') ?? 'Full-Stack Development',
		},
		{
			title: t('projects.faculty-list.title'),
			description: t('projects.faculty-list.description'),
			link: 'https://facultades-unp.devsandoval.me',
			github: 'https://github.com/sandovaldavid/list-faculties-unp',
			image: '/projects/project-08-lista-facultades.webp',
			tags: [TAGS.TAILWIND, TAGS.CLOUDINARY, TAGS.NEXTJS, TAGS.JAVASCRIPT, TAGS.MYSQL],
			category: t('projects.category.enterprise') ?? 'Enterprise Software',
		},
	];
}
