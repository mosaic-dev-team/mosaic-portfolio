## Commands

- `npm ci` installs the dependencies from `package-lock.json`.
- `npm run dev` starts Vite and regenerates the route tree when routes change.
- `npm run lint` runs ESLint, `npx vitest run` runs tests once, and `npm run build` checks TypeScript and builds the site.

<!-- Team: state which checks must pass before review. -->

## Folders and import rules

- `src/routes/` defines the pages and the shared root route.
- `src/main.tsx` connects TanStack Router to React using `src/routeTree.gen.ts`. Commit changes to the generated file alongside route changes.

<!-- Team: define where shared UI, types, and data belong and which folders may import from each other. -->

## Never

- Keep secrets, tokens, and `.env` files out of commits and assistant conversations.

<!-- Team: write the project's TypeScript restrictions here in your own words. -->

## Pull requests

- Open a PR for changes to `main` and get a review from another team member before merging.
- Record the use of AI in `AI-USAGE.md`, including what the team kept and how it was checked.

<!-- Team: write your code review rules here in your own words. -->
