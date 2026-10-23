# Product plan

## Who it serves

Software engineers preparing for coding, system design, and behavioral rounds. Primary user: an engineer with limited daily study time who recognizes solutions after reading them but struggles to reconstruct them in an interview.

## Core promise

Turn a problem sheet into a repeatable learning routine: **find → attempt → explain → check → review**. Avoid exposing the solution before the user has tried to recall it.

## Main journeys

1. **Daily practice:** dashboard suggests up to three unsolved problems. Open the canonical question, attempt it, explain the recall prompt, reveal the original summary, record a note, then rate recall.
2. **Pattern learning:** inspect a technique, read a cue, open related problems, and notice the invariant connecting them.
3. **Review:** due problems appear oldest first. Reconstruct the idea before revealing it. Again brings it back soon; stronger recall extends the interval.
4. **System design:** open an interview prompt, consider requirements and tradeoffs, study the explanation, and mark the lesson complete.
5. **Interview explanation:** save talking points for behavioral and technical prompts, then compare with checkpoints.
6. **Ownership:** inspect coverage and activity, export progress, and import into another browser.

## Content contract

Each DSA problem has a stable ID, source URL, title, difficulty, pattern, original concise approach, complexity, recall question, and memory cue. A memory cue helps retrieve reasoning; it must not replace a correct explanation. System design lessons contain requirements, an approach, an explicit tradeoff, a prompt, and further reading.

No external editorial text is reproduced. “SDE sheet” describes the product category; this starter set is not an official named third-party sheet. Later curated imports require provenance and license review.

## Design direction

- Palette: canvas `#f8f9fc`, paper `#ffffff`, ink `#252536`, primary violet `#6554c0`, lavender `#eeeafa`, success `#287357`.
- Type: local Avenir Next with Segoe UI/system fallback, compact readable UI; no external font requests.
- Layout: persistent study navigation, left-aligned workspace, one prominent two-pointer trace, quiet structured problem rows.
- Personality: calm practice notebook; specific learning actions and honest empty states instead of fabricated achievements.

## v0.1 boundaries

No login, server storage, public leaderboard, AI tutor, reminders, automatic code execution, judge integration, or named third-party complete sheet. All progress is self-reported. Included content works offline; linked questions and further reading need connectivity. Study reminders and notifications are future opt-in features.
