# GitHub Copilot Instructions

This folder contains comprehensive instructions for GitHub Copilot to understand and maintain the Portfolio V1 project architecture and standards.

## 📋 Instructions Overview

### Main Documentation
- **README-COPILOT-INSTRUCTIONS.md** - Central index of all Copilot instructions
- **01-conventional-commits.prompt.md** - Git commit message conventions and standards

### FSD Layer Instructions (*.instructions.md)
Layer-specific implementation guides - files with *.instructions.md suffix are automatically recognized by GitHub Copilot:
- **01-app-layer.instructions.md** - Application initialization and configuration
- **02-pages-layer.instructions.md** - Route handlers and page composition
- **03-widgets-layer.instructions.md** - Large UI blocks and sections
- **04-features-layer.instructions.md** - Reusable business features
- **05-entities-layer.instructions.md** - Business domain entities
- **06-shared-layer.instructions.md** - Reusable utilities and components
- **07-ui-segment.instructions.md** - Component implementation patterns
- **08-model-segment.instructions.md** - Business logic and data structures

## 🎯 How Copilot Uses These Instructions

1. **When analyzing code**: Copilot checks these files to understand project structure and standards
2. **When generating code**: Copilot follows these patterns and conventions
3. **When refactoring**: Copilot applies these architectural principles
4. **When suggesting improvements**: Copilot considers these guidelines

## 📖 Quick Links

- **[Central Instructions](../README-COPILOT-INSTRUCTIONS.md)** - Start here for comprehensive overview
- **[Conventional Commits](./01-conventional-commits.prompt.md)** - Git commit conventions
- **[App Layer](./01-app-layer.instructions.md)** - Application initialization
- **[Pages Layer](./02-pages-layer.instructions.md)** - Route handlers
- **[Widgets Layer](./03-widgets-layer.instructions.md)** - UI blocks
- **[Features Layer](./04-features-layer.instructions.md)** - Business features
- **[Entities Layer](./05-entities-layer.instructions.md)** - Domain entities
- **[Shared Layer](./06-shared-layer.instructions.md)** - Utilities & components
- **[UI Segment](./07-ui-segment.instructions.md)** - Component patterns
- **[Model Segment](./08-model-segment.instructions.md)** - Business logic
- **[Project Architecture](../../docs/architecture/)** - Detailed architecture docs
- **[Testing Guide](../../docs/guides/02-testing.md)** - Testing infrastructure

## 🔍 Finding Instructions

### By Layer
All FSD layer instructions are in this folder with *.instructions.md suffix:
- `01-app-layer.instructions.md`
- `02-pages-layer.instructions.md`
- `03-widgets-layer.instructions.md`
- `04-features-layer.instructions.md`
- `05-entities-layer.instructions.md`
- `06-shared-layer.instructions.md`
- `07-ui-segment.instructions.md`
- `08-model-segment.instructions.md`

### By Topic
- Naming conventions → See layer-specific *.instructions.md files
- Code style → See `06-shared-layer.instructions.md` and `07-ui-segment.instructions.md`
- Testing → See [docs/guides/02-testing.md](../../docs/guides/02-testing.md)
- Git workflows → See `01-conventional-commits.prompt.md`

## 📝 Updating Instructions

When updating these instructions:
1. Maintain consistency with [docs/architecture/](../../docs/architecture/)
2. Update cross-references if paths change
3. Keep file names in kebab-case
4. Use numbered prefixes for sequential documents

## Related Resources

- **Project Documentation**: [docs/](../../docs/)
- **Architecture Details**: [docs/architecture/](../../docs/architecture/)
- **Project README**: [README.md](../../README.md)
- **Main Repository**: Portfolio V1
