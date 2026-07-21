# Guía de Refactorización FSD - Visión General

> 🗃️ **ARCHIVADO** — Documento histórico de la migración a FSD (octubre 2025). La migración está **completada al 100%**. Este documento se conserva únicamente como referencia del proceso. **No utilizar para el desarrollo actual**.

## 📋 Estado Actual del Proyecto

### Estructura Actual (Legacy)

```bash
src/
├── components/          # 16 componentes (LEGACY - a migrar)
├── i18n/               # 2 archivos (MIGRADO parcialmente a shared)
├── assets/             # Icons y technologies (a organizar)
├── pages/              # 4 páginas Astro
├── app/                # ✅ Ya existe (layouts, styles)
├── entities/           # ✅ Ya existe (badges/, projects/)
└── shared/             # ✅ Ya existe (ui/, lib/, config/)
```

### Componentes a Migrar (16 componentes)

#### 📦 Shared Layer (6 componentes UI básicos)

Componentes genéricos sin lógica de negocio:

- `Badge.astro` → `src/shared/ui/badge/`
- `SectionContainer.astro` → `src/shared/ui/section-container/`
- `LinkButton.astro` → `src/shared/ui/link-button/`
- `LinkInline.astro` → `src/shared/ui/link-inline/`
- `SocialPill.astro` → `src/shared/ui/social-pill/`
- `TitleSection.astro` → `src/shared/ui/title-section/`

#### 🎯 Features Layer (2 componentes con interactividad)

Componentes con lógica client-side:

- `ThemeToggle.astro` → `src/features/theme-toggle/`
- `LanguagePicker.astro` → `src/features/language-picker/`

#### 🧩 Widgets Layer (7 componentes de secciones)

Secciones grandes que componen features + entities:

- `Header.astro` → `src/widgets/header/`
- `Footer.astro` → `src/widgets/footer/`
- `Hero.astro` → `src/widgets/hero/`
- `AboutMe.astro` → `src/widgets/about-me/`
- `Experience.astro` + `ExperienceItem.astro` → `src/widgets/experience/`
- `Projects.astro` → `src/widgets/projects/`
- `Badges.astro` → `src/widgets/badges/`

#### 📊 Entities Layer (Data Models)

Data hardcodeada a extraer:

- Projects data (PROJECTS_DATA) → `src/entities/project/model/data.ts`
- Badges data (BADGES) → `src/entities/badge/model/data.ts`
- Experience data (EXPERIENCE) → `src/entities/experience/model/data.ts`
- Tags/Technologies (TAGS) → `src/entities/technology/model/tags.ts`

### Assets a Organizar

```bash
src/assets/
├── icons/          # ~30 iconos → src/shared/assets/icons/
└── technologies/   # Iconos tech → src/entities/technology/assets/
```

## 🗺️ Mapa de Migración FSD

### Diagrama de Dependencias

```bash
┌─────────────────────────────────────────────────────────┐
│ PAGES (No cambia mucho, solo imports)                  │
│ - index.astro, es/index.astro, en/index.astro          │
└────────────────────┬────────────────────────────────────┘
                     │ imports
                     ↓
┌─────────────────────────────────────────────────────────┐
│ WIDGETS (Secciones completas)                           │
│ - header/ footer/ hero/ about-me/                       │
│ - experience/ projects/ badges/                         │
└────────────────────┬────────────────────────────────────┘
                     │ imports
        ┌────────────┴────────────┐
        ↓                         ↓
┌───────────────────┐    ┌───────────────────────┐
│ FEATURES          │    │ ENTITIES              │
│ - theme-toggle/   │    │ - project/            │
│ - language-picker/│    │ - badge/              │
└─────────┬─────────┘    │ - experience/         │
          │              │ - technology/         │
          │              └──────────┬────────────┘
          │                         │
          └────────────┬────────────┘
                       │ imports
                       ↓
        ┌──────────────────────────────┐
        │ SHARED                       │
        │ - ui/ (Badge, LinkButton...) │
        │ - lib/ (i18n utilities)      │
        │ - config/ (i18n, constants)  │
        │ - assets/ (icons)            │
        └──────────────────────────────┘
```

## 📝 Orden Recomendado de Migración

### Fase 1: Shared Layer (Base sólida)

**Tiempo estimado: 2-3 horas**

