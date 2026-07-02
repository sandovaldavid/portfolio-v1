# Guía de Migración: Shared Layer

> 📜 **Documento histórico** — Guía de la migración a FSD (octubre 2025). La migración está **completa**: 16 widgets, 4 features, 5 entities. Este documento se conserva como referencia del proceso y no refleja el estado actual del proyecto.

## 📦 Shared Layer - Componentes UI Básicos

El Shared layer contiene componentes UI genéricos, reutilizables y **sin lógica de negocio**. Son los building blocks de tu aplicación.

## 🎯 Componentes a Migrar

### Inventario Actual

```
src/components/
├── Badge.astro             → src/shared/ui/badge/
├── SectionContainer.astro  → src/shared/ui/section-container/
├── LinkButton.astro        → src/shared/ui/link-button/
├── LinkInline.astro        → src/shared/ui/link-inline/
├── SocialPill.astro        → src/shared/ui/social-pill/
└── TitleSection.astro      → src/shared/ui/title-section/
```

## 📝 Migración Paso a Paso

### 1. Badge Component

**Componente actual:** `src/components/Badge.astro`

```astro
---
const { src, alt = '', href } = Astro.props;
---

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="relative flex items-center justify-center size-28 rounded-full bg-gray-200/30 dark:bg-gray-500/20 transition-all duration-300 ease-in-out group hover:bg-gray-200/50 dark:hover:bg-gray-500/40 hover:shadow-lg"
>
	<img
		{src}
		{alt}
		class="size-24 aspect-square transition-transform duration-300 ease-in-out group-hover:scale-110"
	/>
	<span
		class="absolute bottom-0 mb-20 hidden px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300 text-center w-52"
	>
		{alt}
	</span>
</a>
```

**Análisis:**

- ✅ Sin lógica de negocio
- ✅ Props simples (src, alt, href)
- ✅ Reutilizable
- ❌ Usa `<img>` en vez de `<Image>` de Astro

**Nueva ubicación FSD:**

```bash
src/shared/ui/badge/
├── Badge.astro        # Componente
└── index.ts           # Public API
```

**Pasos:**

1. **Crear estructura:**

```bash
mkdir -p src/shared/ui/badge
```

2. **Migrar componente con mejoras Astro:**

`src/shared/ui/badge/Badge.astro`:

```astro
---
import { Image } from 'astro:assets';

interface Props {
	src: string;
	alt?: string;
	href?: string;
	class?: string;
}

const { src, alt = '', href, class: className } = Astro.props;

// Tip Astro: Usar componente Image para optimización automática
// Solo si la imagen es local. Para URLs externas, usar <img>
const isLocalImage = src.startsWith('/') || src.startsWith('./');
---

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class:list={[
		'relative flex items-center justify-center size-28 rounded-full',
		'bg-gray-200/30 dark:bg-gray-500/20',
		'transition-all duration-300 ease-in-out',
		'group hover:bg-gray-200/50 dark:hover:bg-gray-500/40 hover:shadow-lg',
		className,
	]}
>
	{
		isLocalImage ? (
			<Image
				src={src}
				alt={alt}
				width={96}
				height={96}
				class="size-24 aspect-square transition-transform duration-300 ease-in-out group-hover:scale-110"
			/>
		) : (
			<img
				src={src}
				alt={alt}
				class="size-24 aspect-square transition-transform duration-300 ease-in-out group-hover:scale-110"
			/>
		)
	}
	<span
		class="absolute bottom-0 mb-20 hidden px-2 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-300 text-center w-52"
	>
		{alt}
	</span>
</a>
```

**Mejoras aplicadas:**

- ✅ Interface TypeScript para props
- ✅ Uso de `class:list` de Astro
- ✅ Soporte para `<Image>` en imágenes locales
- ✅ Prop `class` adicional para extensibilidad

3. **Crear Public API:**

`src/shared/ui/badge/index.ts`:

```typescript
export { default as Badge } from './Badge.astro';
```

4. **Actualizar `src/shared/ui/index.ts`:**

```typescript
export { Avatar } from './Avatar.astro'; // Ya existe
export { Badge } from './badge';
```

---

### 2. SectionContainer Component

**Componente actual:** `src/components/SectionContainer.astro`

```astro
---
const { class: className, id } = Astro.props;
---

<section {id} class:list={['w-full mx-auto container lg:max-w-4xl md:max-w-2xl', className]}>
	<slot />
</section>
```

**Análisis:**

- ✅ Componente de layout simple
- ✅ Usa slots (patrón Astro correcto)
- ✅ Ya usa `class:list`

**Nueva ubicación:**

```bash
src/shared/ui/section-container/
├── SectionContainer.astro
└── index.ts
```

**Pasos:**

1. **Crear estructura:**

```bash
mkdir -p src/shared/ui/section-container
```

2. **Migrar con tipos:**

`src/shared/ui/section-container/SectionContainer.astro`:

```astro
---
interface Props {
	class?: string;
	id?: string;
}

const { class: className, id } = Astro.props;
---

<section {id} class:list={['w-full mx-auto container', 'lg:max-w-4xl md:max-w-2xl', className]}>
	<slot />
</section>
```

3. **Public API:**

`src/shared/ui/section-container/index.ts`:

```typescript
export { default as SectionContainer } from './SectionContainer.astro';
```

---

