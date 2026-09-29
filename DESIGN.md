---
name: Shahmir Zaman Portfolio
description: A living portfolio — glass panels over void, lit by a single beacon-blue signal.
colors:
  beacon-blue: "#62e0ff"
  soft-cyan: "#a0d8ef"
  void-black: "#000000"
  surface-deep: "#0e0e10"
  surface-raised: "#282732"
  field-slate: "#2d2d38"
  hairline: "#1c1c21"
  starlight: "#d9ecff"
  muted-steel: "#839cb5"
  control-dark: "oklch(0.21 0.006 285.885)"
  control-foreground: "oklch(0.985 0 0)"
  aurora-blue: "#52aeff"
  aurora-coral: "#fd5c79"
  aurora-violet: "#6d45ce"
  impact-green: "#22c55e"
  signal-error: "#fd5c79"
typography:
  display:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "60px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "normal"
  body-compact:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Mona Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  tail: "4px"
  control: "6px"
  action: "8px"
  card: "12px"
  panel: "16px"
  overlay: "20px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "20px"
  lg: "40px"
  gutter: "20px"
  gutter-lg: "80px"
  section: "80px"
  section-lg: "160px"
components:
  button-animated:
    backgroundColor: "{colors.control-dark}"
    textColor: "{colors.control-foreground}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
    height: "36px"
  button-animated-hover:
    backgroundColor: "#ffffff"
    textColor: "#000000"
  cta-button:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.void-black}"
    rounded: "{rounded.action}"
    padding: "16px 16px"
  nav-contact-button:
    backgroundColor: "#ffffff"
    textColor: "{colors.void-black}"
    rounded: "{rounded.action}"
    padding: "8px 20px"
  card-base:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.card}"
    padding: "32px"
  glass-panel:
    backgroundColor: "rgba(40, 39, 50, 0.4)"
    textColor: "{colors.starlight}"
    rounded: "{rounded.panel}"
    padding: "40px"
  input-field:
    backgroundColor: "{colors.field-slate}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.control}"
    padding: "16px"
  badge-pill:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  tab:
    textColor: "{colors.muted-steel}"
    typography: "{typography.label}"
  tab-active:
    textColor: "{colors.beacon-blue}"
    typography: "{typography.label}"
  chat-bubble-bot:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.starlight}"
    padding: "12px 16px"
  chat-bubble-user:
    backgroundColor: "rgba(98, 224, 255, 0.1)"
    textColor: "{colors.starlight}"
    padding: "12px 16px"
---

# Design System: Shahmir Zaman Portfolio

## Overview

**Creative North Star: "The Living Portfolio"**

This is not a document about a person — it is a system that is awake while you read it. Particles drift behind the content, a marquee never stops, an avatar breathes and turns to watch your cursor, and glows pulse on a two-and-a-half-second cycle whether or not anyone is looking. Motion here is not decoration; it is the proof of craft that the copy is claiming. A static screenshot of this site is a lie about what it is.

The personality is **energetic, playful, and personable** — but the energy is carried by *behavior*, not by visual noise. The palette is disciplined to the point of austerity: a black void, four grays, one pale text color, and a single cyan that earns its brightness by meaning something every time it appears. All the warmth comes from things that move and respond — the avatar's wave, the shine that sweeps across the contact button, the circle that expands out of a CTA. This split is the system's central bargain, and it is what lets a portfolio with a cartoon 3D avatar still carry a case study presented to a CEO.

Surfaces are glass suspended over that void: translucent, blurred, edged with a hairline that brightens when you approach. Nothing is opaque and nothing is flat. Depth is built from black shadow and backdrop blur; life is signalled with cyan light — and the system never confuses the two jobs.

**Key Characteristics:**
- One accent color, used only where something is alive or interactive
- Glass surfaces over a true-black void; no opaque cards
- Every interactive surface answers the cursor before it is clicked
- A single typeface (Mona Sans) carrying the entire hierarchy through weight
- Ambient motion at rest: pulse, drift, marquee, float
- Evidence-forward: real numbers get their own color and their own frame

## Colors

A near-monochrome dark system where a single cyan does all the signalling, and a four-stop aurora gradient appears only as light along an edge.

