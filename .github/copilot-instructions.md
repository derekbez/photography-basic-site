# Copilot & Developer Instructions

**Project:** Photography Basics (Eleventy static site)  
**Deployment:** GitHub Pages via GitHub Actions  
**Live Site:** https://derekbezuidenhout.github.io/photography-basic-site/

---

## 🏗️ Project Structure

| Path | Purpose |
|------|---------|
| `content/` | All source content (Markdown pages, layouts, includes, data, images) |
| `content/index.md` | Homepage |
| `content/pages/` | Article/page content files (Markdown format) |
| `content/_layouts/` | Nunjucks layout templates |
| `content/_includes/` | Nunjucks partials (e.g., navigation) |
| `content/_data/` | Global data files (site.json) |
| `content/img/` | Images (copied to `_site/img/` on build) |
| `content/css/` | Stylesheets (copied to `_site/css/` on build) |
| `.eleventy.js` | Eleventy configuration |
| `.github/workflows/deploy.yml` | GitHub Pages deployment automation |

---

## 🔧 Configuration Essentials

### pathPrefix (GitHub Pages)
- Set in `.eleventy.js`: uses environment variable `ELEVENTY_ENV`
- **Local development:** pathPrefix = `/`
- **Production (deployed):** pathPrefix = `/photography-basic-site/`
- Always use the `| url` filter for asset references (images, CSS)

### Custom Filters
- `date` filter: Formats dates using `%Y` (year), `%m` (month), `%d` (day)
- Usage: `{{ date | date: "%Y-%m-%d" }}`

### Navigation
- Uses `@11ty/eleventy-navigation` plugin
- Each page must declare its navigation metadata in front matter:
  ```yaml
  eleventyNavigation:
    key: "Display Name"
    order: 1
  ```

---

## 📝 Content Guidelines

### Creating New Pages
1. Create a `.md` file in `content/pages/`
2. Include required front matter (spaces, not tabs):
   ```yaml
   ---
   title: "Page Title"
   layout: "base"
   order: 5
   eleventyNavigation:
     key: "Page Title"
     order: 5
   ---
   ```
3. Write content in Markdown

### Asset References (Images)
- Store images in `content/img/`
- Always reference using the `| url` filter (needed for pathPrefix):
  ```html
  <img src="{{ '/img/filename.jpg' | url }}" alt="Description" class="img-medium">
  ```
- For CSS background images:
  ```css
  background-image: url("{{ '/img/filename.jpg' | url }}");
  ```
- Never use bare `/img/...` paths; they break on GitHub Pages subdirectory

### Front Matter Rules
- Use **spaces only** (not tabs) in YAML
- Required fields: `title`, `layout`, `eleventyNavigation` (with `key` and `order`)
- The `order` field controls both nav menu position and page grouping

---

## 🚀 Development & Deployment

### Local Development
```bash
# Install dependencies
npm install

# Run dev server (http://localhost:8080/)
npx eleventy --serve

# Build for production
ELEVENTY_ENV=production npx eleventy
```

### Deployment (Automatic)
- Push to `main` branch → GitHub Actions builds and deploys to GitHub Pages
- Workflow: `.github/workflows/deploy.yml`
- Site builds with `ELEVENTY_ENV=production` (applies `/photography-basic-site/` prefix)

### Manual Trigger
- Go to Actions tab → Deploy workflow → "Run workflow" → select `main` branch

---

## 📋 Key Rules for Copilot & Contributors

✅ **DO:**
- Use Markdown (`.md`) for all page content
- Reference images/assets with the `| url` filter
- Maintain consistent front matter (spaces, required fields)
- Keep navigation order (`order` field) unique and ascending per section
- Test locally before pushing (`npx eleventy --serve`)

❌ **DON'T:**
- Use tabs in YAML front matter (causes parse errors)
- Reference assets without the `| url` filter
- Create pages without `eleventyNavigation` metadata
- Hardcode `/photography-basic-site/` paths (use `| url` instead)
- Edit generated files in `_site/` (they're overwritten on build)

---

## 📚 Related Documentation
- [Content Guide](.github/CONTENT-GUIDE.md) — Writing style and best practices
- [Contributing](.github/CONTRIBUTING.md) — Setup and workflow for contributors
- [Eleventy Docs](https://www.11ty.dev/) — Official documentation
