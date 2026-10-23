# Deployment

The application is a portable static PWA. Deploy **`dist/`**, not the repository root. No environment variables, build step, paid service, or database is required for v0.1.

## Sites release

Site identity lives in `.openai/hosting.json`. The managed Sites remote is separate from the GitHub remote. Keep the exact tested source committed and pushed before packaging and saving a version. Package via the Sites workflow helper and publish the returned archive and SHA. The initial Sites audience is owner-private; access settings must be changed explicitly before claiming public access.

## Alternative static hosting

For Cloudflare Pages, Netlify, or Vercel, import the GitHub repository, select a static/other project, leave build command empty, and set output directory to `dist`. Verify host-specific setup in the provider documentation at deployment time. GitHub Pages can serve a copied `dist` artifact via a Pages deployment workflow; no workflow is enabled in v0.1.

## Release checklist

1. Run `npm run check`.
2. Test clean-browser load, search/filter, problem notes, status, review scheduling, lesson completion, and backup roundtrip.
3. Inspect desktop and mobile layouts, visible focus, dialog dismissal, and overflow.
4. Bump the cache version for changed cached assets.
5. Commit by feature; push GitHub and Sites remotes.
6. Save/deploy the exact source archive; retain the returned version and deployment ID.
7. Verify a terminal deployment success and record the live URL/audience.
8. Test offline reload after a successful online load; verify installation on target devices before public beta.

## Updates and rollback

The app worker waits until existing tabs close before activating an update. To pick up a new release, close all Recall tabs/windows and reopen. A rollback uses an earlier saved Sites version, or redeploys the previous static artifact on another host. Preserve stable content IDs and state-version compatibility so deployments do not orphan existing progress.
