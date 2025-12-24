# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Related Repositories

The local folder `./zenon-developer-commons/` contains Zenon documentation and research (gitignored). It is **reference material only** - do not modify it. Card content links to docs in that repo via GitHub URLs.

## Deployment

Hosted on Cloudflare Workers. Configuration in `wrangler.toml`.

```bash
npm run build              # Build static export to ./out
npx wrangler deploy        # Deploy to Cloudflare Workers
```

## Commands

```bash
npm run dev      # Start development server (default port 3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 14 single-page landing site for Zenon Network, featuring snap-scrolling cards that explain Zenon's blockchain architecture.

### Key Components

- **`app/page.tsx`** - Main page with scroll container, keyboard navigation (arrow keys, j/k, Home/End), URL hash-based deep linking, and share functionality
- **`components/Card.tsx`** - Card component with two variants: video (first card with Vimeo embed) and content cards. Uses IntersectionObserver for visibility animations and video pause on scroll
- **`components/DotNav.tsx`** - Left-side navigation dots with progress indicator, hidden on mobile
- **`content/cards.ts`** - Card content data (12 cards) and external URL constants for repo/GitBook links

### Design System

Zenon theme colors defined in `tailwind.config.ts`:
- Background: `#000001`
- Card background: `#0d1117`
- Primary accent: `#7fff00` (lime green)
- Use `zenon-*` Tailwind classes (e.g., `bg-zenon-bg`, `text-zenon-green`)

### Scroll Behavior

- CSS snap scrolling with `scroll-snap-type: y mandatory`
- Each card is a full-viewport section (`100vh`)
- Mobile shows a thin progress bar on left instead of dots

### Content Management

Edit card content in `content/cards.ts`. Planning document at `card-map.md`. Each card has: id, title, subtitle, description, keyPoints, repoPath, gitbookPath, and optional videoEmbed/bgColor.
