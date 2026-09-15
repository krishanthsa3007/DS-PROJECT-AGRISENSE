---
name: AgriSense Organic Dark
colors:
  surface: '#0c1510'
  surface-dim: '#0c1510'
  surface-bright: '#313c35'
  surface-container-lowest: '#07100b'
  surface-container-low: '#141e18'
  surface-container: '#18221c'
  surface-container-high: '#222c26'
  surface-container-highest: '#2d3730'
  on-surface: '#dae5db'
  on-surface-variant: '#becabe'
  inverse-surface: '#dae5db'
  inverse-on-surface: '#28332c'
  outline: '#889489'
  outline-variant: '#3e4941'
  surface-tint: '#79daa0'
  primary: '#79daa0'
  on-primary: '#00391f'
  primary-container: '#40a26d'
  on-primary-container: '#00311a'
  inverse-primary: '#006d40'
  secondary: '#eec067'
  on-secondary: '#412d00'
  secondary-container: '#785600'
  on-secondary-container: '#fdce73'
  tertiary: '#b5d08a'
  on-tertiary: '#223601'
  tertiary-container: '#809959'
  on-tertiary-container: '#1c2f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#95f7ba'
  primary-fixed-dim: '#79daa0'
  on-primary-fixed: '#002110'
  on-primary-fixed-variant: '#00522f'
  secondary-fixed: '#ffdea4'
  secondary-fixed-dim: '#eec067'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#d0eca3'
  tertiary-fixed-dim: '#b5d08a'
  on-tertiary-fixed: '#121f00'
  on-tertiary-fixed-variant: '#384d16'
  background: '#0c1510'
  on-background: '#dae5db'
  surface-variant: '#2d3730'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  headline-sm:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an agrarian, telemetry-driven platform engineered for precision agriculture, soil intelligence, and agronomy management. The design rejects neon cyber-futurism, artificial glowing matrices, and high-frequency digital aesthetics. Instead, it grounds complex environmental analytics in an organic, dusk-inspired digital sanctuary.

The visual language draws inspiration from nocturnal forest canopies, rich fertile humus, and historical botanical folios. Its aesthetic bridges tactile editorial craftsmanship with high-density scientific telemetry. The emotional response is calm, grounded, authoritative, and deeply respectful of the earth. High-information dashboards feel like curated field ledgers rather than chaotic monitoring terminals.

## Colors

The palette simulates natural dusk transitions across fertile landscapes. It maintains low-strain operational contrast across varied ambient outdoor and indoor conditions.

- **Base Canvas:** The deepest foundation is `#0c1410`, stepping up to `#101a14` for standard canvas views.
- **Tonal Surfaces:** Three primary container tiers provide structural elevation without heavy shadows:
  - Container Low: `#15221b` (field maps, base card regions)
  - Container Mid: `#1b2b23` (interactive cards, toolbars, modal surfaces)
  - Container High: `#22352b` (hover states, dropdown menus, popovers)
- **Content & Typography:** Avoid pure digital whites. Use warm ivory and linen tones:
  - Primary Copy: `#ede8df` (high legibility, soft cream finish)
  - Secondary Copy: `#d3cdc3` (subtitles, metadata, axis labels)
  - Muted Copy: `#9e9a90` (timestamps, inactive units, caption indicators)
- **Botanical Accents:**
  - Active Vegetation & Growth: `#3ea06b` (with `#347854` for muted/pressed states)
  - Harvest, Solar, & Sensor Highlights: `#c49a45` (warm earthy amber)
  - Moisture & Canopy Phenology: `#758e4f` (muted olive)
- **Structural Outlines:** `#2d4236` at standard resting state, or `rgba(237, 232, 223, 0.08)` for ultra-fine borders.

## Typography

The type system pairs the editorial elegance of **Newsreader** with the technical clarity of **Geist**.

- **Newsreader** handles high-level metrics, dashboard titles, environmental summaries, and agricultural field designations. Its natural stroke contrast lends the system an authoritative, bookish heritage reminiscent of scientific field manuals. Italic variants are encouraged for contextual metric units, moisture phases, and cultivar taxonomy.
- **Geist** manages telemetry data, geographic coordinates, dense tabular values, form elements, and utility microcopy. It provides a geometric, neutral counterpart to the editorial serif, ensuring dense charts and crop tables remain legible.

## Layout & Spacing

The layout adopts a flexible 12-column grid system tuned for data density and field mapping workflows:

