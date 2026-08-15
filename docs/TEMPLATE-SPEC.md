# Template Spec

The exact contents of `templates/`. This is the product; the CLI is just delivery.

Both templates implement the same thing — CRUD for **notes**, stored in an
in-memory array — so a learner can generate both and diff them.

## Layout

```
templates/<language>/<structure>/
```

`<language>` is `en` or `hi`; `<structure>` is `beginner` or `classic`. Four
folders in total.

**The code is identical across languages. Only the prose changes.** A learner
who picks `hi` gets Hindi explanations in Roman script, with code, keywords and
technical words (`middleware`, `router`, `req.body`, status codes) left in
English — because those are the words they will meet in every error message,
every Stack Overflow answer and every job.

Duplication here is real and deliberate: prose cannot be parameterised. A logic
fix in one language's template must be applied in the other.

What must stay identical across languages: control flow, status codes, file
list, function and variable names. What is translated: comments, `LEARN.md`,
seed data, `console.log` output and the `error` strings in responses — a learner
reads those the same way they read a comment. Diff two languages and every
change should be a string or a comment; anything else is drift, and a bug.

## Shared rules

- ESM, `"type": "module"`, Node >= 18
- Only dependency: `express`. Dev dependency: `nodemon`.
- Data lives in a plain array in a store file. No database, no `.env` required.
- Store `.gitignore` as `gitignore` (undotted); the CLI renames it on copy.
- `npm run dev` starts nodemon; `npm start` starts plain node.
- Every file opens with a "why this file exists" comment. No exceptions.

## Routes

```
GET    /api/notes       list all
GET    /api/notes/:id   one
POST   /api/notes       create
PUT    /api/notes/:id   update
DELETE /api/notes/:id   delete
```

---

## `templates/classic/`

Standard MVC. The layout most Express tutorials and jobs use.

```
gitignore
package.json
server.js                       starts the server (separate from app for testability)
src/
  app.js                        express instance, middleware, mounts routes
  routes/note.routes.js         URL -> controller function mapping only
  controllers/note.controller.js  req/res handling, calls the store
  models/note.model.js          the data + shape of a note
  middleware/error.middleware.js  centralised error handler
  middleware/notFound.middleware.js
  config/env.js                 PORT etc, with sane defaults
```

Why `server.js` is separate from `src/app.js`: `app.js` exports a configured app
without binding a port, so tests can import it. Say this in the file's comment.

---

## `templates/beginner/`

Same behaviour, fewer files, far more explanation.

```
gitignore
package.json
LEARN.md                        the teaching document — see below
server.js
src/
  app.js                        heavily commented; explains middleware order
  routes/note.routes.js
  controllers/note.controller.js
  data/notes.js                 the in-memory array, with a comment on why this is not a real DB
```

Deliberately dropped vs classic: `models/`, `config/`, separate middleware files.
Each drop needs a comment in `app.js` saying what would normally live there and
when a growing project should add it back. The absence is a teaching moment.

### `LEARN.md` structure

Written as a progression, not a reference manual:

1. **Everything in one file** — show the 15-line version that works
2. **Why that breaks** — 20 routes in one file, merge conflicts, can't find anything
3. **First split: routes** — what moved and what it bought you
4. **Second split: controllers** — same
5. **What we deliberately left out** — models, services, config, and the signal that says it's time to add them
6. **Next step** — point at the classic structure

Plain language. Short paragraphs. Assume the reader has written a `for` loop and
nothing else on a server.

---

## Comment style for template files

Top of file — why it exists and what breaks without it:

```js
// routes/note.routes.js
// This file only answers: "which URL runs which function?"
// The functions themselves live in controllers/. Keeping them apart means
// changing a URL never risks touching working business logic.
```

Inline — only where a beginner would genuinely be confused:

```js
app.use(express.json());
// Without this, req.body is undefined on POST requests. Express does not
// parse JSON bodies by default. This must come BEFORE the routes below,
// because middleware runs top to bottom.
```

Never write comments that restate the code. `// create a new note` above a
function named `createNote` is noise and will be rejected in review.
