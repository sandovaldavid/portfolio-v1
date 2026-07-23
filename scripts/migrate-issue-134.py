from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write_text(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content.strip() + "\n", encoding="utf-8")


def read_json(path: str) -> dict:
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def write_json(path: str, value: dict) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(value, ensure_ascii=False, indent="\t") + "\n", encoding="utf-8")


section_catalogs = {
    "en": {
        "hero": {
            "banner": "[ AVAILABLE FOR SOFTWARE ENGINEERING OPPORTUNITIES ]",
            "title": "Software Engineer building reliable web products",
            "subtitle": ".NET · Angular · TypeScript",
            "credential": "Based in Lima (UTC-5) · Remote across Europe and Latin America · BiLSTM/OSS research",
            "profile": "Professional profile",
            "roleLabel": "Role",
            "role": "Software Engineer",
            "stackLabel": "Core stack",
            "stack": "Angular · .NET · TypeScript",
            "locationLabel": "Location",
            "location": "Lima, Peru · UTC-5",
            "workModeLabel": "Work mode",
            "workMode": "Remote · Europe and LATAM",
            "currentLabel": "Currently",
            "current": "Software Engineer @ Atena",
            "researchLabel": "Research",
            "research": "OSS abandonment prediction with BiLSTM",
        },
        "about": {
            "sectionTitle": "About me",
            "profileTitle": "Professional profile",
            "profileSummary": "Computer Engineer building web products with Angular, .NET and TypeScript. My work includes frontend modernization, REST APIs and performance improvements. I also research OSS abandonment prediction using BiLSTM models.",
            "readMore": "Read full biography",
            "currentTitle": "Current role @ Atena",
            "currentSummary": "I currently work at Atena as a Software Engineer contributing to Angular frontends and .NET APIs. My focus is maintainable delivery, measurable performance improvements and clear technical documentation.",
            "imageAlt": "Juan David Sandoval, Software Engineer",
        },
        "research": {
            "sectionTitle": "Research",
            "institution": "National University of Piura",
            "label": "Bachelor thesis",
            "title": "Predicting the Abandonment State of OSS Repositories using BiLSTM Neural Networks",
            "summary": "Applying Bidirectional LSTM neural networks to detect OSS repository abandonment risk from GitHub activity time series and benchmarking the results against traditional machine-learning baselines.",
            "techStackLabel": "Technology stack",
            "methodologyHint": "Full methodology, architecture and pipeline are available on the research page.",
            "viewFull": "View full research",
        },
        "vision": {
            "sectionTitle": "Vision & impact",
            "subtitle": "Verifiable evidence",
            "leetcodeTitle": "LeetCode solutions",
            "leetcodeDescription": "Repository with documented solutions for common Blind 75 patterns.",
            "writingTitle": "Technical writing",
            "writingDescription": "Engineering notes about Angular, .NET, architecture and delivery decisions.",
            "labTitle": "DevSolution Lab",
            "labDescription": "Proofs of concept for applied machine learning and software engineering.",
            "viewProject": "View project",
            "comingSoon": "Coming soon",
        },
        "tech-stack": {
            "sectionTitle": "Technologies",
            "frontendTitle": "Core frontend stack",
            "backendTitle": "Core backend stack",
            "viewAll": "View all skills and tools",
        },
        "experience": {"sectionTitle": "Experience"},
        "projects": {"sectionTitle": "Projects"},
        "badges": {
            "githubFoundations": "GitHub Foundations",
            "dataModeling": "Data Modeling with Python | ONE - G8",
            "etl": "ETL | ONE - G8",
            "statisticsMl": "Statistics and Machine Learning | ONE - G8",
        },
    },
    "es": {
        "hero": {
            "banner": "[ DISPONIBLE PARA OPORTUNIDADES EN INGENIERÍA DE SOFTWARE ]",
            "title": "Ingeniero de software que construye productos web confiables",
            "subtitle": ".NET · Angular · TypeScript",
            "credential": "En Lima (UTC-5) · Remoto para Europa y Latinoamérica · Investigación BiLSTM/OSS",
            "profile": "Perfil profesional",
            "roleLabel": "Rol",
            "role": "Ingeniero de software",
            "stackLabel": "Stack principal",
            "stack": "Angular · .NET · TypeScript",
            "locationLabel": "Ubicación",
            "location": "Lima, Perú · UTC-5",
            "workModeLabel": "Modalidad",
            "workMode": "Remoto · Europa y LATAM",
            "currentLabel": "Actualmente",
            "current": "Software Engineer @ Atena",
            "researchLabel": "Investigación",
            "research": "Predicción de abandono OSS con BiLSTM",
        },
        "about": {
            "sectionTitle": "Sobre mí",
            "profileTitle": "Perfil profesional",
            "profileSummary": "Ingeniero Informático que construye productos web con Angular, .NET y TypeScript. Mi trabajo incluye modernización frontend, APIs REST y mejoras de rendimiento. También investigo la predicción de abandono de proyectos OSS mediante modelos BiLSTM.",
            "readMore": "Leer biografía completa",
            "currentTitle": "Rol actual @ Atena",
            "currentSummary": "Actualmente trabajo en Atena como Software Engineer, contribuyendo en frontends Angular y APIs .NET. Mi enfoque es entregar software mantenible, aplicar mejoras de rendimiento medibles y documentar las decisiones técnicas.",
            "imageAlt": "Juan David Sandoval, ingeniero de software",
        },
        "research": {
            "sectionTitle": "Investigación",
            "institution": "Universidad Nacional de Piura",
            "label": "Tesis de grado",
            "title": "Predicción del estado de abandono de repositorios OSS mediante redes neuronales BiLSTM",
            "summary": "Aplico redes neuronales LSTM bidireccionales para detectar el riesgo de abandono de repositorios OSS mediante series temporales de actividad de GitHub y comparar los resultados con modelos tradicionales de machine learning.",
            "techStackLabel": "Stack tecnológico",
            "methodologyHint": "La metodología, arquitectura y pipeline completos están disponibles en la página de investigación.",
            "viewFull": "Ver investigación completa",
        },
        "vision": {
            "sectionTitle": "Visión e impacto",
            "subtitle": "Evidencia verificable",
            "leetcodeTitle": "Soluciones de LeetCode",
            "leetcodeDescription": "Repositorio con soluciones documentadas para patrones comunes de Blind 75.",
            "writingTitle": "Escritura técnica",
            "writingDescription": "Notas de ingeniería sobre Angular, .NET, arquitectura y decisiones de entrega.",
            "labTitle": "DevSolution Lab",
            "labDescription": "Pruebas de concepto de machine learning aplicado e ingeniería de software.",
            "viewProject": "Ver proyecto",
            "comingSoon": "Próximamente",
        },
        "tech-stack": {
            "sectionTitle": "Tecnologías",
            "frontendTitle": "Stack frontend principal",
            "backendTitle": "Stack backend principal",
            "viewAll": "Ver todas las habilidades y herramientas",
        },
        "experience": {"sectionTitle": "Experiencia"},
        "projects": {"sectionTitle": "Proyectos"},
        "badges": {
            "githubFoundations": "GitHub Foundations",
            "dataModeling": "Modelado de datos con Python | ONE - G8",
            "etl": "ETL | ONE - G8",
            "statisticsMl": "Estadística y Machine Learning | ONE - G8",
        },
    },
}

