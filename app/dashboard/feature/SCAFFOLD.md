# Feature Scaffold Contract

This folder is the canonical reference for building new `/dashboard/*` CRUD features safely.

## Integrated baseline

`/dashboard/feature` is not a mock-only skeleton. It is a working, integrated CRUD reference:

- `page.tsx` is wired to session + tenant-scoped DB reads.
- `client.tsx` is wired to create/edit/delete forms and UI states.
- `actions.tsx` is wired to real mutations with Zod + auth + role + tenant guards.

When cloning this feature for a new module, copy the architecture and safety checks, then replace entity-specific names.

## File responsibilities

- `page.tsx`: server entry only
  - session check
  - tenant membership lookup
  - tenant-scoped reads
  - URL flash param normalization
  - pass only serializable data to client
- `actions.tsx`: mutation boundary only
  - validate inputs with Zod
  - require auth
  - require tenant membership
  - require manage role for writes
  - scope writes by both resource id and tenant id
  - redirect with explicit success/error messages
- `client.tsx`: UI only
  - no DB access
  - no session/tenant logic
  - forms post directly to server actions
  - explicit empty/read-only states

## Bug-prevention checklist

Before shipping any new feature copied from this scaffold:

1. Keep server/client split identical (`page.tsx` server, `client.tsx` client, `actions.tsx` server).
2. Ensure every mutation checks the affected row count (`returning`) and fails if not found.
3. Ensure every mutation uses tenant scoping (`id + teamId`).
4. Keep role checks server-side only.
5. Keep flash messages bounded and normalized (status enum + message length cap).
6. Convert all Date fields to ISO strings in `page.tsx`.
7. Keep form field names aligned with Zod schema keys.
8. Provide explicit read-only UX for non-manage roles.
9. Avoid optimistic local writes for persisted records.

## Common mistakes to avoid

- Treating `client.tsx` as trusted for authorization.
- Showing success when update/delete affected zero rows.
- Querying data in client components.
- Accepting unbounded query-string messages.
- Using unscoped update/delete by `id` only.
