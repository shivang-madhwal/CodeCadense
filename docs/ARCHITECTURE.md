# Architecture

## v0.1

Buildless HTML, CSS, and native JavaScript ES modules. No runtime dependencies, account setup, or database required. This keeps the first release portable across static HTTPS hosts and makes the entire included curriculum available offline.

| File | Responsibility |
| --- | --- |
| `dist/app.js` | Rendering, navigation, dialogs, persistence, import/export, install prompt |
| `dist/core.js` | Pure review scheduling, filtering, validation, and streak logic |
| `dist/data.js` | Original problem, design lesson, and interview question content |
| `dist/styles.css` | Responsive layout, tokens, states, and keyboard focus |
| `dist/sw.js` | Versioned same-origin app-shell cache |
| `dist/manifest.webmanifest` | PWA identity and install metadata |
| `tests/` | Node tests for state, scheduling, content integrity, and cache assets |

Hash routing avoids server rewrite requirements. Browser-native `dialog` provides modal focus containment and Escape-to-close. All user-provided text is escaped before rendering. Imported backups are size-limited, validated, filtered to known content IDs, and stripped to supported fields.

## Persistence

Versioned local storage key: `recall.progress.v1`. State includes problem status, bookmark, notes, review count/interval/due timestamp, completed lessons, interview talking points, and practice date keys in the user's local timezone. Review intervals use elapsed milliseconds, while streaks use local calendar dates. There is no remote synchronization or cross-tab conflict resolution yet.

If storage cannot be read or written, the app remains usable in memory and surfaces an export recommendation. Backups are JSON; import merges recognized records with backup values winning on matching IDs. No secret or sensitive authentication material is stored.

## PWA behavior

The worker precaches only the explicitly listed same-origin assets. Navigation uses network-first with an offline fallback. Included assets use the versioned cache, so each release must change `CACHE` when assets change. New workers wait for old pages to close to avoid mixing releases. External questions are never cached. Unrelated host caches are not removed.

HTTPS is required outside localhost. Manifest validity does not prove installability in every browser; the release validation document records actual verification limits.

## Evolution

Keep domain logic and content separate from views. Once account sync arrives, add a repository abstraction and an IndexedDB-backed mutation queue. Retain an anonymous offline mode. If UI complexity justifies a framework, port views while retaining pure domain tests and stable content IDs; do not require a framework migration merely to add more content.

For Postgres work, load the Supabase/Postgres skills and review tenancy, schema, RLS, and migration requirements before authoring SQL. This release intentionally contains no speculative database schema.
