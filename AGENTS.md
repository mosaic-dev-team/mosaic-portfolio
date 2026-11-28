## Commands

- `npm ci` installs the dependencies from `package-lock.json`.
- `npm run dev` starts Vite and regenerates the route tree when routes change.
- `npm run lint`, `npm test`, and `npm run build` run ESLint, Vitest, and the TypeScript and Vite production build. Run all three before requesting review.
- `npm run format` formats the source with Prettier.

## Folders and import rules

- `src/routes/` defines the pages and the shared root route.
- `src/main.tsx` connects TanStack Router to React using `src/routeTree.gen.ts`. Commit changes to the generated file alongside route changes.
- Put reusable UI in `src/components/` and UI hooks in `src/hooks/`. Keep router-specific navigation in route files and hooks.
- `src/data/` holds only types and content (members, projects, posts). No functions. It may import its own types and static assets.
- `src/lib/` holds pure functions with no React: formatting, relations and filters.
- Imports go one way: data ← lib ← hooks/components ← routes.
- Put a test next to the file it tests. Route and page tests live at the root of `src/`, because `src/routes/` may only contain routes.

## Never

- Keep secrets, tokens, and `.env` files out of commits and assistant conversations.
- Keep TypeScript strict and use type-only imports for shared types.

## Pull requests

- Open a PR for changes to `main` and get a review from another team member before merging.
- Record the use of AI in `AI-USAGE.md`, including what the team kept and how it was checked.
