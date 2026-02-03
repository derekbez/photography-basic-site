# Contributing

## Prerequisites
- Node.js and npm

## Install
```bash
npm install
```

## Run locally
```bash
npx eleventy --serve
```
The site will be served at http://localhost:8080/

## Add a new page
1. Create a Markdown file in `content/pages/`.
2. Add front matter:
   ```yaml
   ---
   title: "Your Title"
   order: 8
   layout: "base"
   eleventyNavigation:
     key: "Your Title"
     order: 8
   ---
   ```
3. Use images from `/img/...` (stored in `content/img/`).

## Conventions
- Keep layouts in `content/_layouts/` and includes in `content/_includes/`.
- Use spaces (not tabs) in YAML front matter.
