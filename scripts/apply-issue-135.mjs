import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = process.cwd();

async function writeText(path, content) {
	const target = resolve(root, path);
	await mkdir(dirname(target), { recursive: true });
	await writeFile(target, `${content.trim()}\n`, 'utf8');
}

async function readJson(path) {
	return JSON.parse(await readFile(resolve(root, path), 'utf8'));
}

async function writeJson(path, value) {
	await writeText(path, JSON.stringify(value, null, '\t'));
}

await writeText(
	'src/content.config.ts',
	String.raw`
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const nonEmptyString = z.string().trim().min(1);

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			heroImage: image().optional(),
			draft: z.boolean().default(false),
			canonicalUrl: z.url().optional(),
		}),
});

const devlog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/devlog' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		pubDate: z.coerce.date(),
		version: z.string(),
		tags: z.array(z.string()).default([]),
	}),
});

const portfolioProfile = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/portfolio-profile' }),
	schema: z.object({
		profileId: z.string().regex(/^[a-z0-9-]+$/),
		locale: z.enum(['en', 'es']),
		seo: z.object({
			title: nonEmptyString,
			description: nonEmptyString,
		}),
		summary: nonEmptyString,
		biography: z.array(nonEmptyString).min(3),
		focusAreas: z.array(nonEmptyString).min(1),
		availabilityStatement: nonEmptyString,
		location: nonEmptyString,
		workMode: nonEmptyString,
		researchSummary: nonEmptyString,
		currentRoleSummary: nonEmptyString,
	}),
});

export const collections = { blog, devlog, portfolioProfile };
`
);

await writeJson('src/content/portfolio-profile/en/profile.json', {
	profileId: 'david-sandoval',
	locale: 'en',
	seo: {
		title: 'About David Sandoval — Software Engineer',
		description:
			'Learn about David Sandoval, a Software Engineer building maintainable web products with Angular, .NET and TypeScript and researching OSS abandonment with BiLSTM models.',
	},
	summary:
		'Computer Engineer building maintainable web products with Angular, .NET and TypeScript. My work includes frontend modernization, REST APIs and performance improvements. I also research OSS abandonment prediction using BiLSTM models.',
	biography: [
		'Computer Engineer focused on building maintainable web products with Angular, .NET and TypeScript. I value clear architecture when it reduces delivery risk, not as an objective by itself.',
		'My professional work includes modernizing frontend modules, contributing to REST APIs, improving bundle delivery and supporting migrations from legacy systems. The public portfolio documents the projects and trade-offs that can be shared openly.',
		'Alongside product engineering, I research Mining Software Repositories and the use of BiLSTM models to study OSS project abandonment. This research is a secondary specialization that complements my software-engineering work.',
	],
	focusAreas: [
		'Angular and reactive frontend architecture',
		'.NET APIs and maintainable backend boundaries',
		'TypeScript and web performance',
		'Automated testing and CI quality gates',
		'BiLSTM models for OSS abandonment prediction',
		'Open-source documentation and contribution',
	],
	availabilityStatement:
		'Open to remote software engineering opportunities across Europe and Latin America.',
	location: 'Lima, Peru (UTC-5)',
	workMode: 'Remote across Europe and Latin America',
	researchSummary:
		'Researching OSS abandonment prediction with BiLSTM models and repository activity data.',
	currentRoleSummary:
		'I currently work at Atena as a Software Engineer contributing to Angular frontends and .NET APIs. My focus is maintainable delivery, measurable performance improvements and clear technical documentation.',
});

