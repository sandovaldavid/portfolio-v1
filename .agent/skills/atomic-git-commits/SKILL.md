---
name: atomic-git-commits
description: 'Guide for staging and committing Git changes incrementally. Use when the user requests to commit changes grouped by functionality or purpose rather than staging everything in a single commit, or when making atomic, logical commits in conventional commits format.'
---

# Atomic Git Commits

Atomic commits keep the version control history clean, readable, and easy to roll back by ensuring each commit represents a single logical change (e.g., one bug fix, one feature addition, one style change).

## Commit Workflow

Follow these steps to group and split changes into atomic commits:

### 1. Analyze the Working Tree
List all modified, deleted, and untracked files:
```bash
git status
```

Review the exact modifications to identify distinct logical changes:
```bash
git diff
```

### 2. Group Changes Logically
Categorize modifications into separate, independent goals. Common groupings:
- **`feat`**: Adding a new feature or component.
- **`fix`**: Repairing a bug or regression.
- **`style`**: Adjusting UI styling, spacing, colors, or responsiveness.
- **`refactor`**: Cleaning up code structure without altering behavior.
- **`docs`**: Writing documentation or markdown updates.
- **`chore`**: Modifying build scripts, dependencies, or configuration parameters.

### 3. Stage Incrementally

#### Staging Complete Files
If all changes in a file belong to a single logical group:
```bash
git add path/to/file1.astro path/to/file2.css
```

#### Interactive Hunk Staging (`git add -p`)
If a single file contains changes belonging to *multiple* logical groups (e.g., a stylesheet containing both a navbar fix and a new button style), stage specific blocks of code (hunks) interactively:
```bash
git add -p path/to/file.astro
```
During the prompt, select:
- `y`: Stage this hunk.
- `n`: Do not stage this hunk.
- `s`: Split the current hunk into smaller hunks.
- `q`: Quit interactive mode (saves already staged hunks).

### 4. Review Staged Changes
Always review the staged index before committing to ensure no unrelated modifications are included:
```bash
git diff --cached
```

### 5. Commit Staged Changes
Commit the staged changes using the `conventional-commits` guidelines:
```bash
git commit -m "✨ feat(feature-name): short description" -m "- Detailed bullet point 1\n- Detailed bullet point 2"
```

### 6. Verify and Repeat
Check the status again:
```bash
git status
```
If there are still unstaged modifications, repeat from **Step 2** for the next logical group until the working tree is clean.

## Action Guide: Split Commit Example

### Scenario
You modified `Header.astro` to reorder links, and also added a new `ThemeToggle` feature.

### Execution

1. **Stage the link reordering changes only**:
   ```bash
   git add -p src/widgets/header/ui/Header.astro
   ```
   *(Select `y` only on the hunks containing the link reordering modifications, and `n` on the ThemeToggle hunks).*

2. **Verify staged changes**:
   ```bash
   git diff --cached
   ```

3. **Commit the reorder fix**:
   ```bash
   git commit -m "🐛 fix(header): reorder nav links to match homepage flow"
   ```

4. **Stage the remaining ThemeToggle changes**:
   ```bash
   git add src/widgets/header/ui/Header.astro
   ```

5. **Commit the theme toggle feature**:
   ```bash
   git commit -m "✨ feat(header): add theme toggle button next to links"
   ```

6. **Verify working tree is clean**:
   ```bash
   git status
   ```
