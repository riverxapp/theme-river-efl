# Changelog
<!--
  Purpose:
  - Track project change history over time.
  - Record date, summary, and key files touched for each change set.
  - Keep entries append-only (do not delete past entries).
-->

## 2026-03-23
- Launched the first stable version of Panda.
- Introduced end-to-end SaaS build and deploy workflow in under 10 minutes:
  - Build in the integrated code editor.
  - See changes immediately with live preview.
  - Deploy to the internet with one-click deployment.
- Reduced platform friction by keeping coding, preview, and deployment in one place (no tool switching, no long deployment waits).
- Added automated bug-fix support for common issues so many runtime errors are caught and resolved automatically.
- Added custom domain support so launched SaaS apps can use professional branded URLs from day one.
- Switched to credit-based pricing:
  - Pay for actual usage instead of fixed monthly feature bundles.
  - Better cost alignment for idea validation and scaling.
- Product impact:
  - Go from idea to launched product before lunch.
  - Validate concepts with real users immediately.
  - Scale usage and spend naturally as apps grow.

## 2026-03-19
- Hardened `scripts/dev-supervisor.js` for Railway/container runtime:
  - `GIT_BOOTSTRAP` now defaults to `true` when `REPO_URL` is provided (can be disabled via `GIT_BOOTSTRAP=false`).
  - `GIT_POLL` default is `true` (can be disabled via `GIT_POLL=false`).
  - Removed destructive runtime git cleanup behavior (`git clean -fd`).
  - Added `pnpm exec next` fallback when `.bin/next` is not found.
  - Added explanatory inline comments for future maintainers/agents.
- Updated Next config to set explicit Turbopack root to project root (`turbopack.root`).
- Updated Docker app image install step to force clean dependency install:
  - `RUN rm -rf node_modules && pnpm install --prefer-offline --no-frozen-lockfile`
- Updated README supervisor/runtime notes to match current defaults and env-file behavior.

## 2026-03-20
- Improved build reliability and contributor onboarding checks:
  - Fixed lint-blocking type issues in shared UI primitives by replacing empty interfaces with type aliases.
  - Removed an unused icon import in accordion UI component.
  - Added safe global window typing in browser error reporter and removed `any` usage/unneeded eslint disable.
  - Cleaned unused values in `scripts/git-poll.js`.
  - Marked unused server-action state parameter as intentionally consumed to satisfy lint.
- Added validation scripts in `package.json`:
  - `typecheck`: `tsc --noEmit`
  - `verify`: runs `lint`, `typecheck`, and `build` sequentially.
- Key files:
  - `components/ui/input.tsx`
  - `components/ui/textarea.tsx`
  - `components/ui/accordion.tsx`
  - `scripts/error-reporter.ts`
  - `scripts/git-poll.js`
  - `app/auth/actions.ts`
  - `package.json`

## 2026-03-20
- Improved icon-generation resilience for AI-agent authored content:
  - Reworked `components/ui/icon.tsx` to resolve Lucide icons dynamically from string names.
  - Added normalization so `line-chart`, `line chart`, `line_chart`, and `LineChart` resolve consistently.
  - Kept backward aliases for existing content values:
    - `Sparkle` -> `Sparkles`
    - `LineChart` -> `ChartLine`
  - Added safe fallback icon (`CircleHelp`) so invalid icon names no longer break rendering.
