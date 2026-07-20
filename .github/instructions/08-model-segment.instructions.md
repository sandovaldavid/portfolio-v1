---
applyTo: 'src/**/model/**/*.{ts,js}'
---

# Model segment

Follow [AGENTS.md](../../AGENTS.md).

- Keep transformations deterministic and explicit at typed boundaries.
- Separate runtime integrations from pure logic when practical.
- Add unit tests for business rules, edge cases and locale-sensitive transformations.
