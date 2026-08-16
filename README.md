# slowstack

[![npm version](https://img.shields.io/npm/v/slowstack.svg)](https://www.npmjs.com/package/slowstack)
[![node](https://img.shields.io/node/v/slowstack.svg)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/slowstack.svg)](LICENSE)

Scaffold an Express backend that explains itself.

## Install

Nothing to install — run it:

```bash
npx slowstack
```

No database. No `.env`. No signup. `npm install && npm run dev` and you have a
working API.

---

## Why this exists

Every Express generator optimises for speed. They assume you already know what a
controller is and you just don't want to type it out again.

This one is for the person who doesn't know yet.

You don't need files faster. You need to understand **why the files are split up
at all** — and no generator tells you that. They hand you seven folders and wish
you luck.

So every file in the generated project opens by explaining why it exists and
what breaks without it. The comments are not documentation of the code. They are
the point of the code.

## Quick start

```
$ npx slowstack

? Project name: my-api
? Structure:
❯ beginner   Fewer files, heavily commented. Start here if backends are new to you.
  classic    Standard MVC layout — routes, controllers, models. What most jobs use.
? Explanations in:
❯ English    Plain English, written for someone who has never built a backend.
  Hinglish   Hindi explanations, English code and technical words. Roman script.

Created my-api/ using the beginner structure.

Next:

  cd my-api
  npm install
  npm run dev
```

The server tells you where it is:

```
Listening on http://localhost:3000
Try it:  curl http://localhost:3000/api/notes

New to backends? Open LEARN.md — it explains why these files are split up.
```

And it already has data in it:

```bash
curl http://localhost:3000/api/notes
```

```json
[
  { "id": 1, "title": "First note", "body": "Notes live in memory until you add a database." },
  { "id": 2, "title": "Second note", "body": "Change me with PUT, remove me with DELETE." }
]
```

Create one:

```bash
curl -X POST http://localhost:3000/api/notes \
  -H 'Content-Type: application/json' \
  -d '{"title":"Third note","body":"made by curl"}'
```

```json
{ "id": 3, "title": "Third note", "body": "made by curl" }
```

## What you get

A working notes API, five endpoints, stored in a plain array:

```
GET    /api/notes       list all
GET    /api/notes/:id   one
POST   /api/notes       create
PUT    /api/notes/:id   update
DELETE /api/notes/:id   delete
```

Both structures do exactly the same thing. Only the layout differs, so you can
generate both and compare them side by side.

**`beginner`** — five files, and a `LEARN.md` that walks you through why each
split happened.

```
server.js
src/
  app.js
  routes/note.routes.js
  controllers/note.controller.js
  data/notes.js
LEARN.md
```

**`classic`** — the layout most Express tutorials and most jobs use.

```
server.js
src/
  app.js
  routes/note.routes.js
  controllers/note.controller.js
  models/note.model.js
  middleware/error.middleware.js
  middleware/notFound.middleware.js
  config/env.js
```

## The part that is actually different

`models/`, `config/` and separate middleware files are **missing on purpose**
from the beginner structure. That absence is the lesson — `app.js` names each
one, says what would live there, and tells you the moment to add it back:

> `models/` — a file that owns the data, so nothing else touches the notes list
> directly. **Add it when:** you catch yourself writing the same
> `notes.find(...)` line in a third place.

And `LEARN.md` tells the story as a progression, not a reference manual: the
sixteen-line version that genuinely works, how it falls apart, then one split at
a time and what each one bought you.

The comments explain the traps a beginner actually hits, never what the code
already says:

```js
// Everything in a URL is text. A request to /api/notes/1 gives you the STRING
// "1", never the number 1. Our ids are numbers, and "1" === 1 is false. Without
// Number() below, this find() would never match anything and every single
// lookup would return a 404 — with no error to explain why.
const id = Number(req.params.id);
```

## Hinglish

Pick `Hinglish` and the explanations come in Hindi, in Roman script:

```js
// Ye line hata do to req.body "undefined" ho jayega — bilkul khaali, kuch nahi.
// Har POST aisa lagega jaise bhejne wale ne kuch bheja hi nahi.
```

Code, keywords and technical words stay in English — `middleware`, `router`,
`req.body`, status codes. Those are the words you will meet in every error
message and every answer you ever search for, so translating them would set you
back, not help.

## What this deliberately does not do

- **No database.** Notes live in an array. That is why it runs with zero setup,
  and the templates say so out loud.
- **No TypeScript**, no auth module, no Socket.IO. Every extra thing is another
  thing you have to understand before you can start.
- **One resource.** Notes are an excuse to teach the shape of a backend, not a
  product.

If you want a feature-complete production starter, this is the wrong tool and
there are good ones out there. This one is for the part before that.

## Requirements

Node.js 18 or newer.

## License

MIT
