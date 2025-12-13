import type { ExperienceList } from './types';

/**
 * Experience entries
 * @param t Translation function
 * @returns Array of experience items with descriptions as arrays and technologies
 */
export function getExperienceData(t: (key: string) => string | string[]): ExperienceList {
	return [
		{
			date: t('experience.chirasoft.date') as string,
			title: t('experience.chirasoft.title') as string,
			description: t('experience.chirasoft.description') as string[],
			company: t('experience.chirasoft.company') as string,
			technologies: t('experience.chirasoft.technologies') as string[],
		},
		{
			date: t('experience.technical-support.date') as string,
			title: t('experience.technical-support.title') as string,
			description: t('experience.technical-support.description') as string[],
			company: t('experience.technical-support.company') as string,
			technologies: t('experience.technical-support.technologies') as string[],
		},
	];
}