for locale, modules in section_catalogs.items():
    for module, values in modules.items():
        write_json(f"src/shared/config/i18n/locales/{locale}/sections/{module}.json", values)

for locale in ("en", "es"):
    legacy_path = f"src/shared/config/i18n/locales/{locale}.json"
    legacy = read_json(legacy_path)
    for key in ("hero", "badges", "vision", "title"):
        legacy.pop(key, None)

    about = legacy.get("about-me", {})
    for key in ("profile", "atena", "read-more"):
        about.pop(key, None)

    research = legacy.get("research", {})
    for key in ("title", "summary", "tech-stack-label", "full-methodology", "view-full-button"):
        research.pop(key, None)

    write_json(legacy_path, legacy)

write_text(
    "src/widgets/hero/ui/Hero.astro",
    r'''
---
import { createScopedUiTranslator, Language } from '@shared/config/i18n';
import { getLangFromUrl } from '@shared/lib/i18n';

const langCode = getLangFromUrl(new URL(Astro.request.url));
const lang = langCode === 'en' ? Language.ENGLISH : Language.SPANISH;
const tHero = createScopedUiTranslator(lang, 'sections.hero');
const tCommon = createScopedUiTranslator(lang, 'common');
const tAccessibility = createScopedUiTranslator(lang, 'accessibility');
---

<section
	class="w-full min-h-[calc(100dvh-4.5rem)] hero-gradient flex flex-col items-center justify-start md:justify-center py-8 md:py-12 px-4"
	aria-labelledby="hero-title"
>
	<div class="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-10">
		<div
			class="w-full text-center border-2 border-dashed border-banner-border p-3 font-retro-tag text-xs sm:text-sm text-banner-text tracking-widest uppercase"
		>
			{tHero('banner')}
		</div>

		<div class="text-center space-y-3">
			<span
				class="font-retro-tag text-xs uppercase tracking-widest text-primary-500 font-bold block"
			>
				{tHero('title')}
			</span>
			<h1
				id="hero-title"
				class="text-4xl sm:text-6xl lg:text-7xl text-center text-content-strong font-pixel tracking-wider leading-none uppercase"
				style="text-shadow: 5px 5px 0px var(--color-primary-500);"
			>
				David Sandoval
			</h1>
			<p class="text-lg text-content-strong font-gaming-mono tracking-wide max-w-2xl mx-auto">
				{tHero('subtitle')}
			</p>
			<p
				class="text-base text-content-muted font-gaming-mono tracking-wide max-w-3xl mx-auto"
			>
				{tHero('credential')}
			</p>
		</div>

		<div
			class="w-full grid grid-cols-1 md:grid-cols-[16rem_1fr] border-2 border-black dark:border-white bg-surface shadow-retro-3xl rounded-none overflow-hidden font-mono"
		>
			<div
				class="flex flex-col items-center justify-center p-6 md:p-8 border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-white bg-neutral-100/50 dark:bg-black/20"
			>
				<div
					class="relative w-44 h-44 md:w-52 md:h-52 border-2 border-black dark:border-white shadow-retro-lg overflow-hidden bg-black"
				>
					<img
						src="/profile/perfil.webp"
						alt={tAccessibility('profileImageAlt')}
						width="208"
						height="208"
						decoding="async"
						fetchpriority="high"
						class="w-full h-full object-cover aspect-square"
					/>
					<div
						class="absolute bottom-0 inset-x-0 bg-primary-500 text-white dark:text-black text-xs font-pixel text-center py-1.5 uppercase tracking-widest"
					>
						DAVID_S
					</div>
				</div>
				<span
					class="font-retro-tag text-xs text-content-muted mt-4 uppercase tracking-wider"
				>
					{tHero('role')}
				</span>
			</div>

			<div class="p-6 md:p-9 flex flex-col justify-between gap-6 bg-surface">
				<div
					class="w-full border-b-2 border-dashed border-edge-subtle pb-3 flex flex-wrap gap-3 justify-between items-center"
				>
					<span
						class="font-pixel-clean text-2xl md:text-3xl font-bold uppercase tracking-wider text-content-strong"
					>
						{tHero('profile')}
					</span>
					<span
						class="font-retro-tag text-xs bg-success-500 text-black px-2.5 py-1 font-bold uppercase"
					>
						{tCommon('status.available')}
					</span>
				</div>

				<dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm sm:text-base">
					<div class="border-b border-edge-subtle pb-2">
						<dt class="text-content-muted font-bold uppercase tracking-wide">{tHero('roleLabel')}</dt>
						<dd class="text-content-strong font-semibold mt-1">{tHero('role')}</dd>
					</div>
					<div class="border-b border-edge-subtle pb-2">
						<dt class="text-content-muted font-bold uppercase tracking-wide">{tHero('stackLabel')}</dt>
						<dd class="text-content-strong font-semibold mt-1">{tHero('stack')}</dd>
					</div>
					<div class="border-b border-edge-subtle pb-2">
						<dt class="text-content-muted font-bold uppercase tracking-wide">{tHero('locationLabel')}</dt>
						<dd class="text-content-strong font-semibold mt-1">{tHero('location')}</dd>
					</div>
					<div class="border-b border-edge-subtle pb-2">
						<dt class="text-content-muted font-bold uppercase tracking-wide">{tHero('workModeLabel')}</dt>
						<dd class="text-content-strong font-semibold mt-1">{tHero('workMode')}</dd>
					</div>
					<div class="border-b border-edge-subtle pb-2">
						<dt class="text-content-muted font-bold uppercase tracking-wide">{tHero('currentLabel')}</dt>
						<dd class="text-content-strong font-semibold mt-1">{tHero('current')}</dd>
					</div>
					<div class="border-b border-edge-subtle pb-2">
						<dt class="text-content-muted font-bold uppercase tracking-wide">{tHero('researchLabel')}</dt>
						<dd class="text-content-strong font-semibold mt-1">{tHero('research')}</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>
</section>
''',
)

