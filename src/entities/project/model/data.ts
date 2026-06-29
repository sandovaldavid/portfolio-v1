import { TAGS } from '@entities/technology';
import type { ProjectItem } from './types';

import campusMapImg from '@assets/projects/project-08-campus-map.webp';
import madaiImg from '@assets/projects/project-10-MAD-AI.webp';
import fluentreadsImg from '@assets/projects/project-09-fluentreads.webp';
import auctionsImg from '@assets/projects/project-02-auctions.webp';

/**
 * Project database
 */
export function getProjectsData(t: (key: string) => string): ProjectItem[] {
	return [
		{
			slug: 'campus-map',
			title: t('projects.campus-map.title'),
			description: t('projects.campus-map.description'),
			link: 'https://mapa-unp.sandovaldavid.com',
			github: 'https://github.com/dev-sandoval/unp-campus-map',
			image: campusMapImg,
			tags: [TAGS.TAILWIND, TAGS.CLOUDINARY, TAGS.NEXTJS, TAGS.JAVASCRIPT, TAGS.MYSQL],
			featured: true,
			category: 'Full-Stack Development',
			caseStudy: {
				problem: t('projects.campus-map.case.problem'),
				approach: t('projects.campus-map.case.approach'),
				tradeoffs: t('projects.campus-map.case.tradeoffs'),
				outcome: t('projects.campus-map.case.outcome'),
				learnings: [
					t('projects.campus-map.case.learning1'),
					t('projects.campus-map.case.learning2'),
					t('projects.campus-map.case.learning3'),
				],
				timeline: '3 months',
				role: 'Solo Developer',
			},
		},
		{
			slug: 'mad-ai',
			title: t('projects.madai.title'),
			description: t('projects.madai.description'),
			github: 'https://github.com/dev-sandoval/MAD-AI',
			image: madaiImg,
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
			caseStudy: {
				problem: t('projects.madai.case.problem'),
				approach: t('projects.madai.case.approach'),
				tradeoffs: t('projects.madai.case.tradeoffs'),
				outcome: t('projects.madai.case.outcome'),
				learnings: [
					t('projects.madai.case.learning1'),
					t('projects.madai.case.learning2'),
					t('projects.madai.case.learning3'),
				],
				timeline: 'Ongoing',
				role: 'Full-Stack Developer',
			},
		},
		{
			slug: 'fluentreads',
			title: t('projects.fluentreads.title'),
			description: t('projects.fluentreads.description'),
			link: 'https://fluentreads.vercel.app',
			github: 'https://github.com/dev-sandoval/fluentreads',
			image: fluentreadsImg,
			tags: [TAGS.ASTRO, TAGS.REACT, TAGS.TAILWIND, TAGS.TYPESCRIPT],
			category: 'Frontend Development',
			caseStudy: {
				problem: t('projects.fluentreads.case.problem'),
				approach: t('projects.fluentreads.case.approach'),
				tradeoffs: t('projects.fluentreads.case.tradeoffs'),
				outcome: t('projects.fluentreads.case.outcome'),
				learnings: [
					t('projects.fluentreads.case.learning1'),
					t('projects.fluentreads.case.learning2'),
					t('projects.fluentreads.case.learning3'),
				],
				timeline: '2 months',
				role: 'Solo Developer',
			},
		},
		{
			slug: 'auctions',
			title: t('projects.auctions.title'),
			description: t('projects.auctions.description'),
			link: 'https://auctions.sandovaldavid.com',
			github: 'https://github.com/sandovaldavid/project-02-auctions',
			image: auctionsImg,
			tags: [TAGS.DJANGO, TAGS.PYTHON, TAGS.BOOTSTRAP, TAGS.JAVASCRIPT, TAGS.POSTGRESQL],
			category: 'Full-Stack Development',
			caseStudy: {
				problem: t('projects.auctions.case.problem'),
				approach: t('projects.auctions.case.approach'),
				tradeoffs: t('projects.auctions.case.tradeoffs'),
				outcome: t('projects.auctions.case.outcome'),
				learnings: [
					t('projects.auctions.case.learning1'),
					t('projects.auctions.case.learning2'),
					t('projects.auctions.case.learning3'),
				],
				timeline: '1 month',
				role: 'Solo Developer',
			},
		},
	];
}
