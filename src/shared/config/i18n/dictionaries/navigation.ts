import { Language } from '../languages';

export const navigationTranslations = {
	[Language.ENGLISH]: {
		'nav.experience': 'Experience',
		'nav.projects': 'Projects',
		'nav.about': 'About me',
		'nav.stack': 'Stack',
		'nav.research': 'Research',
	},
	[Language.SPANISH]: {
		'nav.experience': 'Experiencia',
		'nav.projects': 'Proyectos',
		'nav.about': 'Sobre mí',
		'nav.stack': 'Stack',
		'nav.research': 'Investigación',
	},
} as const;