write_text(
    "src/widgets/about-me/ui/AboutMe.astro",
    r'''
---
import { createScopedUiTranslator, Language } from '@shared/config/i18n';
import { getLangFromUrl, getLocalizedPath } from '@shared/lib/i18n';

const langCode = getLangFromUrl(new URL(Astro.request.url));
const lang = langCode === 'en' ? Language.ENGLISH : Language.SPANISH;
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
					{tAbout('profileSummary')}
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
				{tAbout('currentSummary')}
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
''',
)

write_text(
    "src/widgets/research/ui/Research.astro",
    r'''
---
import ArrowRightIcon from '@assets/icons/ArrowRight.astro';
import BrainIcon from '@assets/icons/Brain.astro';
import { createScopedUiTranslator, Language } from '@shared/config/i18n';
import { getLangFromUrl, getLocalizedPath } from '@shared/lib/i18n';

const langCode = getLangFromUrl(new URL(Astro.request.url));
const lang = langCode === 'en' ? Language.ENGLISH : Language.SPANISH;
const tResearch = createScopedUiTranslator(lang, 'sections.research');
const tCommon = createScopedUiTranslator(lang, 'common');
const techStack = ['BiLSTM', 'Deep Learning', 'MSR', 'Python', 'TensorFlow', 'GitHub API'];
---

<section class="w-full h-full flex items-center justify-center px-4 py-6">
	<article
		class="w-full max-w-3xl border-2 border-black dark:border-white bg-surface shadow-retro-2xl font-mono overflow-hidden"
	>
		<div
			class="border-b-2 border-black dark:border-white bg-primary-500 px-5 py-3.5 flex items-start justify-between gap-4"
		>
			<div class="flex items-start gap-3">
				<BrainIcon class="w-5 h-5 text-white dark:text-black shrink-0 mt-0.5" />
				<div>
					<p
						class="font-retro-tag text-sm uppercase tracking-widest text-white/90 dark:text-black/90 leading-none"
					>
						{tResearch('institution')} · {tResearch('label')}
					</p>
					<h3
						class="font-pixel-clean text-lg sm:text-xl font-bold text-white dark:text-black uppercase leading-tight mt-1"
					>
						{tResearch('title')}
					</h3>
				</div>
			</div>
			<span
				class="shrink-0 font-retro-tag text-xs bg-white dark:bg-black text-primary-600 dark:text-primary-400 px-2.5 py-1 font-bold uppercase tracking-widest animate-pulse whitespace-nowrap"
			>
				{tCommon('status.inProgress')}
			</span>
		</div>

		<div class="px-5 py-5 space-y-5">
			<p class="text-base leading-relaxed text-content-strong">
				{tResearch('summary')}
			</p>

			<div>
				<h4
					class="inline-flex items-center gap-1.5 font-retro-tag text-xs font-bold text-primary-500 uppercase tracking-widest mb-2.5"
				>
					<ArrowRightIcon class="size-3.5" aria-hidden="true" focusable="false" />
					{tResearch('techStackLabel')}
				</h4>
				<div class="flex flex-wrap gap-2">
					{
						techStack.map(tag => (
							<span class="font-retro-tag text-xs uppercase tracking-wider border-2 border-primary-500 text-primary-500 dark:text-primary-400 px-3 py-1 font-bold bg-primary-500/5">
								{tag}
							</span>
						))
					}
				</div>
			</div>

			<div
				class="border-t-2 border-dashed border-edge-subtle pt-4 flex items-center justify-between gap-4"
			>
				<p class="text-sm text-content-muted leading-snug">
					{tResearch('methodologyHint')}
				</p>
				<a
					href={getLocalizedPath(lang, '/research')}
					class="shrink-0 inline-flex items-center gap-2 font-retro-tag text-xs font-bold uppercase tracking-widest px-4 py-2 bg-primary-500 text-white dark:text-black border-2 border-black dark:border-white shadow-retro-sm hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-retro-md active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all whitespace-nowrap"
				>
					{tResearch('viewFull')}
					<ArrowRightIcon class="size-4" aria-hidden="true" focusable="false" />
				</a>
			</div>
		</div>
	</article>
</section>
''',
)

