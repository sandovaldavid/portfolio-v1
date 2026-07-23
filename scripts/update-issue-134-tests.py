from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(path: str, content: str) -> None:
    (ROOT / path).write_text(content.strip() + "\n", encoding="utf-8")


write(
    "tests/unit/components.spec.ts",
    r'''
import { describe, expect, it } from 'vitest';
import { createScopedUiTranslator, Language } from '@shared/config/i18n';

describe('home section catalog consumers', () => {
	it('resolves English hero and section copy', () => {
		const hero = createScopedUiTranslator(Language.ENGLISH, 'sections.hero');
		const research = createScopedUiTranslator(Language.ENGLISH, 'sections.research');
		const techStack = createScopedUiTranslator(Language.ENGLISH, 'sections.techStack');

		expect(hero('title')).toBe('Software Engineer building reliable web products');
		expect(hero('credential')).toContain('BiLSTM/OSS research');
		expect(research('sectionTitle')).toBe('Research');
		expect(techStack('frontendTitle')).toBe('Core frontend stack');
	});

	it('resolves Spanish hero and section copy', () => {
		const hero = createScopedUiTranslator(Language.SPANISH, 'sections.hero');
		const research = createScopedUiTranslator(Language.SPANISH, 'sections.research');
		const techStack = createScopedUiTranslator(Language.SPANISH, 'sections.techStack');

		expect(hero('title')).toBe('Ingeniero de software que construye productos web confiables');
		expect(hero('banner')).toContain('DISPONIBLE');
		expect(research('sectionTitle')).toBe('Investigación');
		expect(techStack('frontendTitle')).toBe('Stack frontend principal');
	});

	it('reuses shared status and action labels', () => {
		const commonEn = createScopedUiTranslator(Language.ENGLISH, 'common');
		const commonEs = createScopedUiTranslator(Language.SPANISH, 'common');

		expect(commonEn('status.available')).toBe('Available');
		expect(commonEs('status.inProgress')).toBe('En progreso');
		expect(commonEn('actions.viewWork')).toBe('View work');
		expect(commonEs('actions.viewWork')).toBe('Ver proyectos');
	});
});
''',
)

write(
    "tests/unit/i18n/translations.spec.ts",
    r'''
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

	it('provides the Yukidoke flagship case study in both languages', () => {
		const tEn = useTranslations(Language.ENGLISH);
		const tEs = useTranslations(Language.SPANISH);
		const requiredKeys = [
			'projects.yukidoke.title',
			'projects.yukidoke.description',
			'projects.yukidoke.case.problem',
			'projects.yukidoke.case.approach',
			'projects.yukidoke.case.tradeoffs',
			'projects.yukidoke.case.outcome',
			'projects.yukidoke.evidence.status',
			'projects.yukidoke.evidence.architecture.caption',
			'projects.yukidoke.evidence.security1',
			'projects.yukidoke.evidence.testing1',
			'projects.yukidoke.evidence.deployment1',
			'projects.yukidoke.evidence.limitations1',
		] as const;

		for (const key of requiredKeys) {
			expect(tEn(key)).not.toBe(key);
			expect(tEs(key)).not.toBe(key);
		}

		expect(tEn('projects.yukidoke.title')).toBe('Yukidoke');
		expect(tEs('projects.yukidoke.title')).toBe('Yukidoke');
		expect(tEn('projects.yukidoke.evidence.status')).toContain('V1 beta');
		expect(tEs('projects.yukidoke.evidence.status')).toContain('Beta V1');
	});

	it('returns the key and warns when translation is missing', () => {
		const t = useTranslations(Language.ENGLISH);
		const result = t('non.existent.key');
		expect(result).toBe('non.existent.key');
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Missing translation'));
	});

	it('returns first element when value is an array', () => {
		const t = useTranslations(Language.ENGLISH);
		const result = t('experience.atena.description');
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

	it('returns an array for an array key', () => {
		const tList = useTranslationsList(Language.ENGLISH);
		const result = tList('experience.atena.description');
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
''',
)

write(
    "tests/unit/i18n/dictionaries.spec.ts",
    r'''
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

	it('contains compatibility keys for domains not migrated yet', () => {
		const en = translations[Language.ENGLISH];
		expect(en['nav.experience']).toBeDefined();
		expect(en['projects.code-button']).toBeDefined();
		expect(en['experience.atena.title']).toBeDefined();
	});

	it('does not retain home copy migrated to granular catalogs', () => {
		const en = translations[Language.ENGLISH];
		expect(en['hero.intro']).toBeUndefined();
		expect(en['title.experience']).toBeUndefined();
		expect(en['vision.title']).toBeUndefined();
		expect(en['badges.github-foundations.label']).toBeUndefined();
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
''',
)

catalog_path = ROOT / "tests/unit/i18n-catalog.spec.ts"
catalog = catalog_path.read_text(encoding="utf-8")
catalog = catalog.replace("'sections.techStack.title'", "'sections.techStack.sectionTitle'")
catalog = catalog.replace("'Tools selected for the problem'", "'Technologies'")
catalog_path.write_text(catalog, encoding="utf-8")
