# Guía de Migración: Entities Layer

> 🗃️ **ARCHIVADO** — Documento histórico de la migración a FSD (octubre 2025). La migración está **completada al 100%**. Este documento se conserva únicamente como referencia del proceso. **No utilizar para el desarrollo actual**.

## 📊 Entities Layer - Modelos de Datos y Dominio

El Entities layer contiene modelos de datos, tipos TypeScript, y lógica de dominio específica del negocio. NO contienen UI directamente, pero pueden tener componentes de presentación para sus datos.

## 🎯 Data Hardcodeada a Migrar

### Inventario Actual

**En `src/components/Projects.astro`:**
```typescript
const TAGS = { PYTHON: {...}, DJANGO: {...}, ... }  // ~24 tags
const PROJECTS_DATA = { es: [...], en: [...] }      // ~12 proyectos por idioma
```

**En `src/components/Badges.astro`:**
```typescript
const BADGES = { es: [...], en: [...] }             // ~4 badges por idioma
```

**En `src/components/Experience.astro`:**
```typescript
const EXPERIENCE = [...]                             // ~5 experiencias
```

### Nueva Estructura FSD

```
src/entities/
├── technology/
│   ├── model/
│   │   ├── tags.ts              # TAGS del Projects.astro
│   │   ├── types.ts             # Interfaces TypeScript
│   │   └── index.ts             # Public API
│   └── index.ts
├── project/
│   ├── model/
│   │   ├── data.ts              # PROJECTS_DATA
│   │   ├── types.ts             # Project interface
│   │   └── index.ts
│   └── index.ts
├── badge/
│   ├── model/
│   │   ├── data.ts              # BADGES data
│   │   ├── types.ts             # BadgeItem interface
│   │   └── index.ts
│   └── index.ts
└── experience/
    ├── model/
    │   ├── data.ts              # EXPERIENCE data
    │   ├── types.ts             # Experience interface
    │   └── index.ts
    └── index.ts
```

## 📝 Migración Paso a Paso

### 1. Entity: Technology (Tags)

**Data actual** (en `src/components/Projects.astro:29-125`):
```typescript
const TAGS = {
	PYTHON: {
		name: 'Python',
		class: 'bg-blue-500 text-white',
		icon: PythonIcon,
	},
	DJANGO: {
		name: 'Django',
		class: 'bg-green-500 text-white',
		icon: DjangoIcon,
	},
	// ... ~24 tags más
};
```

**Pasos:**

1. **Crear estructura:**
```bash
mkdir -p src/entities/technology/model
```

2. **Crear types:**

`src/entities/technology/model/types.ts`:
```typescript
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

export interface Technology {
	name: string;
	class: string;
	icon: AstroComponentFactory;
}

export type TechnologyKey =
	| 'PYTHON'
	| 'DJANGO'
	| 'MARKDOWN'
	| 'BOOTSTRAP'
	| 'JAVASCRIPT'
	| 'CSS'
	| 'HTML'
	| 'TAILWIND'
	| 'REACT'
	| 'NEXTJS'
	| 'MYSQL'
	| 'MATERIALUI'
	| 'POSTGRESQL'
	| 'EXPRESS'
	| 'CLOUDINARY'
	| 'SQLITE'
	| 'SANITY'
	| 'CHARTJS'
	| 'ASTRO';

export type TechnologiesMap = Record<TechnologyKey, Technology>;
```

3. **Extraer data:**

