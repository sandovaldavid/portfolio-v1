---
applyTo: 'src/features/**'
---

# Features layer

Follow [AGENTS.md](../../AGENTS.md) and [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md).

- Model a reusable user capability, not a page section.
- Depend only on entities and shared code; do not import peer features.
- Cover interactive state and Astro client-navigation reinitialization when applicable.
