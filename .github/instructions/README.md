# Path-specific Copilot instructions

Shared rules live in [AGENTS.md](../../AGENTS.md). Files in this directory contain only path-specific FSD differences.

- `01-app-layer.instructions.md` — application composition and global concerns.
- `02-pages-layer.instructions.md` — Astro route entry points.
- `03-widgets-layer.instructions.md` — page-level UI composition.
- `04-features-layer.instructions.md` — reusable user capabilities.
- `05-entities-layer.instructions.md` — domain concepts and presentation.
- `06-shared-layer.instructions.md` — reusable primitives and configuration.
- `07-ui-segment.instructions.md` — Astro UI implementation details.
- `08-model-segment.instructions.md` — deterministic model and data logic.

Update [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) and the executable checker when a boundary changes; do not redefine boundaries here.
