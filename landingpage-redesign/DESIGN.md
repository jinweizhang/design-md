# Revolut-Inspired Landing Page — DESIGN.md

A condensed design system used to redesign the Figma `landingpage` frame
(`https://www.figma.com/design/q0quwLNXVHQRMcy7TMjCwr/landingpage?node-id=0-1`)
in the visual language of **revolut.com**: sleek dark canvas, gradient cards,
fintech precision.

This file is meant to be read by an AI design/coding agent so that the same
landing page can be reproduced 1:1 in Figma, in code, or in a marketing CMS.

---

## 1. Visual Theme & Atmosphere

| Attribute | Value |
| --- | --- |
| Mood | Confident, premium, modern fintech — "money in motion" |
| Density | Spacious. Long vertical scroll. One idea per section. |
| Surface bias | Dark first. Light sections used as deliberate contrast bands. |
| Imagery | Phone mockups in 3D space, gradient cards, abstract aurora glows, country flags / merchant logos |
| Motion | Subtle parallax, gradient drift, card tilt on hover. No bouncy animations. |

Design philosophy: *radical clarity*. Every section answers exactly one
question — "What is it? What can I do with it? Why is it safe? Where do I
download it?"

---

## 2. Color Palette & Roles

Revolut's brand colors (per Mobbin and Revolut's open-banking guidelines):

| Token | Hex | Role |
| --- | --- | --- |
| `--shark` | `#0E0F11` | Primary background (dark sections) |
| `--shark-2` | `#15171B` | Elevated surface on dark |
| `--shark-3` | `#1C1F24` | Card / input on dark |
| `--white` | `#FFFFFF` | Primary text on dark, background on light sections |
| `--ink` | `#06070A` | Primary text on light |
| `--muted` | `#8A8F98` | Secondary text |
| `--hairline` | `rgba(255,255,255,0.08)` | 1px divider on dark |
| `--cornflower` | `#7F84F6` | Accent — links, focused inputs, secondary CTA |
| `--violet` | `#5A4BFF` | Primary CTA, brand glow |
| `--lime` | `#D6FF4B` | Highlight chips, "free" badges |
| `--ocean` | `#0066FF` | Trust / "secure" indicators |
| `--sunset` | `#FF6B5C` | Premium plan accent |

### Signature gradients

```
--grad-aurora:  radial-gradient(60% 80% at 20% 0%, #5A4BFF 0%, transparent 60%),
                radial-gradient(50% 60% at 90% 30%, #7F84F6 0%, transparent 55%),
                #0E0F11;

--grad-card-standard: linear-gradient(135deg, #2B2F36 0%, #15171B 100%);
--grad-card-plus:     linear-gradient(135deg, #5A4BFF 0%, #1B1B6E 100%);
--grad-card-premium:  linear-gradient(135deg, #B79768 0%, #1F1A12 100%);
--grad-card-metal:    linear-gradient(135deg, #8E8E93 0%, #2C2C2E 100%);
--grad-card-ultra:    linear-gradient(135deg, #2A2D34 0%, #06070A 100%);
```

---

## 3. Typography Rules

Brand typeface: **Aeonik Pro** (CoType Foundry). Web fallback used here is
**Inter** with tight tracking and `font-feature-settings: "ss01","cv11"`.

| Style | Family | Weight | Size (desktop) | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display XL (hero) | Aeonik / Inter | 500 | 88px | 0.95 | -0.04em |
| Display L | Aeonik / Inter | 500 | 64px | 1.0 | -0.03em |
| Display M (section) | Aeonik / Inter | 500 | 48px | 1.05 | -0.025em |
| Title | Aeonik / Inter | 500 | 28px | 1.15 | -0.015em |
| Body L | Aeonik / Inter | 400 | 18px | 1.55 | -0.005em |
| Body | Aeonik / Inter | 400 | 16px | 1.6 | 0 |
| Caption | Aeonik / Inter | 500 | 12px | 1.4 | 0.04em (uppercase) |

Numerals use **tabular figures**. Currency, prices and stats always render
with `font-variant-numeric: tabular-nums`.

---

## 4. Component Stylings

### Buttons

```
.btn-primary {
  background: var(--violet);
  color: #fff;
  border-radius: 999px;
  padding: 14px 24px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
}
.btn-primary:hover { background: #6E5DFF; box-shadow: 0 10px 30px rgba(90,75,255,.35); transform: translateY(-1px); }

.btn-ghost {
  background: rgba(255,255,255,.06);
  color: #fff;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 999px;
  padding: 14px 24px;
}
.btn-ghost:hover { background: rgba(255,255,255,.10); }
```

