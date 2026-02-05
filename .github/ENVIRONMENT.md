# Environment variables for building and deploying

This file explains the environment variables used when building the Eleventy site and how to set them locally or in CI (GitHub Actions).

## Key variables

- `ELEVENTY_PATH_PREFIX` — Controls `pathPrefix` in `.eleventy.js`. Use `/` for a root/custom-domain site, or `/photography-basic-site/` (repo name) for a GitHub project page.
- `ELEVENTY_ENV` — Commonly set to `production` for production builds; used by some templates/plugins to change behavior but it does **not** control the path prefix.

## Examples

### Build for GitHub project pages (Windows PowerShell)

```powershell
# Set variables and build
$env:ELEVENTY_ENV = 'production'
$env:ELEVENTY_PATH_PREFIX = '/photography-basic-site/'
npx eleventy
```

### Notes

- For a custom domain deployment set `ELEVENTY_PATH_PREFIX = '/'` instead.
- The GitHub Actions workflow should set `ELEVENTY_PATH_PREFIX` appropriately when building in CI.

## GitHub Actions

Make sure your workflow sets `ELEVENTY_PATH_PREFIX` appropriately before running Eleventy. Example step:

```yaml
- name: Build Eleventy
  run: ELEVENTY_ENV=production ELEVENTY_PATH_PREFIX=/photography-basic-site/ npx eleventy
```

For a custom domain deployment set `ELEVENTY_PATH_PREFIX=/` instead.

## Quick checklist

- ✅ Use `ELEVENTY_PATH_PREFIX` to control site subdirectory (project pages) or `/` for custom domains
- ✅ Optionally set `ELEVENTY_ENV=production` for production-specific behavior
- ✅ Use `cross-env` for cross-platform npm scripts when possible
- ✅ Test builds locally before pushing

If you'd like, I can also add a simple `build:prod` npm script to `package.json` using `cross-env` and update the Actions workflow to set the repository-specific path prefix.