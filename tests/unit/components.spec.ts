import { describe, it, expect } from 'vitest';
import { useTranslations } from '@shared/lib/i18n';
import { Language } from '@shared/config/i18n';

describe('useTranslations', () => {
	const t = useTranslations(Language.ENGLISH);

	it('should resolve hero.title', () => {
		expect(t('hero.title')).toBe('Engineering Scalable Systems');
	});

	it('should resolve hero.stats.characterStats', () => {
		expect(t('hero.stats.characterStats')).toBe('CHARACTER STATS');
	});

	it('should resolve hero.stats.online', () => {
		expect(t('hero.stats.online')).toBe('ONLINE');
	});

	it('should resolve hero.cta.start', () => {
		expect(t('hero.cta.start')).toBe('PRESS START // VIEW WORK');
	});

	it('should resolve hero.subtitle', () => {
		expect(t('hero.subtitle')).toContain('Software Engineer');
	});

	it('should resolve hero.credential', () => {
		expect(t('hero.credential')).toContain('Atena');
	});

	it('should resolve nav keys', () => {
		expect(t('nav.experience')).toBe('Experience');
		expect(t('nav.projects')).toBe('Projects');
		expect(t('nav.research')).toBe('Research');
		expect(t('nav.about')).toBe('About me');
		expect(t('nav.stack')).toBe('Stack');
	});

	it('should return key name for missing keys', () => {
		const result = t('nonexistent.key.path');
		expect(result).toBe('nonexistent.key.path');
	});
});

describe('useTranslations — Spanish', () => {
	const t = useTranslations(Language.SPANISH);

	it('should resolve hero.title in ES', () => {
		expect(t('hero.title')).toBe('Ingeniería de Sistemas Escalables');
	});

	it('should resolve hero.stats.characterStats in ES', () => {
		expect(t('hero.stats.characterStats')).toBe('ESTADÍSTICAS');
	});

	it('should resolve hero.banner in ES', () => {
		expect(t('hero.banner')).toBe('[ ESTADO DEL SISTEMA: ACTIVO // JUGADOR 1 LISTO ]');
	});

	it('should resolve hero.cta.start in ES', () => {
		expect(t('hero.cta.start')).toBe('PRESIONA START // VER TRABAJO');
	});

	it('should resolve nav keys in ES', () => {
		expect(t('nav.experience')).toBe('Experiencia');
		expect(t('nav.projects')).toBe('Proyectos');
		expect(t('nav.stack')).toBe('Stack');
	});
});