### Cards (gradient hero cards)

- Aspect ratio 1.586:1 (real bank-card ratio)
- 24px corner radius
- Soft inner sheen: `box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 30px 60px -20px rgba(0,0,0,.6)`
- Logo wordmark in top-left, chip in top-right
- Card name in bottom-left in **uppercase**, tracking 0.08em

### Pill chips ("New", "Free", "Up to 5%")

```
display: inline-flex; align-items:center; gap: 6px;
padding: 6px 10px;
background: rgba(214,255,75,.16); /* lime tint */
color: #D6FF4B;
border-radius: 999px;
font-size: 12px; letter-spacing: .04em; text-transform: uppercase;
```

### Phone mockup frame

- Rounded rectangle device, 48px corner radius, 8px black bezel
- Drop shadow `0 60px 120px -30px rgba(90,75,255,.35)`
- Screen content uses `--shark-2` background and 28px inner radius

### Inputs

```
height: 56px; border-radius: 14px;
background: rgba(255,255,255,.05);
border: 1px solid rgba(255,255,255,.10);
color: #fff;
padding: 0 18px;
```
Focus ring: `0 0 0 3px rgba(127,132,246,.35)`, border `--cornflower`.

### Navigation

- Sticky, 72px tall, `background: rgba(14,15,17,.72); backdrop-filter: blur(18px)`
- Logo 28px tall, mega-menu items 15px medium, hover underline 1px (animated width 0→100%)
- "Sign up" CTA on the right, primary button style.

---

## 5. Layout Principles

- 12-column grid, 1200px content max-width, 24px gutter.
- Section vertical rhythm: 120px top/bottom on desktop, 64px on mobile.
- Hero is full-bleed dark with aurora gradient; downstream sections alternate
  dark / light bands every 1–2 sections.
- 3-up feature grids on desktop, collapse to 1-up <768px.

Spacing scale (4px base): 4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96, 120.

---

## 6. Depth & Elevation

| Level | Use | Shadow |
| --- | --- | --- |
| 0 | Page background | none |
| 1 | Card on dark | `0 1px 0 rgba(255,255,255,.06) inset` |
| 2 | Card on light | `0 12px 24px -12px rgba(6,7,10,.10)` |
| 3 | Floating card / phone | `0 60px 120px -30px rgba(90,75,255,.35)` |
| 4 | Modal | `0 30px 80px rgba(0,0,0,.55)` |

---

## 7. Do's and Don'ts

**Do**
- Lead every section with a 4–6 word display headline.
- Use one accent gradient per section, not three.
- Keep CTAs to ≤ 2 per fold.
- Use real-looking app screenshots, not lorem-ipsum boxes.

**Don't**
- Don't add drop-shadows to text.
- Don't mix more than 2 gradient hues in one card.
- Don't use pure `#000000` — always `--shark` (`#0E0F11`).
- Don't apply rounded corners > 28px to UI controls (cards/devices only).

---

## 8. Responsive Behavior

| Breakpoint | Width | Behavior |
| --- | --- | --- |
| `xs` | < 480 | Single column, 24px side padding, hero font 44px |
| `sm` | 480–767 | Single column, 32px padding |
| `md` | 768–1023 | 2-col feature grids, hero font 64px |
| `lg` | 1024–1279 | Full 12-col, hero font 80px |
| `xl` | ≥ 1280 | 1200px max-width centered, hero font 88px |

Tap targets ≥ 44px. Sticky CTA appears on mobile after the hero scrolls out.

---

## 9. Agent Prompt Guide

Quick paste for AI agents:

> Build a landing page in the Revolut visual language using DESIGN.md.
> Background `#0E0F11`. Primary CTA pill, color `#5A4BFF`, radius 999px.
> Display headlines in Aeonik / Inter 500, tracking -0.04em.
> Hero must contain a 3D phone mockup on the right and a stack of three
> gradient bank cards on the left. Sections in order:
> 1) Hero, 2) Cards lineup, 3) Send / spend in 150+ currencies,
> 4) Stocks & crypto, 5) Plans pricing, 6) Security, 7) Download.
> Use lime `#D6FF4B` chips for "free" / "new" badges. Use `tabular-nums`
> for any number, currency, or percentage.
