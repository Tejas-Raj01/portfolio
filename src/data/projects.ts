export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  problemSolved: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  stats: {
    label: string;
    value: string;
  }[];
  commitSparkline: number[]; // Activity counts for sparkline SVG
  lastCommit: string;
}

export const projects: Project[] = [
  {
    id: "tejas-db",
    name: "Tejas-DB",
    subtitle: "Distributed Key-Value Storage Engine in C++17",
    description: "Decentralized, peer-to-peer distributed key-value storage engine built from scratch in modern C++17. Implements Consistent Hashing on a virtual ring for balanced node partitioning, a Gossip Protocol for autonomous cluster membership discovery, tunable Quorum Replication (N, W, R) for configurable CAP tradeoffs, and a Write-Ahead Log (WAL) engine for crash recovery.",
    problemSolved: "Eliminates centralized coordination bottlenecks while guaranteeing crash safety under simulated network partition chaos.",
    tech: ["C++17", "Gossip Protocol", "Consistent Hashing", "Quorum Consensus", "WAL Engine", "std::shared_mutex"],
    githubUrl: "https://github.com/Tejas-Raj01/distributed-system",
    liveUrl: "https://distributed-system-phi.vercel.app/",
    stats: [
      { label: "Throughput", value: "33,685 req/s" },
      { label: "P99 Latency", value: "~2.97 ms" },
      { label: "Concurrency", value: "100 worker threads" }
    ],
    commitSparkline: [4, 9, 14, 22, 38, 45, 30, 52, 68, 41, 55, 33],
    lastCommit: "commit 8a2f1b4: tune quorum consensus write barrier"
  },
  {
    id: "deallens",
    name: "DealLens",
    subtitle: "Deterministic 7-Step Financial RAG & Due-Diligence Engine",
    description: "Production-grade asynchronous AI backend for corporate investment due diligence and 10-K SEC filings analysis. Replaced brittle autonomous agent loops with an explicit deterministic 7-step DAG state machine. Built on PostgreSQL 16 with pgvector hybrid search combining dense Cosine Distance embeddings and sparse tsvector keyword search via Reciprocal Rank Fusion (RRF). Features CitationVerifier guardrails for zero-hallucination source provenance.",
    problemSolved: "Solves catastrophic LLM hallucinations and untraceable claims in mission-critical financial document auditing.",
    tech: ["Python 3.11", "FastAPI", "PostgreSQL 16 / pgvector", "Hybrid RAG (RRF)", "Celery 5 / Redis 7", "DAG State Machine"],
    githubUrl: "https://github.com/Tejas-Raj01/DealLens",
    liveUrl: "https://deal-lens-orpin.vercel.app/",
    stats: [
      { label: "Architecture", value: "7-step DAG" },
      { label: "Search", value: "Dense + Sparse RRF" },
      { label: "Provenance", value: "100% cited source audit" }
    ],
    commitSparkline: [8, 12, 19, 31, 28, 44, 59, 62, 48, 35, 42, 29],
    lastCommit: "commit d43e09a: enforce CitationVerifier claim bounds"
  },
  {
    id: "ai-job-platform",
    name: "AI Career Intelligence Platform",
    subtitle: "Real-Time Resume Parsing & Match Inference Service",
    description: "Decoupled asynchronous platform processing unstructured technical candidate resumes against live job listings. Employs a memory-optimized semantic matching engine with TF-IDF tokenization and Cosine Similarity to calculate sub-millisecond match scores, backed by Celery task workers with active model fallback loops.",
    problemSolved: "Replaces slow human filtering with deterministic, transparent candidate-to-role compatibility scoring.",
    tech: ["Python", "FastAPI", "React", "PostgreSQL", "Celery / Redis", "scikit-learn TF-IDF", "LangChain"],
    githubUrl: "https://github.com/Tejas-Raj01",
    liveUrl: "https://portfolio-liart-eta-34.vercel.app/",
    stats: [
      { label: "Match Latency", value: "<15 ms" },
      { label: "Queue Worker", value: "Async Celery" },
      { label: "Fallback", value: "Zero-downtime model swap" }
    ],
    commitSparkline: [5, 11, 16, 24, 20, 31, 27, 36, 22, 18, 25, 19],
    lastCommit: "commit 2f901cb: optimize TF-IDF cosine vector cache"
  }
];
