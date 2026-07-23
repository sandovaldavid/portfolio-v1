import { describe, expect, it } from 'vitest';
import {
	AVAILABLE_LANGUAGES,
	DEFAULT_LANGUAGE,
	LANGUAGE_FLAGS,
	LANGUAGE_LABELS,
	Language,
	translations,
} from '@shared/config/i18n';

describe('legacy translations', () => {
	it('has English translations', () => {
		expect(translations[Language.ENGLISH]).toBeDefined();
	});

	it('has Spanish translations', () => {
		expect(translations[Language.SPANISH]).toBeDefined();
	});

	it('keeps English and Spanish keys in parity', () => {
		const enKeys = Object.keys(translations[Language.ENGLISH]).sort();
		const esKeys = Object.keys(translations[Language.SPANISH]).sort();
		expect(enKeys).toEqual(esKeys);
	});

	it('contains compatibility keys only for domains not migrated yet', () => {
		const en = translations[Language.ENGLISH];
		expect(en['nav.experience']).toBeDefined();
		expect(en['projects.code-button']).toBeDefined();
		expect(en['research.thesis.keywords']).toBeDefined();
		expect(en['experience.atena.title']).toBeUndefined();
	});

	it('does not retain home or experience copy migrated to canonical sources', () => {
		const en = translations[Language.ENGLISH];
		expect(en['hero.intro']).toBeUndefined();
		expect(en['title.experience']).toBeUndefined();
		expect(en['vision.title']).toBeUndefined();
		expect(en['badges.github-foundations.label']).toBeUndefined();
		expect(en['experience.atena.description']).toBeUndefined();
		expect(en['experience.chirasoft.title']).toBeUndefined();
		expect(en['experience.programador-ti.company']).toBeUndefined();
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
