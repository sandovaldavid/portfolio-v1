import type { ExperienceList } from './types';

/**
 * Experience entries
 * @param t Translation function
 * @returns Array of experience items with descriptions as arrays and technologies
 */
export function getExperienceData(t: (key: string) => string | string[]): ExperienceList {
	return [
		{
			date: t('experience.atena.date') as string,
			title: t('experience.atena.title') as string,
			description: t('experience.atena.description') as string[],
			company: t('experience.atena.company') as string,
			technologies: t('experience.atena.technologies') as string[],
		},
		{
			date: t('experience.chirasoft.date') as string,
			title: t('experience.chirasoft.title') as string,
			description: t('experience.chirasoft.description') as string[],
			company: t('experience.chirasoft.company') as string,
			technologies: t('experience.chirasoft.technologies') as string[],
		},
		{
			date: t('experience.programador-ti.date') as string,
			title: t('experience.programador-ti.title') as string,
			description: t('experience.programador-ti.description') as string[],
			company: t('experience.programador-ti.company') as string,
			technologies: t('experience.programador-ti.technologies') as string[],
		},
	];
}
