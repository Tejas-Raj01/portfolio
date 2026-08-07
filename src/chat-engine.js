// Tejas Raj — AI Engineer Portfolio Conversational Engine

import { portfolioData } from './portfolio-data.js';

export class PortfolioChatEngine {
    constructor() {
        this.data = portfolioData;
    }

    /**
     * Parses input text and returns a structured response object:
     * { text: string, cards: Array, actions: Array }
     */
    processQuery(rawQuery) {
        const q = (rawQuery || '').toLowerCase().trim();

        // 1. Identity & Intro ("Me", "who are you", "about")
        if (this.matchesAny(q, ['me', 'who are you', 'who is tejas', 'about', 'bio', 'intro', 'hey', 'hello', 'hi'])) {
            return {
                text: "Hey, I'm **Tejas** — an AI engineer focused on generative AI, agent infrastructure, and open source.\n\nI enjoy working inside complex systems, solving engineering problems, and contributing improvements upstream.",
                actions: [
                    { label: "Open Source", query: "Open Source" },
                    { label: "AI Work", query: "AI Work" },
                    { label: "Systems", query: "Systems" }
                ]
            };
        }

        // 2. What do you work on / Focus
        if (this.matchesAny(q, ['what do you work on', 'what do you do', 'focus', 'work', 'interests'])) {
            return {
                text: "My focus is centered on the infrastructure around AI — LLM inference, agent runtimes, tools, memory, and orchestration.",
                actions: [
                    { label: "Explore AI Work", query: "AI Work" },
                    { label: "Open Source", query: "Open Source" },
                    { label: "Systems", query: "Systems" }
                ]
            };
        }

        // 3. Open Source
        if (this.matchesAny(q, ['open source', 'opensource', 'oss', 'contributions', 'prs', 'pull requests', 'github work'])) {
            return {
                text: "I prefer learning systems by working inside the codebases that build them. Here are my actual merged contributions across machine learning frameworks and developer infrastructure:",
                cards: this.data.openSource.map(repoGroup => ({
                    type: 'repo_summary',
                    title: repoGroup.repo,
                    subtitle: repoGroup.category,
                    count: repoGroup.highlights.length,
                    highlights: repoGroup.highlights
                })),
                actions: [
                    { label: "PyTorch PRs", query: "PyTorch" },
                    { label: "vLLM PR", query: "vLLM" },
                    { label: "View /opensource Page", url: "/opensource.html" }
                ]
            };
        }

        // 4. PyTorch
        if (this.matchesAny(q, ['pytorch', 'fx', 'torch', 'pytorch pr'])) {
            const pytorchData = this.data.openSource.find(item => item.repo === 'PyTorch');
            return {
                text: "I've contributed 2 verified merged pull requests to PyTorch (`pytorch/pytorch`):",
                cards: pytorchData ? pytorchData.highlights.map(h => ({
                    type: 'pr_card',
                    repo: 'PyTorch',
                    title: h.title,
                    status: h.status,
                    problem: h.problem,
                    solution: h.solution,
                    url: h.url,
                    tech: h.tech
                })) : [],
                actions: [
                    { label: "vLLM Work", query: "vLLM" },
                    { label: "Systems", query: "Systems" }
                ]
            };
        }

        // 5. vLLM
        if (this.matchesAny(q, ['vllm', 'vllm pr', 'inference engine'])) {
            const vllmData = this.data.openSource.find(item => item.repo === 'vLLM');
            return {
                text: "I've contributed a merged pull request to vLLM (`vllm-project/vllm`), the open-source LLM inference engine:",
                cards: vllmData ? vllmData.highlights.map(h => ({
                    type: 'pr_card',
                    repo: 'vLLM',
                    title: h.title,
                    status: h.status,
                    problem: h.problem,
                    solution: h.solution,
                    url: h.url,
                    tech: h.tech
                })) : [],
                actions: [
                    { label: "PyTorch Work", query: "PyTorch" },
                    { label: "Agent Infrastructure", query: "Agent Infrastructure" }
                ]
            };
        }

        // 6. AI Work
        if (this.matchesAny(q, ['ai work', 'ai', 'genai', 'llm', 'inference', 'agents'])) {
            return {
                text: "My AI engineering work is focused on inference systems, ML frameworks, and agent runtimes:",
                cards: this.data.aiWork.map(item => ({
                    type: 'ai_card',
                    title: item.title,
                    category: item.category,
                    description: item.description,
                    url: item.evidenceUrl,
                    tags: item.tags
                })),
                actions: [
                    { label: "Open Source", query: "Open Source" },
                    { label: "Systems", query: "Systems" }
                ]
            };
        }

        // 7. Systems & Tejas-DB
        if (this.matchesAny(q, ['systems', 'system', 'c++', 'tejas-db', 'database', 'kv store', 'storage'])) {
            return {
                text: "My systems work demonstrates the engineering foundation behind my AI infrastructure direction:",
                cards: this.data.systems.map(sys => ({
                    type: 'systems_card',
                    title: sys.title,
                    subtitle: sys.subtitle,
                    description: sys.description,
                    metrics: sys.metrics,
                    tech: sys.tech,
                    url: sys.url
                })),
                actions: [
                    { label: "AI Work", query: "AI Work" },
                    { label: "Open Source", query: "Open Source" }
                ]
            };
        }

        // 8. Strongest Engineering Work
        if (this.matchesAny(q, ['strongest', 'best work', 'top work', 'strongest work', 'key work', 'evidence'])) {
            return {
                text: "Here is my strongest engineering evidence, prioritized by system impact and open-source contributions:\n\n" +
                      "1. **vLLM (`vllm-project/vllm`)**: Fixed request preemption re-indexing in `SchedulingPolicy.PRIORITY` under KV cache pressure ([PR #49206](https://github.com/vllm-project/vllm/pull/49206)).\n\n" +
                      "2. **PyTorch (`pytorch/pytorch`)**: Fixed FX operator return schema annotations ([PR #189142](https://github.com/pytorch/pytorch/pull/189142)) and C++ sparse tensor division-by-zero crash ([PR #190191](https://github.com/pytorch/pytorch/pull/190191)).\n\n" +
                      "3. **Tejas-DB**: High-performance C++17 distributed KV store featuring 33,685 req/s throughput, Write-Ahead Logging (WAL), Gossip protocol, and Quorum consensus.",
                actions: [
                    { label: "Open Source", query: "Open Source" },
                    { label: "AI Work", query: "AI Work" },
                    { label: "Systems", query: "Systems" }
                ]
            };
        }

        // 9. Building toward / Future direction
        if (this.matchesAny(q, ['building toward', 'future', 'direction', 'next', 'vision', 'roadmap'])) {
            return {
                text: "**AI infrastructure and agentic systems.**\n\nSpecifically, I'm building toward:\n" +
                      "• **LLM Inference Optimization**: High-throughput memory management & request scheduling\n" +
                      "• **Agent Runtimes**: Execution gateways, tool schemas, and sandboxing\n" +
                      "• **Persistent Context & Memory**: Long-term retrieval and session state\n" +
                      "• **Multi-Agent Orchestration**: Decentralized routing and consensus",
                actions: [
                    { label: "Agent Infrastructure", query: "Agent Infrastructure" },
                    { label: "Open Source", query: "Open Source" }
                ]
            };
        }

        // 10. OpenClaw
        if (this.matchesAny(q, ['openclaw', 'claw', 'agent infrastructure'])) {
            return {
                text: `${this.data.openclaw.statusText}\n\n${this.data.openclaw.exploreNotice}`,
                actions: [
                    { label: "AI Work", query: "AI Work" },
                    { label: "Open Source", query: "Open Source" }
                ]
            };
        }

        // 11. Contact / Resume / Links
        if (this.matchesAny(q, ['contact', 'email', 'reach', 'connect', 'resume', 'cv', 'github', 'linkedin'])) {
            return {
                text: "You can reach me directly or explore my code and credentials below:",
                actions: [
                    { label: "Copy Email", action: "copy-email", value: this.data.identity.email },
                    { label: "Resume PDF", action: "open-resume" },
                    { label: "GitHub Profile", url: this.data.identity.github },
                    { label: "LinkedIn Profile", url: this.data.identity.linkedin }
                ]
            };
        }

        // Fallback matching
        return {
            text: `I parsed "${this.escapeHtml(rawQuery)}". Here is a high-level summary of Tejas's work as an AI Engineer:`,
            actions: [
                { label: "Me", query: "Me" },
                { label: "Open Source", query: "Open Source" },
                { label: "AI Work", query: "AI Work" },
                { label: "Systems", query: "Systems" },
                { label: "Contact", query: "Contact" }
            ]
        };
    }

    matchesAny(text, keywords) {
        return keywords.some(kw => text.includes(kw));
    }

    escapeHtml(str) {
        return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}
