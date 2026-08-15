# Why is this split into so many files?

You just generated a project with five files to do one small job. That probably
looks like a lot for something that stores notes in an array.

This document is the answer. It is not a reference manual — read it top to
bottom once, in order, and the folder layout will stop looking arbitrary.

Assumed knowledge: you have written a `for` loop. That's it.

---

## 1. It really does start as one file

Here is a complete, working backend. Not a simplified sketch — this actually
runs.

```js
import express from 'express';

const app = express();
app.use(express.json());

const notes = [{ id: 1, title: 'First note' }];

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const note = { id: notes.length + 1, title: req.body.title };
  notes.push(note);
  res.status(201).json(note);
});

app.listen(3000);
```

Sixteen lines. Two working endpoints. If you save that as `server.js` and run
it, you have a real API that a real app could talk to.

**This is not the "wrong" way.** For sixteen lines it is the right way. Anyone
who tells you to split this up has not thought about it.

So why does your generated project look different? Because of what happens
next.

---

## 2. Where that falls apart

Nothing dramatic happens. The file just grows.

You add `GET /api/notes/:id`. Then `PUT`, then `DELETE`. Then you need users, so
that's five more. Then comments on notes. Then login. Then you want to check
the title isn't empty, and handle the case where the id doesn't exist, and
return a sensible error instead of crashing.

Now it's 400 lines, and here is what that actually feels like:

**You cannot answer "what does this app do?" any more.** Someone asks which
endpoints exist. In the 16-line version you glanced at it. Now you scroll for
two minutes, scanning for `app.get` between chunks of logic, and you still miss
one.

**Two changes that have nothing to do with each other live side by side.**
Renaming a URL and fixing a bug in how notes are saved are completely unrelated
tasks — but they happen four lines apart, so doing one means reading past the
other.

**Working with someone else turns painful.** You edit line 210, they edit line
215, and git asks you both to sort out a conflict in code neither of you
touched on purpose.

**Nothing is testable in isolation.** You want to check "does creating a note
work?" — but that logic only exists inside a function Express calls, wired to a
URL, inside a file that starts a server the moment you import it.

None of these is a crisis on any given day. That's exactly why the file gets to
400 lines: no single moment ever felt like the moment to fix it.

---

## 3. The first split: routes

The first thing to pull out is the **list of URLs**, because that is what you
look for most often and it is the easiest thing to lose.

Open [`src/routes/note.routes.js`](src/routes/note.routes.js). The whole file is
five lines of actual content:

```js
router.get('/', noteController.list);
router.get('/:id', noteController.getOne);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);
```

That is your entire API, visible at once, with no logic in the way.

**What this bought you:** "What endpoints does this app have?" is now a
five-second question no matter how big the project gets. And renaming a URL
happens in a file that contains no business logic at all — so a typo while
renaming cannot break how notes are saved. It literally cannot; that code isn't
in this file.

Notice the paths look incomplete — `'/'`, not `'/api/notes'`. The prefix lives
in [`src/app.js`](src/app.js), on the line that mounts this router. That's
deliberate: moving the entire resource to `/v2/notes` is one edit there instead
of five here.

---

## 4. The second split: controllers

Routes now say *which* function runs. The functions themselves moved to
[`src/controllers/note.controller.js`](src/controllers/note.controller.js).

Open it and read `getOne`. Notice what it does **not** mention: no URL, no
`/api/notes`, no route. It takes a request, finds a note, sends an answer. It
would work identically if you moved it to a completely different address.

**What this bought you:** the two files now change for two different reasons.
The routes file changes when the API's shape changes — a new endpoint, a
renamed path. The controller changes when behaviour changes — a new validation
rule, a different status code. Those are separate jobs, often on separate days,
sometimes by separate people. Separate files.

This is the split people mean when they say "separation of concerns", and it is
much less mystical than it sounds. Two things that change for different reasons
should not live in the same file.

**The test for whether a split is any good:** can you describe each file's job
in one sentence, without using the word "and"?

- routes: *which URL runs which function*
- controllers: *what happens when one runs*
- data: *where the notes are kept*

Yes. Three sentences, no "and". That's a good split.

---

## 5. What is deliberately missing

Most Express projects have more folders than this. Yours doesn't, on purpose —
a folder you don't understand yet is worse than no folder at all.

Here is what was left out, and the signal that tells you it's time.

### `models/`

A file that owns the data, so nothing else touches the array directly. Right now
your controller reaches into `data/notes.js` itself and calls `.find()` on it.

**Add it when:** you catch yourself writing the same `notes.find(...)` line in a
third function — or when you replace the array with a real database and want to
change one file instead of six.

### `config/`

One place for settings that differ between your laptop and a real server. Right
now your port is a plain number in `server.js`.

**Add it when:** you need a second setting, or the first time you deploy
anywhere.

### `middleware/`

The 404 handler and error handler currently sit at the bottom of `app.js`.

**Add it when:** one of them grows past a few lines, or you write a third one —
logging, authentication — and `app.js` stops being readable in one screen.

### `services/`

Logic that has nothing to do with HTTP: sending an email, charging a card,
talking to another API.

**Add it when:** a controller starts doing something that doesn't involve `req`
or `res` at all.

---

**The pattern is the same every time: split when the pain is real, not because a
tutorial said to.**

Every split has a cost. One more file to open, one more jump to follow when you
are tracing a bug at midnight. That cost is worth paying when a file has gotten
genuinely hard to work in. It is not worth paying on day one, on a project with
five endpoints, because a diagram somewhere had more boxes.

The 16-line version from section 1 is still the correct answer to a 16-line
problem. What you have now is the correct answer to a slightly bigger one. The
skill worth building isn't memorising a folder layout — it's noticing the moment
your current one started hurting.

---

## 6. Where to go next

**Generate the other structure and compare them side by side:**

```bash
npx slowstack        # pick "classic" this time
```

That gives you the layout most Express tutorials and most jobs use — with the
`models/`, `config/` and `middleware/` folders described above already in place.
Same five endpoints, same behaviour, same notes. The only difference is how far
it is split.

Open the two projects next to each other and find the same feature in both. Ask
yourself, honestly, for each extra file: *would I have wanted this yet?*

There is no single right answer. Both layouts are correct — for projects of
different sizes. Now you can tell which is which, and that is the actual skill.

**Then, in this project, try:**

- Add a `GET /api/notes/search?q=...` endpoint. Notice you touch exactly two
  files, and you know which two before you start.
- Delete `app.use(express.json())` from `app.js` and POST a note. Read the error
  carefully — that error will find you again one day.
- Move `app.use(notFound)` above the routes and see every request 404. Order is
  behaviour.
