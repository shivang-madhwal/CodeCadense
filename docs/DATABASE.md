# Free-tier database decision

Checked against official pricing on **23 October 2026**. Limits can change. This compares direct provider plans; Sites-managed storage can have different platform provisioning and billing rules.

| Option | Published free allowance | Fit and caveat |
| --- | --- | --- |
| [Supabase](https://supabase.com/pricing) | 500 MB database; 50,000 monthly active auth users; 5 GB egress; 1 GB file storage; two active projects | Proposed choice for accounts and Postgres-backed sync. Free projects pause after one week of inactivity. |
| [Cloudflare D1](https://developers.cloudflare.com/d1/platform/pricing/) | 5 GB total storage; 5 million rows read/day; 100,000 rows written/day | Fits a Cloudflare Worker backend. SQLite-based; authentication is a separate concern. Exceeding free quotas causes query failures. |
| [Neon](https://neon.com/pricing) | 1 GB storage and 100 CU-hours/month per project; 100 projects | Alternative serverless Postgres. Compute scales to zero after five minutes idle; account for wake-up and compute usage. |

## Recommendation

Use no hosted database for phase 1. The static app deploys immediately and saves device-local progress. Use Supabase for phase 3 if an integrated account and Postgres solution is preferred. Choose D1 if committing to a Cloudflare backend and supplying authentication separately. The user has requested options; no paid plan or external database is provisioned by this release.

Keep public curriculum bundled and cacheable. Store only user-owned progress, notes, answers, and review events remotely. That bounds usage better than re-fetching the same curriculum on every visit. Before implementation, decide on sign-in methods, offline merge rules, retention, export/deletion, data region, backups, and cost limits. Enforce user ownership at the database layer and test cross-user access. Do not put privileged database credentials in browser code.
