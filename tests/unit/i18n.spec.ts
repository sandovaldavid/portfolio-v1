import { describe, it, expect } from 'vitest';
import { getLangFromUrl, getLocalizedPath } from '@shared/lib/i18n';
import { Language } from '@shared/config/i18n';

describe('i18n utilities', () => {
	describe('getLangFromUrl', () => {
		it('should return "en" for root URL', () => {
			const url = new URL('http://localhost:4321/');
			expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
		});

		it('should return "en" for /en/ URL', () => {
			const url = new URL('http://localhost:4321/en/');
			expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
		});

		it('should return "es" for /es/ URL', () => {
			const url = new URL('http://localhost:4321/es/');
			expect(getLangFromUrl(url)).toBe(Language.SPANISH);
		});

		it('should return "en" for /en/about-me', () => {
			const url = new URL('http://localhost:4321/en/about-me');
			expect(getLangFromUrl(url)).toBe(Language.ENGLISH);
		});

		it('should return "es" for /es/sobre-mi', () => {
			const url = new URL('http://localhost:4321/es/sobre-mi');
			expect(getLangFromUrl(url)).toBe(Language.SPANISH);
		});
	});

	describe('getLocalizedPath', () => {
		it('should prefix Spanish with /es', () => {
			expect(getLocalizedPath(Language.SPANISH, '/about-me')).toBe('/es/about-me');
		});

		it('should return path unchanged for English (default)', () => {
			expect(getLocalizedPath(Language.ENGLISH, '/about-me')).toBe('/about-me');
		});

		it('should prefix /projects with /es for Spanish', () => {
			expect(getLocalizedPath(Language.SPANISH, '/projects')).toBe('/es/projects');
		});

		it('should return root path unchanged for English', () => {
			expect(getLocalizedPath(Language.ENGLISH, '/')).toBe('/');
		});
	});
});
