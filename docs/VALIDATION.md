# Release validation

This record is updated during the v0.1 release. Do not treat planned checks as completed.

## Automated

- Passed: nine Node tests covering review intervals/caps, due boundaries, combined filtering, local-day streaks, backup roundtrip and malformed imports, curriculum integrity, and PWA asset metadata.
- Passed: JavaScript syntax checks for every module and service worker; unique content IDs, canonical URL shape, completeness, cache assets, and PNG dimensions.

## Browser

- Passed: desktop preview and 390 × 844 responsive layout; mobile navigation and difficulty filtering; document width matches viewport (390 px). Screenshots are saved alongside this document.
- Passed: Two Sum notes and solved status persist after rating Good and reloading; next review appears three days later. Lesson completion and interview talking points survive reload.
- Passed: JSON backup download through the browser; unit-tested backup roundtrip/validation. Browser import remains a beta check.
- Passed: stopped the local HTTP server, reloaded through the service worker cache, and navigated to included system design lessons. Production offline behavior still requires device verification behind hosting access controls.

## Remaining beta gates

Real-device iOS/Android installation, screen-reader audit, production offline behavior behind hosting access controls, and an independent technical review of all curriculum entries. No automated external judge verification is claimed.