await writeJson('src/content/portfolio-profile/es/profile.json', {
	profileId: 'david-sandoval',
	locale: 'es',
	seo: {
		title: 'Sobre David Sandoval — Ingeniero de Software',
		description:
			'Conoce a David Sandoval, ingeniero de software que construye productos web mantenibles con Angular, .NET y TypeScript e investiga el abandono de proyectos OSS con modelos BiLSTM.',
	},
	summary:
		'Ingeniero Informático que construye productos web mantenibles con Angular, .NET y TypeScript. Mi trabajo incluye modernización frontend, APIs REST y mejoras de rendimiento. También investigo la predicción de abandono de proyectos OSS mediante modelos BiLSTM.',
	biography: [
		'Ingeniero Informático enfocado en construir productos web mantenibles con Angular, .NET y TypeScript. Valoro una arquitectura clara cuando reduce riesgos de entrega, no como un objetivo por sí misma.',
		'Mi experiencia profesional incluye modernización de módulos frontend, contribución en APIs REST, mejoras en la entrega de bundles y apoyo en migraciones desde sistemas legacy. El portafolio documenta los proyectos y trade-offs que pueden compartirse públicamente.',
		'En paralelo al desarrollo de productos, investigo Mining Software Repositories y el uso de modelos BiLSTM para estudiar el abandono de proyectos OSS. Esta investigación es una especialización secundaria que complementa mi trabajo en ingeniería de software.',
	],
	focusAreas: [
		'Angular y arquitectura frontend reactiva',
		'APIs .NET y límites backend mantenibles',
		'TypeScript y rendimiento web',
		'Pruebas automatizadas y quality gates en CI',
		'Modelos BiLSTM para predecir abandono OSS',
		'Documentación y contribución open source',
	],
	availabilityStatement:
		'Disponible para oportunidades remotas de ingeniería de software en Europa y Latinoamérica.',
	location: 'Lima, Perú (UTC-5)',
	workMode: 'Remoto para Europa y Latinoamérica',
	researchSummary:
		'Investigación sobre predicción de abandono OSS mediante modelos BiLSTM y datos de actividad de repositorios.',
	currentRoleSummary:
		'Actualmente trabajo en Atena como Software Engineer, contribuyendo en frontends Angular y APIs .NET. Mi enfoque es entregar software mantenible, aplicar mejoras de rendimiento medibles y documentar las decisiones técnicas.',
});

await writeText(
	'src/entities/profile/model/types.ts',
	String.raw`
import type { CollectionEntry } from 'astro:content';

export type PortfolioProfile = CollectionEntry<'portfolioProfile'>;
export type PortfolioProfileData = PortfolioProfile['data'];
`
);

await writeText(
	'src/entities/profile/model/queries.ts',
	String.raw`
import { getEntry } from 'astro:content';
import { Language } from '@shared/config/i18n';
import type { PortfolioProfile } from './types';

const PROFILE_ENTRY_ID: Record<Language, string> = {
	[Language.ENGLISH]: 'en/profile',
	[Language.SPANISH]: 'es/profile',
};

export async function getPortfolioProfile(lang: Language): Promise<PortfolioProfile> {
	const profile = await getEntry('portfolioProfile', PROFILE_ENTRY_ID[lang]);

	if (!profile) {
		throw new Error(`Missing portfolio profile content for locale "${lang}".`);
	}

	if (profile.data.locale !== lang) {
		throw new Error(
			`Portfolio profile locale mismatch: requested "${lang}", received "${profile.data.locale}".`
		);
	}

	return profile;
}
`
);

await writeText(
	'src/entities/profile/model/index.ts',
	String.raw`
export type { PortfolioProfile, PortfolioProfileData } from './types';
export { getPortfolioProfile } from './queries';
`
);

await writeText(
	'src/entities/profile/index.ts',
	String.raw`
export type { PortfolioProfile, PortfolioProfileData } from './model';
export { getPortfolioProfile } from './model';
`
);

