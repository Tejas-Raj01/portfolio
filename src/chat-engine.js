// Tejas Raj — AI Engineer Portfolio Conversational Intent Engine
// Principles: Single Intent -> Focused Response -> Relevant Evidence Only (No Cross-Topic Action Links)

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

        // 1. PYTORCH (Strictly PyTorch only)
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
                    tech: h.tech
                })) : []
            };
        }

        // 2. VLLM (Strictly vLLM only)
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
                    tech: h.tech
                })) : []
            };
        }

        // 3. JETPACK (Strictly Jetpack only)
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
                    tech: h.tech
                })) : []
            };
        }

        // 4. SNAPCRAFT (Strictly Snapcraft only)
        if (this.matchesAny(q, ['snapcraft', 'canonical'])) {
            const repoData = this.data.openSource.find(item => item.repo === 'Canonical Snapcraft');
            return {
                intent: 'SNAPCRAFT',
                text: "I've contributed merged pull requests to Canonical Snapcraft (`canonical/snapcraft`):",
                cards: repoData ? repoData.highlights.map(h => ({
                    type: 'pr_card',
                    repo: 'Canonical Snapcraft',
                    title: h.title,
                    status: h.status,
                    problem: h.problem,
                    solution: h.solution,
                    url: h.url,
                    tech: h.tech
                })) : []
            };
        }

        // 5. CP EDITOR (Strictly CP Editor only)
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
                    tech: h.tech
                })) : []
            };
        }

        // 6. OPEN SOURCE OVERVIEW (All open source repos rendered with full PR cards)
        if (this.matchesAny(q, ['open source', 'opensource', 'oss', 'contributions', 'prs', 'pull requests', 'github work'])) {
            const allPrCards = [];
            this.data.openSource.forEach(group => {
                group.highlights.forEach(h => {
                    allPrCards.push({
                        type: 'pr_card',
                        repo: group.repo,
                        title: h.title,
                        status: h.status,
                        problem: h.problem,
                        solution: h.solution,
                        url: h.url,
                        tech: h.tech
                    });
                });
            });

            return {
                intent: 'OPEN_SOURCE',
                text: "I prefer learning systems by working inside the codebases that build them. Here are my actual verified upstream contributions merged across machine learning frameworks and developer infrastructure:",
                cards: allPrCards
            };
        }

        // 7. OPENCLAW (Strictly OpenClaw only)
        if (this.matchesAny(q, ['openclaw', 'claw'])) {
            return {
                intent: 'OPENCLAW',
                text: `${this.data.openclaw.statusText}\n\n${this.data.openclaw.exploreNotice}`
            };
        }

        // 8. SYSTEMS / TEJAS-DB (Strictly Systems only)
        if (this.matchesAny(q, ['systems', 'system', 'c++', 'tejas-db', 'database', 'kv store', 'storage'])) {
            return {
                intent: 'SYSTEMS',
                text: "My systems work demonstrates the engineering foundation behind my AI infrastructure direction:",
                cards: this.data.systems.map(sys => ({
                    type: 'systems_card',
                    title: sys.title,
                    subtitle: sys.subtitle,
                    description: sys.description,
                    metrics: sys.metrics,
                    tech: sys.tech,
                    url: sys.url
                }))
            };
        }

        // 9. AI WORK
        if (this.matchesAny(q, ['ai work', 'genai', 'llm', 'inference', 'agent infrastructure', 'agent runtimes'])) {
            return {
                intent: 'AI_WORK',
                text: "My AI engineering work is focused on inference infrastructure, ML frameworks, and agent runtimes:",
                cards: this.data.aiWork.map(item => ({
                    type: 'ai_card',
                    title: item.title,
                    category: item.category,
                    description: item.description,
                    url: item.evidenceUrl,
                    tags: item.tags
                }))
            };
        }

        // 10. STRONGEST ENGINEERING WORK
        if (this.matchesAny(q, ['strongest', 'best work', 'top work', 'strongest work', 'key work', 'evidence'])) {
            return {
                intent: 'STRONGEST_WORK',
                text: "My strongest engineering evidence is centered on core AI infrastructure, open source, and low-level systems:\n\n" +
                      "1. **vLLM (`vllm-project/vllm`)**: Fixed request preemption re-indexing in `SchedulingPolicy.PRIORITY` under KV cache pressure ([PR #49206](https://github.com/vllm-project/vllm/pull/49206)).\n\n" +
                      "2. **PyTorch (`pytorch/pytorch`)**: Fixed FX operator return schema annotations ([PR #189142](https://github.com/pytorch/pytorch/pull/189142)) and C++ sparse tensor division-by-zero crash ([PR #190191](https://github.com/pytorch/pytorch/pull/190191)).\n\n" +
                      "3. **Tejas-DB**: High-performance C++17 distributed KV store featuring 33,685 req/s throughput, Write-Ahead Logging (WAL), Gossip protocol, and Quorum consensus."
            };
        }

        // 11. BUILDING TOWARD / FUTURE DIRECTION
        if (this.matchesAny(q, ['building toward', 'future', 'direction', 'next', 'vision', 'roadmap'])) {
            return {
                intent: 'FUTURE_DIRECTION',
                text: "**AI infrastructure and agentic systems.**\n\nSpecifically, I'm building toward:\n" +
                      "• **LLM Inference Optimization**: High-throughput memory management & request scheduling\n" +
                      "• **Agent Runtimes**: Execution gateways, tool schemas, and sandboxing\n" +
                      "• **Persistent Context & Memory**: Long-term retrieval and session state\n" +
                      "• **Multi-Agent Orchestration**: Decentralized routing and consensus"
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
            text: `I parsed "${this.escapeHtml(rawQuery)}". Feel free to ask about my PyTorch PRs, vLLM inference work, systems engineering, or open-source contributions.`
        };
    }

    matchesAny(text, keywords) {
        return keywords.some(kw => text.includes(kw));
    }

    escapeHtml(str) {
        return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}
