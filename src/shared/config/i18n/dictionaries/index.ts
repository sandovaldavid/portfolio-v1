import { Language } from '../languages';
import { navigationTranslations } from './navigation';
import { heroTranslations } from './hero';
import { avatarTranslations } from './avatar';
import { experienceTranslations } from './experience';
import { aboutMeTranslations } from './about-me';
import { projectsTranslations } from './projects';
import { badgesTranslations } from './badges';
import { footerTranslations } from './footer';
import { themeTranslations } from './theme';
import { notFoundTranslations } from './not-found';
import { titleSectionsTranslations } from './title-sections';
import { researchTranslations } from './research';
import { visionTranslations } from './vision';

/**
 * Combina todos los diccionarios de traducción en un solo objeto.
 *
 * @param {Language} lang - Idioma para el que se combinan las traducciones.
 * @returns {Record<string, string | readonly string[]>} Diccionario combinado de traducciones para el idioma dado.
 */
function combineTranslations(lang: Language): Record<string, string | readonly string[]> {
	return {
		...navigationTranslations[lang],
		...heroTranslations[lang],
		...avatarTranslations[lang],
		...experienceTranslations[lang],
		...aboutMeTranslations[lang],
		...projectsTranslations[lang],
		...badgesTranslations[lang],
		...footerTranslations[lang],
		...themeTranslations[lang],
		...notFoundTranslations[lang],
		...titleSectionsTranslations[lang],
		...researchTranslations[lang],
		...visionTranslations[lang],
	};
}

/**
 * Diccionarios completos de traducción para todos los idiomas soportados.
 */
export const translations = {
	[Language.ENGLISH]: combineTranslations(Language.ENGLISH),
	[Language.SPANISH]: combineTranslations(Language.SPANISH),
} as const;

/**
 * Tipo que representa todas las posibles claves de traducción.
 * Garantiza seguridad de tipos al acceder a traducciones.
 */
export type TranslationKey = keyof (typeof translations)[Language.ENGLISH];

/**
 * Tipo para el diccionario completo de traducción de un idioma.
 */
export type TranslationDictionary = (typeof translations)[Language.ENGLISH];
