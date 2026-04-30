# Landing page — Revolut-inspired redesign

Reference assets for redesigning the Figma frame
[`landingpage / 0:1`](https://www.figma.com/design/q0quwLNXVHQRMcy7TMjCwr/landingpage?node-id=0-1)
in the visual language of [revolut.com](https://www.revolut.com).

> Note: this folder is the *agent-readable spec + a working HTML proof of concept*.
> The Figma file itself cannot be edited from a Cloud Agent (Figma's API is
> read/export only — no programmatic frame mutation), so the workflow is:
>
> 1. Read [`DESIGN.md`](./DESIGN.md) — Revolut-inspired tokens, type, components.
> 2. Open [`index.html`](./index.html) — pixel-level reference rendering.
> 3. Recreate the layered frame in Figma using the same tokens and order.
>
> Every section in `index.html` is built so it can be sliced 1:1 into a
> Figma frame at 1440 × auto.

## Files

| File | Purpose |
| --- | --- |
| `DESIGN.md` | Tokens, typography, components, do's and don'ts |
| `index.html` | Self-contained HTML/CSS reference page |

## Section map (top → bottom)

These match the structure expected in the Figma frame. Each row lists the
Revolut design pattern that inspired it.

| # | Section | Revolut pattern | Notes |
| --- | --- | --- | --- |
| 1 | Sticky nav | `Revolut.com / global header` | Translucent dark, blurred background, pill CTA on the right |
| 2 | Hero | `Banking & Beyond` | Aurora gradient, phone mockup right, stacked gradient cards left |
| 3 | Currencies marquee | `150+ currencies ribbon` | Auto-scrolling row, horizontal infinite loop |
| 4 | Feature grid (6) | `Money that just works` | 3-up dark cards with violet icon tile |
| 5 | Invest split | `Stocks & crypto` | 2-col: copy + chart card with tabular figures |
| 6 | Travel band (light) | `Stays / Lounge access` | Cream contrast band, ink CTA |
| 7 | Plans (4) | `Standard / Plus / Premium / Metal` | Distinct gradient per tier |
| 8 | Security | `Your money, guarded` | Aurora-tinted card with notification stack |
| 9 | Download | `Get the app` | Violet → cornflower → lime gradient panel |
| 10 | Footer | `Global footer` | 5-col link grid, fine hairline border |

## Design tokens (quick reference)

```
Background dark   #0E0F11   shark
Card on dark      #15171B   shark-2
Surface on dark   #1C1F24   shark-3
Primary CTA       #5A4BFF   violet
Accent / link     #7F84F6   cornflower
Highlight         #D6FF4B   lime
Trust             #0066FF   ocean
Premium           #FF6B5C   sunset
```

```
Display XL       Aeonik / Inter 500   88px / -0.04em / 0.95 lh
Display          Aeonik / Inter 500   64px / -0.03em / 1.0  lh
Section          Aeonik / Inter 500   48px / -0.025em
Body L           Aeonik / Inter 400   18px / 1.55
Caption          Aeonik / Inter 500   12px UPPERCASE / 0.04em
```

All numbers in the UI use `font-variant-numeric: tabular-nums`.

## How to preview locally

This is plain HTML — no build step.

```bash
cd landingpage-redesign
python3 -m http.server 8080
# open http://localhost:8080
```

## How to recreate in Figma

1. Create a 1440-wide frame, fill `#0E0F11`, name it `landingpage`.
2. Add an Auto Layout vertical container (gap 0, padding 0).
3. For each section in the table above, create a child Auto Layout frame
   sized to the column widths in `index.html` (max 1200, gutter 24).
4. Use the colors and typography in [`DESIGN.md`](./DESIGN.md) verbatim —
   the section names in the HTML map 1:1 to the section frames in Figma.
5. Use Figma's "Place image" or vector pen for the phone mockup; for the
   bank-card stack create three rotated rectangles at the listed gradients.

## Why this approach

- The Cloud Agent can't write to Figma, but it *can* deliver every visual
  decision needed to redo the frame faithfully.
- `DESIGN.md` is the same format VoltAgent's repo (this repo) was built
  around — designers and AI agents can both read it.
- `index.html` is the running proof: paste tokens into Figma, line up the
  sections, and the frame matches the page byte-for-byte.
