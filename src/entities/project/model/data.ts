import { TAGS } from '@shared/config/technology';
import type { ProjectItem } from './types';

import yukidokeImg from '@assets/projects/project-11-yukidoke.svg';
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
			slug: 'yukidoke',
			title: t('projects.yukidoke.title'),
			description: t('projects.yukidoke.description'),
			image: yukidokeImg,
			tags: [TAGS.ANGULAR, TAGS.TYPESCRIPT, TAGS.RXJS, TAGS.CSHARP, TAGS.POSTGRESQL],
			featured: true,
			category: t('projects.category.enterprise'),
			caseStudy: {
				problem: t('projects.yukidoke.case.problem'),
				approach: t('projects.yukidoke.case.approach'),
				tradeoffs: t('projects.yukidoke.case.tradeoffs'),
				outcome: t('projects.yukidoke.case.outcome'),
				learnings: [
					t('projects.yukidoke.case.learning1'),
					t('projects.yukidoke.case.learning2'),
					t('projects.yukidoke.case.learning3'),
				],
				timeline: t('projects.yukidoke.case.timeline'),
				role: t('projects.yukidoke.case.role'),
				evidence: {
					statusLabel: t('projects.yukidoke.evidence.statusLabel'),
					status: t('projects.yukidoke.evidence.status'),
					statusDetail: t('projects.yukidoke.evidence.statusDetail'),
					implementedLabel: t('projects.yukidoke.evidence.implementedLabel'),
					implemented: [
						t('projects.yukidoke.evidence.implemented1'),
						t('projects.yukidoke.evidence.implemented2'),
						t('projects.yukidoke.evidence.implemented3'),
						t('projects.yukidoke.evidence.implemented4'),
						t('projects.yukidoke.evidence.implemented5'),
						t('projects.yukidoke.evidence.implemented6'),
					],
					plannedLabel: t('projects.yukidoke.evidence.plannedLabel'),
					planned: [
						t('projects.yukidoke.evidence.planned1'),
						t('projects.yukidoke.evidence.planned2'),
						t('projects.yukidoke.evidence.planned3'),
						t('projects.yukidoke.evidence.planned4'),
						t('projects.yukidoke.evidence.planned5'),
					],
					architectureLabel: t('projects.yukidoke.evidence.architectureLabel'),
					architecture: {
						caption: t('projects.yukidoke.evidence.architecture.caption'),
						client: t('projects.yukidoke.evidence.architecture.client'),
						identity: t('projects.yukidoke.evidence.architecture.identity'),
						api: t('projects.yukidoke.evidence.architecture.api'),
						modules: t('projects.yukidoke.evidence.architecture.modules'),
						database: t('projects.yukidoke.evidence.architecture.database'),
						processes: t('projects.yukidoke.evidence.architecture.processes'),
					},
					securityLabel: t('projects.yukidoke.evidence.securityLabel'),
					security: [
						t('projects.yukidoke.evidence.security1'),
						t('projects.yukidoke.evidence.security2'),
						t('projects.yukidoke.evidence.security3'),
						t('projects.yukidoke.evidence.security4'),
					],
					testingLabel: t('projects.yukidoke.evidence.testingLabel'),
					testing: [
						t('projects.yukidoke.evidence.testing1'),
						t('projects.yukidoke.evidence.testing2'),
						t('projects.yukidoke.evidence.testing3'),
						t('projects.yukidoke.evidence.testing4'),
					],
					deploymentLabel: t('projects.yukidoke.evidence.deploymentLabel'),
					deployment: [
						t('projects.yukidoke.evidence.deployment1'),
						t('projects.yukidoke.evidence.deployment2'),
						t('projects.yukidoke.evidence.deployment3'),
						t('projects.yukidoke.evidence.deployment4'),
					],
					limitationsLabel: t('projects.yukidoke.evidence.limitationsLabel'),
					limitations: [
						t('projects.yukidoke.evidence.limitations1'),
						t('projects.yukidoke.evidence.limitations2'),
						t('projects.yukidoke.evidence.limitations3'),
						t('projects.yukidoke.evidence.limitations4'),
					],
					sourcesLabel: t('projects.yukidoke.evidence.sourcesLabel'),
					sources: [
						{
							label: t('projects.yukidoke.evidence.source1Label'),
							access: t('projects.yukidoke.evidence.source1Access'),
							href: t('projects.yukidoke.evidence.source1Href'),
						},
						{
							label: t('projects.yukidoke.evidence.source2Label'),
							access: t('projects.yukidoke.evidence.source2Access'),
							href: t('projects.yukidoke.evidence.source2Href'),
						},
					],
				},
			},
		},
		{
			slug: 'campus-map',
			title: t('projects.campus-map.title'),
			description: t('projects.campus-map.description'),
			link: 'https://mapa-unp.sandovaldavid.com',
			github: 'https://github.com/sandovaldavid/unp-campus-map',
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
			github: 'https://github.com/sandovaldavid/MAD-AI',
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
			github: 'https://github.com/sandovaldavid/fluentreads',
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
			github: 'https://github.com/sandovaldavid/auctions',
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
