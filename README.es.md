# David Sandoval — Portafolio de Ingeniería de Software

[![Portafolio](https://img.shields.io/badge/live-sandovaldavid.com-0096ff)](https://sandovaldavid.com/es/)
[![CI](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml/badge.svg)](https://github.com/sandovaldavid/portfolio-v1/actions/workflows/ci.yml)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-green.svg)](LICENSE)

Portafolio bilingüe desarrollado con Astro, TypeScript y Tailwind CSS para presentar experiencia profesional, casos de estudio e investigación en ingeniería de software.

**Perfil principal:** Ingeniero de software enfocado en Angular, .NET y TypeScript. Ubicado en Lima, Perú (UTC-5), y disponible para oportunidades remotas en Europa y Latinoamérica.

- **Sitio:** https://sandovaldavid.com/es/
- **CV en español:** https://sandovaldavid.com/resume/david-sandoval-resume-es.pdf
- **CV en inglés:** https://sandovaldavid.com/resume/david-sandoval-resume.pdf
- **Documentación principal en inglés:** [README.md](README.md)

Las URLs del CV son públicas, estables y están servidas por el dominio del portafolio. Los PDFs validados se generan en el repositorio privado del resume y se sincronizan con la rama dedicada `resume-assets` antes del despliegue de producción.

## Qué demuestra este repositorio

### Arquitectura con Astro

El sitio utiliza generación estática y mejora progresiva. El contenido profesional se entrega como HTML y las interacciones se limitan a los controles que realmente necesitan JavaScript.

Los archivos de rutas de Astro funcionan como puntos de entrada por encima de las capas de composición:

```text
rutas → app → widgets → features → entities → shared
```

`bun run lint:architecture` valida la dirección de dependencias, el aislamiento de slices, los aliases semánticos y las APIs públicas. Las reglas ejecutables están documentadas en [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

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
- presupuestos de rendimiento por ruta para recorridos representativos en inglés y español;
- builds y previews de despliegue;
- validación posterior al despliegue de disponibilidad, firma PDF y headers HTTP de los CV públicos.

`bun run check` es el control canónico para desarrollo local y CI. Verifica el formato del repositorio, analiza JavaScript, TypeScript y componentes Astro, ejecuta los diagnósticos de Astro y comprueba los tipos de tests, scripts y configuraciones soportadas.

Los porcentajes de Vitest corresponden al [alcance unitario basado en riesgo](docs/testing/UNIT-COVERAGE.md), no a todo el repositorio. Los artefactos generados, el conocimiento importado para agentes y las auditorías históricas están excluidos explícitamente del formateo; el código mantenido, los tests, el tooling, las configuraciones y la documentación activa permanecen cubiertos. Las cifras de rendimiento son mediciones reproducibles del build según [docs/PERFORMANCE.md](docs/PERFORMANCE.md), no afirmaciones de velocidad sin evidencia.

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

### Requisitos

- Bun 1.3.14, declarado mediante `packageManager` en `package.json`
- Git

```bash
git clone https://github.com/sandovaldavid/portfolio-v1.git
cd portfolio-v1
bun install
bun run dev
```

El servidor estará disponible en `http://localhost:4321`.

### Comandos frecuentes

```bash
bun run dev                 # servidor de desarrollo
bun run check               # formato, lint y type-check completo
bun run typecheck           # Astro más tests y tooling
bun run build               # validación Astro y build de producción
bun run preview             # previsualización del build
bun run format:check        # formato del repositorio
bun run lint                # JavaScript, TypeScript y Astro
bun run test:unit           # pruebas unitarias
bun run test:unit:coverage  # cobertura unitaria basada en riesgo
bun run test:local          # Chromium, Firefox y Mobile Chrome
bun run test                # matriz completa de Playwright
bun run lighthouse          # Lighthouse CI
bun run performance:check   # presupuestos por ruta después del build
bun run bundle:visualize    # treemap de Rollup bajo demanda
```

La política de versiones y clasificación de dependencias está documentada en [docs/TOOLCHAIN.md](docs/TOOLCHAIN.md).

## Decisiones técnicas

### Entrega estática primero

El contenido principal no depende de una aplicación cliente. JavaScript se utiliza como mejora progresiva para navegación, persistencia de tema y experiencias visuales opcionales.

### Interfaz retro opcional

La identidad retro se mantiene como diferenciador, pero no se utiliza como barrera de entrada. Esto reduce fricción sin eliminar la personalidad visual del portafolio.

### Rutas bilingües

Las versiones en inglés y español comparten componentes y mantienen metadata, contenido y feeds específicos por idioma.

### Entrega aislada del resume

El repositorio privado del resume publica solamente los PDFs generados y metadata de procedencia en la rama pública `resume-assets`. El despliegue de producción incorpora esos archivos en `public/resume` y comprueba las URLs canónicas después de desplegar en Vercel.

## Contribución

Es un portafolio personal, pero los issues y revisiones constructivas son bienvenidos. Las convenciones de desarrollo están documentadas en [AGENTS.md](AGENTS.md).

## Licencia

[MIT](LICENSE)
