/**
 * Supported languages in the application.
 * This enum ensures type safety throughout the codebase.
 */
export enum Language {
	ENGLISH = 'en',
	SPANISH = 'es',
}

/**
 * Language metadata for display purposes
 */
export const LANGUAGE_LABELS = {
	[Language.ENGLISH]: 'English',
	[Language.SPANISH]: 'Español',
} as const;

/**
 * Language flags for UI components
 */
export const LANGUAGE_FLAGS = {
	[Language.ENGLISH]: 'US',
	[Language.SPANISH]: 'ES',
} as const;

/**
 * Default language for the application
 */
export const DEFAULT_LANGUAGE = Language.ENGLISH;

/**
 * All available languages
 */
export const AVAILABLE_LANGUAGES = Object.values(Language);
