Love this step—you’re basically wiring your little static machine into an automatic “build & publish” pipeline. Let’s treat this like a mini deployment lesson, not just a checklist.

I’ll assume your Eleventy project is in `PhotoBlogWebsite` and already pushed to `derekbez/photography-basic-site`.

---

### 1. What GitHub Pages + Actions will actually do

Conceptually:

- Your repo holds **source** (Markdown, layouts, config).
- GitHub Actions runs on every push to `main`/`master`:
  - installs Node
  - runs Eleventy to build into `_site`
  - publishes `_site` to GitHub Pages
- GitHub Pages serves the built site at a URL.

So you never upload `_site` yourself—GitHub builds it.

---

### 2. Make sure your project builds locally with one command

From `D:\dev\PhotoBlogWebsite`:

```powershell
npx eleventy
```

If that creates `_site` without errors, we’re good.

Optional (nice to have): add a script in `package.json`:

```json
"scripts": {
  "build": "eleventy"
}
```

Then you can run (PowerShell):

```powershell
npm run build
```

---

### 3. Add the GitHub Actions workflow file

In your project, create:

```text
.github/workflows/deploy.yml
```

If `.github` or `workflows` don’t exist yet, create the folders.

Put this inside `deploy.yml`:

```yaml
name: Deploy Eleventy site to GitHub Pages

on:
  push:
    branches: [ "main", "master" ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build Eleventy
        # Build for a custom domain (root path). For project pages use ELEVENTY_PATH_PREFIX=/your-repo-name/ instead.
        run: ELEVENTY_ENV=production ELEVENTY_PATH_PREFIX=/ npx eleventy

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Key ideas here:

- `on.push.branches` includes both `main` and `master` so you’re covered.
- It builds `_site` and uploads that as the artifact GitHub Pages serves.

---

### 4. Commit and push the workflow

From `PhotoBlogWebsite`:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

Then go to your repo on GitHub → **Actions** tab.

You should see a workflow run called “Deploy Eleventy site to GitHub Pages”.  
Let it finish—green checkmark is what we want.

---

### 5. Enable GitHub Pages in repo settings

On GitHub:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, choose:
   - **Source: GitHub Actions** (not “Deploy from a branch”).
3. After the first successful run, GitHub will show a URL. For a project page it looks like:

```text
https://derekbez.github.io/photography-basic-site/
```

For a custom domain it will be your domain, e.g.:

```text
https://www.derekbez.co.uk/
```

Note: Use `ELEVENTY_PATH_PREFIX=/` for custom domains or `ELEVENTY_PATH_PREFIX=/your-repo-name/` for project pages.

At this point, you’ve got a full CI/CD loop:

- Edit locally
- `git commit` + `git push`
- GitHub builds and deploys automatically

---

### 6. Custom domain (without touching the rest of your GitHub)

Later, when you’re ready:

1. In **Settings → Pages**, under **Custom domain**, enter something like:

   ```text
   photography.be-easy.com
   ```

2. At your domain registrar, add a **CNAME**:

   ```text
   photography.be-easy.com → derekbez.github.io
   ```

3. Back in GitHub Pages, tick **Enforce HTTPS** once it’s available.

This only affects that subdomain; your other repos and any other GitHub Pages sites stay untouched.

---

If you tell me:

- whether your default branch is `main` or `master`, and  
- what URL GitHub Pages shows after the first deploy,

I can help you sanity‑check everything and then we can wire up the custom domain cleanly.