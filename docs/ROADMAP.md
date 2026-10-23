# Phased delivery plan

Created 23 October 2026. Phase estimates are planning ranges for one engineer, excluding user feedback and external account setup.

## Phase 1 — Useful local-first foundation (v0.1, implemented)

**Outcome:** someone can complete a meaningful practice session without signing up.

- [x] Responsive dashboard and navigation.
- [x] 40 original DSA summaries covering hash maps, two pointers, sliding windows, stacks, binary search, linked lists, trees, graphs, backtracking, dynamic programming, and a combined intervals/heaps group (11 groups total).
- [x] Canonical question links, complexity notes, pattern cues, hidden solutions.
- [x] Problem status, bookmarks, personal notes, search, and filters.
- [x] Four-rating spaced review scheduling and due queue.
- [x] Six system design lessons and eight interview answer prompts.
- [x] Device-local persistence, streaks, progress views, backup export/import.
- [x] PWA manifest, installable icons, and offline app shell.
- [x] Repository, feature commits, roadmap, tests, and release documentation.
- [x] Complete initial release checks and publish hosted v0.1 (see validation record for beta gates).

**Acceptance:** start from a clean browser; find and open a problem; reveal its solution; save notes; rate recall; reload and retain progress. After one online visit, app navigation and included lessons work offline. A backup can restore progress to another browser.

## Phase 2 — Trustworthy curriculum (1–2 weeks)

**Outcome:** a coherent interview preparation path beyond the starter set.

- Expand to an original 150-problem core sheet; separate intervals and heaps; add tries, greedy, bit manipulation, and advanced graphs.
- Map prerequisites, suggested order, and learning objectives for each pattern.
- Add worked traces, counterexamples, common mistakes, and language-specific pseudocode.
- Add content provenance and reviewer metadata; automated link checks and periodic technical review.
- Add progressive hints, pattern-blind practice, and adjacent-pattern comparisons.
- Extend system design to rate limiting, feeds, chat, search, consistency, and observability.

**Acceptance:** each problem has a canonical accessible link, independently reviewed solution, complexity assumptions, and at least one retrieval prompt. An engineer can follow a 4- or 8-week route without guessing what to study next.

## Phase 3 — Accounts and durable sync (1–2 weeks)

**Outcome:** progress survives device changes while offline study remains useful.

- Choose a hosted backend (Supabase is the proposed option; see DATABASE.md).
- Add sign-in, sign-out, account deletion, and explicit local-data migration consent.
- Implement user-owned progress, notes, interview answers, and review event storage.
- Enforce tenant isolation in the database and verify cross-user denial.
- Add an offline mutation queue with idempotency keys and per-field timestamps.
- Resolve conflicts explicitly; replay review events deterministically rather than silently overwriting intervals.
- Add sync status, retry controls, export/deletion, and backup/restore procedures.

**Acceptance:** user A cannot access user B's records. An offline edit syncs once after reconnect. Concurrent edits follow a documented conflict policy. Existing local progress migrates with no loss or forced account creation.

## Phase 4 — Better recall and interview simulation (2–3 weeks)

**Outcome:** users can transfer learning to unfamiliar prompts and timed explanations.

- Evaluate a reviewed scheduling algorithm (e.g. FSRS) with migration and deterministic tests.
- Add typed/voice-free explanation drills, worked array/tree traces, and “why this pattern?” prompts.
- Add timed coding sessions with self-assessment; no claim of automatic code judging until a sandboxed judge exists.
- Add system design canvases and scenario rubrics.
- Add STAR story bank, mock interview agendas, and post-session reflections.
- Let users choose study days, weekly goals, and interview date.

**Acceptance:** a user can complete a mixed mock session and leave with specific weak areas and scheduled follow-up practice. Schedule changes never lose review history.

## Phase 5 — Public beta and reliability (1–2 weeks)

**Outcome:** a maintainable service ready for external users.

- WCAG 2.2 AA audit, screen-reader testing, and reduced-motion checks.
- Browser/device installation matrix including Android and iOS.
- Performance budgets, service worker update tests, migration regression checks.
- CI for content, logic, browser flows, accessibility, and deployment smoke tests.
- Privacy-conscious operational metrics, error reporting, rate limits, and cost alerts.
- Collect beta feedback and prioritize retention improvements over raw problem count.

**Acceptance:** repeatable deployment and rollback, documented incident recovery, verified data export/deletion, and no critical accessibility or cross-user isolation failures.

## Success measures

Track locally first; introduce aggregate analytics only with a documented privacy decision. Useful measures: first-session completion, return after seven days, successful unaided recall, due-review completion, and curriculum coverage. “Solved” is a user-reported practice status, not external judge verification.
