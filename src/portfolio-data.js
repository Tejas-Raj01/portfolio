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
        description: "I enjoy working inside complex systems, solving deep engineering problems, and contributing improvements upstream. My work spans machine learning frameworks (PyTorch), LLM inference engines (vLLM), distributed key-value storage (Tejas-DB), AI Job Platform, and open-source developer tooling.",
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
            prSearchUrl: "https://github.com/vllm-project/vllm/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Fixed request preemption index misalignment in SchedulingPolicy.PRIORITY under KV cache memory pressure.",
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
            prSearchUrl: "https://github.com/pytorch/pytorch/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Contributed 2 merged PRs addressing PyTorch FX operator return annotations and C++ sparse tensor division-by-zero crashes.",
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
            prSearchUrl: "https://github.com/Automattic/jetpack/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Contributed 9 merged PRs across Gutenberg block editor stability, REST API schemas, and TypeScript refactoring.",
            totalPrCount: 9,
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
            prSearchUrl: "https://github.com/canonical/snapcraft/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Contributed merged PRs for dynamic build_base resolution across Linux package build pipelines.",
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
            prSearchUrl: "https://github.com/cpeditor/cpeditor/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Contributed 3 merged PRs for automated LLM translation pipelines, dynamic font scaling, and tab controls.",
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

    // AI Work: Strictly AI Job Platform ONLY
    aiWork: [
        {
            title: "AI Job Platform",
            subtitle: "AI-Powered Career Intelligence Platform",
            category: "AI Platform & Career Intelligence",
            description: "Architected a decoupled, scalable AI-integrated software platform utilizing FastAPI and React.js, processing unstructured resumes and automating real-time job discovery via async Celery workers and Redis. Engineered a memory-optimized semantic matching engine evaluating results using scikit-learn TF-IDF and Cosine Similarity to calculate precise compatibility in milliseconds. Developed fault-tolerant engineering solutions using Groq API and LangChain with dynamic active-model fallback loops.",
            githubUrl: "https://github.com/Tejas-Raj01",
            liveUrl: "https://portfolio-liart-eta-34.vercel.app/",
            tags: ["Python", "FastAPI", "React", "PostgreSQL", "Celery/Redis", "scikit-learn TF-IDF", "LangChain/Groq"]
        }
    ],

    // Systems Work: Strictly Distributed Key-Value Database (Tejas-DB) ONLY
    systems: [
        {
            title: "Distributed Key-Value Database (Tejas-DB)",
            subtitle: "Decentralized Storage Engine built in C++17",
            description: "Architected a decentralized, peer-to-peer key-value storage solution in C++, leveraging Consistent Hashing for balanced data partitioning and a Gossip Protocol for autonomous node discovery. Engineered a high-performance concurrent engine using multi-threading and std::shared_mutex. Implemented tunable Quorum Replication (N, W, R) for customizable consistency levels and Write-Ahead Log (WAL) crash recovery. Developed a real-time React.js visualization tool integrated with Ngrok tunneling to execute stress tests and Chaos Engineering validation.",
            metrics: [
                "33,685 req/s throughput",
                "~2.97 ms average latency",
                "100 concurrent worker threads"
            ],
            tech: ["C++17", "React.js", "Multithreading", "Networking", "WAL Engine", "Gossip Protocol", "Quorum Consensus"],
            githubUrl: "https://github.com/Tejas-Raj01/distributed-system",
            liveUrl: "https://github.com/Tejas-Raj01/distributed-system"
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