await writeText(
	'src/widgets/about-content/ui/AboutContent.astro',
	String.raw`
---
import type { PortfolioProfileData } from '@entities/profile';
import { createScopedUiTranslator, Language } from '@shared/config/i18n';
import { getLocalizedPath } from '@shared/lib/i18n';
import { SectionContainer } from '@shared/ui';

interface Props {
	lang: Language;
	profile: PortfolioProfileData;
}

const { lang, profile } = Astro.props;
const tAbout = createScopedUiTranslator(lang, 'sections.about');
---

<SectionContainer id="about-details" class="w-full max-w-4xl px-4 flex flex-col gap-8">
	<div class="text-center space-y-3">
		<h1
			class="text-4xl md:text-5xl font-bold font-pixel-clean text-content-strong uppercase tracking-wide"
		>
			{tAbout('biographyTitle')}
		</h1>
		<p class="text-content-muted font-mono text-sm uppercase">{tAbout('profileRecord')}</p>
	</div>

	<div class="space-y-6">
		<article
			class="rounded-none bg-surface border-2 border-edge-strong p-8 md:p-10 shadow-retro-lg transition-all duration-100"
		>
			<div class="flex flex-col items-center justify-center gap-8 md:gap-12 md:flex-row">
				<div class="flex-1 space-y-4 text-content text-pretty font-mono text-base leading-relaxed">
					{profile.biography.map(paragraph => <p>{paragraph}</p>)}
				</div>

				<div class="shrink-0">
					<img
						width="240"
						height="240"
						src="/profile/perfil.webp"
						alt={tAbout('imageAlt')}
						class="w-56 h-56 object-cover aspect-square rounded-none border-2 border-black dark:border-white shadow-retro-lg"
						style="object-position: 50% 50%"
					/>
				</div>
			</div>
		</article>

		<article
			class="rounded-none bg-surface border-2 border-edge-strong p-8 md:p-10 shadow-retro-lg transition-all duration-100"
		>
			<h2
				class="font-pixel-clean text-2xl font-bold uppercase tracking-wider text-primary-500 dark:text-primary-400 mb-6 border-b-2 border-dashed border-edge-subtle pb-2"
			>
				{tAbout('focusTitle')}
			</h2>
			<ul class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 font-mono text-base">
				{
					profile.focusAreas.map((area, idx) => (
						<li
							class="flex items-start gap-3 transition-all duration-300"
							style={`animation: var(--animate-slide-up); animation-delay: ${idx * 50}ms;`}
						>
							<span class="shrink-0 w-2.5 h-2.5 rounded-none bg-primary-500 dark:bg-primary-400 mt-1.5" />
							<span class="text-content leading-relaxed">{area}</span>
						</li>
					))
				}
			</ul>
		</article>
	</div>

	<div class="w-full flex justify-center mt-4">
		<a
			href={getLocalizedPath(lang, '/')}
			class="inline-flex items-center justify-center rounded-none bg-surface text-content-strong border-2 border-black dark:border-white text-base px-6 py-3.5 font-bold uppercase tracking-wider transition-all duration-100 shadow-retro-md hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-retro-xl active:translate-x-[1px] active:translate-y-[1px] active:shadow-retro-xs"
		>
			{tAbout('returnHome')}
		</a>
	</div>
</SectionContainer>
`
);

await writeText(
	'src/widgets/about-me/ui/AboutMe.astro',
	String.raw`
---
import { getPortfolioProfile } from '@entities/profile';
import { createScopedUiTranslator, Language } from '@shared/config/i18n';
import { getLangFromUrl, getLocalizedPath } from '@shared/lib/i18n';

const langCode = getLangFromUrl(new URL(Astro.request.url));
const lang = langCode === 'en' ? Language.ENGLISH : Language.SPANISH;
const profile = (await getPortfolioProfile(lang)).data;
const tAbout = createScopedUiTranslator(lang, 'sections.about');
const tCommon = createScopedUiTranslator(lang, 'common');
---

<div class="space-y-6">
	<article
		class="rounded-none bg-surface border-2 border-edge-strong p-8 md:p-10 shadow-retro-lg transition-all duration-100"
	>
		<div class="flex flex-col items-center justify-center gap-8 md:gap-12 md:flex-row">
			<div class="flex-1 space-y-4">
				<h3
					class="font-pixel-clean text-2xl font-bold uppercase tracking-wider text-primary-500 dark:text-primary-400"
				>
					{tAbout('profileTitle')}
				</h3>
				<p class="text-content text-base leading-relaxed text-pretty">
					{profile.summary}
				</p>
				<div class="pt-2">
					<a
						href={getLocalizedPath(lang, '/about')}
						class="inline-flex items-center justify-center rounded-none bg-primary-500 text-white dark:text-black border-2 border-black dark:border-white text-xs px-5 py-3 font-bold uppercase tracking-wider transition-all duration-100 shadow-retro-sm hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-retro-md active:translate-x-[1px] active:translate-y-[1px] active:shadow-retro-xs"
					>
						{tAbout('readMore')}
					</a>
				</div>
			</div>

			<div class="shrink-0 relative group">
				<div
					class="absolute inset-0 bg-primary-500 translate-x-1.5 translate-y-1.5 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-transform duration-200"
				>
				</div>
				<img
					width="240"
					height="240"
					src="/profile/perfil.webp"
					alt={tAbout('imageAlt')}
					class="relative w-48 h-48 md:w-56 md:h-56 object-cover aspect-square rounded-none border-2 border-black dark:border-white transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
					style="object-position: 50% 50%"
				/>
			</div>
		</div>
	</article>

	<article
		class="rounded-none bg-surface border-2 border-edge-strong p-8 md:p-10 shadow-retro-lg transition-all duration-100"
	>
		<div class="space-y-4">
			<h3
				class="font-pixel-clean text-2xl font-bold uppercase tracking-wider text-primary-500 dark:text-primary-400"
			>
				{tAbout('currentTitle')}
			</h3>
			<p class="text-content text-base leading-relaxed text-pretty">
				{profile.currentRoleSummary}
			</p>
			<div class="pt-2">
				<a
					href={getLocalizedPath(lang, '/atena')}
					class="inline-flex items-center justify-center rounded-none bg-primary-500 text-white dark:text-black border-2 border-black dark:border-white text-xs px-5 py-3 font-bold uppercase tracking-wider transition-all duration-100 shadow-retro-sm hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-retro-md active:translate-x-[1px] active:translate-y-[1px] active:shadow-retro-xs"
				>
					{tCommon('actions.viewWork')}
				</a>
			</div>
		</div>
	</article>
</div>
`
);

