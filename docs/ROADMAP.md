# Roadmap

One phase at a time. A phase is done only when every acceptance box is ticked.
Tick boxes as you go — this file is the source of truth for progress.

---

## Phase 0 — Decide

No code. Blocks everything else.

- [x] Package name chosen and confirmed available on npm — `slowstack`
- [x] Name placeholder replaced everywhere in this repo
- [x] npm account created, `npm whoami` works
- [x] `git init` and first commit

**Naming rules:** short, no `express` in the name (trademark), easy to say aloud.

---

## Phase 1 — CLI skeleton

Get one command running. Nothing is generated yet.

- [ ] `package.json` with `name`, `"type": "module"`, and a `bin` field
- [ ] `bin/index.js` with `#!/usr/bin/env node` shebang, imports and calls `run()`
- [ ] `src/cli.js` — prompts for project name (default `my-api`) and structure
- [ ] `src/structures.js` — array of structure definitions, single source of truth
- [ ] Ctrl+C exits cleanly (catch `ExitPromptError`, no stack trace)

**Acceptance:** `node bin/index.js` shows an arrow-key menu, collects both
answers, prints them, exits 0. Ctrl+C prints nothing ugly.

Do not build templates yet.

---

## Phase 2 — Scaffolding engine

Make the copy actually happen.

- [ ] `src/scaffold.js` — resolve template dir from `import.meta.url`, copy with `fs.cpSync(..., { recursive: true })`
- [ ] Error if target folder already exists — never overwrite
- [ ] Write the user's chosen name into the generated `package.json`'s `name` field
- [ ] Rename `gitignore` → `.gitignore` on copy (npm strips dotfiles from published packages — templates must store it undotted)
- [ ] Print next steps after success: `cd`, `npm install`, `npm run dev`

**Acceptance:** run the CLI, pick `classic`, and the folder appears with correct
files. Running it twice with the same name errors cleanly instead of clobbering.

---

## Phase 3 — Classic template

The familiar MVC layout. Build this first because it's the easier one.

- [ ] Files exactly as listed in `docs/TEMPLATE-SPEC.md`
- [ ] A working CRUD resource (notes), in-memory array store
- [ ] Every file has its top-of-file "why" comment
- [ ] Boots and responds with only `npm install && npm run dev`

**Acceptance:** generate it, install, run, and hit all CRUD routes successfully
with curl. No database, no `.env` needed.

---

## Phase 4 — Beginner template

**This is the actual product. Do not rush it.**

- [ ] Meaningfully fewer files than classic — see spec
- [ ] Comment density is the point; err on the side of over-explaining
- [ ] `LEARN.md` in the generated project: the story of why the split happened, written as a progression
- [ ] Same CRUD resource as classic, so the two can be compared side by side

**Acceptance:** someone who has never written a backend can read the generated
files top to bottom and explain, in their own words, why routes and controllers
are separate files.

If that test fails, the phase is not done — regardless of whether the code runs.

---

## Phase 5 — Ship

- [ ] `README.md` — problem, install, usage, a terminal recording or screenshot
- [ ] `LICENSE` file (MIT) matching `package.json`
- [ ] `files` array in `package.json` verified with `npm pack --dry-run`
- [ ] Tested via `npm link` in a fresh directory
- [ ] `npm publish`
- [ ] `npx slowstack` tested in a clean folder, as a stranger would

**Acceptance:** a person who has never seen this repo can go from `npx` to a
running server without asking you anything.

---

## Phase 6 — Later (do not start before v1 ships)

Parked deliberately. Adding any of these early is scope creep.

- TypeScript templates
- `add` command (progressive scaffolding — generate one layer at a time)
- Third structure (feature/modular)
- Optional MongoDB
- Docs site

The `add` command is the strongest long-term idea: let the beginner feel the
pain of a fat route file first, then generate the controller and explain the
split. No competitor does this. But it only makes sense once v1 exists.
