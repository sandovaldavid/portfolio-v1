# Guía de Migración: Widgets Layer

## 🧩 Widgets Layer - Secciones Completas

Widgets son **bloques UI grandes** que componen Features + Entities para crear secciones completas.

## 🎯 Widgets a Migrar (7)

| Componente Legacy | Nueva Ubicación FSD | Compone |
|------------------|---------------------|---------|
| `Hero.astro` | `src/widgets/hero/` | Avatar (shared), SocialPill (shared), i18n |
| `Header.astro` | `src/widgets/header/` | ThemeToggle (feature), LanguagePicker (feature) |
| `Footer.astro` | `src/widgets/footer/` | Avatar (shared), i18n |
| `AboutMe.astro` | `src/widgets/about-me/` | i18n, Image |
| `Experience.astro` + `ExperienceItem.astro` | `src/widgets/experience/` | Experience entity, i18n |
| `Projects.astro` | `src/widgets/projects/` | Project entity, Technology entity, LinkButton |
| `Badges.astro` | `src/widgets/badges/` | Badge entity, Badge (shared) |

## 📝 Patrón de Migración

### Estructura Estándar de Widget

```
src/widgets/{widget-name}/
├── ui/
│   ├── {WidgetName}.astro      # Componente principal
│   └── components/              # Componentes internos (opcional)
│       └── {SubComponent}.astro
├── model/
│   └── types.ts                 # Types si es necesario
└── index.ts                     # Public API
```

## 🚀 Ejemplos de Migración

### 1. Widget: Hero (Simple)

```bash
mkdir -p src/widgets/hero/ui
```

`src/widgets/hero/ui/Hero.astro`:
```astro
---
import { Avatar } from '@shared/ui';
import { SocialPill } from '@shared/ui';
import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';
import LinkedInIcon from '@assets/icons/LinkedIn.astro';
import MailIcon from '@assets/icons/Mail.astro';
import GitHubIcon from '@assets/icons/GitHub.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<div class="max-w-3xl">
	<div class="flex gap-4 mb-4 items-center">
		<Avatar size="medium" ringStyle="gradient" season="auto" animated={true} />
		<h1 class="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl dark:text-white">
			{t('hero.intro')}
		</h1>
	</div>
	<p
		class="mt-6 text-xl text-gray-800 dark:[&>strong]:text-yellow-200 [&>strong]:text-yellow-500 [&>strong]:font-semibold dark:text-gray-300"
		set:html={t('hero.description')}
	/>
	<nav class="flex flex-wrap gap-4 mt-8">
		<SocialPill href="mailto:hello@sandovaldavid.com">
			<MailIcon class="size-4" />
			Contáctame
		</SocialPill>
		<SocialPill href="https://www.linkedin.com/in/devsandoval/">
			<LinkedInIcon class="size-4" />
			LinkedIn
		</SocialPill>
		<SocialPill href="https://github.com/sandovaldavid">
			<GitHubIcon class="size-4" />
			GitHub
		</SocialPill>
	</nav>
</div>
```

`src/widgets/hero/index.ts`:
```typescript
export { default as Hero } from './ui/Hero.astro';
```

---

### 2. Widget: Header (Con Script)

```bash
mkdir -p src/widgets/header/ui
```

`src/widgets/header/ui/Header.astro`:
```astro
---
import { ThemeToggle } from '@features/theme-toggle';
import { LanguagePicker } from '@features/language-picker';
import MenuIcon from '@assets/icons/MenuIcon.astro';
import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';

const lang = getLangFromUrl(new URL(Astro.request.url));
const t = useTranslations(lang);

const navItems = [
	{
		title: t('nav.experience'),
		label: 'experiencia',
		url: `/${lang}/#experience`,
	},
	{
		title: t('nav.badges'),
		label: 'insignias',
		url: `/${lang}/#badges`,
	},
	{
		title: t('nav.projects'),
		label: 'proyectos',
		url: `/${lang}/#projects`,
	},
	{
		title: t('nav.about'),
		label: 'sobre-mi',
		url: `/${lang}/#about-me`,
	},
	{
		title: t('nav.contact'),
		label: 'contacto',
		url: 'mailto:hello@sandovaldavid.com',
	},
];
---

