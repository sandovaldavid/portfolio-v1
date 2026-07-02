# Guía de Migración: Pages Layer

> 📜 **Documento histórico** — Guía de la migración a FSD (octubre 2025). La migración está **completa**: 16 widgets, 4 features, 5 entities. Este documento se conserva como referencia del proceso y no refleja el estado actual del proyecto.

## 📄 Pages - Actualización de Imports

Las páginas en Astro son archivos en `src/pages/` que se convierten automáticamente en rutas. Solo necesitamos actualizar los imports para usar las nuevas Public APIs de FSD.

## 🎯 Páginas a Actualizar

```
src/pages/
├── index.astro        # Redirect page (no cambios necesarios)
├── es/index.astro     # Página principal español
├── en/index.astro     # Página principal inglés
└── components.astro   # Design system page
```

## 📝 Migración de Imports

### 1. Página: es/index.astro

**Imports actuales (legacy):**
```astro
---
import Layout from '@app/layouts/Layout.astro';
import Badge from '@/components/Badge.astro';
import SectionContainer from '@/components/SectionContainer.astro';
import SocialPill from '@/components/SocialPill.astro';
import TitleSection from '@/components/TitleSection.astro';
import Hero from '@/components/Hero.astro';
import AboutMe from '@/components/AboutMe.astro';
import Badges from '@/components/Badges.astro';
import Experience from '@/components/Experience.astro';
import Projects from '@/components/Projects.astro';
import Footer from '@/components/Footer.astro';
import Header from '@/components/Header.astro';
---
```

**Nuevos imports (FSD):**
```astro
---
// App layer (sin cambios)
import Layout from '@app/layouts/Layout.astro';

// Widgets layer (secciones completas)
import { Hero } from '@widgets/hero';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { AboutMe } from '@widgets/about-me';
import { Experience } from '@widgets/experience';
import { Projects } from '@widgets/projects';
import { Badges } from '@widgets/badges';

// Shared layer (componentes básicos)
import { SectionContainer, TitleSection } from '@shared/ui';

// i18n utilities
import { useTranslations } from '@shared/lib/i18n';

const t = useTranslations('es');
---
```

**Template (sin cambios):**
```astro
<Layout
	title="David Sandoval - Full Stack Developer"
	description="Portfolio de David Sandoval"
>
	<div class="pt-32 pb-16 max-w-[1120px] mx-auto px-4">
		<SectionContainer class="py-16 pb-32">
			<Hero />
		</SectionContainer>

		<SectionContainer id="experience">
			<TitleSection>
				<svg>...</svg>
				{t('sections.experience')}
			</TitleSection>
			<Experience />
		</SectionContainer>

		<SectionContainer id="projects">
			<TitleSection>
				<svg>...</svg>
				{t('sections.projects')}
			</TitleSection>
			<Projects />
		</SectionContainer>

		<SectionContainer id="badges">
			<TitleSection>
				<svg>...</svg>
				{t('sections.badges')}
			</TitleSection>
			<Badges />
		</SectionContainer>

		<SectionContainer id="about-me">
			<TitleSection>
				<svg>...</svg>
				{t('sections.about')}
			</TitleSection>
			<AboutMe />
		</SectionContainer>
	</div>
	<Footer />
</Layout>
```

---

### 2. Página: en/index.astro

**Mismo patrón que es/index.astro:**
```astro
---
import Layout from '@app/layouts/Layout.astro';
import { Hero, Header, Footer, AboutMe, Experience, Projects, Badges } from '@widgets';
import { SectionContainer, TitleSection } from '@shared/ui';
import { useTranslations } from '@shared/lib/i18n';

const t = useTranslations('en');
---

<!-- Template igual, solo cambia el idioma -->
```

**Tip:** Puedes crear un barrel export en `@widgets`:

`src/widgets/index.ts`:
```typescript
export { Hero } from './hero';
export { Header } from './header';
export { Footer } from './footer';
export { AboutMe } from './about-me';
export { Experience } from './experience';
export { Projects } from './projects';
export { Badges } from './badges';
```

Entonces el import se simplifica:
```astro
import { Hero, Header, Footer, AboutMe, Experience, Projects, Badges } from '@widgets';
```

---

### 3. Página: components.astro (Design System)

**Imports actuales:**
```astro
---
import Badge from '@/components/Badge.astro';
import SectionContainer from '@/components/SectionContainer.astro';
import SocialPill from '@/components/SocialPill.astro';
import LinkedInIcon from '@assets/icons/LinkedIn.astro';
import Layout from '@app/layouts/Layout.astro';
---
```

**Nuevos imports:**
```astro
---
import Layout from '@app/layouts/Layout.astro';
import { Badge, SectionContainer, SocialPill } from '@shared/ui';
import LinkedInIcon from '@assets/icons/LinkedIn.astro';
---
```

---

## 🎨 Tips Astro para Pages

### 1. **Astro.props en Pages**

```astro
---
export const prerender = true; // Static generation

interface Props {
	// Props desde getStaticPaths() si usas rutas dinámicas
}

const props = Astro.props;
---
```

### 2. **i18n en Pages**

```astro
---
import { getLangFromUrl, useTranslations } from '@shared/lib/i18n';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('page.title')}</h1>
```

### 3. **SEO con Layout**

```astro
<Layout
	title="My Page Title - Site Name"
	description="Page description for SEO"
	img_preview="/og-image.jpg"
>
	<!-- Page content -->
</Layout>
```

### 4. **Named Slots en Layout**

```astro
---
// Layout.astro
---
<html>
	<head>
		<slot name="head" />
	</head>
	<body>
		<slot />
	</body>
</html>

---
// Page usando layout
---
<Layout>
	<title slot="head">Custom Title</title>
	<p>Page content</p>
</Layout>
```

---

## ✅ Checklist Pages

- [ ] `es/index.astro` imports actualizados
- [ ] `en/index.astro` imports actualizados
- [ ] `components.astro` imports actualizados
- [ ] `index.astro` (redirect) sin cambios
- [ ] Barrel exports creados en `@widgets/index.ts`
- [ ] Barrel exports creados en `@shared/ui/index.ts`
- [ ] Build exitoso
- [ ] Dev server muestra páginas correctamente

## 🧪 Testing

```bash
# 1. Build debe pasar
bun run build

# 2. Preview debe mostrar páginas
bun run preview

# 3. Dev debe tener hot reload
bun run dev
```

## 🚀 Siguiente Paso

**[06-astro-tips.md](./06-astro-tips.md)** - Tips de Astro para evitar duplicación

---

**Tiempo estimado:** 30 minutos
