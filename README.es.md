# David Sandoval — Portafolio de Ingeniería de Software

[![Portafolio](https://img.shields.io/badge/live-sandovaldavid.com-0096ff)](https://sandovaldavid.com)
[![CI](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml)
[![Licencia MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Portafolio bilingüe y static-first para presentar experiencia profesional, evidencia de proyectos, investigación y contenido técnico.

## Acceso rápido

| Recurso | Enlace |
| --- | --- |
| Demo | [sandovaldavid.com](https://sandovaldavid.com) |
| CV en inglés | [david-sandoval-resume.pdf](https://sandovaldavid.com/resume/david-sandoval-resume.pdf) |
| CV en español | [david-sandoval-resume-es.pdf](https://sandovaldavid.com/resume/david-sandoval-resume-es.pdf) |
| Guía principal en inglés | [README.md](README.md) |

## Decisiones de ingeniería

- **Entrega static-first:** Astro genera el contenido profesional como HTML; JavaScript queda limitado a mejoras progresivas.
- **Feature-Sliced Design:** las dependencias siguen `app → widgets → features → entities → shared` y un checker valida los límites.
- **Rutas bilingües:** inglés es el idioma por defecto y español utiliza `/es`, con metadata, contenido y RSS localizados.
- **Evidencia antes que claims:** rendimiento y cobertura se sustentan en configuración versionada y comandos reproducibles.
- **Carga intencional:** presupuestos por ruta, prefetch selectivo y fuentes locales protegen los recorridos principales.

## Controles de calidad

| Área | Validación |
| --- | --- |
| Formato, lint y tipos | `bun run check` |
| Enlaces documentales | `bun run check:docs` |
| Comportamiento unitario | Vitest con alcance de cobertura basado en riesgo |
| Flujos de navegador | Playwright en pipelines proporcionales |
| Accesibilidad | Axe bloquea violaciones serious y critical |
| Rendimiento | Presupuestos por ruta y Lighthouse CI |
| Despliegue | Previews de Vercel y validación de CV en producción |

Los alcances y umbrales exactos viven en la configuración del repositorio, no en afirmaciones promocionales.

## Arquitectura

```text
src/pages → src/app → src/widgets → src/features → src/entities → src/shared
```

Las rutas Astro son entry points del framework. El código consume capas inferiores mediante aliases semánticos y APIs públicas. Consulta [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Desarrollo local

Usa la versión de Bun declarada en `packageManager` dentro de [package.json](package.json).

```bash
git clone https://github.com/sandovaldavid/portfolio-v1.git
cd portfolio-v1
bun install --frozen-lockfile
bun run dev
```

Validación habitual:

```bash
bun run check
bun run test:unit:ci
bun run build
bun run performance:check
bun run test:e2e:smoke
```

## Documentación

- [Índice y ownership documental](docs/README.md)
- [Arquitectura](docs/ARCHITECTURE.md)
- [Testing](docs/TESTING.md)
- [Política de CI](docs/CI.md)
- [Toolchain](docs/TOOLCHAIN.md)
- [Metodología de rendimiento](docs/PERFORMANCE.md)
- [Reglas para agentes](AGENTS.md)
- [Flujo de contribución](CONTRIBUTING.md)
- [Material histórico](docs/archive/README.md)

## Licencia

[MIT](LICENSE)
