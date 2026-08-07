// Tejas Raj — AI Engineer Portfolio Data Model

export const portfolioData = {
    identity: {
        name: "Tejas Raj",
        role: "AI ENGINEER",
        tagline: "Generative AI · Agent Infrastructure · Open Source",
        bio: "I'm Tejas, an AI engineer focused on generative AI, agent infrastructure, and open source. I enjoy working inside complex systems, solving engineering problems, and contributing improvements upstream.",
        email: "rajtejas.xyz@gmail.com",
        github: "https://github.com/Tejas-Raj01",
        linkedin: "https://www.linkedin.com/in/tejas-raj-09aa4a236/",
        resumePdf: "/resume.pdf"
    },

    me: {
        headline: "AI Engineer focused on generative AI, agent infrastructure, and open source.",
        description: "I enjoy working inside complex systems, solving deep engineering problems, and contributing improvements upstream. My work spans machine learning frameworks (PyTorch), LLM inference engines (vLLM), distributed key-value storage (Tejas-DB), and open-source developer tooling.",
        focusAreas: [
            "Generative AI & LLM Inference",
            "Agent Runtimes, Memory & Tool Schemas",
            "Distributed Storage & Systems Engineering",
            "Upstream Open Source Infrastructure"
        ]
    },

    openSource: [
        {
            repo: "vLLM",
            fullRepo: "vllm-project/vllm",
            category: "LLM Inference Infrastructure",
            highlights: [
                {
                    title: "Fix request index preemption misalignment in SchedulingPolicy.PRIORITY",
                    status: "Merged PR #49206",
                    prNumber: "49206",
                    problem: "In SchedulingPolicy.PRIORITY, request preemption caused request index misalignment in waiting queues during KV cache memory pressure, causing silent request skipping.",
                    solution: "Corrected preemption re-indexing calculations in vllm/core/policy.py to preserve strict priority queue ordering.",
                    url: "https://github.com/vllm-project/vllm/pull/49206",
                    tech: ["Python", "PyTorch", "LLM Inference", "KV Cache Eviction"]
                }
            ]
        },
        {
            repo: "PyTorch",
            fullRepo: "pytorch/pytorch",
            category: "Core Machine Learning Framework",
            highlights: [
                {
                    title: "Fix return_annotation schema for tuple-returning operators in PyTorch FX",
                    status: "Merged PR #189142",
                    prNumber: "189142",
                    problem: "Incorrect return_annotation schema for tuple-returning ops in PyTorch FX graph tracer causing static type checker failures in downstream tools.",
                    solution: "Updated FX operator schema definitions to accurately return tuple type annotations.",
                    url: "https://github.com/pytorch/pytorch/pull/189142",
                    tech: ["Python", "FX Graph Tracer", "Compiler Schemas"]
                },
                {
                    title: "Fix floating-point division-by-zero crash in sparse_compressed_to_dense",
                    status: "Merged PR #190191",
                    prNumber: "190191",
                    problem: "Hard C++ division-by-zero crash when converting malformed BSR compressed sparse tensors.",
                    solution: "Added boundary checks and safe division handling in C++/Python sparse tensor conversion operations.",
                    url: "https://github.com/pytorch/pytorch/pull/190191",
                    tech: ["C++", "Python", "Sparse Tensors", "Error Handling"]
                }
            ]
        },
        {
            repo: "Automattic Jetpack",
            fullRepo: "Automattic/jetpack",
            category: "Open-Source Infrastructure (9 Merged PRs)",
            highlights: [
                {
                    title: "Editor Stability & REST API Schema fixes",
                    status: "9 Merged PRs",
                    prNumber: "50035+",
                    problem: "Block editor crashes during transformations, REST API schema parsing failures, and TypeScript type safety gaps.",
                    solution: "Resolved block transformations, updated Publicize REST API status using oneOf to prevent OpenAPI parser crashes, and refactored string IDs to store objects.",
                    url: "https://github.com/Automattic/jetpack/pulls?q=is%3Apr+author%3ATejas-Raj01",
                    tech: ["TypeScript", "REST APIs", "OpenAPI", "State Management"]
                }
            ]
        },
        {
            repo: "Canonical Snapcraft",
            fullRepo: "canonical/snapcraft",
            category: "Linux Tooling",
            highlights: [
                {
                    title: "Dynamic build_base resolution across package pipelines",
                    status: "Merged PR #6272",
                    prNumber: "6272",
                    problem: "Hardcoded linter fallbacks across snapcraft packaging pipelines.",
                    solution: "Implemented dynamic build_base resolution to detect environment targets dynamically.",
                    url: "https://github.com/canonical/snapcraft/pull/6272",
                    tech: ["Python", "CLI Tooling", "Linux Package Pipelines"]
                }
            ]
        },
        {
            repo: "CP Editor",
            fullRepo: "cpeditor/cpeditor",
            category: "Developer Tooling",
            highlights: [
                {
                    title: "LLM Translation Pipeline, Dynamic Font Scaling & Tab Closure",
                    status: "3 Merged PRs (#1501, #1499, #1498)",
                    prNumber: "1501",
                    problem: "Missing internationalization strings, lack of zoom toggles, and rigid tab interactions.",
                    solution: "Translated 3,600+ UI strings via automated LLM pipeline, added Ctrl+Scroll font scaling toggle, and added middle-click tab closure.",
                    url: "https://github.com/cpeditor/cpeditor/pull/1501",
                    tech: ["C++", "Qt Framework", "LLM Pipeline", "Desktop UX"]
                }
            ]
        }
    ],

    aiWork: [
        {
            title: "vLLM Request Preemption Fix",
            category: "LLM Inference Infrastructure",
            description: "Debugging and fixing priority queue re-indexing in vLLM's core scheduling policy during KV cache memory preemption.",
            evidenceUrl: "https://github.com/vllm-project/vllm/pull/49206",
            tags: ["LLM Inference", "vLLM", "KV Cache", "Python/PyTorch"]
        },
        {
            title: "PyTorch FX Graph Operator Schemas",
            category: "ML Framework & Graph Tracing",
            description: "Fixing return type annotation schemas in PyTorch FX operator tracer for downstream compiler and static analysis tools.",
            evidenceUrl: "https://github.com/pytorch/pytorch/pull/189142",
            tags: ["PyTorch", "FX Graph Tracer", "Compilers", "Python"]
        },
        {
            title: "Agent Infrastructure Exploration",
            category: "Agent Runtimes & Tooling",
            description: "Designing and building runtime architectures for agentic AI: model orchestration, tool definitions, session persistence, and memory retrieval.",
            tags: ["Agentic AI", "Tool Use", "Memory", "Orchestration"]
        }
    ],

    systems: [
        {
            title: "Tejas-DB",
            subtitle: "Distributed Key-Value Store built in C++17",
            description: "A high-performance decentralized storage system featuring fine-grained C++ concurrency control, Write-Ahead Logging (WAL) for durability, Gossip protocol for cluster membership, and Quorum consensus for distributed reads and writes.",
            metrics: [
                "33,685 req/s throughput",
                "~2.97 ms average latency",
                "100 concurrent worker threads"
            ],
            tech: ["C++17", "Distributed Systems", "WAL Engine", "Gossip Protocol", "Quorum Consensus"],
            url: "https://github.com/Tejas-Raj01/distributed-system"
        }
    ],

    openclaw: {
        statusText: "Current focus: Open-source agent infrastructure, with OpenClaw (openclaw.ai & docs.openclaw.ai) as a key area I'm exploring.",
        exploreNotice: "Focused on agent runtimes, tool schemas, memory retrieval, and multi-agent routing.",
        prs: []
    },

    futureDirection: {
        title: "AI Infrastructure & Agentic Systems",
        description: "My long-term direction is centered around building the infrastructure layer for AI — fast LLM inference, robust agent runtimes, tool schemas, persistent memory, and distributed orchestration.",
        topics: [
            "LLM Inference Optimization",
            "Agent Runtimes & Execution Gateways",
            "Tool Schemas & Function Calling",
            "Persistent Context & Memory Retrieval",
            "Distributed Multi-Agent Systems",
            "Open-Source AI Infrastructure"
        ]
    }
};