### Primary
- **Beacon Blue** (`#62e0ff`): The signature. It marks the active tab, the focused input, the live-status dot, the avatar's pulse, every link inside the assistant, and the accent bar on a metric card. It is the color of *something is happening here*. It never appears as a large fill — only as text, hairline, dot, underline, or glow.
- **Soft Cyan** (`#a0d8ef`): Beacon Blue at rest. Used for emphasis text, tertiary headings inside the chat, and quiet secondary labels where full Beacon would over-signal.

### Secondary
- **Aurora Blue** (`#52aeff`), **Aurora Coral** (`#fd5c79`), **Aurora Violet** (`#6d45ce`): These exist only as stops in the aurora gradient, never as standalone colors. Together with Beacon Blue they form the spectrum that runs down timeline spines and across section separators — the one place the system permits itself full color.

### Tertiary
- **Impact Green** (`#22c55e`): Reserved exclusively for quantified business outcomes — the €126,520 net-savings metric and nothing else. Its scarcity is the entire reason it lands.
- **Signal Error** (`#fd5c79`): The system's only destructive colour, sharing Aurora Coral's hex. This is the single sanctioned exception to The One Aurora Rule: a failed form submission needs a warm signal, and inventing a second red would add a hue the system does not otherwise own. Used as text and hairline on a translucent tint — never as a fill.

### Neutral
- **Void Black** (`#000000`): The page itself. Not a dark gray — true black, so glass and glow have something absolute to sit against.
- **Surface Deep** (`#0e0e10`): Standard card fill. The base of the card-border pattern and the glass panels' opaque cousin.
- **Surface Raised** (`#282732`): Elevated fill for badges, pills, and CTA buttons; at 40% opacity it becomes the glass panel background.
- **Field Slate** (`#2d2d38`): Form input backgrounds only.
- **Hairline** (`#1c1c21`): The default 1px border on cards, social icons, and timeline logos.
- **Starlight** (`#d9ecff`): Body text. Deliberately a pale blue-white rather than pure white — it keeps long copy from vibrating against black and ties the text back to the accent family.
- **Muted Steel** (`#839cb5`): Secondary text, inactive tabs, placeholders, and captions.
- **Control Dark** (`oklch(0.21 0.006 285.885)`) / **Control Foreground** (`oklch(0.985 0 0)`): The shadcn control pair backing the Button primitive. Kept in OKLCH because that is where the project defines them.

### Named Rules

**The Beacon Rule.** Beacon Blue marks only what is live, active, or interactive. If something glows cyan, it must respond to the visitor. Decorative cyan is forbidden.

**The One Aurora Rule.** The four-stop aurora gradient appears as *light along an edge* — a 2px spine, a 3px separator, a tab underline. Never as a background fill, never behind text, never on a large surface.

**The Green Means Money Rule.** Impact Green appears at most once per screen, and only on a quantified business result. It is the only color permitted to out-shout Beacon Blue, and only because it is rarer.

## Typography

**Display Font:** Mona Sans (fallback `sans-serif`)
**Body Font:** Mona Sans (fallback `sans-serif`)
**Label/Mono Font:** system monospace stack (`ui-monospace, SFMono-Regular, Menlo`)

**Character:** One variable family carries everything from 200 to 900. Mona Sans is geometric enough to read as engineered and humanist enough to stay friendly — exactly the business/technical split the portfolio is arguing. Hierarchy is built from weight and scale alone; a second display face would break the system's discipline. Monospace appears only where the content is genuinely machine-flavored: slide counters, step markers, code inside the assistant.

### Hierarchy
- **Display** (600, 60px desktop / 30px mobile, 1.1): The hero headline and its animated word-slider. One per page.
- **Headline** (600, 48px / 30px mobile, 1.15): Section titles rendered through `TitleHeader`, always centered, always paired with a pill badge above.
- **Title** (700, 30px / 24px mobile, 1.25): Card headings — role names, project names, case-study beats.
- **Body** (300–400, 18px / 16px mobile, 1.6): All prose, in Starlight. Light weight at large sizes, normal at small. Keep measure to 65–75 characters.
- **Label** (600, 12px, 0.1em tracking, uppercase): Tab labels, eyebrow text, metric captions. Uppercase is *only* permitted at this size.
- **Mono** (400, 12px, 0.05em): Slide counters, step markers (`01 — The Physics of Prediction`), inline code.

