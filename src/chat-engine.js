// Tejas Raj — AI Engineer Portfolio Conversational Intent Engine
// Principles: Single Intent -> Focused Response -> Relevant Evidence Only

import { portfolioData } from './portfolio-data.js';

export class PortfolioChatEngine {
    constructor() {
        this.data = portfolioData;
    }

    /**
     * Parses user query and returns a strictly topic-focused response object:
     * { intent: string, text: string, cards: Array }
     */
    processQuery(rawQuery) {
        const q = (rawQuery || '').toLowerCase().trim();

        // 1. OPEN SOURCE OVERVIEW
        if (this.matchesAny(q, ['open source', 'opensource', 'oss', 'contributions', 'prs', 'pull requests', 'github work'])) {
            return {
                intent: 'OPEN_SOURCE',
                text: "I prefer learning systems by working inside the codebases that build them. Here are my verified upstream contributions across machine learning frameworks and developer infrastructure. Click any project to inspect my pull requests directly on GitHub:",
                cards: this.data.openSource.map(repoGroup => ({
                    type: 'repo_summary_card',
                    title: repoGroup.repo,
                    subtitle: repoGroup.category,
                    summary: repoGroup.summary,
                    count: repoGroup.totalPrCount || repoGroup.highlights.length,
                    prSearchUrl: repoGroup.prSearchUrl
                }))
            };
        }

        // 2. PYTORCH (Strictly PyTorch only)
        if (this.matchesAny(q, ['pytorch', 'fx', 'torch', 'sparse tensor', 'return_annotation'])) {
            const repoData = this.data.openSource.find(item => item.repo === 'PyTorch');
            return {
                intent: 'PYTORCH',
                text: "I've contributed 2 verified merged pull requests to PyTorch (`pytorch/pytorch`):",
                cards: repoData ? repoData.highlights.map(h => ({
                    type: 'pr_card',
                    repo: 'PyTorch',
                    title: h.title,
                    status: h.status,
                    problem: h.problem,
                    solution: h.solution,
                    url: h.url,
                    prSearchUrl: repoData.prSearchUrl,
                    tech: h.tech
                })) : []
            };
        }

        // 3. VLLM (Strictly vLLM only)
        if (this.matchesAny(q, ['vllm', 'vllm pr', 'inference engine', 'schedulingpolicy'])) {
            const repoData = this.data.openSource.find(item => item.repo === 'vLLM');
            return {
                intent: 'VLLM',
                text: "I've contributed a merged pull request to vLLM (`vllm-project/vllm`), the open-source LLM inference engine:",
                cards: repoData ? repoData.highlights.map(h => ({
                    type: 'pr_card',
                    repo: 'vLLM',
                    title: h.title,
                    status: h.status,
                    problem: h.problem,
                    solution: h.solution,
                    url: h.url,
                    prSearchUrl: repoData.prSearchUrl,
                    tech: h.tech
                })) : []
            };
        }

        // 4. JETPACK (Strictly Jetpack only)
        if (this.matchesAny(q, ['jetpack', 'automattic'])) {
            const repoData = this.data.openSource.find(item => item.repo === 'Automattic Jetpack');
            return {
                intent: 'JETPACK',
                text: "I've contributed 9 merged pull requests to Automattic Jetpack (`Automattic/jetpack`):",
                cards: repoData ? repoData.highlights.map(h => ({
                    type: 'pr_card',
                    repo: 'Automattic Jetpack',
                    title: h.title,
                    status: h.status,
                    problem: h.problem,
                    solution: h.solution,
                    url: h.url,
                    prSearchUrl: repoData.prSearchUrl,
                    tech: h.tech
                })) : []
            };
        }

        // 5. SNAPCRAFT & CRAFT PARTS (Strictly Canonical Snapcraft & Craft Parts)
        if (this.matchesAny(q, ['snapcraft', 'canonical', 'craft-parts', 'craft parts', '1628', '6168', 'link_or_copy', 'self-linking'])) {
            const repoData = this.data.openSource.find(item => item.repo === 'Canonical Snapcraft');
            return {
                intent: 'SNAPCRAFT',
                text: "I've contributed merged pull requests to Canonical Snapcraft & Craft Parts (`canonical/snapcraft` & `canonical/craft-parts`):",
                cards: repoData ? repoData.highlights.map(h => ({
                    type: 'pr_card',
                    repo: 'Canonical (Snapcraft & Craft Parts)',
                    title: h.title,
                    status: h.status,
                    problem: h.problem,
                    solution: h.solution,
                    url: h.url,
                    prSearchUrl: repoData.prSearchUrl,
                    tech: h.tech
                })) : []
            };
        }

        // 6. CP EDITOR (Strictly CP Editor only)
        if (this.matchesAny(q, ['cp editor', 'cpeditor'])) {
            const repoData = this.data.openSource.find(item => item.repo === 'CP Editor');
            return {
                intent: 'CP_EDITOR',
                text: "I've contributed 3 merged pull requests to CP Editor (`cpeditor/cpeditor`):",
                cards: repoData ? repoData.highlights.map(h => ({
                    type: 'pr_card',
                    repo: 'CP Editor',
                    title: h.title,
                    status: h.status,
                    problem: h.problem,
                    solution: h.solution,
                    url: h.url,
                    prSearchUrl: repoData.prSearchUrl,
                    tech: h.tech
                })) : []
            };
        }

        // 7. SYSTEMS (Strictly Distributed Key-Value Pair - Tejas-DB ONLY)
        if (this.matchesAny(q, ['systems', 'system', 'c++', 'tejas-db', 'database', 'kv store', 'storage', 'key value'])) {
            return {
                intent: 'SYSTEMS',
                text: "My systems work demonstrates the low-level engineering foundation behind my AI infrastructure direction:",
                cards: this.data.systems.map(sys => ({
                    type: 'project_card',
                    title: sys.title,
                    subtitle: sys.subtitle,
                    description: sys.description,
                    metrics: sys.metrics,
                    tech: sys.tech,
                    githubUrl: sys.githubUrl,
                    liveUrl: sys.liveUrl
                }))
            };
        }

        // 8. DEALLENS (AI Investment Research & Due-Diligence Engine)
        if (this.matchesAny(q, ['deallens', 'due diligence', 'investment research', 'citationverifier', 'financial rag', 'rrf', '7-step dag'])) {
            const item = this.data.aiWork.find(i => i.title === 'DealLens');
            return {
                intent: 'DEALLENS',
                text: "DealLens is an enterprise-grade asynchronous AI investment research & due-diligence workflow engine:",
                cards: item ? [{
                    type: 'ai_project_card',
                    title: item.title,
                    subtitle: item.subtitle,
                    category: item.category,
                    description: item.description,
                    githubUrl: item.githubUrl,
                    liveUrl: item.liveUrl,
                    tags: item.tags
                }] : []
            };
        }

        // 9. AI WORK (AI Engines & Systems)
        if (this.matchesAny(q, ['ai work', 'genai', 'llm', 'inference', 'job platform', 'ai job platform', 'agent infrastructure', 'agent runtimes', 'rag', 'pgvector', 'hybrid search'])) {
            return {
                intent: 'AI_WORK',
                text: "My AI engineering work focuses on production AI workflow engines, hybrid RAG search architectures, and intelligent platform pipelines:",
                cards: this.data.aiWork.map(item => ({
                    type: 'ai_project_card',
                    title: item.title,
                    subtitle: item.subtitle,
                    category: item.category,
                    description: item.description,
                    githubUrl: item.githubUrl,
                    liveUrl: item.liveUrl,
                    tags: item.tags
                }))
            };
        }

        // 10. OPENCLAW (Strictly OpenClaw only)
        if (this.matchesAny(q, ['openclaw', 'claw'])) {
            return {
                intent: 'OPENCLAW',
                text: `${this.data.openclaw.statusText}\n\n${this.data.openclaw.exploreNotice}`
            };
        }

        // 11. STRONGEST ENGINEERING WORK
        if (this.matchesAny(q, ['strongest', 'best work', 'top work', 'strongest work', 'key work', 'evidence'])) {
            return {
                intent: 'STRONGEST_WORK',
                text: "My strongest engineering evidence is centered on core AI infrastructure, financial RAG backends, open source, and low-level systems:\n\n" +
                      "1. **vLLM (`vllm-project/vllm`)**: Fixed request preemption re-indexing in `SchedulingPolicy.PRIORITY` under KV cache pressure ([PR #49206](https://github.com/vllm-project/vllm/pull/49206)).\n\n" +
                      "2. **PyTorch (`pytorch/pytorch`)**: Fixed FX operator return schema annotations ([PR #189142](https://github.com/pytorch/pytorch/pull/189142)) and C++ sparse tensor division-by-zero crash ([PR #190191](https://github.com/pytorch/pytorch/pull/190191)).\n\n" +
                      "3. **DealLens & Tejas-DB**: Asynchronous AI due-diligence engine with 7-step deterministic DAG & hybrid pgvector RAG (RRF); and distributed C++17 KV store (33,685 req/s)."
            };
        }

        // 12. IDENTITY / ME / ABOUT
        if (this.matchesAny(q, ['me', 'who are you', 'who is tejas', 'about', 'bio', 'intro', 'hey', 'hello', 'hi'])) {
            return {
                intent: 'ABOUT',
                text: "Hey, I'm **Tejas** — an AI engineer focused on generative AI, agent infrastructure, and open source.\n\nI enjoy working inside complex systems, solving engineering problems, and contributing improvements upstream."
            };
        }

        // 13. CONTACT / RESUME / LINKS
        if (this.matchesAny(q, ['contact', 'email', 'reach', 'connect', 'resume', 'cv', 'github', 'linkedin'])) {
            return {
                intent: 'CONTACT',
                text: "You can reach me directly at **rajtejas.xyz@gmail.com** or inspect my code and credentials:\n\n" +
                      "• Email: [rajtejas.xyz@gmail.com](mailto:rajtejas.xyz@gmail.com)\n" +
                      "• GitHub: [Tejas-Raj01](https://github.com/Tejas-Raj01)\n" +
                      "• LinkedIn: [Tejas Raj](https://www.linkedin.com/in/tejas-raj-09aa4a236/)\n" +
                      "• Resume: [Download Resume PDF](/resume.pdf)"
            };
        }

        // FALLBACK
        return {
            intent: 'GENERAL',
            text: `I parsed "${this.escapeHtml(rawQuery)}". Feel free to ask about my DealLens financial RAG engine, PyTorch PRs, vLLM inference work, systems projects, or open-source contributions.`
        };
    }

    matchesAny(text, keywords) {
        return keywords.some(kw => text.includes(kw));
    }

    escapeHtml(str) {
        return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}
