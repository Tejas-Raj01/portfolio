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
        description: "I enjoy working inside complex systems, solving deep engineering problems, and contributing improvements upstream. My work spans machine learning frameworks (PyTorch), LLM inference engines (vLLM), production financial RAG workflow engines (DealLens), distributed key-value storage (Tejas-DB), AI Job Platform, and open-source developer tooling.",
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
            summary: "Contributed bug fixes and performance improvements for request preemption, KV cache transfer, and memory profiling.",
            highlights: [
                {
                    title: "fix: resolve memory profiler under-prediction for GDN/Mamba hybrid models",
                    status: "Open PR #52935",
                    prNumber: "52935",
                    url: "https://github.com/vllm-project/vllm/pull/52935"
                },
                {
                    title: "[Core] Fix EngineDeadError on late KV transfer completion",
                    status: "Open PR #49278",
                    prNumber: "49278",
                    url: "https://github.com/vllm-project/vllm/pull/49278"
                },
                {
                    title: "fix: resolve silent request skipping in PRIORITY scheduling",
                    status: "Merged PR #49206",
                    prNumber: "49206",
                    problem: "In SchedulingPolicy.PRIORITY, request preemption caused request index misalignment in waiting queues during KV cache memory pressure, causing silent request skipping.",
                    solution: "Corrected preemption re-indexing calculations in vllm/core/policy.py to preserve strict priority queue ordering.",
                    url: "https://github.com/vllm-project/vllm/pull/49206"
                },
                {
                    title: "[Bugfix] Fix MiniMax M3 index_topk kernel for non-power-of-2 num_idx_heads",
                    status: "Open PR #49199",
                    prNumber: "49199",
                    url: "https://github.com/vllm-project/vllm/pull/49199"
                },
                {
                    title: "perf: Cache staging buffer in structured output to fix memory regression",
                    status: "Merged PR #49168",
                    prNumber: "49168",
                    url: "https://github.com/vllm-project/vllm/pull/49168"
                }
            ]
        },
        {
            repo: "PyTorch",
            fullRepo: "pytorch/pytorch",
            category: "Core Machine Learning Framework",
            prSearchUrl: "https://github.com/pytorch/pytorch/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Contributed merged PRs addressing PyTorch FX operator annotations and C++ sparse tensor crashes, with ongoing work in inductor fusions.",
            highlights: [
                {
                    title: "sparse: Fix FPE in sparse_compressed_to_dense for malformed BSR tensors",
                    status: "Merged PR #190191",
                    prNumber: "190191",
                    problem: "Hard C++ division-by-zero crash when converting malformed BSR compressed sparse tensors.",
                    solution: "Added boundary checks and safe division handling in C++/Python sparse tensor conversion operations.",
                    url: "https://github.com/pytorch/pytorch/pull/190191"
                },
                {
                    title: "sparse: Fix ASan crash in sparse_compressed_to_dense for malformed CPU inputs",
                    status: "Merged PR #190067",
                    prNumber: "190067",
                    url: "https://github.com/pytorch/pytorch/pull/190067"
                },
                {
                    title: "inductor: Fall back to ATen for torch.cat with symbolic non-leading dims",
                    status: "Open PR #190034",
                    prNumber: "190034",
                    url: "https://github.com/pytorch/pytorch/pull/190034"
                },
                {
                    title: "fx: Fix incorrect return_annotation for tuple types in operator schemas",
                    status: "Merged PR #189142",
                    prNumber: "189142",
                    problem: "Incorrect return_annotation schema for tuple-returning ops in PyTorch FX graph tracer causing static type checker failures in downstream tools.",
                    solution: "Updated FX operator schema definitions to accurately return tuple type annotations.",
                    url: "https://github.com/pytorch/pytorch/pull/189142"
                },
                {
                    title: "inductor: Fix non-deterministic gradients in slice_scatter backward fusion",
                    status: "Open PR #189129",
                    prNumber: "189129",
                    url: "https://github.com/pytorch/pytorch/pull/189129"
                }
            ]
        },
        {
            repo: "Automattic Jetpack",
            fullRepo: "Automattic/jetpack",
            category: "Open-Source Infrastructure",
            prSearchUrl: "https://github.com/Automattic/jetpack/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Significant contributor with over 10 merged PRs improving Gutenberg block editor stability, REST APIs, and Map Block functionality.",
            highlights: [
                {
                    title: "Map Block: Add Enter key functionality to insert new blocks",
                    status: "Open PR #51080",
                    prNumber: "51080",
                    url: "https://github.com/Automattic/jetpack/pull/51080"
                },
                {
                    title: "Map Block: Add wide and full width alignment support",
                    status: "Merged PR #50818",
                    prNumber: "50818",
                    problem: "No alignment controls were available for the Map block toolbar, preventing users from making the map span wider or fully across the page content area.",
                    solution: "Added wide and full alignment support to the Map block by updating its block.json file to expose UI controls in the editor.",
                    url: "https://github.com/Automattic/jetpack/pull/50818"
                },
                {
                    title: "Fix: Normalize event target for Carousel on attachment links",
                    status: "Merged PR #50220",
                    prNumber: "50220",
                    url: "https://github.com/Automattic/jetpack/pull/50220"
                },
                {
                    title: "Editor Stability: Resolve block editor crash during Gallery to Slideshow transformations",
                    status: "Merged PR #50035",
                    prNumber: "50035",
                    problem: "Block editor crash when attempting transformations from Gallery to Slideshow components.",
                    solution: "Normalized event target handling and validated block attribute schemas during state transformations.",
                    url: "https://github.com/Automattic/jetpack/pull/50035"
                }
            ]
        },
        {
            repo: "Canonical Craft Parts",
            fullRepo: "canonical/craft-parts",
            category: "Linux Packaging Subsystem",
            prSearchUrl: "https://github.com/canonical/craft-parts/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Fixed self-linking file deletion bug in link_or_copy utility used across Canonical build toolchains.",
            highlights: [
                {
                    title: "Prevent file deletion during self-linking in link_or_copy",
                    status: "Merged PR #1628",
                    prNumber: "1628",
                    problem: "In link_or_copy, if source and destination resolved to the same physical file (e.g. via a staged symlink), catching EEXIST and unlinking destination accidentally deleted the source file itself.",
                    solution: "Added a samefile() check in craft_parts/utils/file_utils.py to return early and safely ignore self-linking collisions without crashing or deleting the source file.",
                    url: "https://github.com/canonical/craft-parts/pull/1628"
                }
            ]
        },
        {
            repo: "Canonical Snapcraft",
            fullRepo: "canonical/snapcraft",
            category: "Linux Tooling",
            prSearchUrl: "https://github.com/canonical/snapcraft/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Contributed merged PRs for dynamic build_base resolution and documentation improvements.",
            highlights: [
                {
                    title: "feat(remote-build): add --project-dir argument to support build paths",
                    status: "Open PR #6372",
                    prNumber: "6372",
                    url: "https://github.com/canonical/snapcraft/pull/6372"
                },
                {
                    title: "Resolve hardcoded linter fallbacks via dynamic build_base resolution across package pipelines",
                    status: "Merged PR #6272",
                    prNumber: "6272",
                    problem: "Hardcoded linter fallbacks in packaging pipelines led to build resolution failures on non-standard host environments.",
                    solution: "Implemented dynamic build_base resolution to detect environment targets dynamically.",
                    url: "https://github.com/canonical/snapcraft/pull/6272"
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
                    url: "https://github.com/cpeditor/cpeditor/pull/1501"
                },
                {
                    title: "Ctrl+Scroll Dynamic Font Scaling: Add user configuration toggle in code editor view",
                    status: "Merged PR #1499",
                    prNumber: "1499",
                    url: "https://github.com/cpeditor/cpeditor/pull/1499"
                }
            ]
        },
        {
            repo: "Future-AGI",
            fullRepo: "future-agi/future-agi",
            category: "Agent AI Platform",
            prSearchUrl: "https://github.com/future-agi/future-agi/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Implementing robust alert mechanisms and DragonflyDB support.",
            highlights: [
                {
                    title: "feat(alerts): add webhook notification support for user alerts",
                    status: "Open PR #2147",
                    prNumber: "2147",
                    url: "https://github.com/future-agi/future-agi/pull/2147"
                },
                {
                    title: "feat: Add DragonflyDB support as a Redis-compatible backend",
                    status: "Open PR #2142",
                    prNumber: "2142",
                    url: "https://github.com/future-agi/future-agi/pull/2142"
                }
            ]
        },
        {
            repo: "Microsoft VS Code",
            fullRepo: "microsoft/vscode",
            category: "Developer Tooling",
            prSearchUrl: "https://github.com/microsoft/vscode/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Core contributor working on custom editor stability.",
            highlights: [
                {
                    title: "Fix: Prevent Shift key from intercepting shortcuts in Web Custom Editors",
                    status: "Open PR #322680",
                    prNumber: "322680",
                    url: "https://github.com/microsoft/vscode/pull/322680"
                }
            ]
        },
        {
            repo: "OpenClaw",
            fullRepo: "openclaw/openclaw",
            category: "Agent Infrastructure",
            prSearchUrl: "https://github.com/openclaw/openclaw/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Exploring concurrency mechanisms for thread liveness.",
            highlights: [
                {
                    title: "fix(codex): verify thread liveness before deferring automatic compaction",
                    status: "Open PR #120545",
                    prNumber: "120545",
                    url: "https://github.com/openclaw/openclaw/pull/120545"
                }
            ]
        }
    ],

    // AI Work: Production AI Engines & Platforms
    aiWork: [
        {
            title: "DealLens",
            subtitle: "AI Investment Research & Due-Diligence Workflow Engine",
            category: "AI & Financial RAG Engine",
            description: "Architected a production-grade asynchronous AI backend for automated corporate investment due-diligence and financial document research (10-Ks, Annual Reports, Pitch Decks). Engineered a deterministic 7-step DAG workflow state machine (Validation → Entity Extraction → Financial Performance → Risk Analysis → Evidence Retrieval → Claim Verification → Report Generation) replacing fragile agent loops. Built a PostgreSQL 16 + pgvector hybrid search engine combining dense Cosine Distance embeddings and sparse tsvector keyword search via Reciprocal Rank Fusion (RRF). Implemented page-aware 1-indexed PDF chunking, S3/MinIO deduplication, and a custom CitationVerifier guardrail to eliminate LLM hallucinations with strict source provenance.",
            githubUrl: "https://github.com/Tejas-Raj01/DealLens",
            liveUrl: "https://github.com/Tejas-Raj01/DealLens",
            tags: ["Python 3.11", "FastAPI", "PostgreSQL 16 / pgvector", "Hybrid RAG (RRF)", "Celery 5 / Redis 7", "7-Step Workflow DAG", "MinIO / AWS S3", "CitationVerifier"]
        },
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
