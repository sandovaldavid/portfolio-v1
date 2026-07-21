import { DEFAULT_LANGUAGE, Language } from '@shared/config/i18n';

/**
 * Generates a localized path based on the language code.
 * For the default language (English), returns the path without prefix.
 * For other languages (Spanish), includes the /es language prefix.
 *
 * @param lang - The language enum value
 * @param path - The path to localize (e.g., '/#about-me', '/components')
 * @returns The localized path
 *
 * @example
 * getLocalizedPath(Language.ENGLISH, '/#about-me') // returns '/#about-me'
 * getLocalizedPath(Language.SPANISH, '/#about-me') // returns '/es/#about-me'
 */
export function getLocalizedPath(lang: Language, path: string): string {
	// For default language, use root path without prefix
	if (lang === DEFAULT_LANGUAGE) {
		return path;
	}

	// For other languages, use /lang/ prefix
	return `/${lang}${path}`;
}