await writeText(
	'src/pages/about.astro',
	String.raw`
---
import Layout from '@app/layouts/Layout.astro';
import { getPortfolioProfile } from '@entities/profile';
import { Language } from '@shared/config/i18n';
import { AboutContent } from '@widgets/about-content';

const lang = Language.ENGLISH;
const profile = await getPortfolioProfile(lang);
---

<Layout
	title={profile.data.seo.title}
	description={profile.data.seo.description}
	img_preview="/projects/portfolio.webp"
>
	<AboutContent {lang} profile={profile.data} />
</Layout>
`
);

await writeText(
	'src/pages/es/about.astro',
	String.raw`
---
import Layout from '@app/layouts/Layout.astro';
import { getPortfolioProfile } from '@entities/profile';
import { Language } from '@shared/config/i18n';
import { AboutContent } from '@widgets/about-content';

const lang = Language.SPANISH;
const profile = await getPortfolioProfile(lang);
---

<Layout
	title={profile.data.seo.title}
	description={profile.data.seo.description}
	img_preview="/projects/portfolio.webp"
>
	<AboutContent {lang} profile={profile.data} />
</Layout>
`
);

await writeJson('src/shared/config/i18n/locales/en/sections/about.json', {
	sectionTitle: 'About me',
	profileTitle: 'Professional profile',
	readMore: 'Read full biography',
	currentTitle: 'Current role @ Atena',
	imageAlt: 'Juan David Sandoval, Software Engineer',
	biographyTitle: 'Full biography',
	profileRecord: '[ PROFILE: DAVID_S // SOFTWARE ENGINEERING ]',
	focusTitle: 'Currently focused on',
	returnHome: '[ RETURN TO HOME ]',
});

await writeJson('src/shared/config/i18n/locales/es/sections/about.json', {
	sectionTitle: 'Sobre mí',
	profileTitle: 'Perfil profesional',
	readMore: 'Leer biografía completa',
	currentTitle: 'Rol actual @ Atena',
	imageAlt: 'Juan David Sandoval, ingeniero de software',
	biographyTitle: 'Biografía completa',
	profileRecord: '[ PERFIL: DAVID_S // INGENIERÍA DE SOFTWARE ]',
	focusTitle: 'Enfoque actual',
	returnHome: '[ VOLVER AL INICIO ]',
});

for (const locale of ['en', 'es']) {
	const path = `src/shared/config/i18n/locales/${locale}.json`;
	const legacy = await readJson(path);
	delete legacy['about-me'];
	await writeJson(path, legacy);
}