### Named Rules

**The One Voice Rule.** Mona Sans is the only typeface. Hierarchy comes from weight and scale, never from introducing a second family.

**The Label Whisper Rule.** Uppercase with widest tracking belongs to labels at 12px and below. Never uppercase a heading — at display sizes it reads as shouting, which is the opposite of this system's confidence.

## Layout

A single scrolling column of full-width sections over two fixed 3D canvases. There is no persistent chrome except the navbar and the floating avatar.

**Container and gutters.** Content is padded `20px` on mobile and `80px` (`px-5 md:px-20`) from `md` up. Inner content caps at `max-w-6xl` for wide panels, `max-w-4xl` for single-card sections, and `max-w-3xl` for prose blocks — prose never runs the full 6xl width.

**Vertical rhythm.** Sections are separated by `160px` on desktop and `80px` on mobile (`md:mt-40 mt-20`). Inside a section: `64px` from title to content, `40px` between major blocks, `16–20px` within a block. This large-gap rhythm is what keeps a dark page from feeling cramped.

**Grids.** Feature cards use 1 → 2 → 3 columns (`grid-3-cols`); the tech grid runs 1 → 3 → 5; two-column split layouts (story + evidence) collapse from `lg` down. Project showcase splits 60/40 on `xl` and stacks below.

**Breakpoints.** Tailwind defaults — `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536. The system leans almost entirely on `md` (phone → tablet) and `xl` (tablet → desktop); `sm` and `2xl` are rarely used.

**Z-index bands.** Background canvas `0`, content `10`, foreground 3D View.Port `20`, navbar `100`, avatar widget `999`, chat overlay `10000`. Anything new must declare which band it belongs to.

### Named Rules

**The Breathing Room Rule.** 160px between sections on desktop, 80px on mobile. Content density is never solved by shrinking that gap.

**The Two Canvas Rule.** 3D content mounts into the existing shared `View.Port` (z-20) or the background canvas (z-0). A new top-level `<Canvas>` is never introduced — it would spawn a second WebGL context and break the layering contract.

## Elevation & Depth

**Glass over void, glow for life.** This system runs two entirely separate depth vocabularies and never lets them do each other's job.

**Black shadow + backdrop blur builds physical depth.** Surfaces are translucent panels floating above a true-black page, with `backdrop-filter: blur()` from 2px (subtle content panels) to 24px (the chat panel), a 1px translucent border, and a large soft black shadow beneath. Many panels also carry an inset white hairline at 3–5% opacity, which reads as light catching a glass edge.

**Cyan glow signals state, never elevation.** A glow means live, active, focused, or hovered — never "higher up." The avatar's ambient pulse, the active tab's underline bloom, the focus ring on an input, the node dots on a timeline: all state, none of it elevation.

### Shadow Vocabulary
- **Panel rest** (`box-shadow: 0 0 0 1px rgba(255,255,255,0.03) inset, 0 20px 50px rgba(0,0,0,0.3)`): Standard glass card at rest.
- **Panel hover** (`box-shadow: 0 0 0 1px rgba(255,255,255,0.05) inset, 0 20px 50px rgba(0,0,0,0.3), 0 0 40px rgba(98,224,255,0.08)`): Adds a wide, very low-opacity cyan bloom. Depth unchanged; only the life signal is added.
- **Overlay** (`box-shadow: 0 0 40px rgba(98,224,255,0.08), 0 24px 48px rgba(0,0,0,0.5)`): The chat panel and other true overlays.
- **Floating menu** (`box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(98,224,255,0.06)`): Nav submenus and small popovers.
- **Media well** (`box-shadow: 0 20px 40px rgba(0,0,0,0.6)`): Image and slide viewers — deepest shadow in the system, no glow.
- **Beacon pulse** (`drop-shadow(0 0 8px → 20px rgba(98,224,255,0.3 → 0.6))`, 2.5s loop): Ambient life on the avatar. The only *animated* shadow.

### Named Rules

**The Two Vocabularies Rule.** Black shadow raises a surface; cyan glow animates it. A panel never glows to look higher, and never shadows to look alive.

**The Glass Needs Void Rule.** `backdrop-filter` only reads correctly over the black page or the 3D canvas. Never stack a glass panel directly on another glass panel — the second blur has nothing to reveal and the edges turn to mud.

## Shapes

Radius scales with surface size, producing a consistent ladder from tight controls to soft overlays: `6px` for inputs and buttons, `8px` for primary actions and CTAs, `12px` for cards, images, and social icons, `16px` for large content panels, `20px` for the chat overlay, and fully round for badges, status dots, avatars, and timeline logos.

Borders are always `1px` and almost always translucent — `#1c1c21` on solid cards, `rgba(255,255,255,0.06–0.10)` on glass, and `rgba(98,224,255,0.10–0.25)` when a surface is meant to read as alive. The border is the primary hover affordance across the system: it brightens toward Beacon Blue before anything else changes.

