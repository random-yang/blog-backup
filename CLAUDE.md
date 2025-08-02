# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Preferences

**Language**: Always respond in English when working in this repository, regardless of the language used in questions or comments.

## Project Overview

This is a Hexo static site generator blog backup repository for RandomYang's personal blog. The blog uses the custom "paper" theme and is built with Hexo 3.9.0.

## Development Commands

### Essential Commands
- `npm run server` - Start development server (hexo server)
- `npm run build` - Clean and generate static files (hexo clean && hexo generate)
- `npm run clean` - Clean generated files (hexo clean)
- `npm run deploy` - Deploy to production (hexo deploy)
- `npm run backup` - Backup blog content (hexo backup)

### Direct Hexo Commands
- `hexo new post "Title"` - Create new blog post
- `hexo new draft "Title"` - Create new draft post
- `hexo publish "draft-name"` - Publish draft to posts
- `hexo generate` - Generate static files
- `hexo server` - Start local development server

## Architecture

### Directory Structure
- `source/` - Blog content and assets
  - `_posts/` - Published blog posts (Markdown)
  - `_drafts/` - Draft posts
  - `scaffolds/` - Post templates
- `themes/paper/` - Custom theme files
  - `layout/` - Pug template files
  - `source/css/` - Stylus stylesheets
  - `source/js/` - JavaScript files

### Theme Architecture
The "paper" theme uses:
- **Templates**: Pug templating engine
- **Styles**: Stylus preprocessor with modular includes
- **Structure**: Layout includes in `themes/paper/layout/includes/`
- **Configuration**: Theme config in `themes/paper/_config.yml`

### Content Management
- Posts are written in Markdown with front matter
- Asset folders are enabled (`post_asset_folder: true`)
- Posts support math rendering via MathJax
- Syntax highlighting with highlight.js

### Key Configuration Files
- `_config.yml` - Main Hexo configuration
- `themes/paper/_config.yml` - Theme-specific configuration
- `package.json` - Dependencies and scripts

### Deployment
- Production deploys to GitHub Pages via git deployment
- Backup repository syncs to `random-yang/blog-backup`
- Uses Vercel for hosting (as indicated in README)

## Content Creation Workflow
1. Create draft: `hexo new draft "post-title"`
2. Edit draft in `source/_drafts/`
3. Publish when ready: `hexo publish "post-title"`
4. Generate and test: `npm run build && npm run server`
5. Deploy: `npm run deploy`