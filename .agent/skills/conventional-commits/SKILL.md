---
name: conventional-commits
description: 'Guide for creating Git commit messages following Conventional Commits specification with Gitmoji emojis. Use when the user needs to create a commit message, format their commits, or asks about commit conventions. Ensures commits have: (1) proper type prefix, (2) appropriate Gitmoji emoji, (3) concise title (≤50 chars), and (4) detailed description of changes.'
---

# Conventional Commits with Gitmoji

Format Git commit messages following Conventional Commits specification enhanced with Gitmoji emojis.

## Commit Structure

Every commit message must follow this structure:

```
<emoji> <type>(<scope>): <subject>

<body>
```

### Components

1. **Emoji**: Gitmoji representing the change type
2. **Type**: Conventional commit type
3. **Scope** (optional): Component or area affected
4. **Subject**: Brief description (≤50 characters)
5. **Body**: Detailed explanation of changes (optional but recommended)

## Commit Types and Emojis

| Type       | Emoji | Gitmoji Code            | Description               |
| ---------- | ----- | ----------------------- | ------------------------- |
| `feat`     | ✨    | `:sparkles:`            | New feature               |
| `fix`      | 🐛    | `:bug:`                 | Bug fix                   |
| `docs`     | 📝    | `:memo:`                | Documentation changes     |
| `style`    | 💄    | `:lipstick:`            | UI/styling changes        |
| `refactor` | ♻️    | `:recycle:`             | Code refactoring          |
| `perf`     | ⚡    | `:zap:`                 | Performance improvements  |
| `test`     | ✅    | `:white_check_mark:`    | Adding/updating tests     |
| `build`    | 📦    | `:package:`             | Build system/dependencies |
| `ci`       | 👷    | `:construction_worker:` | CI/CD changes             |
| `chore`    | 🔧    | `:wrench:`              | Configuration/tooling     |
| `revert`   | ⏪    | `:rewind:`              | Revert previous commit    |
| `wip`      | 🚧    | `:construction:`        | Work in progress          |
| `hotfix`   | 🚑    | `:ambulance:`           | Critical hotfix           |
| `deploy`   | 🚀    | `:rocket:`              | Deployment                |
| `security` | 🔒    | `:lock:`                | Security fixes            |
| `init`     | 🎉    | `:tada:`                | Initial commit            |

### Additional Common Gitmojis

| Emoji | Gitmoji Code                  | Use Case              |
| ----- | ----------------------------- | --------------------- |
| 🔥    | `:fire:`                      | Remove code/files     |
| 📱    | `:iphone:`                    | Responsive design     |
| 🌐    | `:globe_with_meridians:`      | Internationalization  |
| ♿    | `:wheelchair:`                | Accessibility         |
| 💚    | `:green_heart:`               | Fix CI build          |
| 🎨    | `:art:`                       | Code structure/format |
| 🔀    | `:twisted_rightwards_arrows:` | Merge branches        |
| 🗃️    | `:card_file_box:`             | Database changes      |
| 🔊    | `:loud_sound:`                | Add/update logs       |
| 🔇    | `:mute:`                      | Remove logs           |
| 👽    | `:alien:`                     | External API changes  |
| 🍱    | `:bento:`                     | Add/update assets     |
| ⚗️    | `:alembic:`                   | Experiments           |
| 🏷️    | `:label:`                     | Add/update types      |
| 🥅    | `:goal_net:`                  | Catch errors          |

## Writing Guidelines

### Subject Line (Title)

- **Maximum 50 characters** (strict limit)
- Use imperative mood ("add" not "added" or "adds")
- Do not end with a period
- Capitalize first word after type
- Be specific but concise

**Examples:**

```
✨ feat(auth): Add OAuth2 login support
🐛 fix(api): Resolve null pointer in user endpoint
📝 docs(readme): Update installation instructions
```

### Body (Description)

The body should explain:

- **What** changed
- **Why** the change was necessary
- **How** it addresses the issue (if not obvious)
- Any side effects or implications
- Breaking changes (prefixed with `BREAKING CHANGE:`)

**Guidelines:**

- Wrap at 72 characters per line
- Use bullet points for multiple changes
- Include ticket/issue references
- Explain context that isn't obvious from code

**Example:**

```
✨ feat(auth): Add OAuth2 authentication

Implement OAuth2 flow for third-party authentication:
- Add Google and GitHub OAuth providers
- Create middleware for token validation
- Update user model to support external IDs

This enables users to login without creating passwords,
improving security and user experience.

Resolves: #123
```

## Common Patterns

### Feature Addition

```
✨ feat(dashboard): Add real-time analytics widget

Implement WebSocket-based analytics dashboard:
- Add real-time data streaming
- Create interactive charts with Chart.js
- Implement data caching for performance
```

### Bug Fix

```
🐛 fix(cart): Prevent duplicate items in checkout

Fixed race condition when adding items rapidly:
- Add debouncing to add-to-cart button
- Implement optimistic locking in cart service
- Add unit tests for concurrent additions
```

### Refactoring

```
♻️ refactor(api): Extract validation into middleware

Move validation logic from controllers to middleware:
- Create reusable validation middleware
- Update all API routes to use new middleware
- Remove duplicate validation code

This reduces code duplication and improves maintainability.
```

### Breaking Change

```
💥 feat(api): Migrate to v2 endpoint structure

BREAKING CHANGE: API endpoints now use `/api/v2/` prefix
- All v1 endpoints deprecated (will be removed in 3 months)
- Update client libraries to support v2
- Add migration guide in docs/MIGRATION.md

Clients must update their API base URL.
```

## Workflow

When creating a commit message:

1. **Identify the change type** - Select the primary type that best describes the change
2. **Choose the appropriate emoji** - Match the emoji to the commit type
3. **Write the subject** - Keep it under 50 characters, be specific
4. **Add the body** - Explain the changes in detail

## Examples of Complete Commits

```
✨ feat(payment): Add Stripe payment integration

Integrate Stripe for payment processing:
- Add Stripe SDK and configuration
- Create payment service with charge/refund methods
- Implement webhook handler for payment events
- Add payment status tracking in database

Supports credit cards and digital wallets.

Closes: #456
```

```
🐛 fix(auth): Fix session timeout not clearing cookies

Session expiration now properly clears all auth cookies:
- Clear both access and refresh token cookies
- Redirect to login page on timeout
- Add test coverage for session cleanup

Previously, expired sessions kept cookies causing confusion.
```

```
📝 docs(api): Add OpenAPI specification

Add comprehensive API documentation:
- Create OpenAPI 3.0 spec for all endpoints
- Include request/response examples
- Document authentication requirements
- Add interactive API explorer
```

## Tips

- **Be consistent** - Follow the same pattern for all commits in a project
- **Use the right type** - Don't default to `chore` for everything
- **Be descriptive** - Future you will thank you for clear explanations
- **Link issues** - Reference tickets/issues when applicable
- **Review before committing** - Take a moment to ensure clarity and completeness