Two recurring silhouettes define the form language: the **pill** (fully-round badges carrying section eyebrows and metadata) and the **spine** (a 2px vertical or 3px horizontal aurora gradient line used to structure timelines and separate sections).

### Named Rules

**The Radius Ladder Rule.** Radius follows surface size — 6px controls, 8px actions, 12px cards, 16–20px panels, full for pills and dots. A 12px card never sits inside a 6px container.

**The Tail Rule.** Chat bubbles break exactly one corner down to `4px` to point back at their speaker (bot: top-left, user: top-right). This is the system's only sanctioned radius asymmetry.

## Components

### Buttons
- **Shape:** Tight corners (`6px`), 36px tall at default, 32px small, 40px large.
- **Animated (primary):** Near-black fill (Control Dark) with near-white text; on hover it inverts to a white fill with black text, scales to `1.05`, and gains a lifted shadow over `300ms ease-in-out`. Used for View Live / View Code on project cards.
- **Animated Outline:** Same motion, transparent fill with a 1px border until hover.
- **CTA Button (signature):** A Surface Raised pill containing a white circle that expands from the right edge to fill the button on hover, while uppercase black text slides left and an arrow rises into place. `500ms`. This is the most expressive control in the system and belongs to primary conversion moments only.
- **Nav Contact Button:** White fill, black text, `8px` radius, with a translucent white gradient that sweeps left-to-right across the surface on hover.

### Cards / Containers
- **Corner Style:** `12px` for standard cards, `16px` for large content panels.
- **Background:** Surface Deep for solid cards; `rgba(40,39,50,0.4)` plus `blur(8px)` for glass panels.
- **Border:** 1px Hairline on solid cards; `rgba(98,224,255,0.1)` on glass, brightening to `0.25` on hover.
- **Shadow Strategy:** Panel rest → Panel hover (see Elevation). Feature cards instead scale to `1.05` on hover.
- **Internal Padding:** `32px` standard, `40px` on large panels, `20px` on compact metric tiles.
- **Animated Border Card:** A conic-gradient border that sweeps around the perimeter on hover, driven by a `--start` custom property. Reserved for the ability/feature grid.

### Inputs / Fields
- **Style:** Field Slate fill, no visible border at rest, `6px` radius, generous `16px` padding on all sides, Muted Steel placeholder.
- **Focus:** Border shifts to `rgba(98,224,255,0.3)` with a 3px `rgba(98,224,255,0.08)` ring. Focus is always cyan — never a browser default outline.
- **Labels:** Block-level, Starlight, `8px` below.

### Navigation
- **Style:** Fixed full-width bar, transparent and inset `40px` from the top at rest; on scroll it snaps to the top edge and fills solid black over `300ms`.
- **Links:** Starlight, brightening to pure white on hover, with a white underline that grows from 0 to full width.
- **Submenus:** Glass popover — `rgba(14,14,16,0.9)` with `blur(20px)`, cyan hairline, `12px` radius, rising `8px` into place over `250ms`. Includes an invisible bridge element so the cursor can cross the gap without losing hover.
- **Mobile:** Desktop nav hides below `lg`.

