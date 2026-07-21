import { describe, it, expect } from 'vitest';
import { getLangFromUrl } from '@shared/lib/i18n/url-lang';
import { Language } from '@shared/config/i18n';

describe('getLangFromUrl', () => {
	it('returns default language for root path', () => {
		const url = new URL('http://localhost:4321/');
		expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
	});

	it('returns English for /en/ prefix', () => {
		const url = new URL('http://localhost:4321/en/');
		expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
	});

	it('returns Spanish for /es/ prefix', () => {
		const url = new URL('http://localhost:4321/es/');
		expect(getLangFromUrl(url)).toBe(Language.SPANISH);
	});

	it('returns English for nested /en/about-me', () => {
		const url = new URL('http://localhost:4321/en/about-me');
		expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
	});

	it('returns Spanish for nested /es/sobre-mi', () => {
		const url = new URL('http://localhost:4321/es/sobre-mi');
		expect(getLangFromUrl(url)).toBe(Language.SPANISH);
	});

	it('returns default language for /projects (no prefix)', () => {
		const url = new URL('http://localhost:4321/projects');
		expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
	});

	it('returns default language for unknown lang prefix', () => {
		const url = new URL('http://localhost:4321/fr/page');
		expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
	});

	it('returns default language for empty path segment', () => {
		const url = new URL('http://localhost:4321/about-me');
		expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
	});

	it('handles deep nested paths with /es/', () => {
		const url = new URL('http://localhost:4321/es/proyectos/detail');
		expect(getLangFromUrl(url)).toBe(Language.SPANISH);
	});
});