write_text(
    "src/widgets/vision/ui/Vision.astro",
    r'''
---
import ArrowRightIcon from '@assets/icons/ArrowRight.astro';
import BrainIcon from '@assets/icons/Brain.astro';
import CodeIcon from '@assets/icons/Code.astro';
import LinkIcon from '@assets/icons/Link.astro';
import { createScopedUiTranslator, Language } from '@shared/config/i18n';
import { getLangFromUrl } from '@shared/lib/i18n';

const langCode = getLangFromUrl(new URL(Astro.request.url));
const lang = langCode === 'en' ? Language.ENGLISH : Language.SPANISH;
const tVision = createScopedUiTranslator(lang, 'sections.vision');

const visionItems = [
	{
		icon: CodeIcon,
		title: tVision('leetcodeTitle'),
		description: tVision('leetcodeDescription'),
		link: '#',
	},
	{
		icon: LinkIcon,
		title: tVision('writingTitle'),
		description: tVision('writingDescription'),
		link: '#',
	},
	{
		icon: BrainIcon,
		title: tVision('labTitle'),
		description: tVision('labDescription'),
		link: '#',
	},
];
---

<section class="space-y-6">
	<p class="text-sm font-medium text-content-muted mb-2">
		{tVision('subtitle')}
	</p>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{
			visionItems.map((item, idx) => (
				<article
					class="group rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-300/80 dark:border-neutral-700/80 backdrop-blur-sm p-6 shadow-lg shadow-neutral-200/50 dark:shadow-neutral-950/50 hover:border-badge-brand-outline-border transition-all duration-300"
					style={`animation: var(--animate-slide-up); animation-delay: ${idx * 100}ms;`}
				>
					<div class="flex items-start gap-4 mb-4">
						<div class="shrink-0 w-10 h-10 rounded-lg bg-badge-brand-bg flex items-center justify-center group-hover:bg-badge-brand-bg-hover transition-colors">
							<item.icon class="w-5 h-5 text-primary-500 dark:text-primary-400" />
						</div>
						<h3 class="flex-1 text-lg font-bold text-content-strong mb-2">{item.title}</h3>
					</div>

					<p class="text-sm text-content leading-relaxed mb-4">{item.description}</p>

					{item.link === '#' ? (
						<span class="inline-flex items-center gap-2 text-sm font-medium text-content-muted italic">
							<span class="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
							{tVision('comingSoon')}
						</span>
					) : (
						<a
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
						>
							{tVision('viewProject')}
							<ArrowRightIcon class="size-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" focusable="false" />
						</a>
					)}
				</article>
			))
		}
	</div>
</section>
''',
)