<header class="fixed top-0 z-10 flex items-center justify-center w-full mx-auto mt-2">
	<!-- Desktop/Tablet Nav -->
	<nav
		class="hidden sm:flex px-3 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200 justify-center items-center"
	>
		{navItems.map(link => (
			<a
				class="relative block px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500"
				aria-label={link.label}
				href={link.url}
			>
				{link.title}
			</a>
		))}
		<ThemeToggle />
		<LanguagePicker currentLang={lang} />
	</nav>

	<!-- Mobile Nav -->
	<nav class="flex w-11/12 items-center justify-between px-3 sm:hidden rounded-md">
		<ThemeToggle />
		<button
			id="mobile-menu-btn"
			class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<MenuIcon class="size-7" />
		</button>
	</nav>

	<!-- Mobile Menu Overlay -->
	<div
		id="mobile-menu"
		class="fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 z-10 flex-col items-center justify-center gap-6 text-lg font-medium text-gray-800 dark:text-gray-100 hidden transition-all"
	>
		{navItems.map(link => (
			<a
				class="block px-4 py-3 rounded hover:bg-blue-100 dark:hover:bg-gray-700 transition"
				aria-label={link.label}
				href={link.url}
				onclick="document.getElementById('mobile-menu').classList.add('hidden')"
			>
				{link.title}
			</a>
		))}
		<div class="flex justify-center items-center gap-4">
			<LanguagePicker currentLang={lang} class="ml-4" />
		</div>

		<button
			id="mobile-menu-close"
			class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="size-7"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	</div>
</header>

<script>
	// Navigation highlight con IntersectionObserver
	const sections = document.querySelectorAll('section');
	const navItems = document.querySelectorAll('header nav a');

	const callback = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				navItems.forEach(item => {
					if (item.getAttribute('aria-label') == entry.target.id) {
						item.classList.add('text-blue-500');
					} else {
						item.classList.remove('text-blue-500');
					}
				});
			}
		});
	};

	const observer = new IntersectionObserver(callback, {
		root: null,
		rootMargin: '0px',
		threshold: 0.3,
	});

	sections.forEach(section => observer.observe(section));

	// Mobile menu logic
	const mobileMenuBtn = document.getElementById('mobile-menu-btn');
	const mobileMenu = document.getElementById('mobile-menu');
	const mobileMenuClose = document.getElementById('mobile-menu-close');

	if (mobileMenuBtn && mobileMenu) {
		mobileMenuBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			mobileMenu.classList.remove('hidden');
			mobileMenu.classList.add('flex');
		});
	}

	if (mobileMenuClose && mobileMenu) {
		mobileMenuClose.addEventListener('click', (e) => {
			e.stopPropagation();
			mobileMenu.classList.add('hidden');
			mobileMenu.classList.remove('flex');
		});
	}

	// Cerrar menú al hacer click fuera
	document.addEventListener('click', (e) => {
		if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
			const target = e.target;
			if (
				target instanceof Node &&
				!mobileMenu.contains(target) &&
				target !== mobileMenuBtn
			) {
				mobileMenu.classList.add('hidden');
				mobileMenu.classList.remove('flex');
			}
		}
	});
</script>

<style>
	nav {
		animation: nav-shadown 1s linear both;
		animation-timeline: scroll();
		animation-range: 0 100px;
	}
</style>
```

`src/widgets/header/index.ts`:
```typescript
export { default as Header } from './ui/Header.astro';
```

---

### 3. Widget: Projects (Con Entities)

```bash
mkdir -p src/widgets/projects/ui
```

`src/widgets/projects/ui/Projects.astro`:
```astro
---
import { LinkButton } from '@shared/ui';
import { PROJECTS } from '@entities/project';
import { getLangFromUrl } from '@shared/lib/i18n';
import { Image } from 'astro:assets';
import GitHubIcon from '@assets/icons/GitHub.astro';
import LinkIcon from '@assets/icons/Link.astro';

const lang = getLangFromUrl(new URL(Astro.request.url));
const projects = PROJECTS[lang] || PROJECTS.es;
---