### Tabs
- Uppercase Label type in Muted Steel, brightening to Starlight on hover and Beacon Blue when active, with a cyan `drop-shadow`. The active tab grows a 2px aurora underline that scales from the center over `500ms` and carries its own glow.

### The Assistant Panel (signature)
A `420px` glass overlay, `min(680px, 100dvh - 40px)` tall, `20px` radius, `rgba(14,14,16,0.85)` at `blur(24px)`, entering from the right with `translateX(120%) scale(0.9) → 0/1` on a `cubic-bezier(0.16, 1, 0.3, 1)` expo curve over `500ms`. A 3px solid Beacon Blue bar caps the top. The header pairs a pulsing cyan status dot with a title and a live status line. Message bubbles animate in with a 10px rise, use the Tail Rule for their speaker corner, and render full markdown with cyan list markers, cyan inline code on a tinted background, and pill-shaped cyan action buttons. The scrollbar is a 4px translucent cyan track.

### The Avatar Widget (signature)
A `120×200px` fixed element pinned `24px` from the bottom-right, carrying an ambient `avatarGlow` drop-shadow pulse on a 2.5s loop. It is draggable, animates between idle / wave / falling states, tracks the cursor with its head, and can raise a speech bubble — a small glass tooltip with a squared bottom-right corner that pops in on a back-out curve after a 1s delay.

### Timeline
A 2px aurora `gradient-line` spine with circular logo wells (`80px` desktop / `40px` mobile) in Surface Deep with a Hairline border, offset onto the spine. Content rows reveal on scroll and the spine's fill tracks scroll progress.

### Named Rules

**The No Dead Hover Rule.** Every interactive surface answers the cursor before it is clicked — border brighten, scale, glow, fill sweep, or underline. A hover state that does nothing is a defect, not a style choice.

**The Reveal Once Rule.** Scroll-triggered entrances use `toggleActions: "play none none reverse"` and a `50–60px` rise. Content never enters from more than one direction on the same screen.

## Do's and Don'ts

### Do:
- **Do** keep Beacon Blue (`#62e0ff`) tied to meaning — active, live, focused, interactive. Its discipline is what makes it read as a signal rather than a theme color.
- **Do** build every new surface as glass over the void: translucent fill, 1px translucent border, `backdrop-filter`, large soft black shadow.
- **Do** give every interactive element a hover state that changes something within `200–500ms`.
- **Do** carry hierarchy with Mona Sans weight and scale (300 body → 600 headline → 700 title) rather than reaching for a new family.
- **Do** hold the 160px / 80px section rhythm and the `max-w-3xl` cap on prose.
- **Do** mount new 3D content into the shared `View.Port` at z-20 or the background canvas at z-0.
- **Do** reserve Impact Green for a real, quantified business outcome, and put exact figures in the copy beside it.
- **Do** put uppercase and wide tracking only on 12px labels.
- **Do** enforce a minimum 44×44px interactive hit area (Touch Target Rule) for all buttons, icons, and links, ensuring mobile accessibility without compromising visual density.

### Don't:
- **Don't** ship a **generic dark-mode SaaS template** — no purple-to-blue gradient hero, no interchangeable three-up feature row with stock icons, no dashboard mockup standing in for real work. Every screen must carry something only this portfolio could show.
- **Don't** drift into **neon cyberpunk clutter** — no second competing accent, no scanlines or grid overlays, no glow on static text or decorative chrome. The credibility of a case study presented to a CEO dies the moment the interface looks like a game menu.
- **Don't** produce a **static flat corporate CV** — a motionless page contradicts the North Star. If nothing on a screen moves, breathes, or responds, the screen is unfinished.
- **Don't** use cyan glow to imply elevation, or a black shadow to imply liveness. (The Two Vocabularies Rule.)
- **Don't** stack glass on glass, or place `backdrop-filter` over anything but the void or the 3D canvas.
- **Don't** introduce a second typeface, or set a heading in uppercase.
- **Don't** mount a new top-level `<Canvas>` — it breaks the two-canvas layering contract and costs a second WebGL context.
- **Don't** paint the aurora gradient as a fill. It is light along an edge: 2px spines, 3px separators, tab underlines.
- **Don't** let a placeholder, decorative logo, or unfinished section render as though it were a real credential.
