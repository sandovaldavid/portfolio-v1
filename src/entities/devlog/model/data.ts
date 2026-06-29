import type { DevlogPost } from './types';

export function getDevlogPosts(t: (key: string) => string): DevlogPost[] {
	return [
		{
			slug: 'v1-0-0-launch',
			title: t('devlog.v1-0-0.title'),
			date: '2026-06-15',
			summary: t('devlog.v1-0-0.summary'),
			content: t('devlog.v1-0-0.content'),
			tags: ['release'],
			version: '1.0.0',
		},
		{
			slug: 'v1-1-0-beta',
			title: t('devlog.v1-1-0.title'),
			date: '2026-06-19',
			summary: t('devlog.v1-1-0.summary'),
			content: t('devlog.v1-1-0.content'),
			tags: ['sprint'],
			version: '1.1.0-beta',
		},
		{
			slug: 'v1-2-0-beta',
			title: t('devlog.v1-2-0.title'),
			date: '2026-06-21',
			summary: t('devlog.v1-2-0.summary'),
			content: t('devlog.v1-2-0.content'),
			tags: ['sprint'],
			version: '1.2.0-beta',
		},
		{
			slug: 'v1-3-0-beta',
			title: t('devlog.v1-3-0.title'),
			date: '2026-06-23',
			summary: t('devlog.v1-3-0.summary'),
			content: t('devlog.v1-3-0.content'),
			tags: ['sprint'],
			version: '1.3.0-beta',
		},
		{
			slug: 'phase-3-complete',
			title: t('devlog.phase-3.title'),
			date: '2026-06-28',
			summary: t('devlog.phase-3.summary'),
			content: t('devlog.phase-3.content'),
			tags: ['release', 'sprint'],
			version: '1.4.0-beta',
		},
	];
}
