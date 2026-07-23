import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTranslations, useTranslationsList } from '@shared/lib/i18n/translations';
import { Language } from '@shared/config/i18n';

describe('useTranslations', () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	it('returns the t function', () => {
		const t = useTranslations(Language.ENGLISH);
		expect(typeof t).toBe('function');
	});

	it('translates a known key in English', () => {
		const t = useTranslations(Language.ENGLISH);
		expect(t('nav.experience')).toBe('Experience');
	});

	it('translates a known key in Spanish', () => {
		const t = useTranslations(Language.SPANISH);
		expect(t('nav.experience')).toBe('Experiencia');
	});

	it('returns the key and warns when translation is missing', () => {
		const t = useTranslations(Language.ENGLISH);
		const result = t('non.existent.key');
		expect(result).toBe('non.existent.key');
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Missing translation'));
	});

	it('returns the first element for a remaining transitional array value', () => {
		const t = useTranslations(Language.ENGLISH);
		const result = t('research.thesis.keywords');
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(0);
	});

	it('returns both translation keys in English and Spanish for nav', () => {
		const tEn = useTranslations(Language.ENGLISH);
		const tEs = useTranslations(Language.SPANISH);
		expect(tEn('nav.projects')).toBe('Projects');
		expect(tEs('nav.projects')).toBe('Proyectos');
	});
});

describe('useTranslationsList', () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	it('returns the tList function', () => {
		const tList = useTranslationsList(Language.ENGLISH);
		expect(typeof tList).toBe('function');
	});

	it('returns a string for a scalar key', () => {
		const tList = useTranslationsList(Language.ENGLISH);
		const result = tList('nav.experience');
		expect(typeof result).toBe('string');
		expect(result).toBe('Experience');
	});

	it('returns an array for a remaining transitional research key', () => {
		const tList = useTranslationsList(Language.ENGLISH);
		const result = tList('research.thesis.keywords');
		expect(Array.isArray(result)).toBe(true);
		expect((result as string[]).length).toBeGreaterThan(0);
	});

	it('returns key and warns when translation is missing', () => {
		const tList = useTranslationsList(Language.ENGLISH);
		const result = tList('non.existent.key');
		expect(result).toBe('non.existent.key');
		expect(warnSpy).toHaveBeenCalled();
	});
});