`src/entities/technology/model/tags.ts`:
```typescript
import PythonIcon from '@assets/icons/Python.astro';
import DjangoIcon from '@assets/icons/Django.astro';
import MarkdownIcon from '@assets/icons/Markdown.astro';
import BootstrapIcon from '@assets/icons/Bootstrap.astro';
import JavaScriptIcon from '@assets/icons/JavaScript.astro';
import CSSIcon from '@assets/icons/CSS.astro';
import HTMLIcon from '@assets/icons/HTML.astro';
import TailwindIcon from '@assets/icons/Tailwind.astro';
import ReactIcon from '@assets/icons/React.astro';
import NextJSIcon from '@assets/icons/NextJS.astro';
import MySQLIcon from '@assets/icons/MySQL.astro';
import MaterialUIIcon from '@assets/icons/MaterialUI.astro';
import PostgreSQLIcon from '@assets/icons/PostgreSQL.astro';
import ExpressIcon from '@assets/icons/Express.astro';
import CloudinaryIcon from '@assets/icons/Cloudinary.astro';
import SQLiteIcon from '@assets/icons/SQLite.astro';
import SanityIcon from '@assets/icons/Sanity.astro';
import ChartJsIcon from '@assets/icons/ChartJs.astro';
import AstroIcon from '@assets/icons/AstroIcon.astro';

import type { TechnologiesMap } from './types';

export const TECHNOLOGIES: TechnologiesMap = {
	PYTHON: {
		name: 'Python',
		class: 'bg-blue-500 text-white',
		icon: PythonIcon,
	},
	DJANGO: {
		name: 'Django',
		class: 'bg-green-500 text-white',
		icon: DjangoIcon,
	},
	MARKDOWN: {
		name: 'Markdown',
		class: 'bg-gray-500 text-white',
		icon: MarkdownIcon,
	},
	BOOTSTRAP: {
		name: 'Bootstrap',
		class: 'bg-purple-500 text-white',
		icon: BootstrapIcon,
	},
	JAVASCRIPT: {
		name: 'JavaScript',
		class: 'bg-yellow-500 text-white',
		icon: JavaScriptIcon,
	},
	CSS: {
		name: 'CSS',
		class: 'bg-blue-500 text-white',
		icon: CSSIcon,
	},
	HTML: {
		name: 'HTML',
		class: 'bg-red-500 text-white',
		icon: HTMLIcon,
	},
	TAILWIND: {
		name: 'Tailwind',
		class: 'bg-blue-500 text-white',
		icon: TailwindIcon,
	},
	REACT: {
		name: 'React',
		class: 'bg-blue-500 text-white',
		icon: ReactIcon,
	},
	NEXTJS: {
		name: 'Next.js',
		class: 'bg-black text-white',
		icon: NextJSIcon,
	},
	MYSQL: {
		name: 'MySQL',
		class: 'bg-blue-500 text-white',
		icon: MySQLIcon,
	},
	MATERIALUI: {
		name: 'Material-UI',
		class: 'bg-white text-blue-600',
		icon: MaterialUIIcon,
	},
	POSTGRESQL: {
		name: 'PostgreSQL',
		class: 'bg-blue-500 text-white',
		icon: PostgreSQLIcon,
	},
	EXPRESS: {
		name: 'Express',
		class: 'bg-black text-white border border-white',
		icon: ExpressIcon,
	},
	CLOUDINARY: {
		name: 'Cloudinary',
		class: 'bg-white text-blue-900',
		icon: CloudinaryIcon,
	},
	SQLITE: {
		name: 'SQLite',
		class: 'bg-blue-500 text-white',
		icon: SQLiteIcon,
	},
	SANITY: {
		name: 'Sanity',
		class: 'bg-black text-white',
		icon: SanityIcon,
	},
	CHARTJS: {
		name: 'Chart.js',
		class: 'bg-blue-500 text-white',
		icon: ChartJsIcon,
	},
	ASTRO: {
		name: 'Astro',
		class: 'bg-black text-white',
		icon: AstroIcon,
	},
} as const;
```

4. **Public API:**

`src/entities/technology/model/index.ts`:
```typescript
export { TECHNOLOGIES } from './tags';
export type { Technology, TechnologyKey, TechnologiesMap } from './types';
```

`src/entities/technology/index.ts`:
```typescript
export * from './model';
```

---

### 2. Entity: Project

**Data actual** (en `src/components/Projects.astro:126-384`):
```typescript
const PROJECTS_DATA = {
	es: [
		{
			title: 'TechShop',
			description: '...',
			link: 'https://...',
			github: 'https://...',
			image: '/projects/...',
			tags: [TAGS.NEXTJS, TAGS.REACT, ...],
		},
		// ... 11 proyectos más
	],
	en: [...]
};
```

**Pasos:**

1. **Crear estructura:**
```bash
mkdir -p src/entities/project/model
```

2. **Crear types:**

`src/entities/project/model/types.ts`:
```typescript
import type { Technology } from '@entities/technology';

export interface Project {
	title: string;
	description: string;
	link: string;
	github: string;
	image: string;
	tags: Technology[];
}

export type ProjectsByLanguage = {
	es: Project[];
	en: Project[];
};
```

3. **Extraer data:**

