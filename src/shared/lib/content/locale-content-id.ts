import type { Language } from '@shared/config/i18n';

const SUPPORTED_LOCALE_PREFIX = /^(en|es)\//;

/**
 * Removes the supported locale folder from an Astro content entry id.
 * Unknown prefixes are preserved so malformed or future locales remain visible.
 */
export function stripContentLocalePrefix(id: string): string {
	return id.replace(SUPPORTED_LOCALE_PREFIX, '');
}

/** Returns the supported locale encoded in an Astro content entry id. */
export function getContentLanguage(id: string): Language | undefined {
	const locale = id.split('/', 1)[0];
	return locale === 'en' || locale === 'es' ? locale : undefined;
}

/** Returns whether an Astro content entry id belongs to the requested locale. */
export function isContentForLanguage(id: string, language: Language): boolean {
	return getContentLanguage(id) === language;
}
