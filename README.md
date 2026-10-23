# Recall

An offline-first PWA for software engineering interview preparation. Learn a pattern, explain it from memory, and revisit it before you forget.

## Available in v0.1

- Original starter sheet of **40 problems across 11 patterns**, with direct links to LeetCode.
- Concise approaches, time/space complexity, memory cues, and recall questions.
- Search, difficulty/pattern/progress filters, bookmarks, notes, and explicit solve status.
- Review queue with four self-assessment ratings and increasing review intervals.
- Six introductory system design lessons with tradeoffs and further-reading links.
- Eight technical/behavioral interview prompts with saved talking points.
- Pattern coverage, activity history, streaks, and JSON backup/import.
- Responsive layout, keyboard navigation, install manifest, and cached offline app shell.

This is an original starter curriculum, not a complete or official Striver/SDE sheet. It does not copy external question statements or editorial solutions. No third-party affiliation is implied. External questions require an internet connection and are subject to their site's access rules.

## Run

Requires Node 20+ for checks and Python 3 for the preview server. No dependencies or install step.

```sh
npm run dev
# Open http://localhost:4173
npm run check
```

Serve `dist/` on any HTTPS static host. Keep relative asset paths intact. Localhost is also a secure context for service worker development.

## Data and privacy

Progress stays in this browser's local storage. There is no account, cloud database, telemetry, or cross-device synchronization. Export a backup from **My progress** before clearing storage or changing browser. Import merges data; the backup wins for matching IDs. Private browsing and browser storage eviction can remove progress. The service worker caches app assets, not external LeetCode pages.

The four ratings are deliberately simple: Again = 10 minutes, Hard = 1 day, Good = at least 3 days, Easy = at least 7 days. Good doubles and Easy triples the previous interval, up to 180/365 days. This is a study aid, not a measured mastery score.

## Project documents

- [Phased roadmap](docs/ROADMAP.md): outcomes, tasks, and acceptance criteria.
- [Product plan](docs/PRODUCT.md): users, flows, content model, and scope.
- [Architecture](docs/ARCHITECTURE.md): app structure, persistence, PWA, and evolution.
- [Deployment](docs/DEPLOYMENT.md): hosting and release procedure.
- [Database options](docs/DATABASE.md): free-tier comparison and sync recommendation.
- [Validation](docs/VALIDATION.md): completed checks and remaining release gates.

## Contributing

Keep commits scoped to a feature or fix using `docs:`, `feat:`, `fix:`, and `test:`. Update the roadmap as milestones ship. Run `npm run check` before pushing. Bump the cache name in `dist/sw.js` whenever cached assets change; existing tabs adopt a waiting worker after all old tabs close.

Content additions need a canonical question link, original short explanation, complexity with assumptions, a retrieval prompt, and a memorable cue. Review technical accuracy before extending the curriculum.

## License

MIT for this project's code and original content. Linked external resources retain their own licenses and terms.
