import { describe, it, expect } from 'vitest';
import { getLocalizedPath } from '@shared/lib/i18n/localized-path';
import { Language } from '@shared/config/i18n';

describe('getLocalizedPath', () => {
	describe('default language (English)', () => {
		it('returns path unchanged for root', () => {
			expect(getLocalizedPath(Language.ENGLISH, '/')).toBe('/');
		});

		it('returns path unchanged for /about-me', () => {
			expect(getLocalizedPath(Language.ENGLISH, '/about-me')).toBe('/about-me');
		});

		it('returns path unchanged for /projects', () => {
			expect(getLocalizedPath(Language.ENGLISH, '/projects')).toBe('/projects');
		});

		it('returns path unchanged with anchor', () => {
			expect(getLocalizedPath(Language.ENGLISH, '/#about-me')).toBe('/#about-me');
		});

		it('returns path unchanged for nested path', () => {
			expect(getLocalizedPath(Language.ENGLISH, '/projects/detail')).toBe('/projects/detail');
		});
	});

	describe('non-default language (Spanish)', () => {
		it('prefixes root with /es', () => {
			expect(getLocalizedPath(Language.SPANISH, '/')).toBe('/es/');
		});

		it('prefixes /about-me with /es', () => {
			expect(getLocalizedPath(Language.SPANISH, '/about-me')).toBe('/es/about-me');
		});

		it('prefixes /projects with /es', () => {
			expect(getLocalizedPath(Language.SPANISH, '/projects')).toBe('/es/projects');
		});

		it('prefixes anchor path with /es', () => {
			expect(getLocalizedPath(Language.SPANISH, '/#about-me')).toBe('/es/#about-me');
		});

		it('prefixes nested path with /es', () => {
			expect(getLocalizedPath(Language.SPANISH, '/projects/detail')).toBe(
				'/es/projects/detail'
			);
		});
	});
});