await writeText(
	'tests/unit/profile-content.spec.ts',
	String.raw`
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const readSource = (path: string): string => readFileSync(path, 'utf8');
const readJson = <T>(path: string): T => JSON.parse(readSource(path)) as T;

interface ProfileDocument {
	profileId: string;
	locale: 'en' | 'es';
	seo: { title: string; description: string };
	summary: string;
	biography: string[];
	focusAreas: string[];
	availabilityStatement: string;
	location: string;
	workMode: string;
	researchSummary: string;
	currentRoleSummary: string;
}

const profiles = {
	en: readJson<ProfileDocument>('src/content/portfolio-profile/en/profile.json'),
	es: readJson<ProfileDocument>('src/content/portfolio-profile/es/profile.json'),
};

const scalarFields = [
	'summary',
	'availabilityStatement',
	'location',
	'workMode',
	'researchSummary',
	'currentRoleSummary',
] as const;

describe('localized portfolio profile content', () => {
	it('registers a schema-validated Astro content collection', () => {
		const config = readSource('src/content.config.ts');
		expect(config).toContain('const portfolioProfile = defineCollection');
		expect(config).toContain("base: './src/content/portfolio-profile'");
		expect(config).toContain('export const collections = { blog, devlog, portfolioProfile }');
	});

	it('keeps stable identity and required structure in parity', () => {
		expect(profiles.en.profileId).toBe(profiles.es.profileId);
		expect(profiles.en.locale).toBe('en');
		expect(profiles.es.locale).toBe('es');
		expect(Object.keys(profiles.en).sort()).toEqual(Object.keys(profiles.es).sort());
		expect(Object.keys(profiles.en.seo).sort()).toEqual(Object.keys(profiles.es.seo).sort());
		expect(profiles.en.biography).toHaveLength(profiles.es.biography.length);
		expect(profiles.en.focusAreas).toHaveLength(profiles.es.focusAreas.length);
	});

	it('contains meaningful non-empty localized values', () => {
		for (const profile of Object.values(profiles)) {
			for (const field of scalarFields) {
				expect(profile[field].trim().length, field).toBeGreaterThan(0);
			}
			expect(profile.seo.title.trim().length).toBeGreaterThan(0);
			expect(profile.seo.description.trim().length).toBeGreaterThan(0);
			expect(profile.biography.every(value => value.trim().length > 0)).toBe(true);
			expect(profile.focusAreas.every(value => value.trim().length > 0)).toBe(true);
		}
	});

	it('loads structured content through the profile entity', () => {
		const query = readSource('src/entities/profile/model/queries.ts');
		expect(query).toContain("getEntry('portfolioProfile'");
		expect(query).toContain('PROFILE_ENTRY_ID');
		expect(query).toContain('profile.data.locale !== lang');
	});

	it('removes long profile records from UI and legacy dictionaries', () => {
		for (const locale of ['en', 'es']) {
			const catalog = readJson<Record<string, unknown>>(
				`src/shared/config/i18n/locales/${locale}/sections/about.json`
			);
			const legacy = readJson<Record<string, unknown>>(
				`src/shared/config/i18n/locales/${locale}.json`
			);
			expect(catalog).not.toHaveProperty('profileSummary');
			expect(catalog).not.toHaveProperty('currentSummary');
			expect(legacy).not.toHaveProperty('about-me');
		}
	});

	it('makes both About surfaces consume the authoritative profile source', () => {
		const preview = readSource('src/widgets/about-me/ui/AboutMe.astro');
		const detail = readSource('src/widgets/about-content/ui/AboutContent.astro');
		const englishPage = readSource('src/pages/about.astro');
		const spanishPage = readSource('src/pages/es/about.astro');

		expect(preview).toContain('getPortfolioProfile');
		expect(preview).toContain('profile.summary');
		expect(preview).toContain('profile.currentRoleSummary');
		expect(detail).toContain('profile.biography');
		expect(detail).toContain('profile.focusAreas');
		expect(detail).not.toContain('const copy =');
		expect(detail).not.toContain('isEnglish');
		expect(englishPage).toContain('profile.data.seo.title');
		expect(spanishPage).toContain('profile.data.seo.title');
	});
});
`
);

