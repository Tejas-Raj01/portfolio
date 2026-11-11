# Many Hands — Tejas Raj Portfolio

> *"I fix bugs in infrastructure that millions of people depend on."*

Personal portfolio website of **Tejas Raj** built from scratch on Astro, TypeScript, and vanilla CSS. Designed on the idea of **"Many Hands"**: open source is not one person typing alone; it is many hands building something together.

Live site: [tejas-raj01.vercel.app](https://tejas-raj01.vercel.app)

---

## Highlights

- **The Swarm Effect:** Multiplayer cursors tagged with real open source projects (`vllm`, `pytorch`, `canonical`, `jetpack`, `cpeditor`, etc.) orbit, align, and build the page live using flocking physics (Boids) and reveal-in-place scheduling.
- **The "Red Pencil" Editorial Aesthetic:** Warm paper off-white (`#F1EEE6`) with near-black ink (`#1A1A18`) and a single editor's highlighter accent (`#C4432B`). Inverted dark mode toggle.
- **Visual Language of Version Control:** Diffs, blame annotations, commit hashes, hunk headers (`@@ -12,7 +12,9 @@`), and line-number gutters.
- **Dual Perspective:** Interactive toggle switches between **Plain English** (for non-developers) and **Raw Code Diffs** (for systems engineers).
- **Zero Vibe-Code Bans:** No purple gradients, no terminal hacker neon, no 16px rounded cards, no stock icons, no buzzwords.

---

## Tech Stack & Architecture

- **Framework:** [Astro](https://astro.build/) (Static Site Generation, zero runtime JS overhead for base content)
- **Language:** TypeScript
- **Styling:** Vanilla CSS with custom properties & modular typography
- **Typography:** Self-hosted *Instrument Serif* (display) and *Commit Mono* (code/data)
- **Swarm Engine:** 60fps canvas animation with vector boids physics, spatial flocking, and Web Audio synthesizer
- **CI/CD:** GitHub Action scheduled rebuild to keep GitHub statistics fresh

---

## Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Tejas-Raj01/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## Attribution & Credits

- Cursor swarm effect inspired by **Swarm** by [Joel Califa](https://califa.github.io/swarm-site/) and **Swarm Rebuild** by [Dhvanil Patel](https://github.com/DhvanilPatel/swarm-cursors). Clean-room implementation in vanilla TypeScript.
- Typefaces: *Instrument Serif* by Jordan Bell & Rodrigo Fuenzalida; *Commit Mono* by Eigil Nikolajsen.

---

## License

MIT &copy; 2026 [Tejas Raj](mailto:rajtejas.xyz@gmail.com)
