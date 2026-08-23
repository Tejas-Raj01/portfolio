// Tejas Raj — AI Engineer Portfolio Data Model

export const portfolioData = {
    identity: {
        name: "Tejas Raj",
        role: "SOFTWARE ENGINEER & AI BUILDER",
        tagline: "NIT Durgapur '27 · Open-Source Infrastructure & LLM Systems · 4★ CodeChef",
        bio: "Computer Science undergrad at NIT Durgapur ('27) contributing to core open-source infrastructure across LLM inference engines (vLLM), machine learning frameworks (PyTorch), Linux packaging toolchains (Canonical), and developer tooling (Automattic Jetpack, CP Editor). 4★ Competitive Programmer on CodeChef.",
        email: "rajtejas.xyz@gmail.com",
        github: "https://github.com/Tejas-Raj01",
        linkedin: "https://www.linkedin.com/in/tejas-raj-09aa4a236/",
        resumePdf: "/resume.pdf"
    },

    me: {
        headline: "B.Tech CSE @ NIT Durgapur '27 | Open Source Contributor (vLLM, PyTorch, Canonical, Jetpack) | 4★ CodeChef (Max 1804)",
        description: "Computer Science undergrad at NIT Durgapur ('27) contributing to core open-source infrastructure across LLM inference engines (vLLM), machine learning frameworks (PyTorch), Linux packaging toolchains (Canonical Snapcraft/Craft-Parts), and developer tooling (CP Editor, Automattic Jetpack). My work focuses on low-level memory safety, scheduler KV-cache preemption, C++ sparse matrix conversions, dynamic compiler graph tracing, and high-throughput distributed systems (Tejas-DB with 33k+ req/s Gossip/Quorum consensus).",
        focusAreas: [
            "LLM Inference & ML Frameworks: Core contributions to vLLM (priority scheduling KV-cache preemption, memory profilers) and PyTorch (C++ sparse matrix memory safety, FX graph tracer schemas & Inductor fusions).",
            "Linux & Open-Source Infrastructure: Production bug fixes across Canonical Snapcraft/Craft-Parts (inode file-linking safety, dynamic build resolution) and Automattic Jetpack (10 merged PRs across Gutenberg REST APIs & UI state transformations).",
            "Distributed Systems & Storage Engines: Architected Tejas-DB in C++17 (Consistent Hashing, Gossip Protocol, Tunable Quorum consensus, WAL recovery) delivering 33k+ req/s throughput at ~2.97ms latency.",
            "Production AI & Workflow Engines: Engineered DealLens (deterministic 7-step RAG DAG workflow engine with PostgreSQL 16 pgvector hybrid RRF search and hallucination guardrails).",
            "Algorithms & Desktop Tooling: 4★ CodeChef (Max 1804) & CP Editor contributor (automated LLM localization pipelines translating 3,600+ UI strings & C++/Qt editor engine enhancements)."
        ]
    },

    education: [
        {
            institution: "National Institute of Technology Durgapur",
            degree: "Bachelor's degree, Computer Software Engineering (B.Tech CSE)",
            location: "Durgapur, West Bengal, India",
            period: "August 2023 – May 2027"
        }
    ],

    skills: {
        languages: [
            { name: "Python", icon: "fa-brands fa-python" },
            { name: "C++", icon: "fa-solid fa-c" }, // No perfect C++ icon in FA free, use C or code
            { name: "TypeScript", icon: "fa-brands fa-js" }, // TS doesn't have official FA free icon
            { name: "JavaScript", icon: "fa-brands fa-js" },
            { name: "SQL", icon: "fa-solid fa-database" }
        ],
        frontend: [
            { name: "React", icon: "fa-brands fa-react" },
            { name: "Next.js", icon: "fa-brands fa-react" },
            { name: "Tailwind CSS", icon: "fa-solid fa-wind" }
        ],
        backend: [
            { name: "FastAPI", icon: "fa-solid fa-bolt" },
            { name: "Node.js", icon: "fa-brands fa-node-js" },
            { name: "PostgreSQL", icon: "fa-solid fa-database" },
            { name: "MongoDB", icon: "fa-solid fa-leaf" }
        ],
        infra: [
            { name: "Docker", icon: "fa-brands fa-docker" },
            { name: "Google Cloud", icon: "fa-brands fa-google" },
            { name: "Linux", icon: "fa-brands fa-linux" },
            { name: "Git", icon: "fa-brands fa-git-alt" },
            { name: "GitHub", icon: "fa-brands fa-github" }
        ],
        ai: [
            { name: "Generative AI", icon: "fa-solid fa-wand-magic-sparkles" },
            { name: "PyTorch", icon: "fa-solid fa-fire" },
            { name: "Gemini API", icon: "fa-solid fa-brain" },
            { name: "vLLM", icon: "fa-solid fa-microchip" }
        ]
    },

    about: {
        paragraphs: [
            "I am a Computer Science & Engineering undergrad at NIT Durgapur ('27), specializing in software architecture, LLM inference infrastructure, and distributed systems. Rather than viewing frameworks as black boxes, I actively debug and enhance core open-source systems — from resolving KV-cache preemption re-indexing in vLLM's priority scheduler to fixing C++ floating-point memory crashes in PyTorch's sparse tensor engine.",
            "My open-source work spans Linux packaging infrastructure at Canonical (resolving inode unlinking safety and dynamic environment resolution in Snapcraft), Gutenberg REST API stability at Automattic Jetpack (10 merged PRs), and C++/Qt developer tooling for CP Editor (building LLM localization pipelines for 3,600+ strings). On the systems side, I built Tejas-DB — a C++17 distributed key-value store with Gossip discovery and Quorum consensus benchmarking at 33k+ req/s."
        ],
        email: "rajtejas.xyz@gmail.com",
        linkedin: "https://www.linkedin.com/in/tejas-raj-09aa4a236/"
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
                    problem: "Memory profiler under-predicted peak allocation for GDN/Mamba hybrid architectures, leading to OOM crashes during batch execution.",
                    solution: "Adjusted state tensor memory overhead calculations during pre-allocation profiling.",
                    url: "https://github.com/vllm-project/vllm/pull/52935"
                },
                {
                    title: "[Core] Fix EngineDeadError on late KV transfer completion",
                    status: "Open PR #49278",
                    prNumber: "49278",
                    problem: "Late completion of KV cache transfers between nodes triggered false-positive timeout exceptions, crashing the engine with EngineDeadError.",
                    solution: "Added asynchronous callback handling for KV cache transfers to safely defer state checks.",
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
                    problem: "The index_topk Triton/CUDA kernel threw invalid memory access errors when num_idx_heads was not a power of 2.",
                    solution: "Added dynamic thread block padding and boundary guard checks in the topk indexing kernel.",
                    url: "https://github.com/vllm-project/vllm/pull/49199"
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
                    problem: "AddressSanitizer (ASan) buffer overflow error when converting malformed CPU sparse tensors to dense representations.",
                    solution: "Enforced strict array index validation on compressed column/row pointers.",
                    url: "https://github.com/pytorch/pytorch/pull/190067"
                },
                {
                    title: "inductor: Fall back to ATen for torch.cat with symbolic non-leading dims",
                    status: "Open PR #190034",
                    prNumber: "190034",
                    problem: "PyTorch Inductor compiler failed to generate Triton code when torch.cat had symbolic shapes on non-leading dimensions.",
                    solution: "Added fallback path to standard ATen execution for symbolic shape concatenation.",
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
                    problem: "Atomic additions during fused backward pass of slice_scatter caused floating-point gradient non-determinism.",
                    solution: "Restructured fusion indexing to utilize deterministic reduction accumulators.",
                    url: "https://github.com/pytorch/pytorch/pull/189129"
                }
            ]
        },
        {
            repo: "Automattic Jetpack",
            fullRepo: "Automattic/jetpack",
            category: "Open-Source Infrastructure",
            prSearchUrl: "https://github.com/Automattic/jetpack/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Significant contributor with 10 merged PRs improving Gutenberg block editor stability, REST APIs, and Map Block functionality.",
            highlights: [
                {
                    title: "Map Block: Add wide and full width alignment support (#40715)",
                    status: "Merged PR #50818",
                    prNumber: "50818",
                    problem: "No alignment controls were available for the Map block toolbar, preventing users from making the map span wider or fully across the page content area.",
                    solution: "Added wide and full alignment support to the Map block by updating its block.json file to expose UI controls in the editor.",
                    url: "https://github.com/Automattic/jetpack/pull/50818"
                },
                {
                    title: "Fix: Normalize event target for Carousel on attachment links (#39926)",
                    status: "Merged PR #50220",
                    prNumber: "50220",
                    problem: "Click events on Carousel attachment links failed to resolve correct image target IDs in nested DOM hierarchies.",
                    solution: "Normalized event target traversal logic to reliably retrieve valid attachment IDs.",
                    url: "https://github.com/Automattic/jetpack/pull/50220"
                },
                {
                    title: "Fix: Dynamically render EXIF ul list to resolve a11y warnings (#38839)",
                    status: "Merged PR #50201",
                    prNumber: "50201",
                    problem: "Static EXIF metadata wrappers emitted empty list tags causing accessibility (a11y) audit failures.",
                    solution: "Made EXIF metadata list rendering conditional so empty tags are omitted.",
                    url: "https://github.com/Automattic/jetpack/pull/50201"
                },
                {
                    title: "Fix: Replace empty heading tags with divs in Carousel (#29141)",
                    status: "Merged PR #50199",
                    prNumber: "50199",
                    problem: "Empty heading tags in Carousel blocks violated W3C semantics and broke screen reader navigation.",
                    solution: "Replaced structural empty heading elements with styled generic div wrappers.",
                    url: "https://github.com/Automattic/jetpack/pull/50199"
                },
                {
                    title: "Fix: Add aria-label to carousel download link for a11y (#33616)",
                    status: "Merged PR #50181",
                    prNumber: "50181",
                    problem: "Image download links in full-screen Carousel overlay lacked accessible textual labels.",
                    solution: "Added dynamic localized aria-label attributes to download action controls.",
                    url: "https://github.com/Automattic/jetpack/pull/50181"
                },
                {
                    title: "Fix: Prevent Slideshow block crash when converting from Gallery (#49606)",
                    status: "Merged PR #50035",
                    prNumber: "50035",
                    problem: "Block editor crash when attempting transformations from Gallery to Slideshow components.",
                    solution: "Normalized event target handling and validated block attribute schemas during state transformations.",
                    url: "https://github.com/Automattic/jetpack/pull/50035"
                },
                {
                    title: "Publicize: Update connection status schema to use `oneOf`",
                    status: "Merged PR #50030",
                    prNumber: "50030",
                    problem: "Strict REST API schema validation rejected valid alternative connection response objects.",
                    solution: "Updated OpenAPI schema definition to use `oneOf` for flexible connection status matching.",
                    url: "https://github.com/Automattic/jetpack/pull/50030"
                },
                {
                    title: "Enhancement: Add jetpack_social_image_generator_disable_text filter to disable SIG text overlay",
                    status: "Merged PR #50029",
                    prNumber: "50029",
                    problem: "Site owners could not programmatically disable text overlay rendering on generated social sharing images.",
                    solution: "Introduced a custom WordPress filter hook allowing full control over text overlay generation.",
                    url: "https://github.com/Automattic/jetpack/pull/50029"
                },
                {
                    title: "Fix: Enforce strict string type for status enum to prevent Gemini API crash (#49599)",
                    status: "Merged PR #50028",
                    prNumber: "50028",
                    problem: "Integer or null enum status payloads caused uncaught runtime crashes in Gemini API client handlers.",
                    solution: "Enforced strict string type casting for all enum values prior to API serialization.",
                    url: "https://github.com/Automattic/jetpack/pull/50028"
                },
                {
                    title: "Fix: Prevent Tiled Gallery crash and add changelog entry (#49606)",
                    status: "Merged PR #50025",
                    prNumber: "50025",
                    problem: "Attempting block transformations between Gallery and Tiled Gallery resulted in undefined attribute crashes.",
                    solution: "Added attribute sanitizer and fallback defaults for transformed gallery blocks.",
                    url: "https://github.com/Automattic/jetpack/pull/50025"
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
            summary: "Contributed 2 merged PRs for dynamic build_base resolution and security interface documentation.",
            highlights: [
                {
                    title: "feat(remote-build): add --project-dir argument to support build paths",
                    status: "Open PR #6372",
                    prNumber: "6372",
                    problem: "Remote build commands assumed repository root as project path, failing for nested monorepo packages.",
                    solution: "Added --project-dir flag to pass explicit relative or absolute project paths to remote build instances.",
                    url: "https://github.com/canonical/snapcraft/pull/6372"
                },
                {
                    title: "Resolve hardcoded linter fallbacks via dynamic build_base resolution across package pipelines",
                    status: "Merged PR #6272",
                    prNumber: "6272",
                    problem: "Hardcoded linter fallbacks in packaging pipelines led to build resolution failures on non-standard host environments.",
                    solution: "Implemented dynamic build_base resolution to detect environment targets dynamically.",
                    url: "https://github.com/canonical/snapcraft/pull/6272"
                },
                {
                    title: "docs: Add personal-files interface manual connection notes to Snapcraft tutorial",
                    status: "Merged PR #6269",
                    prNumber: "6269",
                    problem: "Snapcraft tutorial lacked explicit manual connection instructions for personal-files security interface.",
                    solution: "Updated tutorial documentation with personal-files security interface connection steps.",
                    url: "https://github.com/canonical/snapcraft/pull/6269"
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
                    problem: "Ctrl+Scroll wheel font scaling was hardcoded without user preference toggles, causing accidental zoom level shifts.",
                    solution: "Added configurable setting in Qt application preferences to enable or disable mouse wheel font resizing.",
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
                    problem: "Platform alerts were confined to in-app dashboards with no external integration mechanism.",
                    solution: "Built HTTP webhook dispatch system to trigger external user endpoints on alert events.",
                    url: "https://github.com/future-agi/future-agi/pull/2147"
                },
                {
                    title: "feat: Add DragonflyDB support as a Redis-compatible backend",
                    status: "Open PR #2142",
                    prNumber: "2142",
                    problem: "Redis backend throughput bottlenecks during concurrent agent state caching.",
                    solution: "Integrated DragonflyDB as a drop-in high-performance Redis protocol replacement.",
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
                    problem: "Shift key modifier events in Web Custom Editors prevented custom extension keybindings from executing.",
                    solution: "Patched web view keyboard event listener to delegate unhandled Shift shortcut events.",
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
                    problem: "Deferred context compaction routines were scheduled even when background worker threads had terminated.",
                    solution: "Added thread liveness checking prior to scheduling async compaction tasks.",
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
