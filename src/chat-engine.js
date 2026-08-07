// Tejas Raj — AI Engineer Portfolio Conversational Intent Engine
// Principles: Single Intent -> Focused Response -> Relevant Evidence Only (No Topic Mixing)

import { portfolioData } from './portfolio-data.js';

export class PortfolioChatEngine {
    constructor() {
        this.data = portfolioData;
    }

    /**
     * Parses user query and returns a strictly topic-focused response object:
     * { intent: string, text: string, cards: Array, actions: Array }
     */
    processQuery(rawQuery) {
        const q = (rawQuery || '').toLowerCase().trim();

        // 1. PYTORCH (Strictly PyTorch only)
        if (this.matchesAny(q, ['pytorch', 'fx', 'torch', 'sparse tensor', 'return_annotation'])) {
            const pytorchData = this.data.openSource.find(item => item.repo === 'PyTorch');
            return {
                intent: 'PYTORCH',
                text: "I've contributed two verified pull requests merged into PyTorch (`pytorch/pytorch`):",
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
                    { label: "What about vLLM?", query: "What have you contributed to vLLM?" },
                    { label: "Show systems work", query: "What systems projects have you built?" }
                ]
            };
        }

        // 2. VLLM (Strictly vLLM only)
        if (this.matchesAny(q, ['vllm', 'vllm pr', 'inference engine', 'schedulingpolicy'])) {
            const vllmData = this.data.openSource.find(item => item.repo === 'vLLM');
            return {
                intent: 'VLLM',
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
                    { label: "What about PyTorch?", query: "What have you contributed to PyTorch?" },
                    { label: "Tell me about OpenClaw", query: "Tell me about OpenClaw" }
                ]
            };
        }

        // 3. OPENCLAW (Strictly OpenClaw only)
        if (this.matchesAny(q, ['openclaw', 'claw'])) {
            return {
                intent: 'OPENCLAW',
                text: `${this.data.openclaw.statusText}\n\n${this.data.openclaw.exploreNotice}`,
                actions: [
                    { label: "Show AI work", query: "What is your AI work?" },
                    { label: "Show open source", query: "Show me your open-source contributions" }
                ]
            };
        }

        // 4. SYSTEMS / TEJAS-DB (Strictly Systems only)
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
                })),
                actions: [
                    { label: "Show AI work", query: "What is your AI work?" },
                    { label: "Show open source", query: "Show me your open-source contributions" }
                ]
            };
        }

        // 5. OPEN SOURCE OVERVIEW (All open source repos)
        if (this.matchesAny(q, ['open source', 'opensource', 'oss', 'contributions', 'prs', 'pull requests', 'github work'])) {
            return {
                intent: 'OPEN_SOURCE',
                text: "I prefer learning systems by working inside the codebases that build them. Here are my actual merged contributions across machine learning frameworks and developer infrastructure:",
                cards: this.data.openSource.map(repoGroup => ({
                    type: 'repo_summary',
                    title: repoGroup.repo,
                    subtitle: repoGroup.category,
                    count: repoGroup.highlights.length,
                    highlights: repoGroup.highlights
                })),
                actions: [
                    { label: "PyTorch details", query: "What have you contributed to PyTorch?" },
                    { label: "vLLM details", query: "What have you contributed to vLLM?" }
                ]
            };
        }

        // 6. AI WORK
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
                })),
                actions: [
                    { label: "Show PyTorch work", query: "What have you contributed to PyTorch?" },
                    { label: "Show vLLM work", query: "What have you contributed to vLLM?" }
                ]
            };
        }

        // 7. STRONGEST ENGINEERING WORK
        if (this.matchesAny(q, ['strongest', 'best work', 'top work', 'strongest work', 'key work', 'evidence'])) {
            return {
                intent: 'STRONGEST_WORK',
                text: "My strongest engineering evidence is centered on core AI infrastructure, open source, and low-level systems:\n\n" +
                      "1. **vLLM (`vllm-project/vllm`)**: Fixed request preemption re-indexing in `SchedulingPolicy.PRIORITY` under KV cache pressure ([PR #49206](https://github.com/vllm-project/vllm/pull/49206)).\n\n" +
                      "2. **PyTorch (`pytorch/pytorch`)**: Fixed FX operator return schema annotations ([PR #189142](https://github.com/pytorch/pytorch/pull/189142)) and C++ sparse tensor division-by-zero crash ([PR #190191](https://github.com/pytorch/pytorch/pull/190191)).\n\n" +
                      "3. **Tejas-DB**: High-performance C++17 distributed KV store featuring 33,685 req/s throughput, Write-Ahead Logging (WAL), Gossip protocol, and Quorum consensus.",
                actions: [
                    { label: "Show PyTorch PRs", query: "What have you contributed to PyTorch?" },
                    { label: "Show vLLM PR", query: "What have you contributed to vLLM?" }
                ]
            };
        }

        // 8. BUILDING TOWARD / FUTURE DIRECTION
        if (this.matchesAny(q, ['building toward', 'future', 'direction', 'next', 'vision', 'roadmap'])) {
            return {
                intent: 'FUTURE_DIRECTION',
                text: "**AI infrastructure and agentic systems.**\n\nSpecifically, I'm building toward:\n" +
                      "• **LLM Inference Optimization**: High-throughput memory management & request scheduling\n" +
                      "• **Agent Runtimes**: Execution gateways, tool schemas, and sandboxing\n" +
                      "• **Persistent Context & Memory**: Long-term retrieval and session state\n" +
                      "• **Multi-Agent Orchestration**: Decentralized routing and consensus",
                actions: [
                    { label: "Tell me about OpenClaw", query: "Tell me about OpenClaw" },
                    { label: "Show AI work", query: "What is your AI work?" }
                ]
            };
        }

        // 9. IDENTITY / ME / ABOUT
        if (this.matchesAny(q, ['me', 'who are you', 'who is tejas', 'about', 'bio', 'intro', 'hey', 'hello', 'hi'])) {
            return {
                intent: 'ABOUT',
                text: "Hey, I'm **Tejas** — an AI engineer focused on generative AI, agent infrastructure, and open source.\n\nI enjoy working inside complex systems, solving engineering problems, and contributing improvements upstream.",
                actions: [
                    { label: "Show open source", query: "Show me your open-source contributions" },
                    { label: "Show AI work", query: "What is your AI work?" }
                ]
            };
        }

        // 10. CONTACT / RESUME / LINKS
        if (this.matchesAny(q, ['contact', 'email', 'reach', 'connect', 'resume', 'cv', 'github', 'linkedin'])) {
            return {
                intent: 'CONTACT',
                text: "You can reach me directly or inspect my credentials below:",
                actions: [
                    { label: "Copy Email", action: "copy-email", value: this.data.identity.email },
                    { label: "Resume PDF", action: "open-resume" },
                    { label: "GitHub Profile", url: this.data.identity.github },
                    { label: "LinkedIn Profile", url: this.data.identity.linkedin }
                ]
            };
        }

        // FALLBACK
        return {
            intent: 'GENERAL',
            text: `I parsed "${this.escapeHtml(rawQuery)}". Feel free to ask about my PyTorch PRs, vLLM inference work, systems engineering, or open source contributions.`,
            actions: [
                { label: "PyTorch contributions", query: "What have you contributed to PyTorch?" },
                { label: "vLLM contributions", query: "What have you contributed to vLLM?" },
                { label: "Systems work", query: "What systems projects have you built?" }
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