`src/entities/project/model/data.ts`:
```typescript
import { TECHNOLOGIES } from '@entities/technology';
import type { ProjectsByLanguage } from './types';

export const PROJECTS: ProjectsByLanguage = {
	es: [
		{
			title: 'TechShop',
			description:
				'TechShop E-Commerce ofrece una experiencia de compra ágil y totalmente responsiva. Incluye filtros avanzados, carrito de compras dinámico, autenticación segura, lista de deseos, modo oscuro y un panel de usuario intuitivo. La gestión de contenido se realiza con Sanity CMS.',
			link: 'https://byte-shop-ecommerce.vercel.app',
			github: 'https://github.com/sandovaldavid/byte-shop-ecommerce',
			image: '/projects/project-15-TechShop.webp',
			tags: [TECHNOLOGIES.NEXTJS, TECHNOLOGIES.REACT, TECHNOLOGIES.SANITY, TECHNOLOGIES.TAILWIND],
		},
		// ... copiar los otros 11 proyectos
	],
	en: [
		// ... proyectos en inglés
	],
};
```

4. **Public API:**

`src/entities/project/model/index.ts`:
```typescript
export { PROJECTS } from './data';
export type { Project, ProjectsByLanguage } from './types';
```

`src/entities/project/index.ts`:
```typescript
export * from './model';
```

---

### 3. Entity: Badge

**Data actual** (en `src/components/Badges.astro:7-58`):
```typescript
const BADGES: Record<string, BadgeItem[]> = {
	es: [
		{
			label: 'GitHub Foundations | GitHub',
			link: 'https://...',
			image: '/badges/...',
		},
		// ... 3 badges más
	],
	en: [...]
};
```

**Pasos:**

1. **Crear estructura:**
```bash
mkdir -p src/entities/badge/model
```

2. **Crear types:**

`src/entities/badge/model/types.ts`:
```typescript
export interface Badge {
	label: string;
	link?: string;
	image: string;
}

export type BadgesByLanguage = {
	es: Badge[];
	en: Badge[];
};
```

3. **Extraer data:**

`src/entities/badge/model/data.ts`:
```typescript
import type { BadgesByLanguage } from './types';

export const BADGES: BadgesByLanguage = {
	es: [
		{
			label: 'GitHub Foundations | GitHub',
			link: 'https://www.credly.com/badges/5ba766a3-e275-4be8-ac14-17a69119b3af/linked_in_profile',
			image: '/badges/github-foundations.png',
		},
		{
			label: 'Modelado de Datos con Python | ONE - G8',
			link: 'https://app.aluracursos.com/degree/certificate/d26312ad-b17d-4a4f-9b91-a761ea22fd25?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/0cbae998-197d-4fc8-ac13-5d12d560e624.png',
		},
		{
			label: 'ETL | ONE - G8',
			link: 'https://app.aluracursos.com/degree/certificate/817f4fb9-ad6a-429d-b67b-7769f0cd935c?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/007f0f58-5970-4133-94b8-9af2551f2ab2.png',
		},
		{
			label: 'Estadisticas y Machine Learning | ONE - G8',
			link: 'https://app.aluracursos.com/degree/certificate/2f9a9981-0e97-4d43-a400-e3b2761d407d?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/832d01c5-aa1f-4a72-894b-9bb18b8d2a00.png',
		},
	],
	en: [
		{
			label: 'GitHub Foundations',
			link: 'https://www.credly.com/badges/5ba766a3-e275-4be8-ac14-17a69119b3af/linked_in_profile',
			image: '/badges/github-foundations.png',
		},
		{
			label: 'Data Modeling with Python | ONE - G8',
			link: 'https://app.aluracursos.com/degree/certificate/d26312ad-b17d-4a4f-9b91-a761ea22fd25?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/0cbae998-197d-4fc8-ac13-5d12d560e624.png',
		},
		{
			label: 'ETL | ONE - G8',
			link: 'https://app.aluracursos.com/degree/certificate/817f4fb9-ad6a-429d-b67b-7769f0cd935c?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/007f0f58-5970-4133-94b8-9af2551f2ab2.png',
		},
		{
			label: 'Statistics and Machine Learning | ONE - G8',
			link: 'https://app.aluracursos.com/degree/certificate/2f9a9981-0e97-4d43-a400-e3b2761d407d?lang',
			image: 'https://cdn1.gnarususercontent.com.br/6/409126/832d01c5-aa1f-4a72-894b-9bb18b8d2a00.png',
		},
	],
};
```

