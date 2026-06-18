# GitHub Actions & Vercel Setup Checklist

## ✅ Completed Automatically

- [x] **GitHub Actions Workflows** created and pushed
  - `validate-pr.yml` - Validates all PRs
  - `deploy-preview.yml` - Deploys to Vercel Preview
  - `deploy-production.yml` - Deploys to Vercel Production
  
- [x] **GitHub Secrets Added**
  - `VERCEL_PROJECT_ID` = `prj_O25Gj9BqKwaSH5h8rAqJpJpk4Vj5`
  - `VERCEL_ORG_ID` = `team_Kni208cT03lJVCIgxVKQcVGt`
  
- [x] **Vercel Project Linked**
  - Organization: `devsolution`
  - Project: `portfolio-v1`
  - Configuration file: `.vercel/project.json`
  
- [x] **Code Quality Tools Configured**
  - ESLint (0 errors, 1 warning)
  - Prettier (37 files formatted)
  - Husky (git hooks ready)
  - commitlint (conventional commits validation)

---

## ⚠️ Manual Steps Required

### Step 1: Create VERCEL_TOKEN

1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Configure:
   - **Name**: `GitHub Actions`
   - **Scope**: `Full Account`
   - **Expiration**: 90 days (recommended)
4. Copy the generated token
5. Run in your terminal:
   ```bash
   gh secret set VERCEL_TOKEN
   # Paste the token and press Enter
   ```

**Verify it was added:**
```bash
gh secret list | grep VERCEL
```

### Step 2: Configure Branch Protection Rules

Since your repository is private, you'll need **GitHub Pro** to use API-based branch protection, OR configure manually:

#### Option A: Manual Configuration (Free)

**For `main` branch:**
1. Go to: https://github.com/sandovaldavid/portfolio-v1/settings/branches
2. Click **"Add rule"**
3. Branch name pattern: `main`
4. Configure:
   - ✅ Require a pull request before merging
     - Require 1 approval
     - Dismiss stale pull request approvals
   - ✅ Require status checks to pass before merging
     - Require branches to be up to date
     - Select status check: `validate`
   - ✅ Restrict who can push to matching branches (optional)
   - ✅ Allow force pushes: `Disable`
   - ✅ Allow deletions: `Disable`
   - ✅ Require conversation resolution: `Require`
5. Click **"Create"**

**For `develop` branch:**
1. Click **"Add rule"** again
2. Branch name pattern: `develop`
3. Configure:
   - ✅ Require a pull request before merging (optional)
   - ✅ Require status checks to pass before merging
     - Require branches to be up to date
     - Select status check: `validate`
   - ✅ Allow force pushes: `Disable`
   - ✅ Allow deletions: `Disable`
4. Click **"Create"**

#### Option B: With GitHub Pro

If you have GitHub Pro, the API commands are ready and can be run:
```bash
bash /tmp/branch_protection.sh
```

---

## 🧪 Test the Setup

Once VERCEL_TOKEN is configured:

1. **Create a test branch:**
   ```bash
   git checkout -b test/workflow-validation
   ```

2. **Make a small change:**
   ```bash
   echo "# Test" >> test.txt
   ```

3. **Commit with valid message:**
   ```bash
   git add test.txt
   git commit -m "test: validate ci/cd workflow"
   ```

4. **Push and create PR to develop:**
   ```bash
   git push origin test/workflow-validation
   ```

5. **Watch GitHub Actions run:**
   - Go to: https://github.com/sandovaldavid/portfolio-v1/actions
   - You should see: `Validate PR` workflow running
   - ESLint, Prettier check, and build should all pass
   - Preview deployment should start automatically

6. **Merge to main (when ready):**
   - Create PR from `develop` to `main`
   - Verify all checks pass
   - Merge to trigger production deployment

---

## 📋 Summary

| Component | Status | Details |
|-----------|--------|---------|
| **Vercel Project** | ✅ Linked | Project ID: `prj_O25Gj9BqKwaSH5h8rAqJpJpk4Vj5` |
| **Vercel Org** | ✅ Linked | Org ID: `team_Kni208cT03lJVCIgxVKQcVGt` |
| **Vercel Token** | ⚠️ PENDING | Need to create and add secret |
| **GitHub Secrets** | ✅ Configured | 2/3 secrets added |
| **GitHub Actions** | ✅ Ready | 3 workflows deployed |
| **Branch Protection** | ⚠️ PENDING | Need manual setup (free) or Pro (API) |
| **Code Quality** | ✅ Ready | Linter, formatter, type check configured |

---

## 🚀 Once Everything is Setup

Your CI/CD pipeline will work as follows:

```
Feature Branch (feat/xyz)
    ↓ Create PR to develop
    
GitHub Actions Runs:
├─ ✅ ESLint
├─ ✅ Prettier format check
├─ ✅ Type check (astro check)
├─ ✅ Build
└─ 🚀 Deploy preview to Vercel

Code Review & Merge to develop
    ↓
Develop auto-deploys preview
    ↓
When ready, create PR develop → main
    
GitHub Actions Runs:
├─ ✅ All checks again
├─ 🚀 Deploy production to Vercel
└─ 📧 Slack notification (optional)

Production live at: sandovaldavid.com
```

---

## 🆘 Troubleshooting

### "VERCEL_TOKEN secret not found"
- Add the secret: `gh secret set VERCEL_TOKEN`
- Verify: `gh secret list | grep VERCEL`

### "Preview deployment not showing in PR"
- Check GitHub Actions logs: Actions tab
- Verify VERCEL_TOKEN is set correctly
- Check Vercel dashboard for deployment status

### "Build fails in CI but works locally"
- Run locally: `bun run build`
- Run linter: `bun run lint`
- Run formatter: `bun run format`
- Fix any issues and commit

### "Branch protection rules don't work"
- Repository must be **private** with **GitHub Pro**
- OR set up manually via Settings → Branches

---

## 📖 Additional Resources

- GitHub Actions docs: https://docs.github.com/en/actions
- Vercel deployment: https://vercel.com/docs
- Conventional Commits: https://www.conventionalcommits.org/
- Project docs: `.github/DEPLOYMENT.md` and `.github/BRANCH_PROTECTION.md`
