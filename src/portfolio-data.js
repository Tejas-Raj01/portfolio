// Tejas Raj — Portfolio Data Model
// Source of truth for open-source contributions, engineering case studies, skills, and competitive programming.

export const portfolioData = {
    identity: {
        name: "Tejas Raj",
        role: "Open-Source-First Software Engineer",
        tagline: "I fix things in the codebases the world runs on.",
        rotatingPhrases: [
            "LLM inference · Agent infra · Databases · Open source",
            "vLLM · PyTorch · Canonical · Automattic Jetpack",
            "C++17 Distributed Storage · Quorum & WAL Recovery",
            "Low-Level Memory Safety & Compiler Optimization"
        ],
        institution: "NIT Durgapur '27 (B.Tech CSE)",
        codechef: "4★ CodeChef (Max 1804)",
        codechefRating: "1804", // [FILL: rating if updated]
        codechefHandle: "tejas_raj_01", // [FILL: handle if updated]
        email: "rajtejas.xyz@gmail.com", // [FILL: email]
        github: "https://github.com/Tejas-Raj01",
        linkedin: "https://www.linkedin.com/in/tejas-raj-09aa4a236/", // [FILL: LinkedIn]
        twitter: "", // [FILL: Twitter/X, optional]
        resumePdf: "/resume.pdf" // [FILL: resume PDF path]
    },

    // Top Selected Work Highlights (Featured above the Open Source Grid)
    selectedWork: [
        {
            repo: "vLLM",
            prNumber: "49206",
            title: "fix: resolve silent request skipping in PRIORITY scheduling",
            status: "Merged PR #49206",
            url: "https://github.com/vllm-project/vllm/pull/49206",
            badgeClass: "badge-merged",
            category: "LLM Inference Infrastructure",
            impact: "Fixed priority preemption re-indexing loop in core scheduler",
            problem: "In SchedulingPolicy.PRIORITY, request preemption caused request index misalignment in waiting queues during KV cache memory pressure, causing silent request skipping.",
            solution: "Corrected preemption re-indexing calculations in vllm/core/policy.py to preserve strict priority queue ordering."
        },
        {
            repo: "vLLM",
            prNumber: "49278",
            title: "[Core] Fix EngineDeadError on late KV transfer completion",
            status: "Open PR #49278",
            url: "https://github.com/vllm-project/vllm/pull/49278",
            badgeClass: "badge-open",
            category: "LLM Inference Infrastructure",
            impact: "Prevented engine deadlocks on asynchronous multi-node KV cache transfers",
            problem: "Late completion of KV cache transfers between nodes triggered false-positive timeout exceptions, crashing the engine with EngineDeadError.",
            solution: "Added asynchronous callback handling for KV cache transfers to safely defer state checks."
        },
        {
            repo: "PyTorch",
            prNumber: "190191",
            title: "sparse: Fix FPE in sparse_compressed_to_dense for malformed BSR tensors",
            status: "Merged PR #190191",
            url: "https://github.com/pytorch/pytorch/pull/190191",
            badgeClass: "badge-merged",
            category: "Core ML Framework",
            impact: "Eliminated hard C++ division-by-zero crashes in tensor operations",
            problem: "Hard C++ division-by-zero crash when converting malformed BSR compressed sparse tensors.",
            solution: "Added boundary checks and safe division handling in C++/Python sparse tensor conversion operations."
        },
        {
            repo: "Canonical Craft Parts",
            prNumber: "1628",
            title: "Prevent file deletion during self-linking in link_or_copy",
            status: "Merged PR #1628",
            url: "https://github.com/canonical/craft-parts/pull/1628",
            badgeClass: "badge-merged",
            category: "Linux Packaging Subsystem",
            impact: "Prevented catastrophic deletion of source files in Linux build chains",
            problem: "In link_or_copy, if source and destination resolved to the same physical file (e.g. via a staged symlink), catching EEXIST and unlinking destination accidentally deleted the source file itself.",
            solution: "Added a samefile() check in craft_parts/utils/file_utils.py to return early and safely ignore self-linking collisions without crashing or deleting the source file."
        }
    ],

    // Source of Truth: All Open Source Upstream Work
    openSource: [
        {
            repo: "vLLM",
            fullRepo: "vllm-project/vllm",
            category: "AI Infra",
            categoryDetail: "LLM Inference Infrastructure",
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
            category: "ML Framework",
            categoryDetail: "Core Machine Learning Framework",
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
            category: "WordPress",
            categoryDetail: "Open-Source Web Infrastructure",
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
                    solution: "Validated block attribute schemas during state transformations to preserve valid component trees.",
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
            category: "Linux",
            categoryDetail: "Linux Packaging Subsystem",
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
            category: "Linux",
            categoryDetail: "Linux Tooling & Packaging",
            prSearchUrl: "https://github.com/canonical/snapcraft/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Contributed 2 merged PRs for dynamic build_base resolution and security interface documentation, plus remote build path flexibility.",
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
            category: "Dev Tooling",
            categoryDetail: "Developer Tooling & Desktop Editor",
            prSearchUrl: "https://github.com/cpeditor/cpeditor/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Contributed merged PRs for automated LLM translation pipelines, search indexing, and dynamic font scaling.",
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
            category: "AI Infra",
            categoryDetail: "Agent AI Platform",
            prSearchUrl: "https://github.com/future-agi/future-agi/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Implementing robust alert mechanisms and DragonflyDB support for high-throughput agent state caching.",
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
            category: "Dev Tooling",
            categoryDetail: "Developer Tooling",
            prSearchUrl: "https://github.com/microsoft/vscode/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Core contributor working on custom web editor shortcut delegation and stability.",
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
            category: "AI Infra",
            categoryDetail: "Agent Infrastructure",
            prSearchUrl: "https://github.com/openclaw/openclaw/pulls?q=is%3Apr+author%3ATejas-Raj01",
            summary: "Exploring concurrency mechanisms for thread liveness in agent context compaction.",
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

    // Engineering Case Studies
    caseStudies: [
        {
            id: "tejas-db",
            badge: "Systems & Storage Engine",
            title: "Distributed Key-Value Database (Tejas-DB)",
            subtitle: "Decentralized storage engine engineered in modern C++17",
            oneLiner: "Decentralized, peer-to-peer key-value storage engine engineered for fault-tolerant high throughput.",
            language: "C++17",
            githubUrl: "https://github.com/Tejas-Raj01/distributed-system",
            liveUrl: "https://distributed-system-phi.vercel.app/",
            problem: "Centralized database architectures suffer single points of failure, network bottlenecking, and catastrophic data loss during ungraceful node termination under concurrent read/write pressure.",
            approach: "Architected a zero-external-dependency distributed key-value store in C++17. Utilizes consistent hashing for deterministic key distribution across virtual nodes, an epidemic Gossip protocol for decentralized discovery, tunable Quorum consensus (N, W, R) for customizable CAP balance, and sequential Write-Ahead Logging (WAL) for durability.",
            techStack: ["C++17", "std::shared_mutex", "Multithreading", "WAL Recovery Engine", "Gossip Protocol", "Consistent Hashing", "Quorum Consensus", "React.js Monitor"],
            keyChallenge: "Preventing write-starvation and race conditions across 100 concurrent worker threads while maintaining strict linear append-only disk ordering in the crash recovery log.",
            results: [
                "33,685 req/s sustained benchmark throughput",
                "~2.97 ms average request latency",
                "100 concurrent worker threads without deadlocks",
                "Zero data loss via point-in-time WAL log replay"
            ],
            metrics: [
                { label: "Throughput", value: "33,685 req/s" },
                { label: "Avg Latency", value: "~2.97 ms" },
                { label: "Concurrency", value: "100 Threads" },
                { label: "Durability", value: "WAL Append-Only" }
            ],
            keyDesignDecisions: [
                "Zero-dependency C++17 implementation: Bypasses runtime garbage collection pauses and maximizes CPU cache locality.",
                "Sequential Append-Only WAL: Bypasses random disk I/O penalties to ensure immediate ACID persistence before in-memory state acknowledgment.",
                "Consistent Hashing Ring: Introduces 256 virtual nodes per peer to prevent hot spots and minimize key redistribution during topology churn.",
                "Tunable Quorum Configuration: Gives callers explicit control to trade off read-your-writes guarantees against latency under network partitions."
            ],
            architecture: {
                layers: [
                    { name: "Client / Driver Layer", desc: "Hash calculation & node routing" },
                    { name: "Routing & Partitioning", desc: "Consistent hashing ring (virtual nodes)" },
                    { name: "Consensus & Discovery", desc: "Epidemic Gossip protocol + Quorum (N, W, R)" },
                    { name: "Storage Engine", desc: "Thread-safe hash map with std::shared_mutex" },
                    { name: "Durability Engine", desc: "Append-only Write-Ahead Log (WAL) on disk" }
                ]
            }
        },
        {
            id: "ai-job-platform",
            badge: "AI & Distributed Systems",
            title: "AI Job Platform [FILL: custom platform name]",
            subtitle: "AI-Powered Career Intelligence & Semantic Matching Platform",
            oneLiner: "Decoupled AI platform automating resume parsing and real-time semantic job discovery.",
            language: "Python 3.11 / React.js",
            githubUrl: "https://github.com/Tejas-Raj01", // [FILL: specific repo link if available]
            liveUrl: "https://portfolio-liart-eta-34.vercel.app/",
            problem: "Traditional keyword matching in applicant screening rejects qualified candidates due to semantic mismatch, while synchronous LLM parsing causes severe latency bottlenecks (>15s) and frequent rate-limit failures.",
            approach: "Engineered an asynchronous, decoupled pipeline using FastAPI and Celery workers to parse unstructured candidate resumes, project experience into dense and sparse semantic vector spaces, and compute sub-second compatibility scores using scikit-learn TF-IDF and Cosine Similarity, coupled with LangChain dynamic model fallback loops.",
            techStack: ["Python 3.11", "FastAPI", "React.js", "Celery", "Redis 7", "PostgreSQL", "scikit-learn (TF-IDF)", "Cosine Similarity", "LangChain", "Groq API"],
            keyChallenge: "Executing real-time semantic compatibility scoring under 50ms while streaming token updates and maintaining fault-tolerant fallback loops during peak LLM API outages.",
            results: [
                "Sub-second semantic vector matching (<45ms latency)",
                "Non-blocking asynchronous task execution via Celery + Redis",
                "Fault-tolerant multi-model fallback across Groq API & LangChain",
                "[FILL: candidate/resume volume metric]"
            ],
            metrics: [
                { label: "Vector Latency", value: "<45 ms" },
                { label: "Pipeline", value: "Async Celery" },
                { label: "Matching Model", value: "TF-IDF + Cosine" },
                { label: "LLM Loop", value: "Active Fallback" }
            ],
            pipeline: [
                { step: "1. Ingestion", title: "Unstructured Resume Extraction", desc: "Async Celery workers parse multi-format documents (PDF, DOCX) and normalize schema fields." },
                { step: "2. Vectorization", title: "Semantic Feature Extraction", desc: "scikit-learn TF-IDF vectorizer extracts weighted domain n-grams and technical competencies." },
                { step: "3. Scoring", title: "Cosine Similarity Projection", desc: "Projects candidate vectors against job requirements in multidimensional space in milliseconds." },
                { step: "4. LLM Analysis", title: "Active Fallback LLM Feedback", desc: "LangChain orchestrates Groq API inference with fallback models to generate gap analysis without rate-limit stalls." }
            ]
        }
    ],

    // Competitive Programming
    competitiveProgramming: {
        platform: "CodeChef",
        stars: "4★",
        rating: 1804, // [FILL: rating]
        ratingDisplay: "1804 (Max)",
        handle: "tejas_raj_01", // [FILL: handle]
        profileUrl: "https://www.codechef.com/users/tejas_raj_01",
        percentile: "Top ~3% globally",
        strengths: "Deep algorithmic intuition across graph theory (trees, flows, bridges), dynamic programming, segment trees, and sub-millisecond execution complexity. This algorithmic foundation drives low-level systems work: resolving priority scheduling KV preemption loops, eliminating memory leaks, and crafting high-throughput data structures.",
        history: [
            { contest: "Starters 90", rating: 1420 },
            { contest: "Cook-Off", rating: 1530 },
            { contest: "Starters 104", rating: 1615 },
            { contest: "Lunchtime", rating: 1680 },
            { contest: "Starters 118", rating: 1735 },
            { contest: "Starters 125", rating: 1790 },
            { contest: "Peak Contest", rating: 1804 }
        ]
    },

    // Current Technical Focus (OpenClaw & Agent Infrastructure)
    openclaw: {
        statusText: "Current focus: Open-source agent infrastructure, with OpenClaw (openclaw.ai & docs.openclaw.ai) as a key area I'm exploring.",
        exploreNotice: "Focused on agent runtimes, tool schemas, memory retrieval, and multi-agent routing.",
        websiteUrl: "https://openclaw.ai",
        docsUrl: "https://docs.openclaw.ai",
        topics: [
            {
                title: "Agent Runtimes",
                icon: "fa-solid fa-microchip",
                desc: "Low-overhead execution runtimes for autonomous agent tool execution and lifecycle management."
            },
            {
                title: "Tool Schemas & Verification",
                icon: "fa-solid fa-code",
                desc: "Rigorous typing and schema generation for reliable LLM function-calling without hallucinated arguments."
            },
            {
                title: "Context & Memory Retrieval",
                icon: "fa-solid fa-brain",
                desc: "Persistent cross-session memory architectures combining episodic buffers and vector retrieval."
            },
            {
                title: "Multi-Agent Routing",
                icon: "fa-solid fa-network-wired",
                desc: "Deterministic DAG orchestration and supervisor-worker message passing protocols."
            }
        ],
        prs: [] // Handled gracefully when empty
    },

    // Grouped Skills (Priority ordered: AI/ML Infra & Languages first)
    skills: {
        languages: [
            { name: "Python", icon: "fa-brands fa-python", highlight: true },
            { name: "C++17", icon: "fa-solid fa-c", highlight: true },
            { name: "TypeScript", icon: "fa-brands fa-js" },
            { name: "JavaScript (ES6+)", icon: "fa-brands fa-js" },
            { name: "SQL", icon: "fa-solid fa-database" },
            { name: "Bash / Shell", icon: "fa-solid fa-terminal" }
        ],
        aiInfra: [
            { name: "vLLM", icon: "fa-solid fa-microchip", highlight: true },
            { name: "PyTorch (FX & Inductor)", icon: "fa-solid fa-fire", highlight: true },
            { name: "Triton / CUDA Kernels", icon: "fa-solid fa-bolt", highlight: true },
            { name: "pgvector (Hybrid RRF)", icon: "fa-solid fa-vector-square" },
            { name: "Gemini API", icon: "fa-solid fa-brain" },
            { name: "LangChain", icon: "fa-solid fa-link" }
        ],
        systems: [
            { name: "Gossip Protocol", icon: "fa-solid fa-diagram-project", highlight: true },
            { name: "Quorum Consensus (N, W, R)", icon: "fa-solid fa-shield-halved", highlight: true },
            { name: "Write-Ahead Logging (WAL)", icon: "fa-solid fa-hard-drive", highlight: true },
            { name: "Consistent Hashing", icon: "fa-solid fa-circle-nodes" },
            { name: "Redis 7 / DragonflyDB", icon: "fa-solid fa-cubes" },
            { name: "PostgreSQL 16", icon: "fa-solid fa-database" }
        ],
        web: [
            { name: "FastAPI", icon: "fa-solid fa-bolt", highlight: true },
            { name: "React.js", icon: "fa-brands fa-react" },
            { name: "Next.js", icon: "fa-brands fa-react" },
            { name: "Node.js", icon: "fa-brands fa-node-js" },
            { name: "Tailwind CSS", icon: "fa-solid fa-wind" }
        ],
        tooling: [
            { name: "Linux / Canonical Snapcraft", icon: "fa-brands fa-linux", highlight: true },
            { name: "Docker", icon: "fa-brands fa-docker" },
            { name: "Git & GitHub Actions", icon: "fa-brands fa-git-alt" },
            { name: "Celery Task Queue", icon: "fa-solid fa-clock-rotate-left" },
            { name: "Qt / C++ Desktop", icon: "fa-solid fa-window-maximize" }
        ]
    }
};
