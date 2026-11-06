# Tejas Raj — Portfolio (Developer-Native Edition)

> *"I fix things in the codebases the world runs on."*

Personal developer portfolio engineered with a dark, aesthetic, developer-native aesthetic showcasing upstream open-source contributions across **vLLM**, **PyTorch**, **Canonical**, **Automattic Jetpack**, and **Microsoft VS Code**, along with distributed systems case studies and competitive programming milestones.

---

## 🛠️ Stack & Architecture

- **Runtime & Bundler**: [Vite 5](https://vitejs.dev/) with ES Modules
- **Design System**: Developer-native dark theme (`#0a0a0f`), electric violet (`#8b5cf6`) and cyan (`#06b6d4`) accents, subtle grid mesh, 1px glassmorphism cards, and responsive fluid layout.
- **Typography**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Display headings), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Code, stats, and labels), [Inter](https://fonts.google.com/specimen/Inter) (Body & UI).
- **Data-Driven Architecture**: Separation of presentation from data in `src/portfolio-data.js`. All stats (Total PRs, Merged PRs, Upstream Repos) are computed programmatically at runtime with zero hardcoding.

---

## 🚀 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/Tejas-Raj01/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 📖 How to Add a New Upstream PR or Project

All portfolio content is decoupled from layout and maintained in [`src/portfolio-data.js`](./src/portfolio-data.js).

### 1. Adding a New Pull Request (PR)

Open `src/portfolio-data.js` and locate the `openSource` array.

1. Find the target repository object (e.g. `vLLM` or `PyTorch`).
2. Add a new item to the `highlights` array:

```javascript
{
    title: "short descriptive title of the PR",
    status: "Merged PR #12345", // or "Open PR #12345"
    prNumber: "12345",
    problem: "Precise technical description of the bug or edge case.",
    solution: "Technical implementation details of the fix or feature.",
    url: "https://github.com/org/repo/pull/12345"
}
```

> **Note**: The Impact Stats Bar and Filter Pills automatically recalculate total PRs, merged counts, and repo counts from the `status` string.

### 2. Featuring a PR in "Selected Work"

If the PR represents high-leverage architectural work, add it to `portfolioData.selectedWork`:

```javascript
{
    repo: "vLLM",
    prNumber: "12345",
    title: "short title",
    status: "Merged PR #12345",
    url: "https://github.com/vllm-project/vllm/pull/12345",
    badgeClass: "badge-merged", // or "badge-open"
    category: "LLM Inference Infrastructure",
    impact: "High-level summary of production impact",
    problem: "...",
    solution: "..."
}
```

### 3. Adding or Updating an Engineering Case Study

Under `portfolioData.caseStudies`:

```javascript
{
    id: "project-slug",
    badge: "Systems & Storage",
    title: "Project Name",
    subtitle: "One-line architecture summary",
    language: "C++17 / Python 3.11",
    githubUrl: "https://github.com/Tejas-Raj01/repo",
    liveUrl: "https://demo.app",
    problem: "...",
    approach: "...",
    techStack: ["C++17", "Gossip Protocol", "WAL"],
    keyChallenge: "...",
    results: ["Metric 1", "Metric 2"],
    metrics: [
        { label: "Throughput", value: "33,685 req/s" },
        { label: "Latency", value: "~2.97 ms" }
    ],
    keyDesignDecisions: [
        "Decision 1 rationale...",
        "Decision 2 rationale..."
    ]
}
```

---

## 👤 Author

**Tejas Raj**
- GitHub: [@Tejas-Raj01](https://github.com/Tejas-Raj01)
- LinkedIn: [Tejas Raj](https://www.linkedin.com/in/tejas-raj-09aa4a236/)
- CodeChef: [tejas_raj_01](https://www.codechef.com/users/tejas_raj_01) (4★, Max 1804)
- Email: [rajtejas.xyz@gmail.com](mailto:rajtejas.xyz@gmail.com)