write_text(
    "src/widgets/tech-stack/ui/TechStack.astro",
    r'''
---
import { createScopedUiTranslator, Language } from '@shared/config/i18n';
import { TAGS } from '@shared/config/technology';
import { getLangFromUrl, getLocalizedPath } from '@shared/lib/i18n';
import { TechPill } from '@shared/ui';

const langCode = getLangFromUrl(new URL(Astro.request.url));
const lang = langCode === 'en' ? Language.ENGLISH : Language.SPANISH;
const tTechStack = createScopedUiTranslator(lang, 'sections.techStack');

const coreFrontend = [
	TAGS.TYPESCRIPT,
	TAGS.ANGULAR,
	TAGS.RXJS,
	TAGS.NEXTJS,
	TAGS.REACT,
	TAGS.ASTRO,
].filter(Boolean);

const coreBackend = [TAGS.JAVA, TAGS.PYTHON, TAGS.DJANGO, TAGS.POSTGRESQL, TAGS.MYSQL].filter(
	Boolean
);
---

<div class="font-sans w-full flex flex-col items-center gap-8 mt-2">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
		<article
			class="rounded-none bg-surface border-2 border-black dark:border-white p-6 shadow-retro-md hover:-translate-y-1 hover:shadow-retro-xl transition-all duration-100 flex flex-col gap-4"
		>
			<h3
				class="font-pixel-clean text-2xl font-bold uppercase tracking-wider text-primary-500 dark:text-primary-400 border-b-2 border-dashed border-edge-subtle pb-2"
			>
				[ {tTechStack('frontendTitle')} ]
			</h3>
			<div class="flex flex-wrap gap-2.5">
				{
					coreFrontend.map(tech => (
						<TechPill label={tech.name} icon={tech.icon} variant="stack" size="sm" />
					))
				}
			</div>
		</article>

		<article
			class="rounded-none bg-surface border-2 border-black dark:border-white p-6 shadow-retro-md hover:-translate-y-1 hover:shadow-retro-xl transition-all duration-100 flex flex-col gap-4"
		>
			<h3
				class="font-pixel-clean text-2xl font-bold uppercase tracking-wider text-primary-500 dark:text-primary-400 border-b-2 border-dashed border-edge-subtle pb-2"
			>
				[ {tTechStack('backendTitle')} ]
			</h3>
			<div class="flex flex-wrap gap-2.5">
				{
					coreBackend.map(tech => (
						<TechPill label={tech.name} icon={tech.icon} variant="stack" size="sm" />
					))
				}
			</div>
		</article>
	</div>

	<div class="w-full flex justify-center">
		<a
			href={getLocalizedPath(lang, '/skills')}
			class="inline-flex items-center justify-center rounded-none bg-surface text-content-strong border-2 border-black dark:border-white text-base px-6 py-3.5 font-bold uppercase tracking-wider transition-all duration-100 shadow-retro-md hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-retro-xl active:translate-x-[1px] active:translate-y-[1px] active:shadow-retro-xs"
		>
			{tTechStack('viewAll')}
		</a>
	</div>
</div>
''',
)

