import { Language } from '../languages';

export const heroTranslations = {
	[Language.ENGLISH]: {
		'hero.available': 'Available for work',
		'hero.intro': "Hello, I'm David Sandoval",
		'hero.description':
			'<strong>Computer Engineer</strong> graduated from the <strong>National University of Piura</strong> with training in <strong>web development</strong> and <strong>frontend</strong> certification from <strong>Alura Latam</strong> (ONE EDUCATION).',
		'hero.cta.contact': 'Contact me',
		'hero.cta.view-work': 'View Selected Work',
		'hero.cta.download-resume': 'Download Resume',
		'hero.cta.view-research': 'View Research',
		'hero.title': 'Engineering Scalable Systems',
		'hero.subtitle': 'Software Engineer | B.S. Computer Engineering',
		'hero.credential': 'Currently optimizing high-availability systems at Atena (Remote)',
	},
	[Language.SPANISH]: {
		'hero.available': 'Disponible para trabajar',
		'hero.intro': 'Hola, soy David Sandoval',
		'hero.description':
			'<strong>Ingeniero Informático</strong> egresado de la <strong>Universidad Nacional de Piura</strong> con formación en <strong>desarrollo web</strong> y certificación en <strong>frontend</strong> por <strong>Alura Latam</strong> (ONE EDUCATION).',
		'hero.cta.contact': 'Contáctame',
		'hero.cta.view-work': 'Ver mi Trabajo',
		'hero.cta.download-resume': 'Descargar CV',
		'hero.cta.view-research': 'Ver Investigación',
		'hero.title': 'Ingeniería de Sistemas Escalables',
		'hero.subtitle': 'Ingeniero de Software | B.S. Ingeniería Informática',
		'hero.credential':
			'Actualmente optimizando sistemas de alta disponibilidad en Atena (Remoto)',
	},
} as const;
