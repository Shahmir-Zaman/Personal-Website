# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Recruiters and hiring managers evaluating Shahmir Zaman for a role. No single market is prioritized — Dubai/UAE, Germany/EU, and remote/global employers are all first-class audiences, so nothing on the site may assume one location's hiring norms or read as market-specific.

**Also served:** Freelance clients and collaborators evaluating him for project work rather than employment.

**Situation:** Visitors arrive from a CV, a LinkedIn post, a job application, or a GitHub profile, and evaluate quickly before deciding whether to start a conversation. Their job is to answer "is this person worth my time?" — some skim, some read deeply, some would rather just ask a question.

## Product Purpose

A personal portfolio site for Shahmir Zaman. It exists to convert a short evaluation visit into contact — an interview, an internship or full-time role, or a freelance engagement. Success is qualified inbound contact through the on-site form, LinkedIn, or email.

## Positioning

**A business + tech hybrid: an engineer who translates technical work into business outcomes and can present it to non-technical decision-makers.**

This is the claim a neighboring portfolio cannot truthfully copy, and it is backed by confirmed facts rather than assertion:

- B.Sc. International Business Information Systems, Furtwangen University (HFU), Germany — a degree at the business/technology intersection, not pure CS.
- The SmartBuild engagement, where the deliverable was a solution presented directly to a CEO and CTO, and where the headline result is stated in euros saved per batch rather than in model accuracy alone.

Model quality and shipped applications are supporting evidence for this position, not the position itself.

## Operating Context

- Single-page, scroll-driven site; all content lives on one route with anchor navigation.
- Visitors self-select their depth: skim the section headers, read a full case study, or ask the embedded AI assistant instead of reading.
- Contact happens through the on-site form (EmailJS), LinkedIn, or GitHub.
- Deployed on Vercel; the AI chat backend is a Vercel serverless function, so the assistant only runs under `vercel dev` locally or on a deployment — not under plain `npm run dev`.

## Capabilities and Constraints

**Confirmed functionality**

- Vite + React 19 + Tailwind v4 single-page application.
- AI chat assistant backed by Google Gemini (`gemini-3.1-flash-lite`) through `api/chat.js`. Scoped strictly to Shahmir's professional background, with prompt-injection resistance, no code generation, and routing of serious hiring conversations to the contact form or LinkedIn. Its knowledge base is assembled from `src/constants/index.js`, so portfolio content changes propagate into what the assistant knows.
- Interactive 3D: a draggable animated avatar and 3D scenes via react-three-fiber, using a dual-canvas architecture (fixed background particles plus a shared `View.Port` that sections portal into).
- Contact form via EmailJS.

**Technical constraints**

- `GEMINI_API_KEY` must stay server-side (no `VITE_` prefix); the key is never exposed to the client.
- The Gemini free tier is a real quota ceiling. `/api/chat` is public and unauthenticated, mitigated by per-IP rate limiting and plain-text-only input validation.
- The model is pinned server-side; the client cannot select or override it.
- Heavy WebGL means device performance and load time are ongoing constraints, particularly on low-end hardware.

**Explicitly undecided**

- Accessibility standard. No specific target has been established, and the motion- and WebGL-heavy design makes reduced-motion support an open question rather than a settled requirement.

## Brand Commitments

- **Name:** Shahmir Zaman.
- **The 3D avatar and AI chat assistant are signature and must be preserved.** Future work may restyle them but may not remove them.
- **Assistant persona:** speaks about Shahmir in the third person and never impersonates him; friendly-professional; declines out-of-scope requests and redirects to his professional background.
- **Not binding:** the current dark/cyber visual identity (black background, cyan accent, Mona Sans) was explicitly *not* marked as a durable commitment. Future visual work is free to replace it, subject to the preserved features above.

## Evidence on Hand

**Live, verifiable projects** — each has both a working deployment and a public repository:

- Notery — https://notery.shahmirzaman.dev · https://github.com/Shahmir-Zaman/Notery
- SumAI — https://sumai.shahmirzaman.dev · https://github.com/Shahmir-Zaman/SumAI
- RoamAura — https://roamaura.shahmirzaman.dev · https://github.com/Shahmir-Zaman/Roamaura

**SmartBuild case study** — the deepest proof asset, with source material in the repo:

- 12 slides at `public/images/projects/smartbuild/slide1–12.jpg`, exported from the original deck.
- Downloadable PDF at `public/files/SmartBuild_Optimization_Case_Study.pdf`.
- Confirmed figures: Linear Regression R² 0.98 with U-shaped residual bias → Polynomial Regression R² > 0.99; defect cost €151,650 → ~€25,130; net saving €126,520 per production batch; XGBoost 73.7% vs Decision Tree 73.0% classification accuracy; unit economics of €150 per faulty product versus €10 to discard bad raw material pre-production.
- Context: a consulting-style engagement presented to SmartBuild's CEO and CTO. **It was team work** — the deck's title slide credits two collaborators alongside Shahmir, so copy must not imply sole authorship.

**Credentials:** B.Sc. International Business Information Systems, Furtwangen University (HFU), Germany.

**Social proof:** LinkedIn (https://www.linkedin.com/in/shahmir-zaman-b90a61217) and GitHub (https://github.com/Shahmir-Zaman).

**Absences future work must not fabricate:**

- Employment history is limited to the confirmed Infinix Innovations role (Dubai, UAE). No other roles exist; do not invent additional history.
- No testimonials, client quotes, or references exist.
- The decorative logo marquee was **removed** in August 2026 precisely because, unlabelled and positioned beneath the skills grid, it read as a roster of employers or clients. Do not reintroduce anonymous third-party logos.
- No performance or usage metrics exist for Notery, SumAI, or RoamAura — only SmartBuild has real numbers.
- No pricing, rates, licensing, or availability terms are established beyond "open to full-time roles and internships."

## Product Principles

1. **Lead with the outcome, support with the technique.** Every technical claim should resolve into something a non-engineer can value. The euros come before the R².
2. **Proof over assertion.** Claims ship with something clickable — a live URL, a public repo, a downloadable deck, a real number. If it cannot be verified, it is not a selling point.
3. **One page, many depths.** A visitor must be able to reach a decision by skimming, by reading deeply, or by asking the assistant. No single path may be the only viable one.
4. **Market-neutral by default.** Dubai, German, global, and freelance visitors all read the same page; avoid copy, currency, or convention that only lands in one market.
5. **Never let a placeholder read as a claim.** Decorative assets and unfinished sections must be visibly provisional rather than quietly implying credentials that do not exist.
