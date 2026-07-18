# David Sandoval — Portafolio de Ingeniería de Software

[![Portafolio](https://img.shields.io/badge/live-sandovaldavid.com-0096ff)](https://sandovaldavid.com/es/)
[![CI](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-green.svg)](LICENSE)

Portafolio bilingüe desarrollado con Astro, TypeScript y Tailwind CSS para presentar experiencia profesional, casos de estudio e investigación en ingeniería de software.

**Perfil principal:** Ingeniero de software enfocado en Angular, .NET y TypeScript. Ubicado en Lima, Perú (UTC-5), y disponible para oportunidades remotas en Europa y Latinoamérica.

- **Sitio:** https://sandovaldavid.com/es/
- **CV en español:** https://github.com/sandovaldavid/resume/releases/download/resume-latest/David_Sandoval_Resume_SoftwareEngineer_ES.pdf
- **CV en inglés:** https://github.com/sandovaldavid/resume/releases/download/resume-latest/David_Sandoval_Resume_SoftwareEngineer_EN.pdf
- **Documentación principal en inglés:** [README.md](README.md)

## Qué demuestra este repositorio

### Arquitectura con Astro

El sitio utiliza generación estática y mejora progresiva. El contenido profesional se entrega como HTML y las interacciones se limitan a los controles que realmente necesitan JavaScript.

La estructura sigue una adaptación pragmática de Feature-Sliced Design:

```text
app → pages → widgets → features → entities → shared
```

### Internacionalización y contenido

- Inglés como idioma por defecto.
- Rutas en español con el prefijo `/es`.
- Casos de estudio con problema, enfoque, trade-offs, resultado y aprendizajes.
- Blog y devlog con Astro Content Collections.
- Feeds RSS para ambos idiomas.

### Experiencia para reclutadores

La primera vista muestra inmediatamente el rol, stack principal, proyectos, correo, CV, GitHub y LinkedIn. La secuencia retro es opcional y no bloquea el acceso al contenido.

### Controles de calidad

El repositorio incluye automatización para:

- validación de Astro y TypeScript;
- formato y linting;
- pruebas unitarias con Vitest;
- pruebas E2E con Playwright;
- accesibilidad con Axe;
- auditorías con Lighthouse;
- builds y previews de despliegue.

## Tecnologías principales

- Astro
- TypeScript
- Tailwind CSS
- Bun
- Vitest
- Playwright
- Axe
- Lighthouse CI
- Vercel

## Desarrollo local

```bash
git clone https://github.com/sandovaldavid/portfolio-v1.git
cd portfolio-v1
bun install
bun run dev
```

El servidor estará disponible en `http://localhost:4321`.

### Comandos frecuentes

```bash
bun run dev
bun run build
bun run preview
bun run format:check
bun run lint
bun run test:unit
bun run test:unit:coverage
bun run test:local
bun run test
bun run lighthouse
```

## Decisiones técnicas

### Entrega estática primero

El contenido principal no depende de una aplicación cliente. JavaScript se utiliza como mejora progresiva para navegación, persistencia de tema y experiencias visuales opcionales.

### Interfaz retro opcional

La identidad retro se mantiene como diferenciador, pero no se utiliza como barrera de entrada. Esto reduce fricción sin eliminar la personalidad visual del portafolio.

### Rutas bilingües

Las versiones en inglés y español comparten componentes y mantienen metadata, contenido y feeds específicos por idioma.

## Contribución

Es un portafolio personal, pero los issues y revisiones constructivas son bienvenidos. Las convenciones de desarrollo están documentadas en [AGENTS.md](AGENTS.md).

## Licencia

[MIT](LICENSE)
