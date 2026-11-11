export interface BlameStatement {
  id: string;
  hash: string;
  author: string;
  date: string;
  fileGutter: string;
  sentence: string;
  contextNote: string;
  sourceUrl?: string;
}

export const blameStatements: BlameStatement[] = [
  {
    id: "blame-1",
    hash: "49206ea",
    author: "Tejas",
    date: "2026-03-12",
    fileGutter: "vllm/core/policy.py:184",
    sentence: "If an error happens silently without an exception, someone will spend four days debugging the wrong subsystem.",
    contextNote: "Learned from vLLM #49206: priority requests were skipped without emitting a single log line.",
    sourceUrl: "https://github.com/vllm-project/vllm/pull/49206"
  },
  {
    id: "blame-2",
    hash: "190191c",
    author: "Tejas",
    date: "2026-02-28",
    fileGutter: "aten/src/ATen/native/SparseTensor.cpp:412",
    sentence: "I would rather inspect an AddressSanitizer stack trace than sit in an alignment meeting about architectural visions.",
    contextNote: "Learned from PyTorch #190191: a zero in a tensor dimension caused a hard C++ division-by-zero crash in production.",
    sourceUrl: "https://github.com/pytorch/pytorch/pull/190191"
  },
  {
    id: "blame-3",
    hash: "16280ab",
    author: "Tejas",
    date: "2025-11-19",
    fileGutter: "craft_parts/utils/file_utils.py:44",
    sentence: "Never assume two file paths point to two different files until you have checked the physical inode.",
    contextNote: "Learned from Canonical craft-parts #1628: catching EEXIST and unlinking destination deleted the source file.",
    sourceUrl: "https://github.com/canonical/craft-parts/pull/1628"
  },
  {
    id: "blame-4",
    hash: "8a2f1b4",
    author: "Tejas",
    date: "2025-08-04",
    fileGutter: "tejas_db/consensus/quorum.cpp:92",
    sentence: "Distributed systems do not fail gracefully on their own; you have to induce chaos on purpose to see where the lies live.",
    contextNote: "Learned while benchmarking Tejas-DB: partition tests revealed subtle write-acknowledgement discrepancies.",
    sourceUrl: "https://github.com/Tejas-Raj01/distributed-system"
  },
  {
    id: "blame-5",
    hash: "50818dd",
    author: "Tejas",
    date: "2024-10-15",
    fileGutter: "jetpack/blocks/map/block.json:14",
    sentence: "Writing software used by millions means your sloppy edge case is someone else's broken workflow.",
    contextNote: "Learned across 10 merged PRs in Automattic Jetpack: empty HTML tags and missing ARIA labels break real assistive tools.",
    sourceUrl: "https://github.com/Automattic/jetpack/pulls?q=is%3Apr+author%3ATejas-Raj01"
  },
  {
    id: "blame-6",
    hash: "1804f02",
    author: "Tejas",
    date: "2023-09-01",
    fileGutter: "codechef/tejas_2341:rating",
    sentence: "Competitive programming gave me an allergic reaction to O(N²) loops when O(N log N) is sitting right there.",
    contextNote: "Learned across hundreds of CodeChef rounds reaching 4★ (peak rating 1804).",
    sourceUrl: "https://www.codechef.com/users/tejas_2341"
  },
  {
    id: "blame-7",
    hash: "d43e09a",
    author: "Tejas",
    date: "2025-04-18",
    fileGutter: "deallens/rag/verifier.py:58",
    sentence: "An AI system that cannot cite the exact paragraph it learned a fact from should not be trusted with numbers.",
    contextNote: "Learned while engineering DealLens: deterministic DAGs beat black-box agent loops for audited financial filing analysis.",
    sourceUrl: "https://github.com/Tejas-Raj01/DealLens"
  },
  {
    id: "blame-8",
    hash: "1501bee",
    author: "Tejas",
    date: "2024-06-22",
    fileGutter: "cpeditor/i18n/pipeline.py:12",
    sentence: "The best open source contribution is the one that removes friction for strangers who will never know your name.",
    contextNote: "Learned from CP Editor #1501: automated translation pipeline for 3,600+ UI strings across global developers.",
    sourceUrl: "https://github.com/cpeditor/cpeditor/pull/1501"
  }
];
