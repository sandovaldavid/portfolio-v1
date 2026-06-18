import { describe, it, expect } from 'vitest';
import { getLangFromUrl, getLocalizedPath } from '@shared/lib/i18n';

describe('i18n utilities', () => {
  describe('getLangFromUrl', () => {
    it('should return "en" for root URL', () => {
      const url = new URL('http://localhost:4321/');
      const lang = getLangFromUrl(url);
      expect(lang).toBe('en');
    });

    it('should return "en" for /en/ URL', () => {
      const url = new URL('http://localhost:4321/en/');
      const lang = getLangFromUrl(url);
      expect(lang).toBe('en');
    });

    it('should return "es" for /es/ URL', () => {
      const url = new URL('http://localhost:4321/es/');
      const lang = getLangFromUrl(url);
      expect(lang).toBe('es');
    });

    it('should return "en" for /en/about-me', () => {
      const url = new URL('http://localhost:4321/en/about-me');
      const lang = getLangFromUrl(url);
      expect(lang).toBe('en');
    });

    it('should return "es" for /es/sobre-mi', () => {
      const url = new URL('http://localhost:4321/es/sobre-mi');
      const lang = getLangFromUrl(url);
      expect(lang).toBe('es');
    });
  });

  describe('getLocalizedPath', () => {
    it('should add /es prefix for Spanish', () => {
      const path = getLocalizedPath('/about-me', 'es');
      expect(path).toBe('/es/sobre-mi');
    });

    it('should not add /en prefix for English', () => {
      const path = getLocalizedPath('/about-me', 'en');
      expect(path).toBe('/about-me');
    });

    it('should translate project path to Spanish', () => {
      const path = getLocalizedPath('/projects', 'es');
      expect(path).toBe('/es/proyectos');
    });

    it('should keep root path for root', () => {
      const path = getLocalizedPath('/', 'en');
      expect(path).toBe('/');
    });
  });
});
