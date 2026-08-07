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
                    title: "Editor Stability: Resolve block editor crash during Gallery to Slideshow transformations",
                    status: "Merged PR #50035",
                    prNumber: "50035",
                    problem: "Block editor crash when attempting transformations from Gallery to Slideshow components.",
                    solution: "Normalized event target handling and validated block attribute schemas during state transformations.",
                    url: "https://github.com/Automattic/jetpack/pull/50035",
                    tech: ["TypeScript", "Block Editor", "State Transformations"]
                },
                {
                    title: "API Schema: Update Publicize REST API status schema using oneOf to prevent OpenAPI parser crashes",
                    status: "Merged PR #50030",
                    prNumber: "50030",
                    problem: "Strict OpenAPI parsers crashed due to ambiguous Publicize REST API status schema definitions.",
                    solution: "Refactored REST API schema definitions utilizing polymorphic oneOf schemas.",
                    url: "https://github.com/Automattic/jetpack/pull/50030",
                    tech: ["TypeScript", "REST APIs", "OpenAPI Schema"]
                },
                {
                    title: "Editor Stability: Resolve block editor crash when transforming Gallery back to Tiled Gallery",
                    status: "Merged PR #50025",
                    prNumber: "50025",
                    problem: "State mismatch when reverting Gallery blocks back to Tiled Gallery format.",
                    solution: "Added fallback attribute validation and safe image queue conversion handlers.",
                    url: "https://github.com/Automattic/jetpack/pull/50025",
                    tech: ["TypeScript", "Gutenberg Editor", "UX Stability"]
                },
                {
                    title: "TypeScript Refactoring: Replace string IDs with store objects in useSelect/useDispatch",
                    status: "Merged PR #49810",
                    prNumber: "49810",
                    problem: "String-literal store IDs in Redux-like hooks caused silent runtime failures during store refactoring.",
                    solution: "Updated hook invocations across package components to accept typed store descriptor objects.",
                    url: "https://github.com/Automattic/jetpack/pull/49810",
                    tech: ["TypeScript", "Redux Store", "Type Safety"]
                }
            ]
        },
        {
            repo: "Canonical Snapcraft",
            fullRepo: "canonical/snapcraft",
            category: "Linux Tooling",
            highlights: [
                {
                    title: "Resolve hardcoded linter fallbacks via dynamic build_base resolution across package pipelines",
                    status: "Merged PR #6272",
                    prNumber: "6272",
                    problem: "Hardcoded linter fallbacks in packaging pipelines led to build resolution failures on non-standard host environments.",
                    solution: "Implemented dynamic build_base resolution to detect environment targets dynamically.",
                    url: "https://github.com/canonical/snapcraft/pull/6272",
                    tech: ["Python", "CLI Tooling", "Linux Package Pipelines"]
                },
                {
                    title: "Documentation: Add personal-files interface manual connection notes to Snapcraft tutorial",
                    status: "Merged PR #6269",
                    prNumber: "6269",
                    problem: "Developers encountered permission issues with personal-files security interfaces.",
                    solution: "Added comprehensive manual connection usage notes and security guidelines to official docs.",
                    url: "https://github.com/canonical/snapcraft/pull/6269",
                    tech: ["Documentation", "Linux Security Interfaces"]
                }
            ]
        },
        {
            repo: "CP Editor",
            fullRepo: "cpeditor/cpeditor",
            category: "Developer Tooling",
            highlights: [
                {
                    title: "Global Localization & Search Bug: Translate 3,600+ UI strings via LLM pipeline & fix duplicate search indexing",
                    status: "Merged PR #1501",
                    prNumber: "1501",
                    problem: "Untranslated internationalization strings and duplicate search indexing in desktop search panel.",
                    solution: "Translated 3,600+ UI strings via automated LLM pipeline and deduplicated search indexers.",
                    url: "https://github.com/cpeditor/cpeditor/pull/1501",
                    tech: ["C++", "Qt Framework", "LLM Translation Pipeline"]
                },
                {
                    title: "Ctrl+Scroll Dynamic Font Scaling: Add user configuration toggle in code editor view",
                    status: "Merged PR #1499",
                    prNumber: "1499",
                    problem: "Code editor lacked user-configurable zoom accessibility shortcuts.",
                    solution: "Added Ctrl+Scroll font scaling toggle with configurable sensitivity settings.",
                    url: "https://github.com/cpeditor/cpeditor/pull/1499",
                    tech: ["C++", "Qt Framework", "Editor UX"]
                },
                {
                    title: "Tab Controls: Implement middle-click tab closure interaction logic",
                    status: "Merged PR #1498",
                    prNumber: "1498",
                    problem: "Tab bar lacked intuitive middle-click close interaction.",
                    solution: "Added mouse event filter handlers to trigger tab closure on middle-click.",
                    url: "https://github.com/cpeditor/cpeditor/pull/1498",
                    tech: ["C++", "Qt Event Filters"]
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
