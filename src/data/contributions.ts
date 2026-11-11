export interface DiffLine {
  type: 'context' | 'add' | 'remove';
  text: string;
}

export interface Contribution {
  id: string;
  repo: string;
  fullRepo: string;
  category: string;
  prNumber: string;
  title: string;
  status: 'merged' | 'open';
  problem: string;
  solution: string;
  outcome: string;
  url: string;
  hunkHeader: string;
  diffLines: DiffLine[];
  featured: boolean;
}

export const featuredContributions: Contribution[] = [
  {
    id: "vllm-49206",
    repo: "vLLM",
    fullRepo: "vllm-project/vllm",
    category: "LLM Inference Engine",
    prNumber: "49206",
    title: "fix: resolve silent request skipping in PRIORITY scheduling",
    status: "merged",
    problem: "When KV-cache memory pressure triggered request preemption, waiting queue indices shifted without re-indexing, silently skipping incoming priority inference requests.",
    solution: "Recalculated queue offsets and preserved priority invariants during preemption eviction passes in policy.py.",
    outcome: "Eliminated silent starvation for prioritized enterprise inference requests under heavy batch load.",
    url: "https://github.com/vllm-project/vllm/pull/49206",
    hunkHeader: "@@ -184,8 +184,10 @@ def _preempt_by_priority(self, waiting_queue):",
    featured: true,
    diffLines: [
      { type: "context", text: "     for idx, req in enumerate(waiting_queue):" },
      { type: "remove",  text: "-        if req.priority < victim.priority:" },
      { type: "remove",  text: "-            self._evict_block(req)" },
      { type: "add",     text: "+        if req.priority < victim.priority and req.is_scheduled:" },
      { type: "add",     text: "+            self._evict_and_reindex(waiting_queue, idx)" },
      { type: "add",     text: "+            break" },
      { type: "context", text: "     return self._rebalance_budget(waiting_queue)" }
    ]
  },
  {
    id: "pytorch-190191",
    repo: "PyTorch",
    fullRepo: "pytorch/pytorch",
    category: "Deep Learning Framework",
    prNumber: "190191",
    title: "sparse: Fix FPE in sparse_compressed_to_dense for malformed BSR tensors",
    status: "merged",
    problem: "Converting Block Sparse Row (BSR) tensors with zero-dimension block shapes triggered a hard C++ floating-point exception (division-by-zero) crashing the Python runtime.",
    solution: "Added explicit zero-dimension dimension validation and guard assertions prior to block stride computation in ATen C++ kernel.",
    outcome: "Turned fatal segmentation crashes into recoverable PyTorch invalid argument exceptions.",
    url: "https://github.com/pytorch/pytorch/pull/190191",
    hunkHeader: "@@ -412,6 +412,9 @@ Tensor sparse_compressed_to_dense(const Tensor& self) {",
    featured: true,
    diffLines: [
      { type: "context", text: "   auto block_shape = self.sparse_dim_block_shape();" },
      { type: "add",     text: "+  TORCH_CHECK(block_shape[0] > 0 && block_shape[1] > 0," },
      { type: "add",     text: "+              \"BSR block dimensions must be positive, got \", block_shape);" },
      { type: "context", text: "   const int64_t nnz = self._nnz();" },
      { type: "remove",  text: "-  int64_t stride = nnz / (block_shape[0] * block_shape[1]);" },
      { type: "add",     text: "+  int64_t stride = nnz / std::max<int64_t>(1, block_shape[0] * block_shape[1]);" },
      { type: "context", text: "   return dense_out;" }
    ]
  },
  {
    id: "pytorch-190067",
    repo: "PyTorch",
    fullRepo: "pytorch/pytorch",
    category: "Deep Learning Framework",
    prNumber: "190067",
    title: "sparse: Fix ASan crash in sparse_compressed_to_dense for malformed CPU inputs",
    status: "merged",
    problem: "AddressSanitizer caught an out-of-bounds heap buffer read when malformed compressed row pointers pointed past the end of allocated index buffers.",
    solution: "Enforced strict monotonic bounds checking on compressed index vectors before invoking CPU vector conversion loops.",
    outcome: "Patched memory safety vulnerability across all CPU sparse-to-dense matrix conversions.",
    url: "https://github.com/pytorch/pytorch/pull/190067",
    hunkHeader: "@@ -89,7 +89,8 @@ void sparse_compressed_to_dense_cpu_kernel(...) {",
    featured: true,
    diffLines: [
      { type: "context", text: "   for (int64_t r = 0; r < num_rows; ++r) {" },
      { type: "remove",  text: "-    int64_t start = row_ptr[r], end = row_ptr[r + 1];" },
      { type: "add",     text: "+    int64_t start = row_ptr[r];" },
      { type: "add",     text: "+    int64_t end = std::min(row_ptr[r + 1], total_elements);" },
      { type: "add",     text: "+    TORCH_CHECK(start <= end, \"Corrupted row pointer index array\");" },
      { type: "context", text: "     for (int64_t i = start; i < end; ++i) {" }
    ]
  },
  {
    id: "pytorch-189142",
    repo: "PyTorch",
    fullRepo: "pytorch/pytorch",
    category: "Deep Learning Framework",
    prNumber: "189142",
    title: "fx: Fix incorrect return_annotation for tuple types in operator schemas",
    status: "merged",
    problem: "The PyTorch FX graph tracer emitted incorrect tuple return type annotations for multi-tensor ops, breaking downstream static analysis and TorchScript graph export.",
    solution: "Updated FX schema parser to reconstruct parameterized tuple types from operator registration schemas rather than decaying to generic tuple.",
    outcome: "Fixed downstream compiler type mismatches for Inductor and AOTAutograd graph captures.",
    url: "https://github.com/pytorch/pytorch/pull/189142",
    hunkHeader: "@@ -231,7 +231,7 @@ def get_signature_for_torch_op(op):",
    featured: true,
    diffLines: [
      { type: "context", text: "     if isinstance(ret_type, torch.TupleType):" },
      { type: "remove",  text: "-        return Tuple" },
      { type: "add",     text: "+        element_types = [map_torch_type_to_py(t) for t in ret_type.elements()]" },
      { type: "add",     text: "+        return Tuple[tuple(element_types)] if element_types else Tuple" },
      { type: "context", text: "     return map_torch_type_to_py(ret_type)" }
    ]
  },
  {
    id: "canonical-1628",
    repo: "Canonical craft-parts",
    fullRepo: "canonical/craft-parts",
    category: "Linux Packaging Subsystem",
    prNumber: "1628",
    title: "Prevent file deletion during self-linking in link_or_copy",
    status: "merged",
    problem: "When source and destination paths pointed to the same physical inode through symlinks, catching EEXIST and unlinking destination accidentally wiped the source file.",
    solution: "Added an os.path.samefile() guard in file_utils.py to detect inode equivalence and exit early before unlinking.",
    outcome: "Stopped silent source file deletion during complex staged snapcraft builds across Ubuntu.",
    url: "https://github.com/canonical/craft-parts/pull/1628",
    hunkHeader: "@@ -44,6 +44,8 @@ def link_or_copy(source: Path, destination: Path) -> None:",
    featured: true,
    diffLines: [
      { type: "context", text: "     try:" },
      { type: "add",     text: "+        if destination.exists() and os.path.samefile(source, destination):" },
      { type: "add",     text: "+            return  # Source and destination share inode; do not unlink." },
      { type: "context", text: "         os.link(source, destination)" },
      { type: "remove",  text: "-    except FileExistsError:" },
      { type: "remove",  text: "-        destination.unlink()" },
      { type: "add",     text: "+    except FileExistsError:" },
      { type: "add",     text: "+        if not os.path.samefile(source, destination): destination.unlink()" }
    ]
  },
  {
    id: "cpeditor-1501",
    repo: "CP Editor",
    fullRepo: "cpeditor/cpeditor",
    category: "Developer Tooling",
    prNumber: "1501",
    title: "Global Localization & Search Bug: Translate 3,600+ UI strings via LLM pipeline",
    status: "merged",
    problem: "Thousands of competitive programming editor UI strings lacked internationalization, while concurrent search re-indexing caused duplicate candidate lists.",
    solution: "Engineered an automated validation pipeline to translate and verify 3,600+ UI strings, and deduplicated Qt search indexing passes.",
    outcome: "Delivered full localization support and removed duplicate search stutter for competitive programmers worldwide.",
    url: "https://github.com/cpeditor/cpeditor/pull/1501",
    hunkHeader: "@@ -120,6 +120,7 @@ void SearchIndex::addToken(const QString &token, int line) {",
    featured: true,
    diffLines: [
      { type: "context", text: "     if (token.trimmed().isEmpty()) return;" },
      { type: "remove",  text: "-    m_tokens.append({token, line});" },
      { type: "add",     text: "+    if (!m_tokenSet.contains(token)) {" },
      { type: "add",     text: "+        m_tokenSet.insert(token);" },
      { type: "add",     text: "+        m_tokens.append({token, line});" },
      { type: "add",     text: "+    }" }
    ]
  }
];

