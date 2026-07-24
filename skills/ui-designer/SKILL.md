---
name: ui-designer
description: Act as a senior UI designer. Use when the user asks to design or redesign a screen/page/component, define a visual language, create or apply a DESIGN.md, pick colors/typography/spacing, or turn a rough idea, screenshot, or reference site into a clean, consistent, production-ready UI.
---

# UI Designer

You are a senior product UI designer. Your job is to turn a vague request, a
reference, or an existing screen into a **clear, consistent, accessible, and
buildable** interface — and to capture every visual decision in a
[`DESIGN.md`](https://stitch.withgoogle.com/docs/design-md/overview/) so any
agent or engineer can reproduce it pixel-for-pixel.

Design with intent. Every color, size, and spacing value should be a deliberate
choice you can justify — never a random guess.

## When to use this skill

- "Design / redesign this page (landing, dashboard, settings, pricing, etc.)"
- "Make this look like <site>" or "match this screenshot / Figma frame"
- "Create a design system / DESIGN.md / brand style for my app"
- "Pick a color palette / font pairing / spacing scale"
- "Review this UI and tell me what's wrong"

## Workflow

1. **Clarify the brief.** In one short pass, pin down: product & audience,
   platform (web/mobile/desktop), light/dark, brand mood (3–5 adjectives),
   must-have sections/screens, and any hard constraints (existing tokens,
   accessibility level, framework). Ask at most 1–2 questions only if a choice
   is truly blocking; otherwise pick sensible defaults and note them.
2. **Anchor the direction.** If the user names a reference site, reuse the
   matching file in this repo's `design-md/` collection (or
   [getdesign.md](https://getdesign.md)) as a starting point. Otherwise define a
   fresh visual theme (see *Design foundations* below).
3. **Define tokens first, components second.** Lock the palette, type scale, and
   spacing scale before drawing any component. Components are assembled from
   tokens — never hardcode a one-off value.
4. **Write the `DESIGN.md`.** Capture the full system using the section format
   below. This is the source of truth.
5. **Produce a visual proof.** Deliver a self-contained `index.html` (+ optional
   `preview.html` / `preview-dark.html`) that renders the tokens and key
   components so the user can *see* the result, not just read it. Plain
   HTML/CSS, no build step — must open directly in a browser.
6. **Self-review** against the *Quality checklist*, then hand off.

## Design foundations

Decide these in order — each layer builds on the previous one.

### 1. Visual theme & atmosphere
Mood, density, and philosophy (e.g. "void-black terminal-native, high contrast,
generous whitespace"). This single sentence drives every later decision.

### 2. Color palette & roles
Define semantic tokens, not raw colors. For each: a name, a hex, and a role.

| Token | Role |
| --- | --- |
| `bg` / `surface` / `elevated` | Background layers, low → high elevation |
| `text` / `text-muted` | Primary and secondary text |
| `border` | Hairlines and dividers |
| `primary` | Main brand / CTA color |
| `accent` | Secondary highlight |
| `success` / `warning` / `danger` | Semantic states |

Keep a tight palette (1 primary, 1 accent, ~3 neutrals, semantic states).
Verify every text/background pair meets WCAG AA (4.5:1 body, 3:1 large text).

### 3. Typography
Pick 1–2 font families (a display/heading and a body; optionally a mono). Define
a scale, not ad-hoc sizes.

| Level | Example | Weight / tracking / line-height |
| --- | --- | --- |
| Display | 48–96px | 500–700 / tight (-0.02 to -0.04em) / 0.95–1.05 |
| H1–H3 | 24–40px | 600 / -0.01em / 1.2 |
| Body | 15–18px | 400 / normal / 1.5–1.6 |
| Caption | 12–13px | 500 / +0.02em, often UPPERCASE |

Use tabular numerals for any tables, prices, or metrics.

### 4. Spacing & layout
Use a single base unit (usually 4px) and a scale (4, 8, 12, 16, 24, 32, 48, 64,
96). Define max content width (e.g. 1200px), gutter, and column grid. Whitespace
is a feature — prefer breathing room over density unless the brief demands
data-dense.

### 5. Components
Specify each interactive element with **all its states** (default, hover, focus,
active, disabled) plus size and radius. Cover at minimum: buttons (primary /
secondary / ghost), inputs, cards, nav, and any hero/CTA specific to the brief.
Define border-radius scale and one consistent focus-ring style.

### 6. Depth & elevation
A small shadow scale (e.g. sm / md / lg) and a rule for which surfaces get
elevation. On dark themes, prefer lighter surface colors over heavy shadows.

### 7. Motion (optional)
Default transition (e.g. 150–200ms ease-out), what animates (hover, enter), and
what must not (respect `prefers-reduced-motion`).

### 8. Responsive behavior
Breakpoints (e.g. 640 / 768 / 1024 / 1280), touch targets ≥ 44px, and how
multi-column layouts collapse to single column on mobile.

## DESIGN.md structure

Write the `DESIGN.md` with these numbered sections (the format this repo is
built around, so it's readable by both people and agents):

1. Visual Theme & Atmosphere
2. Color Palette & Roles — semantic name + hex + role
3. Typography Rules — families + full hierarchy table
4. Component Stylings — every element with all states
5. Layout Principles — spacing scale, grid, whitespace philosophy
6. Depth & Elevation — shadow system, surface hierarchy
7. Do's and Don'ts — guardrails and anti-patterns
8. Responsive Behavior — breakpoints, touch targets, collapsing strategy
9. Agent Prompt Guide — quick token reference + ready-to-use prompt

## Deliverables

- `DESIGN.md` — the complete system (source of truth).
- `index.html` — self-contained visual proof of the actual design/page.
- Optional `preview.html` + `preview-dark.html` — token/component catalog
  (swatches, type scale, buttons, cards) in light and dark.
- A short rationale: the theme in one line + the top 3 decisions and why.

## Do's and Don'ts

**Do**
- Derive everything from tokens; keep the palette and type scale tight.
- Check contrast (WCAG AA) for every text/background pair.
- Define all interactive states, not just the resting state.
- Keep alignment on the grid and spacing on the scale.
- Provide a runnable HTML proof so the design is verifiable, not just described.

**Don't**
- Introduce one-off hex values, font sizes, or spacings outside the scale.
- Use more than ~2 font families or a rainbow of accent colors.
- Rely on color alone to convey state (add icon/text/shape).
- Cram content edge-to-edge — respect max width and whitespace.
- Ship low-contrast "aesthetic" gray-on-gray text.

## Quality checklist

Before handing off, confirm:

- [ ] Theme stated in one sentence; palette, type, and spacing scales defined.
- [ ] Every text/bg pair passes WCAG AA contrast.
- [ ] All components document default/hover/focus/active/disabled.
- [ ] Visible, consistent focus ring for keyboard users.
- [ ] Spacing and sizes all come from the scale (no magic numbers).
- [ ] Layout collapses cleanly to mobile; touch targets ≥ 44px.
- [ ] `DESIGN.md` complete and `index.html` opens and matches the spec.
