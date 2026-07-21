# Project Rules - Portfolio V1

## Git & Pull Request Conventions
- **PR Titles**: PR titles must strictly follow the Conventional Commits specification (`type(scope): subject` or `type: subject`).
- **No Emojis in PR Titles**: Emojis (Gitmojis) must not be included in Pull Request titles, as they interfere with automated changelog and release tools like `release-please`.
- **Commit Messages**: Commits must comply with the `conventional-commits` skill, maintaining the subject line length strictly under 50 characters, and body line length strictly under 100 characters (ideally under 72 characters) to pass linting checks.
