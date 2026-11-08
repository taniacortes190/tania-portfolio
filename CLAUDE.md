# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Tania Cortés's portfolio: a static, single-page site in plain HTML/CSS/JS. There's no build step, no package manager, no framework and no tests. The site content is in Spanish, and so are the code comments and commit messages.

## Running locally

```bash
node serve.mjs
```

This serves `docs/` at http://localhost:4321. It's a minimal zero-dependency server; `.claude/launch.json` points the preview at it under the name `portafolio`. GitHub Pages publishes `docs/` (which is why `docs/.nojekyll` exists), so anything under `docs/` is live once it's merged into `main`.

## Architecture

Everything lives in three files in `docs/`:

- **`index.html`** has the page sections in order: `.nav`, mobile `.menu`, `.hero#inicio`, `.work#proyectos`, `.services#servicios`, `.about#sobre-mi`, `footer.contact#contacto`, plus an empty `.panel` overlay for case studies.
- **`main.js`** holds all behavior. The important part is the `PROJECTS` object at the top: it's the single source of truth for case studies (title, subtitle, tags, text, gallery). Each project card in the HTML has a `data-project` key that `renderProject()` uses to fill the `.panel` overlay, and the URL hash (`#gud`, `#nodo`, …) opens a project directly. Gallery entries are `[filename, gridClass]` pairs (`g-4`…`g-12` column spans); the special entry `['quote', text]` renders a pull quote instead of an image. Images load from `docs/img/`.
- **`styles.css`** is built up in layers. The first ~370 lines are the base styles; everything after them is a series of later adjustment blocks (palette, gradients, grain, typography, hero background) that override the earlier rules. The same selector often appears more than once (for example, a hero shape is positioned once in the HERO section and again further down), so when you change or remove something, grep for every occurrence of the selector, not just the first.

Design tokens are CSS variables on `:root`: a four-color palette (`--peri`, `--lemon`, `--canta`, `--melon`), aliases mapped onto it (`--blue`, `--lime`, `--pink`), and the fonts Sora (`--sans`) and Playfair Display (`--serif`, used for accents), both loaded from Google Fonts. Decorative hero shapes (`.hero__shapes .shape--*`) follow the pointer through `main.js`; the hero wind-particle canvas and the SVG "brisa" filter respect `prefers-reduced-motion`.

The loose `*.jpg` and `FireShot Capture *.png` files in the repo root are reference material and are gitignored. They aren't part of the site.

## Git workflow

Never commit or push directly to `main`.

1. Create a branch for the change with `git checkout -b <name>` in this folder. Don't create worktrees or copy the project into new folders.
2. Commit on that branch.
3. Push the branch and open a pull request.
4. Merge the PR into `main` only when Tania says so.

Use the GitHub CLI (`gh`, installed with Homebrew and signed in as `taniacortes190`) to create and merge PRs in `taniacortes190/tania-portfolio`. PRs created with `gh pr create` are linked to the Claude session automatically; ones opened another way don't show up there.