<div class="flex flex-col gap-y-16">
	{projects.map(({ image, title, description, tags, link, github }) => (
		<article class="flex flex-col space-x-0 space-y-8 group md:flex-row md:space-x-8 md:space-y-0">
			<div class="w-full md:w-1/2">
				<div class="relative flex flex-col items-center col-span-6 row-span-5 gap-8 transition duration-500 ease-in-out transform shadow-xl overflow-clip rounded-xl sm:rounded-xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl lg:border lg:border-gray-800 lg:hover:border-gray-700 lg:hover:bg-gray-800/50">
					<Image
						src={image}
						width="1600"
						height="900"
						decoding="async"
						loading="lazy"
						alt={`${title} project image`}
					/>
				</div>
			</div>

			<div class="w-full md:w-1/2 md:max-w-lg">
				<h3 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
				<div class="flex flex-wrap mt-2">
					<ul class="flex flex-row mb-2 gap-x-2 flex-wrap">
						{tags.map(tag => (
							<li class="mb-3">
								<span class={`flex gap-x-2 rounded-full text-xs ${tag.class} py-1 px-2`}>
									<tag.icon class="size-4" />
									{tag.name}
								</span>
							</li>
						))}
					</ul>

					<div class="mt-2 text-gray-700 dark:text-gray-400">{description}</div>
					<footer class="flex items-end justify-start mt-4 gap-x-4">
						{github && (
							<LinkButton href={github}>
								<GitHubIcon class="size-6" />
								{lang === 'es' ? 'Código' : 'Code'}
							</LinkButton>
						)}
						{link && (
							<LinkButton href={link}>
								<LinkIcon class="size-4" />
								{lang === 'es' ? 'Vista previa' : 'Preview'}
							</LinkButton>
						)}
					</footer>
				</div>
			</div>
		</article>
	))}
</div>
```

`src/widgets/projects/index.ts`:
```typescript
export { default as Projects } from './ui/Projects.astro';
```

---

### 4. Widget: Experience (Con Componente Interno)

```bash
mkdir -p src/widgets/experience/ui/components
```

`src/widgets/experience/ui/components/ExperienceItem.astro`:
```astro
---
import type { Experience } from '@entities/experience';

type Props = Experience;

const { date, title, description, company } = Astro.props;
---

<div
	class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
>
</div>
<time class="mb-1 text-sm font-normal leading-none text-gray-400/80 dark:text-gray-500">{date}</time>
<h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-2">
	{title}
	<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3"
		>{company}</span
	>
</h3>
<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
	{description}
</p>
```

`src/widgets/experience/ui/Experience.astro`:
```astro
---
import ExperienceItem from './components/ExperienceItem.astro';
import { getExperiences } from '@entities/experience';
import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';

const lang = getLangFromUrl(new URL(Astro.request.url));
const t = useTranslations(lang);

const experiences = getExperiences(t, lang);
---

<ol class="relative mt-16">
	{experiences.map(experience => (
		<li>
			<ExperienceItem {...experience} />
		</li>
	))}
</ol>
```

`src/widgets/experience/index.ts`:
```typescript
export { default as Experience } from './ui/Experience.astro';
```

---

## 🎨 Tips Astro para Widgets

### IntersectionObserver API
```javascript
// Observar elementos cuando entran en viewport
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			// Elemento visible
		}
	});
}, {
	threshold: 0.3,  // 30% visible
	rootMargin: '0px'
});

sections.forEach(section => observer.observe(section));
```

### Image Optimization
```astro
---
import { Image } from 'astro:assets';
---

<!-- Astro optimiza automáticamente -->
<Image
	src={image}
	width={1600}
	height={900}
	decoding="async"
	loading="lazy"
	alt="..."
/>
```

## ✅ Checklist Widgets

- [ ] Hero migrado
- [ ] Header migrado (con mobile menu)
- [ ] Footer migrado
- [ ] AboutMe migrado
- [ ] Experience migrado (con ExperienceItem interno)
- [ ] Projects migrado (usando entities)
- [ ] Badges migrado (usando entities)
- [ ] Todos con Public APIs
- [ ] Build exitoso

## 🚀 Siguiente Paso

**[05-pages-migration.md](./05-pages-migration.md)** - Actualizar Páginas

---

**Tiempo estimado:** 3-4 horas