4. **Public API:**

`src/entities/badge/model/index.ts`:
```typescript
export { BADGES } from './data';
export type { Badge, BadgesByLanguage } from './types';
```

`src/entities/badge/index.ts`:
```typescript
export * from './model';
```

---

### 4. Entity: Experience

**Data actual** (en `src/components/Experience.astro:8-39`):
```typescript
const EXPERIENCE = [
	{
		date: t('experience.chirasoft.date'),
		title: t('experience.chirasoft.title'),
		description: t('experience.chirasoft.description'),
		company: t('experience.chirasoft.company'),
	},
	// ... 4 experiencias más
];
```

**Pasos:**

1. **Crear estructura:**
```bash
mkdir -p src/entities/experience/model
```

2. **Crear types:**

`src/entities/experience/model/types.ts`:
```typescript
export interface Experience {
	date: string;
	title: string;
	description: string;
	company: string;
}

export type ExperienceKey =
	| 'chirasoft'
	| 'harvardx'
	| 'data-science'
	| 'technical-support'
	| 'alura';
```

3. **Crear helper para i18n:**

`src/entities/experience/model/data.ts`:
```typescript
import type { Language } from '@shared/config/i18n';
import type { Experience, ExperienceKey } from './types';

// Helper para obtener experiencias con traducciones
export function getExperiences(
	t: (key: string) => string,
	lang: Language
): Experience[] {
	const experienceKeys: ExperienceKey[] = [
		'chirasoft',
		'harvardx',
		'data-science',
		'technical-support',
		'alura',
	];

	return experienceKeys.map(key => ({
		date: t(`experience.${key}.date`),
		title: t(`experience.${key}.title`),
		description: t(`experience.${key}.description`),
		company: t(`experience.${key}.company`),
	}));
}
```

4. **Public API:**

`src/entities/experience/model/index.ts`:
```typescript
export { getExperiences } from './data';
export type { Experience, ExperienceKey } from './types';
```

`src/entities/experience/index.ts`:
```typescript
export * from './model';
```

---

## 🎨 Tip Astro: Content Collections (Opción Avanzada)

**Para proyectos más grandes**, considera usar Content Collections de Astro en vez de data hardcodeada:

### Crear Content Collection para Projects

1. **Crear `src/content/config.ts`:**
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/data/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		link: z.string().url(),
		github: z.string().url(),
		image: z.string(),
		tags: z.array(z.string()),
	}),
});

export const collections = {
	projects: projectsCollection,
};
```

2. **Crear archivos JSON:**
```
src/data/projects/
├── es/
│   ├── techshop.json
│   ├── buona-vita.json
│   └── ...
└── en/
    ├── techshop.json
    └── ...
```

3. **Query en componentes:**
```astro
---
import { getCollection } from 'astro:content';

const lang = 'es';
const projects = await getCollection('projects', ({ id }) => id.startsWith(lang));
---
```

**Ventajas:**
- ✅ TypeScript type-safety automático
- ✅ Zod validation
- ✅ IntelliSense en editor
- ✅ Hot reload en dev

**Desventajas:**
- ❌ Más setup inicial
- ❌ Archivos separados

---

## ✅ Checklist de Entities Layer

- [ ] Entity `technology` creada con TECHNOLOGIES
- [ ] Entity `project` creada con PROJECTS
- [ ] Entity `badge` creada con BADGES
- [ ] Entity `experience` creada con getExperiences
- [ ] Todos los types TypeScript definidos
- [ ] Public APIs creadas (`index.ts`)
- [ ] Imports usando path aliases (`@entities/`)
- [ ] Build exitoso sin errores

## 🧪 Testing

```typescript
// Crear src/test-entities.ts para verificar
import { TECHNOLOGIES } from '@entities/technology';
import { PROJECTS } from '@entities/project';
import { BADGES } from '@entities/badge';
import { getExperiences } from '@entities/experience';

// Si TypeScript no da errores, la migración es exitosa
console.log(TECHNOLOGIES.PYTHON);
console.log(PROJECTS.es[0]);
console.log(BADGES.es[0]);
```

```bash
bun run build
```

## 🚀 Siguiente Paso

Una vez completada la migración de Entities:
**[03-features-layer.md](./03-features-layer.md)** - Migración de Features Interactivas

---

**Tiempo estimado:** 1-2 horas