write_text(
    "src/widgets/badges/ui/Badges.astro",
    r'''
---
import { CertificationBadge, getBadgesData } from '@entities/badge';
import { createScopedUiTranslator, Language } from '@shared/config/i18n';
import { getLangFromUrl } from '@shared/lib/i18n';

const langCode = getLangFromUrl(new URL(Astro.request.url));
const lang = langCode === 'en' ? Language.ENGLISH : Language.SPANISH;
const tBadges = createScopedUiTranslator(lang, 'sections.badges');
const badges = getBadgesData(key => tBadges(key as Parameters<typeof tBadges>[0]));
---

<ul class="flex flex-wrap items-center justify-center gap-4">
	{
		badges.map(badge => (
			<li>
				<CertificationBadge src={badge.image} alt={badge.label} href={badge.link} />
			</li>
		))
	}
</ul>
''',
)

badge_data_path = ROOT / "src/entities/badge/model/data.ts"
badge_data = badge_data_path.read_text(encoding="utf-8")
badge_data = badge_data.replace("badges.github-foundations.label", "githubFoundations")
badge_data = badge_data.replace("badges.data-modeling.label", "dataModeling")
badge_data = badge_data.replace("badges.etl.label", "etl")
badge_data = badge_data.replace("badges.statistics-ml.label", "statisticsMl")
badge_data_path.write_text(badge_data, encoding="utf-8")

