import accessibilityEn from './locales/en/accessibility.json';
import commonEn from './locales/en/common.json';
import errorsEn from './locales/en/errors.json';
import navigationEn from './locales/en/navigation.json';
import recruiterEn from './locales/en/recruiter.json';
import aboutEn from './locales/en/sections/about.json';
import heroEn from './locales/en/sections/hero.json';
import researchEn from './locales/en/sections/research.json';
import techStackEn from './locales/en/sections/tech-stack.json';
import visionEn from './locales/en/sections/vision.json';
import splashEn from './locales/en/splash.json';
import themeEn from './locales/en/theme.json';
import accessibilityEs from './locales/es/accessibility.json';
import commonEs from './locales/es/common.json';
import errorsEs from './locales/es/errors.json';
import navigationEs from './locales/es/navigation.json';
import recruiterEs from './locales/es/recruiter.json';
import aboutEs from './locales/es/sections/about.json';
import heroEs from './locales/es/sections/hero.json';
import researchEs from './locales/es/sections/research.json';
import techStackEs from './locales/es/sections/tech-stack.json';
import visionEs from './locales/es/sections/vision.json';
import splashEs from './locales/es/splash.json';
import themeEs from './locales/es/theme.json';
import { Language } from './languages';
import type { KeysWithinNamespace, LeafPath, StringCatalogShape } from './types';

const englishCatalog = {
	common: commonEn,
	navigation: navigationEn,
	accessibility: accessibilityEn,
	theme: themeEn,
	errors: errorsEn,
	recruiter: recruiterEn,
	splash: splashEn,
	sections: {
		hero: heroEn,
		about: aboutEn,
		research: researchEn,
		vision: visionEn,
		techStack: techStackEn,
	},
} as const;

const spanishCatalog = {
	common: commonEs,
	navigation: navigationEs,
	accessibility: accessibilityEs,
	theme: themeEs,
	errors: errorsEs,
	recruiter: recruiterEs,
	splash: splashEs,
	sections: {
		hero: heroEs,
		about: aboutEs,
		research: researchEs,
		vision: visionEs,
		techStack: techStackEs,
	},
} as const satisfies StringCatalogShape<typeof englishCatalog>;

export const UI_CATALOG_MODULES = [
	'common',
	'navigation',
	'accessibility',
	'theme',
	'errors',
	'recruiter',
	'splash',
	'sections.hero',
	'sections.about',
	'sections.research',
	'sections.vision',
	'sections.techStack',
] as const;

export type UiCatalog = typeof englishCatalog;
export type UiCatalogKey = LeafPath<UiCatalog>;
export type UiCatalogNamespace = (typeof UI_CATALOG_MODULES)[number];
export type UiCatalogScopedKey<Namespace extends UiCatalogNamespace> = KeysWithinNamespace<
	UiCatalogKey,
	Namespace
>;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function flattenCatalog(node: unknown, prefix = ''): Record<string, string> {
	if (!isRecord(node)) {
		throw new TypeError(`UI catalog namespace "${prefix || '<root>'}" must be an object.`);
	}

	return Object.entries(node).reduce<Record<string, string>>((catalog, [key, value]) => {
		const fullKey = prefix ? `${prefix}.${key}` : key;

		if (typeof value === 'string') {
			catalog[fullKey] = value;
			return catalog;
		}

		if (!isRecord(value)) {
			throw new TypeError(`UI catalog value "${fullKey}" must be a scalar string.`);
		}

		Object.assign(catalog, flattenCatalog(value, fullKey));
		return catalog;
	}, {});
}

const englishFlatCatalog = flattenCatalog(englishCatalog) as Record<UiCatalogKey, string>;
const spanishFlatCatalog = flattenCatalog(spanishCatalog) as Record<UiCatalogKey, string>;

export const uiCatalogs: Readonly<Record<Language, Readonly<Record<UiCatalogKey, string>>>> = {
	[Language.ENGLISH]: englishFlatCatalog,
	[Language.SPANISH]: spanishFlatCatalog,
};

export class MissingUiTranslationError extends Error {
	constructor(
		public readonly locale: Language,
		public readonly key: string
	) {
		super(`Missing UI translation "${key}" for locale "${locale}".`);
		this.name = 'MissingUiTranslationError';
	}
}

export function validateUiCatalogs(): true {
	const moduleNames = new Set(UI_CATALOG_MODULES);
	if (moduleNames.size !== UI_CATALOG_MODULES.length) {
		throw new Error('UI catalog module namespaces must be unique.');
	}

	const englishKeys = Object.keys(englishFlatCatalog).sort();
	const spanishKeys = Object.keys(spanishFlatCatalog).sort();

	if (englishKeys.length !== spanishKeys.length) {
		throw new Error('English and Spanish UI catalogs must contain the same number of keys.');
	}

	for (const [index, englishKey] of englishKeys.entries()) {
		if (spanishKeys[index] !== englishKey) {
			throw new Error(`UI catalog key parity failed at "${englishKey}".`);
		}
	}

	for (const [locale, catalog] of Object.entries(uiCatalogs)) {
		for (const [key, value] of Object.entries(catalog)) {
			if (value.trim().length === 0) {
				throw new MissingUiTranslationError(locale as Language, key);
			}
		}
	}

	return true;
}

export function getUiCatalog(locale: Language): Readonly<Record<UiCatalogKey, string>> {
	return uiCatalogs[locale];
}

export function translateUi(locale: Language, key: UiCatalogKey): string {
	const value = uiCatalogs[locale]?.[key];
	if (typeof value !== 'string' || value.trim().length === 0) {
		throw new MissingUiTranslationError(locale, key);
	}
	return value;
}

export function createUiTranslator(locale: Language) {
	return <Key extends UiCatalogKey>(key: Key): string => translateUi(locale, key);
}

export function getUiCatalogNamespace<Namespace extends UiCatalogNamespace>(
	locale: Language,
	namespace: Namespace
): Readonly<Record<UiCatalogScopedKey<Namespace>, string>> {
	const prefix = `${namespace}.`;
	return Object.fromEntries(
		Object.entries(uiCatalogs[locale])
			.filter(([key]) => key.startsWith(prefix))
			.map(([key, value]) => [key.slice(prefix.length), value])
	) as Record<UiCatalogScopedKey<Namespace>, string>;
}

export function createScopedUiTranslator<Namespace extends UiCatalogNamespace>(
	locale: Language,
	namespace: Namespace
) {
	return (key: UiCatalogScopedKey<Namespace>): string =>
		translateUi(locale, `${namespace}.${key}` as UiCatalogKey);
}

validateUiCatalogs();
