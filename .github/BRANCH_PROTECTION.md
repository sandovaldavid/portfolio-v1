# Branch Protection Configuration

This guide explains how to set up branch protection rules in GitHub for `main` and `develop`.

## Steps to Configure

1. Go to your GitHub repository
2. Settings → Branches
3. Click "Add rule" under "Branch protection rules"

## Configuration for `main` branch

**Branch name pattern**: `main`

### Protect matching branches

#### Require pull request reviews before merging
- ✅ Enable "Require pull request reviews before merging"
- Require number of reviews: **1**
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require review from code owners
- ✅ Allow specified actors to bypass required pull requests (optional)

#### Require status checks to pass before merging
- ✅ Enable "Require status checks to pass before merging"
- ✅ Require branches to be up to date before merging

**Status checks required**:
- `validate` (from `.github/workflows/validate-pr.yml`)
- `Deploy to Vercel Production` (from `.github/workflows/deploy-production.yml`)

#### Require deployments to succeed before merging
- ✅ Enable "Require deployments to succeed before merging"
- Select required deployment environments: `production`

#### Require up-to-date branches
- ✅ Enable "Require branches to be up to date before merging"

#### Require conversation resolution before merging
- ✅ Enable "Require conversation resolution before merging"

#### Require commits to be signed
- Optional: ✅ Require commits to be signed (if using GPG keys)

#### Restrict who can push to matching branches
- ✅ Enable "Restrict who can push to matching branches"
- Allowed actors: Select only `develop` branch (via GitHub API or through permissions)

#### Include administrators
- ✅ Include administrators (admin bypass disabled)

#### Dismiss stale reviews
- ✅ Dismiss stale pull request approvals when new commits are pushed

#### Require approval of the most recent reviewable push
- ✅ Enable (new reviews required for new commits)

---

## Configuration for `develop` branch

**Branch name pattern**: `develop`

### Protect matching branches

#### Require pull request reviews before merging
- ✅ Enable "Require pull request reviews before merging"
- Require number of reviews: **0** (optional, can be 1 if you prefer)
- ✅ Dismiss stale pull request approvals when new commits are pushed

#### Require status checks to pass before merging
- ✅ Enable "Require status checks to pass before merging"
- ✅ Require branches to be up to date before merging

**Status checks required**:
- `validate` (from `.github/workflows/validate-pr.yml`)
- `Deploy to Vercel Preview` (from `.github/workflows/deploy-preview.yml`)

#### Require conversation resolution before merging
- ✅ Enable "Require conversation resolution before merging" (optional)

#### Allow force pushes
- ❌ Disable "Allow force pushes"

#### Allow deletions
- ❌ Disable "Allow deletions"

#### Include administrators
- ✅ Include administrators (recommended)

---

## Alternative: GitHub CLI Setup

You can also configure branch protection using GitHub CLI:

```bash
# Set up main branch protection
gh repo rule create \
  --branch main \
  --require-pull-request-reviews \
  --require-status-checks validate \
  --require-status-checks "Deploy to Vercel Production" \
  --require-code-owners-review \
  --dismiss-stale-reviews

# Set up develop branch protection
gh repo rule create \
  --branch develop \
  --require-status-checks validate \
  --require-status-checks "Deploy to Vercel Preview" \
  --dismiss-stale-reviews
```

---

## Environment Protection (Vercel)

### Production Environment
1. Go to Settings → Environments
2. Create/select `production` environment
3. Require reviewers: Enable
4. Add deployment branches: Only `main`

### Preview Environment
1. Go to Settings → Environments
2. Create/select `preview` environment
3. Add deployment branches: `develop`, `main` (for PR previews)

---

## Verification Checklist

After setup, verify:
- [ ] `main` branch requires PR from `develop` only
- [ ] `develop` branch accepts PR from any branch
- [ ] All PRs require status checks to pass
- [ ] ESLint, Prettier, and Build checks are configured
- [ ] Deployments happen automatically
- [ ] Force pushes are disabled on `main`
- [ ] Code reviews are required (adjust as needed)