catalog_path = ROOT / "src/shared/config/i18n/catalog.ts"
catalog = catalog_path.read_text(encoding="utf-8")
catalog = catalog.replace(
    "import aboutEn from './locales/en/sections/about.json';\n",
    "import aboutEn from './locales/en/sections/about.json';\n"
    "import badgesEn from './locales/en/sections/badges.json';\n"
    "import experienceEn from './locales/en/sections/experience.json';\n",
)
catalog = catalog.replace(
    "import heroEn from './locales/en/sections/hero.json';\n",
    "import heroEn from './locales/en/sections/hero.json';\n"
    "import projectsEn from './locales/en/sections/projects.json';\n",
)
catalog = catalog.replace(
    "import aboutEs from './locales/es/sections/about.json';\n",
    "import aboutEs from './locales/es/sections/about.json';\n"
    "import badgesEs from './locales/es/sections/badges.json';\n"
    "import experienceEs from './locales/es/sections/experience.json';\n",
)
catalog = catalog.replace(
    "import heroEs from './locales/es/sections/hero.json';\n",
    "import heroEs from './locales/es/sections/hero.json';\n"
    "import projectsEs from './locales/es/sections/projects.json';\n",
)
catalog = catalog.replace(
    "\t\thero: heroEn,\n\t\tabout: aboutEn,\n\t\tresearch: researchEn,\n",
    "\t\thero: heroEn,\n\t\tabout: aboutEn,\n\t\tbadges: badgesEn,\n"
    "\t\texperience: experienceEn,\n\t\tprojects: projectsEn,\n\t\tresearch: researchEn,\n",
)
catalog = catalog.replace(
    "\t\thero: heroEs,\n\t\tabout: aboutEs,\n\t\tresearch: researchEs,\n",
    "\t\thero: heroEs,\n\t\tabout: aboutEs,\n\t\tbadges: badgesEs,\n"
    "\t\texperience: experienceEs,\n\t\tprojects: projectsEs,\n\t\tresearch: researchEs,\n",
)
catalog = catalog.replace(
    "\t'sections.about',\n\t'sections.research',\n",
    "\t'sections.about',\n\t'sections.badges',\n\t'sections.experience',\n"
    "\t'sections.projects',\n\t'sections.research',\n",
)
catalog_path.write_text(catalog, encoding="utf-8")

layout_path = ROOT / "src/app/layouts/Layout.astro"
layout = layout_path.read_text(encoding="utf-8")
layout = layout.replace(
    "import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';",
    "import { getLangFromUrl } from '@shared/lib/i18n';",
)
layout = layout.replace("const t = useTranslations(lang);\n", "")
layout = layout.replace(
    "const tBreadcrumbs = createScopedUiTranslator(lang, 'breadcrumbs');\n",
    "const tBreadcrumbs = createScopedUiTranslator(lang, 'breadcrumbs');\n"
    "const tExperience = createScopedUiTranslator(lang, 'sections.experience');\n"
    "const tResearchSection = createScopedUiTranslator(lang, 'sections.research');\n"
    "const tProjects = createScopedUiTranslator(lang, 'sections.projects');\n"
    "const tAbout = createScopedUiTranslator(lang, 'sections.about');\n"
    "const tTechStack = createScopedUiTranslator(lang, 'sections.techStack');\n",
)
layout = layout.replace("{t('title.experience')}", "{tExperience('sectionTitle')}")
layout = layout.replace("{t('title.research')}", "{tResearchSection('sectionTitle')}")
layout = layout.replace("{t('title.projects')}", "{tProjects('sectionTitle')}")
layout = layout.replace("{t('title.about-me')}", "{tAbout('sectionTitle')}")
layout = layout.replace("{t('title.technologies')}", "{tTechStack('sectionTitle')}")
layout_path.write_text(layout, encoding="utf-8")

docs_path = ROOT / "docs/I18N-CATALOGS.md"
docs = docs_path.read_text(encoding="utf-8")
docs = docs.replace(
    "│   ├── theme.json\n│   └── sections/\n",
    "│   ├── theme.json\n│   └── sections/\n",
)
docs = docs.replace(
    "    ├── hero.json\n    ├── about.json\n    ├── research.json\n    ├── vision.json\n    └── tech-stack.json",
    "    ├── hero.json\n    ├── about.json\n    ├── badges.json\n"
    "    ├── experience.json\n    ├── projects.json\n    ├── research.json\n"
    "    ├── vision.json\n    └── tech-stack.json",
)
docs = docs.replace(
    "- CLI terminal, shortcuts and secret-mode messages.\n",
    "- CLI terminal, shortcuts and secret-mode messages;\n"
    "- home hero, About, Research, Vision, Tech Stack, badges and section headings.\n",
)
docs_path.write_text(docs, encoding="utf-8")

