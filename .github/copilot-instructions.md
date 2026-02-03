# Copilot Instructions

Project: **Photography Basics** (Eleventy)

## Structure
- Input content lives in `content/`.
- Layouts are in `content/_layouts/` (e.g., `base.njk`).
- Includes are in `content/_includes/` (e.g., `nav.njk`).
- Site data lives in `content/_data/` (e.g., `site.json`).
- Static images live in `content/img/` and are available at `/img/...` via passthrough.

## Eleventy config
- Config file: `.eleventy.js`.
- Navigation uses `@11ty/eleventy-navigation`.
- A simple `date` filter is defined in `.eleventy.js` (supports `%Y`, `%m`, `%d`).

## Content rules
- Use Markdown for pages in `content/pages/` and the home page `content/index.md`.
- Front matter must use **spaces, not tabs**.
- Navigation metadata uses:
  ```yaml
  eleventyNavigation:
    key: "Page Title"
    order: 1
  ```
- Each page should include `layout: "base"` unless intentionally different.

## Site name
- Update the site title in `content/_data/site.json` (currently "Photography Basics").