const homeMigrationTestPath = 'tests/unit/i18n-home-migration.spec.ts';
let homeMigrationTest = await readFile(resolve(root, homeMigrationTestPath), 'utf8');
homeMigrationTest = homeMigrationTest
	.replace("\t\t\texpect(legacy).not.toHaveProperty('about-me.profile');\n", '')
	.replace("\t\t\texpect(legacy).not.toHaveProperty('about-me.atena');\n", '')
	.replace("\t\t\texpect(legacy).not.toHaveProperty('about-me.read-more');\n", '')
	.replace(
		"\t\t\texpect(legacy).not.toHaveProperty('title');\n",
		"\t\t\texpect(legacy).not.toHaveProperty('title');\n\t\t\texpect(legacy).not.toHaveProperty('about-me');\n"
	);
await writeText(homeMigrationTestPath, homeMigrationTest);

await writeText(
	'tests/e2e/smoke.spec.ts',
	String.raw`
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';

const CRITICAL_ROUTES = ['/', '/es/', '/about', '/es/about', '/projects', '/es/projects'] as const;
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] as const;

async function prepareRouteForAxe(page: Page, route: string) {
	const response = await page.goto(route);
	expect(response?.ok()).toBe(true);
	await page.evaluate(() => {
		localStorage.setItem('theme', 'dark');
		document.documentElement.classList.add('dark');
	});
	await page.reload();
	await page.waitForLoadState('domcontentloaded');
	await page.waitForLoadState('networkidle');
	await page.addStyleTag({
		content: `
			*, *::before, *::after {
				animation-delay: -1ms !important;
				animation-duration: 0s !important;
				animation-iteration-count: 1 !important;
				transition-duration: 0s !important;
				transition-delay: 0s !important;
			}
		`,
	});
}

test.describe('Pull request smoke and accessibility gates', () => {
	for (const route of CRITICAL_ROUTES) {
		test(`${route} renders unique content without serious axe violations`, async ({ page }) => {
			await prepareRouteForAxe(page, route);
			await expect(page.locator('main').first()).toBeVisible();
			await expect(page.locator('h1')).toHaveCount(1);

			const results = await new AxeBuilder({ page }).withTags([...WCAG_TAGS]).analyze();
			const blockingViolations = results.violations.filter(
				violation => violation.impact === 'critical' || violation.impact === 'serious'
			);
			expect(blockingViolations).toEqual([]);
		});
	}

	test('localized About routes render their profile entry', async ({ page }) => {
		await page.goto('/about');
		await expect(page).toHaveTitle('About David Sandoval — Software Engineer');
		await expect(page.getByRole('heading', { level: 1, name: 'Full biography' })).toBeVisible();
		await expect(page.getByText('Angular and reactive frontend architecture')).toBeVisible();

		await page.goto('/es/about');
		await expect(page).toHaveTitle('Sobre David Sandoval — Ingeniero de Software');
		await expect(page.getByRole('heading', { level: 1, name: 'Biografía completa' })).toBeVisible();
		await expect(page.getByText('Angular y arquitectura frontend reactiva')).toBeVisible();
	});
});
`
);

const docsPath = 'docs/I18N-CATALOGS.md';
let docs = await readFile(resolve(root, docsPath), 'utf8');
const profileSection = String.raw`

## Structured profile content

Issue #135 moves long-form profile and biography records out of UI catalogs and legacy dictionaries. The authoritative localized entries are:

\`\`\`text
src/content/portfolio-profile/
├── en/profile.json
└── es/profile.json
\`\`\`

The \`portfolioProfile\` collection validates stable identity, locale, SEO metadata, summary, biography paragraphs, focus areas, availability, location, work mode, research positioning and the current-role summary. Language-neutral identity and contact values remain in \`siteConfig\`.

Consumers load the entry through the public \`@entities/profile\` API. UI catalogs retain only headings, labels, actions and accessibility text; they do not own long biography records.
`;
if (!docs.includes('## Structured profile content')) {
	docs += profileSection;
}
await writeText(docsPath, docs);

console.log('Issue #135 profile-content migration applied.');