1. ✅ Avatar (ya migrado)
2. Badge + SectionContainer + TitleSection
3. LinkButton + LinkInline + SocialPill
4. Organizar assets/icons → shared/assets/

**Por qué primero:** Sin dependencias, todos los demás los usan.

### Fase 2: Entities Layer (Modelos de datos)

**Tiempo estimado: 1-2 horas**

1. Extraer TAGS → `entities/technology/model/`
2. Extraer PROJECTS_DATA → `entities/project/model/`
3. Extraer BADGES → `entities/badge/model/`
4. Extraer EXPERIENCE → `entities/experience/model/`
5. Crear types TypeScript para cada entity

**Por qué segundo:** Features y Widgets necesitan estos datos.

### Fase 3: Features Layer (Lógica interactiva)

**Tiempo estimado: 1-2 horas**

1. ThemeToggle (incluye script client-side)
2. LanguagePicker (incluye lógica i18n)

**Por qué tercero:** Widgets los compondrán después.

### Fase 4: Widgets Layer (Composición)

**Tiempo estimado: 3-4 horas**

1. Hero (usa Avatar, SocialPill)
2. Footer (usa Avatar, features)
3. Header (usa ThemeToggle, LanguagePicker)
4. AboutMe (simple, solo UI)
5. Experience (usa ExperienceItem interno)
6. Projects (usa entities/project, LinkButton)
7. Badges (usa entities/badge, Badge component)

**Por qué cuarto:** Componen todo lo anterior.

### Fase 5: Pages (Actualizar imports)

**Tiempo estimado: 30 min**

1. Actualizar imports en `index.astro`
2. Actualizar imports en `es/index.astro`
3. Actualizar imports en `en/index.astro`

**Por qué último:** Solo cambiar imports a Public APIs.

## 🎯 Objetivos de la Refactorización

### ✅ Logros Esperados

1. **Arquitectura Clara**: Cada componente en su capa correcta
2. **Mejor DX**: Autocompletado e IntelliSense mejorados
3. **Mantenibilidad**: Cambios aislados por dominio
4. **Escalabilidad**: Fácil agregar nuevas features
5. **TypeScript**: Type-safety completo
6. **Build Limpio**: Sin errores ni warnings

### 📊 Métricas de Éxito

- [ ] 0 componentes en `src/components/` (todos migrados)
- [ ] 0 data hardcodeada en widgets
- [ ] Public APIs (`index.ts`) en cada slice
- [ ] Build exitoso (`bun run build`)
- [ ] 0 errores TypeScript
- [ ] Imports usando path aliases (`@widgets/`, `@features/`, etc)

## ⚠️ Consideraciones Importantes

### No Romper Durante Migración

**Estrategia: Migración Incremental**

1. NO borrar componentes legacy hasta terminar migración
2. Crear nuevos componentes en estructura FSD
3. Probar cada capa antes de continuar
4. Actualizar imports progresivamente
5. Borrar legacy al final

### Mantener Funcionalidad

- ✅ i18n debe seguir funcionando (es/en)
- ✅ Theme toggle debe funcionar
- ✅ Navegación debe funcionar
- ✅ Imágenes deben cargar
- ✅ Responsive design intacto

### Build & TypeScript

```bash
# Después de cada fase, ejecutar:
bun run build

# Verificar que:
# - 0 errores TypeScript
# - Build exitoso
# - Páginas generadas correctamente
```

## 📚 Documentos Relacionados

1. **[01-shared-layer.md](./01-shared-layer.md)** - Migración de componentes UI básicos
2. **[02-entities-layer.md](./02-entities-layer.md)** - Migración de data models
3. **[03-features-layer.md](./03-features-layer.md)** - Migración de features interactivas
4. **[04-widgets-layer.md](./04-widgets-layer.md)** - Migración de secciones grandes
5. **[05-pages-migration.md](./05-pages-migration.md)** - Actualización de páginas
6. **[06-astro-tips.md](./06-astro-tips.md)** - Tips específicos de Astro
7. **[07-checklist.md](./07-checklist.md)** - Checklist completo

## 🚀 Comenzar

Para empezar la migración, dirígete a:
**[01-shared-layer.md](./01-shared-layer.md)**

---

**Última actualización**: Octubre 2025
**Versión**: 1.0.0
