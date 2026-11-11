# Design System & Rationale: "Many Hands"

## The Core Concept
Open source software is not an isolated pursuit; it is the collective work of distributed developers catching edge cases, fixing race conditions, and hardening infrastructure.

"Many Hands" renders Tejas Raj's portfolio as an edited manuscript under version control. Rather than another generic dark-mode terminal with neon glow or purple gradients, the entire site is printed on warm paper with ink, marked by the editor's red pencil, and built live in front of the visitor by a flocking swarm of multiplayer cursors tagged with the real projects Tejas has contributed to.

---

## Typography

| Role | Font Face | Rationale |
|---|---|---|
| **Display** | **Instrument Serif** | High-contrast editorial serif designed by Jordan Bell & Rodrigo Fuenzalida. Carries the weight and permanence of a printed newspaper masthead or academic proof. Strictly available in Regular & Italic, preventing faux-bold distortion and enforcing typographic discipline. |
| **Data & Code** | **Commit Mono** | Purpose-built monospace by Eigil Nikolajsen for code reading and git diff inspections. Proportional kerning options, clean numerals, and zero gimmickry. Self-hosted as WOFF2 for zero-blocking performance. |

---

## Color System: "Red Pencil" Palette

Strict limit of 4 functional colors across the interface:

1. **Surface (Warm Paper):** `#F1EEE6` (Light) / `#161614` (Inverted Dark). Eliminates eye strain and sets an editorial, authorial tone.
2. **Ink:** `#1A1A18` (Light) / `#ECE8DE` (Dark). High-contrast reading typography meeting WCAG AAA requirements.
3. **Highlighter Accent (Red Pencil):** `#C4432B` (Light) / `#E85D44` (Dark). Used strictly for interactive selections, links, and hunk headers.
4. **Diff Semantics:** `#2DA44E` / `#3FB950` (Additions `+`) and `#CF222E` / `#F85149` (Deletions `-`). Never used decoratively; only where version-control meaning is conveyed.

---

## Hard Ban Compliance

- **No neon terminal vibes:** No `rgb(0, 255, 0)` terminal aesthetic.
- **No glows or aurora blobs:** No blur gradients, backdrop glassmorphism, or radial flares.
- **No cards with 16px radius:** Corner radii are strictly `0px` or `2px`. Structure is created with hairline rules (`1px solid var(--color-border-hairline)`).
- **No stock icon packs or emojis as icons:** Clean custom SVG glyphs and text markers.
- **No lorem ipsum or buzzwords:** Every single number, PR, and benchmark is grounded in Tejas Raj's real open source work.

---

## Swarm Engine Architecture

- **Clean-room implementation:** Inspired by Joel Califa's *Swarm* and Dhvanil Patel's *Swarm Rebuild*, implemented independently in vanilla TypeScript.
- **Reveal-in-place:** Never clones or duplicates the DOM. The real semantic HTML is present from first byte; the engine simply coordinates clip-paths, text carets, and crosshair drag indicators.
- **Accessibility first:** Fully bypassed when `prefers-reduced-motion` is active or when returning visitors revisit within the same session.
