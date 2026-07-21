# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint over the whole project

There is no test suite/framework configured in this repo.

The AI chat backend (`api/chat.js`) is a Vercel serverless function and only runs under `vercel dev`, not under plain `npm run dev` — the client will fail to reach `/api/chat` unless served through the Vercel CLI or deployed on Vercel. It requires a `GEMINI_API_KEY` environment variable (no `VITE_` prefix, since it must stay server-side); a local `.env` already exists for this.

## Architecture

This is a single-page portfolio site built with Vite + React 19 + Tailwind v4 (via `@tailwindcss/vite`). The `@` import alias resolves to `src/` (configured in `vite.config.js`).

**Page composition**: `src/App.jsx` renders the page as a fixed sequence of section components from `src/sections/` (Hero, TechStack, Experience, ShowcaseSection, MLCaseStudy, FeatureCards, LogoSection, Contact, Footer). Most section content (nav links, skills/abilities, experience cards, logos, etc.) is data-driven from `src/constants/index.js` rather than hardcoded per-component.

**Dual-canvas 3D layering**: The app uses two separate `@react-three/fiber` `<Canvas>` elements stacked via z-index, not one:
- A fixed background `Canvas` (z-0) in `App.jsx` renders ambient `Particles`.
- A fixed foreground `Canvas` (z-20) in `App.jsx` renders `<View.Port />` from `@react-three/drei`. Individual sections (e.g. Hero, Contact) declare their own `<View>` regions that portal into this shared canvas, letting 3D content (avatar, room, computer models) appear to sit "inside" the normal DOM flow while actually being rendered by one shared WebGL context. When adding new 3D content to a section, follow this `View`-portal pattern rather than mounting a new top-level `Canvas`.

3D model components live under `src/components/Models/` (`HeroModels/`, `contact/`, `TechLogos/`). Animation is handled with GSAP via `@gsap/react`'s `useGSAP` hook; `ScrollTrigger` is registered in `Hero.jsx`.

**AI chat assistant**: A floating draggable avatar (`AvatarWidget.jsx`) opens a chat UI (`ChatPanel.jsx`) backed by Google Gemini:
- `src/lib/geminiService.js` — client-side fetch wrapper that POSTs to `/api/chat` and keeps an in-memory conversation history.
- `api/chat.js` — Vercel serverless function; instantiates `@google/generative-ai`, builds a system prompt, and calls `gemini-1.5-flash`.
- `src/lib/shahmirProfile.js` — assembles the system prompt's knowledge base (bio, skills, projects, contact, FAQ) by reading from `src/constants/index.js`, so portfolio content changes there automatically propagate into what the assistant knows.
- The assistant's replies can embed `[BUTTON: Label]` markers; `ChatPanel.jsx` parses these out of the markdown response and renders them as clickable action buttons (e.g. a "Contact Me" button that scrolls to `#contact`).

**Styling utilities**: `src/lib/utils.js` exports `cn()` (clsx + tailwind-merge) used throughout, including by the shadcn-style `src/components/ui/button.jsx` (built on `class-variance-authority` + `@radix-ui/react-slot`).

**Build config**: `vite.config.js` manually splits vendor chunks (`react`/`react-dom`, `three` + fiber/drei, `gsap`, `@splinetool/react-spline`) and minifies with Terser, dropping `console`/`debugger` statements in production builds.

## Agent behavioral rules

`.agents/AGENTS.md` already defines repo-specific agent rules — check it too:
- Automatically look through available skills for whichever best matches the current prompt and use it.
- For any new feature or new project, use the `brainstorming` skill before implementation.
