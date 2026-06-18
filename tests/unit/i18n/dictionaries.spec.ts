import { describe, it, expect } from 'vitest';
import { translations, DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES, Language, LANGUAGE_LABELS, LANGUAGE_FLAGS } from '@shared/config/i18n';

describe('translations', () => {
	it('has English translations', () => {
		expect(translations[Language.ENGLISH]).toBeDefined();
	});

	it('has Spanish translations', () => {
		expect(translations[Language.SPANISH]).toBeDefined();
	});

	it('English and Spanish have the same keys', () => {
		const enKeys = Object.keys(translations[Language.ENGLISH]).sort();
		const esKeys = Object.keys(translations[Language.SPANISH]).sort();
		expect(enKeys).toEqual(esKeys);
	});

	it('contains expected navigation keys', () => {
		const en = translations[Language.ENGLISH];
		expect(en['nav.experience']).toBeDefined();
		expect(en['nav.projects']).toBeDefined();
		expect(en['nav.about']).toBeDefined();
	});

	it('contains expected hero keys', () => {
		const en = translations[Language.ENGLISH];
		expect(en['hero.intro']).toBeDefined();
		expect(en['hero.title']).toBeDefined();
	});
});

describe('Language enum', () => {
	it('has ENGLISH value "en"', () => {
		expect(Language.ENGLISH).toBe('en');
	});

	it('has SPANISH value "es"', () => {
		expect(Language.SPANISH).toBe('es');
	});
});

describe('DEFAULT_LANGUAGE', () => {
	it('is English', () => {
		expect(DEFAULT_LANGUAGE).toBe(Language.ENGLISH);
	});
});

describe('AVAILABLE_LANGUAGES', () => {
	it('contains both languages', () => {
		expect(AVAILABLE_LANGUAGES).toContain(Language.ENGLISH);
		expect(AVAILABLE_LANGUAGES).toContain(Language.SPANISH);
	});

	it('has exactly 2 languages', () => {
		expect(AVAILABLE_LANGUAGES).toHaveLength(2);
	});
});

describe('LANGUAGE_LABELS', () => {
	it('has label for English', () => {
		expect(LANGUAGE_LABELS[Language.ENGLISH]).toBe('English');
	});

	it('has label for Spanish', () => {
		expect(LANGUAGE_LABELS[Language.SPANISH]).toBe('Español');
	});
});

describe('LANGUAGE_FLAGS', () => {
	it('has flag for English', () => {
		expect(LANGUAGE_FLAGS[Language.ENGLISH]).toBe('US');
	});

	it('has flag for Spanish', () => {
		expect(LANGUAGE_FLAGS[Language.SPANISH]).toBe('ES');
	});
});
