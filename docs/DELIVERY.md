# Branch, release and deployment policy

The portfolio uses trunk-based development. `main` is the authoritative default branch, the production branch and the source used by scheduled audits.

## Branch model

- Create short-lived `feat/`, `fix/`, `docs/`, `refactor/`, `perf/`, `test/`, `chore/`, `ci/`, `deps/` or `security/` branches from the current `main`.
- Open every ordinary pull request into `main`.
- Keep one coherent concern per pull request.
- Use squash merge so the validated Conventional Commit PR title becomes the single integration commit.
- Delete the source branch after merge.
- Do not maintain a permanent `develop` branch. Pull-request previews provide the staging environment required by this static portfolio.

A long-lived staging branch may be reintroduced only through an ADR that identifies an actual environment, owner, promotion policy and rollback responsibility.

## Preview deployments

`Deploy to Vercel Preview` runs only for pull requests targeting `main`.

The workflow:

1. checks out the exact pull-request head SHA;
2. creates a transient GitHub `Preview` deployment for that SHA;
3. pulls the Vercel preview environment;
4. builds and deploys without production flags;
5. updates one stable pull-request comment with the preview URL and source SHA.

Pushes to branches do not create standalone preview deployments. Dependabot pull requests are skipped because repository secrets are not exposed to them.

## Production deployments

`main` is the only production source.

A normal production deployment starts only after `Main Quality` completes successfully for a push to `main`. The deployment workflow checks out and verifies the exact validated SHA before running the Vercel production build and deployment.

Two explicit exceptions rebuild the current tip of `main`:

- `resume-assets-updated`, which refreshes canonical CV files from `resume-assets`;
- a maintainer-initiated `workflow_dispatch` recovery deployment.

No pull-request, feature-branch or failed-quality SHA can enter the normal production path.

## Release policy

This repository is a private package and a public website, not a published npm library. Automatic Release Please pull requests and recurring beta tags add maintenance noise without improving deployment safety.

- Production deploys are independent from GitHub Releases.
- Create a Git tag and GitHub Release manually only for a meaningful public milestone.
- Use stable semantic versions such as `v2.0.0`; do not create routine beta tags for ordinary portfolio updates.
- Keep `CHANGELOG.md` as historical release context, but pull-request descriptions and Git history remain the operational change record.
- Historical `porfolio-dev-*` and beta tags are immutable history and are not renamed.

## Repository settings contract

After the migration pull request is merged, verify these GitHub settings:

1. set `main` as the default branch;
2. require pull requests and the checks documented in [CI.md](CI.md);
3. require the branch to be up to date before merge;
4. allow squash merge only;
5. enable automatic branch deletion;
6. disable direct pushes and force pushes to `main`;
7. delete `develop` after confirming it has no unique commits or open pull requests.

These settings live in GitHub rather than the repository tree. Record any intentional deviation in this document.

## Rollback

For a faulty integration, revert the squash commit on `main` through a pull request. The revert receives the same critical checks and preview deployment as any other change. Avoid rewriting branch history.
