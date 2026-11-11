export interface CareerNode {
  hash: string;
  date: string;
  tag?: string;
  summary: string;
  detail: string;
  repoRef?: string;
  repoUrl?: string;
}

export const careerLog: CareerNode[] = [
  {
    hash: "e4a901f",
    date: "2026",
    tag: "vLLM & PyTorch",
    summary: "Hacking the low-level memory bugs that crash AI clusters",
    detail: "Investigating request preemption index misalignment in vLLM's priority scheduler and hunting floating-point division exceptions in PyTorch C++ sparse tensor kernels under ASan. If an inference server dies silently at 3 AM under load, that is where I like to look.",
    repoRef: "vllm-project/vllm",
    repoUrl: "https://github.com/vllm-project/vllm/pull/49206"
  },
  {
    hash: "b7218ac",
    date: "2025",
    tag: "Tejas-DB",
    summary: "Built a distributed key-value store from scratch in C++17",
    detail: "Wrote consistent hashing, gossip node discovery, and quorum replication (N, W, R) with write-ahead logging. Benchmarked at 33,685 req/s with 100 concurrent threads to understand how databases survive network partitions without lying to the client.",
    repoRef: "Tejas-Raj01/distributed-system",
    repoUrl: "https://github.com/Tejas-Raj01/distributed-system"
  },
  {
    hash: "904fd21",
    date: "2025",
    tag: "Canonical",
    summary: "Fixed an inode bug that wiped source files during builds",
    detail: "In Canonical craft-parts, staged symlinks pointing to identical inodes tricked link_or_copy into deleting the source file on collision. Added samefile() check to file_utils.py. One line in Python, zero deleted source trees across Ubuntu builds.",
    repoRef: "canonical/craft-parts",
    repoUrl: "https://github.com/canonical/craft-parts/pull/1628"
  },
  {
    hash: "61c390d",
    date: "2024",
    tag: "Jetpack (10 merged)",
    summary: "10 merged PRs across Gutenberg blocks and REST schemas",
    detail: "Dissected WordPress block editor state transformations, fixed carousel accessibility violations for screen readers, and tightened OpenAPI response schemas for Automattic Jetpack. Realized the web runs on careful edge-case handling.",
    repoRef: "Automattic/jetpack",
    repoUrl: "https://github.com/Automattic/jetpack/pulls?q=is%3Apr+author%3ATejas-Raj01"
  },
  {
    hash: "3d508eb",
    date: "2024",
    tag: "CP Editor",
    summary: "Automated localization for 3,600+ UI strings",
    detail: "Wrote an LLM-powered extraction and validation pipeline to translate the entire desktop interface of CP Editor into multiple languages, while fixing duplicate search index tokens in Qt.",
    repoRef: "cpeditor/cpeditor",
    repoUrl: "https://github.com/cpeditor/cpeditor/pull/1501"
  },
  {
    hash: "1804c27",
    date: "2023",
    tag: "NIT Durgapur",
    summary: "Started B.Tech CSE & reached 4★ on CodeChef (1804 peak)",
    detail: "Spent hundreds of hours solving graph theory, segment trees, and dynamic programming problems against a ticking clock. It taught me how algorithms behave when memory and time limits are measured in single milliseconds.",
    repoRef: "codechef.com/users/tejas_2341",
    repoUrl: "https://www.codechef.com/users/tejas_2341"
  }
];
