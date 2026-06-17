import { TAGS } from '@entities/technology';
import type { ProjectItem } from './types';

/**
 * Project database
 */
export function getProjectsData(t: (key: string) => string): ProjectItem[] {
	return [
		{
			title: t('projects.campus-map.title'),
			description: t('projects.campus-map.description'),
			link: 'https://mapa-unp.sandovaldavid.com',
			github: 'https://github.com/dev-sandoval/unp-campus-map',
			image: '/projects/project-08-campus-map.png',
			tags: [TAGS.TAILWIND, TAGS.CLOUDINARY, TAGS.NEXTJS, TAGS.JAVASCRIPT, TAGS.MYSQL],
			featured: true,
			category: 'Full-Stack Development',
		},
		{
			title: t('projects.madai.title'),
			description: t('projects.madai.description'),
			github: 'https://github.com/dev-sandoval/MAD-AI',
			image: '/projects/project-10-MAD-AI.webp',
			tags: [
				TAGS.ANGULAR,
				TAGS.TAILWIND,
				TAGS.TYPESCRIPT,
				TAGS.RXJS,
				TAGS.DJANGO,
				TAGS.PYTHON,
				TAGS.POSTGRESQL,
			],
			featured: true,
			category: 'Full-Stack Development',
		},
		{
			title: t('projects.fluentreads.title'),
			description: t('projects.fluentreads.description'),
			link: 'https://fluentreads.vercel.app',
			github: 'https://github.com/dev-sandoval/fluentreads',
			image: '/projects/project-09-fluentreads.webp',
			tags: [TAGS.ASTRO, TAGS.REACT, TAGS.TAILWIND, TAGS.TYPESCRIPT],
			category: 'Frontend Development',
		},

		{
			title: t('projects.auctions.title'),
			description: t('projects.auctions.description'),
			link: 'https://auctions.sandovaldavid.com',
			github: 'https://github.com/sandovaldavid/project-02-auctions',
			image: '/projects/project-02-auctions.webp',
			tags: [TAGS.DJANGO, TAGS.PYTHON, TAGS.BOOTSTRAP, TAGS.JAVASCRIPT, TAGS.POSTGRESQL],
			category: 'Full-Stack Development',
		},
	];
}
