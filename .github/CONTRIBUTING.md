# Contributing Guide

## Quick Start

### Prerequisites
- Node.js 20+ and npm
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/derekbezuidenhout/photography-basic-site.git
cd photography-basic-site

# Install dependencies
npm install
```

### Local Development
```bash
# Start the dev server
npx eleventy --serve

# Site will be at http://localhost:8080/
```

The development server rebuilds automatically when you save changes.

---

## Creating Content

### Add a New Page
1. Create a Markdown file in `content/pages/`
2. Add required front matter:
   ```yaml
   ---
   title: "Your Page Title"
   layout: "base"
   order: 8
   eleventyNavigation:
     key: "Your Page Title"
     order: 8
   ---
   ```
3. Write your content in Markdown

### Using Images
1. Place image files in `content/img/`
2. Reference them with the `| url` filter:
   ```html
   <img src="{{ '/img/filename.jpg' | url }}" alt="Description" class="img-medium">
   ```

**Important:** Never use bare paths like `/img/filename.jpg`. The `| url` filter is required for the site to work correctly on GitHub Pages.

---

## Code Style & Standards

### Front Matter
- Use **spaces only** (not tabs) in YAML
- Required fields: `title`, `layout`, `eleventyNavigation` (with `key` and `order`)
- Keep `order` values unique and sequential within the navigation

### Markdown
- Use clear headings (h2-h4)
- Keep paragraphs short
- Use lists for organized information

### Assets
- Keep images in `content/img/` only
- Optimize images before adding (aim for <500KB per file for photos)
- Use descriptive alt text for accessibility

---

## Testing Before Push

Always test locally before committing:

```bash
# Clear build cache
rm -rf _site

# Build for production
ELEVENTY_ENV=production npx eleventy

# Check the output
# Open _site/index.html in your browser or use a local server
```

This ensures the `pathPrefix` works correctly and all assets resolve properly.

---

## Deployment

### Automatic Deployment
1. Push changes to the `main` branch
2. GitHub Actions automatically:
   - Installs dependencies
   - Builds with `ELEVENTY_ENV=production` (applies pathPrefix)
   - Deploys to GitHub Pages
3. Site goes live at https://derekbezuidenhout.github.io/photography-basic-site/

### Manual Trigger (if needed)
- Go to the **Actions** tab
- Select **Deploy Eleventy** workflow
- Click **Run workflow** and select `main` branch

### Deploy Workflow
- **File:** `.github/workflows/deploy.yml`
- **Trigger:** Push to `main` or manual dispatch
- **Environment:** `ELEVENTY_ENV=production`
- **Output:** Deployed to GitHub Pages

---

## File Structure Best Practices

```
content/
├── index.md                 # Homepage
├── pages/
│   ├── page-one.md
│   ├── page-two.md
│   └── ...
├── _layouts/
│   └── base.njk            # Main layout (don't edit unless needed)
├── _includes/
│   └── nav.njk             # Navigation partial (don't edit unless needed)
├── _data/
│   └── site.json           # Site metadata (name, etc.)
├── img/
│   └── [image files]       # All images go here
└── css/
    └── styles.css          # Stylesheets
```

**Do not edit files in `_site/`** — they're generated on each build.

---

## Conventions

✅ **DO:**
- Use Markdown for all pages
- Always use `{{ ... | url }}` filter for image/asset paths
- Keep front matter consistent (spaces, not tabs)
- Test locally before pushing
- Use descriptive commit messages

❌ **DON'T:**
- Use tabs in YAML front matter
- Reference assets without the `| url` filter
- Create pages without `eleventyNavigation` metadata
- Hardcode `/photography-basic-site/` in paths
- Manually edit or commit the `_site/` directory

---

## Questions or Issues?

Refer to:
- [Copilot Instructions](./copilot-instructions.md) — Technical reference for AI agents
- [Content Guide](./CONTENT-GUIDE.md) — Writing and style guidelines
- [Eleventy Documentation](https://www.11ty.dev/) — Official framework docs
