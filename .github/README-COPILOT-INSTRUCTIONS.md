# GitHub Copilot Instructions for Portfolio V1

Este proyecto utiliza un sistema completo de instrucciones personalizadas para GitHub Copilot que implementa la arquitectura **Feature-Sliced Design (FSD)**. Las instrucciones están organizadas en diferentes niveles para proporcionar contexto específico según el área de trabajo.

## 📜 Estructura de Instrucciones

### 1. Instrucciones por Capas FSD

Cada capa de FSD tiene su propio archivo `.instructions.md` con reglas específicas:

#### **App Layer** - [`.github/instructions/01-app-layer.instructions.md`](./instructions/01-app-layer.instructions.md)

- Configuración global de la aplicación
- Providers y contexto global
- Estilos globales y temas
- Inicialización de la aplicación

#### **Pages Layer** - [`.github/instructions/02-pages-layer.instructions.md`](./instructions/02-pages-layer.instructions.md)

- Páginas de Astro y rutas
- Composición de widgets en páginas completas
- Gestión de datos específicos de página
- SEO y meta tags

#### **Widgets Layer** - [`.github/instructions/03-widgets-layer.instructions.md`](./instructions/03-widgets-layer.instructions.md)

- Bloques de UI grandes y autónomos
- Secciones principales de página (Header, Footer, Hero)
- Combinación de features y entities
- Componentes reutilizables complejos

#### **Features Layer** - [`.github/instructions/04-features-layer.instructions.md`](./instructions/04-features-layer.instructions.md)

- Funcionalidades de negocio reutilizables
- Interacciones y acciones del usuario
- Componentes con lógica de negocio
- Gestión de estado específico de features

#### **Entities Layer** - [`.github/instructions/05-entities-layer.instructions.md`](./instructions/05-entities-layer.instructions.md)

- Entidades de dominio del negocio
- Tipos de datos y interfaces
- Lógica empresarial y validaciones
- Componentes específicos de entidad

#### **Shared Layer** - [`.github/instructions/06-shared-layer.instructions.md`](./instructions/06-shared-layer.instructions.md)

- Componentes reutilizables agnósticos de negocio
- Funciones de utilidad general
- Sistema de diseño y componentes UI
- Configuración compartida

#### **UI Segment** - [`.github/instructions/07-ui-segment.instructions.md`](./instructions/07-ui-segment.instructions.md)

- Patrones de implementación de componentes
- Componentes Astro
- Estilos y diseño responsivo
- Accesibilidad

#### **Model Segment** - [`.github/instructions/08-model-segment.instructions.md`](./instructions/08-model-segment.instructions.md)

- Lógica de negocio y tipos de datos
- Validaciones y transformaciones
- State management
- Operaciones de dominio

### 2. Convenciones de Commits

**Archivo**: [`.github/instructions/01-conventional-commits.prompt.md`](./instructions/01-conventional-commits.prompt.md)

Estándares para mensajes de commit usando Conventional Commits format.

## 🎯 Cómo Copilot Usa Estas Instrucciones

1. **Contexto de Proyecto**: Al abrir archivos, Copilot lee automáticamente el contexto general
2. **Contexto de Capa**: Al trabajar con FSD layers, Copilot usa las instrucciones específicas en `.github/instructions/*.instructions.md`
3. **Contexto de Segmento**: Al trabajar con UI o Model segments, Copilot considera las instrucciones en `07-ui-segment.instructions.md` y `08-model-segment.instructions.md`

## 📋 Guía Rápida de Decisiones

### Dónde Poner Mi Código?

1. **¿Es un componente reutilizable agnóstico?** → `shared/`
2. **¿Es una entidad del dominio?** → `entities/`
3. **¿Es una funcionalidad reutilizable?** → `features/`
4. **¿Es un bloque de UI grande?** → `widgets/`
5. **¿Es una página completa?** → `pages/`

### ¿Cómo Organizar Mi Feature?

1. Crear carpeta en `src/features/mi-feature/`
2. Crear subcarpetas: `ui/`, `model/`, `lib/` (si es necesario)
3. Crear `index.ts` con las exportaciones públicas
4. Implementar según `04-features-layer.instructions.md`

## 🔍 Recursos Relacionados

- **Documentación del Proyecto**: [docs/](../docs/)
- **Arquitectura Detallada**: [docs/architecture/](../docs/architecture/)
- **Guía de Testing**: [docs/guides/02-testing.md](../docs/guides/02-testing.md)
- **Guía de Estilos**: [docs/reference/01-style-guide.md](../docs/reference/01-style-guide.md)
- **Instrucciones por Capa**: [.github/instructions/](./instructions/)

## 📝 Comenzar a Trabajar

Antes de escribir código:
1. **Revisa las instrucciones de la capa correspondiente** en [.github/instructions/](./instructions/)
2. **Entiende la estructura FSD** leyendo [docs/architecture/](../docs/architecture/)
3. **Sigue las convenciones de commits** de [01-conventional-commits.prompt.md](./instructions/01-conventional-commits.prompt.md)
4. **Verifica la guía de estilos** en [docs/reference/01-style-guide.md](../docs/reference/01-style-guide.md)

---

**Última actualización**: Julio 5, 2026
**Versión**: Final - Ready for Production
