# Content Guide

## Front Matter Template
```yaml
---
title: "Page Title"
order: 1
layout: "base"
eleventyNavigation:
  key: "Page Title"
  order: 1
---
```

**Important:** Use **spaces only** in YAML (no tabs).

## Images

### Storage
- All image files go in `content/img/`
- Images are automatically copied to the output as `/img/...`

### Referencing Images
Always use the `| url` filter when referencing images. This is essential for the site to work correctly on GitHub Pages (which serves from a subdirectory).

**HTML images:**
```html
<img src="{{ '/img/filename.jpg' | url }}" alt="Description" class="img-medium">
```

**Markdown images:**
```markdown
![Alt text]({{ '/img/filename.jpg' | url }})
```

**CSS background images:**
```css
background-image: url("{{ '/img/filename.jpg' | url }}");
```

### Image Classes
- `img-small` — Smaller inline images
- `img-medium` — Default article images
- `img-larger` — Full-width featured images
- `float-left` / `float-right` — Text wrapping modifiers
- `hero` — Full-width page header images

## Writing Style
- Keep headings concise and descriptive
- Use short paragraphs for readability
- Break content into clear sections with subheadings
- Use lists (bullets or numbered) to organize information
- Link to related pages when relevant

## Common Patterns

### Article with featured image
```markdown
---
title: "Article Title"
layout: "base"
order: 3
eleventyNavigation:
  key: "Article Title"
  order: 3
---

<img src="{{ '/img/hero-image.jpg' | url }}" alt="Description" class="hero">

## Introduction

Your opening paragraph here...
```

### Article with inline images
```markdown
<img src="{{ '/img/inline-image.jpg' | url }}" alt="Description" class="img-medium float-right">

Text flows around the floated image...
```

---

**For setup and contribution workflows, see [CONTRIBUTING.md](./CONTRIBUTING.md)**