export const allContributions: Contribution[] = [
  ...featuredContributions,
  {
    id: "vllm-52935",
    repo: "vLLM",
    fullRepo: "vllm-project/vllm",
    category: "LLM Inference Engine",
    prNumber: "52935",
    title: "fix: resolve memory profiler under-prediction for GDN/Mamba hybrid models",
    status: "open",
    problem: "The static memory profiler under-predicted peak allocation for GDN/Mamba hybrid state tensors, causing out-of-memory crashes on GPU clusters.",
    solution: "Integrated state-space recurrence tensor sizes into the pre-allocation memory profiling heuristics.",
    outcome: "Prevents GPU OOM crashes during batch initialization for hybrid state-space models.",
    url: "https://github.com/vllm-project/vllm/pull/52935",
    hunkHeader: "@@ -210,6 +210,8 @@ def profile_run_memory(...):",
    diffLines: [
      { type: "context", text: "     total_peak = base_weights + kv_cache_overhead" },
      { type: "add",     text: "+    if model.has_state_space_layers:" },
      { type: "add",     text: "+        total_peak += model.get_state_space_peak_bytes()" },
      { type: "context", text: "     return total_peak" }
    ],
    featured: false
  },
  {
    id: "vllm-49278",
    repo: "vLLM",
    fullRepo: "vllm-project/vllm",
    category: "LLM Inference Engine",
    prNumber: "49278",
    title: "[Core] Fix EngineDeadError on late KV transfer completion",
    status: "open",
    problem: "Late completion callbacks of KV-cache transfers between remote worker nodes triggered premature heartbeat timeouts, crashing entire inference clusters with EngineDeadError.",
    solution: "Added asynchronous callback synchronization to safely defer health checks during active cross-node transfers.",
    outcome: "Stabilizes distributed multi-node inference during heavy network saturation.",
    url: "https://github.com/vllm-project/vllm/pull/49278",
    hunkHeader: "@@ -88,6 +88,8 @@ async def handle_kv_transfer(...):",
    diffLines: [
      { type: "context", text: "     await self.transfer_channel.wait()" },
      { type: "add",     text: "+    self.heartbeat_monitor.defer_check_window(" },
      { type: "add",     text: "+        reason='kv_transfer_in_progress', grace_period_ms=500)" },
      { type: "context", text: "     self.mark_healthy()" }
    ],
    featured: false
  },
  {
    id: "vllm-49199",
    repo: "vLLM",
    fullRepo: "vllm-project/vllm",
    category: "LLM Inference Engine",
    prNumber: "49199",
    title: "[Bugfix] Fix MiniMax M3 index_topk kernel for non-power-of-2 num_idx_heads",
    status: "open",
    problem: "The index_topk Triton CUDA kernel threw illegal memory accesses when indexing head counts were not powers of 2.",
    solution: "Added dynamic thread-block padding and explicit boundary checks in the Triton kernel indexing calculation.",
    outcome: "Allows arbitrary head configurations for MiniMax M3 architecture without illegal memory faults.",
    url: "https://github.com/vllm-project/vllm/pull/49199",
    hunkHeader: "@@ -45,6 +45,8 @@ @triton.jit def index_topk_kernel(...):",
    diffLines: [
      { type: "context", text: "     head_idx = tl.program_id(0)" },
      { type: "add",     text: "+    if head_idx >= num_idx_heads:" },
      { type: "add",     text: "+        return" },
      { type: "context", text: "     offs = head_idx * stride_head" }
    ],
    featured: false
  },
  {
    id: "pytorch-190034",
    repo: "PyTorch",
    fullRepo: "pytorch/pytorch",
    category: "Deep Learning Framework",
    prNumber: "190034",
    title: "inductor: Fall back to ATen for torch.cat with symbolic non-leading dims",
    status: "open",
    problem: "PyTorch Inductor compiler failed Triton code-generation when concatenating tensors along symbolic non-leading dimensions.",
    solution: "Introduced a fallback dispatch path to standard ATen execution when symbolic dimensions fail Triton codegen heuristics.",
    outcome: "Prevents compilation aborts for models with dynamic sequence length batching.",
    url: "https://github.com/pytorch/pytorch/pull/190034",
    hunkHeader: "@@ -714,6 +714,8 @@ def can_codegen_cat_dim(node):",
    diffLines: [
      { type: "context", text: "     if node.dim != 0 and node.has_symbolic_shapes:" },
      { type: "remove",  text: "-        raise CodegenError('Unsupported symbolic cat')" },
      { type: "add",     text: "+        log.debug('Falling back to ATen cat for symbolic dimension %s', node.dim)" },
      { type: "add",     text: "+        return False" },
      { type: "context", text: "     return True" }
    ],
    featured: false
  },
  {
    id: "pytorch-189129",
    repo: "PyTorch",
    fullRepo: "pytorch/pytorch",
    category: "Deep Learning Framework",
    prNumber: "189129",
    title: "inductor: Fix non-deterministic gradients in slice_scatter backward fusion",
    status: "open",
    problem: "Atomic floating-point addition in the fused backward pass of slice_scatter introduced non-deterministic gradient drift across runs.",
    solution: "Restructured fusion indexing to route reductions through deterministic reduction accumulators.",
    outcome: "Guarantees bit-exact gradient reproducibility for sensitive reinforcement learning and foundation models.",
    url: "https://github.com/pytorch/pytorch/pull/189129",
    hunkHeader: "@@ -155,7 +155,7 @@ def backward_slice_scatter_fusion(...):",
    diffLines: [
      { type: "context", text: "     def reduction_rule(acc, grad):" },
      { type: "remove",  text: "-        return tl.atomic_add(acc, grad)" },
      { type: "add",     text: "+        return deterministic_accumulate(acc, grad)" },
      { type: "context", text: "     return register_fused_op(reduction_rule)" }
    ],
    featured: false
  },
  {
    id: "jetpack-50818",
    repo: "Automattic Jetpack",
    fullRepo: "Automattic/jetpack",
    category: "Open-Source Web Infrastructure",
    prNumber: "50818",
    title: "Map Block: Add wide and full width alignment support",
    status: "merged",
    problem: "Gutenberg editor Map block lacked alignment controls, trapping maps in narrow content columns on modern full-bleed themes.",
    solution: "Declared wide and full alignment schemas in block.json and wired CSS alignment selectors.",
    outcome: "Enabled full-bleed and wide map displays for millions of WordPress sites.",
    url: "https://github.com/Automattic/jetpack/pull/50818",
    hunkHeader: "@@ -14,6 +14,8 @@ { \"$schema\": \"https://schemas.wp.org/trunk/block.json\",",
    diffLines: [
      { type: "context", text: "   \"supports\": {" },
      { type: "add",     text: "+    \"align\": [\"wide\", \"full\"]," },
      { type: "context", text: "     \"html\": false" }
    ],
    featured: false
  },
  {
    id: "jetpack-50220",
    repo: "Automattic Jetpack",
    fullRepo: "Automattic/jetpack",
    category: "Open-Source Web Infrastructure",
    prNumber: "50220",
    title: "Fix: Normalize event target for Carousel on attachment links",
    status: "merged",
    problem: "Clicks on nested attachment links failed to resolve the correct target image ID in deep DOM trees, causing carousel launch failures.",
    solution: "Normalized event target traversal with closest() link matching.",
    outcome: "Reliable lightbox activation across custom nested block patterns.",
    url: "https://github.com/Automattic/jetpack/pull/50220",
    hunkHeader: "@@ -67,7 +67,7 @@ function handleCarouselClick(event) {",
    diffLines: [
      { type: "remove",  text: "-  const link = event.target;" },
      { type: "add",     text: "+  const link = event.target.closest('a[data-attachment-id]');" },
      { type: "context", text: "   if (!link) return;" }
    ],
    featured: false
  },
  {
    id: "jetpack-50201",
    repo: "Automattic Jetpack",
    fullRepo: "Automattic/jetpack",
    category: "Open-Source Web Infrastructure",
    prNumber: "50201",
    title: "Fix: Dynamically render EXIF ul list to resolve a11y warnings",
    status: "merged",
    problem: "Empty unordered list elements rendered when image EXIF metadata was absent, failing automated accessibility audits.",
    solution: "Added conditional wrapper rendering so empty list tags are completely omitted.",
    outcome: "Resolved WCAG 2.1 accessibility violations on media gallery carousels.",
    url: "https://github.com/Automattic/jetpack/pull/50201",
    hunkHeader: "@@ -33,6 +33,8 @@ const ExifDetails = ({ meta }) => {",
    diffLines: [
      { type: "add",     text: "+  if (!meta || Object.keys(meta).length === 0) return null;" },
      { type: "context", text: "   return <ul className=\"jp-carousel-exif\">{renderItems(meta)}</ul>;" }
    ],
    featured: false
  },
  {
    id: "jetpack-50199",
    repo: "Automattic Jetpack",
    fullRepo: "Automattic/jetpack",
    category: "Open-Source Web Infrastructure",
    prNumber: "50199",
    title: "Fix: Replace empty heading tags with divs in Carousel",
    status: "merged",
    problem: "Empty heading tags in carousel overlays broke screen reader outline navigation.",
    solution: "Replaced semantic heading elements with styled div wrappers when caption content is missing.",
    outcome: "Clean semantic document outline for assistive technology users.",
    url: "https://github.com/Automattic/jetpack/pull/50199",
    hunkHeader: "@@ -112,7 +112,7 @@ function renderTitle(caption) {",
    diffLines: [
      { type: "remove",  text: "-  return <h2>{caption}</h2>;" },
      { type: "add",     text: "+  return caption ? <h2>{caption}</h2> : null;" }
    ],
    featured: false
  },
  {
    id: "jetpack-50181",
    repo: "Automattic Jetpack",
    fullRepo: "Automattic/jetpack",
    category: "Open-Source Web Infrastructure",
    prNumber: "50181",
    title: "Fix: Add aria-label to carousel download link for a11y",
    status: "merged",
    problem: "Image download links in fullscreen carousel lacked descriptive accessible labels.",
    solution: "Added localized, contextual aria-label attributes referencing target image filenames.",
    outcome: "Screen reader users can identify downloadable media assets without confusion.",
    url: "https://github.com/Automattic/jetpack/pull/50181",
    hunkHeader: "@@ -80,6 +80,7 @@ <a href={url} download",
    diffLines: [
      { type: "add",     text: "+  aria-label={__('Download full resolution image', 'jetpack')}" },
      { type: "context", text: "   className=\"jp-carousel-download-btn\">" }
    ],
    featured: false
  },
  {
    id: "jetpack-50035",
    repo: "Automattic Jetpack",
    fullRepo: "Automattic/jetpack",
    category: "Open-Source Web Infrastructure",
    prNumber: "50035",
    title: "Fix: Prevent Slideshow block crash when converting from Gallery",
    status: "merged",
    problem: "Converting Gutenberg Gallery blocks with undefined attributes to Slideshow blocks crashed the block editor state machine.",
    solution: "Sanitized inbound attribute dictionaries and injected fallback schemas prior to component replacement.",
    outcome: "Seamless block transformations without page crashes or lost user content.",
    url: "https://github.com/Automattic/jetpack/pull/50035",
    hunkHeader: "@@ -45,6 +45,8 @@ transform: attributes => {",
    diffLines: [
      { type: "add",     text: "+  const safeImages = Array.isArray(attributes.images) ? attributes.images : [];" },
      { type: "context", text: "   return createBlock('jetpack/slideshow', { images: safeImages });" }
    ],
    featured: false
  },
  {
    id: "canonical-6272",
    repo: "Canonical Snapcraft",
    fullRepo: "canonical/snapcraft",
    category: "Linux Tooling",
    prNumber: "6272",
    title: "Resolve hardcoded linter fallbacks via dynamic build_base resolution",
    status: "merged",
    problem: "Hardcoded linter base values caused packaging pipeline build aborts on customized non-standard host environments.",
    solution: "Replaced static strings with dynamic build_base introspection reading runtime host environment configurations.",
    outcome: "Safe packaging resolution across diverse cross-compilation environments.",
    url: "https://github.com/canonical/snapcraft/pull/6272",
    hunkHeader: "@@ -90,7 +90,7 @@ def get_linter_target(base_context):",
    diffLines: [
      { type: "remove",  text: "-    return 'core22'" },
      { type: "add",     text: "+    return base_context.build_base or base_context.system_default" }
    ],
    featured: false
  },
  {
    id: "canonical-6269",
    repo: "Canonical Snapcraft",
    fullRepo: "canonical/snapcraft",
    category: "Linux Tooling",
    prNumber: "6269",
    title: "docs: Add personal-files interface manual connection notes to Snapcraft tutorial",
    status: "merged",
    problem: "Tutorial documentation omitted strict security interface manual connection steps, leaving developers unable to access scoped dotfiles.",
    solution: "Documented the explicit snap connect command sequence with security rationale.",
    outcome: "Unblocked developers configuring sandboxed Linux applications.",
    url: "https://github.com/canonical/snapcraft/pull/6269",
    hunkHeader: "@@ -150,6 +150,8 @@ To grant access to dotfiles in user home:",
    diffLines: [
      { type: "add",     text: "+```bash" },
      { type: "add",     text: "+sudo snap connect my-snap:dot-config :personal-files" },
      { type: "add",     text: "+```" }
    ],
    featured: false
  },
  {
    id: "cpeditor-1499",
    repo: "CP Editor",
    fullRepo: "cpeditor/cpeditor",
    category: "Developer Tooling",
    prNumber: "1499",
    title: "Ctrl+Scroll Dynamic Font Scaling: Add user configuration toggle in editor view",
    status: "merged",
    problem: "Mouse wheel font zoom was hardcoded without preference toggles, causing accidental editor zoom shifts during competitive programming contests.",
    solution: "Added user preference setting in Qt application configuration to disable wheel font scaling.",
    outcome: "Saved competitive programmers from frustrating unintentional zoom changes during timed matches.",
    url: "https://github.com/cpeditor/cpeditor/pull/1499",
    hunkHeader: "@@ -215,6 +215,8 @@ void CodeEditor::wheelEvent(QWheelEvent *event) {",
    diffLines: [
      { type: "add",     text: "+    if (!Settings::getBool(\"editor/enable_scroll_zoom\", true)) {" },
      { type: "add",     text: "+        QPlainTextEdit::wheelEvent(event); return; }" },
      { type: "context", text: "     if (event->modifiers() & Qt::ControlModifier) {" }
    ],
    featured: false
  },
  {
    id: "vscode-322680",
    repo: "Microsoft VS Code",
    fullRepo: "microsoft/vscode",
    category: "Developer Tooling",
    prNumber: "322680",
    title: "Fix: Prevent Shift key from intercepting shortcuts in Web Custom Editors",
    status: "open",
    problem: "Web Custom Editors greedily intercepted modifier key sequences containing Shift, starving extension keybinding handlers.",
    solution: "Patched webview keyboard event router to delegate unhandled Shift shortcut events to the global workbench dispatcher.",
    outcome: "Preserves custom user keybindings inside webview custom editor tabs.",
    url: "https://github.com/microsoft/vscode/pull/322680",
    hunkHeader: "@@ -102,6 +102,8 @@ function handleWebviewKey(event) {",
    diffLines: [
      { type: "add",     text: "+    if (!isHandledByLocalEditor(event)) {" },
      { type: "add",     text: "+        return delegateToWorkbenchKeybindingService(event); }" },
      { type: "context", text: "     event.preventDefault();" }
    ],
    featured: false
  },
  {
    id: "openclaw-120545",
    repo: "OpenClaw",
    fullRepo: "openclaw/openclaw",
    category: "Agent Infrastructure",
    prNumber: "120545",
    title: "fix(codex): verify thread liveness before deferring automatic compaction",
    status: "open",
    problem: "Context compaction tasks were scheduled to dead background threads, dropping token reduction jobs and bloating memory.",
    solution: "Added thread liveness verification prior to scheduling asynchronous compaction workers.",
    outcome: "Ensures agent memory compaction tasks run only on healthy worker threads.",
    url: "https://github.com/openclaw/openclaw/pull/120545",
    hunkHeader: "@@ -55,6 +55,8 @@ def schedule_compaction(thread_pool, job):",
    diffLines: [
      { type: "add",     text: "+    if not thread_pool.has_active_workers():" },
      { type: "add",     text: "+        return thread_pool.spawn_worker_and_run(job)" },
      { type: "context", text: "     return thread_pool.enqueue(job)" }
    ],
    featured: false
  }
];