write_text(
    "tests/unit/i18n-home-migration.spec.ts",
    r'''
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const readSource = (path: string): string => readFileSync(path, 'utf8');
const readJson = (path: string): Record<string, unknown> => JSON.parse(readSource(path));

describe('home section localization migration', () => {
	it('uses focused granular catalogs in home widgets', () => {
		const migratedFiles = [
			'src/widgets/hero/ui/Hero.astro',
			'src/widgets/about-me/ui/AboutMe.astro',
			'src/widgets/research/ui/Research.astro',
			'src/widgets/vision/ui/Vision.astro',
			'src/widgets/tech-stack/ui/TechStack.astro',
			'src/widgets/badges/ui/Badges.astro',
		];

		for (const file of migratedFiles) {
			const source = readSource(file);
			expect(source, file).toContain('createScopedUiTranslator');
			expect(source, file).not.toContain('const copy =');
			expect(source, file).not.toContain('useTranslations(');
		}
	});

	it('registers mirrored focused section modules', () => {
		for (const locale of ['en', 'es']) {
			for (const module of [
				'hero',
				'about',
				'badges',
				'experience',
				'projects',
				'research',
				'vision',
				'tech-stack',
			]) {
				expect(existsSync(`src/shared/config/i18n/locales/${locale}/sections/${module}.json`)).toBe(
					true
				);
			}
		}

		const catalog = readSource('src/shared/config/i18n/catalog.ts');
		expect(catalog).toContain("'sections.badges'");
		expect(catalog).toContain("'sections.experience'");
		expect(catalog).toContain("'sections.projects'");
	});

	it('removes obsolete home copy from legacy dictionaries', () => {
		for (const locale of ['en', 'es']) {
			const legacy = readJson(`src/shared/config/i18n/locales/${locale}.json`);
			expect(legacy).not.toHaveProperty('hero');
			expect(legacy).not.toHaveProperty('badges');
			expect(legacy).not.toHaveProperty('vision');
			expect(legacy).not.toHaveProperty('title');
			expect(legacy).not.toHaveProperty('about-me.profile');
			expect(legacy).not.toHaveProperty('about-me.atena');
			expect(legacy).not.toHaveProperty('about-me.read-more');
			expect(legacy).not.toHaveProperty('research.summary');
			expect(legacy).not.toHaveProperty('research.tech-stack-label');
			expect(legacy).not.toHaveProperty('research.full-methodology');
			expect(legacy).not.toHaveProperty('research.view-full-button');
		}
	});

	it('keeps technical navigation identities separate from localized labels', () => {
		const layout = readSource('src/app/layouts/Layout.astro');
		expect(layout).toContain("tExperience('sectionTitle')");
		expect(layout).toContain("tResearchSection('sectionTitle')");
		expect(layout).toContain("tProjects('sectionTitle')");
		expect(layout).toContain("tAbout('sectionTitle')");
		expect(layout).toContain("tTechStack('sectionTitle')");
		expect(layout).not.toContain("t('title.");
	});
});
''',
)

write_text(
    "tests/e2e/i18n-home.spec.ts",
    r'''
import { test, expect } from './fixtures';

test.describe('Localized home sections', () => {
	test('renders complete English home copy', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByText('[ AVAILABLE FOR SOFTWARE ENGINEERING OPPORTUNITIES ]')).toBeVisible();
		await expect(page.getByText('Professional profile').first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Research' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Technologies' })).toBeVisible();
		await expect(page.getByText('[ Core frontend stack ]')).toBeVisible();
		await expect(page.getByRole('link', { name: 'View full research' })).toBeVisible();
	});

	test('renders complete Spanish home copy without English section labels', async ({ page }) => {
		await page.goto('/es/');

		await expect(
			page.getByText('[ DISPONIBLE PARA OPORTUNIDADES EN INGENIERÍA DE SOFTWARE ]')
		).toBeVisible();
		await expect(page.getByText('Perfil profesional').first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Experiencia' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Investigación' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Proyectos' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Sobre mí' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Tecnologías' })).toBeVisible();
		await expect(page.getByText('[ Stack frontend principal ]')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Ver investigación completa' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Experience' })).toHaveCount(0);
	});
});
''',
)