### 3. LinkButton Component

**Componente actual:** `src/components/LinkButton.astro`

**Análisis del código actual:**

```astro
---
const { href } = Astro.props;
---

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	role="link"
	class="inline-flex items-center justify-center gap-2 px-4 py-1 text-gray-800 transition bg-gray-100 border border-gray-300 rounded-full dark:bg-gray-800 dark:border-gray-600 dark:text-white focus-visible:ring-yellow-500/80 text-base hover:bg-gray-900 hover:border-gray-700 group max-w-fit hover:text-white focus:outline-none focus-visible:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-offset-2 active:bg-black"
>
	<slot />
</a>
```

**Nueva ubicación:**

```bash
src/shared/ui/link-button/
├── LinkButton.astro
└── index.ts
```

**Migración:**

`src/shared/ui/link-button/LinkButton.astro`:

```astro
---
interface Props {
	href: string;
	target?: '_blank' | '_self';
	class?: string;
}

const { href, target = '_blank', class: className } = Astro.props;
---

<a
	{href}
	{target}
	rel={target === '_blank' ? 'noopener noreferrer' : undefined}
	role="link"
	class:list={[
		'inline-flex items-center justify-center gap-2',
		'px-4 py-1 text-base max-w-fit',
		'text-gray-800 dark:text-white',
		'bg-gray-100 dark:bg-gray-800',
		'border border-gray-300 dark:border-gray-600',
		'rounded-full transition',
		'hover:bg-gray-900 hover:border-gray-700 hover:text-white',
		'focus:outline-none focus-visible:outline-none',
		'focus-visible:ring focus-visible:ring-white focus-visible:ring-yellow-500/80 focus-visible:ring-offset-2',
		'active:bg-black',
		'group',
		className,
	]}
>
	<slot />
</a>
```

`src/shared/ui/link-button/index.ts`:

```typescript
export { default as LinkButton } from './LinkButton.astro';
```

---

### 4. Componentes Restantes (Rápido)

**LinkInline, SocialPill, TitleSection** siguen el mismo patrón:

```bash
# Crear estructuras
mkdir -p src/shared/ui/link-inline
mkdir -p src/shared/ui/social-pill
mkdir -p src/shared/ui/title-section

# Copiar componentes
cp src/components/LinkInline.astro src/shared/ui/link-inline/LinkInline.astro
cp src/components/SocialPill.astro src/shared/ui/social-pill/SocialPill.astro
cp src/components/TitleSection.astro src/shared/ui/title-section/TitleSection.astro

# Agregar interfaces Props a cada uno
# Crear index.ts en cada carpeta
```

---

## 🎨 Actualizar Public API Central

`src/shared/ui/index.ts`:

```typescript
// Componentes UI del Shared Layer
export { Avatar } from './avatar';
export { Badge } from './badge';
export { SectionContainer } from './section-container';
export { LinkButton } from './link-button';
export { LinkInline } from './link-inline';
export { SocialPill } from './social-pill';
export { TitleSection } from './title-section';
```

## 🧪 Testing de Migración

### 1. Verificar estructura:

```bash
ls -R src/shared/ui/

# Debe mostrar:
# src/shared/ui/:
# avatar/ badge/ section-container/ link-button/ link-inline/ social-pill/ title-section/ index.ts
```

### 2. Test de import:

Crear archivo temporal `src/test-imports.ts`:

```typescript
import {
	Avatar,
	Badge,
	SectionContainer,
	LinkButton,
	LinkInline,
	SocialPill,
	TitleSection,
} from '@shared/ui';

// Si no hay errores TypeScript, la migración es exitosa
```

### 3. Build:

```bash
bun run build
```

## 📊 Tips Astro Aplicados

### 1. **Astro.props con TypeScript**

```astro
---
interface Props {
	title: string;
	description?: string; // Opcional
}
const { title, description = 'Default' } = Astro.props;
---
```

### 2. **class:list para clases dinámicas**

```astro
<div
	class:list={[
		'base-class',
		condition && 'conditional-class',
		className, // De props
	]}
>
</div>
```

### 3. **Slots para composición**

```astro
<!-- Componente -->
<div>
	<slot />
	<!-- Contenido hijo -->
</div>

<!-- Uso -->
<MyComponent>
	<p>Este contenido va al slot</p>
</MyComponent>
```

### 4. **Image vs img**

```astro
---
import { Image } from 'astro:assets';
---

<!-- Para imágenes locales (optimización automática) -->
<Image src="/profile.jpg" alt="..." width={200} height={200} />

<!-- Para URLs externas -->
<img src="https://example.com/image.jpg" alt="..." />
```

## ✅ Checklist de Shared Layer

- [ ] Badge migrado con TypeScript interface
- [ ] SectionContainer migrado
- [ ] LinkButton migrado
- [ ] LinkInline migrado
- [ ] SocialPill migrado
- [ ] TitleSection migrado
- [ ] Public API creada (`index.ts` en cada componente)
- [ ] Public API central actualizada (`src/shared/ui/index.ts`)
- [ ] Build exitoso sin errores
- [ ] TypeScript sin warnings

## 🚀 Siguiente Paso

Una vez completada la migración del Shared Layer:
**[02-entities-layer.md](./02-entities-layer.md)** - Migración de Data Models

---

**Tiempo estimado:** 2-3 horas
