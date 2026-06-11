# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (run both concurrently)
npm run dev           # Next.js frontend on port 3000
npm run php-server    # PHP API on port 8000 (alias: php -S 127.0.0.1:8000 -t .)

# Build & deploy
npm run build         # Static export → out/
node scripts/zip_deploy.js  # Package out/ into deploy.zip for Apache upload

npm run lint          # ESLint (next lint)
```

**Local API config** — set `api/.env` to use SQLite (zero setup):
```ini
DB_CONNECTION=sqlite
SITE_URL=http://localhost:3000/
```

## Architecture

SuccessWikis is a **hybrid Next.js SPA + PHP backend** optimized for SEO on shared Apache hosting.

### Request flow on production

```
Browser/Crawler → Apache → .htaccess rewrites → index.php
  index.php queries MySQL for OG meta → injects into template.html → returns HTML
  Browser hydrates → client-side routing takes over
  Dynamic interactions (likes, comments, admin) → api/*.php → MySQL
```

`index.php` exists solely to serve pre-populated `<meta>` tags to crawlers that won't execute JavaScript. It reads from MySQL and injects into the static `out/index.html` (renamed `template.html` during deploy packaging).

### Frontend — Next.js App Router (`src/app/`)

The active routing layer. Built with `output: 'export'` → generates `out/` (static HTML/JS/CSS, no Node.js server needed).

- `src/app/layout.jsx` — Root layout with Lenis smooth scroll and global CSS
- `src/app/AppLayoutClient.jsx` — Client shell: Header, Sidebar, MobileNav, Footer, global search. Also validates routes to show correct 404 state. The Sidebar is hidden on pod/blog/success-wire detail pages and admin.
- `src/lib/api.js → getApiBaseUrl()` — Returns `""` on production (same-origin API calls) and `NEXT_PUBLIC_API_URL` on localhost. **Always use this helper for API fetches** rather than hardcoding localhost.

### Content: static vs. dynamic posts

Content comes from two sources that are merged throughout the app:

**Static posts** (hardcoded JSX):
- `src/blogs/` — Blog posts as `.jsx` files + `metadata.js` array
- `src/success-lens/` — Success Wire articles + `metadata.js`
- `src/pod/` — Pod categories (stage-behind-story, founders-unfiltered, driven-by-purpose) + `metadata.js`
- `src/events/` — Events + `metadata.js`

Each metadata array holds `{ id, title, slug, image, metaDescription, ... }` objects used for listing pages, search, and `generateStaticParams()` at build time.

**Dynamic posts** (database-backed):
- Created via `/admin` dashboard, stored in the `posts` table
- Fetched at runtime via `api/posts.php`
- `post_type` values: `blog`, `success_lens`, `event`, `driven_by_purpose`, `founders_unfiltered`, `stage_behind_story`
- `AppLayoutClient` fetches all dynamic posts on mount for global search and route validation

The detail page components (`DynamicBlog`, `DynamicPod`, `DynamicSuccessWire`, `DynamicEvent` in `src/components/`) first check static metadata, then fall back to the API.

### PHP Backend (`api/`)

- `api/db.php` — PDO connection + auto-creates/migrates all tables on every include. Supports both SQLite (local) and MySQL (production) via `api/.env`.
- `api/posts.php` — GET all posts or by slug/type
- `api/like.php` — IP-based like tracking (one like per IP per post)
- `api/comment.php` — Comment CRUD
- `api/login.php` / `api/logout.php` / `api/otp.php` — Admin auth with rate limiting via `login_attempts` table
- `api/featured.php` — "Get Featured" form submissions

CORS headers are handled dynamically in `db.php` based on `HTTP_ORIGIN`.

### Database schema (key tables)

| Table | Purpose |
|---|---|
| `posts` | All content (blogs, pods, events, success wire). Soft-deleted via `deleted_at`. |
| `likes` | IP + post_id composite unique prevents double-likes |
| `comments` | User comments per post |
| `featured_submissions` | "Get Featured" form responses |
| `users` / `user_permissions` | Admin accounts with role-based permissions |

### Deploy packaging

`scripts/zip_deploy.js` assembles `deploy.zip` from `out/` with these critical transformations:
- Renames `out/index.html` → `template.html` (PHP reads this as its HTML shell)
- Excludes physical route directories (e.g., `/blogs/`, `/events/`) to prevent Apache 403 conflicts with the PHP router
- Includes `api/` (minus `database.sqlite`), `index.php`, `.htaccess`

**Do not upload physical Next.js page folders to the server** — `.htaccess` routes everything through `index.php`.

### Legacy code

`src/main.jsx`, `src/App.jsx`, and `src/pages/` are a Vite-era SPA backup. They are not used by the current Next.js build — the `src/app/` App Router is the active frontend.
