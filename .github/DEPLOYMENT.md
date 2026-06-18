# Deployment Guide

## Branch Strategy

### `main` (Production)
- **Status**: Production environment
- **Host**: Vercel (production)
- **Auto-deploy**: Yes (on push)
- **PR Source**: Only from `develop`
- **Requirements**:
  - All checks must pass (ESLint, Prettier, Build)
  - Commit messages must follow Conventional Commits
  - Code review required (configure in branch protection)

### `develop` (Preview)
- **Status**: Preview/Staging environment
- **Host**: Vercel (preview)
- **Auto-deploy**: Yes (on push)
- **PR Source**: Any branch
- **Requirements**:
  - All checks must pass (ESLint, Prettier, Build)
  - Commit messages must follow Conventional Commits

### Feature branches
- **Naming**: `feat/feature-name`, `fix/bug-name`, etc.
- **PR Target**: `develop`
- **Auto-deploy**: No

## GitHub Actions Workflows

### 1. Validate PR (`.github/workflows/validate-pr.yml`)
**Triggers**: Push to `main`/`develop`, Pull requests to `main`/`develop`

**Runs**:
- ESLint (code quality)
- Prettier (format check)
- Type check (astro check)
- Build verification
- Conventional Commits validation

**Status**: Must pass ✅

### 2. Deploy to Preview (`.github/workflows/deploy-preview.yml`)
**Triggers**: Push to `develop`, PRs to `main`/`develop`

**Runs**:
- All validation checks
- Build
- Deploy to Vercel (preview)
- Comment on PR with preview URL

**Environment**: Vercel Preview

### 3. Deploy to Production (`.github/workflows/deploy-production.yml`)
**Triggers**: Push to `main`

**Runs**:
- All validation checks
- Build
- Deploy to Vercel (production)
- Slack notification (optional)

**Environment**: Vercel Production

## Setup Instructions

### Required Secrets (GitHub Settings → Secrets and variables → Actions)

```
VERCEL_TOKEN          - Personal Vercel API token
VERCEL_ORG_ID         - Vercel organization ID
VERCEL_PROJECT_ID     - Vercel project ID
SLACK_WEBHOOK         - (Optional) Slack webhook URL
```

### Get Vercel Credentials

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. **VERCEL_TOKEN**: Settings → Tokens → Create new → Copy token
3. **VERCEL_ORG_ID**: Go to project → Settings → Team ID
4. **VERCEL_PROJECT_ID**: Go to project → Settings → Project ID

### Branch Protection Rules (GitHub Settings → Branches)

**For `main` branch**:
- ✅ Require status checks to pass
  - `validate (validate)`
- ✅ Require code review
- ✅ Dismiss stale pull request approvals
- ✅ Require branches to be up to date
- ✅ Restrict who can push to main (allow only `develop`)

**For `develop` branch**:
- ✅ Require status checks to pass
  - `validate (validate)`
- Optional: Require code review

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Valid types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style changes
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Tests
- `chore` - Build/CI changes
- `ci` - CI configuration
- `build` - Build system changes
- `deps` - Dependency updates
- `security` - Security fixes
- `hotfix` - Urgent production fixes
- `revert` - Revert a commit

### Examples:
```
feat(i18n): add Spanish language support

fix(button): resolve click handler issue

deps: upgrade TypeScript to 5.9.3

security: patch XSS vulnerability

hotfix: urgent production bug fix
```

## Workflow Status

Check GitHub Actions → Workflows to see:
- PR validation status
- Preview deployment status
- Production deployment status

## Rollback

### To rollback production:
1. Create hotfix branch from `main`
2. Make fixes
3. Merge hotfix to `develop`
4. Merge `develop` to `main`

### Manual rollback:
1. Go to Vercel dashboard
2. Select project
3. Go to Deployments
4. Click "Promote to Production" on previous working deployment

## Troubleshooting

### ESLint fails in CI but passes locally
- Update `eslint.config.js`
- Run `bun run lint:fix` locally
- Commit changes

### Prettier fails in CI but passes locally
- Run `bun run format` locally
- Commit changes
- Push again

### Build fails on CI
- Check logs in GitHub Actions
- Run `bun run build` locally
- Fix issues and commit

### Deployment fails
1. Check GitHub Actions logs
2. Check Vercel deployment logs
3. Verify environment variables are set
4. Verify Bun version compatibility