- **Desktop (1200px+):** 12 columns, `margin` of `2rem` (32px), `gutter` of `1.25rem` (20px). Suitable for multi-pane agronomic maps with simultaneous sensor telemetry sidebars.
- **Tablet (768px - 1199px):** 8 columns, `margin` of `1.5rem` (24px), `gutter` of `1rem` (16px). Secondary telemetry stacks beneath field visualizations.
- **Mobile (Up to 767px):** 4 columns, `margin-mobile` of `1rem` (16px), `gutter-mobile` of `0.75rem` (12px). Full-width card stacking with sticky bottom controls for single-hand field use.

Layouts favor structured, asymmetrical arrangements: generous margins surround key editorial insights, while data-dense metric panels compress spacing using `space-sm` and `space-md` gaps.

## Elevation & Depth

Visual hierarchy relies entirely on **tonal layers** and **low-contrast organic outlines**, explicitly rejecting floating drop shadows, glossy plastic shears, or blurred neon halos:

- **Level 0 (Floor):** Ground canvas (`#0c1410` to `#101a14`).
- **Level 1 (Sub-surface):** Large dashboard groupings and map viewports set to Container Low (`#15221b`) framed by a 1px border of `#2d4236`.
- **Level 2 (Active Cards & Panels):** Individual telemetry pods, irrigation schedule modules, and soil nitrate cards set to Container Mid (`#1b2b23`) bordered by `rgba(237, 232, 223, 0.06)`.
- **Level 3 (Overlays & Actions):** Dropdowns, tooltips, and modal dialogues set to Container High (`#22352b`). A delicate ambient dark shadow with zero spread is applied (`box-shadow: 0 16px 32px rgba(5, 10, 7, 0.6)`), tethered by a 1px perimeter outline of `rgba(237, 232, 223, 0.12)`.

## Shapes

The design uses **Soft** geometry (`roundedness: 1`). Corner radii are restrained and purposeful, referencing physical paper ledgers, specimen slides, and technical hardware field monitors. 

Standard interactive elements, sensor readouts, and card panels leverage `4px` (`0.25rem`) to `8px` (`0.5rem`) corner rounding. High-surface containers and modals top out at `12px` (`0.75rem`). Pill-shaped radii are forbidden except for status chips, keeping the interface architectural, structured, and firmly anchored to the earth.

## Components

### Buttons
- **Primary Action:** Solid muted botanical green (`#3ea06b`) with warm dark contrast text (`#0c1410`), font-weight 500 in Geist. On hover, shifts to `#347854`. No drop shadows or glow filters.
- **Secondary Action:** Transparent background with an organic moss border (`#2d4236`) and warm ivory text (`#ede8df`). On hover, fills with `#1b2b23`.
- **Harvest / Urgent Action:** Solid warm amber (`#c49a45`) with `#0c1410` text, reserved for critical soil moisture alerts, yield triggers, and shut-off commands.

### Status Chips & Badges
- Compact height (24px), font size `11px` uppercase with `0.04em` tracking.
- Subtle tinted backgrounds:
  - **Healthy Growth:** Background `rgba(62, 160, 107, 0.12)`, border `rgba(62, 160, 107, 0.3)`, text `#3ea06b`.
  - **Moisture Deficit / Attention:** Background `rgba(196, 154, 69, 0.12)`, border `rgba(196, 154, 69, 0.3)`, text `#c49a45`.
  - **Dormant / Neutral:** Background `rgba(158, 154, 144, 0.1)`, border `rgba(158, 154, 144, 0.25)`, text `#d3cdc3`.

### Cards & Data Containers
- Built on `#1b2b23` with a 1px border of `#2d4236`.
- Card headers utilize **Newsreader** regular headings alongside micro-labels in uppercase **Geist**.
- Internal sub-sections are separated by subtle horizontal dividers (`1px solid rgba(237, 232, 223, 0.05)`).

### Form Inputs & Selectors
- Inputs sit recessed in `#15221b` with a default 1px border of `#2d4236`.
- Placeholder text in `#9e9a90`. Input text in `#ede8df`.
- Focus state replaces the border with `#3ea06b` at 1px thickness without external box-shadow rings.

### Checkboxes & Switches
- Checkboxes: 16x16px squares with a 2px border radius. Unchecked state: `#15221b` fill with `#2d4236` border. Checked state: `#3ea06b` fill with `#0c1410` checkmark glyph.
- Toggles: Muted track in `#15221b`, active track in `#347854`, with a cream thumb (`#ede8df`).

### Domain-Specific Components
- **Soil Horizon Gauges:** Layered vertical telemetry strips showing depth layers (topsoil, subsoil, bedrock) using progressive shades of `#15221b`, `#1b2b23`, and `#22352b`, with amber tick marks indicating root-zone penetration.
- **Canopy Phenology Timeline:** A chronological chart element pairing Newsreader month/phase markers with soft olive indicators showing crop maturation phases.