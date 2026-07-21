import type { Language } from '@shared/config/i18n';

const SUPPORTED_LOCALE_PREFIX = /^(en|es)\//;

/**
 * Removes the supported locale folder from an Astro content entry id.
 * Unknown prefixes are preserved so malformed or future locales remain visible.
 */
export function stripContentLocalePrefix(id: string): string {
	return id.replace(SUPPORTED_LOCALE_PREFIX, '');
}

/** Returns whether an Astro content entry id belongs to the requested locale. */
export function isContentForLanguage(id: string, language: Language): boolean {
	return id.startsWith(`${language}/`);
}
