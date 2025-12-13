import { Language } from '../languages';

export const footerTranslations = {
	[Language.ENGLISH]: {
		'footer.rights': 'All rights reserved',
		'footer.about': 'About me',
		'footer.contact': 'Contact',
		'footer.title': "Let's Build Something",
		'footer.subtitle': 'Open to opportunities and collaborations',
		'footer.cta': 'Get In Touch',
		'footer.built-with': 'Designed & Built with Astro',
	},
	[Language.SPANISH]: {
		'footer.rights': 'Todos los derechos reservados',
		'footer.about': 'Sobre mí',
		'footer.contact': 'Contacto',
		'footer.title': 'Construyamos algo juntos',
		'footer.subtitle': 'Abierto a oportunidades y colaboraciones',
		'footer.cta': 'Contáctame',
		'footer.built-with': 'Diseñado y Construido con Astro',
	},
} as const;
